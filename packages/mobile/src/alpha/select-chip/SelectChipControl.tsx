import React, { forwardRef, memo, useMemo } from 'react';
import type { View } from 'react-native';

import type { ChipBaseProps } from '../../chips/ChipProps';
import { MediaChip } from '../../chips/MediaChip';
import { AnimatedCaret } from '../../motion/AnimatedCaret';
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
        accessibilityHint,
        disabled,
        maxSelectedOptionsToShow = 2,
        hiddenSelectedOptionsLabel = 'more',
        label,
        compact,
        invertColorScheme,
        numberOfLines,
      }: SelectControlProps<Type, SelectOptionValue> & SelectChipBaseProps,
      ref: React.Ref<View>,
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
                const optionValue = groupOption.value as SelectOptionValue;
                // Only set if not already present (first wins)
                if (!map.has(optionValue)) {
                  map.set(optionValue, groupOption);
                } else if (isDev) {
                  console.warn(
                    `[Select] Duplicate option value detected: "${optionValue}". ` +
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
              const optionValue = singleOption.value;
              // Only set if not already present (first wins)
              if (!map.has(optionValue)) {
                map.set(optionValue, singleOption);
              } else if (isDev) {
                const existingOption = map.get(optionValue);
                console.warn(
                  `[Select] Duplicate option value detected: "${optionValue}". ` +
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
      }, [customEndNode, open, hasValue]);

      const color = useMemo(() => {
        return hasValue ? 'fgInverse' : 'fg';
      }, [hasValue]);

      const background = useMemo(() => {
        return hasValue ? 'bgInverse' : 'bgSecondary';
      }, [hasValue]);

      return (
        <MediaChip
          ref={ref}
          accessibilityHint={accessibilityHint}
          accessibilityLabel={accessibilityLabel}
          background={background}
          color={color}
          compact={compact}
          disabled={disabled}
          end={endNode}
          invertColorScheme={invertColorScheme}
          numberOfLines={numberOfLines}
          onPress={() => setOpen((s) => !s)}
          start={startNode}
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
    Partial<Pick<ChipBaseProps, 'invertColorScheme' | 'numberOfLines'>> & {
      ref?: React.Ref<View>;
    },
) => React.ReactElement;
