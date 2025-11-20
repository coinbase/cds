import { memo } from 'react';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { Gradient } from '../gradient';
import { Path, type PathProps } from '../Path';

import type { LineComponentProps } from './Line';

export type SolidLineProps = Pick<
  PathProps,
  'initialPath' | 'children' | 'strokeCap' | 'strokeJoin' | 'clipRect' | 'clipPath' | 'clipOffset'
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
    strokeCap = 'round',
    strokeJoin = 'round',
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
        strokeCap={strokeCap}
        strokeJoin={strokeJoin}
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
