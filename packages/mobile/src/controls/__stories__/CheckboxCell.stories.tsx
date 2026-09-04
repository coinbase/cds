import { useState } from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { CheckboxCell } from '../CheckboxCell';

const DefaultExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <CheckboxCell
      checked={checked}
      onChange={(value, newChecked) => setChecked(!!newChecked)}
      title="Default checkbox cell"
      value="default"
    />
  );
};

const WithDescriptionExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <CheckboxCell
      checked={checked}
      description="This is a helpful description that explains more about this option"
      onChange={(value, newChecked) => setChecked(!!newChecked)}
      title="Checkbox cell with description"
      value="with-description"
    />
  );
};

const StatesExample = () => {
  const [selectedState, setSelectedState] = useState(true);
  const [unselectedState, setUnselectedState] = useState(false);

  return (
    <VStack gap={2}>
      <CheckboxCell
        checked={selectedState}
        onChange={(value, newChecked) => setSelectedState(!!newChecked)}
        title="Selected checkbox cell"
        value="selected"
      />
      <CheckboxCell
        checked={unselectedState}
        description="This option is not selected"
        onChange={(value, newChecked) => setUnselectedState(!!newChecked)}
        title="Unselected checkbox cell"
        value="unselected"
      />
      <CheckboxCell
        checked
        disabled
        onChange={() => {}}
        title="Selected and disabled"
        value="selected-disabled"
      />
      <CheckboxCell
        disabled
        checked={false}
        onChange={() => {}}
        title="Disabled checkbox cell"
        value="disabled"
      />
    </VStack>
  );
};

const CustomContentExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <CheckboxCell
      checked={checked}
      description={
        <Text color="fgMuted" font="body">
          Custom description with <Text font="label1">bold text</Text>
        </Text>
      }
      onChange={(value, newChecked) => setChecked(!!newChecked)}
      title={
        <Text color="fgPrimary" font="headline">
          Custom Title Component
        </Text>
      }
      value="custom-content"
    />
  );
};

const InteractiveToggleExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <CheckboxCell
      checked={checked}
      description="Toggle this checkbox to see state changes"
      onChange={(value, newChecked) => setChecked(!!newChecked)}
      title="Interactive Checkbox"
      value="interactive"
    />
  );
};

const CustomStylingExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <CheckboxCell
      background="bgAlternate"
      borderColor="bgLinePrimary"
      borderRadius={300}
      borderWidth={200}
      checked={checked}
      columnGap={3}
      onChange={(value, newChecked) => setChecked(!!newChecked)}
      padding={3}
      pressedBorderWidth={400}
      rowGap={1}
      title="Custom styled checkbox cell"
      value="custom-styled"
    />
  );
};

const ContentStyleExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <CheckboxCell
      checked={checked}
      contentStyle={{
        backgroundColor: '#f0f8ff',
        padding: 12,
        borderRadius: 8,
      }}
      description="This checkbox has custom content styling applied"
      onChange={(value, newChecked) => setChecked(!!newChecked)}
      title="Content Style Example"
      value="content-style"
    />
  );
};

const WrapperStylesExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <CheckboxCell
      checked={checked}
      description="Press and hold to see the custom pressed border styling"
      onChange={(value, newChecked) => setChecked(!!newChecked)}
      title="Wrapper Styles Example"
      value="wrapper-styles"
      wrapperStyles={{
        base: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        },
        pressed: {
          borderColor: '#ff6b6b',
          borderWidth: 3,
          backgroundColor: '#ffe0e0',
        },
      }}
    />
  );
};

const CombinedStylingExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <CheckboxCell
      background="bgSecondary"
      borderRadius={400}
      checked={checked}
      contentStyle={{
        paddingVertical: 8,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderRadius: 6,
      }}
      description="This combines contentStyle and wrapperStyles for advanced customization"
      onChange={(value, newChecked) => setChecked(!!newChecked)}
      padding={4}
      title="Combined Styling Example"
      value="combined-styling"
      wrapperStyles={{
        pressed: {
          borderColor: '#3b82f6',
          borderWidth: 2,
          transform: [{ scale: 0.98 }],
        },
      }}
    />
  );
};

const AccessibilityExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <CheckboxCell
      accessibilityHint="Check this option to agree to the terms and conditions"
      accessibilityLabel="Terms and conditions agreement checkbox"
      checked={checked}
      description="By checking this box, you agree to our terms of service and privacy policy"
      onChange={(value, newChecked) => setChecked(!!newChecked)}
      title="I agree to the Terms and Conditions"
      value="terms-agreement"
    />
  );
};

const LongContentExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <CheckboxCell
      checked={checked}
      description="This is a very long description that demonstrates how the checkbox cell handles multi-line text. The description should wrap properly and maintain good readability. It can contain a lot of information to help users understand what they're agreeing to or selecting when they check this option."
      onChange={(value, newChecked) => setChecked(!!newChecked)}
      title="Checkbox Cell with Very Long Title That Demonstrates Text Wrapping and Layout Behavior"
      value="long-content"
    />
  );
};

const MultipleIndependentExample = () => {
  const [preferences, setPreferences] = useState({
    notifications: true,
    newsletter: false,
    marketing: false,
  });

  const handleChange = (value: keyof typeof preferences | undefined, checked?: boolean) => {
    if (value) {
      setPreferences((prev) => ({
        ...prev,
        [value]: !!checked,
      }));
    }
  };

  return (
    <VStack gap={2}>
      <Text font="headline" style={{ marginBottom: 8 }}>
        Individual Preferences:
      </Text>
      <CheckboxCell
        checked={preferences.notifications}
        description="Receive instant notifications on your device"
        onChange={handleChange}
        title="Push Notifications"
        value="notifications"
      />
      <CheckboxCell
        checked={preferences.newsletter}
        description="Get weekly updates about new features"
        onChange={handleChange}
        title="Newsletter"
        value="newsletter"
      />
      <CheckboxCell
        checked={preferences.marketing}
        description="Receive promotional offers and updates"
        onChange={handleChange}
        title="Marketing Emails"
        value="marketing"
      />
    </VStack>
  );
};

const CheckboxCellScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="Default">
        <DefaultExample />
      </Example>

      <Example inline title="With Description">
        <WithDescriptionExample />
      </Example>

      <Example inline title="States">
        <StatesExample />
      </Example>

      <Example inline title="Custom Content">
        <CustomContentExample />
      </Example>

      <Example inline title="Interactive Toggle">
        <InteractiveToggleExample />
      </Example>

      <Example inline title="Custom Styling">
        <CustomStylingExample />
      </Example>

      <Example inline title="Content Style">
        <ContentStyleExample />
      </Example>

      <Example inline title="Wrapper Styles">
        <WrapperStylesExample />
      </Example>

      <Example inline title="Combined Styling">
        <CombinedStylingExample />
      </Example>

      <Example inline title="Accessibility">
        <AccessibilityExample />
      </Example>

      <Example inline title="Long Content">
        <LongContentExample />
      </Example>

      <Example inline title="Multiple Independent Checkboxes">
        <MultipleIndependentExample />
      </Example>
    </ExampleScreen>
  );
};

export default CheckboxCellScreen;
