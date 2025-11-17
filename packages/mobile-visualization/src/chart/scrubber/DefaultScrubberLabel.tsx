import { memo, useMemo } from 'react';

import { useCartesianChartContext } from '../ChartProvider';
import { DefaultReferenceLineLabel } from '../line';

import type { ScrubberLabelProps } from './Scrubber';

export type DefaultScrubberLabelProps = ScrubberLabelProps;

const elevatedLabelBoundsPadding = 16;

/**
 * DefaultScrubberLabel is the default label component for the scrubber line.
 * It will automatically add padding around the label when elevated to fit within chart bounds to prevent shadow from being cutoff.
 * It will also center the label vertically with the top available area.
 */
export const DefaultScrubberLabel = memo<DefaultScrubberLabelProps>(
  ({ elevation, bounds: boundsProp, verticalAlignment = 'middle', dy, ...props }) => {
    const { width: chartWidth, height: chartHeight, drawingArea } = useCartesianChartContext();

    const bounds = useMemo(() => {
      if (boundsProp !== undefined) {
        return boundsProp;
      }
      // When elevated, add padding around the label to fit within chart bounds to prevent shadow from being cutoff.
      if (elevation && elevation > 0) {
        return {
          x: elevatedLabelBoundsPadding,
          y: elevatedLabelBoundsPadding,
          width: chartWidth - elevatedLabelBoundsPadding * 2,
          height: chartHeight - elevatedLabelBoundsPadding * 2,
        };
      }
      return undefined;
    }, [boundsProp, elevation, chartWidth, chartHeight]);

    return (
      <DefaultReferenceLineLabel
        bounds={bounds}
        dy={dy ?? -0.5 * drawingArea.y}
        elevation={elevation}
        verticalAlignment={verticalAlignment}
        {...props}
      />
    );
  },
);
