import { forwardRef, memo, useImperativeHandle, useMemo } from 'react';
import { css } from '@linaria/core';
import { m } from 'framer-motion';

import { cx } from '../../cx';
import { useHasMounted } from '../../hooks/useHasMounted';

import { DefaultNumberTickerDigit } from './DefaultNumberTickerDigit';
import { DefaultNumberTickerSymbol } from './DefaultNumberTickerSymbol';
import type {
  NumberTickerNumberSectionComponent,
  NumberTickerNumberSectionProps,
} from './NumberTicker';

const containerCss = css`
  display: inline-flex;
  align-items: center;
`;

const isDigit = (char: string) => /^\d$/.test(char);
const subscripts = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
const isSubscript = (char: string) => subscripts.includes(char);

export const DefaultNumberTickerNumberSection: NumberTickerNumberSectionComponent = memo(
  forwardRef<HTMLSpanElement, NumberTickerNumberSectionProps>(
    (
      {
        intlNumberParts,
        justify = 'flex-start',
        style,
        className,
        NumberDigitComponent = DefaultNumberTickerDigit,
        NumberSymbolComponent = DefaultNumberTickerSymbol,
        formattedValue,
        transitionConfig,
        ...props
      },
      ref,
    ) => {
      const hasMounted = useHasMounted();

      const containerStyle = useMemo(
        () => ({ justifyContent: justify, ...style }),
        [justify, style],
      );

      const intlPartsDigits = useMemo(
        () =>
          intlNumberParts.map((part) =>
            (part.type !== 'integer' && part.type !== 'fraction') ||
            typeof part.value !== 'number' ? (
              <NumberSymbolComponent
                key={part.type === 'literal' ? `${part.key}:${part.value}` : part.key}
                justify={justify}
                type={part.type}
                value={String(part.value)}
              />
            ) : (
              <NumberDigitComponent
                key={part.key}
                initialValue={hasMounted ? 0 : undefined}
                transitionConfig={transitionConfig}
                value={part.value}
              />
            ),
          ),
        [
          intlNumberParts,
          hasMounted,
          justify,
          NumberDigitComponent,
          NumberSymbolComponent,
          transitionConfig,
        ],
      );

      const formattedValueDigits = useMemo(
        () =>
          formattedValue
            ?.split('')
            .map((char, index) =>
              isDigit(char) ? (
                <NumberDigitComponent
                  key={index}
                  initialValue={hasMounted ? 0 : undefined}
                  transitionConfig={transitionConfig}
                  value={parseInt(char)}
                />
              ) : (
                <NumberSymbolComponent
                  key={index}
                  justify={justify}
                  type={isSubscript(char) ? 'subscript' : 'literal'}
                  value={char}
                />
              ),
            ),
        [
          NumberDigitComponent,
          NumberSymbolComponent,
          formattedValue,
          hasMounted,
          justify,
          transitionConfig,
        ],
      );

      return (
        <m.span ref={ref} className={cx(containerCss, className)} style={containerStyle} {...props}>
          {formattedValue ? formattedValueDigits : intlPartsDigits}
        </m.span>
      );
    },
  ),
);
