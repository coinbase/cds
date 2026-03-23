import '@coinbase/cds-icons/fonts/web/icon-font.css';

import { defaultFontStyles } from '@coinbase/cds-web/styles/defaultFont';
import { globalStyles } from '@coinbase/cds-web/styles/global';
import type { Preview } from '@storybook/react-vite';
import { themes } from '@storybook/theming';

import { StoryContainer } from './StoryContainer';

const themeConfigs = [
  {
    title: 'Theme: Default',
    value: 'defaultTheme',
  },
  {
    title: 'Theme: Default high contrast',
    value: 'defaultHighContrastTheme',
  },
] as const;

export type ThemeConfigValue = (typeof themeConfigs)[number]['value'];

const themeBackgroundColors = [
  {
    title: 'Background: bg',
    value: 'bg',
  },
  {
    title: 'Background: bgAlternate',
    value: 'bgAlternate',
  },
] as const;

export type ThemeBackgroundColorValue = (typeof themeBackgroundColors)[number]['value'];

const storyPadding = [
  {
    title: 'Padding: None',
    value: '0',
  },
  {
    title: 'Padding: 16px',
    value: '16',
  },
  {
    title: 'Padding: 24px',
    value: '24',
  },
] as const;

export type StoryPaddingValue = (typeof storyPadding)[number]['value'];

const preview: Preview = {
  decorators: [StoryContainer],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    globalStyles: `${globalStyles} ${defaultFontStyles}`,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'error',
      options: {
        runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
    darkMode: {
      dark: { ...themes.dark, barBg: themes.dark.appBg },
      light: { ...themes.light, barBg: themes.light.appBg },
    },
  },
  globalTypes: {
    themeConfig: {
      description: 'Theme config',
      toolbar: {
        title: 'Theme config',
        icon: 'paintbrush',
        items: themeConfigs,
        dynamicTitle: true,
      },
    },
    themeBackgroundColor: {
      description: 'Background color',
      toolbar: {
        title: 'Background color',
        icon: 'contrast',
        items: themeBackgroundColors,
        dynamicTitle: true,
      },
    },
    storyPadding: {
      description: 'Story padding',
      toolbar: {
        title: 'Story padding',
        icon: 'padding',
        items: storyPadding,
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    themeConfig: themeConfigs[0].value,
    themeBackgroundColor: themeBackgroundColors[0].value,
    storyPadding: storyPadding[0].value,
  },
};

export default preview;
