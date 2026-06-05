import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { selectCellSpacingConfig } from '@coinbase/cds-common/tokens/select';

import { Cell } from '../cells/Cell';
import { Dropdown } from '../dropdown/Dropdown';
import type { DropdownRef } from '../dropdown/DropdownProps';
import { useA11yControlledVisibility } from '../hooks/useA11yControlledVisibility';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { Icon } from '../icons';
import { Pressable } from '../system';
import { Text, type TextBaseProps, type TextProps } from '../typography/Text';

import { navigationTitleDefaultElement } from './NavigationTitle';

export type NavigationTitleSelectBaseProps = Omit<TextBaseProps, 'onChange'> & {
  options: { label: React.ReactNode; id: string }[];
  value: string;
  onChange: (value: string) => void;
};

export type NavigationTitleSelectProps = NavigationTitleSelectBaseProps &
  Omit<TextProps<React.ElementType>, 'onChange'>;

export const NavigationTitleSelect = memo((_props: NavigationTitleSelectProps) => {
  const mergedProps = useComponentConfig('NavigationTitleSelect', _props);
  const {
    options,
    value,
    onChange,
    accessibilityLabel,
    color = 'fg',
    font = 'title1',
    as = navigationTitleDefaultElement,
    ...props
  } = mergedProps;
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

  const handleOptionClick = useCallback(
    (id: string) => {
      onChange(id);
      dropdownRef.current?.closeMenu();
    },
    [onChange],
  );

  const dropdownContent = useMemo(() => {
    return options.map(({ id, label: title }) => (
      <Cell
        borderRadius={0}
        onClick={() => handleOptionClick(id)}
        selected={value === id}
        {...selectCellSpacingConfig}
      >
        <Text font="headline" overflow="truncate">
          {title}
        </Text>
      </Cell>
    ));
  }, [handleOptionClick, options, value]);

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
});

NavigationTitleSelect.displayName = 'NavigationTitleSelect';
