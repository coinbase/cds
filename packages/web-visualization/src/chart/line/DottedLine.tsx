import { memo, type SVGProps, useId } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';

import { Gradient } from '../gradient';
import { Path, type PathProps } from '../Path';

import type { LineComponentProps } from './Line';

export type DottedLineProps = SharedProps &
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
    | 'vectorEffect'
  > &
  LineComponentProps & {
    fill?: SVGProps<SVGPathElement>['fill'];
  };

/**
 * A customizable dotted line component.
 * Supports gradient for gradient effects on the dots.
 */
export const DottedLine = memo<DottedLineProps>(
  ({
    fill = 'none',
    stroke = 'var(--color-fgPrimary)',
    strokeDasharray = '0 4',
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    strokeOpacity = 1,
    strokeWidth = 2,
    vectorEffect = 'non-scaling-stroke',
    gradient,
    yAxisId,
    animate,
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
              transition={transition}
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
          strokeDasharray={strokeDasharray}
          strokeLinecap={strokeLinecap}
          strokeLinejoin={strokeLinejoin}
          strokeOpacity={strokeOpacity}
          strokeWidth={strokeWidth}
          transition={transition}
          vectorEffect={vectorEffect}
          {...props}
        />
      </>
    );
  },
);
