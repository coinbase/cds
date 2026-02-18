import React, { memo, useCallback, useRef, useState } from 'react';
import { animateProgressBaseSpec } from '@coinbase/cds-common/animation/progress';
import { usePreviousValues } from '@coinbase/cds-common/hooks/usePreviousValues';
import type { Placement } from '@coinbase/cds-common/types';
import { isStorybook } from '@coinbase/cds-utils';
import { css } from '@linaria/core';
import type { MotionStyle } from 'framer-motion';
import { m as motion, useAnimation } from 'framer-motion';

import { cx } from '../cx';
import { useDimensions } from '../hooks/useDimensions';
import { useIsoEffect } from '../hooks/useIsoEffect';
import { Box } from '../layout/Box';
import { VStack } from '../layout/VStack';
import { convertTransition } from '../motion/utils';
import { isRtl } from '../utils/isRtl';

import { getProgressBarLabelParts, type ProgressBarLabel } from './getProgressBarLabelParts';
import { type ProgressBaseProps } from './ProgressBar';
import { ProgressTextLabel } from './ProgressTextLabel';

export type ProgressBarFloatLabelProps = Pick<
  ProgressBarWithFloatLabelProps,
  | 'label'
  | 'progress'
  | 'disableAnimateOnMount'
  | 'disabled'
  | 'labelPlacement'
  | 'styles'
  | 'classNames'
>;

const floatingTextContainerCss = css`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const motionStyle: MotionStyle = { originX: isRtl() ? 'left' : 'right' };

const ProgressBarFloatLabel = memo(
  ({
    label,
    disabled,
    progress,
    disableAnimateOnMount,
    labelPlacement,
    styles,
    classNames,
  }: ProgressBarFloatLabelProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const { getPreviousValue: getPreviousPercent, addPreviousValue: addPreviousPercent } =
      usePreviousValues<number>([disableAnimateOnMount ? progress : 0]);
    const animationControls = useAnimation();
    const [hasAnimationMounted, setHasAnimationMounted] = useState(!disableAnimateOnMount);

    addPreviousPercent(progress);
    const previousPercent = getPreviousPercent() ?? 0;

    // the animation uses a pixel translate which is outdated on a window resize, we have to account for this
    const { observe, width: cWidth, height: cHeight } = useDimensions();

    const { value: labelNum, render: renderLabel } = getProgressBarLabelParts(label);

    useIsoEffect(() => {
      if (textContainerRef.current && containerRef.current && cHeight > 0 && cWidth > 0) {
        const containerWidth = containerRef.current.offsetWidth;
        const textContainerWidth = textContainerRef.current.offsetWidth;

        const startLeftTranslate = isRtl()
          ? Math.min(
              containerWidth - textContainerWidth,
              containerWidth - containerWidth * previousPercent,
            )
          : Math.max(0, containerWidth * previousPercent - textContainerWidth);
        const endLeftTranslate = isRtl()
          ? Math.min(
              containerWidth - textContainerWidth,
              containerWidth - containerWidth * progress,
            )
          : Math.max(0, containerWidth * progress - textContainerWidth);

        if (!hasAnimationMounted && disableAnimateOnMount) {
          void animationControls.set({ x: endLeftTranslate });
          setHasAnimationMounted(true);
        } else {
          void animationControls.start({
            x: [startLeftTranslate, endLeftTranslate],
            transition: convertTransition(animateProgressBaseSpec),
          });
        }
      }
    }, [progress, cWidth, cHeight, previousPercent, disableAnimateOnMount]);

    const setupContainerRef = useCallback(
      (ref: HTMLDivElement) => {
        containerRef.current = ref;
        observe(ref);
      },
      [observe],
    );

    return (
      <Box
        ref={setupContainerRef}
        alignItems="center"
        className={classNames?.labelContainer}
        paddingBottom={labelPlacement === 'above' ? 1 : 0}
        paddingTop={labelPlacement === 'below' ? 1 : 0}
        style={styles?.labelContainer}
        testID="cds-progress-label-container"
        width="100%"
      >
        <motion.div
          ref={textContainerRef}
          animate={animationControls}
          className={floatingTextContainerCss}
          data-testid="cds-progress-bar-float-label"
          style={{ ...motionStyle, opacity: hasAnimationMounted ? 1 : 0 }}
        >
          <ProgressTextLabel
            className={classNames?.label}
            color="fgMuted"
            disableAnimateOnMount={disableAnimateOnMount}
            disabled={disabled}
            renderLabel={renderLabel}
            style={styles?.label}
            value={labelNum}
          />
        </motion.div>
      </Box>
    );
  },
);

export type ProgressBarWithFloatLabelProps = Pick<
  ProgressBaseProps,
  'progress' | 'disableAnimateOnMount' | 'disabled' | 'testID'
> & {
  /** Label that is floated at the end of the filled in bar. If a number is used then it will format it as a percentage. */
  label: ProgressBarLabel;
  /**
   * Position of label relative to the bar
   * @default above
   * */
  labelPlacement?: Extract<Placement, 'above' | 'below'>;
  style?: React.CSSProperties;
  className?: string;
  /** Custom styles for individual elements of the ProgressBarWithFloatLabel component */
  styles?: {
    /** Root element */
    root?: React.CSSProperties;
    /** Label container element */
    labelContainer?: React.CSSProperties;
    /** Label element */
    label?: React.CSSProperties;
  };
  /** Custom class names for individual elements of the ProgressBarWithFloatLabel component */
  classNames?: {
    /** Root element */
    root?: string;
    /** Label container element */
    labelContainer?: string;
    /** Label element */
    label?: string;
  };
};

export const ProgressBarWithFloatLabel: React.FC<
  React.PropsWithChildren<ProgressBarWithFloatLabelProps>
> = memo(
  ({
    label,
    labelPlacement = 'above',
    progress,
    disableAnimateOnMount,
    disabled,
    children,
    testID,
    style,
    className,
    styles,
    classNames,
  }) => {
    const skipLabel = isStorybook();
    const progressBarFloatLabel = !skipLabel && (
      <ProgressBarFloatLabel
        classNames={classNames}
        disableAnimateOnMount={disableAnimateOnMount}
        disabled={disabled}
        label={label}
        labelPlacement={labelPlacement}
        progress={progress}
        styles={styles}
      />
    );

    return (
      <VStack
        className={cx(className, classNames?.root)}
        style={{ ...style, ...styles?.root }}
        testID={testID}
      >
        {labelPlacement === 'above' && progressBarFloatLabel}
        {children}
        {labelPlacement === 'below' && progressBarFloatLabel}
      </VStack>
    );
  },
);
