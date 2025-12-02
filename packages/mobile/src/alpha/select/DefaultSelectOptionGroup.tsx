import { memo, useCallback, useMemo } from 'react';

import { Checkbox } from '../../controls/Checkbox';
import { Radio } from '../../controls/Radio';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';

import type { SelectOptionGroupProps, SelectType } from './Select';

const DefaultSelectOptionGroupComponent = memo(
  <Type extends SelectType = 'single', SelectOptionValue extends string = string>({
    label,
    options,
    SelectOptionComponent,
    value,
    onChange,
    setOpen,
    type,
    accessibilityRole,
    accessory,
    media,
    end,
    disabled,
    compact,
    styles,
  }: SelectOptionGroupProps<Type, SelectOptionValue>) => {
    type ValueType = Type extends 'multi'
      ? SelectOptionValue | SelectOptionValue[] | null
      : SelectOptionValue | null;

    const optionStyles = useMemo(
      () => ({
        optionCell: styles?.optionCell,
        optionContent: styles?.optionContent,
        optionLabel: styles?.optionLabel,
        optionDescription: styles?.optionDescription,
        selectAllDivider: styles?.selectAllDivider,
      }),
      [
        styles?.optionCell,
        styles?.optionContent,
        styles?.optionLabel,
        styles?.optionDescription,
        styles?.selectAllDivider,
      ],
    );

    const isMultiSelect = type === 'multi';

    const handleOptionPress = useCallback(
      (newValue: SelectOptionValue | null) => {
        onChange(newValue as ValueType);
        if (!isMultiSelect) setOpen(false);
      },
      [onChange, isMultiSelect, setOpen],
    );

    if (options.length === 0) {
      return null;
    }

    return (
      <VStack role="group" style={styles?.optionGroup}>
        <Text color="fgMuted" font="caption" paddingX={2} paddingY={2}>
          {label}
        </Text>
        {options.map((option) => {
          const {
            Component: optionComponent,
            media: optionMedia,
            accessory: optionAccessory,
            end: optionEnd,
            disabled: optionDisabled,
            ...optionProps
          } = option;
          const RenderedComponent = optionComponent ?? SelectOptionComponent;
          const selected =
            optionProps.value !== null && isMultiSelect
              ? (value as SelectOptionValue[]).includes(optionProps.value)
              : value === optionProps.value;
          const defaultMedia = isMultiSelect ? (
            <Checkbox
              checked={selected}
              onChange={() => handleOptionPress(optionProps.value)}
              tabIndex={-1}
            />
          ) : (
            <Radio
              checked={selected}
              onChange={() => handleOptionPress(optionProps.value)}
              tabIndex={-1}
            />
          );

          return (
            <RenderedComponent
              key={optionProps.value}
              accessibilityRole={accessibilityRole}
              accessory={optionAccessory ?? accessory}
              blendStyles={styles?.optionBlendStyles}
              compact={compact}
              disabled={optionDisabled || disabled}
              end={optionEnd ?? end}
              media={optionMedia ?? media ?? defaultMedia}
              onPress={handleOptionPress}
              selected={selected}
              style={styles?.option}
              styles={optionStyles}
              type={type}
              {...optionProps}
            />
          );
        })}
      </VStack>
    );
  },
);

DefaultSelectOptionGroupComponent.displayName = 'DefaultSelectOptionGroup';

export const DefaultSelectOptionGroup = DefaultSelectOptionGroupComponent as <
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
>(
  props: SelectOptionGroupProps<Type, SelectOptionValue>,
) => React.ReactElement;
