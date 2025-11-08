import { memo, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { DashPathEffect } from '@shopify/react-native-skia';

import { Gradient } from '../gradient';
import { Path, type PathProps } from '../Path';

import { type LineComponentProps } from './SolidLine';

export type DottedLineProps = SharedProps &
  Omit<PathProps, 'fill' | 'strokeWidth' | 'd'> &
  LineComponentProps & {
    fill?: string;
    /**
     * Stroke dash array for the dotted pattern.
     * @default '0 4'
     */
    strokeDasharray?: string;
    /**
     * Vector effect (not used on mobile, for compatibility).
     */
    vectorEffect?: string;
  };

/**
 * A customizable dotted line component.
 * Supports gradient for gradient effects on the dots and smooth data transitions via AnimatedPath.
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
    gradient,
    yAxisId,
    d,
    animate,
    transitionConfig,
    ...props
  }) => {
    const theme = useTheme();

    // Parse strokeDasharray into intervals for DashPathEffect
    // todo: change the prop to be this array instead
    const dashIntervals = useMemo(() => {
      if (!strokeDasharray) return [0, 4]; // default
      return strokeDasharray.split(/[\s,]+/).map((v: string) => parseFloat(v));
    }, [strokeDasharray]);

    return (
      <Path
        animate={animate}
        clipOffset={strokeWidth}
        d={d}
        fill={fill}
        stroke={stroke ?? theme.color.bgLine}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        strokeOpacity={strokeOpacity}
        strokeWidth={strokeWidth}
        transitionConfigs={transitionConfig ? { update: transitionConfig } : undefined}
        {...props}
      >
        <DashPathEffect intervals={dashIntervals} />
        {gradient && <Gradient gradient={gradient} yAxisId={yAxisId} />}
      </Path>
    );
  },
);
