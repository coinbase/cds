import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { selectCellMobileSpacingConfig } from '@coinbase/cds-common/tokens/select';

import { Cell } from '../cells/Cell';
import { CellAccessory } from '../cells/CellAccessory';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { Icon } from '../icons/Icon';
import { HStack } from '../layout/HStack';
import { type DrawerRefBaseProps } from '../overlays/drawer/Drawer';
import { Tray } from '../overlays/tray/Tray';
import { Pressable } from '../system/Pressable';
import { Text, type TextBaseProps, type TextProps } from '../typography/Text';

export type NavigationTitleSelectBaseProps = Omit<TextBaseProps, 'onChange'> & {
  options: { label: React.ReactNode; id: string }[];
  value: string;
  onChange: (value: string) => void;
};

export type NavigationTitleSelectProps = NavigationTitleSelectBaseProps &
  Omit<TextProps, 'onChange'>;

export const NavigationTitleSelect = memo((_props: NavigationTitleSelectProps) => {
  const mergedProps = useComponentConfig('NavigationTitleSelect', _props);
  const {
    options,
    value,
    onChange,
    color = 'fg',
    font = 'headline',
    accessibilityRole = 'header',
    ...props
  } = mergedProps;
  const [visible, setVisible] = useState(false);
  const trayRef = useRef<DrawerRefBaseProps>(null);

  const handleCloseMenu = useCallback(() => {
    setVisible(false);
  }, []);
  const handleOpenMenu = useCallback(() => {
    setVisible(true);
  }, []);

  const handleOptionPress = useCallback(
    (id: string) => {
      trayRef.current?.handleClose();
      onChange(id);
    },
    [onChange],
  );

  const label = useMemo(() => {
    return options.find((option) => option.id === value)?.label;
  }, [options, value]);

  return (
    <>
      <Pressable background="transparent" onPress={handleOpenMenu}>
        <HStack alignItems="center" gap={1}>
          {typeof label === 'string' ? (
            <Text accessibilityRole={accessibilityRole} color={color} font={font} {...props}>
              {label}
            </Text>
          ) : (
            label
          )}
          <Icon color={color} name="caretDown" size="s" testID="icon-caretDown" />
        </HStack>
      </Pressable>
      {visible && (
        <Tray ref={trayRef} onCloseComplete={handleCloseMenu}>
          {options.map(({ id, label }) => {
            const selected = id === value;
            return (
              <Cell
                key={id}
                accessibilityState={selected ? { selected: true } : undefined}
                accessory={selected ? <CellAccessory type="selected" /> : undefined}
                borderRadius={0}
                onPress={() => handleOptionPress(id)}
                selected={id === value}
                {...selectCellMobileSpacingConfig}
              >
                {!!label && (
                  <Text ellipsize="tail" font="headline" numberOfLines={1}>
                    {label}
                  </Text>
                )}
              </Cell>
            );
          })}
        </Tray>
      )}
    </>
  );
});

NavigationTitleSelect.displayName = 'NavigationTitleSelect';
