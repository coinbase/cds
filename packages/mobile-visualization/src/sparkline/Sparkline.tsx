import React, { forwardRef, memo, useMemo, useRef } from 'react';
import { Defs, G, LinearGradient, Mask, Path, Rect, Stop, Svg } from 'react-native-svg';
import { getAccessibleForegroundGradient } from '@coinbase/cds-common/color/getAccessibleForegroundGradient';
import { borderWidth } from '@coinbase/cds-common/tokens/sparkline';
import type { ElementChildren, SharedProps } from '@coinbase/cds-common/types';
import { getAccessibleColor } from '@coinbase/cds-common/utils/getAccessibleColor';
import { getSparklineRange } from '@coinbase/cds-common/visualizations/getSparklineRange';
import { getSparklineTransform } from '@coinbase/cds-common/visualizations/getSparklineTransform';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { generateRandomId } from '@coinbase/cds-utils';

import { generateSparklineAreaWithId } from './generateSparklineWithId';
import type { SparklineAreaBaseProps } from './SparklineArea';
import { SparklineAreaPattern } from './SparklineAreaPattern';

export type SparklineStrokeType = 'gradient' | 'solid';
export type SparklineFillType = 'dotted' | 'gradient' | 'gradientDotted';

export type SparklineBaseProps = SharedProps & {
  /** @danger Use this only if the background color beneath the Sparkline is a non-CDS color. It ensures an accessible contrast by returning either white or black when color is set to 'auto'. Accepts any valid color format (hex, RGB, RGBA). */
  background?: string;
  /** The color of the Sparkline graph's line. Accepts any raw color value (hex, rgba, hsl, etc) or 'auto'. Using 'auto' dynamically selects black or white for optimal accessibility. Does not work with CDS theme color names like 'fgPrimary' or CSS variables.  */
  color: string;
  /** Height of the Sparkline */
  height: number;
  /** Svg path as string. CDS offers a `useSparklinePath` which is useful to generate this string. This is accessible via `import { useSparklinePath } from '@coinbase/cds-common/visualizations/useSparklinePath';`. Alternatively, you can use product tailored tooling to generate the SVG path. This component only requires a valid path string is provided. */
  path?: string;
  /** Width of the Sparkline */
  width: number;
  /** an optional SparklineArea that can be used to fill in the Sparkline */
  children?: ElementChildren<SparklineAreaBaseProps>;
  /** Scales the sparkline to show more or less variance. Use a number less than 1 for less variance and a number greater than 1 for more variance. If you use a number greater than 1 it may clip the boundaries of the sparkline. */
  yAxisScalingFactor?: number;
  /**
   * Type of stroke to use for the line
   * - 'gradient': Gradient colored stroke line
   * - 'solid': Solid colored stroke line
   *
   * @default 'solid'
   */
  strokeType?: SparklineStrokeType;
  /**
   * Type of fill to use for the area
   * @default 'dotted'
   */
  fillType?: SparklineFillType;
};

export type SparklineProps = SparklineBaseProps;

/**
 * @deprecated Use LineChart instead.
 */
export const Sparkline = memo(
  forwardRef<Path | null, SparklineProps>(
    (
      {
        background,
        color,
        height,
        path,
        width,
        yAxisScalingFactor,
        children,
        strokeType = 'solid',
        fillType = 'dotted',
      },
      ref,
    ) => {
      const theme = useTheme();
      const patternId = useRef<string>(generateRandomId());

      const strokeColor =
        color !== 'auto'
          ? color
          : getAccessibleColor({
              background: background ?? theme.color.bg,
              foreground: 'auto',
              usage: 'graphic',
            });

      const translateProps = getSparklineTransform(width, height, yAxisScalingFactor);
      const hasChildren = !!children;
      const useModernFill = fillType === 'gradient' || fillType === 'gradientDotted';

      // Stroke gradient (for strokeType='gradient')
      const strokeGradient = useMemo(() => {
        if (strokeType !== 'gradient') return null;

        return getAccessibleForegroundGradient({
          background: background ?? theme.color.bg,
          color,
          colorScheme: theme.activeColorScheme,
          usage: 'graphic',
        });
      }, [strokeType, background, color, theme]);

      // Calculate gradient coordinates for modern fills
      const { gradientY1, gradientY2 } = useMemo(() => {
        if (!useModernFill) return { gradientY1: 0, gradientY2: 0 };

        if (!Number.isFinite(yAxisScalingFactor)) {
          return { gradientY1: 2, gradientY2: height - 2 };
        }

        const { yRange } = getSparklineRange({ height, width, yAxisScalingFactor });
        const pathHeight = Math.abs(yRange[0] - yRange[1]);
        const yTranslate = height / 2 - pathHeight / 2;

        return {
          gradientY1: yRange[1],
          gradientY2: height - yTranslate,
        };
      }, [useModernFill, height, width, yAxisScalingFactor]);

      const maskGradientId = `${patternId.current}-mask-gradient`;
      const maskId = `${patternId.current}-mask`;

      const defs = useMemo(() => {
        if (!strokeGradient && !hasChildren) return null;

        return (
          <Defs>
            {strokeGradient && (
              <LinearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="0%">
                {strokeGradient.map((item, i) => (
                  <Stop key={`${i}_${item}`} offset={item.offset} stopColor={item.color} />
                ))}
              </LinearGradient>
            )}
            {hasChildren && fillType === 'dotted' && (
              <SparklineAreaPattern color={strokeColor} id={patternId.current} />
            )}
            {hasChildren && fillType === 'gradient' && (
              <LinearGradient
                gradientUnits="userSpaceOnUse"
                id={patternId.current}
                x1="0"
                x2="0"
                y1={gradientY1}
                y2={gradientY2}
              >
                <Stop offset="0%" stopColor={strokeColor} stopOpacity={0.3} />
                <Stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
              </LinearGradient>
            )}
            {hasChildren && fillType === 'gradientDotted' && (
              <>
                <SparklineAreaPattern color={strokeColor} id={patternId.current} opacity={1} />
                <LinearGradient
                  gradientUnits="userSpaceOnUse"
                  id={maskGradientId}
                  x1="0"
                  x2="0"
                  y1={gradientY1}
                  y2={gradientY2}
                >
                  <Stop offset="0%" stopColor="white" stopOpacity={1} />
                  <Stop offset="100%" stopColor="white" stopOpacity={0} />
                </LinearGradient>
                <Mask id={maskId}>
                  <Rect fill={`url(#${maskGradientId})`} height={height} width={width} />
                </Mask>
              </>
            )}
          </Defs>
        );
      }, [
        strokeGradient,
        hasChildren,
        fillType,
        strokeColor,
        gradientY1,
        gradientY2,
        height,
        width,
        maskGradientId,
        maskId,
      ]);

      const stroke = strokeType === 'gradient' ? 'url(#gradient)' : strokeColor;
      const shouldPlaceDefsInside = useModernFill;

      return (
        <Svg fill="none" height={height} width={width}>
          {!shouldPlaceDefsInside && defs}
          <G {...translateProps}>
            {shouldPlaceDefsInside && defs}
            <Path
              ref={ref}
              d={path}
              stroke={stroke}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={borderWidth}
            />
            {generateSparklineAreaWithId(
              patternId.current,
              children,
              fillType === 'gradientDotted' ? maskId : undefined,
            )}
          </G>
        </Svg>
      );
    },
  ),
);

Sparkline.displayName = 'Sparkline';
