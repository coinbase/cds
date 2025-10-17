import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Defs, LinearGradient as Lg, Rect, Stop, Svg } from 'react-native-svg';
import type { SharedProps } from '@coinbase/cds-common';

function getAlpha(color: string) {
  const match = color.includes('rgba') && color.match(/,\s?([\d.]*)\)$/);
  if (match) {
    return match[1];
  }
  return '1';
}

type Coordinate = { x: number; y: number };

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
   * @deprecated Use the `elevated` prop instead. This prop will be removed in a future version.
   * Sets layout position between SVG and children. Set it to false when gradient should overlay children content.
   * @default true
   */
  isBelowChildren?: boolean;
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
  isBelowChildren = true,
  elevated,
  angle = 180,
  style,
  pointerEvents,
  testID,
}: LinearGradientProps) {
  const svg = useMemo(() => {
    const anglePI = (-angle * Math.PI) / 180;
    const x1 = start?.x ?? Math.round(50 + Math.sin(anglePI) * 50) / 100;
    const y1 = start?.y ?? Math.round(50 + Math.cos(anglePI) * 50) / 100;
    const x2 = end?.x ?? Math.round(50 + Math.sin(anglePI + Math.PI) * 50) / 100;
    const y2 = end?.y ?? Math.round(50 + Math.cos(anglePI + Math.PI) * 50) / 100;

    return (
      <View key="GrandientSvgContainer" style={StyleSheet.absoluteFillObject}>
        <Svg height="100%" width="100%">
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
          <Rect fill="url(#LinearGradient)" height="100%" width="100%" />
        </Svg>
      </View>
    );
  }, [colors, start, end, angle, stops]);

  const items = isBelowChildren || !elevated ? [svg, children] : [children, svg];
  return (
    <View pointerEvents={pointerEvents} style={style} testID={testID}>
      {items}
    </View>
  );
}
