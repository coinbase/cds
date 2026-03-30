import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { animateProgressBaseSpec } from '@coinbase/cds-common/animation/progress';
import type { Placement } from '@coinbase/cds-common/types';
import { isStorybook } from '@coinbase/cds-utils';
import { css } from '@linaria/core';
import type { MotionStyle } from 'framer-motion';
import { m as motion } from 'framer-motion';

import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { useDimensions } from '../hooks/useDimensions';
import { Box } from '../layout/Box';
import { VStack } from '../layout/VStack';
import { useMotionProps } from '../motion/useMotionProps';
import { isRtl } from '../utils/isRtl';

import { getProgressBarLabelParts, type ProgressBarLabel } from './getProgressBarLabelParts';

const MotionBox = motion(Box);
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

const getEndTranslateX = (containerWidth: number, textContainerWidth: number, progress: number) =>
  isRtl()
    ? Math.min(containerWidth - textContainerWidth, containerWidth - containerWidth * progress)
    : Math.max(0, containerWidth * progress - textContainerWidth);

const ProgressBarFloatLabel = memo(
  ({
    label,
    disabled,
    progress = 0,
    disableAnimateOnMount,
    labelPlacement,
    styles,
    classNames,
  }: ProgressBarFloatLabelProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const [targetX, setTargetX] = useState<number | null>(null);

    const { observe, width: cWidth, height: cHeight } = useDimensions();
    const { value: labelNum, render: renderLabel } = getProgressBarLabelParts(label);

    useEffect(() => {
      if (cWidth <= 0 || cHeight <= 0) return;

      const containerWidth = containerRef.current?.offsetWidth ?? cWidth;
      const textContainerWidth = textContainerRef.current?.offsetWidth ?? 0;

      setTargetX(getEndTranslateX(containerWidth, textContainerWidth, progress));
    }, [progress, cWidth, cHeight]);

    const setupContainerRef = useCallback(
      (ref: HTMLDivElement) => {
        containerRef.current = ref;
        observe(ref);
      },
      [observe],
    );

    const motionProps = useMotionProps({
      style: motionStyle,
      animate: {
        x: targetX ?? 0,
        opacity: targetX !== null ? 1 : 0,
      },
      initial: !progress || disableAnimateOnMount ? false : { x: 0, opacity: 0 },
      transition: animateProgressBaseSpec,
    });

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
        <MotionBox
          ref={textContainerRef}
          animate={motionProps.animate}
          className={floatingTextContainerCss}
          data-testid="cds-progress-bar-float-label"
          initial={motionProps.initial}
          style={motionProps.style}
          transition={motionProps.transition}
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
        </MotionBox>
      </Box>
    );
  },
);

export type ProgressBarWithFloatLabelBaseProps = Pick<
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
};

export type ProgressBarWithFloatLabelProps = ProgressBarWithFloatLabelBaseProps & {
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
> = memo((_props: React.PropsWithChildren<ProgressBarWithFloatLabelProps>) => {
  const mergedProps = useComponentConfig('ProgressBarWithFloatLabel', _props);
  const {
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
  } = mergedProps;
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
});
