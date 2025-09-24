import React, { memo, useEffect, useMemo, useRef } from 'react';
import Reanimated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import type { ThemeVars } from '@coinbase/cds-common';
import { getBarPath, useChartContext } from '@coinbase/cds-common/visualizations/charts';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { generateRandomId } from '@coinbase/cds-utils';

const AnimatedRect = Reanimated.createAnimatedComponent(Rect);

export type BarComponentProps = {
  d: string;
  fill: string;
  fillOpacity?: number;
  clipRect?: Rect;
  stroke?: string;
  strokeWidth?: number;
  /**
   * The actual data value for this bar (optional, for custom components).
   */
  dataValue?: number | [number, number] | null;
  /**
   * The category index for this bar (optional, for custom components).
   */
  categoryIndex?: number;
  /**
   * The y scale function from context (optional, for custom components).
   */
  yScale?: any;
  /**
   * The series ID this bar belongs to (optional, for custom components).
   */
  seriesId?: string;
  /**
   * The x position of this bar (optional, for custom components).
   */
  x?: number;
  /**
   * The y position of this bar (optional, for custom components).
   */
  y?: number;
  /**
   * The width of this bar (optional, for custom components).
   */
  width?: number;
  /**
   * The height of this bar (optional, for custom components).
   */
  height?: number;
  /**
   * The y-origin for animations (baseline position).
   */
  yOrigin?: number;
};

export type BarComponent = React.FC<BarComponentProps>;

export type BarProps = {
  /**
   * X coordinate of the bar (left edge).
   */
  x: number;
  /**
   * Y coordinate of the bar (top edge).
   */
  y: number;
  /**
   * Width of the bar.
   */
  width: number;
  /**
   * Height of the bar.
   */
  height: number;
  /**
   * Component to render the bar.
   * Takes precedence over the type prop if provided.
   */
  BarComponent?: BarComponent;
  /**
   * The type of bar to render.
   * @default 'solid'
   */
  type?: 'solid' | 'gradient' | 'dotted';
  /**
   * The color of the bar.
   * @default theme.color.fgPrimary
   */
  fill?: string;
  /**
   * Opacity of the bar.
   * @default 1
   */
  fillOpacity?: number;
  /**
   * Stroke color for the bar outline.
   */
  stroke?: string;
  /**
   * Stroke width for the bar outline.
   */
  strokeWidth?: number;
  /**
   * Border radius from theme (e.g., 100, 200, etc.).
   * @default 100
   */
  borderRadius?: ThemeVars.BorderRadius;
  roundTop?: boolean;
  roundBottom?: boolean;
  /**
   * The actual data value for this bar (optional, for custom components).
   */
  dataValue?: number | [number, number] | null;
  /**
   * The category index for this bar (optional, for custom components).
   */
  categoryIndex?: number;
  /**
   * The y scale function from context (optional, for custom components).
   */
  yScale?: any;
  /**
   * The series ID this bar belongs to (optional, for custom components).
   */
  seriesId?: string;
  /**
   * The y-origin for animations (baseline position).
   */
  yOrigin?: number;
};

/**
 * Simple bar component that renders a single bar at the specified position.
 *
 * This component is intentionally kept simple - it just renders a bar at the given
 * x, y, width, height coordinates. Complex positioning logic (like handling stacks,
 * groups, gaps, etc.) should be handled by parent components like BarChart or BarStack.
 *
 * @example
 * ```tsx
 * <Bar x={10} y={20} width={50} height={100} fill="blue" />
 * ```
 */
export const Bar = memo<BarProps>(
  ({
    x,
    y,
    width,
    height,
    type = 'solid',
    BarComponent: SelectedBarComponent,
    fill,
    fillOpacity = 1,
    stroke,
    strokeWidth,
    borderRadius = 100,
    roundTop,
    roundBottom,
    dataValue,
    categoryIndex,
    yScale,
    seriesId,
    yOrigin,
  }) => {
    const theme = useTheme();
    const { animate } = useChartContext();
    const clipPathId = useRef(generateRandomId()).current;

    // Use theme color as default if no fill is provided
    const effectiveFill = fill ?? theme.color.fgPrimary;

    // Animation values
    const baseY = yOrigin ?? y + height;

    // Initialize shared values
    const animatedHeight = useSharedValue(0);
    const animatedY = useSharedValue(baseY);
    const hasInitialized = useSharedValue(false);

    // Set up animation with proper worklet
    useEffect(() => {
      'worklet';

      if (!animate) {
        // Set values immediately when animations are disabled
        animatedHeight.value = height;
        animatedY.value = y;
        hasInitialized.value = true;
      } else {
        // Determine if this is initial mount or update
        const isInitialMount = !hasInitialized.value;
        hasInitialized.value = true;

        if (isInitialMount) {
          // Initial animation: start from near-zero height at bottom
          animatedHeight.value = 0.01;
          animatedY.value = baseY;

          // Animate to full size
          animatedHeight.value = withTiming(height, {
            duration: 600,
            easing: Easing.out(Easing.cubic),
          });
          animatedY.value = withTiming(y, {
            duration: 600,
            easing: Easing.out(Easing.cubic),
          });
        } else {
          // Update animation: smoothly transition to new values
          animatedHeight.value = withTiming(height, {
            duration: 300,
            easing: Easing.inOut(Easing.cubic),
          });
          animatedY.value = withTiming(y, {
            duration: 300,
            easing: Easing.inOut(Easing.cubic),
          });
        }
      }
    }, [height, y, baseY, animate, animatedHeight, animatedY, hasInitialized]);

    const animatedProps = useAnimatedProps(() => {
      return {
        y: animatedY.value,
        height: animatedHeight.value,
      };
    });

    const barPath = useMemo(() => {
      return getBarPath(
        x,
        y,
        width,
        height,
        theme.borderRadius[borderRadius],
        !!roundTop,
        !!roundBottom,
      );
    }, [x, y, width, height, theme.borderRadius, borderRadius, roundTop, roundBottom]);

    if (!barPath) {
      return null;
    }

    // For bars with animations, use an animated rect with clipping
    if (!animate) {
      return (
        <G>
          <Defs>
            <ClipPath id={clipPathId}>
              <Path d={barPath} />
            </ClipPath>
          </Defs>
          <AnimatedRect
            animatedProps={animatedProps}
            clipPath={`url(#${clipPathId})`}
            fill={effectiveFill}
            fillOpacity={fillOpacity}
            stroke={stroke}
            strokeWidth={strokeWidth}
            width={width}
            x={x}
          />
        </G>
      );
    }

    // For static bars, use a simple path
    return (
      <Path
        d={barPath}
        fill={effectiveFill}
        fillOpacity={fillOpacity}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    );
  },
);

Bar.displayName = 'Bar';
