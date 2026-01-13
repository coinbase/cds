import React, { forwardRef, memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { durations } from '@coinbase/cds-common/motion/tokens';
import { inputStackGap } from '@coinbase/cds-common/tokens/input';
import { accessibleOpacityDisabled } from '@coinbase/cds-common/tokens/interactable';
import type { InputVariant } from '@coinbase/cds-common/types/InputBaseProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { type BoxBaseProps, type BoxDefaultElement, type BoxProps } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { ColorSurge } from '../motion/ColorSurge';
import { Interactable, type InteractableBaseProps } from '../system/Interactable';

import { InputLabel } from './InputLabel';

const baseCss = css`
  /* This is a workaround to avoid the styles being overridden by interactable base styles */

  && {
    flex-direction: row;
    display: flex;
    min-width: 0;
    flex-grow: 2;
    /* stylelint-disable plugin/no-low-performance-animation-properties */
    transition: box-shadow ${durations.moderate1}ms ease-in-out;
    /* stylelint-enable plugin/no-low-performance-animation-properties */
    overflow: hidden;
    border-color: var(--border-color-unfocused);
  }

  /* When input is disabled, opacity 0.5 was applied twice. One time on the root VStack, and second time in interactable. As a result, it was not a11y compliant. To resolve this issue, i had to put an opacity of 1 override in the interactable element. */
  &&:disabled,
  &&[aria-disabled='true'],
  &&:hover {
    border-color: var(--border-color-unfocused);
    opacity: 1;
  }

  &&:focus-within {
    border-color: var(--border-color-focused);
    box-shadow: 0 0 0 var(--border-width-focused) var(--border-color-focused);
  }
`;

// Fixes a problem found in Accordion children element.
// When `overflow: auto` is set the thickened border when focused is not accounted for
// hence you see a cutoff.
// Fix was to add this so there is always 2px outer layer space
const inputAreaContainerCss = css`
  padding: 1px;
  width: 100%;
`;

/** this should only be used as a last resort, when focus styles need to be persisted. eg: when a Select PopoverMenu is opened */
const persistedFocusCss = css`
  border-color: var(--border-color-focused);
  box-shadow: 0 0 0 var(--border-width-focused) var(--border-color-focused);
`;

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'bgPrimary',
  positive: 'bgPositive',
  negative: 'bgNegative',
  foreground: 'bgInverse',
  foregroundMuted: 'bgLineHeavy',
  secondary: 'bgSecondary',
};

export type InputStackBaseProps = SharedProps &
  Pick<InteractableBaseProps, 'blendStyles'> & {
    /** Width of the border.
     * @default 100
     */
    borderWidth?: ThemeVars.BorderWidth;
    /**
     * Additional border width when focused.
     * @default borderWidth
     */
    focusedBorderWidth?: ThemeVars.BorderWidth;
    /**
     * Determines the sentiment of the input. Because
     * we allow startContent and endContent to be custom ReactNode,
     * the content placed inside these slots will not change colors according
     * to the variant. You will have to add that yourself
     * @default foregroundMuted
     */
    variant?: InputVariant;
    /**
     * Width of input as a percentage string.
     * @default 100%
     * */
    width?: BoxBaseProps['width'];
    /**
     * Height of input
     */
    height?: BoxBaseProps['height'];
    /**
     * Toggles input interactability and opacity
     * @default false
     */
    disabled?: boolean;
    /** Prepends custom content to the start. Content is not part of input */
    prependNode?: React.ReactNode;
    /** Adds content to the start of the inner input. Refer to diagram for location of startNode in InputStack component */
    startNode?: React.ReactNode;
    /** Appends custom content to the end. Content is not part of input */
    appendNode?: React.ReactNode;
    /** Adds content to the end of the inner input. Refer to diagram for location of endNode in InputStack component */
    endNode?: React.ReactNode;
    /** Editable area of the Input */
    inputNode: React.ReactNode;
    /** Text shown below input. Used for when label is not enough to indicate what this input does */
    helperTextNode?: React.ReactNode;
    /** A message indicating the purpose of this input */
    labelNode?: React.ReactNode;
    /** This should only be used when focused styles need to be persisted */
    focused?: boolean;
    /**
     * Leverage one of the borderRadius styles we offer to round the corners of the input.
     * @default 200
     */
    borderRadius?: BoxBaseProps['borderRadius'];
    /**
     * Disable default focus styles
     */
    disableFocusedStyle?: boolean;
    /**
     * Enable Color Surge motion
     */
    enableColorSurge?: boolean;
    /**
     * The variant of the label. Only used when compact is not true.
     * @default 'outside'
     */
    labelVariant?: 'inside' | 'outside';
    /**
     * Background color of the input.
     * @default 'bg'
     */
    inputBackground?: ThemeVars.Color;
  };

export type InputStackProps = Omit<
  BoxProps<BoxDefaultElement>,
  'width' | 'height' | 'borderRadius'
> &
  InputStackBaseProps;

export const InputStack = memo(
  forwardRef<HTMLElement, InputStackProps>(
    (
      {
        width = '100%',
        prependNode,
        endNode,
        appendNode,
        startNode,
        disabled = false,
        inputNode,
        helperTextNode,
        borderWidth = 100,
        focusedBorderWidth = borderWidth,
        variant = 'foregroundMuted',
        labelNode,
        testID = '',
        focused = false,
        borderRadius = 200,
        height,
        disableFocusedStyle,
        enableColorSurge,
        labelVariant = 'outside',
        blendStyles,
        inputBackground = 'bg',
        ...props
      },
      ref,
    ) => {
      const focusedVariant = useMemo(
        () => (focused && variant !== 'positive' && variant !== 'negative' ? 'primary' : variant),
        [focused, variant],
      );

      const inputBorderRadius = useMemo(() => {
        return {
          ...(prependNode
            ? {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }
            : {}),
          ...(appendNode
            ? {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }
            : {}),
        };
      }, [prependNode, appendNode]);

      const borderColorFocused = useMemo(() => {
        if (disableFocusedStyle) {
          return 'transparent';
        }

        if (variant === 'positive' || variant === 'negative') {
          return `var(--color-${variantColorMap[variant]})`;
        }

        // all variants except for positive/negative receive the primary focus color
        return 'var(--color-bgPrimary)';
      }, [disableFocusedStyle, variant]);

      const borderColorUnfocused = useMemo(() => {
        if (variant === 'secondary') {
          return 'transparent';
        }

        return `var(--color-${variantColorMap[variant]})`;
      }, [variant]);

      const inputAreaStyles = useMemo(() => {
        return {
          '--border-color-unfocused': borderColorUnfocused,
          '--border-color-focused': borderColorFocused,
          '--border-width-focused': `var(--borderWidth-${focusedBorderWidth})`,
          ...inputBorderRadius,
        };
      }, [borderColorUnfocused, borderColorFocused, focusedBorderWidth, inputBorderRadius]);

      return (
        <VStack
          gap={inputStackGap}
          opacity={disabled ? accessibleOpacityDisabled : 1}
          testID={testID}
          width={width}
          {...props}
        >
          {!!labelNode &&
            labelVariant === 'outside' &&
            (typeof labelNode === 'string' ? <InputLabel>{labelNode}</InputLabel> : labelNode)}
          <HStack>
            {!!prependNode && <>{prependNode}</>}
            <div className={inputAreaContainerCss}>
              <Interactable
                ref={ref}
                as="span"
                background={variant === 'secondary' ? 'bgSecondary' : inputBackground}
                blendStyles={blendStyles}
                borderRadius={borderRadius}
                borderWidth={borderWidth}
                className={cx(baseCss, focused && persistedFocusCss)}
                disabled={disabled}
                height={height}
                style={inputAreaStyles}
                testID="input-interactable-area"
              >
                {!!focused && !!enableColorSurge && (
                  <ColorSurge background={variantColorMap[focusedVariant]} />
                )}
                {!!startNode && <>{startNode}</>}
                {!!labelNode && labelVariant === 'inside' ? (
                  <VStack flexGrow={1}>
                    {labelNode}
                    {inputNode}
                  </VStack>
                ) : (
                  inputNode
                )}
                {!!endNode && <>{endNode}</>}
              </Interactable>
            </div>
            {!!appendNode && <>{appendNode}</>}
          </HStack>
          {!!helperTextNode && <>{helperTextNode}</>}
        </VStack>
      );
    },
  ),
);
