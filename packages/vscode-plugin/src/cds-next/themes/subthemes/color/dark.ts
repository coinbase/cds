import type { ColorTheme } from '../../../core/theme';

export const darkColorTheme = {
  color: {
    // Text
    textForeground: 'rgb(var(--gray100))',
    textForegroundInverse: 'rgb(var(--gray0))',
    textForegroundMuted: 'rgb(var(--gray60))',
    textPrimary: 'rgb(var(--blue60))',
    textPositive: 'rgb(var(--green60))',
    textNegative: 'rgb(var(--red60))',
    textWarning: 'rgb(var(--orange70))',
    // Background
    background: 'rgb(var(--gray0))',
    backgroundAlternate: 'rgb(var(--gray5))',
    backgroundInverse: 'rgb(var(--gray100))',
    backgroundOverlay: 'rgba(var(--gray80),0.33)',
    backgroundPrimary: 'rgb(var(--blue70))',
    backgroundPrimaryWash: 'rgb(var(--blue0))',
    backgroundSecondary: 'rgb(var(--gray10))',
    backgroundNegative: 'rgb(var(--red60))',
    backgroundNegativeWash: 'rgb(var(--red0))',
    backgroundWarning: 'rgb(var(--yellow50))',
    backgroundWarningWash: 'rgb(var(--orange0))',
    // Background states
    backgroundPrimaryHover: 'rgb(var(--blue70))',
    backgroundPrimaryPressed: 'rgb(var(--blue80))',
    backgroundPrimaryDisabled: 'rgb(var(--blue15))',
    backgroundSecondaryHover: 'rgb(var(--gray5))',
    backgroundSecondaryPressed: 'rgb(var(--gray5))',
    backgroundSecondaryDisabled: 'rgb(var(--gray5))',
    backgroundNegativeHover: 'rgb(var(--red60))',
    backgroundNegativePressed: 'rgb(var(--red60))',
    backgroundNegativeDisabled: 'rgb(var(--red60))',
    // Line
    line: 'rgba(var(--gray60),0.2)',
    lineInverse: 'rgb(var(--gray0))',
    lineHeavy: 'rgba(var(--gray60),0.66)',
    bgLinePrimary: 'rgb(var(--blue70))',
    linePrimaryLight: 'rgb(var(--blue20))',
    // Elevation
    elevation1: 'rgb(var(--gray5))',
    elevation2: 'rgb(var(--gray10))', // TO DO: can these be called backgroundElevation1?
    // Icon
    iconForeground: 'rgb(var(--gray100))',
    iconForegroundInverse: 'rgb(var(--gray0))',
    iconForegroundMuted: 'rgb(var(--gray60))',
    iconPrimary: 'rgb(var(--blue70))',
    iconPositive: 'rgb(var(--green60))',
    iconNegative: 'rgb(var(--red60))',
    iconWarning: 'rgb(var(--orange70))',
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
    transparentHover: 'rgba(15,16,18,0.98)',
    transparentPressed: 'rgba(30,31,32,0.92)',
    transparentDisabled: 'rgb(10,11,13)',
  },
} as const satisfies ColorTheme;
