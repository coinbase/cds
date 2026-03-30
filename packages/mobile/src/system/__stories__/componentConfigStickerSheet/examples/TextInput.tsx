import React, { memo, useState } from 'react';

import { InputIconButton } from '../../../../controls/InputIconButton';
import { TextInput } from '../../../../controls/TextInput';
import { VStack } from '../../../../layout/VStack';

export const TextInputExample = memo(() => {
  const [value, setValue] = useState('12.34');

  return (
    <VStack gap={1}>
      <TextInput
        end={<InputIconButton accessibilityLabel="Clear input foregroundMuted" name="close" />}
        label="Amount (foregroundMuted)"
        onChangeText={setValue}
        placeholder="0.00"
        value={value}
        variant="foregroundMuted"
      />
      <TextInput
        end={<InputIconButton accessibilityLabel="Clear input primary" name="close" />}
        label="Amount (primary)"
        onChangeText={setValue}
        placeholder="0.00"
        value={value}
        variant="primary"
      />
      <TextInput
        end={<InputIconButton accessibilityLabel="Clear input positive" name="close" />}
        label="Amount (positive)"
        onChangeText={setValue}
        placeholder="0.00"
        value={value}
        variant="positive"
      />
      <TextInput
        end={<InputIconButton accessibilityLabel="Clear input negative" name="close" />}
        label="Amount (negative)"
        onChangeText={setValue}
        placeholder="0.00"
        value={value}
        variant="negative"
      />
    </VStack>
  );
});
