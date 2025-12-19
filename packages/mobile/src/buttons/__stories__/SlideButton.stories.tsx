import React, { useCallback, useState } from 'react';

import { IconButton } from '../../buttons/IconButton';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { HStack, VStack } from '../../layout';
import { Pressable } from '../../system';
import { Text } from '../../typography';
import type {
  SlideButtonBackgroundProps,
  SlideButtonHandleProps,
  SlideButtonProps,
} from '../SlideButton';
import { SlideButton } from '../SlideButton';

const SlideButtonExample = ({
  checked: checkedProp = false,
  uncheckedLabel,
  checkedLabel,
  ...props
}: Omit<SlideButtonProps, 'checked'> & { checked?: boolean }) => {
  const [checked, setChecked] = useState(checkedProp);

  const toggleOff = useCallback(() => setChecked(false), []);

  return (
    <VStack gap={1}>
      <HStack alignItems="center" gap={1} justifyContent="flex-end" paddingBottom={2}>
        <Text font="label1">Reset</Text>
        <IconButton compact name="refresh" onPress={toggleOff} />
      </HStack>
      <SlideButton
        checked={checked}
        checkedLabel={checkedLabel ?? 'Confirming...'}
        onChange={setChecked}
        uncheckedLabel={uncheckedLabel ?? 'Swipe to confirm'}
        {...props}
      />
    </VStack>
  );
};

const CustomHandle = ({ checked, ...props }: SlideButtonHandleProps) => {
  return (
    <Pressable
      {...props}
      accessibilityLabel="Demo button"
      accessibilityRole="button"
      background={checked ? 'bgPositive' : 'bgNegative'}
      borderRadius={300}
      width="100%"
    >
      <HStack alignItems="center" height="100%" justifyContent="center" width="100%">
        <HStack alignItems="center" height="100%" padding={2} pin="right">
          <Text font="label1">➡️</Text>
        </HStack>
      </HStack>
    </Pressable>
  );
};

const CustomBackground = ({ checked, ...props }: SlideButtonBackgroundProps) => (
  <HStack
    {...props}
    bordered
    alignItems="center"
    background="bgSecondary"
    borderColor={checked ? 'fgPositive' : 'fgNegative'}
    borderRadius={300}
    height="100%"
    justifyContent="center"
    width="100%"
  >
    <Text font="headline">Slide me</Text>
  </HStack>
);

export const SlideButtonStories = () => {
  return (
    <ExampleScreen>
      <Example title="Default">
        <SlideButtonExample />
      </Example>
      <Example title="Long label">
        <SlideButtonExample uncheckedLabel="Super long label that will get truncated when it exceeds the available space" />
      </Example>
      <Example title="Compact & long label">
        <SlideButtonExample
          compact
          uncheckedLabel="Super long label that will get truncated when it exceeds the available space"
        />
      </Example>
      <Example title="Auto complete slide on threshold met">
        <SlideButtonExample autoCompleteSlideOnThresholdMet />
      </Example>
      <Example title="With custom nodes">
        <SlideButtonExample
          endCheckedNode={<Icon color="fgInverse" name="bellCheck" size="m" />}
          startUncheckedNode={<Icon color="fgInverse" name="bell" size="m" />}
        />
      </Example>
      <Example title="Positive variant">
        <SlideButtonExample variant="positive" />
      </Example>
      <Example title="Negative variant">
        <SlideButtonExample variant="negative" />
      </Example>
      <Example title="Labels as nodes">
        <SlideButtonExample
          checkedLabel={
            <Text color="fgInverse" font="label2">
              Node checked label
            </Text>
          }
          uncheckedLabel={<Text font="label2">Node label</Text>}
        />
      </Example>
      <Example title="Disabled">
        <SlideButtonExample disabled />
      </Example>
      <Example title="Checked">
        <SlideButtonExample checked />
      </Example>
      <Example title="Checked and Disabled">
        <SlideButtonExample checked disabled />
      </Example>
      <Example title="Compact">
        <SlideButtonExample compact />
      </Example>
      <Example title="Compact and disabled">
        <SlideButtonExample compact disabled />
      </Example>
      <Example title="Custom components">
        <SlideButtonExample
          SlideButtonBackgroundComponent={CustomBackground}
          SlideButtonHandleComponent={CustomHandle}
          height={50}
        />
      </Example>
    </ExampleScreen>
  );
};

export default SlideButtonStories;
