import { memo, useMemo } from 'react';

import { useCartesianChartContext } from '../ChartProvider';
import { DefaultReferenceLineLabel } from '../line';

import type { ScrubberLabelProps } from './Scrubber';

export type DefaultScrubberLabelProps = ScrubberLabelProps;

/**
 * DefaultScrubberLabel is the default label component for the scrubber line.
 * It will automatically add padding around the label when elevated to fit within chart bounds to prevent shadow from being cutoff.
 * In vertical layout, it positions the label above the scrubber line.
 * In horizontal layout, it centers the label in the chart's right inset.
 */
export const DefaultScrubberLabel = memo<DefaultScrubberLabelProps>(
  ({ dx: dxProp, dy: dyProp, ...props }) => {
    const { drawingArea, layout, width: chartWidth } = useCartesianChartContext();
    const isHorizontalLayout = layout === 'horizontal';

    const dx = useMemo(() => {
      if (dxProp !== undefined) return dxProp;
      if (isHorizontalLayout) {
        const drawingAreaEnd = drawingArea.x + drawingArea.width;
        const rightOffset = chartWidth - drawingAreaEnd;
        return rightOffset / 2;
      }
      return 0;
    }, [drawingArea.width, drawingArea.x, dxProp, isHorizontalLayout, chartWidth]);

    const dy = useMemo(() => {
      if (dyProp !== undefined) return dyProp;
      if (isHorizontalLayout) return 0;
      return -0.5 * drawingArea.y;
    }, [dyProp, isHorizontalLayout, drawingArea.y]);

    return <DefaultReferenceLineLabel dx={dx} dy={dy} {...props} />;
  },
);
