import { memo, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { useCartesianChartContext } from '../ChartProvider';
import { ChartText } from '../text';
import type {
  ChartTextChildren,
  ChartTextProps,
  TextHorizontalAlignment,
  TextVerticalAlignment,
} from '../text/ChartText';
import { getPointOnScale } from '../utils';

import { DottedLine } from './DottedLine';
import type { LineComponent } from './Line';

/**
 * Configuration for ReferenceLine label rendering using ChartText.
 */
export type ReferenceLineLabelProps = Pick<
  ChartTextProps,
  | 'color'
  | 'inset'
  | 'background'
  | 'borderRadius'
  | 'disableRepositioning'
  | 'bounds'
  | 'horizontalAlignment'
  | 'verticalAlignment'
  | 'font'
  | 'opacity'
  | 'xOffset'
  | 'yOffset'
  | 'elevation'
  | 'shadowColor'
  | 'shadowOffset'
  | 'shadowBlur'
  | 'shadowOpacity'
>;

type BaseReferenceLineProps = SharedProps & {
  /**
   * Label content to display near the reference line.
   * Can be a string or ReactNode for rich formatting.
   *
   * @example
   * // Simple string label
   * label="Target Price"
   *
   * @example
   * // ReactNode with styling
   * label={<tspan style={{ fontWeight: 'bold', fill: 'red' }}>Stop Loss</tspan>}
   */
  label?: ChartTextChildren;
  /**
   * Component to render the line.
   * @default DottedLine
   */
  LineComponent?: LineComponent;
  /**
   * The color of the line.
   * @default theme.color.bgLine
   */
  stroke?: string;
  /**
   * Props for the label rendering.
   * Consolidates styling and positioning options for the ChartText component.
   * Alignment defaults are set based on line orientation and can be overridden here.
   */
  labelProps?: ReferenceLineLabelProps;
};

type HorizontalReferenceLineProps = BaseReferenceLineProps & {
  /**
   * Y-value for horizontal reference line (data value).
   */
  dataY: number;
  /**
   * The ID of the y-axis to use for positioning.
   * Defaults to defaultAxisId if not specified.
   */
  yAxisId?: string;
  /**
   * Position of the label along the horizontal line.
   * @default 'right'
   */
  labelPosition?: TextHorizontalAlignment;
  dataX?: never;
};

type VerticalReferenceLineProps = BaseReferenceLineProps & {
  /**
   * X-value for vertical reference line (data index).
   */
  dataX: number;
  /**
   * Position of the label along the vertical line.
   * @default 'top'
   */
  labelPosition?: TextVerticalAlignment;
  dataY?: never;
  yAxisId?: never;
};

export type ReferenceLineProps = HorizontalReferenceLineProps | VerticalReferenceLineProps;

export const ReferenceLine = memo<ReferenceLineProps>(
  ({
    dataX,
    dataY,
    yAxisId,
    label,
    labelPosition = dataY !== undefined ? 'right' : 'top',
    testID,
    LineComponent = DottedLine,
    stroke,
    labelProps,
  }) => {
    const theme = useTheme();
    const { getXScale, getYScale, drawingArea } = useCartesianChartContext();

    const effectiveLineStroke = stroke ?? theme.color.bgLine;

    // Merge default props with user provided props
    const finalLabelProps: ReferenceLineLabelProps = useMemo(
      () => ({
        borderRadius: 8,
        color: theme.color.fgMuted,
        inset: { top: 8, bottom: 8, left: 12, right: 12 },
        // Set default alignment based on orientation
        ...(dataY !== undefined
          ? { verticalAlignment: 'middle' as const }
          : { horizontalAlignment: 'center' as const }),
        ...labelProps,
      }),
      [dataY, labelProps, theme.color.fgMuted],
    );
    // Horizontal reference line logic
    if (dataY !== undefined) {
      const yScale = getYScale(yAxisId);

      // Don't render if we don't have a scale
      if (!yScale) {
        return null;
      }

      const yPixel = yScale(dataY);

      if (yPixel === undefined) return null;

      let labelX: number;
      if (labelPosition === 'left') {
        labelX = drawingArea.x;
      } else if (labelPosition === 'center') {
        labelX = drawingArea.x + drawingArea.width / 2;
      } else {
        labelX = drawingArea.x + drawingArea.width;
      }

      return (
        <>
          <LineComponent
            animate={false}
            d={`M${drawingArea.x},${yPixel} L${drawingArea.x + drawingArea.width},${yPixel}`}
            stroke={effectiveLineStroke}
          />
          {label && (
            <ChartText {...finalLabelProps} x={labelX} y={yPixel}>
              {label}
            </ChartText>
          )}
        </>
      );
    }

    // Vertical reference line logic
    if (dataX !== undefined) {
      const xScale = getXScale();

      // Don't render if we don't have scales
      if (!xScale) {
        return null;
      }

      const xPixel = getPointOnScale(dataX, xScale);

      if (xPixel === undefined) return null;

      let labelY: number;
      if (labelPosition === 'top') {
        labelY = drawingArea.y;
      } else if (labelPosition === 'middle') {
        labelY = drawingArea.y + drawingArea.height / 2;
      } else {
        labelY = drawingArea.y + drawingArea.height;
      }

      return (
        <>
          <LineComponent
            animate={false}
            d={`M${xPixel},${drawingArea.y} L${xPixel},${drawingArea.y + drawingArea.height}`}
            stroke={effectiveLineStroke}
          />
          {label && (
            <ChartText {...finalLabelProps} x={xPixel} y={labelY}>
              {label}
            </ChartText>
          )}
        </>
      );
    }

    // Should not reach here if types are correct
    return null;
  },
);
