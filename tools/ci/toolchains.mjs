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

// Trees that are documentation, agent skills, or contributor guides — not a language toolchain.
const docsOnlyPathPrefixes = ['docs/', '.claude/', '.agents/', 'skills/'];

const docsMarkdownExtensions = ['.md', '.mdx'];
const docsTreeExtensions = [...docsMarkdownExtensions, '.json', '.yml', '.yaml'];

// Quoted/vendored skill material; Prettier is deliberately kept out of these (see .prettierignore).
const vendoredSkillReferencePath = /^(?:\.claude|\.agents)\/skills\/[^/]+\/references\//;

function normalizePath(file) {
  return file.replace(/^\.\//, '');
}

function matchesPath(file, prefixes) {
  return prefixes.some((prefix) =>
    prefix.endsWith('/') ? file.startsWith(prefix) : file === prefix,
  );
}

function hasExtension(file, extensions) {
  return extensions.some((extension) => file.endsWith(extension));
}

export function isVendoredSkillReference(file) {
  return vendoredSkillReferencePath.test(normalizePath(file));
}

export function isDocsOnlyPath(file) {
  const normalized = normalizePath(file);
  return matchesPath(normalized, docsOnlyPathPrefixes);
}

export function isDocsFormatFile(file) {
  const normalized = normalizePath(file);

  if (isVendoredSkillReference(normalized)) {
    return false;
  }

  if (hasExtension(normalized, docsMarkdownExtensions)) {
    return true;
  }

  return isDocsOnlyPath(normalized) && hasExtension(normalized, docsTreeExtensions);
}

function getProjectToolchain(file, projects) {
  const projectsBySpecificity = [...projects].sort((a, b) => b.root.length - a.root.length);
  const project = projectsBySpecificity.find(
    ({ root }) => file === root || file.startsWith(`${root}/`),
  );

  return project?.tags.find((tag) => toolchainTags.includes(tag)) ?? null;
}

// Files Format Docs owns: leftover repo docs/skills, and markdown outside Node packages.
// Markdown inside toolchain:node projects stays on `nx format:check`.
export function isRootFormatFile(file, projects = []) {
  const normalized = normalizePath(file);

  if (!isDocsFormatFile(normalized)) {
    return false;
  }

  return getProjectToolchain(normalized, projects) !== 'toolchain:node';
}

export function selectRootFormatFiles(changedFiles, projects = []) {
  return changedFiles.map(normalizePath).filter((file) => isRootFormatFile(file, projects));
}

function emptyClassification() {
  return {
    node: false,
    gradle: false,
    xcode: false,
    docs: false,
  };
}

export function allToolchains() {
  return {
    node: true,
    gradle: true,
    xcode: true,
    docs: true,
  };
}

export function classifyToolchains(changedFiles, projects = []) {
  const result = emptyClassification();
  const projectsBySpecificity = [...projects].sort((a, b) => b.root.length - a.root.length);

  for (const changedFile of changedFiles) {
    const file = normalizePath(changedFile);
    const project = projectsBySpecificity.find(
      ({ root }) => file === root || file.startsWith(`${root}/`),
    );
    const projectToolchain = project?.tags
      .find((tag) => toolchainTags.includes(tag))
      ?.replace('toolchain:', '');

    if (isRootFormatFile(file, projects)) {
      result.docs = true;
    }

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
    } else if (isDocsOnlyPath(file) || isDocsFormatFile(file)) {
      // Documentation and skill files are not a language toolchain.
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
