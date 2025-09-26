import { memo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { Path, type PathProps } from '../Path';

export type DottedLineProps = SharedProps &
  Omit<PathProps, 'fill'> & {
    fill?: string;
  };

/**
 * A customizable dotted line component which uses path element.
 */
export const DottedLine = memo<DottedLineProps>(
  ({
    fill = 'none',
    stroke,
    strokeDasharray = '0 4',
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    strokeOpacity = 1,
    strokeWidth = 2,
    vectorEffect = 'non-scaling-stroke',
    ...props
  }) => {
    const theme = useTheme();

    return (
      <Path
        fill={fill}
        stroke={stroke ?? theme.color.bgLine}
        strokeDasharray={strokeDasharray}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        strokeOpacity={strokeOpacity}
        strokeWidth={strokeWidth}
        vectorEffect={vectorEffect}
        {...props}
      />
    );
  },
);
