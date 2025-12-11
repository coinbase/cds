import React, { forwardRef, memo, useMemo } from 'react';

import type { ChipBaseProps } from '../../chips';
import type { PressableBaseProps } from '../../system/Pressable';
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
 * Creates a wrapper component that injects invertColorScheme and numberOfLines
 * into SelectChipControl. This is needed because Select doesn't pass these props
 * to SelectControlComponent, but SelectChipControl requires them.
 */
function createSelectChipControlWrapper<
  Type extends SelectType,
  SelectOptionValue extends string = string,
>({
  invertColorScheme,
  numberOfLines,
  maxWidth,
  displayValue,
}: {
  invertColorScheme?: boolean;
  numberOfLines?: number;
  maxWidth?: PressableBaseProps['maxWidth'];
  displayValue?: React.ReactNode;
}): React.FC<SelectControlProps<Type, SelectOptionValue> & { ref?: React.Ref<HTMLDivElement> }> {
  return memo(
    forwardRef<HTMLDivElement, SelectControlProps<Type, SelectOptionValue>>(
      (controlProps, controlRef) => {
        return (
          <SelectChipControl
            {...controlProps}
            ref={controlRef}
            displayValue={displayValue}
            invertColorScheme={invertColorScheme}
            maxWidth={maxWidth}
            numberOfLines={numberOfLines}
          />
        );
      },
    ),
  );
}

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
      const WrappedSelectChipControl = useMemo(
        () =>
          createSelectChipControlWrapper<Type, SelectOptionValue>({
            invertColorScheme,
            numberOfLines,
            maxWidth,
            displayValue,
          }),
        [displayValue, invertColorScheme, numberOfLines, maxWidth],
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
