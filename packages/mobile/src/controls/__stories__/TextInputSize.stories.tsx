import React, { useState } from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import type { TextInputProps } from '../TextInput';
import { TextInput } from '../TextInput';

const MockTextInput = ({ ...props }: TextInputProps) => {
  const [text, onChangeText] = useState('');

  return <TextInput editable={__DEV__} onChangeText={onChangeText} value={text} {...props} />;
};

/**
 * One-off size density story for TextInput (s/m/l).
 * Do not fold these into TextInput.stories.tsx — keeps visual review of density isolated.
 */
const TextInputSizeScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="Default (resolves to size l)">
        <MockTextInput label="Username" placeholder="john.doe@coinbase.com" />
      </Example>
      <Example inline title="Deprecated compact (legacy behavior)">
        <MockTextInput compact label="Username" placeholder="john.doe@coinbase.com" />
      </Example>
      <Example inline title='size="s"'>
        <MockTextInput label="Username" placeholder="john.doe@coinbase.com" size="s" />
      </Example>
      <Example inline title='size="m"'>
        <MockTextInput label="Username" placeholder="john.doe@coinbase.com" size="m" />
      </Example>
      <Example inline title='size="l"'>
        <MockTextInput label="Username" placeholder="john.doe@coinbase.com" size="l" />
      </Example>
      <Example inline title='compact + size="m" (size wins)'>
        <MockTextInput compact label="Username" placeholder="john.doe@coinbase.com" size="m" />
      </Example>
      <Example inline title='size="s" with outside label'>
        <MockTextInput label="Amount" placeholder="0.00" size="s" suffix="USD" />
      </Example>
      <Example inline title='size="s" with inside label (horizontal)'>
        <MockTextInput
          label="Username"
          labelVariant="inside"
          placeholder="john.doe@coinbase.com"
          size="s"
        />
      </Example>
      <Example inline title='size="m" with inside label (horizontal)'>
        <MockTextInput
          label="Username"
          labelVariant="inside"
          placeholder="john.doe@coinbase.com"
          size="m"
        />
      </Example>
      <Example inline title='size="l" with inside label (vertical)'>
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
