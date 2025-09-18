import {
  LogOutStream,
  LogParam,
  color,
  logInfo as logInfoBase,
  logWarn as logWarnBase,
  logError as logErrorBase,
} from '../logging';
import { projectsNeedingVersion } from '../getProjectsNeedingVersion';
import { PackageVersionCheckOptions } from '../getAffectedPackages';

export function validateVersioned(options: Partial<PackageVersionCheckOptions> = {}) {
  return async function (outputStream: LogOutStream) {
    const logInfo = (msg: LogParam) => {
      logInfoBase(msg, outputStream);
    };
    const logWarn = (msg: LogParam) => {
      logWarnBase(msg, outputStream);
    };
    const logError = (msg: LogParam) => {
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
