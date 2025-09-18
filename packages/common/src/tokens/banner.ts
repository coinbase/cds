import type { ThemeVars } from '../core/theme';
import type { BannerVariant } from '../types/BannerBaseProps';

export type BannerVariantStyle = {
  background: ThemeVars.Color | undefined;
  iconColor: ThemeVars.Color;
  textColor: ThemeVars.Color;
  primaryActionColor: ThemeVars.Color;
  secondaryActionColor: ThemeVars.Color;
  iconButtonColor: ThemeVars.Color;
  borderColor: ThemeVars.Color;
};

export type BannerVariantConfig = Record<BannerVariant, BannerVariantStyle>;

export const variants: BannerVariantConfig = {
  informational: {
    background: 'bgSecondary',
    iconColor: 'fgPrimary',
    textColor: 'fg',
    primaryActionColor: 'fgPrimary',
    secondaryActionColor: 'fg',
    iconButtonColor: 'fg',
    borderColor: 'bgPrimary',
  },
  promotional: {
    background: 'bgPrimaryWash',
    iconColor: 'fgPrimary',
    textColor: 'fg',
    primaryActionColor: 'fgPrimary',
    secondaryActionColor: 'fg',
    iconButtonColor: 'fg',
    borderColor: 'bgPrimary',
  },
  warning: {
    background: 'bgWarningWash',
    iconColor: 'fgWarning',
    textColor: 'fg',
    primaryActionColor: 'fgPrimary',
    secondaryActionColor: 'fg',
    iconButtonColor: 'fg',
    borderColor: 'bgWarning',
  },
  error: {
    background: 'bgNegativeWash',
    iconColor: 'fgNegative',
    textColor: 'fg',
    primaryActionColor: 'fgPrimary',
    secondaryActionColor: 'fg',
    iconButtonColor: 'fg',
    borderColor: 'bgNegative',
  },
};

export const bannerMinWidth = 320;
