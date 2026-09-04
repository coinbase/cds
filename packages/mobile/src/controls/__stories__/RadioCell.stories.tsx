import { useState } from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { RadioCell } from '../RadioCell';

const DefaultExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Example inline title="Default">
      <RadioCell
        checked={checked}
        onChange={(_, checked) => setChecked(checked ?? false)}
        title="Default radio cell"
        value="default"
      />
    </Example>
  );
};

const WithDescriptionExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Example inline title="With Description">
      <RadioCell
        checked={checked}
        description="This is a helpful description that explains more about this option"
        onChange={(_, checked) => setChecked(checked ?? false)}
        title="Radio cell with description"
        value="with-description"
      />
    </Example>
  );
};

const StatesExample = () => {
  return (
    <Example inline title="States">
      <VStack gap={1} width="100%">
        <RadioCell checked title="Selected radio cell" value="selected" />
        <RadioCell
          description="This option is not selected"
          title="Unselected radio cell"
          value="unselected"
        />
        <RadioCell checked disabled title="Selected and disabled" value="selected-disabled" />
        <RadioCell disabled title="Disabled radio cell" value="disabled" />
      </VStack>
    </Example>
  );
};

const CustomContentExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Example inline title="Custom Content">
      <RadioCell
        checked={checked}
        description={
          <Text color="fgMuted" font="body">
            Custom description with <Text font="label1">bold text</Text>
          </Text>
        }
        onChange={(_, checked) => setChecked(!!checked)}
        title={
          <Text color="fgPrimary" font="headline">
            Custom Title Component
          </Text>
        }
        value="custom-content"
      />
    </Example>
  );
};

const InteractiveGroupExample = () => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>('option1');
  const options = [
    { value: 'option1', title: 'First Option', description: 'This is the first choice' },
    { value: 'option2', title: 'Second Option', description: 'This is the second choice' },
    { value: 'option3', title: 'Third Option', description: 'This is the third choice' },
  ];

  return (
    <Example inline title="Interactive Group">
      <Text font="headline" style={{ marginBottom: 8 }}>
        Choose an option:
      </Text>
      <VStack gap={1}>
        {options.map((option) => (
          <RadioCell
            key={option.value}
            checked={selectedValue === option.value}
            description={option.description}
            onChange={(value) => setSelectedValue(value ?? undefined)}
            title={option.title}
            value={option.value}
          />
        ))}
      </VStack>
    </Example>
  );
};

const ColorSelectionGroupExample = () => {
  const [selectedColor, setSelectedColor] = useState<string | undefined>('blue');
  const colorOptions = [
    { value: 'blue', title: 'Blue', description: 'A calming blue color' },
    { value: 'red', title: 'Red', description: 'A vibrant red color' },
    { value: 'green', title: 'Green', description: 'A natural green color' },
    { value: 'yellow', title: 'Yellow', description: 'A bright yellow color' },
  ];

  return (
    <Example inline title="Color Selection Group">
      <Text font="headline" style={{ marginBottom: 8 }}>
        Select your favorite color:
      </Text>
      <VStack gap={1}>
        {colorOptions.map((option) => (
          <RadioCell
            key={option.value}
            checked={selectedColor === option.value}
            description={option.description}
            onChange={(value, checked) => setSelectedColor(checked ? value : undefined)}
            title={option.title}
            value={option.value}
          />
        ))}
      </VStack>
    </Example>
  );
};

const CustomStylingExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Example inline title="Custom Styling">
      <RadioCell
        background="bgAlternate"
        borderColor="bgLine"
        borderRadius={300}
        borderWidth={200}
        checked={checked}
        columnGap={3}
        onChange={(_, checked) => setChecked(!!checked)}
        padding={3}
        rowGap={1}
        title="Custom styled radio cell"
        value="custom-styled"
      />
    </Example>
  );
};

const ContentStyleExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Example inline title="Content Style">
      <RadioCell
        checked={checked}
        contentStyle={{
          backgroundColor: '#f0f8ff',
          padding: 12,
          borderRadius: 8,
        }}
        description="This radio has custom content styling applied"
        onChange={(_, checked) => setChecked(!!checked)}
        title="Content Style Example"
        value="content-style"
      />
    </Example>
  );
};

const WrapperStylesExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Example inline title="Wrapper Styles">
      <RadioCell
        checked={checked}
        description="Press and hold to see the custom pressed border styling"
        onChange={(_, checked) => setChecked(!!checked)}
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
    </Example>
  );
};

const CombinedStylingExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Example inline title="Combined Styling">
      <RadioCell
        background="bgSecondary"
        borderRadius={400}
        checked={checked}
        contentStyle={{
          paddingVertical: 8,
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderRadius: 6,
        }}
        description="This combines contentStyle and wrapperStyles for advanced customization"
        onChange={(_, checked) => setChecked(!!checked)}
        padding={4}
        title="Combined Styling Example"
        value="combined-styling"
        wrapperStyles={{
          pressed: {
            borderColor: '#3b82f6',
            borderWidth: 2,
          },
        }}
      />
    </Example>
  );
};

const AccessibilityExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Example inline title="Accessibility">
      <RadioCell
        accessibilityHint="Select this option to enable notifications"
        accessibilityLabel="Enable notifications radio button"
        checked={checked}
        description="You will receive push notifications when this is enabled"
        onChange={(_, checked) => setChecked(!!checked)}
        title="Enable Notifications"
        value="enable-notifications"
      />
    </Example>
  );
};

const LongContentExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Example inline title="Long Content">
      <RadioCell
        checked={checked}
        description="This is a very long description that demonstrates how the radio cell handles multi-line text. The description should wrap properly and maintain good readability. It can contain a lot of information to help users make informed decisions about their selection."
        onChange={(_, checked) => setChecked(!!checked)}
        title="Radio Cell with Very Long Title That Demonstrates Text Wrapping Behavior"
        value="long-content"
      />
    </Example>
  );
};

const RadioCellScreen = () => {
  return (
    <ExampleScreen>
      <DefaultExample />
      <WithDescriptionExample />
      <StatesExample />
      <CustomContentExample />
      <InteractiveGroupExample />
      <ColorSelectionGroupExample />
      <CustomStylingExample />
      <ContentStyleExample />
      <WrapperStylesExample />
      <CombinedStylingExample />
      <AccessibilityExample />
      <LongContentExample />
    </ExampleScreen>
  );
};

export default RadioCellScreen;
