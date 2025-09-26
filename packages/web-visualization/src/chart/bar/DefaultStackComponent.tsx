import React, { memo, useMemo, useRef } from 'react';
import type { ThemeVars } from '@coinbase/cds-common';
import { getBarPath } from '@coinbase/cds-common/visualizations/charts';
import { generateRandomId } from '@coinbase/cds-utils';
import { useTheme } from '@coinbase/cds-web';
import { m } from 'framer-motion';

import { useChartContext } from '../ChartProvider';

export type StackComponentBaseProps = {
  /**
   * The x position of the stack.
   */
  x: number;
  /**
   * The y position of the stack.
   */
  y: number;
  /**
   * The width of the stack.
   */
  width: number;
  /**
   * The height of the stack.
   */
  height: number;
  /**
   * The bar elements to render within the stack.
   */
  children: React.ReactNode;
  /**
   * The index of the category this stack belongs to.
   */
  categoryIndex: number;
  /**
   * Border radius from theme (e.g., 100, 200, etc.).
   * @default 100
   */
  borderRadius?: ThemeVars.BorderRadius;
  /**
   * Whether to round the top corners.
   */
  roundTop?: boolean;
  /**
   * Whether to round the bottom corners.
   */
  roundBottom?: boolean;
  /**
   * The y-origin for animations (baseline position).
   */
  yOrigin?: number;
};

export type StackComponentProps = StackComponentBaseProps & {
  /**
   * Custom class name for the stack group.
   */
  className?: string;
  /**
   * Custom styles for the stack group.
   */
  style?: React.CSSProperties;
};

export type StackComponent = React.FC<StackComponentProps>;

/**
 * Default stack component that renders children in a group with animated clip path.
 */
export const DefaultStackComponent = memo<StackComponentProps>(function DefaultStackComponent({
  children,
  className,
  style,
  width,
  height,
  x,
  y,
  borderRadius = 100,
  roundTop = true,
  roundBottom = true,
  yOrigin,
}) {
  const theme = useTheme();
  const { animate } = useChartContext();
  const clipPathId = useRef(generateRandomId()).current;

  const clipPathData = useMemo(() => {
    return getBarPath(x, y, width, height, theme.borderRadius[borderRadius], roundTop, roundBottom);
  }, [x, y, width, height, theme.borderRadius, borderRadius, roundTop, roundBottom]);

  const initialClipPathData = useMemo(() => {
    return getBarPath(
      x,
      yOrigin ?? y + height,
      width,
      1,
      theme.borderRadius[borderRadius],
      roundTop,
      roundBottom,
    );
  }, [x, yOrigin, y, height, width, theme.borderRadius, borderRadius, roundTop, roundBottom]);

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
});
