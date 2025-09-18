export type TextTransform = 'uppercase' | 'lowercase' | 'capitalize' | 'none';

export type TextAlignProps = {
  /**
   * Specifies text alignment. On mobile, the value `justify` is only supported on iOS and fallbacks to `start` on Android.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align) | [React Native docs](https://reactnative.dev/docs/text-style-props#textalign)
   * @default start
   */
  align?: 'start' | 'end' | 'center' | 'justify';
};
