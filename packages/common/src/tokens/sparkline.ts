import { durations } from '../motion/tokens';
import type { SparklineInteractiveHeaderSignVariant } from '../types';

export const chartHeight = 320;
export const chartCompactHeight = 120;
export const maskOpacity = 0.8;
export const lineOpacity = 0.4;
export const lineDashArray = [2, 4];
export const fadeDuration = durations.moderate1;

// This list may not be exhaustive, but callsites use period.label as a fallback
export const periodLabelMap: Record<string, string> = {
  '1H': '1 hour',
  '1D': '1 day',
  '1W': '1 week',
  '1M': '1 month',
  '1Y': '1 year',
};

export const subheadIconSignMap: Record<SparklineInteractiveHeaderSignVariant, string> = {
  positive: '+',
  negative: '-',
  upwardTrend: '\u2197',
  downwardTrend: '\u2198',
  '': '',
};

export const borderWidth = 2;
