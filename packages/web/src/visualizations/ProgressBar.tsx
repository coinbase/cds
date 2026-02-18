import React, { forwardRef, memo } from 'react';
import { animateProgressBaseSpec } from '@coinbase/cds-common/animation/progress';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { usePreviousValues } from '@coinbase/cds-common/hooks/usePreviousValues';
import type { SharedAccessibilityProps, SharedProps, Weight } from '@coinbase/cds-common/types';
import { useProgressSize } from '@coinbase/cds-common/visualizations/useProgressSize';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';

import { cx } from '../cx';
import { Box, HStack } from '../layout';
import type { HintMotionBaseProps } from '../motion/types';
import { useMotionProps } from '../motion/useMotionProps';
import { isRtl } from '../utils/isRtl';

export type ProgressBaseProps = SharedProps &
  Pick<HintMotionBaseProps, 'disableAnimateOnMount'> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
    /** Number between 0-1 representing the progress percentage */
    progress: number;
    /** Toggle used to change thickness of progress visualization
     * @default normal
     * */
    weight?: Weight;
    /**
     * Toggle used to show a disabled progress visualization
     */
    disabled?: boolean;
    /**
     * Custom progress color.
     * @default primary
     */
    color?: ThemeVars.Color;
    /**
     * Callback fired when the progress animation ends.
     */
    onAnimationEnd?: () => void;
    /**
     * Callback fired when the progress animation starts.
     */
    onAnimationStart?: () => void;
  };

export type ProgressBarProps = ProgressBaseProps & {
  style?: React.CSSProperties;
  className?: string;
  /** Custom styles for individual elements of the ProgressBar component */
  styles?: {
    /** Root element */
    root?: React.CSSProperties;
    /** Progress fill element */
    progress?: React.CSSProperties;
  };
  /** Custom class names for individual elements of the ProgressBar component */
  classNames?: {
    /** Root element */
    root?: string;
    /** Progress fill element */
    progress?: string;
  };
};

const MotionBox = motion(Box);

const boxCss = css`
  contain: content;
`;

export const ProgressBar = memo(
  forwardRef(
    (
      {
        weight = 'normal',
        progress,
        color = 'bgPrimary',
        disabled,
        disableAnimateOnMount,
        testID,
        accessibilityLabel,
        style,
        styles,
        className,
        classNames,
        onAnimationEnd,
        onAnimationStart,
      }: ProgressBarProps,
      forwardedRef: React.ForwardedRef<HTMLDivElement>,
    ) => {
      const height = useProgressSize(weight);

      const { getPreviousValue: getPreviousPercent, addPreviousValue: addPreviousPercent } =
        usePreviousValues<number>([disableAnimateOnMount ? progress : 0]);

      addPreviousPercent(progress);
      const previousPercent = getPreviousPercent() ?? 0;
      const translateXStart = isRtl() ? 100 - previousPercent * 100 : -100 + previousPercent * 100;
      const translateXEnd = isRtl() ? 100 - progress * 100 : -100 + progress * 100;

      const motionProps = useMotionProps({
        style: {
          originX: isRtl() ? 'right' : 'left',
        },
        animate: {
          x: [`${translateXStart}%`, `${translateXEnd}%`],
          opacity: 1,
        },
        transition: animateProgressBaseSpec,
        initial: !progress ? false : { x: `${translateXStart}%` }, // skip initial animation if no progress
      });

      return (
        <HStack
          ref={forwardedRef}
          accessibilityLabel={accessibilityLabel}
          alignItems="center"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={progress * 100}
          background="bgLine"
          borderRadius={200}
          className={cx(boxCss, className, classNames?.root)}
          flexGrow={1}
          flexShrink={0}
          height={height}
          justifyContent={isRtl() ? 'flex-end' : 'flex-start'}
          overflow="hidden"
          role="progressbar"
          style={{ ...style, ...styles?.root }}
          testID={testID}
        >
          <MotionBox
            alignItems="center"
            animate={motionProps.animate}
            background={disabled ? 'bgLineHeavy' : color}
            borderRadius={200}
            className={classNames?.progress}
            flexGrow={0}
            flexShrink={0}
            height="100%"
            initial={motionProps.initial}
            justifyContent="flex-start"
            onAnimationComplete={onAnimationEnd}
            onAnimationStart={onAnimationStart}
            opacity={disableAnimateOnMount ? 1 : 0}
            style={{ ...motionProps.style, ...styles?.progress }}
            testID="cds-progress-bar"
            transition={motionProps.transition}
            width="100%"
          />
        </HStack>
      );
    },
  ),
);
