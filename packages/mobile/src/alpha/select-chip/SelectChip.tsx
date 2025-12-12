import React, { forwardRef, memo, useCallback } from 'react';

import type { ChipBaseProps } from '../../chips/ChipProps';
import { Select, type SelectRef } from '../select/Select';
import type { SelectControlProps, SelectProps, SelectType } from '../select/types';

import { SelectChipControl } from './SelectChipControl';

export type SelectChipBaseProps = Pick<
  ChipBaseProps,
  'invertColorScheme' | 'numberOfLines' | 'maxWidth'
> & {
  /**
   * Override the displayed value in the chip control.
   * Useful for avoiding truncation, especially in multi-select scenarios where multiple option labels might be too long to display.
   * When provided, this value takes precedence over the default label generation.
   */
  displayValue?: React.ReactNode;
};

export type SelectChipProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = SelectChipBaseProps &
  Omit<
    SelectProps<Type, SelectOptionValue>,
    'SelectControlComponent' | 'helperText' | 'labelVariant' | 'variant' | 'maxWidth'
  >;

/**
 * Chip-styled Select control built on top of the Alpha Select.
 * Supports both single and multi selection via Select's `type` prop.
 */
const SelectChipComponent = memo(
  forwardRef(
    <Type extends SelectType = 'single', SelectOptionValue extends string = string>(
      {
        invertColorScheme,
        numberOfLines,
        maxWidth,
        displayValue,
        ...props
      }: SelectChipProps<Type, SelectOptionValue>,
      ref: React.Ref<SelectRef>,
    ) => {
      const SelectChipControlComponent = useCallback(
        (props: SelectControlProps<Type, SelectOptionValue>) => {
          return (
            <SelectChipControl
              displayValue={displayValue}
              invertColorScheme={invertColorScheme}
              maxWidth={maxWidth}
              numberOfLines={numberOfLines}
              {...props}
            />
          );
        },
        [displayValue, invertColorScheme, maxWidth, numberOfLines],
      );

      return (
        <Select<Type, SelectOptionValue>
          ref={ref}
          SelectControlComponent={SelectChipControlComponent}
          {...props}
        />
      );
    },
  ),
);

SelectChipComponent.displayName = 'SelectChip';

export const SelectChip = SelectChipComponent as <
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
>(
  props: SelectChipProps<Type, SelectOptionValue> & { ref?: React.Ref<SelectRef> },
) => React.ReactElement;
