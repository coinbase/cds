import { useMemo } from 'react';
import { bisector, extent } from 'd3-array';
import * as d3Scale from 'd3-scale';
import { area, line } from 'd3-shape';

import type { ChartData, ChartDataPoint } from '../types';

import { getSparklineRange } from './getSparklineRange';

const { scaleLinear, scaleTime } = d3Scale;

export type UseSparklineCoordinatesParams = {
  data: ChartData;
  width: number;
  height: number;
  yAxisScalingFactor?: number;
};

export const useSparklineCoordinates = ({
  data,
  width,
  height,
  yAxisScalingFactor,
}: UseSparklineCoordinatesParams) => {
  return useMemo(() => {
    const { xRange, yRange } = getSparklineRange({ height, width, yAxisScalingFactor });
    const xDomain = extent(data, (item) => item.date) as [Date, Date];
    const xFunction = scaleTime() // the x-axis is date
      .domain(xDomain)
      .range(xRange);

    const yDomain = extent(data, (item) => item.value) as [number, number];
    const yFunction = scaleLinear() // the y-axis is value
      .domain(yDomain)
      .range(yRange);

    const createSparklinePath = line<ChartDataPoint>()
      .x((item) => xFunction(item.date))
      .y((item) => yFunction(item.value));

    const createSparklineArea = area<ChartDataPoint>()
      .x((item) => xFunction(item.date))
      .y0(height)
      .y1((item) => yFunction(item.value));

    // Bisector goes from x coordinate to index of data array
    const bisect = bisector((item: { date: Date }) => item.date).left;
    const getMarker = (xPos: number) => {
      const date = xFunction.invert(xPos);
      const idx = bisect(data, date);
      const point = data[idx];
      if (!point) {
        return undefined;
      }
      return {
        x: xFunction(point.date),
        y: yFunction(point.value),
        ...point,
      };
    };

    /*
      This is a hack that will only support straight lines when 2 data points are passed. When this is true, we append `M-10,10` to the path.

      We do not do this for all lines because it warps the transition between time periods, which is visual jank. This provides a solution for straight lines, while minimizing impact for most charts.

      We apply M-10,10 so that the browser recognizes data for straight, horizontal lines. This does not impact non-straight lines. 
      This is due to a browser bug which refuses to acknowledge a line if the height remains exactly the same, and therefore renders the "height" of the path as 0 (invisible).

      "M", or move to, will simply move the cursor. Since we're appending two moves (the beginning of the path generate is always M), no line will be drawn but the browser will be activated. 

      Stack overflow: https://stackoverflow.com/questions/19708943/svg-straight-path-with-clip-path-not-visible-in-chrome/19709615#19709615
    */
    const isAStraightLine =
      data.length < 5 &&
      data.filter((dataPoint) => dataPoint.value === data[0].value).length === data.length;

    return {
      xFunction,
      yFunction,
      path: `${isAStraightLine ? 'M-10,10' : ''}${createSparklinePath(data)}`,
      area: createSparklineArea(data) ?? '',
      getMarker,
    };
  }, [data, height, width, yAxisScalingFactor]);
};
