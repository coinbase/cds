import { memo, useMemo } from 'react';

import { useCartesianChartContext } from '../ChartProvider';
import { DefaultReferenceLineLabel } from '../line';
import type { ChartInset } from '../utils';

import type { ScrubberLabelProps } from './Scrubber';

export type DefaultScrubberLabelProps = ScrubberLabelProps;

// This is pulled by shadow information, ideally we can get this direct from that in the future
const elevatedLabelBounds: ChartInset = { top: 4, bottom: 20, left: 12, right: 12 };

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
          x: elevatedLabelBounds.left,
          y: elevatedLabelBounds.top,
          width: chartWidth - elevatedLabelBounds.left - elevatedLabelBounds.right,
          height: chartHeight - elevatedLabelBounds.top - elevatedLabelBounds.bottom,
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
