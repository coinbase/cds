import React, { forwardRef, memo, useMemo } from 'react';
import { getSelectChipActive } from '@coinbase/cds-common/chips/getSelectChipActive';

import { useComponentConfig } from '../../hooks/useComponentConfig';
import { Select, type SelectRef } from '../select/Select';
import type { SelectControlProps, SelectProps, SelectType } from '../select/types';

import {
  SelectChipControl,
  type SelectChipControlChipProps,
  type SelectChipControlProps,
} from './SelectChipControl';

export type SelectChipBaseProps = Pick<SelectChipControlProps, keyof SelectChipControlChipProps>;

export type SelectChipProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = SelectChipBaseProps &
  Omit<
    SelectProps<Type, SelectOptionValue>,
    | 'SelectControlComponent' // fixed to SelectChipControl
    | 'helperText' // not supported
    | 'labelVariant' // not supported
    | 'variant' // not supported
    | 'maxWidth' // chip-owned
    | 'size' // ChipSize, not SelectSize
    | 'compact' // chip-owned
    | 'bordered' // chip-owned
    | 'borderWidth' // chip-owned
    | 'borderColor' // chip-owned
    | 'borderRadius' // chip-owned
  >;

/**
 * Creates a wrapper component that injects chip-specific props into SelectChipControl.
 * Select only forwards generic control props to `SelectControlComponent`; chip styling
 * and `active` are owned by SelectChip and must be closed over here.
 */
function createSelectChipControlWrapper<
  Type extends SelectType,
  SelectOptionValue extends string = string,
>(
  chipProps: SelectChipBaseProps,
): React.FC<SelectControlProps<Type, SelectOptionValue> & { ref?: React.Ref<HTMLDivElement> }> {
  return memo(
    forwardRef<HTMLDivElement, SelectControlProps<Type, SelectOptionValue>>(
      (controlProps, controlRef) => {
        // Chip props are spread last so they win at runtime; the cast bridges overlapping keys
        // (`size`, borders) where SelectControlProps and SelectChipBaseProps use different types.
        return (
          <SelectChipControl
            {...({ ...controlProps, ...chipProps } as SelectChipControlProps<
              Type,
              SelectOptionValue
            >)}
            ref={controlRef}
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
      _props: SelectChipProps<Type, SelectOptionValue>,
      ref: React.Ref<SelectRef>,
    ) => {
      // Resolve `active` from instance props before config merge so state-aware resolvers
      // (active vs inactive border styling) see the final selection state. `value` and
      // legacy invert props are pulled out with `active` and passed back explicitly because
      // they feed that resolution and must remain available to the config resolver input.
      const { active: activeProp, invertColorScheme, inverted, value, ...restProps } = _props;
      const resolvedActive = getSelectChipActive(activeProp, value, invertColorScheme, inverted);
      const mergedProps = useComponentConfig('SelectChip', {
        ...restProps,
        value,
        active: resolvedActive,
        invertColorScheme,
        inverted,
      });
      // SelectChip composes Select + MediaChip; peel chip props off merged props so the rest
      // can flow to `<Select>` without chip-only fields leaking into the select interface.
      const {
        active,
        activeBackground,
        activeColor,
        background,
        color,
        numberOfLines,
        maxWidth,
        displayValue,
        size,
        compact,
        borderWidth,
        borderColor,
        bordered,
        borderRadius,
        invertColorScheme: mergedInvertColorScheme,
        inverted: mergedInverted,
        ...selectProps
      } = mergedProps;
      const WrappedSelectChipControl = useMemo(
        () =>
          createSelectChipControlWrapper<Type, SelectOptionValue>({
            active,
            activeBackground,
            activeColor,
            background,
            color,
            numberOfLines,
            maxWidth,
            displayValue,
            size,
            compact,
            borderWidth,
            borderColor,
            bordered,
            borderRadius,
            invertColorScheme: mergedInvertColorScheme,
            inverted: mergedInverted,
          }),
        [
          active,
          activeBackground,
          activeColor,
          background,
          color,
          displayValue,
          numberOfLines,
          maxWidth,
          size,
          compact,
          borderWidth,
          borderColor,
          bordered,
          borderRadius,
          mergedInvertColorScheme,
          mergedInverted,
        ],
      );

      return (
        <Select<Type, SelectOptionValue>
          ref={ref}
          SelectControlComponent={WrappedSelectChipControl}
          styles={{
            dropdown: {
              width: 'max-content',
            },
            ...selectProps.styles,
          }}
          {...selectProps}
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
