import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { NavigationSubtitle } from '../NavigationSubtitle';

const BasicExample = () => (
  <Example title="Basic Usage">
    <NavigationSubtitle>Last updated 2 minutes ago</NavigationSubtitle>
  </Example>
);

const CustomColorExample = () => (
  <Example title="Custom Colors">
    <VStack gap={2}>
      <NavigationSubtitle color="fgMuted">Muted subtitle text</NavigationSubtitle>
      <NavigationSubtitle color="fgPrimary">Primary subtitle text</NavigationSubtitle>
      <NavigationSubtitle color="fg">Default foreground text</NavigationSubtitle>
    </VStack>
  </Example>
);

const CustomFontExample = () => (
  <Example title="Custom Fonts">
    <VStack gap={2}>
      <NavigationSubtitle font="label1">Label 1 font size</NavigationSubtitle>
      <NavigationSubtitle font="label2">Label 2 font size (default)</NavigationSubtitle>
      <NavigationSubtitle font="caption">Caption font size</NavigationSubtitle>
      <NavigationSubtitle font="body">Body font size</NavigationSubtitle>
    </VStack>
  </Example>
);

const LongTextExample = () => (
  <Example title="Long Text">
    <NavigationSubtitle ellipsize="tail" numberOfLines={1}>
      This is a very long subtitle that might overflow the container and should be truncated with an
      ellipsis
    </NavigationSubtitle>
  </Example>
);

const MultilineExample = () => (
  <Example title="Multiline Text">
    <NavigationSubtitle numberOfLines={2}>
      This is a longer subtitle that can span multiple lines when needed to display more information
    </NavigationSubtitle>
  </Example>
);

const AccessibilityExample = () => (
  <Example title="Accessibility Features">
    <VStack gap={2}>
      <NavigationSubtitle
        accessibilityHint="Shows the last sync status"
        accessibilityLabel="Last updated timestamp"
      >
        Synced 5 minutes ago
      </NavigationSubtitle>
      <NavigationSubtitle accessibilityRole="text">Custom accessibility role</NavigationSubtitle>
    </VStack>
  </Example>
);

const StyledExample = () => (
  <Example title="Custom Styling">
    <VStack gap={2}>
      <NavigationSubtitle
        align="center"
        color="fgMuted"
        font="label1"
        style={{ fontStyle: 'italic' }}
      >
        Centered italic subtitle
      </NavigationSubtitle>
      <NavigationSubtitle align="end" color="fgPrimary" style={{ textTransform: 'uppercase' }}>
        End aligned uppercase
      </NavigationSubtitle>
    </VStack>
  </Example>
);

const RealWorldExamples = () => (
  <Example title="Real World Examples">
    <VStack gap={3}>
      <NavigationSubtitle>Balance as of Dec 15, 2023</NavigationSubtitle>
      <NavigationSubtitle color="fgMuted">3 transactions pending</NavigationSubtitle>
      <NavigationSubtitle ellipsize="tail" numberOfLines={1}>
        Connected to Main Wallet (0x1234...5678)
      </NavigationSubtitle>
      <NavigationSubtitle font="caption">Auto-refresh in 30 seconds</NavigationSubtitle>
    </VStack>
  </Example>
);

const InteractiveExample = () => {
  const [timestamp, setTimestamp] = React.useState(new Date().toLocaleTimeString());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Example title="Live Timestamp">
      <NavigationSubtitle color="fgMuted">Current time: {timestamp}</NavigationSubtitle>
    </Example>
  );
};

const DefaultOverrideExample = () => (
  <Example title="Default Props Override">
    <VStack gap={2}>
      <NavigationSubtitle>Default styling</NavigationSubtitle>
      <NavigationSubtitle accessibilityRole="button" color="fgPrimary" font="headline">
        All defaults overridden
      </NavigationSubtitle>
    </VStack>
  </Example>
);

const NavigationSubtitleScreen = () => {
  return (
    <ExampleScreen>
      <BasicExample />
      <CustomColorExample />
      <CustomFontExample />
      <LongTextExample />
      <MultilineExample />
      <AccessibilityExample />
      <StyledExample />
      <RealWorldExamples />
      <InteractiveExample />
      <DefaultOverrideExample />
    </ExampleScreen>
  );
};

export default NavigationSubtitleScreen;
