import { memo } from 'react';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { DashPathEffect } from '@shopify/react-native-skia';

import { Gradient } from '../gradient';
import { Path, type PathProps } from '../Path';

import type { LineComponentProps } from './Line';

export type DottedLineProps = Pick<
  PathProps,
  'initialPath' | 'children' | 'strokeCap' | 'strokeJoin' | 'clipRect' | 'clipPath' | 'clipOffset'
> &
  LineComponentProps & {
    fill?: string;
    /**
     * Stroke dash array for the dotted pattern.
     * @default [0, 4]
     */
    dashIntervals?: number[];
  };

/**
 * A customizable dotted line component.
 * Supports gradient for gradient effects on the dots and smooth data transitions via AnimatedPath.
 */
export const DottedLine = memo<DottedLineProps>(
  ({
    fill = 'none',
    stroke,
    dashIntervals = [0, 4],
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
        <DashPathEffect intervals={dashIntervals} />
        {gradient && <Gradient gradient={gradient} yAxisId={yAxisId} />}
      </Path>
    );
  },
);
