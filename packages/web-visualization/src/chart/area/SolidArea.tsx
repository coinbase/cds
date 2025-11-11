import { memo, useId } from 'react';

import { Gradient } from '../gradient';
import { Path, type PathProps } from '../Path';

import type { AreaComponentProps } from './Area';

export type SolidAreaProps = Pick<
  PathProps,
  | 'stroke'
  | 'strokeWidth'
  | 'strokeOpacity'
  | 'strokeLinecap'
  | 'strokeLinejoin'
  | 'strokeDasharray'
  | 'strokeDashoffset'
  | 'clipRect'
  | 'clipOffset'
  | 'children'
> &
  AreaComponentProps;

/**
 * A customizable solid area component which uses Path.
 * When a gradient is provided, renders with gradient fill.
 * Otherwise, renders with solid fill.
 */
export const SolidArea = memo<SolidAreaProps>(
  ({
    d,
    fill = 'var(--color-fgPrimary)',
    fillOpacity = 1,
    yAxisId,
    animate,
    transition,
    gradient,
    ...pathProps
  }) => {
    const patternId = useId();

    return (
      <>
        {gradient && (
          <defs>
            <Gradient
              animate={animate}
              gradient={gradient}
              id={patternId}
              transition={transition}
              yAxisId={yAxisId}
            />
          </defs>
        )}
        <Path
          animate={animate}
          d={d}
          fill={gradient ? `url(#${patternId})` : fill}
          fillOpacity={fillOpacity}
          transition={transition}
          {...pathProps}
        />
      </>
    );
  },
);
