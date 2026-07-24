import React, { memo, useCallback } from 'react';

import type { ChipBaseProps } from '../../chips/ChipProps';
import { useComponentConfig } from '../../hooks/useComponentConfig';
import { Select, type SelectRef } from '../select/Select';
import type { SelectControlProps, SelectProps, SelectType } from '../select/types';

import { SelectChipControl } from './SelectChipControl';

export type SelectChipBaseProps = Pick<
  ChipBaseProps,
  'invertColorScheme' | 'numberOfLines' | 'maxWidth' | 'size' | 'compact'
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
    | 'SelectControlComponent'
    | 'helperText'
    | 'labelVariant'
    | 'variant'
    | 'maxWidth'
    | 'size'
    | 'compact'
  >;

/**
 * Chip-styled Select control built on top of the Alpha Select.
 * Supports both single and multi selection via Select's `type` prop.
 */
const SelectChipComponent = memo(
  <Type extends SelectType = 'single', SelectOptionValue extends string = string>({
    ref,
    ..._props
  }: SelectChipProps<Type, SelectOptionValue> & {
    ref?: React.Ref<SelectRef>;
  }) => {
    const mergedProps = useComponentConfig('SelectChip', _props);
    const { invertColorScheme, numberOfLines, maxWidth, displayValue, size, compact, ...props } =
      mergedProps;
    // Select doesn't pass the chip-specific props (size/compact/displayValue/etc.) down to the
    // control, so they're injected here. They're listed AFTER the `controlProps` spread so the
    // chip-level values win — matching the web SelectChip wrapper.
    const SelectChipControlComponent = useCallback(
      (controlProps: SelectControlProps<Type, SelectOptionValue>) => {
        return (
          <SelectChipControl
            {...controlProps}
            compact={compact}
            displayValue={displayValue}
            invertColorScheme={invertColorScheme}
            maxWidth={maxWidth}
            numberOfLines={numberOfLines}
            size={size}
          />
        );
      },
      [displayValue, invertColorScheme, maxWidth, numberOfLines, size, compact],
    );

    return (
      <Select<Type, SelectOptionValue>
        ref={ref}
        SelectControlComponent={SelectChipControlComponent}
        {...props}
      />
    );
  },
);

SelectChipComponent.displayName = 'SelectChip';

export const SelectChip = SelectChipComponent as <
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
>(
  props: SelectChipProps<Type, SelectOptionValue> & { ref?: React.Ref<SelectRef> },
) => React.ReactElement;
