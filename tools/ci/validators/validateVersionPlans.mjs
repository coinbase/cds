import {
  color,
  logInfo as logInfoBase,
  logWarn as logWarnBase,
  logError as logErrorBase,
} from '../logging.mjs';
import { getProjectsMissingVersionPlans } from '../getVersionPlanCoverage.mjs';

export function validateVersionPlans(options = {}) {
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

    const missingPlans = await getProjectsMissingVersionPlans(logInfo, options);

    missingPlans.forEach((projectName) => {
      const planCommand = color.shell('yarn nx release plan');
      const privatePackageProp = color.shell('"private": true');

      logWarn(
        `No version plan for ${color.project(
          projectName,
        )}, please run ${planCommand}. If this package should not be published, add ${privatePackageProp} to its package.json.`,
      );
    });

    if (missingPlans.length) {
      logError(`Version plans are missing for ${missingPlans.length} package(s).`);
      process.exit(1);
    }
  };
}

validateVersionPlans()(process.stdout)
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
