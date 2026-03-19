import { memo, useState } from 'react';
import { TextInput } from '@coinbase/cds-web/controls/TextInput';

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
    </>
  );
});
