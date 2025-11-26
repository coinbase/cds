import { memo } from 'react';

import { useCartesianChartContext } from '../ChartProvider';
import { DefaultReferenceLineLabel } from '../line';

import type { ScrubberLabelProps } from './Scrubber';

export type DefaultScrubberLabelProps = ScrubberLabelProps;

/**
 * DefaultScrubberLabel is the default label component for the scrubber line.
 * It will automatically add padding around the label when elevated to fit within chart bounds to prevent shadow from being cutoff.
 * It will also center the label vertically with the top available area.
 */
export const DefaultScrubberLabel = memo<DefaultScrubberLabelProps>(
  ({ verticalAlignment = 'middle', dy, boundsInset, ...props }) => {
    const { drawingArea } = useCartesianChartContext();

    return (
      <DefaultReferenceLineLabel
        boundsInset={boundsInset}
        dy={dy ?? -0.5 * drawingArea.y}
        verticalAlignment={verticalAlignment}
        {...props}
      />
    );
  },
);
