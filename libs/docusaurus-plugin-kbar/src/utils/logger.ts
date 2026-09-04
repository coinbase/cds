import log from '@docusaurus/logger';

const PREFIX = 'docusaurus-plugin-kbar';

export const logger = {
  init: () => {
    log.info(`${PREFIX}: Checking config`);
  },
  pluginComplete: () => {
    log.success(`${PREFIX}: Success`);
  },
};
