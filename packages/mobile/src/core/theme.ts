import type { TextStyle, ViewStyle } from 'react-native';
import type { ColorScheme, ThemeVars } from '@cbhq/cds-common/core/theme';

type Shadow = {
  shadowColor?: ViewStyle['shadowColor'];
  shadowOpacity?: ViewStyle['shadowOpacity'];
  shadowOffset?: ViewStyle['shadowOffset'];
  shadowRadius?: ViewStyle['shadowRadius'];
};

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
};
