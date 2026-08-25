import { memo, type PropsWithChildren, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { Group, LinearGradient, Rect, vec } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';

const axisTickLabelOverflowFadeWidth = 30;
const maskOpaque = 'rgba(255, 255, 255, 1)';
const maskClear = 'rgba(255, 255, 255, 0)';

export type AxisTickLabelOverflowMaskProps = SharedProps &
  PropsWithChildren<{
    /**
     * Fade along the chart edges for this axis (`x`: left/right, `y`: top/bottom).
     */
    axis: 'x' | 'y';
  }>;

export const AxisTickLabelOverflowMask = memo<AxisTickLabelOverflowMaskProps>(
  ({ axis, children }) => {
    const { width: chartWidth, height: chartHeight } = useCartesianChartContext();
    const fadeWidth = axisTickLabelOverflowFadeWidth;
    const isXAxis = axis === 'x';

    const fadeX = Math.min(fadeWidth, chartWidth / 2) / Math.max(chartWidth, 1);
    const fadeY = Math.min(fadeWidth, chartHeight / 2) / Math.max(chartHeight, 1);

    const colors = useMemo(() => [maskClear, maskOpaque, maskOpaque, maskClear], []);
    const positions = useMemo(
      () => (isXAxis ? [0, fadeX, 1 - fadeX, 1] : [0, fadeY, 1 - fadeY, 1]),
      [fadeX, fadeY, isXAxis],
    );

    if (chartWidth <= 0 || chartHeight <= 0) {
      return <Group>{children}</Group>;
    }

    return (
      <Group layer>
        {children}
        <Rect blendMode="dstIn" height={chartHeight} width={chartWidth} x={0} y={0}>
          <LinearGradient
            colors={colors}
            end={isXAxis ? vec(chartWidth, 0) : vec(0, chartHeight)}
            positions={positions}
            start={vec(0, 0)}
          />
        </Rect>
      </Group>
    );
  },
);
