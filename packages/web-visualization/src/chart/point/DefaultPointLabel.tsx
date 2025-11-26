import { memo, useMemo } from 'react';

import { ChartText, type ChartTextProps } from '../text';
import { getAlignmentFromPosition, getLabelCoordinates } from '../utils/point';

import type { PointLabelProps } from './Point';

export type DefaultPointLabelProps = PointLabelProps &
  Omit<ChartTextProps, 'children' | 'x' | 'y' | 'horizontalAlignment' | 'verticalAlignment'>;

/**
 * DefaultPointLabel is the default label component for point labels.
 * It renders text at the specified position relative to the point.
 */
export const DefaultPointLabel = memo<DefaultPointLabelProps>(
  ({ x, y, position = 'center', offset, children, ...props }) => {
    const { horizontalAlignment, verticalAlignment } = useMemo(
      () => getAlignmentFromPosition(position),
      [position],
    );

    const labelCoordinates = useMemo(() => {
      if (offset === undefined) return { x, y };
      return getLabelCoordinates(x, y, position, offset);
    }, [x, y, position, offset]);

    return (
      <ChartText
        {...props}
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
