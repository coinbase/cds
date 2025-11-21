import React, { memo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { cx } from '@coinbase/cds-web';

import { useCartesianChartContext } from '../ChartProvider';
import type {
  ChartTextChildren,
  ChartTextProps,
  TextHorizontalAlignment,
  TextVerticalAlignment,
} from '../text/ChartText';
import type { ChartInset } from '../utils';
import { getPointOnScale } from '../utils';

import { DefaultReferenceLineLabel } from './DefaultReferenceLineLabel';
import { DottedLine } from './DottedLine';
import type { LineComponent } from './Line';

export type ReferenceLineLabelComponentProps = Pick<
  ChartTextProps,
  | 'x'
  | 'y'
  | 'children'
  | 'testID'
  | 'dx'
  | 'dy'
  | 'font'
  | 'fontFamily'
  | 'fontSize'
  | 'fontWeight'
  | 'color'
  | 'elevated'
  | 'inset'
  | 'background'
  | 'borderRadius'
  | 'disableRepositioning'
  | 'styles'
  | 'classNames'
  | 'horizontalAlignment'
  | 'verticalAlignment'
  | 'className'
  | 'style'
> & {
  /**
   * Bounds inset for label to prevent cutoff at chart edges.
   * @default { top: 4, bottom: 20, left: 12, right: 12 } when elevated is true, otherwise undefined
   */
  boundsInset?: number | ChartInset;
};

export type ReferenceLineLabelComponent = React.FC<ReferenceLineLabelComponentProps>;

export type ReferenceLineBaseProps = SharedProps & {
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
   * Component to render the label.
   * @default DefaultReferenceLineLabel
   */
  LabelComponent?: ReferenceLineLabelComponent;
  /**
   * Whether to elevate the label with a shadow.
   * When true, applies elevation and automatically adds bounds to keep label within chart area.
   */
  labelElevated?: boolean;
  /**
   * Font style for the label text.
   */
  labelFont?: ChartTextProps['font'];
  /**
   * Horizontal offset for the label in pixels.
   */
  labelDx?: number;
  /**
   * Vertical offset for the label in pixels.
   */
  labelDy?: number;
  /**
   * Horizontal alignment of the label text.
   */
  labelHorizontalAlignment?: TextHorizontalAlignment;
  /**
   * Vertical alignment of the label text.
   */
  labelVerticalAlignment?: TextVerticalAlignment;
  /**
   * Bounds inset for the label to prevent cutoff at chart edges.
   * Especially useful when labelElevated is true to prevent shadow clipping.
   * Can be a number (applied to all sides) or a ChartInset object.
   * @default { top: 4, bottom: 20, left: 12, right: 12 } when labelElevated is true, otherwise none
   */
  labelBoundsInset?: number | ChartInset;
  /**
   * The color of the line.
   * @default 'var(--color-bgLine)'
   */
  stroke?: string;
};

export type HorizontalReferenceLineProps = ReferenceLineBaseProps & {
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

export type VerticalReferenceLineProps = ReferenceLineBaseProps & {
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

export type ReferenceLineProps = (HorizontalReferenceLineProps | VerticalReferenceLineProps) & {
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

export const ReferenceLine = memo<ReferenceLineProps>(
  ({
    dataX,
    dataY,
    yAxisId,
    label,
    labelPosition = dataY !== undefined ? 'right' : 'top',
    testID,
    LineComponent = DottedLine,
    LabelComponent = DefaultReferenceLineLabel,
    labelElevated,
    labelFont,
    labelDx,
    labelDy,
    labelHorizontalAlignment,
    labelVerticalAlignment,
    labelBoundsInset,
    stroke = 'var(--color-bgLine)',
    className,
    style,
    classNames,
    styles,
  }) => {
    const { getXScale, getYScale, drawingArea } = useCartesianChartContext();

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
            <LabelComponent
              boundsInset={labelBoundsInset}
              className={classNames?.label}
              dx={labelDx}
              dy={labelDy}
              elevated={labelElevated}
              font={labelFont}
              horizontalAlignment={labelHorizontalAlignment}
              style={styles?.label}
              testID={testID}
              verticalAlignment={labelVerticalAlignment ?? 'middle'}
              x={labelX}
              y={yPixel}
            >
              {label}
            </LabelComponent>
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
            <LabelComponent
              boundsInset={labelBoundsInset}
              className={classNames?.label}
              dx={labelDx}
              dy={labelDy}
              elevated={labelElevated}
              font={labelFont}
              horizontalAlignment={labelHorizontalAlignment ?? 'center'}
              style={styles?.label}
              testID={testID}
              verticalAlignment={labelVerticalAlignment}
              x={xPixel}
              y={labelY}
            >
              {label}
            </LabelComponent>
          )}
        </g>
      );
    }

    return;
  },
);
