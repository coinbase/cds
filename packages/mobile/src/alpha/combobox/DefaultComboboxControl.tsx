import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { NativeInput } from '../../controls/NativeInput';
import { useTheme } from '../../hooks/useTheme';
import { HStack } from '../../layout';
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
  searchInputRef,
  hideSearchInput,
  accessibilityLabel,
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
      disabled={disabled}
      open={open}
      options={options}
      setOpen={setOpen}
      value={value}
      {...props}
      contentNode={
        shouldRenderSearchInput ? (
          <HStack flexWrap="wrap">
            <NativeInput
              ref={searchInputRef}
              disabled={disabled || !open}
              onChangeText={onSearch}
              onPress={() => !disabled && setOpen(true)}
              placeholder={typeof placeholder === 'string' ? placeholder : undefined}
              style={{
                flex: 0,
                flexGrow: 1,
                flexShrink: 1,
                minWidth: 0,
                padding: 0,
                height: hasValue ? 24 : 48,
                marginTop: hasValue ? 0 : -24,
                marginBottom: hasValue ? -12 : -24,
                paddingTop: hasValue ? 8 : 0,
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
              <Text color="fgMuted" font="body" paddingY={0} textAlign={valueAlignment}>
                {typeof placeholder === 'string' ? placeholder : ''}
              </Text>
            )}
          </>
        )
      }
      styles={{
        ...props.styles,
        controlEndNode: {
          ...StyleSheet.flatten(props.styles?.controlEndNode),
          alignItems: hasValue && shouldRenderSearchInput ? 'flex-end' : 'center',
        },
        controlValueNode: {
          ...StyleSheet.flatten(props.styles?.controlValueNode),
          paddingBottom: hasValue && shouldRenderSearchInput ? theme.space[1.5] : 0,
        },
      }}
    />
  );
};
