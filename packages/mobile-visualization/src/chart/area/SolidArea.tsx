import { memo } from 'react';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { Gradient } from '../gradient';
import { Path, type PathProps } from '../Path';

import type { AreaComponentProps } from './Area';

export type SolidAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity'> & AreaComponentProps;

/**
 * A customizable solid area component.
 * When a gradient is provided, renders with gradient fill.
 * Otherwise, renders with solid fill.
 */
export const SolidArea = memo<SolidAreaProps>(
  ({ d, fill, fillOpacity = 1, yAxisId, animate, transition, gradient, ...props }) => {
    const theme = useTheme();

    return (
      <Path
        animate={animate}
        d={d}
        fill={fill ?? theme.color.fgPrimary}
        fillOpacity={fillOpacity}
        transition={transition}
        {...props}
      >
        {gradient && <Gradient gradient={gradient} yAxisId={yAxisId} />}
      </Path>
    );
  },
);
