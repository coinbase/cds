import { memo, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Circle, type Color, Group, Skia } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import type { PathProps } from '../Path';

import type { AreaComponentProps } from './Area';

export type DottedAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity'> &
  AreaComponentProps & {
    /**
     * Size of the pattern unit (width and height).
     * @default 4
     */
    patternSize?: number;
    /**
     * Size of the dots within the pattern.
     * @default 1
     */
    dotSize?: number;
    /**
     * Opacity of the dots.
     * @default 0.3
     */
    dotOpacity?: number;
  };

/**
 * A dotted area component that creates a pattern of dots.
 * Note: This is a simplified Skia implementation without gradient opacity.
 * For gradient fills, use GradientArea instead.
 */
export const DottedArea = memo<DottedAreaProps>(
  ({
    d,
    fill,
    fillOpacity = 1,
    patternSize = 4,
    dotSize = 1,
    dotOpacity = 0.3,
    clipRect,
    ...pathProps
  }) => {
    const theme = useTheme();
    const context = useCartesianChartContext();

    const drawingArea = clipRect ?? context.drawingArea;
    const effectiveFill = fill ?? theme.color.fgPrimary;
    const effectiveOpacity = fillOpacity * dotOpacity;

    // Generate dot grid positions
    const dots = useMemo(() => {
      if (!drawingArea) return [];

      const positions: Array<{ x: number; y: number }> = [];
      const startX = drawingArea.x;
      const endX = drawingArea.x + drawingArea.width;
      const startY = drawingArea.y;
      const endY = drawingArea.y + drawingArea.height;

      for (let x = startX; x <= endX; x += patternSize) {
        for (let y = startY; y <= endY; y += patternSize) {
          positions.push({ x: x + patternSize / 2, y: y + patternSize / 2 });
        }
      }

      return positions;
    }, [drawingArea, patternSize]);

    // Convert SVG path to Skia clip path
    const clipPath = useMemo(() => {
      if (!d) return null;
      return Skia.Path.MakeFromSVGString(d);
    }, [d]);

    if (!clipPath || !drawingArea) return null;

    return (
      <Group clip={clipPath}>
        {dots.map((pos, index) => (
          <Circle
            key={index}
            c={{ x: pos.x, y: pos.y }}
            color={effectiveFill as Color}
            opacity={effectiveOpacity}
            r={dotSize}
          />
        ))}
      </Group>
    );
  },
);
