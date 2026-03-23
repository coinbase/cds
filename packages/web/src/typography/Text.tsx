import React, { forwardRef, memo, useMemo } from 'react';
import { accessibleOpacityDisabled } from '@coinbase/cds-common/tokens/interactable';
import { css } from '@linaria/core';

import type { Polymorphic } from '../core/polymorphism';
import { cx } from '../cx';
import { Box, type BoxBaseProps } from '../layout/Box';

const baseCss = css`
  margin: 0;
  text-transform: var(--text-textTransform);
`;

const monoCss = css`
  font-family: var(--text-fontFamilyMono);
`;

const numberOfLinesCss = css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--text-numberOfLines);
  overflow: hidden;
`;

const disabledCss = css`
  opacity: ${accessibleOpacityDisabled};
  cursor: default;
  pointer-events: none;
  touch-action: none;
`;

const tabularNumbersCss = css`
  font-variant-numeric: tabular-nums;
`;

const slashedZeroCss = css`
  font-variant-numeric: slashed-zero;
`;

const noWrapCss = css`
  white-space: nowrap;
`;

const overflowCss = {
  truncate: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  clip: css`
    overflow-wrap: break-word;
    text-overflow: clip;
  `,
  wrap: css`
    white-space: normal;
    overflow-wrap: break-word;
  `,
  break: css`
    /**
     * Fallback for mobile safari on iOS < 15.4
     * @link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap#browser_compatibility 
     */
    @supports not (overflow-wrap: anywhere) {
      word-break: break-word;
      overflow-wrap: break-word;
    }

    /* Desktop solution */
    overflow-wrap: anywhere;
  `,
} as const;

export const textDefaultElement = 'span';

export type TextDefaultElement = typeof textDefaultElement;

export type TextBaseProps = Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    numberOfLines?: number;
    disabled?: boolean;
    /**
     * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
     * @default false
     */
    tabularNumbers?: boolean;
    /**
     * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
     * @default false
     */
    slashedZero?: boolean;
    /**
     * Set text decoration to underline.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
     * @default false
     */
    underline?: boolean;
    /**
     * Use monospace font family.
     */
    mono?: boolean;
    /**
     * Set text to be in a single line.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
     * @default false
     */
    noWrap?: boolean;
    /**
     * Set overflow behavior.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
     */
    overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: string;
    /**
     * @deprecated Do not use this prop, it is a migration escape hatch. This will be removed in a future major release.
     * @deprecationExpectedRemoval v9
     */
    renderEmptyNode?: boolean;
  }
>;

export type TextProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  TextBaseProps
>;

type TextComponent = (<AsComponent extends React.ElementType = TextDefaultElement>(
  props: TextProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const Text: TextComponent = memo(
  forwardRef<React.ReactElement<TextBaseProps>, TextBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        font = 'inherit',
        fontFamily = font,
        color = 'fg',
        display = 'inline',
        textAlign = 'start',
        numberOfLines,
        style,
        className,
        disabled,
        dangerouslySetColor,
        tabularNumbers,
        slashedZero,
        underline,
        mono,
        noWrap,
        overflow,
        textDecoration = underline ? 'underline' : 'none',
        textTransform,
        children,
        renderEmptyNode = true,
        ...props
      }: TextProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? textDefaultElement) satisfies React.ElementType;
      const textStyle = useMemo(
        () => ({
          color: dangerouslySetColor,
          '--text-numberOfLines': numberOfLines,
          '--text-textTransform': textTransform ?? `var(--textTransform-${fontFamily})`,
          '--text-fontFamilyMono': mono && `var(--fontFamilyMono-${fontFamily})`,
          ...style,
        }),
        [dangerouslySetColor, numberOfLines, textTransform, mono, fontFamily, style],
      );

      if (
        !renderEmptyNode &&
        (children === null || children === undefined || children === '' || Number.isNaN(children))
      )
        return null;

      return (
        <Box
          ref={ref}
          as={Component}
          className={cx(
            baseCss,
            numberOfLines && numberOfLinesCss,
            disabled && disabledCss,
            mono && monoCss,
            tabularNumbers && tabularNumbersCss,
            slashedZero && slashedZeroCss,
            noWrap && noWrapCss,
            overflow && overflowCss[overflow],
            className,
          )}
          color={color}
          display={display}
          font={font}
          fontFamily={fontFamily}
          style={textStyle}
          textAlign={textAlign}
          textDecoration={textDecoration}
          {...props}
        >
          {children}
        </Box>
      );
    },
  ),
);

Text.displayName = 'Text';
