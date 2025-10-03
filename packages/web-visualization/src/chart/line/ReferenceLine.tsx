import React, { memo, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { cx } from '@coinbase/cds-web';

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
  | 'dx'
  | 'dy'
  | 'font'
  | 'fontFamily'
  | 'fontSize'
  | 'fontWeight'
  | 'color'
  | 'elevation'
  | 'inset'
  | 'background'
  | 'borderRadius'
  | 'disableRepositioning'
  | 'bounds'
  | 'styles'
  | 'classNames'
  | 'horizontalAlignment'
  | 'verticalAlignment'
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
   * @default 'var(--color-bgLine)'
   */
  stroke?: string;
  /**
   * Props for the label rendering.
   * Consolidates styling and positioning options for the ChartText component.
   * Alignment defaults are set based on line orientation and can be overridden here.
   */
  labelProps?: ReferenceLineLabelProps;
  /**
   * Custom class name for the root element.
   */
  className?: string;
  /**
   * Custom inline styles for the root element.
   */
  style?: React.CSSProperties;
  /**
   * Custom class names for the component parts.
   */
  classNames?: {
    /**
     * Custom class name for the root element.
     */
    root?: string;
    /**
     * Custom class name for the text label.
     */
    label?: string;
  };
  /**
   * Custom styles for the component parts.
   */
  styles?: {
    /**
     * Custom styles for the root element.
     */
    root?: React.CSSProperties;
    /**
     * Custom styles for the text label.
     */
    label?: React.CSSProperties;
  };
};

export type HorizontalReferenceLineProps = BaseReferenceLineProps & {
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

export type VerticalReferenceLineProps = BaseReferenceLineProps & {
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
    stroke = 'var(--color-bgLine)',
    labelProps,
    className,
    style,
    classNames,
    styles,
  }) => {
    const { getXScale, getYScale, drawingArea } = useCartesianChartContext();

    // For horizontal lines (dataY defined): default to verticalAlignment: 'middle'
    // For vertical lines (dataX defined): default to horizontalAlignment: 'center'
    const isHorizontal = dataY !== undefined;

    // Merge default props with user provided props, including text-specific styles and classNames
    const finalLabelProps: ReferenceLineLabelProps = useMemo(
      () => ({
        borderRadius: 4,
        color: 'var(--color-fgMuted)',
        elevation: 0,
        inset: { top: 8, bottom: 8, left: 12, right: 12 },
        // Set default alignment based on orientation
        ...(isHorizontal
          ? { verticalAlignment: 'middle' as const }
          : { horizontalAlignment: 'center' as const }),
        ...labelProps,
        // Merge classNames for text
        classNames: {
          ...labelProps?.classNames,
          ...(classNames?.label && { text: classNames.label }),
        },
        // Merge styles for text
        styles: {
          ...labelProps?.styles,
          ...(styles?.label && { text: styles.label }),
        },
      }),
      [isHorizontal, labelProps, classNames?.label, styles?.label],
    );

    // Combine root classNames
    const rootClassName = cx(className, classNames?.root);
    // Combine root styles
    const rootStyle = { ...style, ...styles?.root } as React.CSSProperties | undefined;

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
        <g className={rootClassName} data-testid={testID} style={rootStyle}>
          <LineComponent
            animate={false}
            d={`M${drawingArea.x},${yPixel} L${drawingArea.x + drawingArea.width},${yPixel}`}
            stroke={stroke}
          />
          {label && (
            <ChartText {...finalLabelProps} x={labelX} y={yPixel}>
              {label}
            </ChartText>
          )}
        </g>
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
        <g className={rootClassName} data-testid={testID} style={rootStyle}>
          <LineComponent
            animate={false}
            d={`M${xPixel},${drawingArea.y} L${xPixel},${drawingArea.y + drawingArea.height}`}
            stroke={stroke}
          />
          {label && (
            <ChartText {...finalLabelProps} x={xPixel} y={labelY}>
              {label}
            </ChartText>
          )}
        </g>
      );
    }

    return;
  },
);
