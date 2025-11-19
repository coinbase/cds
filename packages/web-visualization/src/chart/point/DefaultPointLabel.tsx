import { memo, useMemo } from 'react';

import { ChartText } from '../text';
import { getAlignmentFromPosition, getLabelCoordinates } from '../utils/point';

import type { PointLabelProps } from './Point';

export type DefaultPointLabelProps = PointLabelProps;

/**
 * DefaultPointLabel is the default label component for point labels.
 * It renders text at the specified position relative to the point.
 */
export const DefaultPointLabel = memo<DefaultPointLabelProps>(
  ({ x, y, position = 'center', offset = 0, children }) => {
    const { horizontalAlignment, verticalAlignment } = useMemo(
      () => getAlignmentFromPosition(position),
      [position],
    );

    const labelCoordinates = useMemo(
      () => getLabelCoordinates(x, y, position, offset),
      [x, y, position, offset],
    );

    return (
      <ChartText
        horizontalAlignment={horizontalAlignment}
        verticalAlignment={verticalAlignment}
        x={labelCoordinates.x}
        y={labelCoordinates.y}
      >
        {children}
      </ChartText>
    );
  },
);
