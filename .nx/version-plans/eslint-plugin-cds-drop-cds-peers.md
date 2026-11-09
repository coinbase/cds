---
eslint-plugin-cds: patch
---

Remove `@coinbase/cds-common`, `@coinbase/cds-mobile` and `@coinbase/cds-web` from `peerDependencies`. The plugin never imports them; its rules only match those package names in the linted source. Installers that auto-install required peers (pnpm, Bun, npm 7+) no longer pull `@coinbase/cds-mobile` and React Native into web-only projects that use the plugin.
