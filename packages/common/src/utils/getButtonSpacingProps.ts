import type { ThemeVars } from '../core/theme';
import type { NegativeSpace } from '../types';

const buttonPaddingX = {
  default: 4,
  compact: 2,
  flush: 2,
} satisfies Record<string, ThemeVars.Space>;

const buttonPaddingY = {
  default: 2,
  compact: 1,
} satisfies Record<string, ThemeVars.Space>;

export type GetButtonSpacingParams = {
  compact?: boolean;
  /** If present decrease horizontal padding */
  flush?: 'start' | 'end' | boolean;
};

type ButtonSpacingValue = {
  paddingX?: ThemeVars.Space;
  paddingY?: ThemeVars.Space;
  marginEnd?: NegativeSpace;
  marginStart?: NegativeSpace;
};

export const getButtonSpacingProps = ({
  compact,
  flush,
}: GetButtonSpacingParams): ButtonSpacingValue => {
  if (flush)
    return {
      paddingX: buttonPaddingX.flush,
      marginEnd: flush === 'end' ? (-buttonPaddingX.flush as NegativeSpace) : undefined,
      marginStart: flush === 'start' ? (-buttonPaddingX.flush as NegativeSpace) : undefined,
    };
  return {
    paddingX: compact ? buttonPaddingX.compact : buttonPaddingX.default,
    paddingY: compact ? buttonPaddingY.compact : buttonPaddingY.default,
  };
};
