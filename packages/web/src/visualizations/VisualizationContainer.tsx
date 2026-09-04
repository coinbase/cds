import React, { memo } from 'react';
import { useVisualizationDimensions } from '@coinbase/cds-common/visualizations/useVisualizationDimensions';

import { useDimensions } from '../hooks/useDimensions';
import { Box } from '../layout/Box';

export type VisualizationContainerDimension = {
  width: number;
  height: number;
  circleSize: number;
};

export type VisualizationContainerBaseProps = {
  width: React.CSSProperties['width'];
  height: React.CSSProperties['height'];
  minHeight?: React.CSSProperties['minHeight']; // can be used when a width calculation is only necessary
  children: (dimensions: VisualizationContainerDimension) => React.ReactNode;
};

export type VisualizationContainerProps = VisualizationContainerBaseProps;

/*
Some visualizations need a static width to render. This container can be dynamically sized and it will inject its static calculated dimensions into its child
 */
export const VisualizationContainer: React.FC<VisualizationContainerProps> = memo(
  ({ width, height, children }) => {
    const { observe, width: boxWidth, height: boxHeight } = useDimensions();
    const dimensions = useVisualizationDimensions<React.CSSProperties['width']>({
      userDefinedWidth: width,
      userDefinedHeight: height,
      calculatedWidth: boxWidth,
      calculatedHeight: boxHeight,
    });

    return (
      <Box ref={dimensions.shouldObserve ? observe : undefined} height={height} width={width}>
        {dimensions.width && dimensions.height ? children(dimensions) : null}
      </Box>
    );
  },
);
