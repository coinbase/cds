import { memo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useChartContext } from '@coinbase/cds-common/visualizations/charts';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { Path, type PathProps } from '../Path';

// todo: reuse shared props
export type SolidLineProps = SharedProps &
  Omit<PathProps, 'fill'> & {
    fill?: string;
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
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        strokeOpacity={strokeOpacity}
        strokeWidth={strokeWidth}
        {...props}
      />
    );
  },
);
