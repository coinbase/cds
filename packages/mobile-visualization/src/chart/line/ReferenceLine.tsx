import { memo } from 'react';
import { useDerivedValue } from 'react-native-reanimated';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import type { AnimatedProp } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import type {
  ChartTextChildren,
  ChartTextProps,
  TextHorizontalAlignment,
  TextVerticalAlignment,
} from '../text/ChartText';
import type { ChartInset } from '../utils';
import { unwrapAnimatedValue } from '../utils';
import { getPointOnSerializableScale } from '../utils/point';

import { DefaultReferenceLineLabel } from './DefaultReferenceLineLabel';
import { DottedLine } from './DottedLine';
import type { LineComponent } from './Line';

export type ReferenceLineLabelComponentProps = Pick<
  ChartTextProps,
  | 'x'
  | 'y'
  | 'children'
  | 'color'
  | 'inset'
  | 'background'
  | 'borderRadius'
  | 'disableRepositioning'
  | 'horizontalAlignment'
  | 'verticalAlignment'
  | 'font'
  | 'fontWeight'
  | 'fontFamilies'
  | 'opacity'
  | 'dx'
  | 'dy'
  | 'elevated'
  | 'paragraphAlignment'
> & {
  /**
   * Bounds inset for label to prevent cutoff at chart edges.
   * Can be a number (applied to all sides) or a ChartInset object.
   * @default { top: 4, bottom: 20, left: 12, right: 12 } when elevated is true, otherwise undefined
   */
  boundsInset?: number | ChartInset;
};

export type ReferenceLineLabelComponent = React.FC<ReferenceLineLabelComponentProps>;

export type ReferenceLineBaseProps = {
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
   * @default theme.color.bgLine
   */
  stroke?: string;
};

type HorizontalReferenceLineProps = ReferenceLineBaseProps & {
  /**
   * Y-value for horizontal reference line (data value).
   */
  dataY: AnimatedProp<number>;
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

type VerticalReferenceLineProps = ReferenceLineBaseProps & {
  /**
   * X-value for vertical reference line (data index).
   */
  dataX: AnimatedProp<number>;
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
    LineComponent = DottedLine,
    LabelComponent = DefaultReferenceLineLabel,
    labelElevated,
    labelFont,
    labelDx,
    labelDy,
    labelHorizontalAlignment,
    labelVerticalAlignment,
    labelBoundsInset,
    stroke,
  }) => {
    const theme = useTheme();
    const { getXSerializableScale, getYSerializableScale, drawingArea } =
      useCartesianChartContext();

    const xScale = getXSerializableScale();
    const yScale = getYSerializableScale(yAxisId);

    const effectiveLineStroke = stroke ?? theme.color.bgLine;

    // For horizontal lines (dataY defined): default to verticalAlignment: 'middle'
    // For vertical lines (dataX defined): default to horizontalAlignment: 'center'
    const isHorizontal = dataY !== undefined;

    const xPixel = useDerivedValue(() => {
      const dataXValue = unwrapAnimatedValue(dataX);
      return dataXValue !== undefined && xScale
        ? getPointOnSerializableScale(dataXValue, xScale)
        : undefined;
    }, [dataX, xScale]);

    const yPixel = useDerivedValue(() => {
      const dataYValue = unwrapAnimatedValue(dataY);
      return dataYValue !== undefined && yScale
        ? getPointOnSerializableScale(dataYValue, yScale)
        : undefined;
    }, [dataY, yScale]);

    const horizontalLine = useDerivedValue(() => {
      if (yPixel.value === undefined) return;
      return `M${drawingArea.x},${yPixel.value} L${drawingArea.x + drawingArea.width},${yPixel.value}`;
    }, [drawingArea, yPixel]);

    const verticalLine = useDerivedValue(() => {
      if (xPixel.value === undefined) return;
      return `M${xPixel.value},${drawingArea.y} L${xPixel.value},${drawingArea.y + drawingArea.height}`;
    }, [drawingArea, xPixel]);

    const labelXPixel = useDerivedValue(() => xPixel.value ?? 0, [xPixel]);
    const labelYPixel = useDerivedValue(() => yPixel.value ?? 0, [yPixel]);
    const labelOpacity = useDerivedValue(
      () =>
        (dataY !== undefined && yPixel.value !== undefined) ||
        (dataX !== undefined && xPixel.value !== undefined)
          ? 1
          : 0,
      [yPixel],
    );

    if (dataY !== undefined) {
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
          <LineComponent animate={false} d={horizontalLine} stroke={effectiveLineStroke} />
          {label && (
            <LabelComponent
              boundsInset={labelBoundsInset}
              dx={labelDx}
              dy={labelDy}
              elevated={labelElevated}
              font={labelFont}
              horizontalAlignment={labelHorizontalAlignment}
              opacity={labelOpacity}
              verticalAlignment={labelVerticalAlignment ?? (isHorizontal ? 'middle' : undefined)}
              x={labelX}
              y={labelYPixel}
            >
              {label}
            </LabelComponent>
          )}
        </>
      );
    }

    // Vertical reference line logic
    if (dataX !== undefined) {
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
          <LineComponent animate={false} d={verticalLine} stroke={effectiveLineStroke} />
          {label && (
            <LabelComponent
              boundsInset={labelBoundsInset}
              dx={labelDx}
              dy={labelDy}
              elevated={labelElevated}
              font={labelFont}
              horizontalAlignment={
                labelHorizontalAlignment ?? (!isHorizontal ? 'center' : undefined)
              }
              opacity={labelOpacity}
              verticalAlignment={labelVerticalAlignment}
              x={labelXPixel}
              y={labelY}
            >
              {label}
            </LabelComponent>
          )}
        </>
      );
    }
  },
);
