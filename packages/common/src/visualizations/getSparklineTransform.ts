import { getSparklineRange } from './getSparklineRange';

// This transform vertically centers a scaled down path in the middle of the svg
export function getSparklineTransform(width: number, height: number, yAxisScalingFactor?: number) {
  const translateProps: { transform?: string } = {};
  if (Number.isFinite(yAxisScalingFactor)) {
    const { yRange } = getSparklineRange({ height, width, yAxisScalingFactor });

    const pathHeight = Math.abs(yRange[0] - yRange[1]);
    const yTranslate = height / 2 - pathHeight / 2;

    translateProps.transform = `translate(0, ${yTranslate})`;
  }

  return translateProps;
}
