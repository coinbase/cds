import type { DimensionValue, TextStyle, ViewStyle } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { ElevationLevels } from '@coinbase/cds-common/types/ElevationLevels';
import type { TypeOrNumber } from '@coinbase/cds-common/types/TypeOrNumber';

import type { Theme } from '../core/theme';

/** Position-related style props using React Native types. Use this instead of common's PositionStyles for mobile. */
export type PositionStyles = Pick<
  ViewStyle,
  'position' | 'top' | 'bottom' | 'left' | 'right' | 'zIndex'
>;

type NegativeSpace = TypeOrNumber<'0' | `-${Exclude<ThemeVars.Space, 0>}`>;

// TO DO: If possible, refactor DimensionValue to ViewStyle['width'] etc
export type StyleProps = {
  color?: ThemeVars.Color;
  background?: ThemeVars.Color;
  borderColor?: ThemeVars.Color;
  borderWidth?: ThemeVars.BorderWidth;
  borderTopWidth?: ThemeVars.BorderWidth;
  borderEndWidth?: ThemeVars.BorderWidth;
  borderBottomWidth?: ThemeVars.BorderWidth;
  borderStartWidth?: ThemeVars.BorderWidth;
  borderRadius?: ThemeVars.BorderRadius;
  borderTopLeftRadius?: ThemeVars.BorderRadius;
  borderTopRightRadius?: ThemeVars.BorderRadius;
  borderBottomLeftRadius?: ThemeVars.BorderRadius;
  borderBottomRightRadius?: ThemeVars.BorderRadius;
  fontFamily?: ThemeVars.FontFamily | 'inherit';
  fontSize?: ThemeVars.FontSize | 'inherit';
  fontWeight?: ThemeVars.FontWeight | 'inherit';
  lineHeight?: ThemeVars.LineHeight | 'inherit';
  textDecorationStyle?: TextStyle['textDecorationStyle'];
  textDecorationLine?: TextStyle['textDecorationLine'];
  textTransform?: TextStyle['textTransform'];
  userSelect?: TextStyle['userSelect'];
  display?: ViewStyle['display'];
  overflow?: ViewStyle['overflow'];
  gap?: ThemeVars.Space;
  columnGap?: ThemeVars.Space;
  rowGap?: ThemeVars.Space;
  justifyContent?: ViewStyle['justifyContent'];
  alignContent?: ViewStyle['alignContent'];
  alignItems?: ViewStyle['alignItems'];
  alignSelf?: ViewStyle['alignSelf'];
  flexDirection?: ViewStyle['flexDirection'];
  flexWrap?: ViewStyle['flexWrap'];
  // position?: Position;
  position?: ViewStyle['position'];
  zIndex?: ViewStyle['zIndex'];
  padding?: ThemeVars.Space;
  paddingX?: ThemeVars.Space;
  paddingY?: ThemeVars.Space;
  paddingTop?: ThemeVars.Space;
  paddingBottom?: ThemeVars.Space;
  paddingStart?: ThemeVars.Space;
  paddingEnd?: ThemeVars.Space;
  margin?: NegativeSpace;
  marginX?: NegativeSpace;
  marginY?: NegativeSpace;
  marginTop?: NegativeSpace;
  marginBottom?: NegativeSpace;
  marginStart?: NegativeSpace;
  marginEnd?: NegativeSpace;
  elevation?: ElevationLevels;
  textAlign?: TextStyle['textAlign'];
  width?: DimensionValue;
  height?: DimensionValue;
  minWidth?: DimensionValue;
  minHeight?: DimensionValue;
  maxWidth?: DimensionValue;
  maxHeight?: DimensionValue;
  aspectRatio?: ViewStyle['aspectRatio'];
  top?: DimensionValue;
  bottom?: DimensionValue;
  left?: DimensionValue;
  right?: DimensionValue;
  // top?: ViewStyle['top'];
  // bottom?: ViewStyle['bottom'];
  // left?: ViewStyle['left'];
  // right?: ViewStyle['right'];
  transform?: ViewStyle['transform'];
  flexBasis?: DimensionValue;
  // flexBasis?: ViewStyle['flexBasis'];
  flexGrow?: ViewStyle['flexGrow'];
  flexShrink?: ViewStyle['flexShrink'];
  opacity?: ViewStyle['opacity'];
};

/** StyleProps that get their values from the theme. */
export const themedStyleProps = {
  color: 'color',
  background: 'color',
  borderColor: 'color',
  borderWidth: 'borderWidth',
  borderTopWidth: 'borderWidth',
  borderEndWidth: 'borderWidth',
  borderBottomWidth: 'borderWidth',
  borderStartWidth: 'borderWidth',
  borderRadius: 'borderRadius',
  borderTopLeftRadius: 'borderRadius',
  borderTopRightRadius: 'borderRadius',
  borderBottomLeftRadius: 'borderRadius',
  borderBottomRightRadius: 'borderRadius',
  fontFamily: 'fontFamily',
  fontSize: 'fontSize',
  fontWeight: 'fontWeight',
  lineHeight: 'lineHeight',
  gap: 'space',
  columnGap: 'space',
  rowGap: 'space',
  padding: 'space',
  paddingX: 'space',
  paddingY: 'space',
  paddingTop: 'space',
  paddingBottom: 'space',
  paddingStart: 'space',
  paddingEnd: 'space',
  margin: 'space',
  marginX: 'space',
  marginY: 'space',
  marginTop: 'space',
  marginBottom: 'space',
  marginStart: 'space',
  marginEnd: 'space',
} as const satisfies { [key in keyof StyleProps]: keyof Theme };

/** For StyleProps whose names are not keys of ViewStyle & TextStyle, this maps those StyleProp names to their ViewStyle & TextStyle keys. */
const stylePropAliases = {
  background: ['backgroundColor'],
  paddingX: ['paddingStart', 'paddingEnd'],
  paddingY: ['paddingTop', 'paddingBottom'],
  marginX: ['marginStart', 'marginEnd'],
  marginY: ['marginTop', 'marginBottom'],
} as const satisfies { [key in keyof StyleProps]: (keyof (ViewStyle & TextStyle))[] };

export const getStyles = (styleProps: StyleProps, theme: Theme) => {
  const style: ViewStyle | TextStyle = {};

  for (const styleProp in styleProps) {
    const value = styleProps[styleProp as keyof StyleProps];
    if (value === undefined) continue;

    // If there are no stylePropAliases for this styleProp...
    if (typeof stylePropAliases[styleProp as keyof typeof stylePropAliases] === 'undefined') {
      // If it's not themed...
      if (typeof themedStyleProps[styleProp as keyof typeof themedStyleProps] === 'undefined') {
        style[styleProp as keyof typeof style] = value as any;
      }
      // If it is themed and it is margin* prop
      else if (styleProp.startsWith('margin') && value !== null) {
        style[styleProp as keyof typeof style] = -(
          theme[themedStyleProps[styleProp as keyof typeof themedStyleProps]] as any
        )[-(value as any)] as any;
      }
      // If it is themed...
      else {
        style[styleProp as keyof typeof style] = (
          theme[themedStyleProps[styleProp as keyof typeof themedStyleProps]] as any
        )[value as any];
      }
    } else {
      for (const propAlias of stylePropAliases[styleProp as keyof typeof stylePropAliases]) {
        // If it's not themed...
        if (typeof themedStyleProps[styleProp as keyof typeof themedStyleProps] === 'undefined') {
          style[propAlias as keyof typeof style] = value as any;
        }
        // If it is themed and it is margin* prop
        else if (styleProp.startsWith('margin') && value !== null) {
          style[propAlias as keyof typeof style] = -(
            theme[themedStyleProps[styleProp as keyof typeof themedStyleProps]] as any
          )[-(value as number)] as any;
        }
        // If it is themed...
        else {
          style[propAlias as keyof typeof style] = (
            theme[themedStyleProps[styleProp as keyof typeof themedStyleProps]] as any
          )[value as any];
        }
      }
    }
  }

  return style;
};

export const getViewStyles: (styleProps: StyleProps, theme: Theme) => ViewStyle = getStyles;
export const getTextStyles: (styleProps: StyleProps, theme: Theme) => TextStyle = getStyles;
