import { memo, useState } from 'react';
import { TextInput } from '@coinbase/cds-mobile/controls/TextInput';

import { InputIconButton } from '../../../../controls';

export const TextInputExample = memo(() => {
  const [value, setValue] = useState('');

  return (
    <>
      <TextInput
        label="Label"
        onChangeText={setValue}
        placeholder="Outside label"
        style={{ flexGrow: 1 }}
        value={value}
      />
      <TextInput
        label="Label"
        labelVariant="inside"
        onChangeText={setValue}
        placeholder="Default input"
        style={{ flexGrow: 1 }}
        value={value}
      />
      <TextInput
        compact
        label="Label"
        onChangeText={setValue}
        placeholder="Compact input"
        style={{ flexGrow: 1 }}
        value={value}
      />
      <TextInput
        end={<InputIconButton accessibilityLabel="Clear input" name="close" />}
        label="Label"
        labelVariant="inside"
        onChangeText={setValue}
        placeholder="Input with icon button"
        value={value}
      />
    </>
  );
});
