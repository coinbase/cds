import type { Config, Plugin } from '@docusaurus/types';
import path from 'node:path';
import { themes as prismThemes } from 'prism-react-renderer';

import commonPackageJson from '../../packages/common/package.json';
import iconsPackageJson from '../../packages/icons/package.json';
import illustrationsPackageJson from '../../packages/illustrations/package.json';
import mobilePackageJson from '../../packages/mobile/package.json';
import mobileVisualizationPackageJson from '../../packages/mobile-visualization/package.json';
import webPackageJson from '../../packages/web/package.json';
import webVisualizationPackageJson from '../../packages/web-visualization/package.json';

import docgenConfig from './docgen.config';

if (
  !(
    commonPackageJson.version === mobilePackageJson.version &&
    commonPackageJson.version === webPackageJson.version
  )
)
  throw new Error('CDS common, mobile, and web packages must be the same version!');

const webpackPlugin = () => {
  const plugin: Plugin = {
    name: 'cds-docusaurus-webpack-plugin',
    configureWebpack: (config) => ({
      resolve: {
        alias: {
          ...(config.mode === 'production'
            ? {}
            : {
                '@coinbase/cds-common': path.resolve(__dirname, '../../packages/common/src'),
                '@coinbase/cds-lottie-files': path.resolve(
                  __dirname,
                  '../../packages/lottie-files/src',
                ),
                '@coinbase/cds-icons': path.resolve(__dirname, '../../packages/icons/src'),
                '@coinbase/cds-illustrations': path.resolve(
                  __dirname,
                  '../../packages/illustrations/src',
                ),
                '@coinbase/cds-utils': path.resolve(__dirname, '../../packages/utils/src'),
                '@coinbase/cds-mobile': path.resolve(__dirname, '../../packages/mobile/src'),
                '@coinbase/cds-mobile-visualization': path.resolve(
                  __dirname,
                  '../../packages/mobile-visualization/src',
                ),
                '@coinbase/cds-web': path.resolve(__dirname, '../../packages/web/src'),
                '@coinbase/cds-web-visualization': path.resolve(
                  __dirname,
                  '../../packages/web-visualization/src',
                ),
              }),
        },
      },
      module: {
        rules: [
          config.mode === 'production'
            ? // Supports extensionless imports with ESM in all packages
              {
                test: /\.(js|ts)x?$/,
                include: /packages\//,
                resolve: {
                  fullySpecified: false,
                },
              }
            : {
                test: /\.(js|ts)x?$/,
                loader: '@linaria/webpack-loader',
                options: {
                  displayName: true,
                  sourceMap: true,
                  babelOptions: { configFile: true },
                },
              },
        ],
      },
    }),
  };
  return plugin;
};

const config: Config = {
  title: 'Coinbase Design System',
  tagline: '',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://cds.coinbase.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'frontend', // Usually your GitHub org/user name.
  projectName: 'cds', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Set the CDS package versions returned by the useCDSVersions hook
  customFields: {
    cdsCommonVersion: commonPackageJson.version,
    cdsIconsVersion: iconsPackageJson.version,
    cdsIllustrationsVersion: illustrationsPackageJson.version,
    cdsMobileVisualizationVersion: mobileVisualizationPackageJson.version,
    cdsWebVisualizationVersion: webVisualizationPackageJson.version,
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  future: {
    // Enable Rspack
    experimental_faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: false,
      lightningCssMinimizer: true,
      rspackBundler: true,
      mdxCrossCompilerCache: true,
    },
  },

  headTags: [
    {
      tagName: 'link',
      attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    },
    {
      tagName: 'link',
      attributes: { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400..600;1,14..32,400..600&display=swap',
      },
    },
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        gtag: {
          trackingID: 'G-VDXKBBVGVN',
        },
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: {
          blogTitle: 'CDS Blog',
          blogDescription: 'Coinbase Design System Blog',
          blogSidebarCount: 0, // Disable blog left sidebar
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    defaultMode: 'dark',
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    metadata: [
      {
        property: 'og:title',
        content: 'Coinbase Design System',
      },
      {
        property: 'og:description',
        content:
          'Documentation for the Coinbase Design System - A comprehensive collection of components, patterns, and guidelines for building crypto products.',
      },
      {
        name: 'description',
        content:
          'Documentation for the Coinbase Design System - A comprehensive collection of components, patterns, and guidelines for building crypto products.',
      },
      {
        name: 'keywords',
        content: 'design system, coinbase, components, documentation, ui, ux',
      },
    ],
    navbar: {
      items: [
        { type: 'search' },
        {
          href: 'https://cds-storybook.coinbase.com/',
          label: 'Storybook',
        },
        {
          href: 'https://coinbase.com/blog/Coinbase-has-open-sourced-its-design-system',
          label: 'Blog',
        },
        {
          href: 'https://github.com/coinbase/cds',
          label: 'GitHub',
        },
      ],
    },
    footer: {
      links: [
        {
          label: 'Storybook',
          href: 'https://cds-storybook.coinbase.com/',
        },
        {
          label: 'Github',
          href: 'https://github.com/coinbase/cds/tree/master',
        },
        {
          label: 'Blog',
          href: 'https://coinbase.com/blog/Coinbase-has-open-sourced-its-design-system',
        },
        {
          label: 'Careers',
          href: 'https://www.coinbase.com/careers',
        },
      ],
    },
    prism: {
      // If you update these you also need to update the prismThemes in apps/docs/src/theme/Playground/index.tsx and apps/docs/src/theme/CodeBlock/Content/String.tsx and apps/docs/src/components/page/ShareablePlayground/index.tsx
      theme: prismThemes.github,
      darkTheme: prismThemes.nightOwl,
    },
  },

  plugins: [
    ['@docusaurus/plugin-sitemap', { id: 'sitemap' }],
    [
      '@docusaurus/theme-live-codeblock',
      {
        id: 'codeblock',
      },
    ],
    [
      '@coinbase/docusaurus-plugin-kbar',
      {
        docs: {
          breadcrumbs: false,
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.ts'),
          sidebarCollapsible: true,
        },
      },
    ],
    ['@coinbase/docusaurus-plugin-docgen', docgenConfig],
    webpackPlugin,
    [
      '@coinbase/docusaurus-plugin-llm-dev-server',
      {
        generatorPath: path.join(__dirname, 'ai-doc-generator'),
      },
    ],
  ],
};

export default config;
