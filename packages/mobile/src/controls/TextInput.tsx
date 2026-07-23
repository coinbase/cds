import React, {
  cloneElement,
  isValidElement,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { Pressable } from 'react-native';
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

const defaultTextInputSize: TextInputSize = 'l';

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
    // size is set, resolving to its size equivalent (`s`). The one place compact
    // still steers layout on its own is the label placement (see below).
    const resolvedSize: TextInputSize = size ?? (compact ? 's' : defaultTextInputSize);
    const isCompactLabel = Boolean(compact) && size === undefined;

    const labelPlacement = useTextInputPlacement({
      compact: isCompactLabel,
      hasLabel,
      labelVariant,
      size: resolvedSize,
    });

    const { contentPadding, contentGap } = useTextInputDensity({
      labelPlacement,
      size: resolvedSize,
    });

    // View flags derived from the placement decision.
    const isVerticalLabel = labelPlacement === 'inside-vertical';
    const showLabelInStartSlot = hasLabel && labelPlacement === 'inside-horizontal';
    const showLabelInStack = hasLabel && !showLabelInStartSlot;
    const inputStackLabelVariant = isVerticalLabel ? 'inside' : 'outside';

    // Spacing is split by axis (see the model on ContentPadding). The InputStack
    // field container owns the horizontal outer padding + the inter-slot gap.
    const inputStackStyles = useMemo(
      () => ({
        input: {
          alignItems: 'center',
          gap: theme.space[contentGap],
          paddingStart: theme.space[contentPadding.left],
          paddingEnd: theme.space[contentPadding.right],
        } as ViewStyle,
      }),
      [contentPadding.left, contentPadding.right, contentGap, theme.space],
    );

    // Vertical field sizing lives on a wrapper View around NativeInput — never on
    // the RN TextInput (padding/lineHeight/height on TextInput mis-center glyphs).
    // The wrapper's minHeight is padding + theme line box so sizes match web/design
    // while NativeInput keeps natural text metrics and stays centered via
    // justifyContent. Tall adornments still center in the field without inflating it.
    // For a stacked (inside-vertical) label the top band moves onto the label.
    const inputPaddingTop = isVerticalLabel ? 0 : contentPadding.top;
    const inputPaddingBottom = contentPadding.bottom;
    const stackedLabelPaddingTop = contentPadding.top;
    const inputPaddingTopPx = theme.space[inputPaddingTop];
    const inputPaddingBottomPx = theme.space[inputPaddingBottom];
    const inputLineBoxPx = theme.lineHeight[font];

    const inputPaddingWrapperStyle = useMemo<ViewStyle>(
      () => ({
        flexGrow: 2,
        flexShrink: 1,
        minWidth: 0,
        justifyContent: 'center',
        paddingTop: inputPaddingTopPx,
        paddingBottom: inputPaddingBottomPx,
        // Theme line box floor (e.g. body 24) without setting height/lineHeight on
        // the TextInput itself — RN treats View minHeight reliably.
        minHeight: inputPaddingTopPx + inputLineBoxPx + inputPaddingBottomPx,
      }),
      [inputPaddingTopPx, inputPaddingBottomPx, inputLineBoxPx],
    );

    const nativeInputStyle = useMemo(
      () => [{ width: '100%' as const, padding: 0 }, editableInputAddonProps.style],
      [editableInputAddonProps.style],
    );

    // Resolve InputIconButton whether it's the start root or nested in a spacing wrapper (e.g. Box).
    const startInputIconButton = useMemo(() => {
      if (!isValidElement(start)) return undefined;
      if (start.type === InputIconButton) return start;

      const child = (start.props as { children?: ReactNode }).children;
      if (isValidElement(child) && child.type === InputIconButton) return child;

      return undefined;
    }, [start]);

    // Get the accessability label from the start node child
    const startIconA11yLabel = useMemo(() => {
      return (startInputIconButton?.props as InputIconButtonProps | undefined)?.accessibilityLabel;
    }, [startInputIconButton]);

    // The Pressable element steals the accessability props 🥷
    const inaccessibleStart = useMemo(() => {
      if (!isValidElement(start) || !startInputIconButton) return start;

      const inaccessibleButton = cloneElement(startInputIconButton, {
        // ReactElement default props is unknown, so we need to cast to the correct type
        ...(startInputIconButton.props as InputIconButtonProps),
        accessibilityLabel: undefined,
        accessibilityHint: undefined,
        accessibilityElementsHidden: true,
        importantForAccessibility: 'no',
      } as InputIconButtonProps);

      if (start.type === InputIconButton) return inaccessibleButton;

      return cloneElement(start, undefined, inaccessibleButton);
    }, [start, startInputIconButton]);

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
                {/*
                  Must center — RN's default alignItems is stretch, which would grow the
                  16px InputIcon box to the suffix's label1 line box (20px).
                */}
                <HStack alignItems="center" gap={2}>
                  {suffix !== '' && (
                    <Text color="fgMuted" font="label1">
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
          <Box style={inputPaddingWrapperStyle} testID={testID ? `${testID}-padding` : undefined}>
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
              style={nativeInputStyle}
            />
          </Box>
        }
        labelNode={
          showLabelInStack &&
          (labelNode && !isVerticalLabel
            ? labelNode
            : hasLabel && (
                <Pressable accessibilityRole="button" disabled={disabled} onPress={handleNodePress}>
                  {isVerticalLabel && labelNode ? (
                    // Stacked label owns the top vertical band; the input owns the bottom.
                    <Box background={readOnlyInputBackground} paddingTop={stackedLabelPaddingTop}>
                      {labelNode}
                    </Box>
                  ) : isVerticalLabel ? (
                    <InputLabel
                      background={readOnlyInputBackground}
                      color={labelColor}
                      font={labelFont}
                      paddingBottom={0}
                      paddingTop={stackedLabelPaddingTop}
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
            <HStack
              alignItems="center"
              background={readOnlyInputBackground}
              gap={2}
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
                <HStack alignItems="center" gap={2}>
                  {showLabelInStartSlot &&
                    (labelNode
                      ? labelNode
                      : !!label && (
                          // Inline label: zero its vertical padding so it never out-talls
                          // the input, which owns the field's height.
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
            </HStack>
          )
        }
        styles={inputStackStyles}
        variant={variant}
        width={width}
      />
    );
  },
);
