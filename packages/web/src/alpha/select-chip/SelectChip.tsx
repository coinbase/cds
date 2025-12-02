import React, { forwardRef, memo, useMemo } from 'react';

import type { ChipBaseProps } from '../../chips';
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

/**
 * Creates a wrapper component that injects invertColorScheme and numberOfLines
 * into SelectChipControl. This is needed because Select doesn't pass these props
 * to SelectControlComponent, but SelectChipControl requires them.
 */
function createSelectChipControlWrapper<
  Type extends SelectType,
  SelectOptionValue extends string = string,
>(
  invertColorScheme: boolean | undefined,
  numberOfLines: number | undefined,
): React.FC<SelectControlProps<Type, SelectOptionValue> & { ref?: React.Ref<HTMLDivElement> }> {
  return memo(
    forwardRef<HTMLDivElement, SelectControlProps<Type, SelectOptionValue>>(
      (controlProps, controlRef) => {
        return (
          <SelectChipControl
            {...controlProps}
            ref={controlRef}
            invertColorScheme={invertColorScheme}
            numberOfLines={numberOfLines}
          />
        );
      },
    ),
  );
}

const SelectChipComponent = memo(
  forwardRef(
    <Type extends SelectType = 'single', SelectOptionValue extends string = string>(
      { invertColorScheme, numberOfLines, ...props }: SelectChipProps<Type, SelectOptionValue>,
      ref: React.Ref<SelectRef>,
    ) => {
      const WrappedSelectChipControl = useMemo(
        () =>
          createSelectChipControlWrapper<Type, SelectOptionValue>(invertColorScheme, numberOfLines),
        [invertColorScheme, numberOfLines],
      );

      return (
        <Select<Type, SelectOptionValue>
          ref={ref}
          SelectControlComponent={WrappedSelectChipControl}
          styles={{
            dropdown: {
              width: 'max-content',
            },
            ...props.styles,
          }}
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
