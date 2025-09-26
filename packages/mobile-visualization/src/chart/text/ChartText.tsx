import React, { memo, useEffect, useMemo, useState } from 'react';
import {
  Circle,
  ForeignObject,
  // Defs,
  G,
  Rect as SvgRect,
  Text,
  type TextProps,
} from 'react-native-svg';
import type { ThemeVars } from '@coinbase/cds-common';
import type { ElevationLevels, Rect, SharedProps } from '@coinbase/cds-common/types';
import { type ChartPadding, getPadding } from '@coinbase/cds-common/visualizations/charts';
import { useChartContext } from '@coinbase/cds-common/visualizations/charts';
import { useLayout } from '@coinbase/cds-mobile/hooks/useLayout';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Box } from '@coinbase/cds-mobile/layout';

// Define the valid SVG children for the <text> element.
type ValidChartTextChildElements =
  | React.ReactElement<React.SVGProps<SVGTSpanElement>, 'tspan'>
  | React.ReactElement<React.SVGProps<SVGTextPathElement>, 'textPath'>;

export type ChartTextChildren =
  | string
  | number
  | null
  | undefined
  | ValidChartTextChildElements
  | ValidChartTextChildElements[];

export type ChartTextProps = SharedProps &
  Pick<
    TextProps,
    | 'textAnchor'
    | 'alignmentBaseline'
    | 'dx'
    | 'dy'
    | 'fontSize'
    | 'fontFamily'
    | 'fontWeight'
    | 'opacity'
  > & {
    /**
     * The text color.
     * @default theme.color.fgMuted
     */
    color?: string;
    /**
     * The background color of the text's container element.
     * @default 'transparent'
     */
    background?: string;
    // override box responsive style
    /**
     * The elevation for the background.
     */
    elevation?: ElevationLevels;
    /**
     * The text content to display.
     */
    children: ChartTextChildren;
    /**
     * The desired x position in SVG pixels.
     * @note Text will be automatically positioned to fit within bounds unless `disableRepositioning` is true.
     */
    x: number;
    /**
     * The desired y position in SVG pixels.
     * @note Text will be automatically positioned to fit within bounds unless `disableRepositioning` is true.
     */
    y: number;
    /**
     * When true, disables automatic repositioning to fit within bounds.
     * @default false
     */
    disableRepositioning?: boolean;
    /**
     * Optional bounds rectangle to constrain the text within. If provided, text will be positioned
     * to stay within these bounds. If not provided, defaults to the full chart bounds.
     */
    bounds?: Rect;
    /**
     * Callback fired when text dimensions change.
     * Used for collision detection and smart positioning.
     * Returns the adjusted position and dimensions.
     */
    onDimensionsChange?: (rect: Rect) => void;
    /**
     * Padding around the text content for the background rect.
     * Only affects the background, text position remains unchanged.
     */
    padding?: number | ChartPadding;
    // override box responsive style
    borderRadius?: ThemeVars.BorderRadius;
  };

type ChartTextVisibleProps = {
  children: ChartTextChildren;
  background: string;
  elevation?: ElevationLevels;
  textAnchor: TextProps['textAnchor'];
  alignmentBaseline: TextProps['alignmentBaseline'];
  fontFamily: TextProps['fontFamily'];
  fontSize: TextProps['fontSize'];
  fontWeight: TextProps['fontWeight'];
  textDimensions: Rect;
  fill: string;
  borderRadius?: ThemeVars.BorderRadius;
  padding?: number | ChartPadding;
  dx?: TextProps['dx'];
  dy?: TextProps['dy'];
};

const ChartTextVisible = memo<ChartTextVisibleProps>(
  ({
    children,
    background,
    elevation = 0,
    textAnchor,
    alignmentBaseline,
    fontFamily,
    fontSize,
    fontWeight,
    fill,
    borderRadius,
    padding: paddingInput,
    textDimensions,
    dx,
    dy,
  }) => {
    const padding = useMemo(() => getPadding(paddingInput), [paddingInput]);

    const elevationSpacing = useMemo(() => {
      if (!elevation) return { top: 0, right: 0, bottom: 0, left: 0 };

      const spacing =
        elevation === 1
          ? { top: 12, right: 12, bottom: 20, left: 12 } // shadowRadius on sides, shadowOffset.height + shadowRadius on bottom
          : { top: 24, right: 24, bottom: 32, left: 24 }; // elevation 2 spacing

      return spacing;
    }, [elevation]);

    const rectHeight = useMemo(
      () => textDimensions.height + padding.top + padding.bottom,
      [textDimensions, padding],
    );
    const rectWidth = useMemo(
      () => textDimensions.width + padding.left + padding.right,
      [textDimensions, padding],
    );

    return (
      <G>
        {background !== 'transparent' && (
          <ForeignObject
            height={
              textDimensions.height +
              padding.top +
              padding.bottom +
              elevationSpacing.top +
              elevationSpacing.bottom
            }
            width={
              textDimensions.width +
              padding.left +
              padding.right +
              elevationSpacing.left +
              elevationSpacing.right
            }
            x={textDimensions.x - padding.left - elevationSpacing.left}
            y={textDimensions.y - padding.top - elevationSpacing.top}
          >
            <Box height="100%" style={{ position: 'relative' }} width="100%">
              <Box
                borderRadius={borderRadius}
                elevation={1}
                height={rectHeight}
                style={{
                  position: 'absolute',
                  top: elevationSpacing.top,
                  left: elevationSpacing.left,
                  backgroundColor: background,
                }}
                width={rectWidth}
              />
            </Box>
          </ForeignObject>
        )}
        <Text
          alignmentBaseline={alignmentBaseline}
          dx={dx}
          dy={dy}
          fill={fill}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          textAnchor={textAnchor}
        >
          {children}
        </Text>
      </G>
    );
  },
);

export const ChartText = memo<ChartTextProps>(
  ({
    children,
    x,
    y,
    textAnchor = 'middle',
    alignmentBaseline = 'central',
    dx,
    dy,
    disableRepositioning = false,
    bounds,
    testID,
    fontFamily,
    fontSize = 12,
    fontWeight,
    elevation,
    color,
    background = 'transparent',
    borderRadius,
    padding: paddingInput,
    onDimensionsChange,
    opacity = 1,
  }) => {
    const theme = useTheme();
    const { width: chartWidth, height: chartHeight } = useChartContext();

    const fullChartBounds = useMemo(
      () => ({ x: 0, y: 0, width: chartWidth, height: chartHeight }),
      [chartWidth, chartHeight],
    );

    const [_textSize, onTextSizeLayout] = useLayout();
    const [textSize, setTextSize] = useState<Rect | null>(null);

    // Sometimes dimensions will be incorrect and report 0, so we update each time they are non zero
    // todo: we could move the size logic into separate function which only reports then
    useEffect(() => {
      if (_textSize && _textSize.width > 0 && _textSize.height > 0) {
        setTextSize({
          x: _textSize.x,
          y: _textSize.y,
          width: _textSize.width,
          height: _textSize.height,
        });
      }
    }, [_textSize]);

    const textBBox = useMemo(() => {
      if (!textSize) {
        return null;
      }

      return {
        x: x + textSize.x,
        y: y + textSize.y,
        width: textSize.width,
        height: textSize.height,
      };
    }, [x, y, textSize]);

    const isDimensionsReady = disableRepositioning || textBBox !== null;

    // todo: make sure this works with chart text children
    const backgroundRectDimensions = useMemo(() => {
      if (!textBBox) {
        return null;
      }

      const padding = getPadding(paddingInput);
      return {
        x: textBBox.x - padding.left,
        y: textBBox.y - padding.top,
        width: textBBox.width + padding.left + padding.right,
        height: textBBox.height + padding.top + padding.bottom,
      };
    }, [textBBox, paddingInput]);

    const overflowAmount = useMemo(() => {
      if (disableRepositioning) {
        return { x: 0, y: 0 };
      }

      const parentBounds = bounds ?? fullChartBounds;
      // TODO: it might be more clear to allow chartRect to be null until it has been measured after first render
      if (
        !backgroundRectDimensions ||
        !parentBounds ||
        parentBounds.width <= 0 ||
        parentBounds.height <= 0
      ) {
        return { x: 0, y: 0 };
      }

      let x = 0;
      let y = 0;

      // X-axis overflow
      if (backgroundRectDimensions.x < parentBounds.x) {
        x = parentBounds.x - backgroundRectDimensions.x; // positive = shift right
      } else if (
        backgroundRectDimensions.x + backgroundRectDimensions.width >
        parentBounds.x + parentBounds.width
      ) {
        x =
          parentBounds.x +
          parentBounds.width -
          (backgroundRectDimensions.x + backgroundRectDimensions.width); // negative = shift left
      }

      // Y-axis overflow
      if (backgroundRectDimensions.y < parentBounds.y) {
        y = parentBounds.y - backgroundRectDimensions.y; // positive = shift down
      } else if (
        backgroundRectDimensions.y + backgroundRectDimensions.height >
        parentBounds.y + parentBounds.height
      ) {
        y =
          parentBounds.y +
          parentBounds.height -
          (backgroundRectDimensions.y + backgroundRectDimensions.height); // negative = shift up
      }

      return { x, y };
    }, [backgroundRectDimensions, fullChartBounds, bounds, disableRepositioning]);

    const reportedRect = useMemo(() => {
      if (!backgroundRectDimensions) return null;
      return {
        x: backgroundRectDimensions.x + overflowAmount.x,
        y: backgroundRectDimensions.y + overflowAmount.y,
        width: backgroundRectDimensions.width,
        height: backgroundRectDimensions.height,
      };
    }, [backgroundRectDimensions, overflowAmount.x, overflowAmount.y]);

    useEffect(() => {
      if (onDimensionsChange && reportedRect !== null) {
        onDimensionsChange(reportedRect);
      }
    }, [reportedRect, onDimensionsChange]);

    return (
      <G opacity={isDimensionsReady ? opacity : 0} testID={testID}>
        {textSize && (
          <G transform={`translate(${x + overflowAmount.x}, ${y + overflowAmount.y})`}>
            <ChartTextVisible
              alignmentBaseline={alignmentBaseline}
              background={background}
              borderRadius={borderRadius}
              dx={dx}
              dy={dy}
              elevation={elevation}
              fill={color ?? theme.color.fgMuted}
              fontFamily={fontFamily}
              fontSize={fontSize}
              fontWeight={fontWeight}
              padding={paddingInput}
              textAnchor={textAnchor}
              textDimensions={textSize}
            >
              {children}
            </ChartTextVisible>
          </G>
        )}
        <Text
          alignmentBaseline={alignmentBaseline}
          dx={dx}
          dy={dy}
          fill="transparent"
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          onLayout={onTextSizeLayout}
          opacity={0}
          textAnchor={textAnchor}
        >
          {children}
        </Text>
      </G>
    );
  },
);
