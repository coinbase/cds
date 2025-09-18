import log from '@docusaurus/logger';

const PREFIX = 'docusaurus-plugin-docgen';

export const logger = {
  init: () => {
    log.info(`${PREFIX}: Checking config`);
  },
  lastUpdate: (lastUpdate: number) => {
    log.info(`${PREFIX}: Last update was ${lastUpdate.toFixed(2)} minutes ago...`);
  },
  initStatus: (shouldUpdate: boolean) => {
    log.info(`${PREFIX}: ${shouldUpdate ? 'Starting...' : 'Skipping...'}`);
  },
  enabledOff: () => {
    log.info(`${PREFIX}: enabled:false. Skipping...`);
  },
  matchingDocError: (name: string) => {
    log.error(`${PREFIX}: Unable to find matching category for ${name}`);
  },
  preppingData: () => {
    log.info(`${PREFIX}: Prepping data`);
  },
  forceIsTrue: () => {
    log.info(`${PREFIX}: forceDocs: true. Overwritting...`);
  },
  forceIsFalse: (dir: string) => {
    log.info(`${PREFIX}: forceDocs: false & ${dir} already exists. Skipping...`);
  },
  preppingDoc: (doc: string) => {
    log.info(`${PREFIX}: ${doc} has not been generated yet. Prepping...`);
  },
  writingData: () => {
    log.info(`${PREFIX}: Writing data...`);
  },
  pluginComplete: () => {
    log.success(`${PREFIX}: Success`);
  },
};
