import { memo, useState } from 'react';
import { InputIconButton } from '@coinbase/cds-web/controls/InputIconButton';
import { TextInput } from '@coinbase/cds-web/controls/TextInput';

import { HStack } from '../../../layout';

export const TextInputExample = memo(() => {
  const [value, setValue] = useState('');

  return (
    <>
      <TextInput
        label="Label"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Outside label"
        style={{ flexGrow: 1 }}
        value={value}
      />
      <TextInput
        label="Label"
        labelVariant="inside"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Default input"
        style={{ flexGrow: 1 }}
        value={value}
      />
      <TextInput
        compact
        label="Label"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Compact input"
        style={{ flexGrow: 1 }}
        value={value}
      />
      {/* We are disabling this a11y check for contrast */}
      <HStack className="no-a11y-checks">
        <TextInput
          end={<InputIconButton transparent accessibilityLabel="Clear input" name="close" />}
          label="Label"
          labelVariant="inside"
          onChange={(e) => setValue(e.target.value)}
          placeholder="Input with icon button"
          value={value}
        />
      </HStack>
    </>
  );
});
