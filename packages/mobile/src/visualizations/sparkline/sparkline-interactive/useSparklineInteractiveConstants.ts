import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import {
  borderWidth,
  chartCompactHeight,
  chartHeight as chartHeightToken,
} from '@coinbase/cds-common/tokens/sparkline';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';

type Props = {
  compact?: boolean;
};

export function useSparklineInteractiveConstants({ compact = false }: Props) {
  const theme = useTheme();
  const { width: screenWidth } = useWindowDimensions();
  const { gutter } = useSparklineInteractiveContext();

  return useMemo(() => {
    const chartHorizontalGutter = theme.space[gutter];
    const chartWidth = screenWidth - chartHorizontalGutter * 2;
    const chartHeight = compact ? chartCompactHeight : chartHeightToken;
    const chartMarkerSize = theme.space[2];
    const SparklineInteractiveMinMaxLabelHeight = theme.space[3];
    const SparklineInteractiveMinMaxVerticalGutter = theme.space[0.5];
    const chartVerticalLineWidth: number = borderWidth;
    const xRange = [borderWidth, chartWidth - borderWidth];
    const yRange = [chartHeight - borderWidth, borderWidth];
    const startX = 0;
    const endX = xRange[1];

    return {
      chartHorizontalGutter,
      chartWidth,
      chartHeight,
      chartDimensionStyles: {
        height: chartHeight,
        width: chartWidth,
      },
      chartMarkerSize,
      SparklineInteractiveMinMaxLabelHeight,
      SparklineInteractiveMinMaxVerticalGutter,
      chartVerticalLineWidth,
      xRange,
      yRange,
      startX,
      endX,
    };
  }, [compact, gutter, screenWidth, theme.space]);
}
