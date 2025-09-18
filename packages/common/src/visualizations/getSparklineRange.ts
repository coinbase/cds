export const getSparklineRange = ({
  height,
  width,
  yAxisScalingFactor = 1.0,
}: {
  height: number;
  width: number;
  yAxisScalingFactor?: number;
}) => {
  const xRange = [2, width - 2];
  const yRange = [Math.max(2 + 1, (height - 2) * yAxisScalingFactor), 2];
  return { xRange, yRange };
};
