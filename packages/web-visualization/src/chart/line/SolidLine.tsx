import { memo, type SVGProps, useId } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';

import { Gradient } from '../gradient';
import { Path, type PathProps } from '../Path';

import type { LineComponentProps } from './Line';

export type SolidLineProps = SharedProps &
  Pick<
    PathProps,
    | 'className'
    | 'clipOffset'
    | 'clipRect'
    | 'strokeLinecap'
    | 'strokeLinejoin'
    | 'strokeDasharray'
    | 'strokeDashoffset'
    | 'style'
  > &
  LineComponentProps & {
    fill?: SVGProps<SVGPathElement>['fill'];
  };

/**
 * A customizable solid line component.
 * Supports gradient for gradient effects and smooth data transitions.
 */
export const SolidLine = memo<SolidLineProps>(
  ({
    fill = 'none',
    stroke = 'var(--color-fgPrimary)',
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    strokeOpacity = 1,
    strokeWidth = 2,
    gradient,
    yAxisId,
    animate,
    transitions,
    transition,
    d,
    ...props
  }) => {
    const gradientId = useId();

    return (
      <>
        {gradient && (
          <defs>
            <Gradient
              animate={animate}
              gradient={gradient}
              id={gradientId}
              transition={transitions?.update ?? transition}
              yAxisId={yAxisId}
            />
          </defs>
        )}
        <Path
          animate={animate}
          clipOffset={strokeWidth}
          d={d}
          fill={fill}
          stroke={gradient ? `url(#${gradientId})` : stroke}
          strokeLinecap={strokeLinecap}
          strokeLinejoin={strokeLinejoin}
          strokeOpacity={strokeOpacity}
          strokeWidth={strokeWidth}
          transition={transition}
          transitions={transitions}
          {...props}
        />
      </>
    );
  },
);
