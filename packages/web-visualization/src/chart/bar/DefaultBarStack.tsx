import React, { memo, useMemo, useRef } from 'react';
import { getBarPath } from '@coinbase/cds-common/visualizations/charts';
import { generateRandomId } from '@coinbase/cds-utils';
import { m } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';

import type { BarStackComponentProps } from './BarStack';

export type DefaultBarStackProps = BarStackComponentProps & {
  /**
   * Custom class name for the stack group.
   */
  className?: string;
  /**
   * Custom styles for the stack group.
   */
  style?: React.CSSProperties;
};

/**
 * Default stack component that renders children in a group with animated clip path.
 */
export const DefaultBarStack = memo<DefaultBarStackProps>(
  ({
    children,
    className,
    style,
    width,
    height,
    x,
    y,
    borderRadius = 4,
    roundTop = true,
    roundBottom = true,
    yOrigin,
  }) => {
    const { animate } = useCartesianChartContext();
    const clipPathId = useRef(generateRandomId()).current;

    const clipPathData = useMemo(() => {
      return getBarPath(x, y, width, height, borderRadius, roundTop, roundBottom);
    }, [x, y, width, height, borderRadius, roundTop, roundBottom]);

    const initialClipPathData = useMemo(() => {
      return getBarPath(x, yOrigin ?? y + height, width, 1, borderRadius, roundTop, roundBottom);
    }, [x, yOrigin, y, height, width, borderRadius, roundTop, roundBottom]);

    return (
      <>
        <defs>
          <clipPath id={clipPathId}>
            {animate ? (
              <m.path
                animate={{ d: clipPathData }}
                initial={{ d: initialClipPathData }}
                transition={{ type: 'spring', duration: 1, bounce: 0 }}
              />
            ) : (
              <path d={clipPathData} />
            )}
          </clipPath>
        </defs>
        <g className={className} clipPath={`url(#${clipPathId})`} style={style}>
          {children}
        </g>
      </>
    );
  },
);
