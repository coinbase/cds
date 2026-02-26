import { Button } from '../../buttons';
import { NativeTextArea } from '../../controls/NativeTextArea';
import { TextInput } from '../../controls/TextInput';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { FocusTrap } from '../FocusTrap';

export default {
  title: 'Components/FocusTrap',
  component: FocusTrap,
};

export const Playground = () => {
  return (
    <VStack gap={3}>
      <TextInput label="I am not within a FocusTrap" />
      <Button>Submit</Button>
      <FocusTrap>
        <VStack background="bgPrimaryWash" gap={1} padding={3}>
          <Text as="h1" display="block" font="headline">
            These components are trapped
          </Text>
          <TextInput label="Test 1" />
          <TextInput label="Test 2" />
          <TextInput label="Test 3" />
          <TextInput label="Test 4" />
          <Button>Submit</Button>
        </VStack>
      </FocusTrap>
    </VStack>
  );
};

export const SingleFocusableChild = () => {
  return (
    <VStack gap={3}>
      <TextInput label="I am not within a FocusTrap" />
      <Button>Submit</Button>
      <FocusTrap>
        <VStack background="bgPrimaryWash" gap={1} padding={3}>
          <Text as="h1" display="block" font="headline">
            This single component is trapped
          </Text>
          <TextInput label="Test 1" />
        </VStack>
      </FocusTrap>
    </VStack>
  );
};

export const TextArea = () => {
  return (
    <FocusTrap>
      <VStack background="bgPrimaryWash" gap={3} padding={3}>
        <Text as="h1" display="block" font="headline">
          Up/Down arrow keys should work
        </Text>
        <VStack background="bg">
          <NativeTextArea placeholder="Type a message..." rows={3} />
        </VStack>
        <Button>Submit</Button>
      </VStack>
    </FocusTrap>
  );
};
