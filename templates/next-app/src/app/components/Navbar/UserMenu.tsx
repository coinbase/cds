import { Box, HStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import { useState } from 'react';
import { SelectOption } from '@coinbase/cds-web/controls';
import { Dropdown } from '@coinbase/cds-web/dropdown';
import { Pictogram } from '@coinbase/cds-web/illustrations';
import { Pressable } from '@coinbase/cds-web/system';
import { Avatar } from '@coinbase/cds-web/media';

const userMenuOptions = [
  {
    name: 'Coinbase',
    value: 'coinbase',
    description: 'Buy, sell, use crypto',
    mediaName: 'coinbaseOneLogo',
  },
  {
    name: 'Wallet',
    value: 'wallet',
    description: 'The best self-hosted crypto wallet',
    mediaName: 'wallet',
  },
] as const;

export const UserMenu = () => {
  const [value, setValue] = useState<string>(userMenuOptions[0].value);
  const userMenuContent = (
    <>
      <Box padding={2}>
        <Text as="label" font="caption">
          For Individuals
        </Text>
      </Box>
      {userMenuOptions.map(({ name, value, description, mediaName }) => (
        <SelectOption
          key={name}
          description={description}
          media={<Pictogram name={mediaName} />}
          title={name}
          value={value}
        />
      ))}
    </>
  );
  return (
    <Dropdown content={userMenuContent} onChange={setValue} value={value} width={350}>
      <Pressable background="transparent">
        <HStack alignItems="center" gap={1}>
          <Avatar alt="User" src="https://avatars.githubusercontent.com/u/6711590" />
          <Text as="h2" font="headline">
            User
          </Text>
        </HStack>
      </Pressable>
    </Dropdown>
  );
};
