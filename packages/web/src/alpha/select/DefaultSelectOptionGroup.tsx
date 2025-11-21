import { memo, useCallback, useId, useMemo } from 'react';

import { Checkbox } from '../../controls/Checkbox';
import { Radio } from '../../controls/Radio';
import { cx } from '../../cx';
import { VStack } from '../../layout';
import { Text } from '../../typography/Text';

import type { SelectOptionGroupProps, SelectOptionProps, SelectType } from './Select';

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
    classNames,
  }: SelectOptionGroupProps<Type, SelectOptionValue>) => {
    const labelId = useId();
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
    const optionClassNames = useMemo(
      () => ({
        optionCell: classNames?.optionCell,
        optionContent: classNames?.optionContent,
        optionLabel: classNames?.optionLabel,
        optionDescription: classNames?.optionDescription,
        selectAllDivider: classNames?.selectAllDivider,
      }),
      [
        classNames?.optionCell,
        classNames?.optionContent,
        classNames?.optionLabel,
        classNames?.optionDescription,
        classNames?.selectAllDivider,
      ],
    );

    const isMultiSelect = type === 'multi';

    const handleOptionClick = useCallback(
      (newValue: SelectOptionValue | null) => {
        onChange(
          newValue as Type extends 'multi'
            ? SelectOptionValue | SelectOptionValue[] | null
            : SelectOptionValue | null,
        );
        if (!isMultiSelect) setOpen(false);
      },
      [onChange, isMultiSelect, setOpen],
    );

    if (options.length === 0) {
      return null;
    }

    return (
      <VStack
        aria-disabled={disabled}
        aria-labelledby={labelId}
        background="bg"
        className={classNames?.optionGroup}
        role="group"
        style={styles?.optionGroup}
      >
        <Text color="fgMuted" font="caption" id={labelId} paddingX={2} paddingY={2}>
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
              aria-hidden
              readOnly
              checked={selected}
              iconStyle={{ opacity: 1 }}
              tabIndex={-1}
            />
          ) : (
            <Radio
              aria-hidden
              readOnly
              checked={selected}
              iconStyle={{ opacity: 1 }}
              tabIndex={-1}
            />
          );

          return (
            <RenderedComponent
              key={optionProps.value}
              accessibilityRole={accessibilityRole}
              accessory={optionAccessory ?? accessory}
              className={classNames?.option}
              classNames={optionClassNames}
              compact={compact}
              disabled={optionDisabled || disabled}
              end={optionEnd ?? end}
              media={optionMedia ?? media ?? defaultMedia}
              onClick={handleOptionClick}
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
