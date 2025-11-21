import React, { forwardRef, memo, useMemo } from 'react';

import type { ChipBaseProps } from '../../chips';
import { MediaChip } from '../../chips/MediaChip';
import { AnimatedCaret } from '../../motion/AnimatedCaret';
import type {
  SelectControlProps,
  SelectOption,
  SelectOptionGroup,
  SelectProps,
  SelectRef,
  SelectType,
} from '../select/Select';
import { Select } from '../select/Select';
/**
 * Chip-styled Select control built on top of the Alpha Select.
 * Supports both single and multi selection via Select's `type` prop.
 */
export type SelectChipProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = Omit<
  SelectProps<Type, SelectOptionValue>,
  'SelectControlComponent' | 'helperText' | 'labelVariant' | 'variant'
>;

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
        disabled,
      }: SelectControlProps<Type, SelectOptionValue>,
      ref: React.Ref<SelectRef>,
    ) => {
      const isMultiSelect = type === 'multi';
      const hasValue = value !== null && !(Array.isArray(value) && value.length === 0);

      // Flatten options to handle nested groups
      const flatOptions = useMemo(() => {
        const result: SelectOption[] = [];
        options.forEach((option) => {
          if ('options' in option && Array.isArray(option.options) && 'label' in option) {
            // It's a group, add all its options
            result.push(...(option as SelectOptionGroup).options);
          } else {
            // It's a single option
            result.push(option as SelectOption);
          }
        });
        return result;
      }, [options]);

      const labelContent = useMemo(() => {
        if (!hasValue) return label ?? placeholder ?? null;

        if (isMultiSelect) {
          const values = value as string[];
          const visible = values.slice(0, maxSelectedOptionsToShow);
          const labels = visible
            .map((v) => {
              const opt = flatOptions.find((o) => o.value === v);
              return opt?.label ?? opt?.description ?? opt?.value ?? '';
            })
            .filter(Boolean);
          const hiddenCount = values.length - visible.length;
          return hiddenCount > 0
            ? `${labels.join(', ')} +${hiddenCount} ${hiddenSelectedOptionsLabel}`
            : labels.join(', ');
        }

        const opt = flatOptions.find((o) => o.value === value);
        return opt?.label ?? opt?.description ?? opt?.value ?? placeholder ?? null;
      }, [
        hasValue,
        label,
        placeholder,
        isMultiSelect,
        flatOptions,
        value,
        maxSelectedOptionsToShow,
        hiddenSelectedOptionsLabel,
      ]);

      const endNode = useMemo(() => {
        return (
          customEndNode ?? <AnimatedCaret active color="fg" rotate={open ? 0 : 180} size="xs" />
        );
      }, [customEndNode, open]);

      return (
        <MediaChip
          ref={ref as React.Ref<HTMLButtonElement>}
          noScaleOnPress
          accessibilityLabel={accessibilityLabel}
          aria-haspopup={ariaHaspopup}
          className={className}
          compact={compact}
          disabled={disabled}
          end={endNode}
          invertColorScheme={hasValue}
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

const SelectChipControl = SelectChipControlComponent as <
  Type extends SelectType,
  SelectOptionValue extends string = string,
>(
  props: SelectControlProps<Type, SelectOptionValue> &
    Pick<ChipBaseProps, 'invertColorScheme' | 'compact' | 'numberOfLines'> & {
      ref?: React.Ref<HTMLElement>;
    },
) => React.ReactElement;

const SelectChipComponent = memo(
  forwardRef(
    <Type extends SelectType = 'single', SelectOptionValue extends string = string>(
      props: SelectChipProps<Type, SelectOptionValue>,
      ref: React.Ref<SelectRef>,
    ) => {
      return (
        <Select<Type, SelectOptionValue>
          ref={ref}
          SelectControlComponent={SelectChipControl}
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
