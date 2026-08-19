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
import { useInputVariant } from '@coinbase/cds-common/hooks/useInputVariant';
import { usePrefixedId } from '@coinbase/cds-common/hooks/usePrefixedId';
import type { InputVariant, SharedInputProps } from '@coinbase/cds-common/types/InputBaseProps';
import { mergeReactElementRef, mergeRefs } from '@coinbase/cds-common/utils/mergeRefs';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { Text } from '../typography/Text';

import { TextInputFocusVariantContext } from './context';
import { HelperText } from './HelperText';
import { InputLabel } from './InputLabel';
import type { InputStackBaseProps } from './InputStack';
import { InputStack } from './InputStack';
import { NativeInput, type NativeInputBaseProps, type NativeInputProps } from './NativeInput';

/**
 * Horizontal padding is size-invariant: 2 (16px) at every size. Only vertical padding
 * varies with size — 2 (16px) at `l`, 1.5 (12px) at `m`, 1 (8px) at `s`.
 * If labelVariant is 'inside' and stacked, the input yields its top padding to the label
 * and keeps 0.75 (6px) at the bottom to match the label's top padding.
 * When an inline label precedes the input, the gap between them is 1 (8px).
 * When a start node precedes the input, the gap contributed here is 0.5 (4px); the start
 * node supplies the rest of the spacing (e.g. InputIcon's own paddingX).
 */
const nativeInputContainerCss = css`
  padding-top: var(--space-2);
  padding-bottom: var(--space-2);
  padding-inline-start: var(--space-2);
  padding-inline-end: var(--space-2);

  &[data-size='m'] {
    padding-top: var(--space-1_5);
    padding-bottom: var(--space-1_5);
  }

  &[data-size='s'] {
    padding-top: var(--space-1);
    padding-bottom: var(--space-1);
  }

  &[data-labelvariant='inside'] {
    padding-top: 0;
    padding-bottom: var(--space-0_75);
  }

  &[data-inlinelabel='true'] {
    padding-inline-start: var(--space-1);
  }

  /* Declared last so a start node wins when it sits between an inline label and the input. */
  &[data-start='true'] {
    padding-inline-start: var(--space-0_5);
  }
`;

const insideLabelCss = css`
  padding-top: var(--space-0_75);
  padding-bottom: 0;
  padding-inline-start: var(--space-2);
  padding-inline-end: var(--space-2);
`;

const insideLabelCssStartCss = css`
  padding-inline-start: var(--space-0_5);
`;

export type TextInputSize = 's' | 'm' | 'l';

const defaultTextInputSize: TextInputSize = 'l';

export type TextInputBaseProps = Omit<NativeInputBaseProps, 'caretColor' | 'compact'> &
  Pick<
    SharedInputProps,
    'label' | 'labelFont' | 'labelColor' | 'placeholder' | 'helperText' | 'readOnly'
  > &
  Pick<
    InputStackBaseProps,
    | 'height'
    | 'variant'
    | 'width'
    | 'disabled'
    | 'borderRadius'
    | 'enableColorSurge'
    | 'inputBackground'
  > & {
    /**
     * Customize the element which the input area will be rendered as.
     * Adds ability to render the input area as a `<textarea />`, `<input />` etc...
     * By default, TextInput renders an `<input />`.
     * @danger Use this at your own risk, and don't use unless ABSOLUTELY NECESSARY. You may see weird UI when focusing etc..
     * Our default input handles all of the UI/Accessibility needs for your out of the box, but inputNode will not include
     * those.
     *
     * If you need a ref to the underlying input element, prefer using `ref` on the `TextInput` component.
     * Supplying a `ref` on the `inputNode` element is redundant; if present, it will be merged with the component's ref.
     * */
    inputNode?: React.ReactElement;
    /**
     * Controls overall density of the input field, inside of the border.
     * @default 'l'
     */
    size?: TextInputSize;
    /**
     * Enables compact variation. Prefer `size="s"` or `size="m"` with an explicit `labelVariant`.
     *
     * @deprecated Unset and use `size="s"` instead. This will be removed in a future major release.
     * @deprecationExpectedRemoval v11
     */
    compact?: boolean;
    /**
     * Determines where the provided label/labelNode is rendered.
     * By default, the label is rendered outisde, above the input element.
     * When size is `l` (the default), an `inside` label is stacked vertically with the input; otherwise is rendered horizontally.
     * @default 'outside'
     */
    labelVariant?: InputStackBaseProps['labelVariant'];
    /**
     * Adds border to input.
     * When set to `false`, focus border styling is disabled by default.
     * @default true
     */
    bordered?: boolean;
    /**
     * Additional border width when focused.
     * Set this when `bordered={false}` to opt into a focus border style.
     */
    focusedBorderWidth?: InputStackBaseProps['focusedBorderWidth'];
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
  Omit<NativeInputProps, 'caretColor' | 'compact' | 'size'>;

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'fgPrimary',
  positive: 'fgPositive',
  negative: 'fgNegative',
  foreground: 'fg',
  foregroundMuted: 'fgMuted',
  secondary: 'fg',
};

export const TextInput = memo(
  forwardRef(function TextInput(_props: TextInputProps, ref: React.ForwardedRef<HTMLInputElement>) {
    const mergedProps = useComponentConfig('TextInput', _props);
    const {
      label,
      labelFont = 'label1',
      labelColor = 'fg',
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
      font = 'body',
      compact = false,
      size,
      suffix = '',
      onFocus,
      onBlur,
      borderRadius = 200,
      height,
      inputNode,
      bordered = true,
      focusedBorderWidth,
      enableColorSurge = false,
      helperTextErrorIconAccessibilityLabel = 'error',
      labelVariant = 'outside',
      labelNode,
      inputBackground,
      ...nativeInputRestProps
    } = mergedProps;
    const [focused, setFocused] = useState(false);
    const focusedVariant = useInputVariant(focused, variant);
    const internalRef = useRef<HTMLInputElement | null>(null);
    const refs = useMemo(() => mergeRefs(ref, internalRef), [ref]);

    // Only generate a helperTextId if helperText is defined, otherwise
    // set it to undefined
    const shouldSetHelperTextId = useMemo(() => helperText !== '', [helperText]);
    const shouldSetLabelId = label !== undefined;
    const [helperTextId, labelId] = usePrefixedId([
      'cds-textinput-description',
      'cds-textinput-label',
    ]);

    // Native browser behavior adjusts the value of numeric inputs when the user is focused on the input
    // and scrolls the page. This prevents that behavior so accidental values changes don't occur.
    const preventWheelScroll = useCallback((event: WheelEvent) => {
      event.preventDefault();
    }, []);

    const handleOnFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        onFocus?.(e);
        internalRef.current?.addEventListener('wheel', preventWheelScroll);
      },
      [onFocus, internalRef, preventWheelScroll],
    );

    const handleOnBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(e);
        setFocused(false);
        internalRef.current?.removeEventListener('wheel', preventWheelScroll);
      },
      [onBlur, preventWheelScroll],
    );

    const handleNodePress = useCallback(() => {
      setFocused(true);
      internalRef.current?.focus();
    }, [setFocused, internalRef]);

    // Define a distinct read-only style to differentiate it from the disabled style.
    const readOnlyInputBackground = useMemo(() => {
      if (!disabled && nativeInputRestProps.readOnly) {
        return 'bgSecondary';
      }
      return undefined;
    }, [disabled, nativeInputRestProps.readOnly]);

    const hasLabel = useMemo(() => !!label || !!labelNode, [label, labelNode]);

    // Geometry is driven entirely by the resolved size. An explicit `size` always wins;
    // the deprecated `compact` only maps to `s` as a fallback so legacy callers keep dense spacing.
    const resolvedSize: TextInputSize = size ?? (compact ? 's' : defaultTextInputSize);
    // compact only forces label placement (inline start slot) when the caller did NOT set an
    // explicit size. Once `size` is provided, label placement follows normal `labelVariant` rules.
    const isCompactLabel = Boolean(compact) && size === undefined;

    // Label placement is independent of size. `compact` (set alone) forces an inside label;
    // otherwise placement follows `labelVariant`. An inside label sits horizontally in the start
    // slot at every size EXCEPT `l`, where it stacks vertically above the input.
    const wantsInsideLabel = hasLabel && (isCompactLabel || labelVariant === 'inside');
    const insideVerticalLabel = wantsInsideLabel && !isCompactLabel && resolvedSize === 'l';
    const insideHorizontalLabel = wantsInsideLabel && !insideVerticalLabel;

    const inputElement = useMemo(() => {
      /** Ensures that the renderedInput has the blurring, focusing, disabled features */
      if (inputNode) {
        const clonedElm = cloneElement(
          inputNode as React.ReactElement<
            React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>
          >,

          {
            onFocus: handleOnFocus,
            onBlur: handleOnBlur,
            ref: mergeReactElementRef<HTMLInputElement>(inputNode, refs),
            'aria-describedby': shouldSetHelperTextId ? helperTextId : undefined,
            'aria-invalid': variant === 'negative',
            id: shouldSetLabelId ? labelId : undefined,
            disabled,
          },
        );

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
          caretColor={variantColorMap[focusedVariant]}
          compact={resolvedSize === 's'}
          containerSpacing={nativeInputContainerCss}
          data-compact={compact}
          data-inlinelabel={insideHorizontalLabel}
          data-labelvariant={insideVerticalLabel ? 'inside' : 'outside'}
          data-size={resolvedSize}
          data-start={!!start}
          disabled={disabled}
          font={font}
          id={shouldSetLabelId ? labelId : undefined}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          testID={testID}
          {...nativeInputRestProps}
        />
      );
    }, [
      inputNode,
      refs,
      shouldSetHelperTextId,
      helperTextId,
      accessibilityLabel,
      label,
      align,
      variant,
      focusedVariant,
      compact,
      resolvedSize,
      insideVerticalLabel,
      insideHorizontalLabel,
      start,
      disabled,
      font,
      shouldSetLabelId,
      labelId,
      handleOnBlur,
      handleOnFocus,
      testID,
      nativeInputRestProps,
    ]);

    return (
      <TextInputFocusVariantContext.Provider value={focused ? focusedVariant : undefined}>
        <InputStack
          borderRadius={borderRadius}
          borderWidth={bordered ? 100 : 0}
          disableFocusedStyle={!bordered && typeof focusedBorderWidth === 'undefined'}
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
          focusedBorderWidth={focusedBorderWidth}
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
            !insideHorizontalLabel &&
            (labelNode ? (
              insideVerticalLabel ? (
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
                  background={insideVerticalLabel ? readOnlyInputBackground : undefined}
                  className={cx(
                    insideVerticalLabel && insideLabelCss,
                    insideVerticalLabel && !!start && insideLabelCssStartCss,
                  )}
                  color={labelColor}
                  font={labelFont}
                  htmlFor={shouldSetLabelId ? labelId : undefined}
                  testID={testIDMap?.label ?? ''}
                >
                  {label}
                </InputLabel>
              )
            ))
          }
          labelVariant={insideVerticalLabel ? 'inside' : 'outside'}
          startNode={
            (insideHorizontalLabel || !!start) && (
              <HStack
                alignItems="center"
                background={readOnlyInputBackground}
                gap={2}
                justifyContent="center"
                onClick={handleNodePress}
                paddingStart={insideHorizontalLabel && hasLabel ? 2 : undefined}
                testID={testIDMap?.start ?? ''}
              >
                {insideHorizontalLabel &&
                  (labelNode
                    ? labelNode
                    : !!label && (
                        <InputLabel
                          color={labelColor}
                          font={labelFont}
                          htmlFor={shouldSetLabelId ? labelId : undefined}
                        >
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
