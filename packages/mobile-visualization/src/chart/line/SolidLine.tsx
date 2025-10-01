import { memo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { Path, type PathProps } from '../Path';

export type SolidLineProps = SharedProps &
  Omit<PathProps, 'fill' | 'strokeWidth'> & {
    fill?: string;
    strokeWidth?: number;
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
    ...props
  }) => {
    const theme = useTheme();

    return (
      <Path
        clipOffset={strokeWidth}
        fill={fill}
        stroke={stroke ?? theme.color.bgLine}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        strokeOpacity={strokeOpacity}
        strokeWidth={strokeWidth}
        {...props}
      />
    );
  },
);
