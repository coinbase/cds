import { forwardRef, memo, useMemo, useState } from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useInputVariant } from '@coinbase/cds-common/hooks/useInputVariant';

import { Chip } from '../../chips/Chip';
import { InputChip } from '../../chips/InputChip';
import { HelperText } from '../../controls/HelperText';
import { InputLabel } from '../../controls/InputLabel';
import { InputStack } from '../../controls/InputStack';
import { NativeInput } from '../../controls/NativeInput';
import { useInputBorderStyle } from '../../hooks/useInputBorderStyle';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { AnimatedCaret } from '../../motion/AnimatedCaret';
import { Text } from '../../typography/Text';
import type { SelectOption } from '../select/Select';

import type { ComboboxControlProps } from './Combobox';

const variantColor: Record<string, ThemeVars.Color> = {
  foreground: 'fg',
  positive: 'fgPositive',
  negative: 'fgNegative',
  primary: 'fgPrimary',
  foregroundMuted: 'fgMuted',
  secondary: 'fgMuted',
};

type DefaultComboboxControlComponent = <ComboboxOptionValue extends string = string>(
  props: ComboboxControlProps<ComboboxOptionValue> & { ref?: React.Ref<TouchableOpacity> },
) => React.ReactElement;

const DefaultComboboxControlComponent = memo(
  forwardRef(
    <ComboboxOptionValue extends string = string>(
      {
        options,
        value,
        searchText,
        onSearch,
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
        // accessibilityHint,
        hiddenSelectedOptionsLabel = 'more',
        removeSelectedOptionAccessibilityLabel = 'Remove',
        // style,
        styles,
        ...props
      }: ComboboxControlProps<ComboboxOptionValue>,
      ref: React.Ref<TouchableOpacity>,
    ) => {
      const shouldShowCompactLabel = compact && label;
      const hasValue = value.length > 0;
      const [searchInputFocused, setSearchInputFocused] = useState<boolean>(false);

      // Prop value doesn't have default value because it affects the color of the
      // animated caret
      const focusedVariant = useInputVariant(!!searchInputFocused, variant ?? 'foregroundMuted');
      const { borderFocusedStyle, borderUnfocusedStyle } = useInputBorderStyle(
        !!searchInputFocused,
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
        if (hasValue) {
          const valuesToShow =
            value.length <= maxSelectedOptionsToShow
              ? (value as string[])
              : (value as string[]).slice(0, maxSelectedOptionsToShow);
          const optionsToShow = valuesToShow
            .map((value) => options.find((option) => option.value === value))
            .filter(Boolean) as SelectOption<ComboboxOptionValue>[];
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
                      onChange?.(option.value as ComboboxOptionValue);
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

        return typeof placeholder === 'string' ? (
          <Text
            color={hasValue ? 'fg' : 'fgMuted'}
            ellipsize="tail"
            font="body"
            textAlign={shouldShowCompactLabel ? 'right' : 'left'}
          >
            {placeholder}
          </Text>
        ) : (
          placeholder
        );
      }, [
        hasValue,
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
            // accessibilityHint={accessibilityHint}
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="button"
            disabled={disabled}
            style={[{ flexGrow: 1 }, styles?.controlInputNode]}
            {...props}
          >
            <HStack
              alignItems="center"
              justifyContent="space-between"
              minHeight={76}
              paddingStart={startNode ? 0 : 2}
              paddingY={labelVariant === 'inside' ? 0 : compact ? 1 : 2}
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
                  <NativeInput
                    accessibilityLabel={accessibilityLabel}
                    accessibilityRole="search"
                    containerSpacing={{ height: 24 }}
                    disabled={disabled}
                    onBlur={() => setSearchInputFocused(false)}
                    onChangeText={onSearch}
                    onFocus={() => setSearchInputFocused(true)}
                    placeholder={typeof placeholder === 'string' ? placeholder : undefined}
                    value={searchText}
                    {...props}
                  />
                </VStack>
              </HStack>
            </HStack>
          </TouchableOpacity>
        ),
        [
          ref,
          accessibilityLabel,
          disabled,
          styles?.controlInputNode,
          styles?.controlStartNode,
          styles?.controlValueNode,
          props,
          startNode,
          labelVariant,
          compact,
          shouldShowCompactLabel,
          labelNode,
          valueNode,
          onSearch,
          placeholder,
          searchText,
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
                  color={!searchInputFocused ? 'fg' : variant ? variantColor[variant] : 'fgPrimary'}
                  rotate={searchInputFocused ? 0 : 180}
                />
              )}
            </Pressable>
          </HStack>
        ),
        [styles?.controlEndNode, customEndNode, searchInputFocused, variant, setOpen],
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

export const DefaultComboboxControl =
  DefaultComboboxControlComponent as DefaultComboboxControlComponent;
