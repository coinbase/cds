import React, { forwardRef, memo, useRef } from 'react';
import type { ThemeVars } from '@coinbase/cds-common';
import { animateProgressBaseSpec } from '@coinbase/cds-common/animation/progress';
import { getProgressCircleParams } from '@coinbase/cds-common/visualizations/getProgressCircleParams';
import { getProgressSize } from '@coinbase/cds-common/visualizations/getProgressSize';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';

import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
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
  flex-grow: 0;
  flex-shrink: 0;
`;

export type ProgressCircleBaseProps = ProgressBaseProps & {
  /**
   * Toggle used to hide the content node rendered inside the circle.
   */
  hideContent?: boolean;
  /**
   * @deprecated Use hideContent instead. This will be removed in a future major release.
   * @deprecationExpectedRemoval v8
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
  /**
   * Toggle used to show an indeterminate progress circle.
   */
  indeterminate?: boolean;
};

export type ProgressCircleProps = ProgressCircleBaseProps & {
  style?: React.CSSProperties;
  className?: string;
  /** Custom styles for individual elements of the ProgressCircle component */
  styles?: {
    /** Root element */
    root?: React.CSSProperties;
    /** SVG element */
    svg?: React.CSSProperties;
    /** Background circle element */
    circle?: React.CSSProperties;
    /** Foreground progress circle element */
    progress?: React.CSSProperties;
  };
  /** Custom class names for individual elements of the ProgressCircle component */
  classNames?: {
    /** Root element */
    root?: string;
    /** SVG element */
    svg?: string;
    /** Background circle element */
    circle?: string;
    /** Foreground progress circle element */
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
  'progress' | 'onAnimationEnd' | 'onAnimationStart' | 'disableAnimateOnMount' | 'indeterminate'
> &
  Required<Pick<ProgressCircleBaseProps, 'size' | 'color'>> & {
    visuallyDisabled?: boolean;
    style?: React.CSSProperties;
    className?: string;
    strokeWidth: number;
  };

const indeterminateProgressCircleCss = css`
  animation: spin 1000ms linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ProgressCircleInner = memo(
  ({
    strokeWidth,
    size,
    progress = 0,
    color,
    visuallyDisabled,
    style,
    className,
    onAnimationEnd,
    onAnimationStart,
    disableAnimateOnMount,
  }: ProgressInnerCircleProps) => {
    const circleRef = useRef<SVGCircleElement>(null);

    const progressOffset = 1 - progress;

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
        strokeDashoffset: disableAnimateOnMount ? progressOffset : 1,
      },
    });

    return (
      <motion.circle
        ref={circleRef}
        data-testid="cds-progress-circle-inner"
        pathLength={1}
        strokeDasharray={1}
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
  forwardRef((_props: ProgressCircleProps, forwardedRef: React.ForwardedRef<HTMLDivElement>) => {
    const mergedProps = useComponentConfig('ProgressCircle', _props);
    const {
      indeterminate,
      weight = 'normal',
      progress = indeterminate ? 0.75 : 0,
      color = indeterminate ? 'fgMuted' : 'bgPrimary',
      disabled,
      disableAnimateOnMount = indeterminate ? true : false,
      testID,
      hideContent,
      hideText,
      size,
      accessibilityLabel = indeterminate ? 'Loading' : undefined,
      contentNode,
      style,
      styles,
      className,
      classNames,
      onAnimationEnd,
      onAnimationStart,
    } = mergedProps;
    const visSize = size ?? '100%';
    const strokeWidth = getProgressSize(weight);

    return (
      <VisualizationContainer height={visSize} width={visSize}>
        {({ width, height, circleSize }: VisualizationContainerDimension) => {
          return (
            <Box
              ref={forwardedRef}
              accessibilityLabel={accessibilityLabel}
              alignItems="center"
              {...(indeterminate
                ? {}
                : {
                    'aria-valuemax': 100,
                    'aria-valuemin': 0,
                    'aria-valuenow': Math.round(progress * 100),
                  })}
              className={cx(className, classNames?.root)}
              height={height}
              justifyContent="center"
              position="relative"
              role="progressbar"
              style={{ ...style, ...styles?.root }}
              testID={testID}
              title={accessibilityLabel}
              width={width}
            >
              <svg
                key={circleSize}
                aria-hidden
                className={cx(
                  svgCss,
                  classNames?.svg,
                  indeterminate && indeterminateProgressCircleCss,
                )}
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
                  indeterminate={indeterminate}
                  onAnimationEnd={onAnimationEnd}
                  onAnimationStart={onAnimationStart}
                  progress={progress}
                  size={circleSize}
                  strokeWidth={strokeWidth}
                  style={styles?.progress}
                  visuallyDisabled={disabled}
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
                    {contentNode ??
                      (!indeterminate && (
                        <DefaultProgressCircleContent
                          disableAnimateOnMount={disableAnimateOnMount}
                          disabled={disabled}
                          progress={progress}
                        />
                      ))}
                  </Box>
                </Box>
              )}
            </Box>
          );
        }}
      </VisualizationContainer>
    );
  }),
);
