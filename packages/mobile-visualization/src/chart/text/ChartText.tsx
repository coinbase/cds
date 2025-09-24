import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import {
  Defs,
  FeDropShadow,
  Filter,
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

// Module-level counter for generating stable unique IDs
let filterIdCounter = 0;

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
    styles?: {
      text?: React.SVGProps<SVGTextElement>;
      rect?: React.SVGProps<SVGRectElement>;
    };
    // override box responsive style
    borderRadius?: ThemeVars.BorderRadius;
    /**
     * Apply a filter to the background rect (e.g., drop shadow).
     * When using elevation, a default drop shadow filter is applied.
     * You can override this with a custom filter ID.
     */
    filter?: string;
  };

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
    styles,
    opacity = 1,
    filter,
  }) => {
    const theme = useTheme();
    const { width: chartWidth, height: chartHeight } = useChartContext();
    const filterIdRef = useRef<string>();

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

    const [textLayoutRect, onTextLayout] = useLayout();
    const [textBBox, setTextBBox] = useState<Rect | null>(null);
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
      if (!backgroundRectDimensions) return null;
      return {
        x: backgroundRectDimensions.x + overflowAmount.x,
        y: backgroundRectDimensions.y + overflowAmount.y,
        width: backgroundRectDimensions.width,
        height: backgroundRectDimensions.height,
      };
    }, [backgroundRectDimensions, overflowAmount.x, overflowAmount.y]);

    // Convert layout rect to bbox format when text layout changes
    useEffect(() => {
      if (textLayoutRect.width > 0 && textLayoutRect.height > 0) {
        // The layout rect already has the correct position based on text anchor and alignment
        // We just need to apply any dx/dy offsets
        const bboxX = textLayoutRect.x + (dx ? Number(dx) : 0);
        const bboxY = textLayoutRect.y + (dy ? Number(dy) : 0);

        setTextBBox({
          x: bboxX,
          y: bboxY,
          width: textLayoutRect.width,
          height: textLayoutRect.height,
        });
      }
    }, [textLayoutRect, dx, dy]);

    // send latest calculated dimensions (adjusted for translation) to parent
    useEffect(() => {
      if (onDimensionsChange && reportedRect !== null) {
        onDimensionsChange(reportedRect);
      }
    }, [reportedRect, onDimensionsChange]);

    // Generate stable filter ID for this instance
    const filterId = useMemo(() => {
      if (!elevation && !filter) return undefined;
      if (filter) return filter; // Use custom filter if provided

      // Generate a stable ID only once for this component instance
      if (!filterIdRef.current) {
        filterIdRef.current = `chart-text-shadow-${++filterIdCounter}`;
      }
      return filterIdRef.current;
    }, [elevation, filter]);

    // Calculate shadow properties based on elevation
    const shadowProps = useMemo(() => {
      if (!elevation || filter) return null; // Skip if using custom filter

      // Map elevation levels to shadow properties
      const shadowMap = {
        1: { dx: 0, dy: 1, stdDeviation: 2, floodOpacity: 0.1 },
        2: { dx: 0, dy: 2, stdDeviation: 3, floodOpacity: 0.12 },
        3: { dx: 0, dy: 3, stdDeviation: 4, floodOpacity: 0.14 },
        4: { dx: 0, dy: 4, stdDeviation: 5, floodOpacity: 0.16 },
        5: { dx: 0, dy: 5, stdDeviation: 6, floodOpacity: 0.18 },
      };

      return shadowMap[elevation as keyof typeof shadowMap] || shadowMap[1];
    }, [elevation, filter]);

    return (
      <G opacity={isDimensionsReady ? opacity : 0} testID={testID}>
        {/* Define filter for drop shadow if elevation is provided */}
        {filterId && shadowProps && (
          <Defs>
            <Filter id={filterId}>
              <FeDropShadow
                dx={shadowProps.dx}
                dy={shadowProps.dy}
                floodColor="black"
                floodOpacity={shadowProps.floodOpacity}
                stdDeviation={shadowProps.stdDeviation}
              />
            </Filter>
          </Defs>
        )}
        {backgroundRectDimensions && effectiveBackground !== 'transparent' && (
          <SvgRect
            fill={effectiveBackground}
            filter={filterId ? `url(#${filterId})` : undefined}
            height={backgroundRectDimensions.height}
            rx={borderRadius ? theme.borderRadius[borderRadius] : undefined}
            ry={borderRadius ? theme.borderRadius[borderRadius] : undefined}
            width={backgroundRectDimensions.width}
            x={backgroundRectDimensions.x + overflowAmount.x}
            y={backgroundRectDimensions.y + overflowAmount.y}
          />
        )}
        <G transform={`translate(${overflowAmount.x}, ${overflowAmount.y})`}>
          <Text
            alignmentBaseline={alignmentBaseline}
            dx={dx}
            dy={dy}
            fill={effectiveColor}
            fontFamily={fontFamily}
            fontSize={fontSize}
            fontWeight={fontWeight}
            textAnchor={textAnchor}
            x={x}
            y={y}
          >
            {children}
          </Text>
        </G>
        <Text
          alignmentBaseline={alignmentBaseline}
          dx={dx}
          dy={dy}
          fill="transparent"
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          onLayout={onTextLayout}
          opacity={0}
          textAnchor={textAnchor}
          x={x}
          y={y}
        >
          {children}
        </Text>
      </G>
    );
  },
);
