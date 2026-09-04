import React from 'react';

import { Button } from '../../buttons';
import type { ThemeConfig } from '../../core/theme';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { VStack } from '../../layout/VStack';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import { ThemeProvider } from '../ThemeProvider';

const Child = ({ expectedColorScheme }: { expectedColorScheme: string }) => {
  const { activeColorScheme } = useTheme();

  return (
    <VStack background="bg">
      <VStack gap={3} padding={1}>
        <VStack>
          <Button variant="secondary">Secondary button</Button>
          <Button variant="primary">Primary button</Button>
          <Text color="bgSecondary" font="body">
            Secondary text
          </Text>
        </VStack>
        <VStack borderRadius={200} elevation={1} gap={1} padding={2}>
          <Text font="body">Elevation 1</Text>
          <Button variant="secondary">Secondary button</Button>
          <Button variant="primary">Primary button</Button>
        </VStack>
        <VStack borderRadius={200} elevation={2} gap={1} padding={2}>
          <Text font="body">Elevation 2</Text>
          <Button variant="secondary">Secondary button</Button>
          <Button variant="primary">Primary button</Button>
        </VStack>
        <Text font="body">Spectrum value at parent level: {activeColorScheme}</Text>
        <Text font="body">Should be {expectedColorScheme}</Text>
      </VStack>
    </VStack>
  );
};

const ChildThemeProviderDark = () => {
  return (
    <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
      <Child expectedColorScheme="dark" />
    </ThemeProvider>
  );
};

const customLightTheme = {
  ...defaultTheme,
  lightColor: {
    ...defaultTheme.lightColor,
    bg: `rgb(${defaultTheme.lightSpectrum.orange50})`,
    bgPrimary: `rgb(${defaultTheme.lightSpectrum.red20})`,
    bgSecondary: `rgb(${defaultTheme.lightSpectrum.blue50})`,
  },
} satisfies ThemeConfig;

const ChildThemeWithOverrides = () => {
  return (
    <ThemeProvider activeColorScheme="light" theme={customLightTheme}>
      <Text font="body">With theme overrides</Text>
      <Child expectedColorScheme="light" />
    </ThemeProvider>
  );
};

const customDarkTheme = {
  ...defaultTheme,
  darkColor: {
    ...defaultTheme.darkColor,
    bg: `rgb(${defaultTheme.darkSpectrum.orange50})`,
    bgPrimary: `rgb(${defaultTheme.darkSpectrum.red20})`,
    bgSecondary: `rgb(${defaultTheme.darkSpectrum.blue50})`,
  },
} satisfies ThemeConfig;

const ChildThemeWithOverridesDark = () => {
  return (
    <ThemeProvider activeColorScheme="dark" theme={customDarkTheme}>
      <Text font="body">With theme overrides</Text>
      <Child expectedColorScheme="dark" />
    </ThemeProvider>
  );
};

const ChildThemeWithNestedOverrides = () => {
  return (
    <ThemeProvider activeColorScheme="light" theme={customLightTheme}>
      <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
        <Text font="body">With theme overrides</Text>
        <Child expectedColorScheme="light" />
      </ThemeProvider>
    </ThemeProvider>
  );
};

const ChildThemeWithNestedOverridesDark = () => {
  return (
    <ThemeProvider activeColorScheme="dark" theme={customDarkTheme}>
      <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
        <Text font="body">With theme overrides</Text>
        <Child expectedColorScheme="dark" />
      </ThemeProvider>
    </ThemeProvider>
  );
};

const ThemeProviderTest = () => {
  return (
    <ExampleScreen>
      <Example title="Nested ThemeProviders">
        <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
          <VStack gap={3}>
            <Child expectedColorScheme="light" />
            <ChildThemeProviderDark />
            <ChildThemeWithOverrides />
            <ChildThemeWithOverridesDark />
            <ChildThemeWithNestedOverrides />
            <ChildThemeWithNestedOverridesDark />
          </VStack>
        </ThemeProvider>
      </Example>
    </ExampleScreen>
  );
};

export default ThemeProviderTest;
