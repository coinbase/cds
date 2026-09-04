import type { ThemeVars } from '../core/theme';

export type TextTransform = 'uppercase' | 'lowercase' | 'capitalize' | 'none';

export type TypographyProps = {
  /** Typography font token for text. */
  font?: ThemeVars.Font;
  /** Font family token for text. */
  fontFamily?: ThemeVars.FontFamily;
  /** Font size token for text. */
  fontSize?: ThemeVars.FontSize;
  /** Font weight token for text. */
  fontWeight?: ThemeVars.FontWeight;
  /** Line height token for text. */
  lineHeight?: ThemeVars.LineHeight;
  /** Text transform for text. */
  textTransform?: TextTransform;
};

export type TextAlignProps = {
  /**
   * Specifies text alignment. On mobile, the value `justify` is only supported on iOS and fallbacks to `start` on Android.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align) | [React Native docs](https://reactnative.dev/docs/text-style-props#textalign)
   * @default start
   */
  align?: 'start' | 'end' | 'center' | 'justify';
};
