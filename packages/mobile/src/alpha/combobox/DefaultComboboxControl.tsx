import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import { NativeInput } from '../../controls/NativeInput';
import { useTheme } from '../../hooks/useTheme';
import { HStack } from '../../layout/HStack';
import { Text } from '../../typography/Text';
import { DefaultSelectControl } from '../select/DefaultSelectControl';
import type { SelectType } from '../select/Select';

import type { ComboboxControlProps } from './Combobox';

const hasSelectedValue = (currentValue: unknown): boolean =>
  currentValue !== null &&
  typeof currentValue !== 'undefined' &&
  !(Array.isArray(currentValue) && currentValue.length === 0);

export const DefaultComboboxControl = <
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
>({
  SelectControlComponent = DefaultSelectControl,
  value,
  placeholder,
  open,
  setOpen,
  align,
  disabled,
  options,
  searchText,
  onSearch,
  font = 'body',
  searchInputRef,
  hideSearchInput,
  accessibilityLabel,
  styles,
  ...props
}: ComboboxControlProps<Type, SelectOptionValue>) => {
  const theme = useTheme();
  const hasValue = hasSelectedValue(value);
  const shouldRenderSearchInput = !hideSearchInput && (!hasValue || open);

  const computedAccessibilityLabel = useMemo(() => {
    let label = accessibilityLabel;
    if (!hasValue && typeof placeholder === 'string') {
      label = `${label}, ${placeholder}`;
    }
    return label;
  }, [hasValue, accessibilityLabel, placeholder]);

  const valueAlignment = useMemo(
    () => (align === 'end' ? 'right' : align === 'center' ? 'center' : 'left'),
    [align],
  );

  return (
    <SelectControlComponent
      accessibilityLabel={computedAccessibilityLabel}
      align={align}
      contentNode={
        shouldRenderSearchInput ? (
          // set gap between input and values with top padding
          <HStack flexWrap="wrap" paddingTop={hasValue ? 1 : 0}>
            <NativeInput
              ref={searchInputRef}
              disabled={disabled || !open}
              font={font}
              onChangeText={onSearch}
              onPress={() => !disabled && setOpen(true)}
              placeholder={typeof placeholder === 'string' ? placeholder : undefined}
              style={{
                flexGrow: 1,
                flexShrink: 1,
                minWidth: 0,
                // Zero out padding - let DefaultSelectControl handle spacing via InputStack
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                // This is constrained by the parent container's width. The width is 100%
                // to ensure it grows to fill the control
                width: open ? '100%' : undefined,
              }}
              textAlign={valueAlignment}
              value={searchText}
            />
          </HStack>
        ) : (
          <>
            {hasValue ? null : (
              <Text color="fgMuted" font={font} paddingY={0} textAlign={valueAlignment}>
                {typeof placeholder === 'string' ? placeholder : ''}
              </Text>
            )}
          </>
        )
      }
      disabled={disabled}
      font={font}
      open={open}
      options={options}
      setOpen={setOpen}
      styles={{
        ...styles,
        controlEndNode: {
          ...StyleSheet.flatten(styles?.controlEndNode),
          alignItems: hasValue && shouldRenderSearchInput ? 'flex-end' : 'center',
        },
        controlValueNode: {
          ...StyleSheet.flatten(styles?.controlValueNode),
        },
      }}
      value={value}
      {...props}
    />
  );
};
