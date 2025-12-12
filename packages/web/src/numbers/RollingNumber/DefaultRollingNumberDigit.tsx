import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
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
 * Default digit component for RollingNumber on web.
 *
 * The web implementation differs from mobile due to platform-specific animation libraries:
 * - Web uses framer-motion with imperative `animate` calls
 * - Mobile uses react-native-reanimated with shared values and worklets
 *
 * For the "every" variant, web renders only the necessary digits above/below the current
 * value using CSS positioning. Mobile renders all 10 digits (0-9) stacked with absolute
 * positioning.
 *
 * For the "single" variant, web uses imperative opacity crossfades on DOM sections.
 * Mobile uses reanimated's `entering`/`exiting` props with custom animation worklets.
 */
export const DefaultRollingNumberDigit: RollingNumberDigitComponent = memo(
  forwardRef<HTMLSpanElement, RollingNumberDigitProps>(
    (
      {
        value,
        initialValue,
        transitionConfig,
        digitTransitionVariant = 'every',
        direction,
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
      const singleVariantPrevDigitRef = useRef<HTMLSpanElement>(null);
      const singleVariantCurrentDigitRef = useRef<HTMLSpanElement>(null);
      const prevValue = useRef(initialValue ?? value);

      const isSingleVariant = useMemo(
        () => digitTransitionVariant === 'single',
        [digitTransitionVariant],
      );

      useLayoutEffect(() => {
        const prevDigit = numberRefs.current[prevValue.current];
        const currDigit = numberRefs.current[value];
        if (!internalRef.current || !prevDigit || !currDigit || value === prevValue.current) return;

        const box = internalRef.current.getBoundingClientRect();
        // Every: distance based on numeric difference (rolls through every intermediate digit)
        // Single: distance is always 1 height (rolls directly to the new digit)
        const directionSign = direction === 'up' ? 1 : -1;
        const initialY = isSingleVariant
          ? box.height * directionSign
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

        // Single variant: add opacity crossfade (prev fades out, current fades in)
        if (isSingleVariant) {
          const opacityTransition = (transitionConfig?.opacity ??
            defaultTransitionConfig.opacity) as ValueAnimationOptions;

          if (singleVariantPrevDigitRef.current) {
            animate(singleVariantPrevDigitRef.current, { opacity: [1, 0] }, opacityTransition);
          }
          if (singleVariantCurrentDigitRef.current) {
            animate(singleVariantCurrentDigitRef.current, { opacity: [0, 1] }, opacityTransition);
          }
        }

        prevValue.current = value;
      }, [isSingleVariant, transitionConfig, value, direction]);

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

      // Use direction prop for single variant positioning
      const isGoingUp = direction === 'up';
      const isGoingDown = direction === 'down';

      // Every: render all digits above/below current (shows every intermediate digit during animation)
      // Single: render only the previous digit in the appropriate section (direct transition)
      const showTopSection = isSingleVariant ? isGoingUp : value !== 0;
      const showBottomSection = isSingleVariant ? isGoingDown : value !== 9;

      const topDigits = isSingleVariant
        ? renderDigit(prevValue.current)
        : new Array(value).fill(null).map((_, i) => renderDigit(i));

      const bottomDigits = isSingleVariant
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
              <span
                ref={isSingleVariant ? singleVariantPrevDigitRef : undefined}
                className={cx(digitNonActiveCss, topNonActiveCss)}
              >
                {topDigits}
              </span>
            )}
            <span ref={isSingleVariant ? singleVariantCurrentDigitRef : undefined}>
              {renderDigit(value)}
            </span>
            {showBottomSection && (
              <span
                ref={isSingleVariant ? singleVariantPrevDigitRef : undefined}
                className={cx(digitNonActiveCss, bottomNonActiveCss)}
              >
                {bottomDigits}
              </span>
            )}
          </MotionText>
        </RollingNumberMaskComponent>
      );
    },
  ),
);
