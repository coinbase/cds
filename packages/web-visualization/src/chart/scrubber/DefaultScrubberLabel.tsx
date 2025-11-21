import { memo } from 'react';

import { useCartesianChartContext } from '../ChartProvider';
import { DefaultReferenceLineLabel } from '../line';

import type { ScrubberLabelProps } from './Scrubber';

export type DefaultScrubberLabelProps = ScrubberLabelProps;

/**
 * DefaultScrubberLabel is the default label component for the scrubber line.
 * It will center the label vertically with the top available area.
 */
export const DefaultScrubberLabel = memo<DefaultScrubberLabelProps>(
  ({ verticalAlignment = 'middle', dy, ...props }) => {
    const { drawingArea } = useCartesianChartContext();

    return (
      <DefaultReferenceLineLabel
        dy={dy ?? -0.5 * drawingArea.y}
        verticalAlignment={verticalAlignment}
        {...props}
      />
    );
  },
);
