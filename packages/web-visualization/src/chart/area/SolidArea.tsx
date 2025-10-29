import { memo, useId, useMemo } from 'react';

import { useCartesianChartContext } from '../ChartProvider';
import { Gradient as GradientDef } from '../gradient';
import { Path, type PathProps } from '../Path';
import { getGradientConfig } from '../utils';

import type { AreaComponentProps } from './Area';

export type SolidAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity'> & AreaComponentProps;

/**
 * A customizable solid area component which uses Path.
 * When a gradient is provided, renders with gradient fill.
 * Otherwise, renders with solid fill (no automatic fade).
 */
export const SolidArea = memo<SolidAreaProps>(
  ({
    d,
    fill = 'var(--color-fgPrimary)',
    fillOpacity = 1,
    yAxisId,
    baseline,
    gradient: gradientProp,
    seriesId,
    ...props
  }) => {
    const context = useCartesianChartContext();
    const patternId = useId();

    const targetSeries = seriesId ? context.getSeries(seriesId) : undefined;
    const gradient = gradientProp ?? targetSeries?.gradient;

    const xScale = context.getXScale();
    const yScale = context.getYScale(yAxisId);
    const drawingArea = context.drawingArea;

    const gradientConfig = useMemo(() => {
      if (!gradient || !xScale || !yScale) return;
      return getGradientConfig(gradient, xScale, yScale);
    }, [gradient, xScale, yScale]);

    if (!gradientConfig) {
      return <Path d={d} fill={fill} fillOpacity={fillOpacity} {...props} />;
    }

    const gradientAxis = gradient?.axis ?? 'y';
    const gradientDirection = gradientAxis === 'x' ? 'horizontal' : 'vertical';

    return (
      <>
        <defs>
          <GradientDef
            config={gradientConfig}
            direction={gradientDirection}
            drawingArea={drawingArea}
            id={patternId}
          />
        </defs>
        <Path d={d} fill={`url(#${patternId})`} fillOpacity={fillOpacity} {...props} />
      </>
    );
  },
);
