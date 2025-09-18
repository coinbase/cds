import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { NavigationTitle } from '../NavigationTitle';

const BasicExample = () => (
  <Example title="Basic Usage">
    <NavigationTitle>Page Title</NavigationTitle>
  </Example>
);

const CustomFontExample = () => (
  <Example title="Custom Fonts">
    <VStack gap={2}>
      <NavigationTitle font="title1">Title 1 Font</NavigationTitle>
      <NavigationTitle font="headline">Headline Font (default)</NavigationTitle>
      <NavigationTitle font="title2">Title 2 Font</NavigationTitle>
      <NavigationTitle font="body">Body Font</NavigationTitle>
    </VStack>
  </Example>
);

const CustomColorExample = () => (
  <Example title="Custom Colors">
    <VStack gap={2}>
      <NavigationTitle color="fgPrimary">Primary Color</NavigationTitle>
      <NavigationTitle color="fgMuted">Muted Color</NavigationTitle>
      <NavigationTitle color="fg">Default Foreground</NavigationTitle>
    </VStack>
  </Example>
);

const LongTextExample = () => (
  <Example title="Long Text Handling">
    <VStack gap={2}>
      <NavigationTitle ellipsize="tail" numberOfLines={1}>
        This is a very long navigation title that should be truncated with ellipsis
      </NavigationTitle>
      <NavigationTitle numberOfLines={2}>
        This is a longer navigation title that can span multiple lines when needed
      </NavigationTitle>
    </VStack>
  </Example>
);

const TextAlignmentExample = () => (
  <Example title="Text Alignment">
    <VStack gap={2}>
      <NavigationTitle align="start">Left Aligned Title</NavigationTitle>
      <NavigationTitle align="center">Center Aligned Title</NavigationTitle>
      <NavigationTitle align="end">Right Aligned Title</NavigationTitle>
    </VStack>
  </Example>
);

const AccessibilityExample = () => (
  <Example title="Accessibility Features">
    <VStack gap={2}>
      <NavigationTitle
        accessibilityHint="Main page heading"
        accessibilityLabel="Dashboard page title"
      >
        Dashboard
      </NavigationTitle>
      <NavigationTitle accessibilityRole="text">Custom Accessibility Role</NavigationTitle>
      <NavigationTitle accessibilityRole="header">Header Role (default)</NavigationTitle>
    </VStack>
  </Example>
);

const StyledExample = () => (
  <Example title="Custom Styling">
    <VStack gap={2}>
      <NavigationTitle color="fgPrimary" font="title1" style={{ fontWeight: 'bold' }}>
        Bold Primary Title
      </NavigationTitle>
      <NavigationTitle align="center" color="fgMuted" style={{ fontStyle: 'italic' }}>
        Centered Italic Title
      </NavigationTitle>
      <NavigationTitle style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
        Uppercase Spaced Title
      </NavigationTitle>
    </VStack>
  </Example>
);

const RealWorldExamples = () => (
  <Example title="Real World Examples">
    <VStack gap={3}>
      <NavigationTitle>Portfolio</NavigationTitle>
      <NavigationTitle color="fgMuted" font="title2">
        Settings
      </NavigationTitle>
      <NavigationTitle ellipsize="tail" numberOfLines={1}>
        Transaction History
      </NavigationTitle>
      <NavigationTitle align="center" font="headline">
        Welcome Back
      </NavigationTitle>
      <NavigationTitle color="fgPrimary" font="title1" style={{ marginVertical: 4 }}>
        Account Overview
      </NavigationTitle>
    </VStack>
  </Example>
);

const TestIDExample = () => (
  <Example title="Test ID Support">
    <VStack gap={2}>
      <NavigationTitle testID="main-title">Main Page Title</NavigationTitle>
      <NavigationTitle font="title2" testID="section-title">
        Section Title
      </NavigationTitle>
    </VStack>
  </Example>
);

const VariousLengthsExample = () => (
  <Example title="Various Text Lengths">
    <VStack gap={2}>
      <NavigationTitle>Home</NavigationTitle>
      <NavigationTitle>Account Settings</NavigationTitle>
      <NavigationTitle>Transaction History and Details</NavigationTitle>
      <NavigationTitle ellipsize="tail" numberOfLines={1}>
        Very Long Navigation Title That Should Be Truncated Properly
      </NavigationTitle>
    </VStack>
  </Example>
);

const DefaultOverrideExample = () => (
  <Example title="Default Props Override">
    <VStack gap={2}>
      <NavigationTitle>Default Styling</NavigationTitle>
      <NavigationTitle accessibilityRole="text" color="fgMuted" font="body">
        All Defaults Overridden
      </NavigationTitle>
    </VStack>
  </Example>
);

const NavigationTitleScreen = () => {
  return (
    <ExampleScreen>
      <BasicExample />
      <CustomFontExample />
      <CustomColorExample />
      <LongTextExample />
      <TextAlignmentExample />
      <AccessibilityExample />
      <StyledExample />
      <RealWorldExamples />
      <TestIDExample />
      <VariousLengthsExample />
      <DefaultOverrideExample />
    </ExampleScreen>
  );
};

export default NavigationTitleScreen;
