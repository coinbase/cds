import { getCenter, getRadius } from '../utils/circle';

type ProgressCircleParams = {
  size: number;
  strokeWidth: number;
  stroke: string;
};

export const getProgressCircleParams = ({ size, strokeWidth, stroke }: ProgressCircleParams) => {
  const radius = getRadius(size, strokeWidth);
  const center = getCenter(size);

  return {
    stroke,
    cx: center,
    cy: center,
    r: radius,
    strokeWidth,
    fill: 'none',
  };
};
