import { memo, type SVGProps } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';

import { Path, type PathProps } from '../Path';

import type { LineComponentProps } from './Line';

export type SolidLineProps = SharedProps &
  Omit<PathProps, 'fill' | 'strokeWidth'> &
  Pick<LineComponentProps, 'strokeWidth'> & {
    fill?: SVGProps<SVGPathElement>['fill'];
  };

/**
 * A customizable solid line component which uses path element.
 */
export const SolidLine = memo<SolidLineProps>(
  ({
    fill = 'none',
    stroke = 'var(--color-bgLine)',
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    strokeOpacity = 1,
    strokeWidth = 2,
    ...props
  }) => {
    return (
      <Path
        clipOffset={strokeWidth}
        fill={fill}
        stroke={stroke}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        strokeOpacity={strokeOpacity}
        strokeWidth={strokeWidth}
        {...props}
      />
    );
  },
);
