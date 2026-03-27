import { useCallback, useState } from 'react';
import { IconButton } from '@coinbase/cds-web/buttons';
import { SelectOption } from '@coinbase/cds-web/controls';
import { Dropdown } from '@coinbase/cds-web/dropdown';
import { useA11yControlledVisibility } from '@coinbase/cds-web/hooks/useA11yControlledVisibility';
import { Box } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

const moreMenuOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];

export const MoreMenu = () => {
  const [value, setValue] = useState<string>(moreMenuOptions[0]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const { controlledElementAccessibilityProps } = useA11yControlledVisibility(dropdownVisible, {
    accessibilityLabel: 'More options menu',
    hasPopupType: 'menu',
  });

  const handleOpenMenu = useCallback(() => {
    setDropdownVisible(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setDropdownVisible(false);
  }, []);

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
    <Dropdown
      {...controlledElementAccessibilityProps}
      content={moreMenuContent}
      onChange={setValue}
      onCloseMenu={handleCloseMenu}
      onOpenMenu={handleOpenMenu}
      value={value}
    >
      <IconButton accessibilityLabel="More options" name="more" />
    </Dropdown>
  );
};
