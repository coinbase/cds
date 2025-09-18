import React, { memo, useCallback, useMemo, useRef, useState } from 'react';

import { SelectProvider } from '../controls/SelectContext';
import { SelectOption } from '../controls/SelectOption';
import { useSelect } from '../controls/useSelect';
import { Icon } from '../icons';
import { HStack } from '../layout/HStack';
import { type DrawerRefBaseProps, Tray } from '../overlays';
import { Pressable } from '../system';
import { Text, type TextProps } from '../typography/Text';

export type NavigationTitleSelectProps = Omit<TextProps, 'onChange'> & {
  options: { label: React.ReactNode; id: string }[];
  value: string;
  onChange: (value: string) => void;
};

export const NavigationTitleSelect = memo(
  ({
    options,
    value,
    onChange,
    color = 'fg',
    font = 'headline',
    accessibilityRole = 'header',
    ...props
  }: NavigationTitleSelectProps) => {
    const [visible, setVisible] = useState(false);
    const trayRef = useRef<DrawerRefBaseProps>(null);

    const handleCloseMenu = useCallback(() => {
      setVisible(false);
    }, []);
    const handleOpenMenu = useCallback(() => {
      setVisible(true);
    }, []);

    const handleOptionPress = useCallback(() => {
      trayRef.current?.handleClose();
    }, []);

    const label = useMemo(() => {
      return options.find((option) => option.id === value)?.label;
    }, [options, value]);

    const selectContextValue = useSelect({ onChange, value });

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
            <SelectProvider value={selectContextValue}>
              {options.map(({ id, label }) => (
                <SelectOption key={id} onPress={handleOptionPress} title={label} value={id} />
              ))}
            </SelectProvider>
          </Tray>
        )}
      </>
    );
  },
);

NavigationTitleSelect.displayName = 'NavigationTitleSelect';
