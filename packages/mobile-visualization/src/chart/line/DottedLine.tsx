import { memo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useChartContext } from '@coinbase/cds-common/visualizations/charts';
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
    disableAnimations,
    ...props
  }) => {
    const context = useChartContext();
    const theme = useTheme();

    return (
      <Path
        disableAnimations={disableAnimations !== undefined ? disableAnimations : !context.animate}
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
