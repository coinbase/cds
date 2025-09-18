import React, { memo, useCallback, useMemo, useRef, useState } from 'react';

import { SelectOption } from '../controls/SelectOption';
import { Dropdown } from '../dropdown/Dropdown';
import type { DropdownRef } from '../dropdown/DropdownProps';
import { useA11yControlledVisibility } from '../hooks/useA11yControlledVisibility';
import { Icon } from '../icons';
import { Pressable } from '../system';
import { Text, type TextProps } from '../typography/Text';

import { navigationTitleDefaultElement } from './NavigationTitle';

export type NavigationTitleSelectProps = Omit<TextProps<React.ElementType>, 'onChange'> & {
  options: { label: React.ReactNode; id: string }[];
  value: string;
  onChange: (value: string) => void;
};

export const NavigationTitleSelect = memo(
  ({
    options,
    value,
    onChange,
    accessibilityLabel,
    color = 'fg',
    font = 'title1',
    as = navigationTitleDefaultElement,
    ...props
  }: NavigationTitleSelectProps) => {
    const [visible, setVisible] = useState(false);
    const dropdownRef = useRef<DropdownRef>(null);

    const { triggerAccessibilityProps, controlledElementAccessibilityProps } =
      useA11yControlledVisibility(visible, {
        accessibilityLabel: accessibilityLabel,
        hasPopupType: 'menu',
      });

    const handleCloseMenu = useCallback(() => {
      setVisible(false);
    }, []);

    const handleOpenMenu = useCallback(() => {
      setVisible(true);
    }, []);

    const dropdownContent = useMemo(() => {
      return options.map((option) => (
        <SelectOption key={option.id} title={option.label} value={option.id} />
      ));
    }, [options]);

    const label = useMemo(() => {
      return options.find((option) => option.id === value)?.label;
    }, [options, value]);

    return (
      <Dropdown
        ref={dropdownRef}
        content={dropdownContent}
        controlledElementAccessibilityProps={controlledElementAccessibilityProps}
        onChange={onChange}
        onCloseMenu={handleCloseMenu}
        onOpenMenu={handleOpenMenu}
      >
        <Pressable
          alignItems="center"
          aria-label={accessibilityLabel}
          background="transparent"
          gap={1}
          {...triggerAccessibilityProps}
        >
          {typeof label === 'string' ? (
            <Text as={as} color={color} font={font} {...props}>
              {label}
            </Text>
          ) : (
            label
          )}
          <Icon color={color} name="caretDown" size="s" />
        </Pressable>
      </Dropdown>
    );
  },
);

NavigationTitleSelect.displayName = 'NavigationTitleSelect';
