import React, {
  cloneElement,
  isValidElement,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Pressable } from 'react-native';
import type { ForwardedRef } from 'react';
import type {
  DimensionValue,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  ViewStyle,
} from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useInputVariant } from '@coinbase/cds-common/hooks/useInputVariant';
import { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';
import type { InputVariant, SharedInputProps } from '@coinbase/cds-common/types/InputBaseProps';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import type { TextAlignProps } from '@coinbase/cds-common/types/TextBaseProps';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { useInputBorderStyle } from '../hooks/useInputBorderStyle';
import { useTheme } from '../hooks/useTheme';
import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { Text } from '../typography/Text';

import { TextInputFocusVariantContext } from './context';
import { HelperText } from './HelperText';
import type { InputIconButtonProps } from './InputIconButton';
import { InputIconButton } from './InputIconButton';
import { InputLabel } from './InputLabel';
import { InputStack, type InputStackBaseProps } from './InputStack';
import { NativeInput } from './NativeInput';
import type { TextInputSize } from './useTextInputDensity';
import { useTextInputDensity, useTextInputPlacement } from './useTextInputDensity';

export type TextInputBaseProps = SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > &
  Omit<SharedInputProps, 'compact'> &
  Pick<
    InputStackBaseProps,
    | 'height'
    | 'variant'
    | 'width'
    | 'disabled'
    | 'borderRadius'
    | 'enableColorSurge'
    | 'focusedBorderWidth'
    | 'inputBackground'
  > & {
    /**
     * Enables compact variation. Prefer `size="s"` or `size="m"` with an explicit `labelVariant`.
     *
     * @deprecated Unset and use `size="s"` instead. This will be removed in a future major release.
     * @deprecationExpectedRemoval v10
     */
    compact?: boolean;
    /**
     * Controls overall density of the input field, inside of the border.
     * @default 'l'
     */
    size?: TextInputSize;
    /**
     * Determines where the provided label/labelNode is rendered.
     * By default, the label is rendered outisde, above the input element.
     * When size is `l` (the default), an `inside` label is stacked vertically with the input; otherwise is rendered horizontally.
     * @default 'outside'
     */
    labelVariant?: 'inside' | 'outside';
    /**
     * Aligns text inside input and helperText
     * @default start
     */
    align?: TextAlignProps['align'];
    /**
     * Typography font token for the field (passed through to `NativeInput` as `font`), same token family as `align`.
     * @default body
     */
    font?: ThemeVars.Font;
    /**
     * Adds suffix text to the end of input
     */
    suffix?: string;
    /** Adds content to the start of the inner input. Refer to diagram for location of startNode in InputStack component */
    start?: React.ReactNode;
    /** Adds content to the end of the inner input. Refer to diagram for location of endNode in InputStack component */
    end?: React.ReactNode;
    /**
     * Add ability to test individual parts of the input
     */
    testIDMap?: {
      start?: string;
      end?: string;
      label?: string;
      helperText?: string;
    };
    /**
     * Accessibility label for helper text error icon when variant='negative'
     * @default 'error'
     */
    helperTextErrorIconAccessibilityLabel?: string;
    /**
     * React node to render label. Takes precedence over `label`.
     * @note if both labelNode and label are provided, label will still be used as accessibility label for the input if no accessibilityLabel is provided.
     */
    labelNode?: React.ReactNode;
    /**
     * Determines if the input should have a border.
     * When set to `false`, focus border styling is disabled by default.
     * @default true
     */
    bordered?: boolean;
  };

export type TextInputProps = TextInputBaseProps &
  Omit<RNTextInputProps, 'value' | 'onChange' | 'onChangeText' | 'textAlign' | 'selectionColor'> & {
    value?: RNTextInputProps['value'];
    onChange?: RNTextInputProps['onChange'];
    onChangeText?: RNTextInputProps['onChangeText'];
    /**
     * minimum height of input
     * @default auto
     */
    minHeight?: DimensionValue;
    /**
     * Native TextInput textAlign with the extra unset option to remove the textAlign style.
     * Use this to workaround the issue where long text does not ellipsis in TextInput
     */
    textAlign?: RNTextInputProps['textAlign'] | 'unset';
  };

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'fgPrimary',
  positive: 'fgPositive',
  negative: 'fgNegative',
  foreground: 'fg',
  foregroundMuted: 'fgMuted',
  secondary: 'bgSecondary',
};

/** The field container (InputStack) owns the padding, so the input itself has none. */
const zeroPaddingStyle: ViewStyle = { padding: 0 };

export const TextInput = memo(
  ({
    ref,
    ..._props
  }: TextInputProps & {
    ref?: React.Ref<RNTextInput>;
  }) => {
    const mergedProps = useComponentConfig('TextInput', _props);
    const {
      label,
      labelFont = 'label1',
      labelColor = 'fg',
      helperText = '',
      variant = 'foregroundMuted',
      testID,
      testIDMap,
      start,
      end,
      width = '100%',
      disabled = false,
      align = 'start',
      font = 'body',
      compact = false,
      size,
      suffix = '',
      accessibilityLabel,
      borderRadius,
      enableColorSurge = false,
      helperTextErrorIconAccessibilityLabel = 'error',
      bordered = true,
      focusedBorderWidth,
      labelVariant = 'outside',
      labelNode,
      inputBackground,
      ...editableInputProps
    } = mergedProps;
    const theme = useTheme();
    const [focused, setFocused] = useState(false);
    const focusedVariant = useInputVariant(focused, variant);
    const internalRef = useRef<RNTextInput>(null);
    const refs = useMergeRefs(ref, internalRef);
    const { borderFocusedStyle, borderUnfocusedStyle } = useInputBorderStyle(
      focused,
      variant,
      focusedVariant,
      bordered,
      bordered ? 100 : 0,
      focusedBorderWidth,
    );

    const editableInputAddonProps: TextInputProps = {
      ...editableInputProps,
      onFocus: (e) => {
        editableInputProps?.onFocus?.(e);
        setFocused(true);
      },
      onBlur: (e) => {
        editableInputProps?.onBlur?.(e);
        setFocused(false);
      },
    };

    const handleNodePress = useCallback(() => {
      if (!editableInputAddonProps.readOnly) {
        setFocused(true);
        internalRef.current?.focus();
      }
    }, [setFocused, internalRef, editableInputAddonProps.readOnly]);

    const hasLabel = useMemo(() => !!label || !!labelNode, [label, labelNode]);

    // `size` wins over the deprecated `compact`: compact only takes effect when no
    // size is set. Resolve both here, then hand the resolved values to the hooks.
    const resolvedSize: TextInputSize = size ?? 'l';
    const nativeCompact = Boolean(compact) && size === undefined;

    const labelPlacement = useTextInputPlacement({
      compact: nativeCompact,
      hasLabel,
      labelVariant,
      size: resolvedSize,
    });

    const { contentPadding, contentGap } = useTextInputDensity({
      compact: nativeCompact,
      labelPlacement,
      size: resolvedSize,
    });

    // View flags derived from the placement decision.
    const isVerticalLabel = labelPlacement === 'inside-vertical';
    const showLabelInStartSlot = hasLabel && labelPlacement === 'inside-horizontal';
    const showLabelInStack = hasLabel && !showLabelInStartSlot;
    const inputStackLabelVariant = isVerticalLabel ? 'inside' : 'outside';

    // The field's inner spacing is applied to the InputStack field container (via
    // styles.input): the content padding box goes on the container and a gap spaces
    // the start / input / end slots. TextInput only decides placement (via
    // useTextInputPlacement) and spacing (via useTextInputDensity) — no per-element
    // padding distribution.
    const inputStackStyles = useMemo(() => {
      const { top, right, bottom, left } = contentPadding;
      return {
        input: {
          alignItems: 'center',
          gap: theme.space[contentGap],
          paddingTop: theme.space[top],
          paddingBottom: theme.space[bottom],
          paddingStart: theme.space[left],
          paddingEnd: theme.space[right],
        } as ViewStyle,
      };
    }, [contentPadding, contentGap, theme.space]);

    // Get the accessability label from the start node child
    const startIconA11yLabel = useMemo(() => {
      if (isValidElement(start) && start.type === InputIconButton) {
        return (start.props as InputIconButtonProps).accessibilityLabel;
      }

      return undefined;
    }, [start]);

    // The Pressable element steals the accessability props 🥷
    const inaccessibleStart = useMemo(() => {
      if (isValidElement(start) && start.type === InputIconButton) {
        return cloneElement(start, {
          // ReactElement default props is unknown, so we need to cast to the correct type
          ...(start.props as InputIconButtonProps),
          accessibilityLabel: undefined,
          accessibilityHint: undefined,
          accessibilityElementsHidden: true,
          importantForAccessibility: 'no',
        } as InputIconButtonProps);
      }

      return start;
    }, [start]);

    const readOnlyInputBackground = useMemo(() => {
      if (!disabled && editableInputAddonProps.readOnly) {
        return 'bgSecondary';
      }
      return undefined;
    }, [disabled, editableInputAddonProps.readOnly]);

    return (
      <InputStack
        borderFocusedStyle={borderFocusedStyle}
        borderRadius={borderRadius}
        borderStyle={borderUnfocusedStyle}
        borderWidth={bordered ? 100 : 0}
        disabled={disabled}
        enableColorSurge={enableColorSurge}
        endNode={
          (suffix !== '' || !!end) && (
            <HStack
              alignItems="center"
              background={readOnlyInputBackground}
              gap={2}
              justifyContent="center"
              testID={testIDMap?.end ?? ''}
            >
              <Pressable accessibilityRole="button" disabled={disabled} onPress={handleNodePress}>
                <HStack>
                  {suffix !== '' && (
                    <Text color="fgMuted" font="label1" paddingEnd={2}>
                      {suffix}
                    </Text>
                  )}
                  {!!end && (
                    <TextInputFocusVariantContext.Provider value={focusedVariant}>
                      {end}
                    </TextInputFocusVariantContext.Provider>
                  )}
                </HStack>
              </Pressable>
            </HStack>
          )
        }
        focused={focused}
        focusedBorderWidth={focusedBorderWidth}
        helperTextNode={
          !!helperText &&
          (typeof helperText === 'string' ? (
            <HelperText
              align={align}
              color={variantColorMap[variant]}
              errorIconAccessibilityLabel={helperTextErrorIconAccessibilityLabel}
              errorIconTestID={`${testIDMap?.helperText}-error-icon`}
              testID={testIDMap?.helperText ?? ''}
            >
              {helperText}
            </HelperText>
          ) : (
            helperText
          ))
        }
        inputBackground={readOnlyInputBackground ?? inputBackground}
        inputNode={
          <NativeInput
            ref={refs}
            accessibilityHint={typeof helperText === 'string' ? helperText : undefined}
            accessibilityLabel={accessibilityLabel ?? label}
            align={align}
            disabled={disabled}
            font={font}
            selectionColor={variantColorMap[focusedVariant]}
            testID={testID}
            {...editableInputAddonProps}
            style={[zeroPaddingStyle, editableInputAddonProps.style]}
          />
        }
        labelNode={
          showLabelInStack &&
          (labelNode && !isVerticalLabel
            ? labelNode
            : hasLabel && (
                <Pressable accessibilityRole="button" disabled={disabled} onPress={handleNodePress}>
                  {isVerticalLabel && labelNode ? (
                    <Box background={readOnlyInputBackground}>{labelNode}</Box>
                  ) : isVerticalLabel ? (
                    <InputLabel
                      background={readOnlyInputBackground}
                      color={labelColor}
                      font={labelFont}
                      paddingY={0}
                      testID={testIDMap?.label ?? ''}
                    >
                      {label}
                    </InputLabel>
                  ) : (
                    <InputLabel color={labelColor} font={labelFont} testID={testIDMap?.label ?? ''}>
                      {label}
                    </InputLabel>
                  )}
                </Pressable>
              ))
        }
        labelVariant={inputStackLabelVariant}
        startNode={
          (showLabelInStartSlot || !!start) && (
            <Box
              alignItems="center"
              background={readOnlyInputBackground}
              justifyContent="center"
              testID={testIDMap?.start}
            >
              <Pressable
                accessibilityElementsHidden={!startIconA11yLabel}
                accessibilityHint={startIconA11yLabel}
                accessibilityLabel={startIconA11yLabel}
                accessibilityRole="button"
                disabled={disabled}
                importantForAccessibility={startIconA11yLabel ? 'auto' : 'no'}
                onPress={handleNodePress}
              >
                <HStack>
                  {showLabelInStartSlot &&
                    (labelNode
                      ? labelNode
                      : !!label && (
                          <InputLabel color={labelColor} font={labelFont} paddingY={0}>
                            {label}
                          </InputLabel>
                        ))}
                  {!!start && (
                    <TextInputFocusVariantContext.Provider value={focusedVariant}>
                      {inaccessibleStart}
                    </TextInputFocusVariantContext.Provider>
                  )}
                </HStack>
              </Pressable>
            </Box>
          )
        }
        styles={inputStackStyles}
        variant={variant}
        width={width}
      />
    );
  },
);
