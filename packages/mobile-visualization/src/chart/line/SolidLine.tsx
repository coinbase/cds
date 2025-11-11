import { memo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { Gradient } from '../gradient';
import { Path, type PathProps } from '../Path';

import type { LineComponentProps } from './Line';

export type SolidLineProps = SharedProps &
  Pick<
    PathProps,
    | 'initialPath'
    | 'children'
    | 'strokeLinecap'
    | 'strokeLinejoin'
    | 'clipRect'
    | 'clipPath'
    | 'clipOffset'
  > &
  LineComponentProps & {
    fill?: string;
  };

/**
 * A customizable solid line component.
 * Supports gradient for gradient effects and smooth data transitions via AnimatedPath.
 */
export const SolidLine = memo<SolidLineProps>(
  ({
    fill = 'none',
    stroke,
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    strokeOpacity = 1,
    strokeWidth = 2,
    gradient,
    yAxisId,
    d,
    animate,
    transition,
    ...props
  }) => {
    const theme = useTheme();

    return (
      <Path
        animate={animate}
        clipOffset={strokeWidth}
        d={d}
        fill={fill}
        stroke={stroke ?? theme.color.fgPrimary}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        strokeOpacity={strokeOpacity}
        strokeWidth={strokeWidth}
        transition={transition}
        {...props}
      >
        {gradient && <Gradient gradient={gradient} yAxisId={yAxisId} />}
      </Path>
    );
  },
);
