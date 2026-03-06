/**
 * These are the core CDS Theme variable types used across mobile and web.
 */

/* eslint-disable no-restricted-syntax, @typescript-eslint/no-empty-object-type */

/**
 * This utility type makes the final intellisense into human-readable literal values.
 */
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ColorScheme = 'dark' | 'light';
export type ColorSchemePreference = ColorScheme | 'system';

/**
 * This is the default set of Theme variables available to all CDS components.
 * Only the interface keys are used to define the available Theme variables.
 * The interface values are not used.
 * @danger You probably don't want to use this namespace directly, unless you are
 * referring explicitly to ONLY the default CDS variables. Otherwise, you probably
 * want to use the ThemeVars namespace instead, which inherits from this namespace.
 * @docs http://cds.coinbase.com/getting-started/theming/#themevars-namespace
 */
export namespace ThemeVarsDefault {
  export interface SpectrumHue {
    blue: void;
    green: void;
    orange: void;
    yellow: void;
    gray: void;
    indigo: void;
    pink: void;
    purple: void;
    red: void;
    teal: void;
    chartreuse: void;
  }

  export interface SpectrumHueStep {
    0: void;
    5: void;
    10: void;
    15: void;
    20: void;
    30: void;
    40: void;
    50: void;
    60: void;
    70: void;
    80: void;
    90: void;
    100: void;
  }

  export interface Color {
    currentColor: void;
    // Foreground
    fg: void;
    fgMuted: void;
    fgInverse: void;
    fgPrimary: void;
    fgWarning: void;
    fgPositive: void;
    fgNegative: void;
    // Background
    bg: void;
    bgAlternate: void;
    bgInverse: void;
    bgOverlay: void;
    bgElevation1: void;
    bgElevation2: void;
    bgPrimary: void;
    bgPrimaryWash: void;
    bgSecondary: void;
    bgTertiary: void;
    bgSecondaryWash: void;
    bgNegative: void;
    bgNegativeWash: void;
    bgPositive: void;
    bgPositiveWash: void;
    bgWarning: void;
    bgWarningWash: void;
    bgLine: void;
    bgLineHeavy: void;
    bgLineInverse: void;
    bgLinePrimary: void;
    bgLinePrimarySubtle: void;
    // Accent
    accentSubtleRed: void;
    accentBoldRed: void;
    accentSubtleGreen: void;
    accentBoldGreen: void;
    accentSubtleBlue: void;
    accentBoldBlue: void;
    accentSubtlePurple: void;
    accentBoldPurple: void;
    accentSubtleYellow: void;
    accentBoldYellow: void;
    accentSubtleGray: void;
    accentBoldGray: void;
    // Transparent
    transparent: void;
  }

  export interface IllustrationColor {
    primary: void;
    black: void;
    white: void;
    gray: void;
    gray2: void;
    gray3: void;
    positive: void;
    negative: void;
    accent1: void;
    accent2: void;
    accent3: void;
    accent4: void;
    invert: void;
    invert2: void;
  }

  export interface Space {
    0: void;
    0.25: void;
    0.5: void;
    0.75: void;
    1: void;
    1.5: void;
    2: void;
    3: void;
    4: void;
    5: void;
    6: void;
    7: void;
    8: void;
    9: void;
    10: void;
  }

  export interface IconSize {
    xs: void;
    s: void;
    m: void;
    l: void;
  }

  export interface AvatarSize {
    s: void;
    m: void;
    l: void;
    xl: void;
    xxl: void;
    xxxl: void;
  }

  export interface BorderWidth {
    0: void;
    100: void;
    200: void;
    300: void;
    400: void;
    500: void;
  }

  export interface BorderRadius {
    0: void;
    100: void;
    200: void;
    300: void;
    400: void;
    500: void;
    600: void;
    700: void;
    800: void;
    900: void;
    1000: void;
  }

  export interface Font {
    display1: void;
    display2: void;
    display3: void;
    title1: void;
    title2: void;
    title3: void;
    title4: void;
    headline: void;
    body: void;
    label1: void;
    label2: void;
    caption: void;
    legal: void;
  }

  export interface FontFamily extends Font {}
  export interface FontSize extends Font {}
  export interface FontWeight extends Font {}
  export interface LineHeight extends Font {}
  export interface TextTransform extends Font {}

  export interface Shadow {
    elevation1: void;
    elevation2: void;
  }

  export interface ControlSize {
    checkboxSize: void;
    radioSize: void;
    switchWidth: void;
    switchHeight: void;
    switchThumbSize: void;
    tileSize: void;
  }

  export interface Elevation {
    0: void;
    1: void;
    2: void;
  }
}

declare module '@coinbase/cds-common/core/theme' {
  /**
   * Override interfaces in this namespace to add new variables to the ThemeVars
   * namespace, making their types available to all CDS components. Only the
   * interface keys are used to define the available Theme variables. The
   * interface values are not used.
   * @danger Only use this namespace for overriding. Once overridden, you should
   * prefer to read from the ThemeVars namespace instead, which inherits from this
   * namespace.
   * @docs http://cds.coinbase.com/getting-started/theming/#extending-the-theme
   */
  export namespace ThemeVarsExtended {
    export interface SpectrumHue {}
    export interface SpectrumHueStep {}
    export interface Color {}
    export interface IllustrationColor {}
    export interface Space {}
    export interface IconSize {}
    export interface AvatarSize {}
    export interface BorderWidth {}
    export interface BorderRadius {}
    export interface Font {}
    export interface FontFamily {}
    export interface FontSize {}
    export interface FontWeight {}
    export interface LineHeight {}
    export interface TextTransform {}
    export interface Shadow {}
    export interface ControlSize {}
    export interface Elevation {}
  }
}

/**
 * This is the complete set of Theme variables available to all CDS components.
 * Combines all variables from the ThemeVarsDefault and ThemeVarsExtended
 * namespaces. You can use this namespace to read all available Theme variables.
 * You can use the ThemeVarsExtended namespace to extend this namespace with new
 * variables.
 * @docs http://cds.coinbase.com/getting-started/theming/#themevars-namespace
 */
export namespace ThemeVars {
  export type SpectrumHue = Prettify<
    keyof ThemeVarsDefault.SpectrumHue | keyof ThemeVarsExtended.SpectrumHue
  >;

  export type SpectrumHueStep = Prettify<
    keyof ThemeVarsDefault.SpectrumHueStep | keyof ThemeVarsExtended.SpectrumHueStep
  >;

  export type SpectrumColor = `${SpectrumHue}${SpectrumHueStep}`;

  export type Color = Prettify<keyof ThemeVarsDefault.Color | keyof ThemeVarsExtended.Color>;

  export type IllustrationColor = Prettify<
    keyof ThemeVarsDefault.IllustrationColor | keyof ThemeVarsExtended.IllustrationColor
  >;

  export type Space = Prettify<keyof ThemeVarsDefault.Space | keyof ThemeVarsExtended.Space>;

  export type IconSize = Prettify<
    keyof ThemeVarsDefault.IconSize | keyof ThemeVarsExtended.IconSize
  >;

  export type AvatarSize = Prettify<
    keyof ThemeVarsDefault.AvatarSize | keyof ThemeVarsExtended.AvatarSize
  >;

  export type BorderWidth = Prettify<
    keyof ThemeVarsDefault.BorderWidth | keyof ThemeVarsExtended.BorderWidth
  >;

  export type BorderRadius = Prettify<
    keyof ThemeVarsDefault.BorderRadius | keyof ThemeVarsExtended.BorderRadius
  >;

  export type Font = Prettify<keyof ThemeVarsDefault.Font | keyof ThemeVarsExtended.Font>;

  export type FontFamily = Prettify<
    keyof ThemeVarsDefault.FontFamily | keyof ThemeVarsExtended.FontFamily
  >;

  export type FontSize = Prettify<
    keyof ThemeVarsDefault.FontSize | keyof ThemeVarsExtended.FontSize
  >;

  export type FontWeight = Prettify<
    keyof ThemeVarsDefault.FontWeight | keyof ThemeVarsExtended.FontWeight
  >;

  export type LineHeight = Prettify<
    keyof ThemeVarsDefault.LineHeight | keyof ThemeVarsExtended.LineHeight
  >;

  export type TextTransform = Prettify<
    keyof ThemeVarsDefault.TextTransform | keyof ThemeVarsExtended.TextTransform
  >;

  export type Shadow = Prettify<keyof ThemeVarsDefault.Shadow | keyof ThemeVarsExtended.Shadow>;

  export type ControlSize = Prettify<
    keyof ThemeVarsDefault.ControlSize | keyof ThemeVarsExtended.ControlSize
  >;

  export type Elevation = Prettify<
    keyof ThemeVarsDefault.Elevation | keyof ThemeVarsExtended.Elevation
  >;
}
