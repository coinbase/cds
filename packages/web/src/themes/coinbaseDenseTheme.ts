import type { ThemeConfig } from '../core/theme';

import { coinbaseTheme } from './coinbaseTheme';

export const coinbaseDenseThemeId = 'coinbase-dense';

/** @deprecated This theme was created to test backwards compatibility, it is not officially supported by CDS. Please copy it into your own repo and modify it as needed. Do not import it directly from CDS. */
export const coinbaseDenseTheme = {
  ...coinbaseTheme,
  id: coinbaseDenseThemeId,
  space: {
    '0': 0,
    '0.25': 2,
    '0.5': 4,
    '0.75': 6,
    '1': 8,
    '1.5': 10,
    '2': 12,
    '3': 16,
    '4': 20,
    '5': 24,
    '6': 28,
    '7': 32,
    '8': 36,
    '9': 40,
    '10': 44,
  },
  iconSize: {
    xs: 8,
    s: 12,
    m: 16,
    l: 24,
  },
  avatarSize: {
    s: 16,
    m: 20,
    l: 24,
    xl: 36,
    xxl: 44,
    xxxl: 48,
  },
  controlSize: {
    checkboxSize: 16,
    radioSize: 16,
    switchWidth: 42,
    switchHeight: 24,
    switchThumbSize: 22,
    tileSize: 92,
  },
  fontFamily: {
    display1: 'var(--cds-font-display)',
    display2: 'var(--cds-font-display)',
    display3: 'var(--cds-font-display)',
    title1: 'var(--cds-font-display)',
    title2: 'var(--cds-font-display)',
    title3: 'var(--cds-font-sans)',
    title4: 'var(--cds-font-sans)',
    headline: 'var(--cds-font-sans)',
    body: 'var(--cds-font-sans)',
    label1: 'var(--cds-font-text)',
    label2: 'var(--cds-font-text)',
    caption: 'var(--cds-font-text)',
    legal: 'var(--cds-font-text)',
  },
  fontSize: {
    display1: '3.8125rem', // 61px
    display2: '2.8125rem', // 45px
    display3: '2.3125rem', // 37px
    title1: '1.5625rem', // 25px
    title2: '1.5625rem', // 25px
    title3: '1.0625rem', // 17px
    title4: '1.0625rem', // 17px
    headline: '0.875rem', // 14px
    body: '0.875rem', // 14px
    label1: '0.6875rem', // 11px
    label2: '0.6875rem', // 11px
    caption: '0.8125rem', // 10px
    legal: '0.625rem', // 10px
  },
  fontWeight: {
    display1: '400',
    display2: '400',
    display3: '400',
    title1: '600',
    title2: '400',
    title3: '600',
    title4: '400',
    headline: '600',
    body: '400',
    label1: '600',
    label2: '400',
    caption: '600',
    legal: '400',
  },
  lineHeight: {
    display1: '4.25rem', // 68px
    display2: '3.25rem', // 52px
    display3: '2.75rem', // 44px
    title1: '2rem', // 32px
    title2: '2rem', // 32px
    title3: '1.5rem', // 24px
    title4: '1.5rem', // 24px
    headline: '1.25rem', // 20px
    body: '1.25rem', // 20px
    label1: '1rem', // 16px
    label2: '1rem', // 16px
    caption: '0.75rem', // 12px
    legal: '0.75rem', // 12px
  },
} as const satisfies ThemeConfig;
