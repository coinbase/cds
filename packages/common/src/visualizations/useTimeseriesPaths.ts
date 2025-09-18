import { useMemo } from 'react';
import { extent } from 'd3-array';
import * as d3Scale from 'd3-scale';
import { area, line } from 'd3-shape';

import type { ChartDataPoint, ChartTimeseries } from '../types/Chart';

import { getSparklineRange } from './getSparklineRange';

const { scaleLinear, scaleTime } = d3Scale;

export type UseTimeseriesPathsParams = {
  data: ChartTimeseries[];
  width: number;
  height: number;
};

// returns a line and area generator that is compatible with a list of timeseries
export function useTimeseriesPaths({ data, width, height }: UseTimeseriesPathsParams) {
  return useMemo(() => {
    const points = data.reduce((previousValue: ChartDataPoint[], currentValue: ChartTimeseries) => {
      return previousValue.concat(currentValue.points);
    }, []);

    const { xRange, yRange } = getSparklineRange({ width, height });

    const yDomain = extent(points, (item) => item.value) as [number, number];
    const yFunction = scaleLinear() // the y-axis is value
      .domain(yDomain)
      .range(yRange);

    const xDomain = extent(points, (item) => item.date) as [Date, Date];
    const xFunction = scaleTime() // the x-axis is date
      .domain(xDomain)
      .range(xRange);

    const lineFn = line<ChartDataPoint>()
      .x((item) => xFunction(item.date))
      .y((item) => yFunction(item.value));

    const areaFn = area<ChartDataPoint>()
      .x((item) => xFunction(item.date))
      .y0(height)
      .y1((item) => yFunction(item.value));

    return {
      lineFn,
      areaFn,
    };
  }, [data, width, height]);
}
