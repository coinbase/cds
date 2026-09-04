import type { IconSize } from './IconSize';

export type DotVariant = 'positive' | 'negative' | 'primary' | 'foregroundMuted' | 'warning';

// There is only one type of overlap right now,
// but could potentially have more overlap types
export type DotOverlap = 'circular';

export type DotSize = IconSize;
