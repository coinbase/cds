import { forwardRef, memo, useMemo } from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useInputVariant } from '@coinbase/cds-common/hooks/useInputVariant';

import { Chip } from '../../chips/Chip';
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
        startNode,
        endNode: customEndNode,
        compact,
        maxSelectedOptionsToShow = 3,
        accessibilityLabel,
        accessibilityHint,
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

      // Prop value doesn't have default value because it affects the color of the
      // animated caret
      const focusedVariant = useInputVariant(!!open, variant ?? 'foregroundMuted');
      const { borderFocusedStyle, borderUnfocusedStyle } = useInputBorderStyle(
        !!open,
        variant ?? 'foregroundMuted',
        focusedVariant,
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
                alignSelf={labelVariant === 'inside' ? 'flex-start' : undefined}
                color="fg"
                paddingX={labelVariant === 'inside' ? 2 : 0}
                paddingY={shouldShowCompactLabel || labelVariant === 'inside' ? 0 : 0.5}
              >
                {label}
              </InputLabel>
            </Pressable>
          ) : (
            label
          ),
        [disabled, label, labelVariant, setOpen, shouldShowCompactLabel, styles?.controlLabelNode],
      );

      const valueNode = useMemo(() => {
        if (hasValue && isMultiSelect) {
          const valuesToShow =
            value.length <= maxSelectedOptionsToShow
              ? (value as string[])
              : (value as string[]).slice(0, maxSelectedOptionsToShow);
          const optionsToShow = valuesToShow
            .map((value) => options.find((option) => option.value === value))
            .filter(Boolean) as SelectOption<SelectOptionValue>[];
          return (
            <HStack flexWrap="wrap" gap={1}>
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
                    disabled={option.disabled}
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
                <Chip>
                  {`+${value.length - maxSelectedOptionsToShow} ${hiddenSelectedOptionsLabel}`}
                </Chip>
              )}
            </HStack>
          );
        }

        const option = options.find((option) => option.value === value);
        const label = option?.label ?? option?.description ?? option?.value ?? placeholder;
        const content = hasValue ? label : placeholder;
        return typeof content === 'string' ? (
          <Text
            color={hasValue ? 'fg' : 'fgMuted'}
            ellipsize="tail"
            font="body"
            textAlign={shouldShowCompactLabel ? 'right' : 'left'}
          >
            {content}
          </Text>
        ) : (
          content
        );
      }, [
        hasValue,
        isMultiSelect,
        options,
        placeholder,
        shouldShowCompactLabel,
        value,
        maxSelectedOptionsToShow,
        hiddenSelectedOptionsLabel,
        removeSelectedOptionAccessibilityLabel,
        onChange,
      ]);

      const inputNode = useMemo(
        () => (
          <TouchableOpacity
            ref={ref}
            accessibilityHint={accessibilityHint}
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="button"
            disabled={disabled}
            onPress={() => setOpen((s) => !s)}
            style={[{ flexGrow: 1 }, styles?.controlInputNode]}
            {...props}
          >
            <HStack
              alignItems="center"
              justifyContent="space-between"
              minHeight={isMultiSelect ? (compact ? 60 : 76) : undefined}
              paddingBottom={labelVariant === 'inside' ? 0 : undefined}
              paddingStart={startNode ? 0 : 2}
              paddingY={labelVariant === 'inside' || compact ? 1 : 2}
            >
              <HStack alignItems="center" flexGrow={1}>
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
                  justifyContent="center"
                  maxWidth={startNode ? '70%' : '85%'}
                  style={styles?.controlValueNode}
                >
                  {valueNode}
                </VStack>
              </HStack>
            </HStack>
          </TouchableOpacity>
        ),
        [
          ref,
          accessibilityHint,
          accessibilityLabel,
          disabled,
          styles?.controlInputNode,
          styles?.controlStartNode,
          styles?.controlValueNode,
          props,
          isMultiSelect,
          startNode,
          labelVariant,
          compact,
          shouldShowCompactLabel,
          labelNode,
          valueNode,
          setOpen,
        ],
      );

      const endNode = useMemo(
        () => (
          <HStack alignItems="center" paddingX={2} style={styles?.controlEndNode}>
            <Pressable onPress={() => setOpen((s) => !s)}>
              {customEndNode ? (
                customEndNode
              ) : (
                <AnimatedCaret
                  color={!open ? 'fg' : variant ? variantColor[variant] : 'fgPrimary'}
                  rotate={open ? 0 : 180}
                />
              )}
            </Pressable>
          </HStack>
        ),
        [open, variant, setOpen, customEndNode, styles?.controlEndNode],
      );

      return (
        <InputStack
          borderFocusedStyle={borderFocusedStyle}
          borderStyle={borderUnfocusedStyle}
          disabled={disabled}
          endNode={endNode}
          focused={open}
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
