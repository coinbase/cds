import { buildMobileConfig, legacyMobileConfig } from './configs/mobile';
import { buildWebConfig, legacyWebConfig } from './configs/web';
import { rules } from './rules';

const { name, version } =
  // `import`ing here would bypass the TSConfig's `"rootDir": "src"`
  require('../package.json') as typeof import('../package.json');

const plugin = {
  meta: { name, version },
  rules,
  configs: {
    'mobile-legacy': legacyMobileConfig,
    'web-legacy': legacyWebConfig,
  },
};

// in EsLint flat config format, configurations must reference the entire plugin object
// in legacy EsLint format, plugins were referenced by their name alone
Object.assign(plugin.configs, {
  web: buildWebConfig(plugin),
  mobile: buildMobileConfig(plugin),
});

export default plugin;
