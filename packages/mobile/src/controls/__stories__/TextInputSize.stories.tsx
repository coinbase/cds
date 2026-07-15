import { useState } from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import type { TextInputProps } from '../TextInput';
import { TextInput } from '../TextInput';

const MockTextInput = (props: TextInputProps) => {
  const [text, onChangeText] = useState(typeof props.value === 'string' ? props.value : '');

  return <TextInput editable={__DEV__} onChangeText={onChangeText} value={text} {...props} />;
};

/**
 * One-off t-shirt size stories for TextInput (s/m/l).
 * Do not fold these into TextInput.stories.tsx — keeps visual review of sizing isolated.
 */
const TextInputSizeScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default (resolves to size l)">
        <MockTextInput label="Username" placeholder="john.doe@coinbase.com" />
      </Example>
      <Example title="Deprecated compact (renders as size s)">
        <MockTextInput compact label="Username" placeholder="john.doe@coinbase.com" />
      </Example>
      <Example title='size="s"'>
        <MockTextInput label="Username" placeholder="john.doe@coinbase.com" size="s" />
      </Example>
      <Example title='size="m"'>
        <MockTextInput label="Username" placeholder="john.doe@coinbase.com" size="m" />
      </Example>
      <Example title='size="l"'>
        <MockTextInput label="Username" placeholder="john.doe@coinbase.com" size="l" />
      </Example>
      <Example title='compact + size="m" (size wins)'>
        <MockTextInput compact label="Username" placeholder="john.doe@coinbase.com" size="m" />
      </Example>
      <Example title='size="s" with outside label'>
        <MockTextInput label="Amount" placeholder="0.00" size="s" suffix="USD" />
      </Example>
      <Example title='size="s" with inside label (horizontal)'>
        <MockTextInput
          label="Username"
          labelVariant="inside"
          placeholder="john.doe@coinbase.com"
          size="s"
        />
      </Example>
      <Example title='size="m" with inside label (horizontal)'>
        <MockTextInput
          label="Username"
          labelVariant="inside"
          placeholder="john.doe@coinbase.com"
          size="m"
        />
      </Example>
      <Example title='size="l" with inside label (vertical)'>
        <MockTextInput
          label="Username"
          labelVariant="inside"
          placeholder="john.doe@coinbase.com"
          size="l"
        />
      </Example>
    </ExampleScreen>
  );
};

export default TextInputSizeScreen;
