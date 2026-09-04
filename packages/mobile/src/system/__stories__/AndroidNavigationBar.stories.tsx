import React from 'react';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { AndroidNavigationBar } from '../AndroidNavigationBar';

const ThemeDemo = ({ colorScheme }: { colorScheme: 'light' | 'dark' }) => {
  const theme = useTheme();

  return (
    <VStack background="bg" gap={2} padding={2}>
      <AndroidNavigationBar />
      <Text font="title3">Active Color Scheme: {theme.activeColorScheme}</Text>
      <Text color="fgMuted" font="body">
        The Android navigation bar should match the theme background color.
      </Text>
      <VStack gap={1}>
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
      </VStack>
    </VStack>
  );
};

const AndroidNavigationBarScreen = () => {
  return (
    <ExampleScreen>
      <Example title="About AndroidNavigationBar">
        <VStack gap={2} padding={2}>
          <Text font="body">
            AndroidNavigationBar is a side-effect only component that renders null. When mounted, it
            updates the Android system navigation bar (bottom bar) colors to match the active CDS
            theme.
          </Text>
          <Text color="fgMuted" font="caption">
            Note: Only works on Android API 26+ (Android 8.0+). On iOS or older Android versions,
            the component has no effect.
          </Text>
        </VStack>
      </Example>

      <Example title="Light Theme">
        <ThemeDemo colorScheme="light" />
      </Example>
    </ExampleScreen>
  );
};

export default AndroidNavigationBarScreen;
