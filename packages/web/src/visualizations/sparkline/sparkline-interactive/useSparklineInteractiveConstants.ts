import { useMemo } from 'react';
import {
  borderWidth,
  chartCompactHeight,
  chartHeight as chartHeightToken,
} from '@coinbase/cds-common/tokens/sparkline';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';

export function useSparklineInteractiveConstants() {
  const { width: chartWidth, compact } = useSparklineInteractiveContext();

  return useMemo(() => {
    const chartHeight = compact ? chartCompactHeight : chartHeightToken;
    const xRange = [borderWidth, chartWidth - borderWidth];
    const yRange = [chartHeight - borderWidth, borderWidth];
    const startX = 0;
    const endX = xRange[1];

    return {
      chartWidth,
      chartHeight,
      chartDimensionStyles: {
        height: chartHeight,
        width: chartWidth,
      },
      xRange,
      yRange,
      startX,
      endX,
    };
  }, [chartWidth, compact]);
}
