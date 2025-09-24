import React, { memo, useMemo } from 'react';
import { G, Rect } from 'react-native-svg';
import type { SharedProps } from '@coinbase/cds-common/types';
import {
  getPointOnScale,
  useChartContext,
  useChartDrawingAreaContext,
} from '@coinbase/cds-common/visualizations/charts';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { ReferenceLine, type ReferenceLineProps } from './line/ReferenceLine';
import { useHighlightContext } from './Chart';
import { DottedLine, type LineComponent } from './line';
import type { ChartTextChildren } from './text';

export type ScrubberLineProps = SharedProps &
  Pick<ReferenceLineProps, 'labelConfig'> & {
    /**
     * Direct x-coordinate. When provided, overrides hover-based positioning.
     */
    x?: number;
    /**
     * The ID of the x-axis to use for positioning.
     * Defaults to defaultAxisId if not specified.
     */
    xAxisId?: string;
    /**
     * Component to render the line.
     * @default DottedLine
     */
    LineComponent?: LineComponent;
    /**
     * The color of the line.
     * @default theme.color.bgLineHeavy
     */
    lineStroke?: string;
    /**
     * Label to display at the top of the scrubber line.
     * When null is returned, no label will be displayed.
     */
    label?: ChartTextChildren | ((dataIndex: number | null) => ChartTextChildren | null);
    /**
     * Whether to hide the overlay rect which hides future data.
     * @default true when hovering, false otherwise
     */
    hideOverlay?: boolean;
    /**
     * The color of the overlay that de-emphasizes future data.
     * @default theme.color.bg
     */
    overlayColor?: string;
  };

// todo: we will likely need to separate out the label from scrubber line
// so we can do scrubber line > scrubber head > scrubber label
export const ScrubberLine = memo<ScrubberLineProps>(
  ({
    x: directX,
    xAxisId,
    LineComponent = DottedLine,
    lineStroke,
    label,
    testID,
    hideOverlay,
    overlayColor,
    labelConfig,
  }) => {
    const theme = useTheme();
    const { getXScale, getXAxis } = useChartContext();
    const { drawingArea } = useChartDrawingAreaContext();

    const xScale = getXScale?.(xAxisId);
    const xAxis = getXAxis?.(xAxisId);

    const { highlightedIndex } = useHighlightContext();

    // Use theme colors as defaults
    const effectiveLineStroke = lineStroke ?? theme.color.bgLineHeavy;
    const effectiveOverlayColor = overlayColor ?? theme.color.bg;

    const calculatedLabel = useMemo(() => {
      if (!label) return undefined;
      if (typeof label === 'function') {
        const result = label(highlightedIndex ?? null);
        return result ?? undefined;
      }
      return label;
    }, [label, highlightedIndex]);

    if (!xScale) {
      return null;
    }

    const isDirectPositioning = directX !== undefined;
    const isHovering = !isDirectPositioning && highlightedIndex !== undefined;

    // Calculate default overlay behavior based on hover state
    const finalHideOverlay = hideOverlay !== undefined ? hideOverlay : !isHovering;

    let pixelX: number | undefined;
    let dataIndex: number;
    let xValue: number;

    // Use direct X coordinate if provided
    if (directX !== undefined) {
      // When directX is provided, it's the actual x value, not an index
      dataIndex = directX;
      xValue = directX;

      pixelX = getPointOnScale(directX, xScale);
    } else {
      // Use highlight data index
      if (highlightedIndex === undefined) {
        return null;
      }

      dataIndex = highlightedIndex;
      // If xAxis has data array, use the actual data value at the index
      // Otherwise use the index itself (for ordinal/linear scales without explicit data)
      if (xAxis?.data && Array.isArray(xAxis.data)) {
        const dataValue = xAxis.data[highlightedIndex];
        // Convert string to number if needed for numeric scales
        xValue = typeof dataValue === 'string' ? highlightedIndex : dataValue;
      } else {
        xValue = highlightedIndex;
      }

      pixelX = getPointOnScale(xValue, xScale);
    }

    if (pixelX === undefined) return null;

    return (
      <G data-testid={testID}>
        {!finalHideOverlay && (
          <Rect
            fill={effectiveOverlayColor}
            height={drawingArea.height}
            opacity={0.8}
            width={drawingArea.x + drawingArea.width - pixelX}
            x={pixelX}
            y={drawingArea.y}
          />
        )}
        <ReferenceLine
          disableAnimations
          LineComponent={LineComponent}
          dataX={xValue}
          label={calculatedLabel}
          labelConfig={labelConfig}
          labelPosition="top"
          lineStroke={effectiveLineStroke}
          xAxisId={xAxisId}
        />
      </G>
    );
  },
);
