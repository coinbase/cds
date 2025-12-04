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
 */
export const DefaultRollingNumberDigit: RollingNumberDigitComponent = memo(
  forwardRef<HTMLSpanElement, RollingNumberDigitProps>(
    (
      {
        value,
        initialValue,
        transitionConfig,
        digitTransitionVariant = 'roll',
        valueChangeDirection = 'none',
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
      const isSlideVariant = digitTransitionVariant === 'slide';

      useLayoutEffect(() => {
        const prevDigit = numberRefs.current[prevValue.current];
        const currDigit = numberRefs.current[value];
        if (!internalRef.current || !prevDigit || !currDigit || value === prevValue.current) return;

        const box = internalRef.current.getBoundingClientRect();
        // Roll: distance based on numeric difference (rolls through intermediate values)
        // Slide: distance is always 1 height (direct transition to adjacent position)
        const slideDirection = valueChangeDirection === 'up' ? 1 : -1;
        const initialY = isSlideVariant
          ? box.height * slideDirection
          : box.height * (value - prevValue.current);
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
      }, [isSlideVariant, transitionConfig, value, valueChangeDirection]);

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

      // Use valueChangeDirection prop for slide variant positioning
      const isGoingUp = valueChangeDirection === 'up';
      const isGoingDown = valueChangeDirection === 'down';

      // Roll: render all digits above/below current (shows intermediate values during animation)
      // Slide: render only the previous digit in the appropriate section (direct transition)
      const showTopSection = isSlideVariant ? isGoingUp : value !== 0;
      const showBottomSection = isSlideVariant ? isGoingDown : value !== 9;

      const topDigits = isSlideVariant
        ? renderDigit(prevValue.current)
        : new Array(value).fill(null).map((_, i) => renderDigit(i));

      const bottomDigits = isSlideVariant
        ? renderDigit(prevValue.current)
        : new Array(9 - value).fill(null).map((_, i) => renderDigit(value + i + 1));

      return (
        <RollingNumberMaskComponent>
          <MotionText
            ref={internalRef}
            className={cx(digitContainerCss, className, classNames?.root, classNames?.text)}
            color={color}
            style={{ ...style, ...styles?.root, ...styles?.text }}
            {...props}
          >
            {showTopSection && (
              <span className={cx(digitNonActiveCss, topNonActiveCss)}>{topDigits}</span>
            )}
            {renderDigit(value)}
            {showBottomSection && (
              <span className={cx(digitNonActiveCss, bottomNonActiveCss)}>{bottomDigits}</span>
            )}
          </MotionText>
        </RollingNumberMaskComponent>
      );
    },
  ),
);
