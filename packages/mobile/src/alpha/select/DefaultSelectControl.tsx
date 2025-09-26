import { forwardRef, memo, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useInputVariant } from '@coinbase/cds-common/hooks/useInputVariant';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types';

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

import type { SelectControlComponent } from './Select';

const variantColor: Record<string, ThemeVars.Color> = {
  foreground: 'fg',
  positive: 'fgPositive',
  negative: 'fgNegative',
  primary: 'fgPrimary',
  foregroundMuted: 'fgMuted',
  secondary: 'fgMuted',
};

export const DefaultSelectControl: SelectControlComponent = memo(
  forwardRef<
    TouchableOpacity,
    Parameters<SelectControlComponent>[0] &
      Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'>
  >(
    (
      {
        type,
        options,
        value,
        onChange,
        open,
        placeholder,
        disabled,
        setOpen,
        variant = 'foregroundMuted',
        helperText,
        label,
        startNode,
        compact,
        style,
        className,
        maxSelectedOptionsToShow = 3,
        accessibilityLabel,
        accessibilityHint,
        ...props
      },
      ref,
    ) => {
      const shouldShowCompactLabel = compact && label;
      const hasValue = value !== null && !(Array.isArray(value) && value.length === 0);
      const isMultiSelect = Array.isArray(value);

      const focusedVariant = useInputVariant(!!open, variant);
      const { borderFocusedStyle, borderUnfocusedStyle } = useInputBorderStyle(
        !!open,
        variant,
        focusedVariant,
      );

      const helperTextNode = useMemo(
        () =>
          typeof helperText === 'string' ? (
            <HelperText color={variant ? variantColor[variant] : 'fgMuted'}>
              {helperText}
            </HelperText>
          ) : (
            helperText
          ),
        [helperText, variant],
      );

      const labelNode = useMemo(
        () => (typeof label === 'string' ? <InputLabel color="fg">{label}</InputLabel> : label),
        [label],
      );

      const valueNode = useMemo(() => {
        if (hasValue && isMultiSelect) {
          const renderedValues =
            value.length <= maxSelectedOptionsToShow
              ? value
              : (value as string[]).slice(0, maxSelectedOptionsToShow);
          // Optimization to avoid mapping through options array for every <InputChip> rendered
          const disabledOptionsIndexes = options
            .filter((option) => option.disabled)
            .map((option) => renderedValues.indexOf(option.value ?? ''));
          return (
            <HStack flexWrap="wrap" gap={1}>
              {renderedValues.map((v, index) => (
                <InputChip
                  key={v}
                  disabled={disabledOptionsIndexes.includes(index)}
                  invertColorScheme={false}
                  maxWidth={200}
                  onPress={(e) => {
                    e?.stopPropagation();
                    onChange?.(v);
                  }}
                  value={v}
                />
              ))}
              {value.length - maxSelectedOptionsToShow > 0 && (
                <Chip>
                  <Text font="headline">{`+${value.length - maxSelectedOptionsToShow} more`}</Text>
                </Chip>
              )}
            </HStack>
          );
        }
        const content = hasValue ? value : placeholder;
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
        value,
        placeholder,
        shouldShowCompactLabel,
        maxSelectedOptionsToShow,
        options,
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
            style={[{ width: '100%' }, style]}
            {...props}
          >
            <HStack
              alignItems="center"
              justifyContent="space-between"
              minHeight={isMultiSelect ? 76 : undefined}
              paddingStart={startNode ? 0 : 2}
              paddingY={compact ? 1 : 2}
            >
              <HStack alignItems="center" flexGrow={1} flexShrink={1}>
                {!!startNode && (
                  <HStack alignItems="center" paddingX={2}>
                    {startNode}
                  </HStack>
                )}
                {shouldShowCompactLabel && (
                  <HStack alignItems="center" maxWidth="40%" paddingEnd={1}>
                    {labelNode}
                  </HStack>
                )}
                <VStack flexGrow={1} flexShrink={1} justifyContent="center">
                  {valueNode}
                </VStack>
              </HStack>
              <HStack alignItems="center" paddingX={2}>
                <AnimatedCaret
                  color={open ? variantColor[variant] : 'fg'}
                  rotate={open ? 0 : 180}
                />
              </HStack>
            </HStack>
          </TouchableOpacity>
        ),
        [
          ref,
          accessibilityHint,
          accessibilityLabel,
          disabled,
          style,
          props,
          isMultiSelect,
          startNode,
          compact,
          shouldShowCompactLabel,
          labelNode,
          valueNode,
          open,
          variant,
          setOpen,
        ],
      );

      return (
        <InputStack
          borderFocusedStyle={borderFocusedStyle}
          borderStyle={borderUnfocusedStyle}
          disabled={disabled}
          focused={open}
          helperTextNode={helperTextNode}
          inputNode={inputNode}
          labelNode={shouldShowCompactLabel ? null : labelNode}
          variant={variant}
        />
      );
    },
  ),
);
