import { memo, type SVGProps, useId, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';

import { useCartesianChartContext } from '../ChartProvider';
import { Gradient } from '../gradient/Gradient';
import { Path, type PathProps } from '../Path';
import { getColorMapScale, processColorMap } from '../utils/colorMap';

import type { LineComponentProps } from './Line';

export type DottedLineProps = SharedProps &
  Omit<PathProps, 'fill' | 'strokeWidth'> &
  Pick<LineComponentProps, 'strokeWidth' | 'colorMap' | 'seriesId' | 'yAxisId'> & {
    fill?: SVGProps<SVGPathElement>['fill'];
  };

/**
 * A customizable dotted line component.
 * Supports colorMap for gradient effects on the dots.
 */
export const DottedLine = memo<DottedLineProps>(
  ({
    fill = 'none',
    stroke = 'var(--color-bgLine)',
    strokeDasharray = '0 4',
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    strokeOpacity = 1,
    strokeWidth = 2,
    vectorEffect = 'non-scaling-stroke',
    colorMap,
    seriesId,
    yAxisId,
    ...props
  }) => {
    const gradientId = useId();
    const context = useCartesianChartContext();

    const xScale = context.getXScale();
    const yScale = context.getYScale(yAxisId);
    const drawingArea = context.drawingArea;

    // Process colorMap to get gradient configuration
    const gradientConfig = useMemo(() => {
      if (!colorMap || !xScale || !yScale) return null;

      const scale = getColorMapScale(colorMap, xScale, yScale);
      if (!scale) return null;

      return processColorMap(colorMap, scale);
    }, [colorMap, xScale, yScale]);

    // Determine gradient direction based on colorMap axis
    const gradientDirection = colorMap?.axis === 'x' ? 'horizontal' : 'vertical';

    return (
      <>
        {gradientConfig && (
          <defs>
            <Gradient
              config={gradientConfig}
              direction={gradientDirection}
              drawingArea={drawingArea}
              id={gradientId}
            />
          </defs>
        )}
        <Path
          clipOffset={strokeWidth}
          fill={fill}
          stroke={gradientConfig ? `url(#${gradientId})` : stroke}
          strokeDasharray={strokeDasharray}
          strokeLinecap={strokeLinecap}
          strokeLinejoin={strokeLinejoin}
          strokeOpacity={strokeOpacity}
          strokeWidth={strokeWidth}
          vectorEffect={vectorEffect}
          {...props}
        />
      </>
    );
  },
);
