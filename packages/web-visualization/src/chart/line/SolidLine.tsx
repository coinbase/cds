import { memo, type SVGProps, useId, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';

import { useCartesianChartContext } from '../ChartProvider';
import { Gradient as GradientDef } from '../gradient/Gradient';
import { Path, type PathProps } from '../Path';
import { getGradientConfig, type Gradient } from '../utils/gradient';

import type { LineComponentProps } from './Line';

export type SolidLineProps = SharedProps &
  Omit<PathProps, 'fill' | 'strokeWidth'> &
  Pick<LineComponentProps, 'strokeWidth' | 'gradient' | 'seriesId' | 'yAxisId'> & {
    fill?: SVGProps<SVGPathElement>['fill'];
  };

/**
 * A customizable solid line component.
 * Supports gradient for gradient effects.
 */
export const SolidLine = memo<SolidLineProps>(
  ({
    fill = 'none',
    stroke = 'var(--color-bgLine)',
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    strokeOpacity = 1,
    strokeWidth = 2,
    gradient,
    seriesId,
    yAxisId,
    ...props
  }) => {
    const gradientId = useId();
    const context = useCartesianChartContext();

    const xScale = context.getXScale();
    const yScale = context.getYScale(yAxisId);
    const drawingArea = context.drawingArea;

    const gradientConfig = useMemo(() => {
      if (!gradient || !xScale || !yScale) return;
      return getGradientConfig(gradient, xScale, yScale);
    }, [gradient, xScale, yScale]);

    // Determine gradient direction based on gradient axis
    const gradientDirection = gradient?.axis === 'x' ? 'horizontal' : 'vertical';

    return (
      <>
        {gradientConfig && (
          <defs>
            <GradientDef
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
          strokeLinecap={strokeLinecap}
          strokeLinejoin={strokeLinejoin}
          strokeOpacity={strokeOpacity}
          strokeWidth={strokeWidth}
          {...props}
        />
      </>
    );
  },
);
