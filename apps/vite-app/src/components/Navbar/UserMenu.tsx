import { useCallback, useState } from 'react';
import { SelectOption } from '@cbhq/cds-web/controls';
import { Dropdown } from '@cbhq/cds-web/dropdown';
import { useA11yControlledVisibility } from '@cbhq/cds-web/hooks/useA11yControlledVisibility';
import { Pictogram } from '@cbhq/cds-web/illustrations';
import { Box, HStack } from '@cbhq/cds-web/layout';
import { Avatar } from '@cbhq/cds-web/media';
import { Pressable } from '@cbhq/cds-web/system';
import { Text } from '@cbhq/cds-web/typography';

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
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const { controlledElementAccessibilityProps } = useA11yControlledVisibility(dropdownVisible, {
    accessibilityLabel: 'User menu',
    hasPopupType: 'menu',
  });

  const handleOpenMenu = useCallback(() => {
    setDropdownVisible(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setDropdownVisible(false);
  }, []);

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
    <Dropdown
      {...controlledElementAccessibilityProps}
      content={userMenuContent}
      onChange={setValue}
      onCloseMenu={handleCloseMenu}
      onOpenMenu={handleOpenMenu}
      value={value}
      width={350}
    >
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
