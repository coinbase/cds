import type { TextStyle, ViewStyle } from 'react-native';
import type { ColorScheme, ThemeVars } from '@coinbase/cds-common/core/theme';

/**
 * The array form of react-native's `boxShadow` view style.
 *
 * The CSS string form is intentionally excluded: react-native parses it in JS and silently drops
 * every shadow in the value when any one unit fails to parse, and the Skia chart text path needs
 * discrete numbers. Accepting strings later would be a non-breaking widening.
 *
 * @note This inherits a known react-native typing bug where `BoxShadowValue.color` is declared
 * `string` (should be `ColorValue`) and `blurRadius` is declared `ColorValue | number` (should be
 * `number | string`). Fixed upstream in react-native 0.84; it self-corrects on upgrade.
 */
export type BoxShadowStyle = Extract<NonNullable<ViewStyle['boxShadow']>, readonly unknown[]>;

export type LegacyShadowToken = {
  /**
   * @deprecated Author shadow tokens with `boxShadow` instead. The `shadow*` props only render on iOS. This will be removed in a future major release.
   * @deprecationExpectedRemoval v11
   */
  shadowColor?: ViewStyle['shadowColor'];
  /**
   * @deprecated Author shadow tokens with `boxShadow` instead. The `shadow*` props only render on iOS. This will be removed in a future major release.
   * @deprecationExpectedRemoval v11
   */
  shadowOpacity?: ViewStyle['shadowOpacity'];
  /**
   * @deprecated Author shadow tokens with `boxShadow` instead. The `shadow*` props only render on iOS. This will be removed in a future major release.
   * @deprecationExpectedRemoval v11
   */
  shadowOffset?: ViewStyle['shadowOffset'];
  /**
   * @deprecated Author shadow tokens with `boxShadow` instead. The `shadow*` props only render on iOS. This will be removed in a future major release.
   * @deprecationExpectedRemoval v11
   */
  shadowRadius?: ViewStyle['shadowRadius'];
  boxShadow?: never;
};

export type BoxShadowToken = {
  /** Cross-platform shadow. Renders on both iOS and Android under the New Architecture. */
  boxShadow: BoxShadowStyle;
  shadowColor?: never;
  shadowOpacity?: never;
  shadowOffset?: never;
  shadowRadius?: never;
};

/**
 * A single shadow token. Author either the cross-platform `boxShadow` form or the legacy iOS-only
 * `shadow*` form, never both.
 *
 * Both arms declare the same property names (the unused ones as `never`) so that reading an
 * individual field off a token stays valid without narrowing first.
 */
export type Shadow = LegacyShadowToken | BoxShadowToken;

export type ThemeConfig = {
  /** A unique identifier for the theme. */
  id?: string;
  /** The light spectrum color values. */
  lightSpectrum?: { [key in ThemeVars.SpectrumColor]: string };
  /** The dark spectrum color values. */
  darkSpectrum?: { [key in ThemeVars.SpectrumColor]: string };
  /** The light color palette. */
  lightColor?: { [key in ThemeVars.Color]: string };
  /** The dark color palette. */
  darkColor?: { [key in ThemeVars.Color]: string };
  /** The light illustration color palette. All tokens are optional. */
  lightIllustrationColor?: Partial<{ [key in ThemeVars.IllustrationColor]: string }>;
  /** The dark illustration color palette. All tokens are optional. */
  darkIllustrationColor?: Partial<{ [key in ThemeVars.IllustrationColor]: string }>;
  /** The space values, used for margin and padding. */
  space: { [key in ThemeVars.Space]: number };
  /** The icon size values. */
  iconSize: { [key in ThemeVars.IconSize]: number };
  /** The avatar size values. */
  avatarSize: { [key in ThemeVars.AvatarSize]: number };
  /** The border width values. */
  borderWidth: { [key in ThemeVars.BorderWidth]: number };
  /** The border radius values. */
  borderRadius: { [key in ThemeVars.BorderRadius]: number };
  /** The font family values. */
  fontFamily: { [key in ThemeVars.FontFamily]: string };
  /** The font family values for monospace fonts. */
  fontFamilyMono?: { [key in ThemeVars.FontFamily]: string };
  /** The font size values. */
  fontSize: { [key in ThemeVars.FontSize]: number };
  /** The font weight values. On react-native, font weights are determined by the fontFamily, so this is just metadata. */
  fontWeight: { [key in ThemeVars.FontWeight]: TextStyle['fontWeight'] };
  /** The line height values. */
  lineHeight: { [key in ThemeVars.LineHeight]: number };
  /** The text transform values. */
  textTransform: { [key in ThemeVars.TextTransform]: TextStyle['textTransform'] };
  /** The shadow values. */
  shadow: { [key in ThemeVars.Shadow]: Shadow };
  /** The control size values. */
  controlSize: { [key in ThemeVars.ControlSize]: number };
};

export type Theme = ThemeConfig & {
  /** The currently active color scheme for the parent ThemeProvider, either "light" or "dark". */
  activeColorScheme: ColorScheme;
  /** The light or dark spectrum color values, as appropriate based on the activeColorScheme. */
  spectrum: { [key in ThemeVars.SpectrumColor]: string };
  /** The light or dark color palette, as appropriate based on the activeColorScheme. */
  color: { [key in ThemeVars.Color]: string };
  /** The illustration color palette for the active color scheme. Undefined when the theme does not define illustration colors. */
  illustrationColor?: { [key in ThemeVars.IllustrationColor]: string };
};
