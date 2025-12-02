import React, { forwardRef, memo, useMemo } from 'react';

import { type ChipBaseProps, MediaChip } from '../../chips';
import { AnimatedCaret } from '../../motion/AnimatedCaret';
import type { SelectRef } from '../select/Select';
import {
  isSelectOptionGroup,
  type SelectControlProps,
  type SelectOption,
  type SelectType,
} from '../select/types';

import type { SelectChipBaseProps } from './SelectChip';

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
        compact,
        invertColorScheme,
        numberOfLines,
        disabled,
      }: SelectControlProps<Type, SelectOptionValue> & SelectChipBaseProps,
      ref: React.Ref<SelectRef>,
    ) => {
      const isMultiSelect = type === 'multi';
      const hasValue = value !== null && !(Array.isArray(value) && value.length === 0);

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
        isMultiSelect,
        optionsMap,
        value,
        maxSelectedOptionsToShow,
        hiddenSelectedOptionsLabel,
      ]);

      const endNode = useMemo(() => {
        return (
          customEndNode ?? (
            <AnimatedCaret
              active
              color={hasValue ? 'fgInverse' : 'fg'}
              rotate={open ? 0 : 180}
              size="xs"
            />
          )
        );
      }, [customEndNode, hasValue, open]);

      const color = useMemo(() => {
        return hasValue ? 'fgInverse' : 'fg';
      }, [hasValue]);

      const background = useMemo(() => {
        return hasValue ? 'bgInverse' : 'bgSecondary';
      }, [hasValue]);

      return (
        <MediaChip
          ref={ref as React.Ref<HTMLButtonElement>}
          noScaleOnPress
          accessibilityLabel={accessibilityLabel}
          aria-haspopup={ariaHaspopup}
          background={background}
          className={className}
          color={color}
          compact={compact}
          disabled={disabled}
          end={endNode}
          invertColorScheme={invertColorScheme}
          numberOfLines={numberOfLines}
          onClick={() => setOpen((s) => !s)}
          start={startNode}
          style={style}
        >
          {labelContent}
        </MediaChip>
      );
    },
  ),
);

export const SelectChipControl = SelectChipControlComponent as <
  Type extends SelectType,
  SelectOptionValue extends string = string,
>(
  props: SelectControlProps<Type, SelectOptionValue> &
    Pick<ChipBaseProps, 'invertColorScheme' | 'compact' | 'numberOfLines'> & {
      ref?: React.Ref<HTMLElement>;
    },
) => React.ReactElement;
