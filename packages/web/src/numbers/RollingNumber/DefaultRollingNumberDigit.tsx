import { forwardRef, memo, useCallback, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import { getWidthInEm } from '@coinbase/cds-common';
import { css } from '@linaria/core';
import { animate, m, type ValueAnimationOptions } from 'framer-motion';

import { cx } from '../../cx';
import { Text } from '../../typography/Text';

import { DefaultRollingNumberMask } from './DefaultRollingNumberMask';
import {
  defaultTransitionConfig,
  type RollingNumberDigitComponent,
  type RollingNumberDigitProps,
} from './RollingNumber';

const MotionText = m(Text);

const digitContainerCss = css`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const digitNonActiveCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 100%;
  pointer-events: none;
  left: 0;
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const topNonActiveCss = css`
  bottom: 100%;
`;

const bottomNonActiveCss = css`
  top: 100%;
`;

const digitSpanCss = css`
  display: inline-block;
  color: inherit;
`;

/**
 * Note that the DefaultRollingNumberDigit component implementation is different in web
 * and mobile due to different animation libraries and the performance issue in mobile.
 * This has nearly unnoticeable difference in animation effect.
 *  */
export const DefaultRollingNumberDigit: RollingNumberDigitComponent = memo(
  forwardRef<HTMLSpanElement, RollingNumberDigitProps>(
    (
      {
        value,
        initialValue,
        transitionConfig,
        RollingNumberMaskComponent = DefaultRollingNumberMask,
        color = 'inherit',
        className,
        styles,
        style,
        classNames,
        ...props
      },
      ref,
    ) => {
      const internalRef = useRef<HTMLSpanElement>(null);
      useImperativeHandle(ref, () => internalRef.current as HTMLSpanElement);

      const numberRefs = useRef(new Array<HTMLSpanElement | null>(10));
      const prevValue = useRef(initialValue ?? value);

      useLayoutEffect(() => {
        const prevDigit = numberRefs.current[prevValue.current];
        const currDigit = numberRefs.current[value];
        if (!internalRef.current || !prevDigit || !currDigit || value === prevValue.current) return;
        const box = internalRef.current.getBoundingClientRect();
        const initialY = box.height * (value - prevValue.current);
        const prevWidth = getWidthInEm(prevDigit);
        const currentWidth = getWidthInEm(currDigit);
        animate(
          internalRef.current,
          {
            y: [initialY, 0],
            width: [prevWidth, currentWidth],
          },
          (transitionConfig?.y ?? defaultTransitionConfig.y) as ValueAnimationOptions,
        );
        prevValue.current = value;
      }, [transitionConfig, value]);

      const renderDigit = useCallback(
        (digit: number) => (
          <span
            key={digit}
            ref={(r) => void (numberRefs.current[digit] = r)}
            className={digitSpanCss}
          >
            {digit}
          </span>
        ),
        [],
      );

      return (
        <RollingNumberMaskComponent>
          <MotionText
            ref={internalRef}
            className={cx(digitContainerCss, className, classNames?.root, classNames?.text)}
            color={color}
            style={{ ...style, ...styles?.root, ...styles?.text }}
            {...props}
          >
            {value !== 0 && (
              <span className={cx(digitNonActiveCss, topNonActiveCss)}>
                {new Array(value).fill(null).map((_, i) => renderDigit(i))}
              </span>
            )}
            {renderDigit(value)}
            {value !== 9 && (
              <span className={cx(digitNonActiveCss, bottomNonActiveCss)}>
                {new Array(9 - value).fill(null).map((_, i) => renderDigit(value + i + 1))}
              </span>
            )}
          </MotionText>
        </RollingNumberMaskComponent>
      );
    },
  ),
);
