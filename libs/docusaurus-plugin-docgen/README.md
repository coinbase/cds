# @coinbase/docusaurus-plugin-docgen

Docusaurus plugin for accessing jsdocs parsed from components

## Setup

1. Install the plugin

```sh
yarn add @coinbase/docusaurus-plugin-docgen
```

2. Add the plugin to the docusaurus.config.js.

```js
module.exports = {
  // ...

  plugins: ['@coinbase/docusaurus-plugin-docgen', config],

  // ...
};
```

3. Provide config for `@coinbase/docusaurus-plugin-docgen`. See config section below for more options.

```js
const config = {
  /**
   * Absolute paths to tsconfig.json's for any projects that sourceFiles belong to.
   * When the plugin is run it will loop through each tsconfig and will parse any React Components.
   */
  entryPoints: [
    path.join(__dirname, '../packages/web/tsconfig.json'),
    path.join(__dirname, '../packages/mobile/tsconfig.json'),
    path.join(__dirname, '../packages/common/tsconfig.json'),
  ],
};

module.exports = {
  // ...

  plugins: ['@coinbase/docusaurus-plugin-docgen', config],

  // ...
};
```

4. Start docusaurus server and access docgen data from your docs.

```sh
yarn start
```

## Usage

### Raw API data

This plugin adds a webpack alias, `:docgen`, which provides access to the generated docgen. To access the output provided from plugin you can use the :docgen alias and the remaining path will be relative to parent directory that the tsconfig's passed into entryPoints belong to. So if entry point is `../packages/web/tsconfig.json`, to access docgen data for a file at `packages/web/buttons/Button.tsx` you would use `:docgen/web/buttons/Button/data`.

```js
---
title: Button
---

import buttonData from ':docgen/web/buttons/Button/data'; // for raw object


{console.log('docgen', buttonData)}

```

### API table

There is also a pre-styled API table available which handles rendering that docgen data. To access it uses same path as accessing raw data, but final file you want to access is the `api.mdx` file.

```js
import WebPropsTable from ':docgen/web/buttons/Button/api.mdx';
import MobilePropsTable from ':docgen/mobile/buttons/Button/api.mdx';

## Props

<Tabs groupId="platform" variant="secondary">
  <TabItem value="web" label="Web">
    <WebPropsTable />
  </TabItem>
  <TabItem value="mobile" label="Mobile">
    <MobilePropsTable />
  </TabItem>
</Tabs>

```

The API table requires adding `@coinbase/docusaurus-theme` in order to include the necessary styles.

You can also use the `@coinbase/docusaurus-preset` which includes `@coinbase/docusaurus-theme` and `@coinbase/docusaurus-plugin-docgen`, and configure with the preset's `docgen` option. The `docgen` preset option takes the same config as this standalone plugin.

## Config

## entryPoints

```js
const config = {
  /**
   * Absolute paths to tsconfig.json's for any projects that sourceFiles belong to.
   * When the plugin is run it will loop through each tsconfig and will parse any React Components.
   */
  entryPoints: [
    path.join(__dirname, '../packages/web/tsconfig.json'),
    path.join(__dirname, '../packages/mobile/tsconfig.json'),
    path.join(__dirname, '../packages/common/tsconfig.json'),
  ],
};
```

## formatPackageName

If you have a cross-platform library you may have two separate packages that have mirrored directory structures, but you want to visually display that information together. When you use the scaffold feature from plugin if there are two components with the same name and the same path (minus the parent), it will group those components together and use tabs to switch between them.

This formatPackageName will allow you to customize those Tab labels.

i.e. remove `@coinbase-cds` scope from `@coinbase/cds-mobile` and `@coinbase/cds-web` so that it returns just 'Mobile' and 'Web'.

```js
const config = {
  /**
   *
   */
  formatPackageName: (name) => {
    return name.replace('cds-', '');
  },
};
```

## onProcessDoc

TODO

```js
const config = {
  /**
   * When you use the templates from plugin, if there are two components with the same name coming from
   * two separate projects (cross platform), it will group those components together and use toggle to switch between them.
   * This formatPackageName will allow you to customize how that toggle is displayed.
   * i.e. remove `@coinbase-cds` scope from `@coinbase/cds-mobile` and `@coinbase/cds-web` so it returns just 'mobile' and 'web'.
   */
  formatPackageName: (name) => {
    return name.replace('cds-', '');
  },
};
```

## watch

```js
const config = {
  /**
   * Determines if plugin should re-run on file changes. If you spin up wesbite for first time
   * after installing plugin it will need to run once in order to populate cache (.docusaurus/docusaurus-plugin-docgen).
   * After that, as long as the cache is available it will not run unless again unless it's a build.
   * @default false
   */
  watch: process.env.THEME === 'refresh',
};
```

## watchInterval

```js
const config = {
  /**
   * How frequently (in minutes) should plugin run after it was last run.
   * @default 20
   */
  watchInterval: 20,
};
```
