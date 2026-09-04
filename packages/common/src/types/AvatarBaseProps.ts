import type { ThemeVars } from '../core/theme';

import type { Shape } from './Shape';

export type AvatarShape = Extract<Shape, 'circle' | 'square' | 'hexagon'>;
export type AvatarFallback = 'image' | 'text';
export type AvatarFallbackColor = ThemeVars.SpectrumHue;
