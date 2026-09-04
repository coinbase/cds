import type { ThemeVars } from '../core/theme';

import type { TypeOrNumber } from './TypeOrNumber';

export type NegativeSpace = TypeOrNumber<'0' | `-${Exclude<ThemeVars.Space, 0>}`>;

export type MarginProps = {
  /** Apply margin on all sides. */
  margin?: NegativeSpace;
  /** Apply margin on the start and end sides. */
  marginX?: NegativeSpace;
  /** Apply margin on the top and bottom sides. */
  marginY?: NegativeSpace;
  /** Apply margin on the top side. */
  marginTop?: NegativeSpace;
  /** Apply margin on the end side. */
  marginEnd?: NegativeSpace;
  /** Apply margin on the bottom side. */
  marginBottom?: NegativeSpace;
  /** Apply margin on the start side. */
  marginStart?: NegativeSpace;
};

export type PaddingProps = {
  /** Apply padding on all sides. */
  padding?: ThemeVars.Space;
  /** Apply padding on the start and end sides. */
  paddingX?: ThemeVars.Space;
  /** Apply padding on the top and bottom sides. */
  paddingY?: ThemeVars.Space;
  /** Apply padding on the top side. */
  paddingTop?: ThemeVars.Space;
  /** Apply padding on the end side. */
  paddingEnd?: ThemeVars.Space;
  /** Apply padding on the bottom side. */
  paddingBottom?: ThemeVars.Space;
  /** Apply padding on the start side. */
  paddingStart?: ThemeVars.Space;
};

export type InternalSpacingProps = {
  all?: ThemeVars.Space;
  top?: ThemeVars.Space;
  bottom?: ThemeVars.Space;
  start?: ThemeVars.Space;
  end?: ThemeVars.Space;
  horizontal?: ThemeVars.Space;
  vertical?: ThemeVars.Space;
  isInverted?: boolean;
};
