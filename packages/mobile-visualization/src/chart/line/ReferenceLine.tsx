import { memo, useMemo } from 'react';
import { G } from 'react-native-svg';
import type { SharedProps } from '@coinbase/cds-common/types';
import {
  getPointOnScale,
  useChartContext,
  useChartDrawingAreaContext,
} from '@coinbase/cds-common/visualizations/charts';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { ChartText } from '../text';
import type { ChartTextChildren, ChartTextProps } from '../text/ChartText';

import { DottedLine } from './DottedLine';
import type { LineComponent } from './Line';

/**
 * Configuration for ReferenceLine label rendering using ChartText.
 */
export type ReferenceLineLabelConfig = Pick<
  ChartTextProps,
  | 'dx'
  | 'dy'
  | 'fontFamily'
  | 'fontSize'
  | 'fontWeight'
  | 'color'
  | 'elevation'
  | 'padding'
  | 'background'
  | 'borderRadius'
  | 'disableRepositioning'
  | 'bounds'
  | 'styles'
  | 'dominantBaseline'
  | 'textAnchor'
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
  lineStroke?: string;
  /**
   * Disable animation for the line.
   */
  disableAnimations?: boolean;
  /**
   * Configuration for the label rendering.
   * Consolidates styling and positioning options for the ChartText component.
   */
  labelConfig?: ReferenceLineLabelConfig;
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
  labelPosition?: 'left' | 'center' | 'right';
  dataX?: never;
  xAxisId?: never;
};

type VerticalReferenceLineProps = BaseReferenceLineProps & {
  /**
   * X-value for vertical reference line (data index).
   */
  dataX: number;
  /**
   * The ID of the x-axis to use for positioning.
   * Defaults to defaultAxisId if not specified.
   */
  xAxisId?: string;
  /**
   * Position of the label along the vertical line.
   * @default 'top'
   */
  labelPosition?: 'top' | 'center' | 'bottom';
  dataY?: never;
  yAxisId?: never;
};

export type ReferenceLineProps = HorizontalReferenceLineProps | VerticalReferenceLineProps;

export const ReferenceLine = memo<ReferenceLineProps>(
  ({
    dataX,
    dataY,
    xAxisId,
    yAxisId,
    label,
    labelPosition,
    testID,
    LineComponent = DottedLine,
    lineStroke,
    disableAnimations = true,
    labelConfig,
  }) => {
    const theme = useTheme();
    const { getXScale, getYScale } = useChartContext();
    const { drawingArea } = useChartDrawingAreaContext();

    const effectiveLineStroke = lineStroke ?? theme.color.bgLine;

    // Merge default config with user provided config
    const finalLabelConfig: ReferenceLineLabelConfig = useMemo(
      () => ({
        dominantBaseline: 'central',
        borderRadius: 200,
        color: theme.color.fgMuted,
        elevation: 0,
        padding: { top: 7.5, bottom: 7.5, left: 12, right: 12 },
        ...labelConfig,
      }),
      [labelConfig, theme.color.fgMuted],
    );
    // Horizontal reference line logic
    if (dataY !== undefined) {
      const yScale = getYScale?.(yAxisId);

      // Don't render if we don't have a scale
      if (!yScale) {
        return null;
      }

      const yPixel = yScale(dataY);

      const getLabelX = () => {
        switch (labelPosition as 'left' | 'center' | 'right') {
          case 'left':
            return drawingArea.x + 8;
          case 'center':
            return drawingArea.x + drawingArea.width / 2;
          case 'right':
          default:
            return drawingArea.x + drawingArea.width - 5;
        }
      };

      if (yPixel === undefined) return null;

      return (
        <G data-testid={testID}>
          <LineComponent
            d={`M${drawingArea.x},${yPixel} L${drawingArea.x + drawingArea.width},${yPixel}`}
            disableAnimations={disableAnimations}
            stroke={effectiveLineStroke}
          />
          {label && (
            <ChartText
              textAnchor={
                labelPosition === 'left' ? 'start' : labelPosition === 'center' ? 'middle' : 'end'
              }
              {...finalLabelConfig}
              x={getLabelX()}
              y={yPixel}
            >
              {label}
            </ChartText>
          )}
        </G>
      );
    }

    // Vertical reference line logic
    if (dataX !== undefined) {
      const xScale = getXScale?.(xAxisId);

      // Don't render if we don't have scales
      if (!xScale) {
        return null;
      }

      const xPixel = getPointOnScale(dataX, xScale);

      const getLabelY = () => {
        switch (labelPosition as 'top' | 'center' | 'bottom') {
          case 'top':
            return 24;
          case 'center':
            return drawingArea.y + drawingArea.height / 2;
          case 'bottom':
          default:
            return drawingArea.y + drawingArea.height - 24;
        }
      };

      if (xPixel === undefined) return null;

      return (
        <G data-testid={testID}>
          <LineComponent
            d={`M${xPixel},${drawingArea.y} L${xPixel},${drawingArea.y + drawingArea.height}`}
            disableAnimations={disableAnimations}
            stroke={effectiveLineStroke}
          />
          {label && (
            <ChartText textAnchor="middle" {...finalLabelConfig} x={xPixel} y={getLabelY()}>
              {label}
            </ChartText>
          )}
        </G>
      );
    }

    // Should not reach here if types are correct
    return null;
  },
);
