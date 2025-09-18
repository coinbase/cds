import chalk from 'chalk';
import glob from 'fast-glob';
import fs from 'node:fs';
import path from 'node:path';

/** These packages are forced to be the same version! If you update this list,
 * you must also update the list in /libs/codegen/src/release/updatePkgsForGenericBump.ts
 */
const PACKAGES_TO_SYNC_VERSION = ['web', 'mobile', 'common', 'mcp-server'];

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;

if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT is undefined');

async function getPkgVersion(pkgJsonPath: string) {
  const pkgPath = path.dirname(pkgJsonPath);
  const pkgName = path.basename(pkgPath);
  const pkg = JSON.parse(await fs.promises.readFile(pkgJsonPath, 'utf8')) as {
    version: string;
    name: string;
  };

  console.info(chalk.gray(`${pkgName} version is ${pkg.version}.`));

  return pkg.version;
}

async function getChangelogVersion(changelogPath: string) {
  const changelogContent = fs.readFileSync(changelogPath, 'utf8');
  const versionHeaderRegex = /##\s(\d.*?)\s/;
  const versionHeaderMatch = changelogContent.match(versionHeaderRegex);

  if (versionHeaderMatch) {
    const versionNumber = versionHeaderMatch[1];
    console.info(chalk.gray(`${changelogPath} latest version is ${versionNumber}.`));

    return versionNumber;
  }
  throw new Error(chalk.red(`Could not find any versions in ${changelogPath}`));
}

async function validateCDSVersions() {
  const pkgJsonPaths = await glob(`packages/(${PACKAGES_TO_SYNC_VERSION.join('|')})/package.json`, {
    absolute: true,
    cwd: MONOREPO_ROOT,
    onlyFiles: true,
  });

  const changelogPaths = await glob(
    `packages/(${PACKAGES_TO_SYNC_VERSION.join('|')})/CHANGELOG.md`,
    {
      absolute: true,
      cwd: MONOREPO_ROOT,
      onlyFiles: true,
    },
  );

  const versions = await Promise.all(
    pkgJsonPaths.map(async (pkgJsonPath) =>
      getPkgVersion(pkgJsonPath).catch((error) => {
        console.error(chalk.red(`FAIL: ${error}`));
        return '';
      }),
    ),
  );

  const changelogVersions = await Promise.all(
    changelogPaths.map(async (changelogPath) =>
      getChangelogVersion(changelogPath).catch((error) => {
        console.error(chalk.red(`FAIL: ${error}`));
        return '';
      }),
    ),
  );

  if (versions.length && changelogVersions) {
    const combinedVersions = [...versions, ...changelogVersions];
    const versionsAligned = !combinedVersions.find((v) => combinedVersions[0] !== v);

    if (!versionsAligned) {
      throw new Error(
        chalk.red(
          `${PACKAGES_TO_SYNC_VERSION.join(
            ', ',
          )} package versions are not aligned. These versions must be the same.`,
        ),
      );
    }

    console.info(
      chalk.green(`${PACKAGES_TO_SYNC_VERSION.join(', ')} package versions are aligned!`),
    );
  } else {
    console.info(chalk.red(`No versions found.`));
  }
}

void validateCDSVersions();
