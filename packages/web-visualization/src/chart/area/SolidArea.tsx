import { memo, useId } from 'react';

import { useCartesianChartContext } from '../ChartProvider';
import { Gradient } from '../gradient';
import { Path, type PathProps } from '../Path';

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
    animate,
    transition,
    ...props
  }) => {
    const context = useCartesianChartContext();
    const patternId = useId();

    const targetSeries = seriesId ? context.getSeries(seriesId) : undefined;
    const gradient = gradientProp ?? targetSeries?.gradient;

    if (!gradient) {
      return (
        <Path
          animate={animate}
          d={d}
          fill={fill}
          fillOpacity={fillOpacity}
          transition={transition}
          {...props}
        />
      );
    }

    return (
      <>
        <defs>
          <Gradient
            animate={animate}
            gradient={gradient}
            id={patternId}
            transition={transition}
            yAxisId={yAxisId}
          />
        </defs>
        <Path
          animate={animate}
          d={d}
          fill={`url(#${patternId})`}
          fillOpacity={fillOpacity}
          transition={transition}
          {...props}
        />
      </>
    );
  },
);
