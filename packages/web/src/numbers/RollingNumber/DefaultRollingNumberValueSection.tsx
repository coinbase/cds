import { forwardRef, memo, useMemo } from 'react';
import { css } from '@linaria/core';
import { m } from 'framer-motion';

import { cx } from '../../cx';
import { useHasMounted } from '../../hooks/useHasMounted';
import { Text } from '../../typography/Text';

import { DefaultRollingNumberDigit } from './DefaultRollingNumberDigit';
import { DefaultRollingNumberMask } from './DefaultRollingNumberMask';
import { DefaultRollingNumberSymbol } from './DefaultRollingNumberSymbol';
import type {
  RollingNumberValueSectionComponent,
  RollingNumberValueSectionProps,
} from './RollingNumber';

const MotionText = m(Text);

const containerCss = css`
  display: inline-flex;
  align-items: center;
`;

const isDigit = (char: string) => /^\d$/.test(char);

export const DefaultRollingNumberValueSection: RollingNumberValueSectionComponent = memo(
  forwardRef<HTMLSpanElement, RollingNumberValueSectionProps>(
    (
      {
        intlNumberParts,
        color = 'inherit',
        justifyContent = 'flex-start',
        className,
        RollingNumberDigitComponent = DefaultRollingNumberDigit,
        RollingNumberSymbolComponent = DefaultRollingNumberSymbol,
        RollingNumberMaskComponent = DefaultRollingNumberMask,
        formattedValue,
        transitionConfig,
        styles,
        classNames,
        style,
        ...props
      },
      ref,
    ) => {
      const hasMounted = useHasMounted();

      const intlPartsDigits = useMemo(
        () =>
          intlNumberParts.map((part) =>
            (part.type !== 'integer' && part.type !== 'fraction') ||
            typeof part.value !== 'number' ? (
              <RollingNumberSymbolComponent
                key={part.type === 'literal' ? `${part.key}:${part.value}` : part.key}
                classNames={{ text: classNames?.text }}
                justifyContent={justifyContent}
                styles={{ text: styles?.text }}
                value={String(part.value)}
              />
            ) : (
              <RollingNumberDigitComponent
                key={part.key}
                RollingNumberMaskComponent={RollingNumberMaskComponent}
                classNames={{ text: classNames?.text }}
                initialValue={hasMounted ? 0 : undefined}
                styles={{ text: styles?.text }}
                transitionConfig={transitionConfig}
                value={part.value}
              />
            ),
          ),
        [
          intlNumberParts,
          RollingNumberSymbolComponent,
          justifyContent,
          RollingNumberDigitComponent,
          hasMounted,
          transitionConfig,
          RollingNumberMaskComponent,
          styles?.text,
          classNames?.text,
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
                  classNames={{ text: classNames?.text }}
                  initialValue={hasMounted ? 0 : undefined}
                  styles={{ text: styles?.text }}
                  transitionConfig={transitionConfig}
                  value={parseInt(char)}
                />
              ) : (
                <RollingNumberSymbolComponent
                  key={index}
                  classNames={{ text: classNames?.text }}
                  justifyContent={justifyContent}
                  styles={{ text: styles?.text }}
                  value={char}
                />
              ),
            ),
        [
          RollingNumberDigitComponent,
          RollingNumberSymbolComponent,
          formattedValue,
          hasMounted,
          justifyContent,
          RollingNumberMaskComponent,
          transitionConfig,
          styles?.text,
          classNames?.text,
        ],
      );

      return (
        <MotionText
          ref={ref}
          className={cx(containerCss, className, classNames?.root, classNames?.text)}
          color={color}
          justifyContent={justifyContent}
          style={{ ...style, ...styles?.root, ...styles?.text }}
          {...props}
        >
          {formattedValue ? formattedValueDigits : intlPartsDigits}
        </MotionText>
      );
    },
  ),
);
