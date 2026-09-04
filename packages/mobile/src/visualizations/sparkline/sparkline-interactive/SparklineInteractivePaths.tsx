import React, { memo, useCallback, useRef } from 'react';
import type { ChartTimeseries } from '@coinbase/cds-common/types/Chart';

import type { SparklineInteractiveBaseProps } from './SparklineInteractive';
import { SparklineInteractiveAnimatedPath } from './SparklineInteractiveAnimatedPath';
import {
  SparklineInteractiveTimeseriesPaths,
  type TimeseriesPathOnRenderParams,
} from './SparklineInteractiveTimeseriesPaths';
import { useSparklineInteractiveConstants } from './useSparklineInteractiveConstants';

export type SparklineInteractivePathsProps<Period extends string> = Pick<
  SparklineInteractiveBaseProps<Period>,
  'fill' | 'fillType' | 'yAxisScalingFactor' | 'strokeColor' | 'hoverData' | 'compact'
> & {
  showHoverData: boolean;
  path: string;
  area: string;
  selectedPeriod: Period;
};

function SparklineInteractivePathsWithGeneric<Period extends string>({
  showHoverData,
  fill,
  fillType = 'gradient',
  path,
  area,
  selectedPeriod,
  yAxisScalingFactor,
  strokeColor,
  hoverData,
  compact,
}: SparklineInteractivePathsProps<Period>) {
  // Map 'dotted' to 'gradientDotted' for Sparkline
  const sparklineFillType = fillType === 'dotted' ? 'gradientDotted' : 'gradient';
  const hoverPathRef = useRef<string | undefined>(undefined);
  const hoverAreaRef = useRef<string | undefined>(undefined);
  const shouldShowFill = !!fill;

  const { chartWidth, chartHeight } = useSparklineInteractiveConstants({ compact });

  const handleMultiTimeseriesRender = useCallback(
    ({ area: timeseriesArea, path: timeseriesPath }: TimeseriesPathOnRenderParams) => {
      hoverPathRef.current = timeseriesPath;
      hoverAreaRef.current = timeseriesArea;
    },
    [],
  );

  return (
    <>
      {!showHoverData && (
        <SparklineInteractiveAnimatedPath
          area={shouldShowFill ? area : undefined}
          color={strokeColor}
          d={path}
          fillType={sparklineFillType}
          initialArea={hoverAreaRef.current}
          initialPath={hoverPathRef.current}
          selectedPeriod={selectedPeriod}
          yAxisScalingFactor={yAxisScalingFactor}
        />
      )}
      {!!showHoverData && (
        <SparklineInteractiveTimeseriesPaths
          data={hoverData?.[selectedPeriod] as ChartTimeseries[]}
          height={chartHeight}
          initialPath={path}
          onRender={handleMultiTimeseriesRender}
          width={chartWidth}
        />
      )}
    </>
  );
}

export const SparklineInteractivePaths = memo(
  SparklineInteractivePathsWithGeneric,
) as typeof SparklineInteractivePathsWithGeneric;
