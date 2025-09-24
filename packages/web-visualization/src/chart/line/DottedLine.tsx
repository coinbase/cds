import { memo, type SVGProps } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';

import { Path, type PathProps } from '../Path';

import type { LineComponentProps } from './Line';

export type DottedLineProps = SharedProps &
  Omit<PathProps, 'fill' | 'strokeWidth'> &
  Pick<LineComponentProps, 'strokeWidth'> & {
    fill?: SVGProps<SVGPathElement>['fill'];
  };

/**
 * A customizable dotted line component which uses path element.
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
    ...props
  }) => {
    return (
      <Path
        clipOffset={strokeWidth}
        fill={fill}
        stroke={stroke}
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
