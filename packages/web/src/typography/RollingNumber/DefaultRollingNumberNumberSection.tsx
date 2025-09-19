import { forwardRef, memo, useImperativeHandle, useMemo } from 'react';
import { css } from '@linaria/core';
import { m } from 'framer-motion';

import { cx } from '../../cx';
import { useHasMounted } from '../../hooks/useHasMounted';

import { DefaultRollingNumberDigit } from './DefaultRollingNumberDigit';
import { DefaultRollingNumberMask } from './DefaultRollingNumberMask';
import { DefaultRollingNumberSymbol } from './DefaultRollingNumberSymbol';
import type {
  RollingNumberNumberSectionComponent,
  RollingNumberNumberSectionProps,
} from './RollingNumber';

const containerCss = css`
  display: inline-flex;
  align-items: center;
`;

const isDigit = (char: string) => /^\d$/.test(char);

export const DefaultRollingNumberNumberSection: RollingNumberNumberSectionComponent = memo(
  forwardRef<HTMLSpanElement, RollingNumberNumberSectionProps>(
    (
      {
        intlNumberParts,
        justify = 'flex-start',
        style,
        className,
        RollingNumberDigitComponent = DefaultRollingNumberDigit,
        RollingNumberSymbolComponent = DefaultRollingNumberSymbol,
        RollingNumberMaskComponent = DefaultRollingNumberMask,
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
              <RollingNumberSymbolComponent
                key={part.type === 'literal' ? `${part.key}:${part.value}` : part.key}
                justify={justify}
                value={String(part.value)}
              />
            ) : (
              <RollingNumberDigitComponent
                key={part.key}
                RollingNumberMaskComponent={RollingNumberMaskComponent}
                initialValue={hasMounted ? 0 : undefined}
                transitionConfig={transitionConfig}
                value={part.value}
              />
            ),
          ),
        [
          intlNumberParts,
          RollingNumberSymbolComponent,
          justify,
          RollingNumberDigitComponent,
          hasMounted,
          transitionConfig,
          RollingNumberMaskComponent,
        ],
      );

      const formattedValueDigits = useMemo(
        () =>
          formattedValue
            ?.split('')
            .map((char, index) =>
              isDigit(char) ? (
                <RollingNumberDigitComponent
                  key={index}
                  RollingNumberMaskComponent={RollingNumberMaskComponent}
                  initialValue={hasMounted ? 0 : undefined}
                  transitionConfig={transitionConfig}
                  value={parseInt(char)}
                />
              ) : (
                <RollingNumberSymbolComponent key={index} justify={justify} value={char} />
              ),
            ),
        [
          RollingNumberDigitComponent,
          RollingNumberSymbolComponent,
          formattedValue,
          hasMounted,
          justify,
          RollingNumberMaskComponent,
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
