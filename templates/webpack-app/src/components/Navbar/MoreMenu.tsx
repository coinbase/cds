import { IconButton } from '@coinbase/cds-web/buttons';
import { Box } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import { useState } from 'react';
import { SelectOption } from '@coinbase/cds-web/controls';
import { Dropdown } from '@coinbase/cds-web/dropdown';

const moreMenuOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];

export const MoreMenu = () => {
  const [value, setValue] = useState<string>(moreMenuOptions[0]);

  const moreMenuContent = (
    <>
      <Box padding={2}>
        <Text as="h2" font="caption" color="fgMuted">
          More menu
        </Text>
      </Box>
      {moreMenuOptions.map((option) => (
        <SelectOption key={option} title={option} value={option} />
      ))}
    </>
  );

  return (
    <Dropdown content={moreMenuContent} onChange={setValue} value={value}>
      <IconButton name="more" />
    </Dropdown>
  );
};
