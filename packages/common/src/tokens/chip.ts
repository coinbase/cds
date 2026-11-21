import type { ThemeVars } from '../core/theme';

export type ChipSizeCommon = 'xs' | 's' | 'm';

export type ChipSizeConfig = {
  paddingX: ThemeVars.Space;
  paddingY: ThemeVars.Space;
  font: ThemeVars.Font;
  borderRadius: ThemeVars.BorderRadius;
};

export const CHIP_SIZES = {
  xs: { paddingX: 1.5, paddingY: 0.75, font: 'label1', borderRadius: 700 },
  s: { paddingX: 2, paddingY: 1, font: 'headline', borderRadius: 700 },
  m: { paddingX: 3, paddingY: 1.5, font: 'headline', borderRadius: 900 },
} as const satisfies Record<ChipSizeCommon, ChipSizeConfig>;

export type MediaChipSpacing = {
  paddingX?: ThemeVars.Space;
  paddingY?: ThemeVars.Space;
  padding?: ThemeVars.Space;
  paddingStart?: ThemeVars.Space;
  paddingEnd?: ThemeVars.Space;
  paddingTop?: ThemeVars.Space;
  paddingBottom?: ThemeVars.Space;
  gap?: ThemeVars.Space;
};

export type MediaChipComposition =
  | 'labelOnly'
  | 'startOnly'
  | 'startAndEnd'
  | 'startAndLabel'
  | 'labelAndEnd'
  | 'all';

export const MEDIA_CHIP_SPACING = {
  xs: {
    labelOnly: { paddingX: 1.5, paddingY: 0.75 },
    startOnly: { paddingY: 1, paddingX: 1 },
    startAndEnd: { paddingStart: 1, paddingY: 1, paddingEnd: 1.5, gap: 0.75 },
    startAndLabel: { paddingStart: 1, paddingY: 0.75, paddingEnd: 1.5, gap: 0.75 },
    labelAndEnd: { paddingStart: 1.5, paddingY: 0.75, paddingEnd: 1.5, gap: 0.75 },
    all: { paddingStart: 1, paddingY: 0.75, paddingEnd: 1.5, gap: 0.75 },
  },
  s: {
    labelOnly: { paddingX: 2, paddingY: 1 },
    startOnly: { paddingY: 1, paddingX: 1 },
    startAndEnd: { paddingStart: 1, paddingY: 1, paddingEnd: 1.5, gap: 0.75 },
    startAndLabel: { paddingStart: 1, paddingY: 1, paddingEnd: 2, gap: 0.75 },
    labelAndEnd: { paddingStart: 2, paddingY: 1, paddingEnd: 1.5, gap: 0.75 },
    all: { paddingStart: 1, paddingY: 1, paddingEnd: 1.5, gap: 0.75 },
  },
  m: {
    labelOnly: { paddingX: 3, paddingY: 1.5 },
    startOnly: { paddingY: 1.5, paddingX: 1.5 },
    startAndEnd: { paddingStart: 1.5, paddingY: 1.5, paddingEnd: 2, gap: 1 },
    startAndLabel: { paddingStart: 1.5, paddingY: 1.5, paddingEnd: 3, gap: 1 },
    labelAndEnd: { paddingStart: 3, paddingY: 1.5, paddingEnd: 2, gap: 1 },
    all: { paddingStart: 1.5, paddingY: 1.5, paddingEnd: 2, gap: 1 },
  },
} as const satisfies Record<ChipSizeCommon, Record<MediaChipComposition, MediaChipSpacing>>;

export const chipMaxWidth = 200;

