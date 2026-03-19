import { memo, useState } from 'react';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { Dropdown } from '@coinbase/cds-web/dropdown/Dropdown';
import { MenuItem } from '@coinbase/cds-web/dropdown/MenuItem';
import { VStack } from '@coinbase/cds-web/layout/VStack';

export const DropdownExample = memo(() => {
  const [value, setValue] = useState<string | undefined>();
  return (
    <Dropdown
      content={
        <VStack>
          <MenuItem value="account">Account</MenuItem>
          <MenuItem value="settings">Settings</MenuItem>
          <MenuItem value="support">Support</MenuItem>
        </VStack>
      }
      onChange={setValue}
      value={value}
    >
      <Button variant="secondary">{value ?? 'Menu'}</Button>
    </Dropdown>
  );
});
