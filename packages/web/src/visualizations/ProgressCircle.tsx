import React, { forwardRef, memo, useRef } from 'react';
import type { ThemeVars } from '@coinbase/cds-common';
import { animateProgressBaseSpec } from '@coinbase/cds-common/animation/progress';
import { getCircumference, getRadius } from '@coinbase/cds-common/utils/circle';
import { getProgressCircleParams } from '@coinbase/cds-common/visualizations/getProgressCircleParams';
import { useProgressSize } from '@coinbase/cds-common/visualizations/useProgressSize';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';

import { cx } from '../cx';
import { Box } from '../layout/Box';
import { useMotionProps } from '../motion/useMotionProps';

import { DefaultProgressCircleContent } from './DefaultProgressCircleContent';
import type { ProgressBaseProps } from './ProgressBar';
import {
  VisualizationContainer,
  type VisualizationContainerDimension,
} from './VisualizationContainer';

const svgCss = css`
  display: block;
  max-width: 100%;
`;

export type ProgressCircleBaseProps = ProgressBaseProps & {
  /**
   * Toggle used to hide the content node rendered inside the circle.
   */
  hideContent?: boolean;
  /**
   * @deprecated Use hideContent instead
   * Toggle used to hide the text rendered inside the circle.
   */
  hideText?: boolean;
  /**
   * Optional size in px for the visualization.
   * This is useful if the visualization is used in an HStack.
   * If this is omitted the visualization will fill the parent width or height.
   * Since it's a circular visualization it will fill the smaller of the parent width or height
   */
  size?: number;
  /**
   * Optional component to override the default content rendered inside the circle.
   */
  contentNode?: React.ReactNode;
};

export type ProgressCircleProps = ProgressCircleBaseProps & {
  /**
   * Custom styles for the progress circle root.
   */
  style?: React.CSSProperties;
  /**
   * Custom class name for the progress circle root.
   */
  className?: string;
  /**
   * Custom styles for the progress circle.
   */
  styles?: {
    /**
     * Custom styles for the progress circle root.
     */
    root?: React.CSSProperties;
    /**
     * Custom styles for the progress circle svg.
     */
    svg?: React.CSSProperties;
    /**
     * Custom styles for the background circle.
     */
    circle?: React.CSSProperties;
    /**
     * Custom styles for the foreground circle.
     */
    progress?: React.CSSProperties;
  };
  /**
   * Custom class names for the progress circle.
   */
  classNames?: {
    /**
     * Class name for the progress circle root.
     */
    root?: string;
    /**
     * Class name for the progress circle svg.
     */
    svg?: string;
    /**
     * Class name for the progress circle background circle.
     */
    circle?: string;
    /**
     * Class name for the progress circle foreground circle.
     */
    progress?: string;
  };
};

export type ProgressCircleContentProps = Pick<
  ProgressCircleBaseProps,
  'progress' | 'disableAnimateOnMount' | 'disabled'
> & {
  /**
   * Custom text color.
   * @default fgMuted
   */
  color?: ThemeVars.Color;
};

type ProgressInnerCircleProps = Pick<
  ProgressCircleBaseProps,
  'progress' | 'onAnimationEnd' | 'onAnimationStart' | 'disableAnimateOnMount'
> &
  Required<Pick<ProgressCircleBaseProps, 'size' | 'weight' | 'color'>> & {
    visuallyDisabled?: boolean;
    style?: React.CSSProperties;
    className?: string;
  };

const ProgressCircleInner = memo(
  ({
    size,
    progress,
    color,
    weight,
    visuallyDisabled,
    style,
    className,
    onAnimationEnd,
    onAnimationStart,
    disableAnimateOnMount,
  }: ProgressInnerCircleProps) => {
    const strokeWidth = useProgressSize(weight);
    const circleRef = useRef<SVGCircleElement>(null);

    const circumference = getCircumference(getRadius(size, strokeWidth));

    const progressOffset = (1 - progress) * circumference;

    const motionProps = useMotionProps({
      style: {
        ...style,
        rotate: -90,
      },
      animate: {
        strokeDashoffset: progressOffset,
      },
      transition: animateProgressBaseSpec,
      initial: {
        strokeDashoffset: disableAnimateOnMount ? progressOffset : circumference,
      },
    });

    return (
      <motion.circle
        ref={circleRef}
        data-testid="cds-progress-circle-inner"
        strokeDasharray={circumference}
        strokeLinecap="round"
        {...motionProps}
        {...getProgressCircleParams({
          size,
          strokeWidth,
          stroke: !visuallyDisabled ? `var(--color-${color})` : 'var(--color-bgLineHeavy)',
        })}
        className={className}
        onAnimationComplete={onAnimationEnd}
        onAnimationStart={onAnimationStart}
      />
    );
  },
);

export const ProgressCircle = memo(
  forwardRef(
    (
      {
        weight = 'normal',
        progress,
        color = 'bgPrimary',
        disabled = false,
        disableAnimateOnMount = false,
        testID,
        hideContent,
        hideText,
        size,
        accessibilityLabel,
        contentNode,
        style,
        styles,
        className,
        classNames,
        onAnimationEnd,
        onAnimationStart,
      }: ProgressCircleProps,
      forwardedRef: React.ForwardedRef<HTMLDivElement>,
    ) => {
      const strokeWidth = useProgressSize(weight);

      const visSize = size ?? '100%';
      return (
        <VisualizationContainer height={visSize} width={visSize}>
          {({ width, height, circleSize }: VisualizationContainerDimension) => (
            <Box
              ref={forwardedRef}
              accessibilityLabel={accessibilityLabel}
              alignItems="center"
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={Math.round(progress * 100)}
              className={cx(className, classNames?.root)}
              height={height}
              justifyContent="center"
              role="progressbar"
              style={{ ...style, ...styles?.root }}
              testID={testID}
              title={accessibilityLabel}
              width={width}
            >
              <Box
                flexGrow={0}
                flexShrink={0}
                height={circleSize}
                position="relative"
                width={circleSize}
              >
                <svg
                  key={circleSize}
                  aria-hidden
                  className={cx(svgCss, classNames?.svg)}
                  height={circleSize}
                  style={styles?.svg}
                  width={circleSize}
                >
                  <circle
                    {...getProgressCircleParams({
                      size: circleSize,
                      strokeWidth,
                      stroke: 'var(--color-bgLine)',
                    })}
                    className={classNames?.circle}
                    style={styles?.circle}
                  />
                  <ProgressCircleInner
                    className={classNames?.progress}
                    color={color}
                    disableAnimateOnMount={disableAnimateOnMount}
                    onAnimationEnd={onAnimationEnd}
                    onAnimationStart={onAnimationStart}
                    progress={progress}
                    size={circleSize}
                    style={styles?.progress}
                    visuallyDisabled={disabled}
                    weight={weight}
                  />
                </svg>
                {!hideText && !hideContent && (
                  <Box
                    height="100%"
                    position="absolute"
                    style={{ padding: strokeWidth }}
                    width="100%"
                  >
                    {/* We clip the content node to the circle to prevent the node from overflowing over the circle */}
                    <Box
                      alignItems="center"
                      borderRadius={1000}
                      height="100%"
                      justifyContent="center"
                      overflow="clip"
                      width="100%"
                    >
                      {contentNode ?? (
                        <DefaultProgressCircleContent
                          disableAnimateOnMount={disableAnimateOnMount}
                          disabled={disabled}
                          progress={progress}
                        />
                      )}
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </VisualizationContainer>
      );
    },
  ),
);
