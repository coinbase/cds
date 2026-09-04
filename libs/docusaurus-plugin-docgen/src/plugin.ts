import type { LoadContext, Plugin } from '@docusaurus/types';
import { DEFAULT_PLUGIN_ID } from '@docusaurus/utils';
import path from 'node:path';

import { docgenRunner } from './scripts/docgenRunner';
import { docgenWriter } from './scripts/docgenWriter';
import { logger } from './utils/logger';
import type { PluginContent, PluginOptions } from './types';

const PLUGIN_ID = '@coinbase/docusaurus-plugin-docgen';

export default function plugin(
  { generatedFilesDir }: LoadContext,
  { enabled = true, ...options }: PluginOptions,
): Plugin<PluginContent | undefined> {
  /**
   * The directory where we want to output docgen data and components.
   * If running on website, this will be in .docusaurus/@coinbase/docusaurus-plugin-docgen/default
   */
  const pluginDir = path.join(generatedFilesDir, PLUGIN_ID, options.id ?? DEFAULT_PLUGIN_ID);

  return {
    name: PLUGIN_ID,
    getPathsToWatch() {
      if (!enabled) return [];
      // Watch the src/ directory of each entry point package so that changes
      // to component source files trigger a reload
      return options.entryPoints.map(
        (tsconfigPath) => `${path.dirname(tsconfigPath)}/src/**/*.{ts,tsx}`,
      );
    },
    async loadContent() {
      if (enabled) {
        logger.init();
        return docgenRunner({ ...options, pluginDir });
      }
      logger.enabledOff();
      return undefined;
    },
    configureWebpack(_webpackConfig, _isServer, _utils, content) {
      let metadataAliases = {};
      let apiAliases = {};
      let dataAliases = {};
      let tocPropsAliases = {};
      if (content) {
        apiAliases = Object.fromEntries(
          content.parsedDocs.map((item) => [
            path.join(':docgen', path.relative(pluginDir, item.cacheDirectory), 'api.mdx'),
            path.join(item.cacheDirectory, 'api.mdx'),
          ]),
        );

        metadataAliases = Object.fromEntries(
          content.projects.map((item) => [
            path.join(':docgen', path.relative(pluginDir, item.cacheDirectory), 'metadata'),
            path.join(item.cacheDirectory, 'metadata.js'),
          ]),
        );

        dataAliases = Object.fromEntries(
          content.parsedDocs.map((item) => [
            path.join(':docgen', path.relative(pluginDir, item.cacheDirectory), 'data'),
            path.join(item.cacheDirectory, 'data.js'),
          ]),
        );

        tocPropsAliases = Object.fromEntries(
          content.parsedDocs.map((item) => [
            path.join(':docgen', path.relative(pluginDir, item.cacheDirectory), 'toc-props'),
            path.join(item.cacheDirectory, 'toc-props.js'),
          ]),
        );
      }

      // Styles API aliases - only create for docs that have styles data
      const stylesDataAliases = content
        ? Object.fromEntries(
            content.parsedDocs
              .filter((item) => item.styles && item.styles.selectors.length > 0)
              .map((item) => [
                path.join(':docgen', path.relative(pluginDir, item.cacheDirectory), 'styles-data'),
                path.join(item.cacheDirectory, 'styles-data.js'),
              ]),
          )
        : {};

      const tocStylesAliases = content
        ? Object.fromEntries(
            content.parsedDocs
              .filter((item) => item.styles && item.styles.selectors.length > 0)
              .map((item) => [
                path.join(':docgen', path.relative(pluginDir, item.cacheDirectory), 'toc-styles'),
                path.join(item.cacheDirectory, 'toc-styles.js'),
              ]),
          )
        : {};

      const aliases = {
        ...apiAliases,
        ...metadataAliases,
        ...dataAliases,
        ...tocPropsAliases,
        ...stylesDataAliases,
        ...tocStylesAliases,
        [`:docgen/_types/sharedTypeAliases`]: path.join(pluginDir, '_types/sharedTypeAliases'),
        [`:docgen/_types/sharedParentTypes`]: path.join(pluginDir, '_types/sharedParentTypes'),
      };

      return {
        resolve: {
          alias: aliases,
        },
      };
    },
    async contentLoaded({ content, actions }): Promise<void> {
      if (content) {
        const { projects, filesToWrite } = content;
        await docgenWriter(filesToWrite);
        actions.setGlobalData({ enabled: true, projects });
        logger.pluginComplete();
      } else {
        actions.setGlobalData({ enabled: false, projects: [] });
      }
    },
  };
}
