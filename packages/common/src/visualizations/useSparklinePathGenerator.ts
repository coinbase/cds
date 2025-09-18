import { useMemo } from 'react';
import { extent } from 'd3-array';
import * as d3Scale from 'd3-scale';
import { type ScaleLinear } from 'd3-scale';

import { getSparklineRange } from './getSparklineRange';
import { largestTriangleThreeBucket } from './largestTriangleThreeBucket';

const { scaleLinear } = d3Scale;

export type UseSparklinePathParams = {
  data: number[] | string[];
  height: number;
  width: number;
  yAxisScalingFactor?: number;
};

export type SparklineGeneratorParams = {
  xFunction: ScaleLinear<number, number>;
  yFunction: ScaleLinear<number, number>;
  data: [number];
};

type UseSparklinePathGeneratorParams = {
  generator: (params: SparklineGeneratorParams) => string;
} & UseSparklinePathParams;

export const useSparklinePathGenerator = ({
  data,
  height,
  width,
  yAxisScalingFactor = 1.0,
  generator,
}: UseSparklinePathGeneratorParams) => {
  const dataList = useMemo(() => data.map(Number), [data]);
  return useMemo(() => {
    const { xRange, yRange } = getSparklineRange({ height, width, yAxisScalingFactor });
    const downsampledData = largestTriangleThreeBucket(dataList, width / 3) as [number];
    const xDomain = [0, downsampledData.length];
    const xFunction = scaleLinear().domain(xDomain).range(xRange);
    const yDomain = extent(downsampledData) as [number, number];
    const yFunction = scaleLinear().domain(yDomain).range(yRange);

    return generator({ xFunction, yFunction, data: downsampledData });
  }, [height, width, yAxisScalingFactor, dataList, generator]);
};
