import React from 'react';
import type { ColorScheme } from '@coinbase/cds-common/core/theme';

import { Button } from '../../buttons';
import type { ThemeConfig } from '../../core/theme';
import { useTheme } from '../../hooks/useTheme';
import { VStack } from '../../layout/VStack';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import { ThemeProvider, useThemeProviderStyles } from '../ThemeProvider';

const Child = ({ expectedColorScheme }: { expectedColorScheme: ColorScheme }) => {
  const theme = useTheme();
  return (
    <VStack background="bg">
      <VStack gap={3} padding={1}>
        <VStack>
          <Button variant="secondary">Secondary button</Button>
          <Button variant="primary">Primary button</Button>
          <Text as="p" color="bgSecondary" display="block" font="body">
            Secondary text
          </Text>
        </VStack>
        <VStack bordered borderRadius={400} elevation={1} gap={1} padding={2}>
          <Text as="p" display="block" font="body">
            Elevation 1
          </Text>
          <Button variant="secondary">Secondary button</Button>
          <Button variant="primary">Primary button</Button>
        </VStack>
        <VStack bordered borderRadius={400} elevation={2} gap={1} padding={2}>
          <Text as="p" display="block" font="body">
            Elevation 2
          </Text>
          <Button variant="secondary">Secondary button</Button>
          <Button variant="primary">Primary button</Button>
        </VStack>
        <Text as="p" display="block" font="body">
          ClassName value at nested ThemeProvider parent level: {theme.activeColorScheme}
        </Text>
        <Text as="p" display="block" font="body">
          Should be {expectedColorScheme}
        </Text>
      </VStack>
    </VStack>
  );
};

const StyledThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const style = useThemeProviderStyles(theme);
  return <div style={style}>{children}</div>;
};

const ChildThemeProviderDark = () => {
  const theme = useTheme();
  return (
    <ThemeProvider activeColorScheme="dark" theme={theme}>
      <StyledThemeProvider>
        <Child expectedColorScheme="dark" />
      </StyledThemeProvider>
    </ThemeProvider>
  );
};

const customTheme: ThemeConfig = {
  ...defaultTheme,
  lightColor: {
    ...defaultTheme.lightColor,
    bg: `rgb(${defaultTheme.lightSpectrum.orange50})`,
    bgPrimary: `rgb(${defaultTheme.lightSpectrum.red20})`,
    bgSecondary: `rgb(${defaultTheme.lightSpectrum.blue50})`,
  },
  darkColor: {
    ...defaultTheme.darkColor,
    bg: `rgb(${defaultTheme.darkSpectrum.orange50})`,
    bgPrimary: `rgb(${defaultTheme.darkSpectrum.red20})`,
    bgSecondary: `rgb(${defaultTheme.darkSpectrum.blue50})`,
  },
};

const ChildThemeWithOverrides = () => {
  const theme = useTheme();
  return (
    <ThemeProvider activeColorScheme={theme.activeColorScheme} theme={customTheme}>
      <Text as="p" display="block" font="body">
        With theme overrides
      </Text>
      <Child expectedColorScheme="light" />
    </ThemeProvider>
  );
};

const ChildThemeWithOverridesDark = () => {
  return (
    <ThemeProvider activeColorScheme="dark" theme={customTheme}>
      <Text as="p" display="block" font="body">
        With theme overrides
      </Text>
      <Child expectedColorScheme="dark" />
    </ThemeProvider>
  );
};

const ChildThemeWithNestedOverrides = () => {
  const theme = useTheme();
  return (
    <ThemeProvider activeColorScheme={theme.activeColorScheme} theme={customTheme}>
      <ThemeProvider activeColorScheme="light" theme={theme}>
        <Text as="p" display="block" font="body">
          With nested theme overrides
        </Text>
        <Child expectedColorScheme="light" />
      </ThemeProvider>
    </ThemeProvider>
  );
};

const ChildThemeWithNestedOverridesDark = () => {
  const theme = useTheme();
  return (
    <ThemeProvider activeColorScheme="dark" theme={customTheme}>
      <ThemeProvider activeColorScheme="dark" theme={theme}>
        <Text as="p" display="block" font="body">
          With nested theme overrides
        </Text>
        <Child expectedColorScheme="dark" />
      </ThemeProvider>
    </ThemeProvider>
  );
};

export const ThemeProviderTest = () => {
  const theme = useTheme();
  return (
    <ThemeProvider activeColorScheme="light" theme={theme}>
      <VStack gap={3}>
        <Child expectedColorScheme="light" />
        <ChildThemeProviderDark />
        <ChildThemeWithOverrides />
        <ChildThemeWithOverridesDark />
        <ChildThemeWithNestedOverrides />
        <ChildThemeWithNestedOverridesDark />
      </VStack>
    </ThemeProvider>
  );
};

ThemeProviderTest.parameters = {
  a11y: {
    config: {
      /**
       * Color contrast ratio doesn't need to meet 4.5:1, as these are test examples for color override
       * @link https://dequeuniversity.com/rules/axe/4.3/color-contrast
       */
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export default {
  title: 'Components/ThemeProvider',
  parameters: {
    a11y: {
      test: 'off',
    },
  },
};
