import { useState } from 'react';
import { IconButton } from '@cbhq/cds-web/buttons';
import { SelectOption } from '@cbhq/cds-web/controls';
import { Dropdown } from '@cbhq/cds-web/dropdown';
import { Box } from '@cbhq/cds-web/layout';
import { Text } from '@cbhq/cds-web/typography';

const moreMenuOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];

export const MoreMenu = () => {
  const [value, setValue] = useState<string>(moreMenuOptions[0]);

  const moreMenuContent = (
    <>
      <Box padding={2}>
        <Text as="h2" color="fgMuted" font="caption">
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
