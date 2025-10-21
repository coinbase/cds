import { memo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';

import { Path, type PathProps } from '../Path';
import type { ColorMap } from '../utils/colorMap';

export type SolidLineProps = SharedProps &
  Omit<PathProps, 'fill' | 'strokeWidth'> & {
    fill?: string;
    strokeWidth?: number;
    /**
     * Color mapping configuration (not used by SolidLine, but accepted for API consistency).
     * SolidLine always uses solid `stroke` color.
     */
    colorMap?: ColorMap;
  };

/**
 * A customizable solid line component which uses path element.
 */
export const SolidLine = memo<SolidLineProps>(
  ({
    fill = 'none',
    stroke,
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    strokeOpacity = 1,
    strokeWidth = 2,
    colorMap, // Ignored - for API consistency only
    ...props
  }) => {
    return (
      <Path
        clipOffset={strokeWidth}
        fill={fill}
        stroke={stroke ?? 'blue'}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        strokeOpacity={strokeOpacity}
        strokeWidth={strokeWidth}
        {...props}
      />
    );
  },
);
