import React, { memo, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { getPointOnScale, useChartContext } from '@coinbase/cds-common/visualizations/charts';
import { cx } from '@coinbase/cds-web';

import { ChartText } from '../text';
import type { ChartTextChildren, ChartTextProps } from '../text/ChartText';

import { DottedLine } from './DottedLine';
import type { LineComponent } from './Line';

/**
 * Configuration for ReferenceLine label rendering using ChartText.
 * Note: The labelConfig styles and classNames will be merged with the top-level
 * styles.text and classNames.text properties if both are provided.
 */
export type ReferenceLineLabelConfig = Pick<
  ChartTextProps,
  | 'dx'
  | 'dy'
  | 'font'
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
  | 'classNames'
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
   * @default 'var(--color-bgLine)'
   */
  stroke?: string;
  /**
   * Configuration for the label rendering.
   * Consolidates styling and positioning options for the ChartText component.
   */
  labelConfig?: ReferenceLineLabelConfig;
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
  labelPosition?: 'left' | 'center' | 'right';
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
  labelPosition?: 'top' | 'center' | 'bottom';
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
    labelPosition,
    testID,
    LineComponent = DottedLine,
    stroke = 'var(--color-bgLine)',
    labelConfig,
    className,
    style,
    classNames,
    styles,
  }) => {
    const { getXScale, getYScale, drawingArea } = useChartContext();

    // Merge default config with user provided config, including text-specific styles and classNames
    const finalLabelConfig: ReferenceLineLabelConfig = useMemo(
      () => ({
        dominantBaseline: 'middle',
        borderRadius: 200,
        color: 'var(--color-fgMuted)',
        elevation: 0,
        padding: { top: 7.5, bottom: 7.5, left: 12, right: 12 },
        ...labelConfig,
        // Merge classNames for text
        classNames: {
          ...labelConfig?.classNames,
          ...(classNames?.label && { text: classNames.label }),
        },
        // Merge styles for text
        styles: {
          ...labelConfig?.styles,
          ...(styles?.label && { text: styles.label }),
        },
      }),
      [labelConfig, classNames?.label, styles?.label],
    );

    // Combine root classNames
    const rootClassName = cx(className, classNames?.root);
    // Combine root styles
    const rootStyle = { ...style, ...styles?.root } as React.CSSProperties | undefined;

    // Horizontal reference line logic
    if (dataY !== undefined) {
      const yScale = getYScale?.(yAxisId);

      // Don't render if we don't have a scale
      if (!yScale) {
        return null;
      }

      const yPixel = yScale(dataY);

      // todo: adjust these to potentially couple with label position and offset for smarter defaults
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
        <g className={rootClassName} data-testid={testID} style={rootStyle}>
          <LineComponent
            animate={false}
            d={`M${drawingArea.x},${yPixel} L${drawingArea.x + drawingArea.width},${yPixel}`}
            stroke={stroke}
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
        </g>
      );
    }

    // Vertical reference line logic
    if (dataX !== undefined) {
      const xScale = getXScale?.();

      // Don't render if we don't have scales
      if (!xScale) {
        return null;
      }

      const xPixel = getPointOnScale(dataX, xScale);

      const getLabelY = () => {
        switch (labelPosition as 'top' | 'center' | 'bottom') {
          case 'top':
            return 0;
          case 'center':
            return drawingArea.y + drawingArea.height / 2;
          case 'bottom':
          default:
            return drawingArea.y + drawingArea.height - 24;
        }
      };

      if (xPixel === undefined) return null;

      return (
        <g className={rootClassName} data-testid={testID} style={rootStyle}>
          <LineComponent
            animate={false}
            d={`M${xPixel},${drawingArea.y} L${xPixel},${drawingArea.y + drawingArea.height}`}
            stroke={stroke}
          />
          {label && (
            <ChartText textAnchor="middle" {...finalLabelConfig} x={xPixel} y={getLabelY()}>
              {label}
            </ChartText>
          )}
        </g>
      );
    }

    // Should not reach here if types are correct
    return null;
  },
);
