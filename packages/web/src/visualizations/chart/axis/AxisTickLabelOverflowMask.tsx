import { memo, useId, type PropsWithChildren } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';

import { useCartesianChartContext } from '../ChartProvider';

const axisTickLabelOverflowFadeWidth = 30;

export type AxisTickLabelOverflowMaskProps = SharedProps &
  PropsWithChildren<{
    /**
     * Fade along the chart edges for this axis (`x`: left/right, `y`: top/bottom).
     */
    axis: 'x' | 'y';
  }>;

/**
 * Masks tick-label children so they fade at the chart/SVG outer edges
 * without painting over other axes.
 */
export const AxisTickLabelOverflowMask = memo<AxisTickLabelOverflowMaskProps>(
  ({ axis, children, testID }) => {
    const { width: chartWidth, height: chartHeight } = useCartesianChartContext();
    const reactId = useId();
    const maskId = `${reactId}-mask`;
    const fadeWidth = axisTickLabelOverflowFadeWidth;
    const isXAxis = axis === 'x';

    if (chartWidth <= 0 || chartHeight <= 0) {
      return children;
    }

    const fadeX = Math.min(fadeWidth, chartWidth / 2) / chartWidth;
    const fadeY = Math.min(fadeWidth, chartHeight / 2) / chartHeight;

    return (
      <g data-testid={testID}>
        <defs>
          {isXAxis ? (
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id={`${reactId}-fade`}
              x1={0}
              x2={chartWidth}
              y1={0}
              y2={0}
            >
              <stop offset={0} stopColor="#fff" stopOpacity={0} />
              <stop offset={fadeX} stopColor="#fff" stopOpacity={1} />
              <stop offset={1 - fadeX} stopColor="#fff" stopOpacity={1} />
              <stop offset={1} stopColor="#fff" stopOpacity={0} />
            </linearGradient>
          ) : (
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id={`${reactId}-fade`}
              x1={0}
              x2={0}
              y1={0}
              y2={chartHeight}
            >
              <stop offset={0} stopColor="#fff" stopOpacity={0} />
              <stop offset={fadeY} stopColor="#fff" stopOpacity={1} />
              <stop offset={1 - fadeY} stopColor="#fff" stopOpacity={1} />
              <stop offset={1} stopColor="#fff" stopOpacity={0} />
            </linearGradient>
          )}
          <mask
            height={chartHeight}
            id={maskId}
            maskUnits="userSpaceOnUse"
            width={chartWidth}
            x={0}
            y={0}
          >
            <rect
              fill={`url(#${reactId}-fade)`}
              height={chartHeight}
              width={chartWidth}
              x={0}
              y={0}
            />
          </mask>
        </defs>
        <g mask={`url(#${maskId})`}>{children}</g>
      </g>
    );
  },
);
