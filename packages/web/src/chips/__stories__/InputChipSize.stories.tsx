import { HStack, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { InputChip } from '../InputChip';

export default {
  title: 'Components/Chips/InputChipSize',
  component: InputChip,
};

const NoopFn = () => {};

const LabeledExample = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <VStack gap={1}>
    <Text as="p" color="fgMuted" font="label2">
      {title}
    </Text>
    <HStack gap={2}>{children}</HStack>
  </VStack>
);

/**
 * One-off size density story for InputChip (xs/s).
 * Do not fold this into InputChip.stories.tsx — keeps visual review of density isolated.
 */
export const Size = () => (
  <VStack gap={3}>
    <LabeledExample title="Default (resolves to size s)">
      <InputChip onClick={NoopFn}>USD</InputChip>
    </LabeledExample>
    <LabeledExample title="Deprecated compact (legacy behavior, renders xs)">
      <InputChip compact onClick={NoopFn}>
        USD
      </InputChip>
    </LabeledExample>
    <LabeledExample title='size="xs"'>
      <InputChip onClick={NoopFn} size="xs">
        USD
      </InputChip>
    </LabeledExample>
    <LabeledExample title='size="s"'>
      <InputChip onClick={NoopFn} size="s">
        USD
      </InputChip>
    </LabeledExample>
    <LabeledExample title='compact + size="s" (size wins)'>
      <InputChip compact onClick={NoopFn} size="s">
        USD
      </InputChip>
    </LabeledExample>
  </VStack>
);
