import React, { useCallback, useState } from 'react';

import { IconButton } from '../../buttons/IconButton';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { HStack, VStack } from '../../layout';
import { Pressable } from '../../system';
import { TextHeadline, TextLabel1, TextLabel2 } from '../../typography';
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
        <TextLabel1>Reset</TextLabel1>
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
          <TextLabel1>➡️</TextLabel1>
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
    <TextHeadline>Slide me</TextHeadline>
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
          checkedLabel={<TextLabel2 color="fgInverse">Node checked label</TextLabel2>}
          uncheckedLabel={<TextLabel2>Node label</TextLabel2>}
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
