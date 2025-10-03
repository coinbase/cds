import type { DotSize } from '../types';
import type { AvatarSize } from '../types/AvatarSize';

export const avatarIconSizeMap: Record<AvatarSize, DotSize> = {
  xxxl: 's',
  xxl: 's',
  xl: 's',
  l: 'xs',
  m: 'xs',
  s: 'xs',
} as const;

export const avatarDotSizeMap: Record<AvatarSize, DotSize> = {
  xxxl: 'm',
  xxl: 'm',
  xl: 'm',
  l: 's',
  m: 'xs',
  s: 'xs',
} as const;

export const dotCountSize = 24;

// This works for the purposes of TabNavigation, but it's not stable
// TODO Update this with more stable values
export const dotSizeTokens = { s: 28, m: 36, l: 42 } as const;
export const getDotSize = (count?: number) => {
  if (!count || count < 10) return dotSizeTokens.s;
  if (count >= 10 && count < 100) return dotSizeTokens.m;
  if (count >= 100) return dotSizeTokens.l;

  return dotSizeTokens.s;
};
