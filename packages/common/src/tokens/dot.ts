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

/**
 * The fixed height of the DotCount component.
 * Width grows based on content length.
 **/
export const dotCountSize = 24;

/**
 * @deprecated Use local sizing logic instead. This export is temporarily supported for
 * compatibility. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const dotSizeTokens = { s: 28, m: 36, l: 48 } as const;

/**
 * @deprecated Use local sizing logic instead. This export is temporarily supported for
 * compatibility. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const getDotSize = (count?: number) => {
  if (!count || count < 10) return dotSizeTokens.s;
  if (count >= 10 && count < 100) return dotSizeTokens.m;
  if (count >= 100) return dotSizeTokens.l;

  return dotSizeTokens.s;
};
