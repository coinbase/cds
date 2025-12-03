import { forwardRef, memo, useCallback, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { getWidthInEm } from '@coinbase/cds-common';
import { css } from '@linaria/core';
import {
  animate,
  AnimatePresence,
  m,
  useReducedMotion,
  type ValueAnimationOptions,
} from 'framer-motion';

import { cx } from '../../cx';
import { Text } from '../../typography/Text';

import { DefaultRollingNumberMask } from './DefaultRollingNumberMask';
import {
  defaultTransitionConfig,
  type RollingNumberDigitComponent,
  type RollingNumberDigitProps,
  slideTransitionSpringConfig,
  type ValueChangeDirection,
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

// Styles for slide variant
const slideContainerCss = css`
  display: inline-flex;
  position: relative;
  overflow: hidden;
`;

const slideGhostCss = css`
  visibility: hidden;
`;

const slideDigitCss = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * Get the initial and exit Y positions for slide animation based on direction.
 * Roll Up: New digits enter from bottom (100%), old exit to top (-100%)
 * Roll Down: New digits enter from top (-100%), old exit to bottom (100%)
 */
const getSlideYPositions = (direction: ValueChangeDirection) => {
  if (direction === 'up') {
    return { initial: '100%', exit: '-100%' };
  }
  // direction === 'down' or 'none'
  return { initial: '-100%', exit: '100%' };
};

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
        color: colorProp = 'inherit',
        className,
        styles,
        style,
        classNames,
        ...props
      },
      ref,
    ) => {
      const color = colorProp as ThemeVars.Color;
      const shouldReduceMotion = useReducedMotion();

      // Slide variant implementation
      if (digitTransitionVariant === 'slide') {
        const { initial: initialY, exit: exitY } = getSlideYPositions(valueChangeDirection);

        // Spring transition for slide animations
        const slideTransition = {
          type: 'spring' as const,
          ...slideTransitionSpringConfig,
        };

        // For reduced motion, use crossfade without translation
        const variants = shouldReduceMotion
          ? {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
            }
          : {
              initial: { y: initialY, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              exit: { y: exitY, opacity: 0 },
            };

        return (
          <RollingNumberMaskComponent ref={ref}>
            <Text
              className={cx(slideContainerCss, className, classNames?.root, classNames?.text)}
              color={color}
              style={{ ...style, ...styles?.root, ...styles?.text }}
              {...props}
            >
              {/* Ghost element to reserve layout space */}
              <span className={slideGhostCss}>{value}</span>
              {/* Animated digit */}
              <AnimatePresence initial={false} mode="popLayout">
                <m.span
                  key={value}
                  animate="animate"
                  className={slideDigitCss}
                  exit="exit"
                  initial="initial"
                  transition={slideTransition}
                  variants={variants}
                >
                  {value}
                </m.span>
              </AnimatePresence>
            </Text>
          </RollingNumberMaskComponent>
        );
      }

      // Roll variant implementation (original behavior)
      return (
        <RollDigit
          ref={ref}
          RollingNumberMaskComponent={RollingNumberMaskComponent}
          className={className}
          classNames={classNames}
          color={color}
          initialValue={initialValue}
          style={style}
          styles={styles}
          transitionConfig={transitionConfig}
          value={value}
          {...props}
        />
      );
    },
  ),
);

/**
 * Internal component for the roll variant to avoid hooks in conditional branches.
 */
const RollDigit = memo(
  forwardRef<
    HTMLSpanElement,
    Omit<RollingNumberDigitProps, 'digitTransitionVariant' | 'valueChangeDirection'>
  >(
    (
      {
        value,
        initialValue,
        transitionConfig,
        RollingNumberMaskComponent = DefaultRollingNumberMask,
        color: colorProp = 'inherit',
        className,
        styles,
        style,
        classNames,
        ...props
      },
      ref,
    ) => {
      const color = colorProp as ThemeVars.Color;
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
