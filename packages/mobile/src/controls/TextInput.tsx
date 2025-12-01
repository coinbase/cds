import React, {
  cloneElement,
  forwardRef,
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
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  TextInputProps as RNTextInputProps,
  ViewStyle,
} from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useInputVariant } from '@coinbase/cds-common/hooks/useInputVariant';
import { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';
import type {
  SharedAccessibilityProps,
  SharedInputProps,
  SharedProps,
  TextAlignProps,
} from '@coinbase/cds-common/types';
import type { DimensionValue } from '@coinbase/cds-common/types/DimensionStyles';
import type { InputVariant } from '@coinbase/cds-common/types/InputBaseProps';

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

export type TextInputBaseProps = SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > &
  SharedInputProps &
  Pick<
    InputStackBaseProps,
    | 'height'
    | 'variant'
    | 'width'
    | 'disabled'
    | 'borderRadius'
    | 'enableColorSurge'
    | 'labelVariant'
  > & {
    /**
     * Aligns text inside input and helperText
     * @default start
     */
    align?: TextAlignProps['align'];
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
  };

export type TextInputProps = TextInputBaseProps &
  Omit<RNTextInputProps, 'value' | 'onChange' | 'onChangeText' | 'textAlign'> & {
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
    /**
     * Determines if the input should have a border
     * @default true
     */
    bordered?: boolean;
  };

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'fgPrimary',
  positive: 'fgPositive',
  negative: 'fgNegative',
  foreground: 'fg',
  foregroundMuted: 'fgMuted',
  secondary: 'bgSecondary',
};

export const TextInput = memo(
  forwardRef(
    (
      {
        label,
        helperText = '',
        variant = 'foregroundMuted',
        testID,
        testIDMap,
        start,
        end,
        width = '100%',
        disabled = false,
        align = 'start',
        compact,
        suffix = '',
        accessibilityLabel,
        borderRadius,
        enableColorSurge = false,
        helperTextErrorIconAccessibilityLabel = 'error',
        bordered = true,
        labelVariant = 'outside',
        labelNode,
        ...editableInputProps
      }: TextInputProps,
      ref: ForwardedRef<RNTextInput>,
    ) => {
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
      );

      const editableInputAddonProps = {
        ...editableInputProps,
        onFocus: (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
          editableInputProps?.onFocus?.(e);
          setFocused(true);
        },
        onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
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

      const containerSpacing: ViewStyle = useMemo(
        () => ({
          ...(!!start && { paddingStart: theme.space[0.5] }),
          ...(labelVariant === 'inside' &&
            Boolean(label) &&
            !compact && {
              paddingBottom: 0,
              paddingTop: 0,
            }),
        }),
        [start, labelVariant, theme.space, compact, label],
      );

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
            ...start.props,
            accessibilityLabel: undefined,
            accessibilityHint: undefined,
            accessibilityElementsHidden: true,
            importantForAccessibility: 'no',
          } as InputIconButtonProps);
        }

        return start;
      }, [start]);

      const inputBackground = useMemo(() => {
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
          disabled={disabled}
          enableColorSurge={enableColorSurge}
          endNode={
            (suffix !== '' || !!end) && (
              <HStack
                alignItems="center"
                background={inputBackground}
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
          inputNode={
            <NativeInput
              ref={refs}
              accessibilityHint={typeof helperText === 'string' ? helperText : undefined}
              accessibilityLabel={accessibilityLabel ?? label}
              align={align}
              compact={compact}
              containerSpacing={containerSpacing}
              disabled={disabled}
              testID={testID}
              {...editableInputAddonProps}
            />
          }
          labelNode={
            !compact &&
            (labelNode
              ? labelNode
              : !!label && (
                  <Pressable
                    accessibilityRole="button"
                    disabled={disabled}
                    onPress={handleNodePress}
                  >
                    <InputLabel
                      {...(labelVariant === 'inside' && {
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingStart: start ? 0.5 : 2,
                        paddingEnd: 2,
                        background: inputBackground,
                      })}
                      testID={testIDMap?.label ?? ''}
                    >
                      {label}
                    </InputLabel>
                  </Pressable>
                ))
          }
          labelVariant={labelVariant}
          startNode={
            ((compact && !!label) || !!start) && (
              <Box
                alignItems="center"
                background={inputBackground}
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
                    {compact && !!label && <InputLabel paddingStart={2}>{label}</InputLabel>}
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
          variant={variant}
          width={width}
        />
      );
    },
  ),
);
