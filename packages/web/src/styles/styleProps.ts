/**
 * Import order determines CSS cascade order, therefor affects specificity.
 * Do not change the order of these imports or everything will break.
 */

/* eslint-disable simple-import-sort/imports, no-restricted-imports, @typescript-eslint/no-unused-expressions */

import * as booleanStyles from './booleanStyles';
import * as baseStyles from './responsive/base';
import * as phoneStyles from './responsive/phone';
import * as tabletStyles from './responsive/tablet';
import * as desktopStyles from './responsive/desktop';
import type { TypeOrNumber } from '@coinbase/cds-common/types/TypeOrNumber';
import { globalCDSConfig } from './config';

/**
 * Prevents tree-shaking. Do not remove or everything will break.
 */
booleanStyles;

/**
 * Style props that set classnames but not inline style CSS Variables.
 * @danger You probably don't want to use this type directly. To refer to any
 * style prop, use the StyleProps type instead. Only use this type to reference
 * specifically the static style props (style props that don't use inline styles).
 */
export type StaticStyleProps = {
  [key in keyof Omit<typeof baseStyles, 'dynamic'>]?: TypeOrNumber<keyof (typeof baseStyles)[key]>;
};

/**
 * Maps the StaticStyleProps that are affected by Theme variables to the
 * ThemeVars interface names that affect them.
 */
const stylePropThemeVarMap = {
  color: 'Color',
  background: 'Color',
  borderColor: 'Color',
  borderWidth: 'BorderWidth',
  borderTopWidth: 'BorderWidth',
  borderEndWidth: 'BorderWidth',
  borderBottomWidth: 'BorderWidth',
  borderStartWidth: 'BorderWidth',
  borderRadius: 'BorderRadius',
  borderTopLeftRadius: 'BorderRadius',
  borderTopRightRadius: 'BorderRadius',
  borderBottomLeftRadius: 'BorderRadius',
  borderBottomRightRadius: 'BorderRadius',
  fontFamily: 'FontFamily',
  fontSize: 'FontSize',
  fontWeight: 'FontWeight',
  lineHeight: 'LineHeight',
  gap: 'Space',
  columnGap: 'Space',
  rowGap: 'Space',
  padding: 'Space',
  paddingX: 'Space',
  paddingY: 'Space',
  paddingTop: 'Space',
  paddingBottom: 'Space',
  paddingStart: 'Space',
  paddingEnd: 'Space',
  margin: 'Space',
  marginX: 'Space',
  marginY: 'Space',
  marginTop: 'Space',
  marginBottom: 'Space',
  marginEnd: 'Space',
  marginStart: 'Space',
  elevation: 'Elevation',
} as const satisfies Partial<Record<keyof StaticStyleProps, string>>;

/**
 * The subset of StaticStyleProps that are affected by theme variables.
 * @danger You probably don't want to use this type directly. To refer to any
 * style prop, use the StyleProps type instead. To refer only to static style
 * props (style props that don't use inline styles), use the StaticStyleProps
 * type instead. Only use this type to reference specifically the subset of
 * StaticStyleProps that are affected by theme variables.
 */
export type ThemedStaticStyleProps = {
  [themedStaticStyleProp in keyof typeof stylePropThemeVarMap]?: StaticStyleProps[themedStaticStyleProp];
};

/**
 * The subset of StaticStyleProps that are not affected by theme variables.
 * @danger You probably don't want to use this type directly. To refer to any
 * style prop, use the StyleProps type instead. To refer only to static style
 * props (style props that don't use inline styles), use the StaticStyleProps
 * type instead. Only use this type to reference specifically the subset of
 * StaticStyleProps that are not affected by theme variables.
 */
export type UnthemedStaticStyleProps = Omit<StaticStyleProps, keyof ThemedStaticStyleProps>;

/**
 * Style props that set inline style CSS Variables, and classnames that consume those CSS Variables.
 * @danger You probably don't want to use this type directly. To refer to any
 * style prop, use the StyleProps type instead. Only use this type to reference
 * specifically the dynamic style props (style props that use inline styles).
 */
export type DynamicStyleProps = {
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  minWidth?: React.CSSProperties['minWidth'];
  minHeight?: React.CSSProperties['minHeight'];
  maxWidth?: React.CSSProperties['maxWidth'];
  maxHeight?: React.CSSProperties['maxHeight'];
  aspectRatio?: React.CSSProperties['aspectRatio'];
  top?: React.CSSProperties['top'];
  bottom?: React.CSSProperties['bottom'];
  left?: React.CSSProperties['left'];
  right?: React.CSSProperties['right'];
  transform?: React.CSSProperties['transform'];
  flexBasis?: React.CSSProperties['flexBasis'];
  flexGrow?: React.CSSProperties['flexGrow'];
  flexShrink?: React.CSSProperties['flexShrink'];
  gridTemplateColumns?: React.CSSProperties['gridTemplateColumns'];
  gridTemplateRows?: React.CSSProperties['gridTemplateRows'];
  gridTemplateAreas?: React.CSSProperties['gridTemplateAreas'];
  gridTemplate?: React.CSSProperties['gridTemplate'];
  gridAutoColumns?: React.CSSProperties['gridAutoColumns'];
  gridAutoRows?: React.CSSProperties['gridAutoRows'];
  gridAutoFlow?: React.CSSProperties['gridAutoFlow'];
  grid?: React.CSSProperties['grid'];
  gridRowStart?: React.CSSProperties['gridRowStart'];
  gridColumnStart?: React.CSSProperties['gridColumnStart'];
  gridRowEnd?: React.CSSProperties['gridRowEnd'];
  gridColumnEnd?: React.CSSProperties['gridColumnEnd'];
  gridRow?: React.CSSProperties['gridRow'];
  gridColumn?: React.CSSProperties['gridColumn'];
  gridArea?: React.CSSProperties['gridArea'];
  opacity?: React.CSSProperties['opacity'];
  zIndex?: React.CSSProperties['zIndex'];
};

/**
 * DynamicStyleProps that should have "px" concatenated if they are numbers and not equal to zero.
 */
export const dynamicPixelProps = {
  width: 1,
  height: 1,
  minWidth: 1,
  minHeight: 1,
  maxWidth: 1,
  maxHeight: 1,
  top: 1,
  bottom: 1,
  left: 1,
  right: 1,
  flexBasis: 1,
} as const satisfies Partial<Record<keyof DynamicStyleProps, 1>>;

export type ResponsiveValue<T> = { base?: T; phone?: T; tablet?: T; desktop?: T };

export type ResponsiveProp<T> = T | ResponsiveValue<T>;

export type ResponsiveProps<T> = {
  [key in keyof T]?: ResponsiveProp<T[key]>;
};

export type StyleProps = ResponsiveProps<StaticStyleProps> & ResponsiveProps<DynamicStyleProps>;

/** Position-related style props using CSS types. Use this instead of common's PositionStyles for web. */
export type PositionStyles = Pick<
  StyleProps,
  'position' | 'top' | 'bottom' | 'left' | 'right' | 'zIndex'
>;

export const getStyles = (styleProps: StyleProps, inlineStyle?: React.CSSProperties) => {
  const style: Record<string, unknown> = {};
  let className = '';

  for (const styleProp in styleProps) {
    const value = styleProps[styleProp as keyof DynamicStyleProps];
    if (typeof value === 'undefined') continue;

    // If it's a dynamic style prop...
    if (typeof baseStyles.dynamic[styleProp as keyof typeof baseStyles.dynamic] !== 'undefined') {
      const isPixelProp = dynamicPixelProps[styleProp as keyof typeof dynamicPixelProps];
      // Set the value as an inline style CSS variable, and add the corresponding classname that consumes it
      if (typeof value !== 'object') {
        style['--' + styleProp] =
          isPixelProp && typeof value === 'number' && value !== 0 ? value + 'px' : value;
        className += ' ' + baseStyles.dynamic[styleProp as keyof DynamicStyleProps];
        continue;
      }
      // If it's an object, treat it as a responsive style:
      if (typeof value.base !== 'undefined') {
        style['--' + styleProp] =
          isPixelProp && typeof value.base === 'number' && value.base !== 0
            ? value.base + 'px'
            : value.base;
        className += ' ' + baseStyles.dynamic[styleProp as keyof DynamicStyleProps];
      }
      if (typeof value.phone !== 'undefined') {
        style['--phone-' + styleProp] =
          isPixelProp && typeof value.phone === 'number' && value.phone !== 0
            ? value.phone + 'px'
            : value.phone;
        className += ' ' + phoneStyles.dynamic[styleProp as keyof DynamicStyleProps];
      }
      if (typeof value.tablet !== 'undefined') {
        style['--tablet-' + styleProp] =
          isPixelProp && typeof value.tablet === 'number' && value.tablet !== 0
            ? value.tablet + 'px'
            : value.tablet;
        className += ' ' + tabletStyles.dynamic[styleProp as keyof DynamicStyleProps];
      }
      if (typeof value.desktop !== 'undefined') {
        style['--desktop-' + styleProp] =
          isPixelProp && typeof value.desktop === 'number' && value.desktop !== 0
            ? value.desktop + 'px'
            : value.desktop;
        className += ' ' + desktopStyles.dynamic[styleProp as keyof DynamicStyleProps];
      }
      continue;
    }

    // Otherwise, if it's a static style prop...
    if (typeof value !== 'object') {
      className +=
        ' ' +
        // @ts-expect-error - Key type
        (baseStyles[styleProp][value] ??
          // @ts-expect-error - Key type
          globalCDSConfig.current.extendStyleProps?.[stylePropThemeVarMap[styleProp]][value]?.[
            styleProp
          ].base);
    } else {
      // If it's an object, treat it as a responsive style: add the corresponding classnames
      if (typeof value.base !== 'undefined') {
        className +=
          ' ' +
          // @ts-expect-error - Key type
          (baseStyles[styleProp][value.base] ??
            // @ts-expect-error - Key type
            globalCDSConfig.current.extendStyleProps?.[stylePropThemeVarMap[styleProp]][
              value.base
            ]?.[styleProp].base);
      }
      if (typeof value.phone !== 'undefined') {
        className +=
          ' ' +
          // @ts-expect-error - Key type
          (phoneStyles[styleProp][value.phone] ??
            // @ts-expect-error - Key type
            globalCDSConfig.current.extendStyleProps?.[stylePropThemeVarMap[styleProp]][
              value.phone
            ]?.[styleProp].phone);
      }
      if (typeof value.tablet !== 'undefined') {
        className +=
          ' ' +
          // @ts-expect-error - Key type
          (tabletStyles[styleProp][value.tablet] ??
            // @ts-expect-error - Key type
            globalCDSConfig.current.extendStyleProps?.[stylePropThemeVarMap[styleProp]][
              value.tablet
            ]?.[styleProp].tablet);
      }
      if (typeof value.desktop !== 'undefined') {
        className +=
          ' ' +
          // @ts-expect-error - Key type
          (desktopStyles[styleProp][value.desktop] ??
            // @ts-expect-error - Key type
            globalCDSConfig.current.extendStyleProps?.[stylePropThemeVarMap[styleProp]][
              value.desktop
            ]?.[styleProp].desktop);
      }
    }
  }

  for (const key in inlineStyle) {
    style[key] = inlineStyle[key as keyof typeof inlineStyle];
  }

  return { style: style as React.CSSProperties, className };
};
