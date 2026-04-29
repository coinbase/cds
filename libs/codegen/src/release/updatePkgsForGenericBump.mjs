import chalk from 'chalk';
import glob from 'fast-glob';
import fs from 'node:fs';
import path from 'node:path';
import semver from 'semver';

const MONOREPO_ROOT = process.env.NX_WORKSPACE_ROOT;

/** These packages are forced to be the same version! If you update this list,
 * you must also update the list in /tools/validateCDSVersions.mjs
 */
const PACKAGES_TO_SYNC_VERSION = ['web', 'mobile', 'common', 'mcp-server'];

async function getPkgVersion(pkgJsonPath) {
  const pkg = JSON.parse(await fs.promises.readFile(pkgJsonPath, 'utf8'));

  return pkg.version;
}

async function updatePkgVersion(pkgPath, highestVersion) {
  // Update package.json
  const pkg = JSON.parse(await fs.promises.readFile(pkgPath, 'utf8'));

  pkg.version = `${highestVersion}`;
  await fs.promises.writeFile(pkgPath, `${JSON.stringify(pkg, null, 2).trimEnd()}\n`);

  console.info(chalk.green(`Updated ${pkgPath} version to ${highestVersion}`));
}

async function getHighestVersion(pkgJsonPaths) {
  let highestVersion = '0.0.0';
  await Promise.all(
    pkgJsonPaths.map(async (pkgPath) => {
      const packageVersion = await getPkgVersion(pkgPath);
      if (semver.gt(packageVersion, highestVersion)) {
        highestVersion = packageVersion;
      }
    }),
  );

  return highestVersion;
}

async function updateChangelog(pkgPath, highestVersion) {
  // Get file information
  const pkgBasePath = path.dirname(pkgPath);
  // Update CHANGELOG
  const changelogPath = path.join(pkgBasePath, 'CHANGELOG.md');
  const changelogContent = fs.readFileSync(changelogPath, 'utf8');
  // Find "<!-- template-start -->" marker
  const templateStartMarker = '<!-- template-start -->';
  const templateStartIndex = changelogContent.indexOf(templateStartMarker);

  // Find "Unreleased" header
  const unreleasedHeader = '## Unreleased';
  const unreleasedIndex = changelogContent.indexOf(unreleasedHeader);

  // Generate date for bump
  const date = `(${new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })} PST)`;

  // Insert new version and generic bump message below appropriate point
  let updatedChangelogContent;

  if (unreleasedIndex !== -1) {
    // If "Unreleased" header is found insert new version and generic bump message below "Unreleased" header
    updatedChangelogContent = `${changelogContent.slice(
      0,
      unreleasedIndex,
    )}## ${highestVersion} (${date})\n\nThis is an artificial version bump with no new change.${changelogContent.slice(
      unreleasedIndex + unreleasedHeader.length,
    )}`;
  } else if (templateStartIndex !== -1) {
    // If "<!-- template-start -->" marker is found, insert new version and generic bump message below it
    updatedChangelogContent = `${changelogContent.slice(
      0,
      templateStartIndex + templateStartMarker.length,
    )}\n\n## ${highestVersion} (${date})\n\nThis is an artificial version bump with no new change.${changelogContent.slice(
      templateStartIndex + templateStartMarker.length,
    )}`;
  } else {
    // If neither "Unreleased" header nor "<!-- template-start -->" marker is found, throw an error
    throw new Error(
      `"${unreleasedHeader}" or "${templateStartMarker}" not found in ${changelogPath}.`,
    );
  }

  await fs.promises.writeFile(changelogPath, updatedChangelogContent);
  console.info(chalk.green(`Updated ${changelogPath} CHANGELOG to ${highestVersion}`));
}

async function updatePkgsForGenericBump() {
  // Find package.json paths for cds-web, cds-mobile, and cds-common
  const pkgJsonPaths = await glob(`packages/(${PACKAGES_TO_SYNC_VERSION.join('|')})/package.json`, {
    absolute: true,
    cwd: MONOREPO_ROOT,
    onlyFiles: true,
  });

  // Get the highest version number among the specified packages
  const highestVersion = await getHighestVersion(pkgJsonPaths);

  console.info(chalk.blue(`Updating all versions to ${highestVersion}`));

  // Update versions in package.json and CHANGELOG for each package
  pkgJsonPaths.forEach(async (pkgPath) => {
    const packageVersion = await getPkgVersion(pkgPath);

    if (semver.lt(packageVersion, highestVersion)) {
      await updatePkgVersion(pkgPath, highestVersion);
      await updateChangelog(pkgPath, highestVersion);
    }
  });

  // Write updated package.json
  console.info(chalk.green(`Versions updated successfully!`));
}

updatePkgsForGenericBump().catch((err) => {
  console.error(err);
  process.exit(1);
});
