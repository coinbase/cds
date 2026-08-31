export const toolchainTags = ['toolchain:node', 'toolchain:gradle', 'toolchain:xcode'];

const allToolchainPaths = new Set([
  '.github/workflows/ci.yml',
  'nx.json',
  'tools/ci/classifyToolchains.mjs',
  'tools/ci/toolchains.mjs',
  'tools/ci/validators/validateProjectTags.mjs',
  'tools/ci/workspaceProjects.mjs',
]);

const gradlePathPrefixes = [
  '.github/actions/setup-android/',
  '.github/workflows/android.yml',
  'android/',
];

const xcodePathPrefixes = ['.github/workflows/ios.yml', 'ios/'];

function normalizePath(file) {
  return file.replace(/^\.\//, '');
}

function matchesPath(file, prefixes) {
  return prefixes.some((prefix) =>
    prefix.endsWith('/') ? file.startsWith(prefix) : file === prefix,
  );
}

export function classifyToolchains(changedFiles, projects = []) {
  const result = {
    node: false,
    gradle: false,
    xcode: false,
  };
  const projectsBySpecificity = [...projects].sort((a, b) => b.root.length - a.root.length);

  for (const changedFile of changedFiles) {
    const file = normalizePath(changedFile);
    const project = projectsBySpecificity.find(
      ({ root }) => file === root || file.startsWith(`${root}/`),
    );
    const projectToolchain = project?.tags
      .find((tag) => toolchainTags.includes(tag))
      ?.replace('toolchain:', '');

    if (allToolchainPaths.has(file)) {
      result.node = true;
      result.gradle = true;
      result.xcode = true;
    } else if (matchesPath(file, gradlePathPrefixes)) {
      result.gradle = true;
    } else if (matchesPath(file, xcodePathPrefixes)) {
      result.xcode = true;
    } else if (projectToolchain) {
      result[projectToolchain] = true;
    } else {
      result.node = true;
    }
  }

  return result;
}

export function validateProjectToolchainTags(projects) {
  const errors = [];
  const requiredNativeTargetProperties = {
    build: ['cache', 'dependsOn', 'inputs', 'outputs', 'options.cwd'],
    test: ['cache', 'dependsOn', 'inputs', 'outputs'],
  };

  for (const project of projects) {
    const matchingTags = project.tags.filter((tag) => toolchainTags.includes(tag));

    if (matchingTags.length !== 1) {
      errors.push(
        `${project.name} must have exactly one toolchain tag; found ${
          matchingTags.length === 0 ? 'none' : matchingTags.join(', ')
        }`,
      );
      continue;
    }

    if (project.tags.includes('platform:android') && matchingTags[0] !== 'toolchain:gradle') {
      errors.push(`${project.name} uses platform:android and must use toolchain:gradle`);
    }

    if (project.tags.includes('platform:ios') && matchingTags[0] !== 'toolchain:xcode') {
      errors.push(`${project.name} uses platform:ios and must use toolchain:xcode`);
    }

    if (matchingTags[0] !== 'toolchain:node') {
      for (const [targetName, requiredProperties] of Object.entries(
        requiredNativeTargetProperties,
      )) {
        const target = project.targets?.[targetName];

        if (!target) {
          continue;
        }

        const missingProperties = requiredProperties.filter((property) => {
          const value = property.split('.').reduce((current, key) => current?.[key], target);
          return value === undefined;
        });

        if (missingProperties.length > 0) {
          errors.push(
            `${project.name}:${targetName} must override Node target defaults for ${missingProperties.join(
              ', ',
            )}`,
          );
        }
      }
    }
  }

  return errors;
}
