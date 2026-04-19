import { useCallback, useRef, useState } from 'react';

import { useToggler } from '@coinbase/cds-common/hooks/useToggler';
import type { ChartData, ChartDataPoint, ChartScrubParams, SparklineInteractiveHeaderRef, SparklineInteractiveSubHead } from "@coinbase/cds-web/visualizations";
import { Sparkline, SparklineArea, SparklineGradient, SparklineInteractive, SparklineInteractiveHeader } from "@coinbase/cds-web/visualizations";
import { CartesianChart, PeriodSelector } from "@coinbase/cds-web/visualizations/chart";
import { SparklineInteractiveContent } from "@coinbase/cds-web/visualizations/sparkline";
import { useTheme } from '@coinbase/cds-web/hooks/useTheme';

/** Representative pattern: chart hook using root-barrel type imports + named sub-path imports. */
type ChartPeriod = 'hour' | 'day' | 'week' | 'month' | 'year';

type UseSparklineChartParams = {
  defaultLabel: string;
  defaultTitle: string;
  defaultSubHead?: SparklineInteractiveSubHead;
};

export function useSparklineChart({
  defaultLabel,
  defaultTitle,
  defaultSubHead,
}: UseSparklineChartParams) {
  const theme = useTheme();
  const headerRef = useRef<SparklineInteractiveHeaderRef>(null);
  const [activePeriod, setActivePeriod] = useState<ChartPeriod>('day');
  const [isScrubbing, { toggleOn: handleScrubStart, toggleOff: handleScrubEnd }] = useToggler(false);

  const handleScrub = useCallback(
    ({ point }: ChartScrubParams<string>) => {
      headerRef.current?.update({ title: String(point.value) });
    },
    [],
  );

  const handlePointSelect = useCallback(
    ({ value }: ChartDataPoint) => {
      setActivePeriod('day');
      headerRef.current?.update({ title: String(value) });
    },
    [],
  );

  return {
    theme,
    headerRef,
    activePeriod,
    isScrubbing,
    handleScrubStart,
    handleScrubEnd,
    handleScrub,
    handlePointSelect,
  };
}

export type { ChartData, ChartDataPoint };
export { CartesianChart, PeriodSelector, Sparkline, SparklineArea, SparklineGradient, SparklineInteractive, SparklineInteractiveHeader, SparklineInteractiveContent };
