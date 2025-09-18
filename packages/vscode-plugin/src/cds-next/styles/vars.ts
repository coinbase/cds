/**
 * Vars are design token values that are used to style components.
 * Each vars object is converted to a CSS custom property (variables) set.
 */
import { light } from './spectrum';

export const spectrum = { ...light } as const;

export const color = {
  // Text
  textForeground: 'rgb(var(--gray100))',
  textForegroundInverse: 'rgb(var(--gray0))',
  textForegroundMuted: 'rgb(var(--gray60))',
  textPrimary: 'rgb(var(--blue60))',
  textPositive: 'rgb(var(--green60))',
  textNegative: 'rgb(var(--red60))',
  textWarning: 'rgb(var(--orange40))',
  // Background
  background: 'rgb(var(--gray0))',
  backgroundAlternate: 'rgb(var(--gray5))',
  backgroundInverse: 'rgb(var(--gray100))',
  backgroundOverlay: 'rgba(var(--gray80),0.33)',
  backgroundPrimary: 'rgb(var(--blue60))',
  backgroundPrimaryWash: 'rgb(var(--blue0))',
  backgroundSecondary: 'rgb(var(--gray5))',
  backgroundNegative: 'rgb(var(--red60))',
  backgroundNegativeWash: 'rgb(var(--red0))',
  backgroundWarning: 'rgb(var(--yellow50))',
  backgroundWarningWash: 'rgb(var(--orange0))',
  // Background states
  backgroundPrimaryHover: 'rgb(var(--gray0))',
  backgroundPrimaryPressed: 'rgb(var(--gray5))',
  backgroundPrimaryDisabled: 'rgb(var(--gray100))',
  backgroundSecondaryHover: 'rgb(var(--gray0))',
  backgroundSecondaryPressed: 'rgb(var(--gray5))',
  backgroundSecondaryDisabled: 'rgb(var(--gray100))',
  backgroundNegativeHover: 'rgba(var(--gray80),0.33)',
  backgroundNegativePressed: 'rgb(var(--blue60))',
  backgroundNegativeDisabled: 'rgb(var(--blue0))',

  // Line
  line: 'rgba(var(--gray60),0.2)',
  lineInverse: 'rgb(var(--gray0))',
  lineHeavy: 'rgba(var(--gray60),0.66)',
  bgLinePrimary: 'rgb(var(--blue60))',
  linePrimaryLight: 'rgb(var(--blue20))',
  // Elevation
  elevation1: 'rgb(var(--gray0))',
  elevation2: 'rgb(var(--gray0))', // TO DO: can these be called backgroundElevation1?
  // Icon
  iconForeground: 'rgb(var(--gray100))',
  iconForegroundInverse: 'rgb(var(--gray0))',
  iconForegroundMuted: 'rgb(var(--gray60))',
  iconPrimary: 'rgb(var(--blue60))',
  iconPositive: 'rgb(var(--green60))',
  iconNegative: 'rgb(var(--red60))',
  iconWarning: 'rgb(var(--orange40))',
  // Accent
  accentSubtleGreen: 'rgb(var(--green0))',
  accentBoldGreen: 'rgb(var(--green60))',
  accentSubtleBlue: 'rgb(var(--blue0))',
  accentBoldBlue: 'rgb(var(--blue60))',
  accentSubtlePurple: 'rgb(var(--purple0))',
  accentBoldPurple: 'rgb(var(--purple80))',
  accentSubtleYellow: 'rgb(var(--yellow0))',
  accentBoldYellow: 'rgb(var(--yellow30))',
  accentSubtleRed: 'rgb(var(--red0))',
  accentBoldRed: 'rgb(var(--red60))',
  accentSubtleGray: 'rgb(var(--gray10))',
  accentBoldGray: 'rgb(var(--gray80))',
  // Transparent
  transparent: 'rgba(var(--gray100),0)',
  transparentHover: 'rgba(250,250,250,0.98)',
  transparentPressed: 'rgba(235,235,236,0.92)',
  transparentDisabled: 'rgb(255,255,255)',
} as const;

export const illustrationColor = {
  primary: '#0052FF',
  black: '#0A0B0D',
  white: '#FFFFFF',
  gray: '#CED2DB',
  gray2: '#050607',
  gray3: '#CED3DA',
  positive: '#00D17F',
  negative: '#FF3344',
  accent1: '#FFD200',
  accent2: '#5DE2F8',
  accent3: '#ED702F',
  accent4: '#73A2FF',
  invert: '#101114',
  invert2: '#FEFFFF',
} as const;

export const space = {
  '0': '0px',
  '0.5': '4px',
  '1': '8px',
  '2': '16px',
  '3': '24px',
  '4': '32px',
  '5': '40px',
  '6': '48px',
  '7': '56px',
  '8': '64px',
  '9': '72px',
  '10': '80px',
} as const;

export const size = {
  'icon-xs': '12px',
  'icon-s': '16px',
  'icon-m': '24px',
  'icon-l': '32px',
} as const;

export const borderWidth = {
  none: '0px',
  thin: '1px',
  thick: '2px',
} as const;

export const borderRadius = {
  none: '0px',
  roundedSmall: '4px',
  rounded: '8px',
  roundedMedium: '12px',
  roundedLarge: '16px',
  roundedXLarge: '24px',
  roundedFull: '1e5px',
} as const;

export const fontFamily = {
  display1: 'var(--cds-font-display)',
  display2: 'var(--cds-font-display)',
  display3: 'var(--cds-font-display)',
  title1: 'var(--cds-font-sans)',
  title2: 'var(--cds-font-sans)',
  title3: 'var(--cds-font-sans)',
  title4: 'var(--cds-font-sans)',
  headline: 'var(--cds-font-sans)',
  body: 'var(--cds-font-text)',
  label1: 'var(--cds-font-text)',
  label2: 'var(--cds-font-text)',
  caption: 'var(--cds-font-text)',
  legal: 'var(--cds-font-text)',
} as const;

export const fontWeight = {
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
} as const;

export const fontSize = {
  display1: '4rem', // 64px
  display2: '3rem', // 48px
  display3: '2.5rem', // 40px
  title1: '1.75rem', // 28px
  title2: '1.75rem', // 28px
  title3: '1.25rem', // 20px
  title4: '1.25rem', // 20px
  headline: '1rem', // 16px
  body: '1rem', // 16px
  label1: '0.875rem', // 14px
  label2: '0.875rem', // 14px
  caption: '0.8125rem', // 13px
  legal: '0.8125rem', // 13px
} as const;

export const lineHeight = {
  display1: '4.5rem', // 72px
  display2: '3.5rem', // 56px
  display3: '3rem', // 48px
  title1: '2.25rem', // 36px
  title2: '2.25rem', // 36px
  title3: '1.75rem', // 28px
  title4: '1.75rem', // 28px
  headline: '1.5rem', // 24px
  body: '1.5rem', // 24px
  label1: '1.25rem', // 20px
  label2: '1.25rem', // 20px
  caption: '1rem', // 16px
  legal: '1rem', // 16px
} as const;

export const shadow = {
  light: `inset 0px -1px 0px 0px var(--color-line)`,
} as const;

export const zIndex = {
  interactable: '1',
  navigation: '2',
  portal: '100001',
  popoverMenu: '2',
  modal: '3',
  dropdown: '4',
  tooltip: '5',
  toast: '6',
  alert: '7',
  max: '2147483647',
} as const;
