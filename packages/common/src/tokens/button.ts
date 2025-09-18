import type { ThemeVars } from '../core/theme';
import type { ButtonVariant } from '../types';

type ButtonVariantStyles = {
  background: ThemeVars.Color;
  borderColor: ThemeVars.Color;
  color: ThemeVars.Color;
};

type ButtonVariantConfig = Record<ButtonVariant, ButtonVariantStyles>;

export const variants = {
  primary: {
    color: 'fgInverse',
    background: 'bgPrimary',
    borderColor: 'bgPrimary',
  },
  secondary: {
    color: 'fg',
    background: 'bgSecondary',
    borderColor: 'bgSecondary',
  },
  tertiary: {
    color: 'fgInverse',
    background: 'bgInverse',
    borderColor: 'bgInverse',
  },
  foregroundMuted: {
    color: 'fgMuted',
    background: 'bgSecondary',
    borderColor: 'bgLine',
  },
  positive: {
    color: 'fgInverse',
    background: 'bgPositive',
    borderColor: 'bgPositive',
  },
  negative: {
    color: 'fgInverse',
    background: 'bgNegative',
    borderColor: 'bgNegative',
  },
} as const satisfies ButtonVariantConfig;

export const transparentVariants = {
  primary: {
    color: 'fgPrimary',
    background: 'bg',
    borderColor: 'transparent',
  },
  secondary: {
    color: 'fg',
    background: 'bg',
    borderColor: 'transparent',
  },
  tertiary: {
    color: 'fg',
    background: 'bg',
    borderColor: 'transparent',
  },
  foregroundMuted: {
    color: 'fgMuted',
    background: 'bg',
    borderColor: 'transparent',
  },
  positive: {
    color: 'fgPositive',
    background: 'bg',
    borderColor: 'transparent',
  },
  negative: {
    color: 'fgNegative',
    background: 'bg',
    borderColor: 'transparent',
  },
} as const satisfies ButtonVariantConfig;
