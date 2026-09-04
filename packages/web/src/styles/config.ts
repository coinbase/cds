import type { ThemeVarsExtended } from '@coinbase/cds-common/core/theme';

export const globalCDSConfig: { current: CDSGlobalConfig } = { current: {} };

/**
 * Maps the ThemeVars interface names to the corresponding StaticStyleProps that
 * consume them. For example, the ThemeVars.Color theme variables can be used
 * with the color, background, and borderColor style props.
 * This is the inverse of the stylePropThemeVarMap.
 */
type ThemeVarStylePropsMap = {
  Color: 'color' | 'background' | 'borderColor';
  BorderWidth:
    | 'borderWidth'
    | 'borderTopWidth'
    | 'borderEndWidth'
    | 'borderBottomWidth'
    | 'borderStartWidth';
  BorderRadius:
    | 'borderRadius'
    | 'borderTopLeftRadius'
    | 'borderTopRightRadius'
    | 'borderBottomLeftRadius'
    | 'borderBottomRightRadius';
  FontFamily: 'fontFamily';
  FontSize: 'fontSize';
  FontWeight: 'fontWeight';
  LineHeight: 'lineHeight';
  Space:
    | 'gap'
    | 'columnGap'
    | 'rowGap'
    | 'padding'
    | 'paddingX'
    | 'paddingY'
    | 'paddingTop'
    | 'paddingBottom'
    | 'paddingStart'
    | 'paddingEnd'
    | 'margin'
    | 'marginX'
    | 'marginY'
    | 'marginTop'
    | 'marginBottom'
    | 'marginEnd'
    | 'marginStart';
  Elevation: 'elevation';
};

type ResponsiveOnly<T> = { base: T; phone: T; tablet: T; desktop: T };

/**
 * Defines the possible config options for the initializeCDS function.
 *
 * Some ThemeVars interfaces are not available under extendStyleProps
 * because they do not have a directly corresponding style prop.
 *
 * For example, ThemeVars.Shadow does not have a directly corresponding
 * style prop. Instead, the Shadow theme variables are used in conjunction
 * with the elevation style prop.
 */
export type CDSGlobalConfig = {
  extendStyleProps?: {
    Color?: {
      [extendedThemeVar in keyof ThemeVarsExtended.Color]: {
        [styleProp in ThemeVarStylePropsMap['Color']]: ResponsiveOnly<string>;
      };
    };
    BorderWidth?: {
      [extendedThemeVar in keyof ThemeVarsExtended.BorderWidth]: {
        [styleProp in ThemeVarStylePropsMap['BorderWidth']]: ResponsiveOnly<string>;
      };
    };
    BorderRadius?: {
      [extendedThemeVar in keyof ThemeVarsExtended.BorderRadius]: {
        [styleProp in ThemeVarStylePropsMap['BorderRadius']]: ResponsiveOnly<string>;
      };
    };
    FontFamily?: {
      [extendedThemeVar in keyof ThemeVarsExtended.FontFamily]: {
        [styleProp in ThemeVarStylePropsMap['FontFamily']]: ResponsiveOnly<string>;
      };
    };
    FontSize?: {
      [extendedThemeVar in keyof ThemeVarsExtended.FontSize]: {
        [styleProp in ThemeVarStylePropsMap['FontSize']]: ResponsiveOnly<string>;
      };
    };
    FontWeight?: {
      [extendedThemeVar in keyof ThemeVarsExtended.FontWeight]: {
        [styleProp in ThemeVarStylePropsMap['FontWeight']]: ResponsiveOnly<string>;
      };
    };
    LineHeight?: {
      [extendedThemeVar in keyof ThemeVarsExtended.LineHeight]: {
        [styleProp in ThemeVarStylePropsMap['LineHeight']]: ResponsiveOnly<string>;
      };
    };
    Space?: {
      [extendedThemeVar in keyof ThemeVarsExtended.Space]: {
        [styleProp in ThemeVarStylePropsMap['Space']]: ResponsiveOnly<string>;
      };
    };
    Elevation?: {
      [extendedThemeVar in keyof ThemeVarsExtended.Elevation]: {
        [styleProp in ThemeVarStylePropsMap['Elevation']]: ResponsiveOnly<string>;
      };
    };
  };
};

/**
 * This is a low-level API that is used to customize core CDS behaviors.
 * Currently it can be used to extend the static CSS classnames that power
 * component style props, to add new theme variables or style behaviors.
 * This function should be called as close to your app entry point as possible.
 *
 * Use this function to supply the appropriate static classnames for any new
 * theme variables you add by overriding the ThemeVarsExtended namespace. If
 * you override the ThemeVarsExtended namespace without passing the
 * corresponding classnames here, your style props won't work.
 *
 * This API only allows defining the classnames to be used with the theme
 * variables from ThemeVarsExtended - it cannot be used to override the default
 * static classnames used with the ThemeVarsDefault namespace. If you want to
 * override the default static classnames, you can do so by supplying the
 * corresponding classnames in the options object.
 */
export const initializeCDS = (config: CDSGlobalConfig) => {
  globalCDSConfig.current = { ...config };
};
