import React, {
  cloneElement,
  forwardRef,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';
import { usePrefixedId } from '@coinbase/cds-common/hooks/usePrefixedId';
import type { InputVariant, SharedInputProps } from '@coinbase/cds-common/types/InputBaseProps';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import type { TextAlignProps } from '@coinbase/cds-common/types/TextBaseProps';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { Text } from '../typography/Text';

import { TextInputFocusVariantContext } from './context';
import { HelperText } from './HelperText';
import { InputLabel } from './InputLabel';
import type { InputStackBaseProps } from './InputStack';
import { InputStack } from './InputStack';
import { NativeInput } from './NativeInput';

/**
 * In normal circumstances, padding horizontal should be 2 (16px).
 * If compact is true, the padding top should be 1.
 * If labelVariant is 'inside', the padding top should be 3.5 (28px).
 * This gives the absolute positioning of the label space.
 * The bottom will be 1 (8px) in this case to equal padding of inside label.
 * If start exist, the padding between input area and icon should be 0.5 (4px).
 */
const nativeInputContainerCss = css`
  padding-top: var(--space-2);
  padding-bottom: var(--space-2);
  padding-inline-start: var(--space-2);
  padding-inline-end: var(--space-2);

  &[data-labelvariant='inside'] {
    padding-top: 0;
    padding-bottom: var(--space-1);
  }

  &[data-start='true'] {
    padding-inline-start: var(--space-0_5);
  }

  &[data-compact='true'] {
    padding-top: var(--space-1);
    padding-bottom: var(--space-1);
    padding-inline-start: var(--space-1);
    padding-inline-end: var(--space-1);
  }
`;

const insideLabelCss = css`
  padding-top: var(--space-1);
  padding-bottom: 0;
  padding-inline-start: var(--space-2);
  padding-inline-end: var(--space-2);
`;

const insideLabelCssStartCss = css`
  padding-inline-start: var(--space-0_5);
`;

export type TextInputBaseProps = {
  /**
   * Callback fired when pressed/clicked
   */
  onClick?: React.MouseEventHandler;
  /**
   * Customize the element which the input area will be rendered as. Adds ability to render the input area
   * as a `<textarea />`, `<input />` etc...
   * By default, the input area will be rendered as an `<input />`.
   * @danger Use this at your own risk, and don't use unless ABSOLUTELY NECESSARY. You may see weird UI when focusing etc..
   * Our default input handles all of the UI/Accessibility needs for your out of the box, but inputNode will not include
   * those.
   * */
  inputNode?: React.ReactElement;
  /**
   * Adds border to input
   * @default true
   */
  bordered?: boolean;
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
} & SharedProps &
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
    | 'inputBackground'
  > &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'width' | 'className'>;

export type TextInputProps = TextInputBaseProps;

const useInputVariant = (focused: boolean, variant: InputVariant) => {
  return useMemo(
    () => (focused && variant !== 'positive' && variant !== 'negative' ? 'primary' : variant),
    [focused, variant],
  );
};

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'fgPrimary',
  positive: 'fgPositive',
  negative: 'fgNegative',
  foreground: 'fg',
  foregroundMuted: 'fgMuted',
  secondary: 'fg',
};

export const TextInput = memo(
  forwardRef(function TextInput(
    {
      label,
      accessibilityLabel,
      helperText = '',
      variant = 'foregroundMuted',
      testID,
      testIDMap,
      start,
      end,
      width = '100%',
      disabled = false,
      align = 'start',
      compact = false,
      suffix = '',
      onFocus,
      onBlur,
      borderRadius = 200,
      height,
      inputNode,
      bordered = true,
      enableColorSurge = false,
      helperTextErrorIconAccessibilityLabel = 'error',
      labelVariant = 'outside',
      labelNode,
      inputBackground,
      ...htmlInputElmProps
    }: TextInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) {
    const [focused, setFocused] = useState(false);
    const focusedVariant = useInputVariant(focused, variant);
    const internalRef = useRef<HTMLInputElement>();
    const refs = useMergeRefs(ref, internalRef);

    // Only generate a helperTextId if helperText is defined, otherwise
    // set it to undefined
    const shouldSetHelperTextId = useMemo(() => helperText !== '', [helperText]);
    const shouldSetLabelId = label !== undefined;
    const [helperTextId, labelId] = usePrefixedId([
      'cds-textinput-description',
      'cds-textinput-label',
    ]);

    const handleOnFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        onFocus?.(e);
      },
      [onFocus],
    );

    const handleOnBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(e);
        setFocused(false);
      },
      [onBlur],
    );

    const handleNodePress = useCallback(() => {
      setFocused(true);
      internalRef.current?.focus();
    }, [setFocused, internalRef]);

    // Define a distinct read-only style to differentiate it from the disabled style.
    const readOnlyInputBackground = useMemo(() => {
      if (!disabled && htmlInputElmProps.readOnly) {
        return 'bgSecondary';
      }
      return undefined;
    }, [disabled, htmlInputElmProps.readOnly]);

    const hasLabel = useMemo(() => !!label || !!labelNode, [label, labelNode]);

    const inputElement = useMemo(() => {
      /** Ensures that the renderedInput has the blurring, focusing, disabled features */
      if (inputNode) {
        const clonedElm = cloneElement(inputNode, {
          onFocus: handleOnFocus,
          onBlur: handleOnBlur,
          ref: refs,
          'aria-describedby': shouldSetHelperTextId && helperTextId,
          'aria-invalid': variant === 'negative',
          id: shouldSetLabelId ? labelId : undefined,
          disabled,
        });

        return clonedElm;
      }

      // By default, it will use the NativeInput
      return (
        <NativeInput
          ref={refs}
          accessibilityHint={shouldSetHelperTextId ? helperTextId : undefined}
          accessibilityLabel={accessibilityLabel ?? label}
          align={align}
          aria-invalid={variant === 'negative'}
          compact={compact}
          containerSpacing={nativeInputContainerCss}
          data-compact={compact}
          data-labelvariant={compact || !hasLabel ? 'outside' : labelVariant}
          data-start={!!start || compact}
          disabled={disabled}
          id={shouldSetLabelId ? labelId : undefined}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          testID={testID}
          {...htmlInputElmProps}
        />
      );
    }, [
      inputNode,
      refs,
      shouldSetHelperTextId,
      helperTextId,
      accessibilityLabel,
      label,
      hasLabel,
      align,
      variant,
      compact,
      labelVariant,
      start,
      disabled,
      shouldSetLabelId,
      labelId,
      handleOnBlur,
      handleOnFocus,
      testID,
      htmlInputElmProps,
    ]);

    return (
      <TextInputFocusVariantContext.Provider value={focused ? focusedVariant : undefined}>
        <InputStack
          borderRadius={borderRadius}
          borderWidth={bordered ? 100 : 0}
          // If bordered is true, we want disableFocusedStyle = false
          // If bordered is false, we want disableFocusedStyle = true
          disableFocusedStyle={!bordered}
          disabled={disabled}
          enableColorSurge={enableColorSurge}
          endNode={
            (suffix !== '' || !!end) && (
              <HStack
                alignItems="center"
                background={readOnlyInputBackground}
                gap={2}
                justifyContent="center"
                onClick={handleNodePress}
                testID={testIDMap?.end ?? ''}
              >
                {suffix !== '' && (
                  <Text as="p" color="fgMuted" display="block" font="label1" paddingEnd={2}>
                    {suffix}
                  </Text>
                )}
                {!!end && <>{end}</>}
              </HStack>
            )
          }
          focused={focused}
          height={height}
          helperTextNode={
            !!helperText &&
            (typeof helperText === 'string' ? (
              <HelperText
                accessibilityLabel={helperText}
                color={variantColorMap[variant]}
                errorIconAccessibilityLabel={helperTextErrorIconAccessibilityLabel}
                errorIconTestID={`${testIDMap?.helperText}-error-icon`}
                id={shouldSetHelperTextId ? helperTextId : undefined}
                testID={testIDMap?.helperText ?? ''}
                textAlign={align}
              >
                {helperText}
              </HelperText>
            ) : (
              helperText
            ))
          }
          inputBackground={readOnlyInputBackground ?? inputBackground}
          inputNode={inputElement}
          labelNode={
            !compact &&
            (labelNode ? (
              labelVariant === 'inside' ? (
                <Box
                  background={readOnlyInputBackground}
                  paddingEnd={2}
                  paddingStart={start ? 0.5 : 2}
                  paddingTop={1}
                >
                  {labelNode}
                </Box>
              ) : (
                labelNode
              )
            ) : (
              !!label && (
                <InputLabel
                  background={labelVariant === 'inside' ? readOnlyInputBackground : undefined}
                  className={cx(
                    labelVariant === 'inside' && insideLabelCss,
                    labelVariant === 'inside' && !!start && insideLabelCssStartCss,
                  )}
                  htmlFor={shouldSetLabelId ? labelId : undefined}
                  testID={testIDMap?.label ?? ''}
                >
                  {label}
                </InputLabel>
              )
            ))
          }
          labelVariant={labelVariant}
          startNode={
            (compact || !!start) && (
              <HStack
                alignItems="center"
                background={readOnlyInputBackground}
                gap={2}
                justifyContent="center"
                onClick={handleNodePress}
                paddingStart={compact && hasLabel ? 2 : undefined}
                testID={testIDMap?.start ?? ''}
              >
                {compact &&
                  (labelNode
                    ? labelNode
                    : !!label && (
                        <InputLabel htmlFor={shouldSetLabelId ? labelId : undefined}>
                          {label}
                        </InputLabel>
                      ))}
                {!!start && <>{start}</>}
              </HStack>
            )
          }
          variant={variant}
          width={width}
        />
      </TextInputFocusVariantContext.Provider>
    );
  }),
);
