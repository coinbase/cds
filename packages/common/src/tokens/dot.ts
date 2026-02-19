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
