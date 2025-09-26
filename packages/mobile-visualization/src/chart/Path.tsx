import React, { memo, useMemo } from 'react';
import Reanimated, { useAnimatedProps, useSharedValue, withSpring } from 'react-native-reanimated';
import { ClipPath, Defs, G, Path as SvgPath, Rect, type RectProps } from 'react-native-svg';
import type { Rect as RectType, SharedProps } from '@coinbase/cds-common/types';
import { useChartContext } from '@coinbase/cds-common/visualizations/charts';

const AnimatedRect = Reanimated.createAnimatedComponent(Rect);

const AnimatedSvgRect = ({ width, rectProps }: { width: number; rectProps: RectProps }) => {
  const animatedWidth = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    return {
      width: animatedWidth.value,
    };
  });

  React.useEffect(() => {
    animatedWidth.value = withSpring(width + 4, {
      damping: 25,
      stiffness: 120,
    });
  }, [animatedWidth, width]);

  return <AnimatedRect animatedProps={animatedProps} {...rectProps} />;
};

export type PathProps = SharedProps & {
  /**
   * The SVG path data string
   */
  d?: string;
  /**
   * Path fill color
   */
  fill?: string;
  /**
   * Path stroke color
   */
  stroke?: string;
  /**
   * Path stroke width
   */
  strokeWidth?: number;
  /**
   * Path stroke opacity
   */
  strokeOpacity?: number;
  /**
   * Path fill opacity
   */
  fillOpacity?: number;
  /**
   * Custom clip path rect. If provided, this overrides the default chart rect for clipping.
   */
  clipRect?: RectType;
  /**
   * Stroke dash array for dashed lines
   */
  strokeDasharray?: string;
  /**
   * Additional SVG path props
   */
  [key: string]: any;
};

export const Path = memo<PathProps>(
  ({
    clipRect,
    d = '',
    fill,
    stroke,
    strokeWidth,
    strokeOpacity,
    fillOpacity,
    strokeDasharray,
    testID,
    ...pathProps
  }) => {
    const { animate, drawingArea: contextRect } = useChartContext();
    const rect = clipRect ?? contextRect;

    const clipPathId = useMemo(() => `clip-path-${Math.random().toString(36).substr(2, 9)}`, []);

    if (!d || !rect) {
      return null;
    }

    return (
      <G>
        <Defs>
          <ClipPath id={clipPathId}>
            {animate ? (
              <AnimatedSvgRect
                rectProps={{ height: rect.height, x: rect.x, y: rect.y }}
                width={rect.width}
              />
            ) : (
              <Rect height={rect.height} width={rect.width} x={rect.x} y={rect.y} />
            )}
          </ClipPath>
        </Defs>
        <SvgPath
          clipPath={`url(#${clipPathId})`}
          d={d}
          fill={fill}
          fillOpacity={fillOpacity}
          stroke={stroke}
          strokeDasharray={strokeDasharray}
          strokeOpacity={strokeOpacity}
          strokeWidth={strokeWidth}
          testID={testID}
          {...pathProps}
        />
      </G>
    );
  },
);
