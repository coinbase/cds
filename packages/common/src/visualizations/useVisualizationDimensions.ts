import { useMemo } from 'react';

type VisualizationDimensions<DimensionType> = {
  userDefinedWidth: DimensionType;
  userDefinedHeight: DimensionType;
  calculatedWidth: number;
  calculatedHeight: number;
};

export const useVisualizationDimensions = <DimensionType = string | number | undefined | null>({
  userDefinedWidth,
  userDefinedHeight,
  calculatedWidth,
  calculatedHeight,
}: VisualizationDimensions<DimensionType>) => {
  return useMemo(() => {
    let width = calculatedWidth;
    let height = calculatedHeight;

    let shouldObserve = true;
    // if the user has passed in a static width and height then we don't need to wait for the dimension calculation
    if (Number.isFinite(userDefinedWidth) && Number.isFinite(userDefinedHeight)) {
      // we know it is a number from the number check
      width = userDefinedWidth as number;
      height = userDefinedHeight as number;
      shouldObserve = false;
    }

    return {
      width,
      height,
      circleSize: Math.min(height, width),
      shouldObserve,
    };
  }, [calculatedHeight, calculatedWidth, userDefinedHeight, userDefinedWidth]);
};
