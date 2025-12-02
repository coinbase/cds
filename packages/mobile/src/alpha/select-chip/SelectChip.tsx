import React, { forwardRef, memo, useCallback } from 'react';

import type { ChipBaseProps } from '../../chips/ChipProps';
import { Select, type SelectRef } from '../select/Select';
import type { SelectControlProps, SelectProps, SelectType } from '../select/types';

import { SelectChipControl } from './SelectChipControl';

export type SelectChipBaseProps = Pick<ChipBaseProps, 'invertColorScheme' | 'numberOfLines'>;

/**
 * Chip-styled Select control built on top of the Alpha Select.
 * Supports both single and multi selection via Select's `type` prop.
 */
export type SelectChipProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = SelectChipBaseProps &
  Omit<
    SelectProps<Type, SelectOptionValue>,
    'SelectControlComponent' | 'helperText' | 'labelVariant' | 'variant'
  >;

const SelectChipComponent = memo(
  forwardRef(
    <Type extends SelectType = 'single', SelectOptionValue extends string = string>(
      { invertColorScheme, numberOfLines, ...props }: SelectChipProps<Type, SelectOptionValue>,
      ref: React.Ref<SelectRef>,
    ) => {
      const SelectChipControlComponent = useCallback(
        (props: SelectControlProps<Type, SelectOptionValue>) => {
          return (
            <SelectChipControl
              invertColorScheme={invertColorScheme}
              numberOfLines={numberOfLines}
              {...props}
            />
          );
        },
        [invertColorScheme, numberOfLines],
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
