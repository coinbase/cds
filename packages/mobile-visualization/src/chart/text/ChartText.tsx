import React, { memo, useEffect, useMemo } from 'react';
import { G, Rect as SvgRect, Text } from 'react-native-svg';
import type { ThemeVars } from '@coinbase/cds-common';
import type { ElevationLevels, Rect, SharedProps } from '@coinbase/cds-common/types';
import { type ChartPadding, getPadding } from '@coinbase/cds-common/visualizations/charts';
import { useChartContext } from '@coinbase/cds-common/visualizations/charts';
import { useLayout } from '@coinbase/cds-mobile/hooks/useLayout';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

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
    React.SVGProps<SVGTextElement>,
    | 'textAnchor'
    | 'dominantBaseline'
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
    styles?: {
      text?: React.SVGProps<SVGTextElement>;
      rect?: React.SVGProps<SVGRectElement>;
    };
    // override box responsive style
    borderRadius?: ThemeVars.BorderRadius;
  };

export const ChartText = memo<ChartTextProps>(
  ({
    children,
    x,
    y,
    textAnchor = 'middle',
    dominantBaseline = 'central',
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
    styles,
    opacity = 1,
  }) => {
    const theme = useTheme();
    const { width: chartWidth, height: chartHeight } = useChartContext();

    // Use theme-based default color
    const effectiveColor = color ?? theme.color.fgMuted;
    const effectiveBackground =
      background === 'transparent'
        ? 'transparent'
        : (background ?? (elevation && elevation > 0 ? theme.color.bg : 'transparent'));
    const fullChartBounds = useMemo(
      () => ({ x: 0, y: 0, width: chartWidth, height: chartHeight }),
      [chartWidth, chartHeight],
    );

    const [textBBox, onTextLayout] = useLayout();
    const isDimensionsReady = disableRepositioning || textBBox !== null;

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
      if (!textBBox || !parentBounds || parentBounds.width <= 0 || parentBounds.height <= 0) {
        return { x: 0, y: 0 };
      }

      let x = 0;
      let y = 0;

      // X-axis overflow
      if (textBBox.x < parentBounds.x) {
        x = parentBounds.x - textBBox.x; // positive = shift right
      } else if (textBBox.x + textBBox.width > parentBounds.x + parentBounds.width) {
        x = parentBounds.x + parentBounds.width - (textBBox.x + textBBox.width); // negative = shift left
      }

      // Y-axis overflow
      if (textBBox.y < parentBounds.y) {
        y = parentBounds.y - textBBox.y; // positive = shift down
      } else if (textBBox.y + textBBox.height > parentBounds.y + parentBounds.height) {
        y = parentBounds.y + parentBounds.height - (textBBox.y + textBBox.height); // negative = shift up
      }

      return { x, y };
    }, [textBBox, fullChartBounds, bounds, disableRepositioning]);

    // Compose the final reported rect including any overflow translation applied
    const reportedRect = useMemo(() => {
      if (!textBBox) return null;
      return {
        x: textBBox.x + overflowAmount.x,
        y: textBBox.y + overflowAmount.y,
        width: textBBox.width,
        height: textBBox.height,
      };
    }, [textBBox, overflowAmount.x, overflowAmount.y]);

    // send latest calculated dimensions (adjusted for translation) to parent
    useEffect(() => {
      if (onDimensionsChange && reportedRect !== null) {
        onDimensionsChange(reportedRect);
      }
    }, [reportedRect, onDimensionsChange]);

    return (
      <G
        opacity={isDimensionsReady ? opacity : 0}
        testID={testID}
        transform={`translate(${overflowAmount.x}, ${overflowAmount.y})`}
      >
        {backgroundRectDimensions && effectiveBackground !== 'transparent' && (
          <SvgRect
            fill={effectiveBackground}
            height={backgroundRectDimensions.height}
            rx={borderRadius ? theme.borderRadius[borderRadius] : undefined}
            ry={borderRadius ? theme.borderRadius[borderRadius] : undefined}
            width={backgroundRectDimensions.width}
            x={backgroundRectDimensions.x}
            y={backgroundRectDimensions.y}
          />
        )}
        <Text
          dx={dx}
          dy={dy}
          fill={effectiveColor}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          onLayout={onTextLayout}
          textAnchor={textAnchor as any}
          x={x}
          y={y}
        >
          {children}
        </Text>
      </G>
    );
  },
);
