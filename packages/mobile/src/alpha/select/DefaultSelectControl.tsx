import { forwardRef, memo, useMemo } from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useInputVariant } from '@coinbase/cds-common/hooks/useInputVariant';

import { InputChip } from '../../chips/InputChip';
import { HelperText } from '../../controls/HelperText';
import { InputLabel } from '../../controls/InputLabel';
import { InputStack } from '../../controls/InputStack';
import { useInputBorderStyle } from '../../hooks/useInputBorderStyle';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { AnimatedCaret } from '../../motion/AnimatedCaret';
import { Text } from '../../typography/Text';

import type { SelectControlProps, SelectOption, SelectType } from './Select';
import { isSelectOptionGroup } from './Select';

// The height is smaller for the inside label variant since the label takes
// up space above the input.
const LABEL_VARIANT_INSIDE_HEIGHT = 24;
const COMPACT_HEIGHT = 40;
const DEFAULT_HEIGHT = 56;

const variantColor: Record<string, ThemeVars.Color> = {
  foreground: 'fg',
  positive: 'fgPositive',
  negative: 'fgNegative',
  primary: 'fgPrimary',
  foregroundMuted: 'fgMuted',
  secondary: 'fgMuted',
};

type DefaultSelectControlComponent = <
  Type extends SelectType,
  SelectOptionValue extends string = string,
>(
  props: SelectControlProps<Type, SelectOptionValue> & { ref?: React.Ref<TouchableOpacity> },
) => React.ReactElement;

export const DefaultSelectControlComponent = memo(
  forwardRef(
    <Type extends SelectType, SelectOptionValue extends string = string>(
      {
        type,
        options,
        value,
        onChange,
        open,
        placeholder,
        disabled,
        setOpen,
        variant,
        helperText,
        label,
        labelVariant,
        contentNode,
        startNode,
        endNode: customEndNode,
        compact,
        align = 'start',
        bordered = true,
        borderWidth = bordered ? 100 : 0,
        focusedBorderWidth = bordered ? undefined : 200,
        maxSelectedOptionsToShow = 3,
        accessibilityLabel,
        hiddenSelectedOptionsLabel = 'more',
        removeSelectedOptionAccessibilityLabel = 'Remove',
        style,
        styles,
        ...props
      }: SelectControlProps<Type, SelectOptionValue>,
      ref: React.Ref<TouchableOpacity>,
    ) => {
      type ValueType = Type extends 'multi'
        ? SelectOptionValue | SelectOptionValue[] | null
        : SelectOptionValue | null;
      const isMultiSelect = type === 'multi';
      const shouldShowCompactLabel = compact && label && !isMultiSelect;
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

      const singleValueContent = useMemo(() => {
        const option = !isMultiSelect ? optionsMap.get(value as SelectOptionValue) : undefined;
        const label = option?.label ?? option?.description ?? option?.value ?? placeholder;
        return hasValue ? label : placeholder;
      }, [hasValue, isMultiSelect, optionsMap, placeholder, value]);

      const computedControlAccessibilityLabel = useMemo(() => {
        // For multi-select, set the label to the content of each selected value and the hidden selected options label
        if (isMultiSelect) {
          const selectedValues = (value as SelectOptionValue[])
            .map((v) => {
              const option = optionsMap.get(v);
              return option?.label ?? option?.description ?? option?.value ?? v;
            })
            .slice(0, maxSelectedOptionsToShow)
            .join(', ');
          return `${accessibilityLabel}, ${(value as SelectOptionValue[]).length > 0 ? selectedValues : (placeholder ?? '')}${(value as SelectOptionValue[]).length > maxSelectedOptionsToShow ? ', ' + hiddenSelectedOptionsLabel : ''}`;
        }
        // If value is React node, fallback to only using passed in accessibility label
        return `${accessibilityLabel ?? ''}${typeof singleValueContent === 'string' ? ', ' + singleValueContent : ''}`;
      }, [
        accessibilityLabel,
        hiddenSelectedOptionsLabel,
        isMultiSelect,
        maxSelectedOptionsToShow,
        optionsMap,
        placeholder,
        singleValueContent,
        value,
      ]);

      // Prop value doesn't have default value because it affects the color of the
      // animated caret
      const focusedVariant = useInputVariant(!!open, variant ?? 'foregroundMuted');
      const { borderFocusedStyle, borderUnfocusedStyle } = useInputBorderStyle(
        !!open,
        variant ?? 'foregroundMuted',
        focusedVariant,
        bordered,
        borderWidth,
        focusedBorderWidth,
      );

      const helperTextNode = useMemo(
        () =>
          typeof helperText === 'string' ? (
            <HelperText
              color={variant ? variantColor[variant] : 'fgMuted'}
              style={styles?.controlHelperTextNode}
            >
              {helperText}
            </HelperText>
          ) : (
            helperText
          ),
        [helperText, variant, styles?.controlHelperTextNode],
      );

      const labelNode = useMemo(
        () =>
          typeof label === 'string' ? (
            <Pressable
              disabled={disabled}
              onPress={() => setOpen((s) => !s)}
              style={styles?.controlLabelNode}
            >
              <InputLabel
                color="fg"
                paddingEnd={0}
                paddingStart={labelVariant === 'inside' ? 2 : 0}
                paddingY={labelVariant === 'inside' || compact ? 0 : 0.5}
              >
                {label}
              </InputLabel>
            </Pressable>
          ) : (
            label
          ),
        [compact, disabled, label, labelVariant, setOpen, styles?.controlLabelNode],
      );

      const valueAlignment = useMemo(
        () => (align === 'end' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start'),
        [align],
      );

      const valueNode = useMemo(() => {
        if (hasValue && isMultiSelect) {
          const valuesToShow =
            value.length <= maxSelectedOptionsToShow
              ? (value as SelectOptionValue[])
              : (value as SelectOptionValue[]).slice(0, maxSelectedOptionsToShow);
          const optionsToShow = valuesToShow
            .map((value) => optionsMap.get(value))
            .filter((option): option is SelectOption<SelectOptionValue> => option !== undefined);
          return (
            <HStack
              flexShrink={1}
              flexWrap="wrap"
              gap={1}
              justifyContent={valueAlignment}
              maxWidth="100%"
              minWidth={0}
            >
              {optionsToShow.map((option) => {
                const accessibilityLabel =
                  typeof option.label === 'string'
                    ? option.label
                    : typeof option.description === 'string'
                      ? option.description
                      : (option.value ?? '');
                return (
                  <InputChip
                    key={option.value}
                    compact
                    accessibilityLabel={`${removeSelectedOptionAccessibilityLabel} ${accessibilityLabel}`}
                    borderWidth={0}
                    disabled={disabled || option.disabled}
                    invertColorScheme={false}
                    maxWidth={200}
                    onPress={(event) => {
                      event?.stopPropagation();
                      onChange?.(option.value as ValueType);
                    }}
                  >
                    {option.label ?? option.description ?? option.value ?? ''}
                  </InputChip>
                );
              })}
              {value.length - maxSelectedOptionsToShow > 0 && (
                <InputChip compact borderWidth={0} end={null} invertColorScheme={false}>
                  {`+${value.length - maxSelectedOptionsToShow} ${hiddenSelectedOptionsLabel}`}
                </InputChip>
              )}
            </HStack>
          );
        }

        return typeof singleValueContent === 'string' ? (
          <Text align={align} color={hasValue ? 'fg' : 'fgMuted'} ellipsize="tail" font="body">
            {singleValueContent}
          </Text>
        ) : (
          singleValueContent
        );
      }, [
        hasValue,
        isMultiSelect,
        singleValueContent,
        align,
        value,
        maxSelectedOptionsToShow,
        valueAlignment,
        hiddenSelectedOptionsLabel,
        optionsMap,
        removeSelectedOptionAccessibilityLabel,
        disabled,
        onChange,
      ]);

      const inputNode = useMemo(
        () => (
          <TouchableOpacity
            ref={ref}
            accessibilityLabel={computedControlAccessibilityLabel}
            accessibilityRole="button"
            disabled={disabled}
            onPress={() => setOpen((s) => !s)}
            style={[{ flexGrow: 1 }, styles?.controlInputNode]}
            {...props}
          >
            <HStack
              alignItems="center"
              flexShrink={1}
              justifyContent="space-between"
              maxWidth="100%"
              minHeight={
                labelVariant === 'inside'
                  ? LABEL_VARIANT_INSIDE_HEIGHT
                  : compact
                    ? COMPACT_HEIGHT
                    : DEFAULT_HEIGHT
              }
              paddingStart={startNode ? 0 : 2}
              paddingY={labelVariant === 'inside' ? 0 : compact ? 1 : 1.5}
            >
              <HStack
                alignItems="center"
                flexBasis={0}
                flexGrow={1}
                flexShrink={1}
                maxWidth="100%"
                minWidth={0}
              >
                {!!startNode && (
                  <HStack alignItems="center" paddingX={2} style={styles?.controlStartNode}>
                    {startNode}
                  </HStack>
                )}
                {shouldShowCompactLabel ? (
                  <HStack alignItems="center" maxWidth="40%" paddingEnd={1}>
                    {labelNode}
                  </HStack>
                ) : null}
                <VStack
                  alignItems={valueAlignment}
                  flexGrow={1}
                  flexShrink={1}
                  minWidth={0}
                  style={styles?.controlValueNode}
                >
                  {valueNode}
                  {contentNode}
                </VStack>
              </HStack>
            </HStack>
          </TouchableOpacity>
        ),
        [
          ref,
          computedControlAccessibilityLabel,
          disabled,
          styles?.controlInputNode,
          styles?.controlStartNode,
          styles?.controlValueNode,
          props,
          labelVariant,
          compact,
          startNode,
          shouldShowCompactLabel,
          labelNode,
          valueAlignment,
          valueNode,
          contentNode,
          setOpen,
        ],
      );

      const endNode = useMemo(
        () => (
          <Pressable
            accessible={customEndNode ? true : false}
            disabled={disabled}
            onPress={() => setOpen((s) => !s)}
          >
            <HStack
              alignItems="center"
              flexGrow={1}
              paddingX={2}
              paddingY={compact ? 1 : 1.5}
              style={styles?.controlEndNode}
            >
              {customEndNode ? (
                customEndNode
              ) : (
                <AnimatedCaret
                  color={!open ? 'fg' : variant ? variantColor[variant] : 'fgPrimary'}
                  rotate={open ? 0 : 180}
                />
              )}
            </HStack>
          </Pressable>
        ),
        [compact, styles?.controlEndNode, disabled, customEndNode, open, variant, setOpen],
      );

      return (
        <InputStack
          borderFocusedStyle={borderFocusedStyle}
          borderStyle={borderUnfocusedStyle}
          borderWidth={borderWidth}
          disabled={disabled}
          endNode={endNode}
          focused={open}
          focusedBorderWidth={focusedBorderWidth}
          helperTextNode={helperTextNode}
          inputNode={inputNode}
          labelNode={shouldShowCompactLabel ? null : labelNode}
          labelVariant={labelVariant}
          variant={variant}
          {...props}
        />
      );
    },
  ),
);

export const DefaultSelectControl = DefaultSelectControlComponent as DefaultSelectControlComponent;
