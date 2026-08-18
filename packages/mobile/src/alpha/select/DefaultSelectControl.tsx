import { memo, useCallback, useMemo } from 'react';
import { type StyleProp, TouchableOpacity, type ViewStyle } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useInputVariant } from '@coinbase/cds-common/hooks/useInputVariant';

import { InputChip } from '../../chips/InputChip';
import { HelperText } from '../../controls/HelperText';
import { InputLabel } from '../../controls/InputLabel';
import { InputStack } from '../../controls/InputStack';
import { useInputBorderStyle } from '../../hooks/useInputBorderStyle';
import { useTheme } from '../../hooks/useTheme';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { AnimatedCaret } from '../../motion/AnimatedCaret';
import { Text } from '../../typography/Text';

import type { SelectControlProps, SelectOption, SelectSize, SelectType } from './Select';
import { isSelectOptionGroup } from './Select';
import { defaultSelectSize } from './types';

const selectSizeVerticalSpace: Record<SelectSize, ThemeVars.Space> = { s: 1, m: 1.5, l: 2 };

// A multi-select's selected-value chips add their own height, so the vertical space is
// tightened per size to keep the overall field height aligned with the single-select scale.
const multiSelectVerticalSpace: Record<SelectSize, ThemeVars.Space> = { s: 0.5, m: 1, l: 1.5 };

// Multi-select value chips always use the compact `xs` size (even at size `l`) so several chips —
// and a stacked inside label — stay within the field's natural height.
const multiSelectValueChipSize = 'xs';

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
  props: SelectControlProps<Type, SelectOptionValue> & {
    ref?: React.Ref<React.ComponentRef<typeof TouchableOpacity>>;
  },
) => React.ReactElement;

export const DefaultSelectControlComponent = memo(
  <Type extends SelectType, SelectOptionValue extends string = string>({
    ref,
    type,
    options,
    value,
    onChange,
    open,
    placeholder,
    disabled,
    readOnly,
    setOpen,
    variant,
    helperText,
    label,
    labelVariant: labelVariantProp,
    contentNode,
    startNode,
    endNode: customEndNode,
    compact,
    size,
    align = 'start',
    font = 'body',
    labelColor = 'fg',
    labelFont = 'label1',
    bordered = true,
    borderWidth = bordered ? 100 : 0,
    focusedBorderWidth = bordered ? undefined : 200,
    inputBackground = !disabled && readOnly ? 'bgSecondary' : 'bg',
    borderRadius,
    maxSelectedOptionsToShow = 3,
    accessibilityHint,
    accessibilityLabel,
    hiddenSelectedOptionsLabel = 'more',
    removeSelectedOptionAccessibilityLabel = 'Remove',
    style,
    styles,
    onBlur,
    onFocus,
    ...props
  }: SelectControlProps<Type, SelectOptionValue> & {
    ref?: React.Ref<React.ComponentRef<typeof TouchableOpacity>>;
  }) => {
    type ValueType = Type extends 'multi'
      ? SelectOptionValue | SelectOptionValue[] | null
      : SelectOptionValue | null;

    const isInteractionBlocked = disabled || readOnly;

    const handleToggleOpen = useCallback(() => {
      if (isInteractionBlocked) return;
      setOpen((currentOpen) => !currentOpen);
    }, [isInteractionBlocked, setOpen]);

    const theme = useTheme();
    const isMultiSelect = type === 'multi';
    // `size` wins over the deprecated `compact` for geometry.
    const resolvedSize = size ?? (compact ? 's' : defaultSelectSize);
    // The deprecated `compact` only forces label placement when the caller did NOT set an explicit
    // `size`; once `size` is provided, placement follows the normal `labelVariant` rules.
    const useLegacyCompact = Boolean(compact) && size === undefined;
    const labelVariant = useLegacyCompact ? undefined : labelVariantProp;
    const hasLabel = !!label;

    // Label placement mirrors TextInput: `compact` (set alone) forces an inside label; otherwise
    // placement follows `labelVariant`. An inside label sits horizontally in the start slot at every
    // size EXCEPT `l`, where it stacks vertically above the value. Multi-select is the one exception:
    // its value chips can't share a row with an inline label, so legacy compact multi-select keeps
    // its label outside (only an explicit `inside` labelVariant places a multi-select's label inside).
    const isCompactLabel = useLegacyCompact && !isMultiSelect;
    const wantsInsideLabel = hasLabel && (isCompactLabel || labelVariant === 'inside');
    const insideVerticalLabel = wantsInsideLabel && !isCompactLabel && resolvedSize === 'l';
    const insideHorizontalLabel = wantsInsideLabel && !insideVerticalLabel;
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

    const matchedOption = useMemo(() => {
      if (isMultiSelect || value === null || Array.isArray(value)) return undefined;
      return optionsMap.get(value as SelectOptionValue);
    }, [isMultiSelect, optionsMap, value]);

    const isShowingPlaceholder = matchedOption === undefined;

    const singleValueContent = useMemo(() => {
      if (!matchedOption) return placeholder;
      return matchedOption.label ?? matchedOption.description ?? matchedOption.value;
    }, [matchedOption, placeholder]);

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

    const labelNode = useMemo(() => {
      if (insideVerticalLabel || insideHorizontalLabel) return null;

      if (typeof label === 'string') {
        return (
          <InputLabel
            color={labelColor}
            font={labelFont}
            paddingY={0.5}
            style={styles?.controlLabelNode}
          >
            {label}
          </InputLabel>
        );
      }

      return label;
    }, [
      insideVerticalLabel,
      insideHorizontalLabel,
      label,
      labelColor,
      labelFont,
      styles?.controlLabelNode,
    ]);

    const inlineLabelNode = useMemo(() => {
      if (!insideVerticalLabel && !insideHorizontalLabel) return null;

      if (typeof label === 'string') {
        return (
          <InputLabel
            color={labelColor}
            font={labelFont}
            // An inside label — horizontal or vertically stacked — is kept to a single line so a
            // long label can't wrap and stretch the field past the height its size defines.
            numberOfLines={1}
            paddingY={0}
            style={styles?.controlLabelNode}
          >
            {label}
          </InputLabel>
        );
      }

      return label;
    }, [
      insideVerticalLabel,
      insideHorizontalLabel,
      label,
      labelColor,
      labelFont,
      styles?.controlLabelNode,
    ]);

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
                  accessibilityLabel={`${removeSelectedOptionAccessibilityLabel} ${accessibilityLabel}`}
                  borderWidth={0}
                  disabled={disabled || option.disabled}
                  invertColorScheme={false}
                  maxWidth={200}
                  onPress={
                    isInteractionBlocked
                      ? undefined
                      : (event) => {
                          event?.stopPropagation();
                          onChange?.(option.value as ValueType);
                        }
                  }
                  size={multiSelectValueChipSize}
                >
                  {option.label ?? option.description ?? option.value ?? ''}
                </InputChip>
              );
            })}
            {value.length - maxSelectedOptionsToShow > 0 && (
              <InputChip
                borderWidth={0}
                end={null}
                invertColorScheme={false}
                size={multiSelectValueChipSize}
              >
                {`+${value.length - maxSelectedOptionsToShow} ${hiddenSelectedOptionsLabel}`}
              </InputChip>
            )}
          </HStack>
        );
      }

      return typeof singleValueContent === 'string' ? (
        <Text
          align={align}
          color={isShowingPlaceholder ? 'fgMuted' : 'fg'}
          ellipsize="tail"
          font={font}
        >
          {singleValueContent}
        </Text>
      ) : (
        singleValueContent
      );
    }, [
      hasValue,
      isMultiSelect,
      isShowingPlaceholder,
      singleValueContent,
      font,
      align,
      value,
      maxSelectedOptionsToShow,
      valueAlignment,
      hiddenSelectedOptionsLabel,
      optionsMap,
      removeSelectedOptionAccessibilityLabel,
      disabled,
      onChange,
      isInteractionBlocked,
    ]);

    // onBlur/onFocus on ViewProps allow null returns but TouchableOpacity's onBlur/onFocus props do not.
    // This appears like a type inconsistency in react-native's type definitions.
    const inputNode = useMemo(
      () => (
        <TouchableOpacity
          ref={ref}
          accessibilityHint={accessibilityHint}
          accessibilityLabel={computedControlAccessibilityLabel}
          accessibilityRole="button"
          disabled={disabled}
          onBlur={onBlur ?? undefined}
          onFocus={onFocus ?? undefined}
          activeOpacity={1}
          onPress={handleToggleOpen}
          style={[{ flexGrow: 1 }, styles?.controlInputNode]}
        >
          <HStack alignItems="center" flexShrink={1} justifyContent="space-between" maxWidth="100%">
            <HStack
              alignItems="center"
              flexBasis={0}
              flexGrow={1}
              flexShrink={1}
              maxWidth="100%"
              minWidth={0}
            >
              {!!startNode && (
                <HStack alignItems="center" paddingEnd={2} style={styles?.controlStartNode}>
                  {startNode}
                </HStack>
              )}
              {insideHorizontalLabel ? (
                <HStack alignItems="center" maxWidth="40%" paddingEnd={1}>
                  {inlineLabelNode}
                </HStack>
              ) : null}
              {insideVerticalLabel ? (
                <VStack flexGrow={1} minWidth={0} width="100%">
                  {inlineLabelNode}
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
                </VStack>
              ) : (
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
              )}
            </HStack>
          </HStack>
        </TouchableOpacity>
      ),
      [
        ref,
        accessibilityHint,
        computedControlAccessibilityLabel,
        disabled,
        onBlur,
        onFocus,
        styles?.controlInputNode,
        styles?.controlStartNode,
        styles?.controlValueNode,
        startNode,
        insideHorizontalLabel,
        insideVerticalLabel,
        inlineLabelNode,
        valueAlignment,
        valueNode,
        contentNode,
        handleToggleOpen,
      ],
    );

    const endNode = useMemo(
      () => (
        <HStack
          alignItems="center"
          alignSelf="stretch"
          flexShrink={0}
          paddingStart={2}
          style={styles?.controlEndNode}
        >
          {customEndNode ? customEndNode : <AnimatedCaret color="fg" rotate={open ? 0 : 180} />}
        </HStack>
      ),
      [styles?.controlEndNode, customEndNode, open],
    );

    const inputStackStyles: StyleProp<ViewStyle> = useMemo(() => {
      let verticalSpace: ThemeVars.Space;
      if (insideVerticalLabel) {
        // A vertically-stacked inside label (size `l`) tightens the padding so the stacked label +
        // value fit the same field height an outside label produces. A multi-select with chips
        // (taller than a single text line) tightens further.
        verticalSpace = isMultiSelect && hasValue ? 0.25 : 0.75;
      } else if (isMultiSelect && hasValue) {
        verticalSpace = multiSelectVerticalSpace[resolvedSize];
      } else {
        verticalSpace = selectSizeVerticalSpace[resolvedSize];
      }
      return {
        paddingTop: theme.space[verticalSpace],
        paddingBottom: theme.space[verticalSpace],
        paddingLeft: theme.space[2],
        paddingRight: theme.space[2],
      };
    }, [insideVerticalLabel, resolvedSize, isMultiSelect, hasValue, theme.space]);

    return (
      <InputStack
        borderFocusedStyle={borderFocusedStyle}
        borderRadius={borderRadius}
        borderStyle={borderUnfocusedStyle}
        borderWidth={borderWidth}
        disabled={disabled}
        endNode={endNode}
        focused={open && !readOnly}
        focusedBorderWidth={focusedBorderWidth}
        helperTextNode={helperTextNode}
        inputBackground={inputBackground}
        inputNode={inputNode}
        labelNode={labelNode}
        labelVariant={insideVerticalLabel ? 'inside' : 'outside'}
        onBlur={onBlur}
        onFocus={onFocus}
        style={style}
        styles={{ input: inputStackStyles }}
        variant={variant}
        {...props}
        onFieldPress={handleToggleOpen}
      />
    );
  },
);

export const DefaultSelectControl = DefaultSelectControlComponent as DefaultSelectControlComponent;
