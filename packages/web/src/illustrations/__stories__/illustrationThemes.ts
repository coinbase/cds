import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';

export type IllustrationThemeKey = 'default' | 'warm' | 'monochrome' | 'garish';

export const ILLUSTRATION_THEME_TABS: TabValue<IllustrationThemeKey>[] = [
  { id: 'default', label: 'Default' },
  { id: 'warm', label: 'Warm' },
  { id: 'monochrome', label: 'Mono' },
  { id: 'garish', label: 'Garish' },
];

type IllustrationPalette = { [key in ThemeVars.IllustrationColor]: string };

type IllustrationTheme = {
  lightIllustrationColor: IllustrationPalette;
  darkIllustrationColor: IllustrationPalette;
};

export const WARM_ILLUSTRATION_THEME: IllustrationTheme = {
  lightIllustrationColor: {
    primary: 'rgb(234, 88, 12)',
    black: 'rgb(28, 25, 23)',
    white: 'rgb(255, 247, 237)',
    gray: 'rgb(254, 243, 199)',
    gray2: 'rgb(254, 243, 199)',
    gray3: 'rgb(253, 230, 138)',
    positive: 'rgb(34, 197, 94)',
    negative: 'rgb(239, 68, 68)',
    accent1: 'rgb(250, 204, 21)',
    accent2: 'rgb(249, 115, 22)',
    accent3: 'rgb(239, 68, 68)',
    accent4: 'rgb(254, 215, 170)',
    invert: 'rgb(120, 53, 15)',
    invert2: 'rgb(255, 247, 237)',
  },
  darkIllustrationColor: {
    primary: 'rgb(251, 146, 60)',
    black: 'rgb(255, 247, 237)',
    white: 'rgb(28, 25, 23)',
    gray: 'rgb(120, 53, 15)',
    gray2: 'rgb(120, 53, 15)',
    gray3: 'rgb(154, 52, 18)',
    positive: 'rgb(74, 222, 128)',
    negative: 'rgb(248, 113, 113)',
    accent1: 'rgb(253, 224, 71)',
    accent2: 'rgb(253, 186, 116)',
    accent3: 'rgb(248, 113, 113)',
    accent4: 'rgb(154, 52, 18)',
    invert: 'rgb(255, 237, 213)',
    invert2: 'rgb(120, 53, 15)',
  },
};

export const MONOCHROME_ILLUSTRATION_THEME: IllustrationTheme = {
  lightIllustrationColor: {
    primary: 'rgb(113, 113, 122)',
    black: 'rgb(9, 9, 11)',
    white: 'rgb(250, 250, 250)',
    gray: 'rgb(228, 228, 231)',
    gray2: 'rgb(212, 212, 216)',
    gray3: 'rgb(196, 196, 202)',
    positive: 'rgb(161, 161, 170)',
    negative: 'rgb(82, 82, 91)',
    accent1: 'rgb(161, 161, 170)',
    accent2: 'rgb(113, 113, 122)',
    accent3: 'rgb(82, 82, 91)',
    accent4: 'rgb(212, 212, 216)',
    invert: 'rgb(9, 9, 11)',
    invert2: 'rgb(244, 244, 245)',
  },
  darkIllustrationColor: {
    primary: 'rgb(161, 161, 170)',
    black: 'rgb(244, 244, 245)',
    white: 'rgb(24, 24, 27)',
    gray: 'rgb(63, 63, 70)',
    gray2: 'rgb(63, 63, 70)',
    gray3: 'rgb(82, 82, 91)',
    positive: 'rgb(113, 113, 122)',
    negative: 'rgb(212, 212, 216)',
    accent1: 'rgb(113, 113, 122)',
    accent2: 'rgb(161, 161, 170)',
    accent3: 'rgb(212, 212, 216)',
    accent4: 'rgb(63, 63, 70)',
    invert: 'rgb(244, 244, 245)',
    invert2: 'rgb(39, 39, 42)',
  },
};

// Maximally distinct colors — ideal for verifying every token is wired correctly
export const GARISH_ILLUSTRATION_THEME: IllustrationTheme = {
  lightIllustrationColor: {
    primary: 'rgb(220, 38, 38)',
    black: 'rgb(20, 83, 45)',
    white: 'rgb(254, 249, 195)',
    gray: 'rgb(243, 232, 255)',
    gray2: 'rgb(243, 232, 255)',
    gray3: 'rgb(219, 234, 254)',
    positive: 'rgb(34, 197, 94)',
    negative: 'rgb(185, 28, 28)',
    accent1: 'rgb(249, 115, 22)',
    accent2: 'rgb(20, 184, 166)',
    accent3: 'rgb(34, 197, 94)',
    accent4: 'rgb(147, 197, 253)',
    invert: 'rgb(127, 29, 29)',
    invert2: 'rgb(219, 234, 254)',
  },
  darkIllustrationColor: {
    primary: 'rgb(248, 113, 113)',
    black: 'rgb(187, 247, 208)',
    white: 'rgb(30, 27, 75)',
    gray: 'rgb(88, 28, 135)',
    gray2: 'rgb(88, 28, 135)',
    gray3: 'rgb(30, 58, 138)',
    positive: 'rgb(74, 222, 128)',
    negative: 'rgb(252, 165, 165)',
    accent1: 'rgb(253, 186, 116)',
    accent2: 'rgb(94, 234, 212)',
    accent3: 'rgb(74, 222, 128)',
    accent4: 'rgb(147, 197, 253)',
    invert: 'rgb(254, 202, 202)',
    invert2: 'rgb(30, 58, 138)',
  },
};

export const ILLUSTRATION_THEMES: Record<
  Exclude<IllustrationThemeKey, 'default'>,
  IllustrationTheme
> = {
  warm: WARM_ILLUSTRATION_THEME,
  monochrome: MONOCHROME_ILLUSTRATION_THEME,
  garish: GARISH_ILLUSTRATION_THEME,
};
