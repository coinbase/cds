import { memo, useCallback, useMemo } from 'react';
import { Pressable, type StyleProp, TouchableOpacity, type ViewStyle } from 'react-native';
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
import { useSelectDensity, useSelectPlacement } from './useSelectDensity';

const defaultSelectSize: SelectSize = 'l';

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
    testID,
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
    // `size` wins when both `size` and the deprecated `compact` are provided.
    const resolvedSize = size ?? (compact ? 's' : defaultSelectSize);
    const isMultiSelect = type === 'multi';
    // Label placement is decoupled from `size` (mirrors TextInput's useTextInputDensity):
    // `labelVariant` is honored at every size. The deprecated `compact` prop forces the legacy
    // inline label ONLY when `size` is unset — `size` wins over `compact`.
    const useLegacyCompact = Boolean(compact) && size === undefined;
    const labelVariant = useLegacyCompact ? undefined : labelVariantProp;
    const hasValue = value !== null && !(Array.isArray(value) && value.length === 0);

    // Where the label sits (outside / inline / stacked) and the size-derived spacing
    // both come from the density hooks — the whole size story lives there.
    const labelPlacement = useSelectPlacement({
      compact: useLegacyCompact,
      hasLabel: !!label,
      isMultiSelect,
      labelVariant,
      size: resolvedSize,
    });
    const { contentPadding, chipSize } = useSelectDensity({
      hasValue,
      isMultiSelect,
      labelPlacement,
      size: resolvedSize,
    });

    // An inside label stacks vertically at size `l` (and for multi-select, which can't host an
    // inline label); at `s`/`m` it sits inline in the start slot. Legacy compact is always inline.
    const shouldShowInsideLabel = labelPlacement === 'inside-vertical';
    const shouldShowCompactLabel = labelPlacement === 'inside-horizontal';

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

    const labelNode = useMemo(() => {
      if (shouldShowInsideLabel || shouldShowCompactLabel) return null;

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
      shouldShowInsideLabel,
      shouldShowCompactLabel,
      label,
      labelColor,
      labelFont,
      styles?.controlLabelNode,
    ]);

    const inlineLabelNode = useMemo(() => {
      if (!shouldShowInsideLabel && !shouldShowCompactLabel) return null;

      if (typeof label === 'string') {
        return (
          <InputLabel
            color={labelColor}
            font={labelFont}
            paddingY={0}
            style={styles?.controlLabelNode}
          >
            {label}
          </InputLabel>
        );
      }

      return label;
    }, [
      shouldShowInsideLabel,
      shouldShowCompactLabel,
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
                  size={chipSize}
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
                >
                  {option.label ?? option.description ?? option.value ?? ''}
                </InputChip>
              );
            })}
            {value.length - maxSelectedOptionsToShow > 0 && (
              <InputChip size={chipSize} borderWidth={0} end={null} invertColorScheme={false}>
                {`+${value.length - maxSelectedOptionsToShow} ${hiddenSelectedOptionsLabel}`}
              </InputChip>
            )}
          </HStack>
        );
      }

      return typeof singleValueContent === 'string' ? (
        <Text align={align} color={hasValue ? 'fg' : 'fgMuted'} ellipsize="tail" font={font}>
          {singleValueContent}
        </Text>
      ) : (
        singleValueContent
      );
    }, [
      hasValue,
      isMultiSelect,
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

    // Vertical field padding lives on the content (this touchable), not the field
    // container — so the caret / start adornment centers within it instead of
    // stretching the field taller. For a stacked (inside-vertical) label the touchable
    // wraps both the label and value, so uniform top/bottom padding fits the 58px field.
    const controlInputNodeStyle = useMemo<StyleProp<ViewStyle>>(
      () => [
        {
          flexGrow: 1,
          paddingTop: theme.space[contentPadding.top],
          paddingBottom: theme.space[contentPadding.bottom],
        },
        styles?.controlInputNode,
      ],
      [contentPadding.top, contentPadding.bottom, theme.space, styles?.controlInputNode],
    );

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
          onPress={handleToggleOpen}
          style={controlInputNodeStyle}
          testID={testID ? `${testID}-input` : undefined}
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
              {shouldShowCompactLabel ? (
                <HStack alignItems="center" maxWidth="40%" paddingEnd={1}>
                  {inlineLabelNode}
                </HStack>
              ) : null}
              {shouldShowInsideLabel ? (
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
        controlInputNodeStyle,
        styles?.controlStartNode,
        styles?.controlValueNode,
        startNode,
        shouldShowCompactLabel,
        shouldShowInsideLabel,
        inlineLabelNode,
        valueAlignment,
        valueNode,
        contentNode,
        handleToggleOpen,
        testID,
      ],
    );

    const endNode = useMemo(
      () => (
        <Pressable
          accessible={customEndNode ? true : false}
          disabled={disabled}
          onPress={handleToggleOpen}
        >
          <HStack alignItems="center" flexGrow={1} paddingStart={2} style={styles?.controlEndNode}>
            {customEndNode ? customEndNode : <AnimatedCaret color="fg" rotate={open ? 0 : 180} />}
          </HStack>
        </Pressable>
      ),
      [styles?.controlEndNode, disabled, customEndNode, open, handleToggleOpen],
    );

    // The field container owns only the horizontal outer padding and centers its slots;
    // the vertical (height-defining) band lives on the content touchable (see
    // controlInputNodeStyle).
    const inputStackStyles: StyleProp<ViewStyle> = useMemo(
      () => ({
        alignItems: 'center',
        paddingStart: theme.space[contentPadding.left],
        paddingEnd: theme.space[contentPadding.right],
      }),
      [contentPadding.left, contentPadding.right, theme.space],
    );

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
        labelVariant={labelVariant}
        onBlur={onBlur}
        onFocus={onFocus}
        style={style}
        styles={{ input: inputStackStyles }}
        testID={testID}
        variant={variant}
        {...props}
      />
    );
  },
);

export const DefaultSelectControl = DefaultSelectControlComponent as DefaultSelectControlComponent;
