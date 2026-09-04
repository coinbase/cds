import React, { forwardRef, memo, useMemo } from 'react';
import { getSelectChipHasValue } from '@coinbase/cds-common/chips/getSelectChipActive';

import type { ChipBaseProps } from '../../chips/ChipProps';
import { MediaChip } from '../../chips/MediaChip';
import { AnimatedCaret } from '../../motion/AnimatedCaret';
import type { SelectRef } from '../select/Select';
import {
  isSelectOptionGroup,
  type SelectControlProps,
  type SelectOption,
  type SelectType,
} from '../select/types';

/**
 * Chip props accepted by {@link SelectChipControl} and forwarded to {@link MediaChip}.
 * Includes selection state, layout, borders, and `displayValue` for the control label.
 */
export type SelectChipControlChipProps = Pick<
  ChipBaseProps,
  | 'active'
  | 'activeBackground'
  | 'activeColor'
  | 'background'
  | 'color'
  | 'invertColorScheme'
  | 'inverted'
  | 'numberOfLines'
  | 'maxWidth'
  | 'size'
  | 'compact'
  | 'borderWidth'
  | 'borderColor'
  | 'bordered'
  | 'borderRadius'
> & {
  /**
   * Override the displayed value in the chip control.
   * Useful for avoiding truncation, especially in multi-select scenarios where multiple option labels might be too long to display.
   * When provided, this value takes precedence over the default label generation.
   */
  displayValue?: React.ReactNode;
};

/**
 * SelectControlProps fields superseded by {@link SelectChipControlChipProps}.
 * Omit is required: intersection would merge overlapping keys (e.g. `size` as SelectSize &
 * ChipSize, `background` as responsive Box vs chip tokens) instead of replacing select-scale
 * definitions.
 */
type SelectControlPropsReplacedByChipProps = keyof Pick<
  SelectControlProps,
  'size' | 'compact' | 'borderWidth' | 'borderColor' | 'bordered' | 'borderRadius'
>;

export type SelectChipControlProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = Omit<SelectControlProps<Type, SelectOptionValue>, SelectControlPropsReplacedByChipProps> &
  SelectChipControlChipProps;

const SelectChipControlComponent = memo(
  forwardRef(
    <Type extends SelectType, SelectOptionValue extends string = string>(
      {
        type,
        options,
        value,
        placeholder,
        setOpen,
        startNode,
        endNode: customEndNode,
        open,
        accessibilityLabel,
        ariaHaspopup = 'listbox',
        className,
        style,
        maxSelectedOptionsToShow = 2,
        hiddenSelectedOptionsLabel = 'more',
        label,
        disabled,
        compact,
        size,
        active,
        activeBackground,
        activeColor,
        background,
        color,
        invertColorScheme,
        inverted,
        numberOfLines,
        maxWidth,
        displayValue,
        borderWidth,
        borderColor,
        bordered,
        borderRadius,
      }: SelectChipControlProps<Type, SelectOptionValue>,
      ref: React.Ref<SelectRef>,
    ) => {
      const isMultiSelect = type === 'multi';
      const hasValue = getSelectChipHasValue(value);

      // Map of options to their values
      // If multiple options share the same value, the first occurrence wins (matches native HTML select behavior)
      const optionsMap = useMemo(() => {
        const map = new Map<SelectOptionValue, SelectOption<SelectOptionValue>>();
        const isDev = process.env.NODE_ENV !== 'production';

        options.forEach((option, optionIndex) => {
          if (isSelectOptionGroup<Type, SelectOptionValue>(option)) {
            option.options.forEach((groupOption, groupOptionIndex) => {
              if (groupOption.value !== null) {
                const value = groupOption.value as SelectOptionValue;
                // Only set if not already present (first wins)
                if (!map.has(value)) {
                  map.set(value, groupOption);
                } else if (isDev) {
                  console.warn(
                    `[Select] Duplicate option value detected: "${value}". ` +
                      `The first occurrence will be used for display. ` +
                      `Found duplicate in group "${option.label}" at index ${groupOptionIndex}. ` +
                      `First occurrence was at option index ${optionIndex}.`,
                  );
                }
              }
            });
          } else {
            const singleOption = option as SelectOption<SelectOptionValue>;
            if (singleOption.value !== null) {
              const value = singleOption.value;
              // Only set if not already present (first wins)
              if (!map.has(value)) {
                map.set(value, singleOption);
              } else if (isDev) {
                const existingOption = map.get(value);
                console.warn(
                  `[Select] Duplicate option value detected: "${value}". ` +
                    `The first occurrence will be used for display. ` +
                    `Found duplicate at option index ${optionIndex}. ` +
                    `First occurrence label: "${existingOption?.label ?? existingOption?.value ?? 'unknown'}".`,
                );
              }
            }
          }
        });
        return map;
      }, [options]);

      const labelContent = useMemo(() => {
        if (!hasValue) return label ?? placeholder ?? null;
        if (displayValue) return displayValue;
        if (isMultiSelect) {
          const values = value as SelectOptionValue[];
          const visible = values.slice(0, maxSelectedOptionsToShow);
          const labels = visible
            .map((v) => {
              const opt = optionsMap.get(v);
              return opt?.label ?? opt?.description ?? opt?.value ?? '';
            })
            .filter(Boolean);
          const hiddenCount = values.length - visible.length;
          return hiddenCount > 0
            ? `${labels.join(', ')} +${hiddenCount} ${hiddenSelectedOptionsLabel}`
            : labels.join(', ');
        }

        const opt = optionsMap.get(value as SelectOptionValue);
        return opt?.label ?? opt?.description ?? opt?.value ?? placeholder ?? null;
      }, [
        hasValue,
        label,
        placeholder,
        displayValue,
        isMultiSelect,
        optionsMap,
        value,
        maxSelectedOptionsToShow,
        hiddenSelectedOptionsLabel,
      ]);

      const resolvedColor = active && activeColor !== undefined ? activeColor : color;

      const endNode = useMemo(() => {
        // Match Chip's label color. `fg` still inverts with the chip when active uses theme inversion.
        return (
          customEndNode ?? (
            <AnimatedCaret active color={resolvedColor ?? 'fg'} rotate={open ? 0 : 180} size="xs" />
          )
        );
      }, [customEndNode, open, resolvedColor]);

      return (
        <MediaChip
          ref={ref as React.Ref<HTMLButtonElement>}
          noScaleOnPress
          accessibilityLabel={accessibilityLabel}
          active={active}
          activeBackground={activeBackground}
          activeColor={activeColor}
          aria-haspopup={ariaHaspopup}
          background={background}
          bordered={bordered}
          borderColor={borderColor}
          borderRadius={borderRadius}
          borderWidth={borderWidth}
          className={className}
          color={color}
          compact={compact}
          disabled={disabled}
          end={endNode}
          invertColorScheme={invertColorScheme}
          inverted={inverted}
          maxWidth={maxWidth}
          numberOfLines={numberOfLines}
          onClick={() => setOpen((s) => !s)}
          size={size}
          start={startNode}
          style={style}
        >
          {labelContent}
        </MediaChip>
      );
    },
  ),
);

SelectChipControlComponent.displayName = 'SelectChipControl';

/** Generic memo components need an explicit cast for the public polymorphic signature. */
export const SelectChipControl = SelectChipControlComponent as <
  Type extends SelectType,
  SelectOptionValue extends string = string,
>(
  props: SelectChipControlProps<Type, SelectOptionValue> & {
    ref?: React.Ref<HTMLElement>;
  },
) => React.ReactElement;
