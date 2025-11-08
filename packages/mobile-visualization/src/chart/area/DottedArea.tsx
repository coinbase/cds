import { memo, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Group, Skia } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { Gradient } from '../gradient';
import { Path, type PathProps } from '../Path';
import { type GradientDefinition } from '../utils/gradient';
import { getDottedAreaPath } from '../utils/path';
import { usePathTransition } from '../utils/transition';

import { type AreaComponentProps } from './SolidArea';

export type DottedAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity'> &
  AreaComponentProps & {
    /**
     * Size of the pattern unit (width and height).
     * @default 4
     */
    patternSize?: number;
    /**
     * Size of the dots within the pattern.
     * @default 1
     */
    dotSize?: number;
    /**
     * Opacity at the peak values (top/bottom of gradient).
     * @default 1
     */
    peakOpacity?: number;
    /**
     * Opacity at the baseline (0 or edge closest to 0).
     * @default 0
     */
    baselineOpacity?: number;
  };

/**
 * Efficient dotted area component with gradient opacity support.
 * Uses SVG path circles for the dot pattern and LinearGradient for colors/opacity.
 * Supports both data-based color gradients and simple opacity gradients.
 */
export const DottedArea = memo<DottedAreaProps>(
  ({
    d,
    fill: fillProp,
    fillOpacity = 1,
    patternSize = 4,
    dotSize = 1,
    peakOpacity = 1,
    baselineOpacity = 0,
    baseline,
    yAxisId,
    clipRect,
    gradient: gradientProp,
    animate: animateProp,
    transitionConfig,
  }) => {
    const theme = useTheme();
    const context = useCartesianChartContext();

    const drawingArea = clipRect ?? context.drawingArea;
    const fill = fillProp ?? theme.color.fgPrimary;

    const animate = animateProp ?? context.animate;

    const yAxisConfig = context.getYAxis(yAxisId);

    const dottedPath = useMemo(() => {
      if (!drawingArea) return '';

      return getDottedAreaPath(
        {
          x: drawingArea.x,
          y: drawingArea.y,
          width: drawingArea.width,
          height: drawingArea.height,
        },
        patternSize,
        dotSize,
      );
    }, [drawingArea, patternSize, dotSize]);

    const animatedClipPath = usePathTransition({
      currentPath: d ?? '',
      transitionConfigs: transitionConfig ? { update: transitionConfig } : undefined,
    });

    const staticClipPath = useMemo(() => {
      if (!d) return;
      return Skia.Path.MakeFromSVGString(d) ?? undefined;
    }, [d]);

    const areaClipPath = animate ? animatedClipPath : staticClipPath;

    const gradient = useMemo((): GradientDefinition | undefined => {
      if (gradientProp) return gradientProp;
      if (!yAxisConfig) return;

      const { min, max } = yAxisConfig.domain;
      const baselineValue = min >= 0 ? min : max <= 0 ? max : (baseline ?? 0);

      // Diverging gradient (data crosses zero)
      if (min < 0 && max > 0) {
        return {
          axis: 'y',
          stops: [
            { offset: min, color: fill, opacity: peakOpacity },
            { offset: baselineValue, color: fill, opacity: baselineOpacity },
            { offset: max, color: fill, opacity: peakOpacity },
          ],
        };
      }

      // Simple gradient (all positive or all negative)
      const peakValue = min >= 0 ? max : min;
      return {
        axis: 'y',
        stops:
          max <= 0
            ? [
                { offset: peakValue, color: fill, opacity: peakOpacity },
                { offset: baselineValue, color: fill, opacity: baselineOpacity },
              ]
            : [
                { offset: baselineValue, color: fill, opacity: baselineOpacity },
                { offset: peakValue, color: fill, opacity: peakOpacity },
              ],
      };
    }, [gradientProp, yAxisConfig, fill, baseline, peakOpacity, baselineOpacity]);

    if (!gradient) return;

    if (!drawingArea || !dottedPath || !areaClipPath) return;

    return (
      <Group clip={areaClipPath}>
        <Path
          animate={animate}
          clipRect={clipRect}
          d={dottedPath}
          fill={fill}
          fillOpacity={fillOpacity}
          transitionConfigs={transitionConfig ? { update: transitionConfig } : undefined}
        >
          <Gradient gradient={gradient} yAxisId={yAxisId} />
        </Path>
      </Group>
    );
  },
);
