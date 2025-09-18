import type { IllustrationColorTheme } from '../../../core/theme';

export const darkIllustrationColorTheme = {
  illustrationColor: {
    primary: '#588AF5',
    black: '#0A0B0D',
    white: '#FFFFFF',
    gray: '#464B55',
    gray2: '#464B55',
    gray3: '#FFFFFF',
    positive: '#44C28D',
    negative: '#F0616D',
    accent1: '#ECD069',
    accent2: '#45DAF6',
    accent3: '#F07836',
    accent4: '#A5C1FD',
    invert: '#FFFFFF',
    invert2: '#0A0B0D',
  },
} as const satisfies IllustrationColorTheme;
