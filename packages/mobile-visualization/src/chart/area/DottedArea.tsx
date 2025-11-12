import { memo, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Group, Skia } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { Gradient } from '../gradient';
import { Path, type PathProps } from '../Path';
import { createGradient, getBaseline } from '../utils';
import { getDottedAreaPath } from '../utils/path';
import { usePathTransition } from '../utils/transition';

import type { AreaComponentProps } from './Area';

export type DottedAreaProps = Pick<
  PathProps,
  | 'initialPath'
  | 'children'
  | 'stroke'
  | 'strokeOpacity'
  | 'strokeWidth'
  | 'strokeCap'
  | 'strokeJoin'
  | 'clipRect'
  | 'clipPath'
  | 'clipOffset'
> &
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
     * @note only used when no gradient is provided
     * @default 1
     */
    peakOpacity?: number;
    /**
     * Opacity at the baseline (0 or edge closest to 0).
     * @note only used when no gradient is provided
     * @default 0
     */
    baselineOpacity?: number;
  };

/**
 * A customizable dotted area gradient component.
 * When no gradient is provided, renders a default gradient based
 * on the fill color and peak/baseline opacities.
 */
export const DottedArea = memo<DottedAreaProps>(
  ({
    d,
    fill: fillProp,
    patternSize = 4,
    dotSize = 1,
    peakOpacity = 1,
    baselineOpacity = 0,
    baseline,
    yAxisId,
    gradient: gradientProp,
    animate: animateProp,
    transition,
    ...pathProps
  }) => {
    const theme = useTheme();
    const { drawingArea, animate, getYAxis } = useCartesianChartContext();

    const yAxisConfig = getYAxis(yAxisId);

    const fill = useMemo(
      () => fillProp ?? theme.color.fgPrimary,
      [fillProp, theme.color.fgPrimary],
    );

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
      currentPath: d,
      transition,
    });

    const staticClipPath = useMemo(() => {
      if (!d) return;
      return Skia.Path.MakeFromSVGString(d) ?? undefined;
    }, [d]);

    const gradient = useMemo(() => {
      if (gradientProp) return gradientProp;
      if (!yAxisConfig) return;

      const baselineValue = getBaseline(yAxisConfig.domain, baseline);
      return createGradient(yAxisConfig.domain, baselineValue, fill, peakOpacity, baselineOpacity);
    }, [gradientProp, yAxisConfig, fill, baseline, peakOpacity, baselineOpacity]);

    return (
      <Group clip={animate ? animatedClipPath : staticClipPath}>
        <Path
          animate={animateProp ?? animate}
          d={dottedPath}
          fill={fill}
          transition={transition}
          {...pathProps}
        >
          {gradient && <Gradient gradient={gradient} yAxisId={yAxisId} />}
        </Path>
      </Group>
    );
  },
);
