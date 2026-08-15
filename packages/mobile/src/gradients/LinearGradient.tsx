import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import { Defs, LinearGradient as Lg, Rect, Stop, Svg } from 'react-native-svg';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';

function getAlpha(color: string) {
  const match = color.includes('rgba') && color.match(/,\s?([\d.]*)\)$/);
  if (match) {
    return match[1];
  }
  return '1';
}

type Coordinate = { x: number; y: number };

type PixelSize = Pick<LayoutChangeEvent['nativeEvent']['layout'], 'width' | 'height'> | null;

type LinearGradientProps = {
  /**
   * [Optional] pointerEvents determines how the view will handle touch events.
   */
  pointerEvents?: React.ComponentProps<typeof View>['pointerEvents'];
  /**
   * [Optional] The style for the LinearGradiend wrapper.
   */
  style?: React.ComponentProps<typeof View>['style'];
  /**
   * [Optional] Start position of the gradient. By default start is calculated
   * based on the angle prop.
   */
  start?: Coordinate;
  /**
   * [Optional] End position of the gradient. By default end is calculated
   * based on the angle prop.
   * */
  end?: Coordinate;
  /**
   * The relative positions of colors. If supplied, it must be of the same length as colors.
   * @default [0, 1]
   */
  stops?: number[];
  /**
   * React children
   */
  children?: React.ReactNode;
  /**
   * Colors to be distributed between start and end.
   */
  colors: NonNullable<string>[];
  /**
   * @default false
   * Linear gradient will overlay the children content when true
   */
  elevated?: boolean;
  /**
   * Sets gradient angle.
   * @default 180
   */
  angle?: number;
} & SharedProps;

const defaultStops = [0, 1];

export function LinearGradient({
  children,
  start,
  end,
  stops = defaultStops,
  colors,
  elevated,
  angle = 180,
  style,
  pointerEvents,
  testID,
}: LinearGradientProps) {
  const [pixelSize, setPixelSize] = useState<PixelSize>(() => {
    const flat = StyleSheet.flatten(style);
    return flat && typeof flat.width === 'number' && typeof flat.height === 'number'
      ? { width: flat.width, height: flat.height }
      : null;
  });

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const width = Math.round(event.nativeEvent.layout.width);
    const height = Math.round(event.nativeEvent.layout.height);
    setPixelSize((prev) =>
      prev && prev.width === width && prev.height === height ? prev : { width, height },
    );
  }, []);

  const svgWidth = pixelSize ? pixelSize.width : 0;
  const svgHeight = pixelSize ? pixelSize.height : 0;

  const containerStyle = useMemo(
    () => ({ position: 'absolute' as const, top: 0, left: 0, width: svgWidth, height: svgHeight }),
    [svgWidth, svgHeight],
  );

  const svg = useMemo(() => {
    const anglePI = (-angle * Math.PI) / 180;
    const x1 = start?.x ?? Math.round(50 + Math.sin(anglePI) * 50) / 100;
    const y1 = start?.y ?? Math.round(50 + Math.cos(anglePI) * 50) / 100;
    const x2 = end?.x ?? Math.round(50 + Math.sin(anglePI + Math.PI) * 50) / 100;
    const y2 = end?.y ?? Math.round(50 + Math.cos(anglePI + Math.PI) * 50) / 100;

    return (
      <View key="GrandientSvgContainer" style={containerStyle}>
        <Svg height={svgHeight} width={svgWidth}>
          <Defs>
            <Lg id="LinearGradient" x1={x1} x2={x2} y1={y1} y2={y2}>
              {colors.map((color, index) => (
                <Stop
                  key={color + String(index)}
                  offset={stops[index]}
                  stopColor={color}
                  stopOpacity={getAlpha(color)}
                />
              ))}
            </Lg>
          </Defs>
          <Rect fill="url(#LinearGradient)" height={svgHeight} width={svgWidth} />
        </Svg>
      </View>
    );
  }, [colors, start, end, angle, stops, containerStyle, svgWidth, svgHeight]);

  const items = !elevated ? [svg, children] : [children, svg];
  return (
    <View onLayout={handleLayout} pointerEvents={pointerEvents} style={style} testID={testID}>
      {items}
    </View>
  );
}
