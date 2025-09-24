import { memo, type SVGProps } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useChartContext } from '@coinbase/cds-common/visualizations/charts';

import { Path, type PathProps } from '../Path';

import type { LineComponentProps } from './Line';

// todo: reuse shared props
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
    disableAnimations,
    ...props
  }) => {
    const context = useChartContext();

    return (
      <Path
        clipOffset={strokeWidth}
        disableAnimations={disableAnimations !== undefined ? disableAnimations : !context.animate}
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
