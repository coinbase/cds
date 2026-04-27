import {
  color,
  logInfo as logInfoBase,
  logWarn as logWarnBase,
  logError as logErrorBase,
} from '../logging.mjs';
import { projectsNeedingVersion } from '../getProjectsNeedingVersion.mjs';

export function validateVersioned(options = {}) {
  return async function (outputStream) {
    const logInfo = (msg) => {
      logInfoBase(msg, outputStream);
    };
    const logWarn = (msg) => {
      logWarnBase(msg, outputStream);
    };
    const logError = (msg) => {
      logErrorBase(msg, outputStream);
    };
    const unversionedPackages = await projectsNeedingVersion(logInfo, options);
    unversionedPackages.forEach((projectName) => {
      const versionCommand = color.shell(`yarn bump-version ${projectName}`);
      const privatePackageProp = color.shell('"private": true');

      logWarn(
        `Changelog not generated, please run ${versionCommand}. If this package should not be published, add ${privatePackageProp} to its package.json.`,
      );
    });

    if (unversionedPackages.length) {
      logError(`CHANGELOG entries are missing for ${unversionedPackages.length} package(s).`);
      process.exit(1);
    }
  };
}

validateVersioned()(process.stdout)
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
