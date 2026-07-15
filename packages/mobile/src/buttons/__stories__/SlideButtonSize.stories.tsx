import React, { useCallback, useState } from 'react';

import { IconButton } from '../../buttons/IconButton';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack, VStack } from '../../layout';
import { Text } from '../../typography';
import type { SlideButtonProps } from '../SlideButton';
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

export const SlideButtonSizeStories = () => {
  return (
    <ExampleScreen>
      <Example title="Default (renders as size l, 56px)">
        <SlideButtonExample uncheckedLabel="Default" />
      </Example>
      <Example title="Deprecated compact (renders as size s, 40px)">
        <SlideButtonExample compact uncheckedLabel="Compact (deprecated)" />
      </Example>
      <Example title="size='s' (40px)">
        <SlideButtonExample size="s" uncheckedLabel="Small" />
      </Example>
      <Example title="size='m' (48px)">
        <SlideButtonExample size="m" uncheckedLabel="Medium" />
      </Example>
      <Example title="size='l' (56px, default)">
        <SlideButtonExample size="l" uncheckedLabel="Large" />
      </Example>
      <Example title="compact + size='m' (size wins, renders as m/48px)">
        <SlideButtonExample compact size="m" uncheckedLabel="Size wins over compact" />
      </Example>
    </ExampleScreen>
  );
};

export default SlideButtonSizeStories;
