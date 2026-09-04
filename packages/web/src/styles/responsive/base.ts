/**
 * These styles are used to power the component StyleProps API.
 */

/* eslint-disable no-restricted-syntax */

import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { css, type LinariaClassName } from '@linaria/core';

import type { DynamicStyleProps } from '../styleProps';

/**
 * Classnames for dynamic style props. Dynamic style props are style props whose
 * values cannot be known at build time, such as width and height. The values for
 * these style props are set via CSS Variables in the inline styles.
 */
export const dynamic: Record<keyof DynamicStyleProps, LinariaClassName> = {
  width: css`
    width: var(--width);
  `,
  height: css`
    height: var(--height);
  `,
  minWidth: css`
    min-width: var(--minWidth);
  `,
  minHeight: css`
    min-height: var(--minHeight);
  `,
  maxWidth: css`
    max-width: var(--maxWidth);
  `,
  maxHeight: css`
    max-height: var(--maxHeight);
  `,
  aspectRatio: css`
    aspect-ratio: var(--aspectRatio);
  `,
  top: css`
    top: var(--top);
  `,
  bottom: css`
    bottom: var(--bottom);
  `,
  left: css`
    left: var(--left);
  `,
  right: css`
    right: var(--right);
  `,
  transform: css`
    transform: var(--transform);
  `,
  flexBasis: css`
    flex-basis: var(--flexBasis);
  `,
  flexShrink: css`
    flex-shrink: var(--flexShrink);
  `,
  flexGrow: css`
    flex-grow: var(--flexGrow);
  `,
  gridTemplateColumns: css`
    grid-template-columns: var(--gridTemplateColumns);
  `,
  gridTemplateRows: css`
    grid-template-rows: var(--gridTemplateRows);
  `,
  gridTemplateAreas: css`
    grid-template-areas: var(--gridTemplateAreas);
  `,
  gridTemplate: css`
    grid-template: var(--gridTemplate);
  `,
  gridAutoColumns: css`
    grid-auto-columns: var(--gridAutoColumns);
  `,
  gridAutoRows: css`
    grid-auto-rows: var(--gridAutoRows);
  `,
  gridAutoFlow: css`
    grid-auto-flow: var(--gridAutoFlow);
  `,
  grid: css`
    grid: var(--grid);
  `,
  gridRowStart: css`
    grid-row-start: var(--gridRowStart);
  `,
  gridColumnStart: css`
    grid-column-start: var(--gridColumnStart);
  `,
  gridRowEnd: css`
    grid-row-end: var(--gridRowEnd);
  `,
  gridColumnEnd: css`
    grid-column-end: var(--gridColumnEnd);
  `,
  gridRow: css`
    grid-row: var(--gridRow);
  `,
  gridColumn: css`
    grid-column: var(--gridColumn);
  `,
  gridArea: css`
    grid-area: var(--gridArea);
  `,
  opacity: css`
    opacity: var(--opacity);
  `,
  zIndex: css`
    z-index: var(--zIndex);
  `,
} as const;

export const elevation: Record<ThemeVars.Elevation, LinariaClassName> = {
  '0': css``,
  '1': css`
    background-color: var(--color-bgElevation1);
    box-shadow: var(--shadow-elevation1);
  `,
  '2': css`
    background-color: var(--color-bgElevation2);
    box-shadow: var(--shadow-elevation2);
  `,
} as const;

export const color: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  fg: css`
    color: var(--color-fg);
  `,
  fgInverse: css`
    color: var(--color-fgInverse);
  `,
  fgMuted: css`
    color: var(--color-fgMuted);
  `,
  fgPrimary: css`
    color: var(--color-fgPrimary);
  `,
  fgPositive: css`
    color: var(--color-fgPositive);
  `,
  fgNegative: css`
    color: var(--color-fgNegative);
  `,
  fgWarning: css`
    color: var(--color-fgWarning);
  `,
  // Background
  bg: css`
    color: var(--color-bg);
  `,
  bgAlternate: css`
    color: var(--color-bgAlternate);
  `,
  bgInverse: css`
    color: var(--color-bgInverse);
  `,
  bgOverlay: css`
    color: var(--color-bgOverlay);
  `,
  bgPrimary: css`
    color: var(--color-bgPrimary);
  `,
  bgPrimaryWash: css`
    color: var(--color-bgPrimaryWash);
  `,
  bgSecondary: css`
    color: var(--color-bgSecondary);
  `,
  bgTertiary: css`
    color: var(--color-bgTertiary);
  `,
  bgSecondaryWash: css`
    color: var(--color-bgSecondaryWash);
  `,
  bgNegative: css`
    color: var(--color-bgNegative);
  `,
  bgNegativeWash: css`
    color: var(--color-bgNegativeWash);
  `,
  bgPositive: css`
    color: var(--color-bgPositive);
  `,
  bgPositiveWash: css`
    color: var(--color-bgPositiveWash);
  `,
  bgWarning: css`
    color: var(--color-bgWarning);
  `,
  bgWarningWash: css`
    color: var(--color-bgWarningWash);
  `,
  currentColor: css`
    color: var(--color-currentColor);
  `,
  // Line
  bgLine: css`
    color: var(--color-bgLine);
  `,
  bgLineInverse: css`
    color: var(--color-bgLineInverse);
  `,
  bgLineHeavy: css`
    color: var(--color-bgLineHeavy);
  `,
  bgLinePrimary: css`
    color: var(--color-bgLinePrimary);
  `,
  bgLinePrimarySubtle: css`
    color: var(--color-bgLinePrimarySubtle);
  `,
  // Elevation
  bgElevation1: css`
    color: var(--color-bgElevation1);
  `,
  bgElevation2: css`
    color: var(--color-bgElevation2);
  `,
  // Accent
  accentSubtleGreen: css`
    color: var(--color-accentSubtleGreen);
  `,
  accentBoldGreen: css`
    color: var(--color-accentBoldGreen);
  `,
  accentSubtleBlue: css`
    color: var(--color-accentSubtleBlue);
  `,
  accentBoldBlue: css`
    color: var(--color-accentBoldBlue);
  `,
  accentSubtlePurple: css`
    color: var(--color-accentSubtlePurple);
  `,
  accentBoldPurple: css`
    color: var(--color-accentBoldPurple);
  `,
  accentSubtleYellow: css`
    color: var(--color-accentSubtleYellow);
  `,
  accentBoldYellow: css`
    color: var(--color-accentBoldYellow);
  `,
  accentSubtleRed: css`
    color: var(--color-accentSubtleRed);
  `,
  accentBoldRed: css`
    color: var(--color-accentBoldRed);
  `,
  accentSubtleGray: css`
    color: var(--color-accentSubtleGray);
  `,
  accentBoldGray: css`
    color: var(--color-accentBoldGray);
  `,
  transparent: css`
    color: var(--color-transparent);
  `,
} as const;

export const background: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  fg: css`
    background-color: var(--color-fg);
  `,
  fgInverse: css`
    background-color: var(--color-fgInverse);
  `,
  fgMuted: css`
    background-color: var(--color-fgMuted);
  `,
  fgPrimary: css`
    background-color: var(--color-fgPrimary);
  `,
  fgPositive: css`
    background-color: var(--color-fgPositive);
  `,
  fgNegative: css`
    background-color: var(--color-fgNegative);
  `,
  fgWarning: css`
    background-color: var(--color-fgWarning);
  `,
  // Background
  bg: css`
    background-color: var(--color-bg);
  `,
  bgAlternate: css`
    background-color: var(--color-bgAlternate);
  `,
  bgInverse: css`
    background-color: var(--color-bgInverse);
  `,
  bgOverlay: css`
    background-color: var(--color-bgOverlay);
  `,
  bgPrimary: css`
    background-color: var(--color-bgPrimary);
  `,
  bgPrimaryWash: css`
    background-color: var(--color-bgPrimaryWash);
  `,
  bgSecondary: css`
    background-color: var(--color-bgSecondary);
  `,
  bgTertiary: css`
    background-color: var(--color-bgTertiary);
  `,
  bgSecondaryWash: css`
    background-color: var(--color-bgSecondaryWash);
  `,
  bgNegative: css`
    background-color: var(--color-bgNegative);
  `,
  bgNegativeWash: css`
    background-color: var(--color-bgNegativeWash);
  `,
  bgPositive: css`
    background-color: var(--color-bgPositive);
  `,
  bgPositiveWash: css`
    background-color: var(--color-bgPositiveWash);
  `,
  bgWarning: css`
    background-color: var(--color-bgWarning);
  `,
  bgWarningWash: css`
    background-color: var(--color-bgWarningWash);
  `,
  currentColor: css`
    background-color: var(--color-currentColor);
  `,
  // Line
  bgLine: css`
    background-color: var(--color-bgLine);
  `,
  bgLineInverse: css`
    background-color: var(--color-bgLineInverse);
  `,
  bgLineHeavy: css`
    background-color: var(--color-bgLineHeavy);
  `,
  bgLinePrimary: css`
    background-color: var(--color-bgLinePrimary);
  `,
  bgLinePrimarySubtle: css`
    background-color: var(--color-bgLinePrimarySubtle);
  `,
  // Elevation
  bgElevation1: css`
    background-color: var(--color-bgElevation1);
  `,
  bgElevation2: css`
    background-color: var(--color-bgElevation2);
  `,
  // Accent
  accentSubtleGreen: css`
    background-color: var(--color-accentSubtleGreen);
  `,
  accentBoldGreen: css`
    background-color: var(--color-accentBoldGreen);
  `,
  accentSubtleBlue: css`
    background-color: var(--color-accentSubtleBlue);
  `,
  accentBoldBlue: css`
    background-color: var(--color-accentBoldBlue);
  `,
  accentSubtlePurple: css`
    background-color: var(--color-accentSubtlePurple);
  `,
  accentBoldPurple: css`
    background-color: var(--color-accentBoldPurple);
  `,
  accentSubtleYellow: css`
    background-color: var(--color-accentSubtleYellow);
  `,
  accentBoldYellow: css`
    background-color: var(--color-accentBoldYellow);
  `,
  accentSubtleRed: css`
    background-color: var(--color-accentSubtleRed);
  `,
  accentBoldRed: css`
    background-color: var(--color-accentBoldRed);
  `,
  accentSubtleGray: css`
    background-color: var(--color-accentSubtleGray);
  `,
  accentBoldGray: css`
    background-color: var(--color-accentBoldGray);
  `,
  transparent: css`
    background-color: var(--color-transparent);
  `,
} as const;

export const borderColor: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  fg: css`
    border-style: solid;
    border-color: var(--color-fg);
  `,
  fgInverse: css`
    border-style: solid;
    border-color: var(--color-fgInverse);
  `,
  fgMuted: css`
    border-style: solid;
    border-color: var(--color-fgMuted);
  `,
  fgPrimary: css`
    border-style: solid;
    border-color: var(--color-fgPrimary);
  `,
  fgPositive: css`
    border-style: solid;
    border-color: var(--color-fgPositive);
  `,
  fgNegative: css`
    border-style: solid;
    border-color: var(--color-fgNegative);
  `,
  fgWarning: css`
    border-style: solid;
    border-color: var(--color-fgWarning);
  `,
  // Background
  bg: css`
    border-style: solid;
    border-color: var(--color-bg);
  `,
  bgAlternate: css`
    border-style: solid;
    border-color: var(--color-bgAlternate);
  `,
  bgInverse: css`
    border-style: solid;
    border-color: var(--color-bgInverse);
  `,
  bgOverlay: css`
    border-style: solid;
    border-color: var(--color-bgOverlay);
  `,
  bgPrimary: css`
    border-style: solid;
    border-color: var(--color-bgPrimary);
  `,
  bgPrimaryWash: css`
    border-style: solid;
    border-color: var(--color-bgPrimaryWash);
  `,
  bgSecondary: css`
    border-style: solid;
    border-color: var(--color-bgSecondary);
  `,
  bgTertiary: css`
    border-style: solid;
    border-color: var(--color-bgTertiary);
  `,
  bgSecondaryWash: css`
    border-style: solid;
    border-color: var(--color-bgSecondaryWash);
  `,
  bgNegative: css`
    border-style: solid;
    border-color: var(--color-bgNegative);
  `,
  bgNegativeWash: css`
    border-style: solid;
    border-color: var(--color-bgNegativeWash);
  `,
  bgPositive: css`
    border-style: solid;
    border-color: var(--color-bgPositive);
  `,
  bgPositiveWash: css`
    border-style: solid;
    border-color: var(--color-bgPositiveWash);
  `,
  bgWarning: css`
    border-style: solid;
    border-color: var(--color-bgWarning);
  `,
  bgWarningWash: css`
    border-style: solid;
    border-color: var(--color-bgWarningWash);
  `,
  currentColor: css`
    border-style: solid;
    border-color: var(--color-currentColor);
  `,
  // Line
  bgLine: css`
    border-style: solid;
    border-color: var(--color-bgLine);
  `,
  bgLineInverse: css`
    border-style: solid;
    border-color: var(--color-bgLineInverse);
  `,
  bgLineHeavy: css`
    border-style: solid;
    border-color: var(--color-bgLineHeavy);
  `,
  bgLinePrimary: css`
    border-style: solid;
    border-color: var(--color-bgLinePrimary);
  `,
  bgLinePrimarySubtle: css`
    border-style: solid;
    border-color: var(--color-bgLinePrimarySubtle);
  `,
  // Elevation
  bgElevation1: css`
    border-style: solid;
    border-color: var(--color-bgElevation1);
  `,
  bgElevation2: css`
    border-style: solid;
    border-color: var(--color-bgElevation2);
  `,
  // Accent
  accentSubtleGreen: css`
    border-style: solid;
    border-color: var(--color-accentSubtleGreen);
  `,
  accentBoldGreen: css`
    border-style: solid;
    border-color: var(--color-accentBoldGreen);
  `,
  accentSubtleBlue: css`
    border-style: solid;
    border-color: var(--color-accentSubtleBlue);
  `,
  accentBoldBlue: css`
    border-style: solid;
    border-color: var(--color-accentBoldBlue);
  `,
  accentSubtlePurple: css`
    border-style: solid;
    border-color: var(--color-accentSubtlePurple);
  `,
  accentBoldPurple: css`
    border-style: solid;
    border-color: var(--color-accentBoldPurple);
  `,
  accentSubtleYellow: css`
    border-style: solid;
    border-color: var(--color-accentSubtleYellow);
  `,
  accentBoldYellow: css`
    border-style: solid;
    border-color: var(--color-accentBoldYellow);
  `,
  accentSubtleRed: css`
    border-style: solid;
    border-color: var(--color-accentSubtleRed);
  `,
  accentBoldRed: css`
    border-style: solid;
    border-color: var(--color-accentBoldRed);
  `,
  accentSubtleGray: css`
    border-style: solid;
    border-color: var(--color-accentSubtleGray);
  `,
  accentBoldGray: css`
    border-style: solid;
    border-color: var(--color-accentBoldGray);
  `,
  transparent: css`
    border-style: solid;
    border-color: var(--color-transparent);
  `,
} as const;

export const borderWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    border-width: var(--borderWidth-0);
  `,
  '100': css`
    border-width: var(--borderWidth-100);
  `,
  '200': css`
    border-width: var(--borderWidth-200);
  `,
  '300': css`
    border-width: var(--borderWidth-300);
  `,
  '400': css`
    border-width: var(--borderWidth-400);
  `,
  '500': css`
    border-width: var(--borderWidth-500);
  `,
} as const;

export const borderTopWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    border-top-width: var(--borderWidth-0);
  `,
  '100': css`
    border-top-width: var(--borderWidth-100);
  `,
  '200': css`
    border-top-width: var(--borderWidth-200);
  `,
  '300': css`
    border-top-width: var(--borderWidth-300);
  `,
  '400': css`
    border-top-width: var(--borderWidth-400);
  `,
  '500': css`
    border-top-width: var(--borderWidth-500);
  `,
} as const;

export const borderEndWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    border-inline-end-width: var(--borderWidth-0);
  `,
  '100': css`
    border-inline-end-width: var(--borderWidth-100);
  `,
  '200': css`
    border-inline-end-width: var(--borderWidth-200);
  `,
  '300': css`
    border-inline-end-width: var(--borderWidth-300);
  `,
  '400': css`
    border-inline-end-width: var(--borderWidth-400);
  `,
  '500': css`
    border-inline-end-width: var(--borderWidth-500);
  `,
} as const;

export const borderBottomWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    border-bottom-width: var(--borderWidth-0);
  `,
  '100': css`
    border-bottom-width: var(--borderWidth-100);
  `,
  '200': css`
    border-bottom-width: var(--borderWidth-200);
  `,
  '300': css`
    border-bottom-width: var(--borderWidth-300);
  `,
  '400': css`
    border-bottom-width: var(--borderWidth-400);
  `,
  '500': css`
    border-bottom-width: var(--borderWidth-500);
  `,
} as const;

export const borderStartWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    border-inline-start-width: var(--borderWidth-0);
  `,
  '100': css`
    border-inline-start-width: var(--borderWidth-100);
  `,
  '200': css`
    border-inline-start-width: var(--borderWidth-200);
  `,
  '300': css`
    border-inline-start-width: var(--borderWidth-300);
  `,
  '400': css`
    border-inline-start-width: var(--borderWidth-400);
  `,
  '500': css`
    border-inline-start-width: var(--borderWidth-500);
  `,
} as const;

export const borderRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    border-radius: var(--borderRadius-0);
  `,
  '100': css`
    border-radius: var(--borderRadius-100);
  `,
  '200': css`
    border-radius: var(--borderRadius-200);
  `,
  '300': css`
    border-radius: var(--borderRadius-300);
  `,
  '400': css`
    border-radius: var(--borderRadius-400);
  `,
  '500': css`
    border-radius: var(--borderRadius-500);
  `,
  '600': css`
    border-radius: var(--borderRadius-600);
  `,
  '700': css`
    border-radius: var(--borderRadius-700);
  `,
  '800': css`
    border-radius: var(--borderRadius-800);
  `,
  '900': css`
    border-radius: var(--borderRadius-900);
  `,
  '1000': css`
    border-radius: var(--borderRadius-1000);
  `,
} as const;

export const borderTopLeftRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    border-top-left-radius: var(--borderRadius-0);
  `,
  '100': css`
    border-top-left-radius: var(--borderRadius-100);
  `,
  '200': css`
    border-top-left-radius: var(--borderRadius-200);
  `,
  '300': css`
    border-top-left-radius: var(--borderRadius-300);
  `,
  '400': css`
    border-top-left-radius: var(--borderRadius-400);
  `,
  '500': css`
    border-top-left-radius: var(--borderRadius-500);
  `,
  '600': css`
    border-top-left-radius: var(--borderRadius-600);
  `,
  '700': css`
    border-top-left-radius: var(--borderRadius-700);
  `,
  '800': css`
    border-top-left-radius: var(--borderRadius-800);
  `,
  '900': css`
    border-top-left-radius: var(--borderRadius-900);
  `,
  '1000': css`
    border-top-left-radius: var(--borderRadius-1000);
  `,
} as const;

export const borderTopRightRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    border-top-right-radius: var(--borderRadius-0);
  `,
  '100': css`
    border-top-right-radius: var(--borderRadius-100);
  `,
  '200': css`
    border-top-right-radius: var(--borderRadius-200);
  `,
  '300': css`
    border-top-right-radius: var(--borderRadius-300);
  `,
  '400': css`
    border-top-right-radius: var(--borderRadius-400);
  `,
  '500': css`
    border-top-right-radius: var(--borderRadius-500);
  `,
  '600': css`
    border-top-right-radius: var(--borderRadius-600);
  `,
  '700': css`
    border-top-right-radius: var(--borderRadius-700);
  `,
  '800': css`
    border-top-right-radius: var(--borderRadius-800);
  `,
  '900': css`
    border-top-right-radius: var(--borderRadius-900);
  `,
  '1000': css`
    border-top-right-radius: var(--borderRadius-1000);
  `,
} as const;

export const borderBottomLeftRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    border-bottom-left-radius: var(--borderRadius-0);
  `,
  '100': css`
    border-bottom-left-radius: var(--borderRadius-100);
  `,
  '200': css`
    border-bottom-left-radius: var(--borderRadius-200);
  `,
  '300': css`
    border-bottom-left-radius: var(--borderRadius-300);
  `,
  '400': css`
    border-bottom-left-radius: var(--borderRadius-400);
  `,
  '500': css`
    border-bottom-left-radius: var(--borderRadius-500);
  `,
  '600': css`
    border-bottom-left-radius: var(--borderRadius-600);
  `,
  '700': css`
    border-bottom-left-radius: var(--borderRadius-700);
  `,
  '800': css`
    border-bottom-left-radius: var(--borderRadius-800);
  `,
  '900': css`
    border-bottom-left-radius: var(--borderRadius-900);
  `,
  '1000': css`
    border-bottom-left-radius: var(--borderRadius-1000);
  `,
} as const;

export const borderBottomRightRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    border-bottom-right-radius: var(--borderRadius-0);
  `,
  '100': css`
    border-bottom-right-radius: var(--borderRadius-100);
  `,
  '200': css`
    border-bottom-right-radius: var(--borderRadius-200);
  `,
  '300': css`
    border-bottom-right-radius: var(--borderRadius-300);
  `,
  '400': css`
    border-bottom-right-radius: var(--borderRadius-400);
  `,
  '500': css`
    border-bottom-right-radius: var(--borderRadius-500);
  `,
  '600': css`
    border-bottom-right-radius: var(--borderRadius-600);
  `,
  '700': css`
    border-bottom-right-radius: var(--borderRadius-700);
  `,
  '800': css`
    border-bottom-right-radius: var(--borderRadius-800);
  `,
  '900': css`
    border-bottom-right-radius: var(--borderRadius-900);
  `,
  '1000': css`
    border-bottom-right-radius: var(--borderRadius-1000);
  `,
} as const;

export const fontFamily: Record<ThemeVars.FontFamily | 'inherit', LinariaClassName> = {
  inherit: css`
    font-family: inherit;
  `,
  display1: css`
    font-family: var(--fontFamily-display1);
  `,
  display2: css`
    font-family: var(--fontFamily-display2);
  `,
  display3: css`
    font-family: var(--fontFamily-display3);
  `,
  title1: css`
    font-family: var(--fontFamily-title1);
  `,
  title2: css`
    font-family: var(--fontFamily-title2);
  `,
  title3: css`
    font-family: var(--fontFamily-title3);
  `,
  title4: css`
    font-family: var(--fontFamily-title4);
  `,
  headline: css`
    font-family: var(--fontFamily-headline);
  `,
  body: css`
    font-family: var(--fontFamily-body);
  `,
  label1: css`
    font-family: var(--fontFamily-label1);
  `,
  label2: css`
    font-family: var(--fontFamily-label2);
  `,
  caption: css`
    font-family: var(--fontFamily-caption);
  `,
  legal: css`
    font-family: var(--fontFamily-legal);
  `,
} as const;

export const fontSize: Record<ThemeVars.FontSize | 'inherit', LinariaClassName> = {
  inherit: css`
    font-size: inherit;
  `,
  display1: css`
    font-size: var(--fontSize-display1);
  `,
  display2: css`
    font-size: var(--fontSize-display2);
  `,
  display3: css`
    font-size: var(--fontSize-display3);
  `,
  title1: css`
    font-size: var(--fontSize-title1);
  `,
  title2: css`
    font-size: var(--fontSize-title2);
  `,
  title3: css`
    font-size: var(--fontSize-title3);
  `,
  title4: css`
    font-size: var(--fontSize-title4);
  `,
  headline: css`
    font-size: var(--fontSize-headline);
  `,
  body: css`
    font-size: var(--fontSize-body);
  `,
  label1: css`
    font-size: var(--fontSize-label1);
  `,
  label2: css`
    font-size: var(--fontSize-label2);
  `,
  caption: css`
    font-size: var(--fontSize-caption);
  `,
  legal: css`
    font-size: var(--fontSize-legal);
  `,
} as const;

export const fontWeight: Record<ThemeVars.FontWeight | 'inherit', LinariaClassName> = {
  inherit: css`
    font-weight: inherit;
  `,
  display1: css`
    font-weight: var(--fontWeight-display1);
  `,
  display2: css`
    font-weight: var(--fontWeight-display2);
  `,
  display3: css`
    font-weight: var(--fontWeight-display3);
  `,
  title1: css`
    font-weight: var(--fontWeight-title1);
  `,
  title2: css`
    font-weight: var(--fontWeight-title2);
  `,
  title3: css`
    font-weight: var(--fontWeight-title3);
  `,
  title4: css`
    font-weight: var(--fontWeight-title4);
  `,
  headline: css`
    font-weight: var(--fontWeight-headline);
  `,
  body: css`
    font-weight: var(--fontWeight-body);
  `,
  label1: css`
    font-weight: var(--fontWeight-label1);
  `,
  label2: css`
    font-weight: var(--fontWeight-label2);
  `,
  caption: css`
    font-weight: var(--fontWeight-caption);
  `,
  legal: css`
    font-weight: var(--fontWeight-legal);
  `,
} as const;

export const lineHeight: Record<ThemeVars.LineHeight | 'inherit', LinariaClassName> = {
  inherit: css`
    line-height: inherit;
  `,
  display1: css`
    line-height: var(--lineHeight-display1);
  `,
  display2: css`
    line-height: var(--lineHeight-display2);
  `,
  display3: css`
    line-height: var(--lineHeight-display3);
  `,
  title1: css`
    line-height: var(--lineHeight-title1);
  `,
  title2: css`
    line-height: var(--lineHeight-title2);
  `,
  title3: css`
    line-height: var(--lineHeight-title3);
  `,
  title4: css`
    line-height: var(--lineHeight-title4);
  `,
  headline: css`
    line-height: var(--lineHeight-headline);
  `,
  body: css`
    line-height: var(--lineHeight-body);
  `,
  label1: css`
    line-height: var(--lineHeight-label1);
  `,
  label2: css`
    line-height: var(--lineHeight-label2);
  `,
  caption: css`
    line-height: var(--lineHeight-caption);
  `,
  legal: css`
    line-height: var(--lineHeight-legal);
  `,
} as const;

export const textDecoration = {
  none: css`
    text-decoration: none;
  `,
  underline: css`
    text-decoration: underline;
  `,
  overline: css`
    text-decoration: overline;
  `,
  'line-through': css`
    text-decoration: line-through;
  `,
  'underline overline': css`
    text-decoration: underline overline;
  `,
  'underline double': css`
    text-decoration: underline double;
  `,
} as const;

export const textTransform = {
  none: css`
    text-transform: none;
  `,
  uppercase: css`
    text-transform: uppercase;
  `,
  lowercase: css`
    text-transform: lowercase;
  `,
  capitalize: css`
    text-transform: capitalize;
  `,
} as const;

export const userSelect = {
  none: css`
    user-select: none;
  `,
  text: css`
    user-select: text;
  `,
  all: css`
    user-select: all;
  `,
  auto: css`
    user-select: auto;
  `,
} as const;

export const display = {
  none: css`
    display: none;
  `,
  block: css`
    display: block;
  `,
  inline: css`
    display: inline;
  `,
  'inline-block': css`
    display: inline-block;
  `,
  flex: css`
    display: flex;
  `,
  'inline-flex': css`
    display: inline-flex;
  `,
  grid: css`
    display: grid;
  `,
  'inline-grid': css`
    display: inline-grid;
  `,
  contents: css`
    display: contents;
  `,
  'flow-root': css`
    display: flow-root;
  `,
  revert: css`
    display: revert;
  `,
  'list-item': css`
    display: list-item;
  `,
} as const;

export const overflow = {
  auto: css`
    overflow: auto;
  `,
  visible: css`
    overflow: visible;
  `,
  hidden: css`
    overflow: hidden;
  `,
  clip: css`
    overflow: clip;
  `,
  scroll: css`
    overflow: scroll;
  `,
} as const;

export const gap: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    gap: var(--space-0);
  `,
  '0.25': css`
    gap: var(--space-0_25);
  `,
  '0.5': css`
    gap: var(--space-0_5);
  `,
  '0.75': css`
    gap: var(--space-0_75);
  `,
  '1': css`
    gap: var(--space-1);
  `,
  '1.5': css`
    gap: var(--space-1_5);
  `,
  '2': css`
    gap: var(--space-2);
  `,
  '3': css`
    gap: var(--space-3);
  `,
  '4': css`
    gap: var(--space-4);
  `,
  '5': css`
    gap: var(--space-5);
  `,
  '6': css`
    gap: var(--space-6);
  `,
  '7': css`
    gap: var(--space-7);
  `,
  '8': css`
    gap: var(--space-8);
  `,
  '9': css`
    gap: var(--space-9);
  `,
  '10': css`
    gap: var(--space-10);
  `,
} as const;

export const columnGap: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    column-gap: var(--space-0);
  `,
  '0.25': css`
    column-gap: var(--space-0_25);
  `,
  '0.5': css`
    column-gap: var(--space-0_5);
  `,
  '0.75': css`
    column-gap: var(--space-0_75);
  `,
  '1': css`
    column-gap: var(--space-1);
  `,
  '1.5': css`
    column-gap: var(--space-1_5);
  `,
  '2': css`
    column-gap: var(--space-2);
  `,
  '3': css`
    column-gap: var(--space-3);
  `,
  '4': css`
    column-gap: var(--space-4);
  `,
  '5': css`
    column-gap: var(--space-5);
  `,
  '6': css`
    column-gap: var(--space-6);
  `,
  '7': css`
    column-gap: var(--space-7);
  `,
  '8': css`
    column-gap: var(--space-8);
  `,
  '9': css`
    column-gap: var(--space-9);
  `,
  '10': css`
    column-gap: var(--space-10);
  `,
} as const;

export const rowGap: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    row-gap: var(--space-0);
  `,
  '0.25': css`
    row-gap: var(--space-0_25);
  `,
  '0.5': css`
    row-gap: var(--space-0_5);
  `,
  '0.75': css`
    row-gap: var(--space-0_75);
  `,
  '1': css`
    row-gap: var(--space-1);
  `,
  '1.5': css`
    row-gap: var(--space-1_5);
  `,
  '2': css`
    row-gap: var(--space-2);
  `,
  '3': css`
    row-gap: var(--space-3);
  `,
  '4': css`
    row-gap: var(--space-4);
  `,
  '5': css`
    row-gap: var(--space-5);
  `,
  '6': css`
    row-gap: var(--space-6);
  `,
  '7': css`
    row-gap: var(--space-7);
  `,
  '8': css`
    row-gap: var(--space-8);
  `,
  '9': css`
    row-gap: var(--space-9);
  `,
  '10': css`
    row-gap: var(--space-10);
  `,
} as const;

export const justifyContent = {
  normal: css`
    justify-content: normal;
  `,
  center: css`
    justify-content: center;
  `,
  start: css`
    justify-content: start;
  `,
  end: css`
    justify-content: end;
  `,
  'flex-start': css`
    justify-content: flex-start;
  `,
  'flex-end': css`
    justify-content: flex-end;
  `,
  left: css`
    justify-content: left;
  `,
  right: css`
    justify-content: right;
  `,
  'space-between': css`
    justify-content: space-between;
  `,
  'space-around': css`
    justify-content: space-around;
  `,
  'space-evenly': css`
    justify-content: space-evenly;
  `,
  stretch: css`
    justify-content: stretch;
  `,
} as const;

export const alignContent = {
  normal: css`
    align-content: normal;
  `,
  center: css`
    align-content: center;
  `,
  start: css`
    align-content: start;
  `,
  end: css`
    align-content: end;
  `,
  'flex-start': css`
    align-content: flex-start;
  `,
  'flex-end': css`
    align-content: flex-end;
  `,
  'space-between': css`
    align-content: space-between;
  `,
  'space-around': css`
    align-content: space-around;
  `,
  'space-evenly': css`
    align-content: space-evenly;
  `,
  stretch: css`
    align-content: stretch;
  `,
  baseline: css`
    align-content: baseline;
  `,
  'first baseline': css`
    align-content: first baseline;
  `,
  'last baseline': css`
    align-content: last baseline;
  `,
} as const;

export const alignItems = {
  normal: css`
    align-items: normal;
  `,
  center: css`
    align-items: center;
  `,
  start: css`
    align-items: start;
  `,
  end: css`
    align-items: end;
  `,
  'flex-start': css`
    align-items: flex-start;
  `,
  'flex-end': css`
    align-items: flex-end;
  `,
  'self-start': css`
    align-items: self-start;
  `,
  'self-end': css`
    align-items: self-end;
  `,
  stretch: css`
    align-items: stretch;
  `,
  baseline: css`
    align-items: baseline;
  `,
  'first baseline': css`
    align-items: first baseline;
  `,
  'last baseline': css`
    align-items: last baseline;
  `,
} as const;

export const alignSelf = {
  auto: css`
    align-self: auto;
  `,
  normal: css`
    align-self: normal;
  `,
  center: css`
    align-self: center;
  `,
  start: css`
    align-self: start;
  `,
  end: css`
    align-self: end;
  `,
  'flex-start': css`
    align-self: flex-start;
  `,
  'flex-end': css`
    align-self: flex-end;
  `,
  'self-start': css`
    align-self: self-start;
  `,
  'self-end': css`
    align-self: self-end;
  `,
  stretch: css`
    align-self: stretch;
  `,
  baseline: css`
    align-self: baseline;
  `,
  'first baseline': css`
    align-self: first baseline;
  `,
  'last baseline': css`
    align-self: last baseline;
  `,
} as const;

export const flexDirection = {
  row: css`
    flex-direction: row;
  `,
  'row-reverse': css`
    flex-direction: row-reverse;
  `,
  column: css`
    flex-direction: column;
  `,
  'column-reverse': css`
    flex-direction: column-reverse;
  `,
} as const;

export const flexWrap = {
  nowrap: css`
    flex-wrap: nowrap;
  `,
  wrap: css`
    flex-wrap: wrap;
  `,
  'wrap-reverse': css`
    flex-wrap: wrap-reverse;
  `,
} as const;

export const position = {
  static: css`
    position: static;
  `,
  relative: css`
    position: relative;
  `,
  absolute: css`
    position: absolute;
  `,
  fixed: css`
    position: fixed;
  `,
  sticky: css`
    position: sticky;
  `,
} as const;

export const padding: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    padding-top: var(--space-0);
    padding-bottom: var(--space-0);
    padding-inline-start: var(--space-0);
    padding-inline-end: var(--space-0);
  `,
  '0.25': css`
    padding-top: var(--space-0_25);
    padding-bottom: var(--space-0_25);
    padding-inline-start: var(--space-0_25);
    padding-inline-end: var(--space-0_25);
  `,
  '0.5': css`
    padding-top: var(--space-0_5);
    padding-bottom: var(--space-0_5);
    padding-inline-start: var(--space-0_5);
    padding-inline-end: var(--space-0_5);
  `,
  '0.75': css`
    padding-top: var(--space-0_75);
    padding-bottom: var(--space-0_75);
    padding-inline-start: var(--space-0_75);
    padding-inline-end: var(--space-0_75);
  `,
  '1': css`
    padding-top: var(--space-1);
    padding-bottom: var(--space-1);
    padding-inline-start: var(--space-1);
    padding-inline-end: var(--space-1);
  `,
  '1.5': css`
    padding-top: var(--space-1_5);
    padding-bottom: var(--space-1_5);
    padding-inline-start: var(--space-1_5);
    padding-inline-end: var(--space-1_5);
  `,
  '2': css`
    padding-top: var(--space-2);
    padding-bottom: var(--space-2);
    padding-inline-start: var(--space-2);
    padding-inline-end: var(--space-2);
  `,
  '3': css`
    padding-top: var(--space-3);
    padding-bottom: var(--space-3);
    padding-inline-start: var(--space-3);
    padding-inline-end: var(--space-3);
  `,
  '4': css`
    padding-top: var(--space-4);
    padding-bottom: var(--space-4);
    padding-inline-start: var(--space-4);
    padding-inline-end: var(--space-4);
  `,
  '5': css`
    padding-top: var(--space-5);
    padding-bottom: var(--space-5);
    padding-inline-start: var(--space-5);
    padding-inline-end: var(--space-5);
  `,
  '6': css`
    padding-top: var(--space-6);
    padding-bottom: var(--space-6);
    padding-inline-start: var(--space-6);
    padding-inline-end: var(--space-6);
  `,
  '7': css`
    padding-top: var(--space-7);
    padding-bottom: var(--space-7);
    padding-inline-start: var(--space-7);
    padding-inline-end: var(--space-7);
  `,
  '8': css`
    padding-top: var(--space-8);
    padding-bottom: var(--space-8);
    padding-inline-start: var(--space-8);
    padding-inline-end: var(--space-8);
  `,
  '9': css`
    padding-top: var(--space-9);
    padding-bottom: var(--space-9);
    padding-inline-start: var(--space-9);
    padding-inline-end: var(--space-9);
  `,
  '10': css`
    padding-top: var(--space-10);
    padding-bottom: var(--space-10);
    padding-inline-start: var(--space-10);
    padding-inline-end: var(--space-10);
  `,
} as const;

export const paddingX: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    padding-inline-start: var(--space-0);
    padding-inline-end: var(--space-0);
  `,
  '0.25': css`
    padding-inline-start: var(--space-0_25);
    padding-inline-end: var(--space-0_25);
  `,
  '0.5': css`
    padding-inline-start: var(--space-0_5);
    padding-inline-end: var(--space-0_5);
  `,
  '0.75': css`
    padding-inline-start: var(--space-0_75);
    padding-inline-end: var(--space-0_75);
  `,
  '1': css`
    padding-inline-start: var(--space-1);
    padding-inline-end: var(--space-1);
  `,
  '1.5': css`
    padding-inline-start: var(--space-1_5);
    padding-inline-end: var(--space-1_5);
  `,
  '2': css`
    padding-inline-start: var(--space-2);
    padding-inline-end: var(--space-2);
  `,
  '3': css`
    padding-inline-start: var(--space-3);
    padding-inline-end: var(--space-3);
  `,
  '4': css`
    padding-inline-start: var(--space-4);
    padding-inline-end: var(--space-4);
  `,
  '5': css`
    padding-inline-start: var(--space-5);
    padding-inline-end: var(--space-5);
  `,
  '6': css`
    padding-inline-start: var(--space-6);
    padding-inline-end: var(--space-6);
  `,
  '7': css`
    padding-inline-start: var(--space-7);
    padding-inline-end: var(--space-7);
  `,
  '8': css`
    padding-inline-start: var(--space-8);
    padding-inline-end: var(--space-8);
  `,
  '9': css`
    padding-inline-start: var(--space-9);
    padding-inline-end: var(--space-9);
  `,
  '10': css`
    padding-inline-start: var(--space-10);
    padding-inline-end: var(--space-10);
  `,
} as const;

export const paddingY: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    padding-top: var(--space-0);
    padding-bottom: var(--space-0);
  `,
  '0.25': css`
    padding-top: var(--space-0_25);
    padding-bottom: var(--space-0_25);
  `,
  '0.5': css`
    padding-top: var(--space-0_5);
    padding-bottom: var(--space-0_5);
  `,
  '0.75': css`
    padding-top: var(--space-0_75);
    padding-bottom: var(--space-0_75);
  `,
  '1': css`
    padding-top: var(--space-1);
    padding-bottom: var(--space-1);
  `,
  '1.5': css`
    padding-top: var(--space-1_5);
    padding-bottom: var(--space-1_5);
  `,
  '2': css`
    padding-top: var(--space-2);
    padding-bottom: var(--space-2);
  `,
  '3': css`
    padding-top: var(--space-3);
    padding-bottom: var(--space-3);
  `,
  '4': css`
    padding-top: var(--space-4);
    padding-bottom: var(--space-4);
  `,
  '5': css`
    padding-top: var(--space-5);
    padding-bottom: var(--space-5);
  `,
  '6': css`
    padding-top: var(--space-6);
    padding-bottom: var(--space-6);
  `,
  '7': css`
    padding-top: var(--space-7);
    padding-bottom: var(--space-7);
  `,
  '8': css`
    padding-top: var(--space-8);
    padding-bottom: var(--space-8);
  `,
  '9': css`
    padding-top: var(--space-9);
    padding-bottom: var(--space-9);
  `,
  '10': css`
    padding-top: var(--space-10);
    padding-bottom: var(--space-10);
  `,
} as const;

export const paddingTop: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    padding-top: var(--space-0);
  `,
  '0.25': css`
    padding-top: var(--space-0_25);
  `,
  '0.5': css`
    padding-top: var(--space-0_5);
  `,
  '0.75': css`
    padding-top: var(--space-0_75);
  `,
  '1': css`
    padding-top: var(--space-1);
  `,
  '1.5': css`
    padding-top: var(--space-1_5);
  `,
  '2': css`
    padding-top: var(--space-2);
  `,
  '3': css`
    padding-top: var(--space-3);
  `,
  '4': css`
    padding-top: var(--space-4);
  `,
  '5': css`
    padding-top: var(--space-5);
  `,
  '6': css`
    padding-top: var(--space-6);
  `,
  '7': css`
    padding-top: var(--space-7);
  `,
  '8': css`
    padding-top: var(--space-8);
  `,
  '9': css`
    padding-top: var(--space-9);
  `,
  '10': css`
    padding-top: var(--space-10);
  `,
} as const;

export const paddingBottom: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    padding-bottom: var(--space-0);
  `,
  '0.25': css`
    padding-bottom: var(--space-0_25);
  `,
  '0.5': css`
    padding-bottom: var(--space-0_5);
  `,
  '0.75': css`
    padding-bottom: var(--space-0_75);
  `,
  '1': css`
    padding-bottom: var(--space-1);
  `,
  '1.5': css`
    padding-bottom: var(--space-1_5);
  `,
  '2': css`
    padding-bottom: var(--space-2);
  `,
  '3': css`
    padding-bottom: var(--space-3);
  `,
  '4': css`
    padding-bottom: var(--space-4);
  `,
  '5': css`
    padding-bottom: var(--space-5);
  `,
  '6': css`
    padding-bottom: var(--space-6);
  `,
  '7': css`
    padding-bottom: var(--space-7);
  `,
  '8': css`
    padding-bottom: var(--space-8);
  `,
  '9': css`
    padding-bottom: var(--space-9);
  `,
  '10': css`
    padding-bottom: var(--space-10);
  `,
} as const;

export const paddingStart: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    padding-inline-start: var(--space-0);
  `,
  '0.25': css`
    padding-inline-start: var(--space-0_25);
  `,
  '0.5': css`
    padding-inline-start: var(--space-0_5);
  `,
  '0.75': css`
    padding-inline-start: var(--space-0_75);
  `,
  '1': css`
    padding-inline-start: var(--space-1);
  `,
  '1.5': css`
    padding-inline-start: var(--space-1_5);
  `,
  '2': css`
    padding-inline-start: var(--space-2);
  `,
  '3': css`
    padding-inline-start: var(--space-3);
  `,
  '4': css`
    padding-inline-start: var(--space-4);
  `,
  '5': css`
    padding-inline-start: var(--space-5);
  `,
  '6': css`
    padding-inline-start: var(--space-6);
  `,
  '7': css`
    padding-inline-start: var(--space-7);
  `,
  '8': css`
    padding-inline-start: var(--space-8);
  `,
  '9': css`
    padding-inline-start: var(--space-9);
  `,
  '10': css`
    padding-inline-start: var(--space-10);
  `,
} as const;

export const paddingEnd: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    padding-inline-end: var(--space-0);
  `,
  '0.25': css`
    padding-inline-end: var(--space-0_25);
  `,
  '0.5': css`
    padding-inline-end: var(--space-0_5);
  `,
  '0.75': css`
    padding-inline-end: var(--space-0_75);
  `,
  '1': css`
    padding-inline-end: var(--space-1);
  `,
  '1.5': css`
    padding-inline-end: var(--space-1_5);
  `,
  '2': css`
    padding-inline-end: var(--space-2);
  `,
  '3': css`
    padding-inline-end: var(--space-3);
  `,
  '4': css`
    padding-inline-end: var(--space-4);
  `,
  '5': css`
    padding-inline-end: var(--space-5);
  `,
  '6': css`
    padding-inline-end: var(--space-6);
  `,
  '7': css`
    padding-inline-end: var(--space-7);
  `,
  '8': css`
    padding-inline-end: var(--space-8);
  `,
  '9': css`
    padding-inline-end: var(--space-9);
  `,
  '10': css`
    padding-inline-end: var(--space-10);
  `,
} as const;

export const margin: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    margin-top: calc(-1 * var(--space-0));
    margin-bottom: calc(-1 * var(--space-0));
    margin-inline-end: calc(-1 * var(--space-0));
    margin-inline-start: calc(-1 * var(--space-0));
  `,
  '-0.25': css`
    margin-top: calc(-1 * var(--space-0_25));
    margin-bottom: calc(-1 * var(--space-0_25));
    margin-inline-end: calc(-1 * var(--space-0_25));
    margin-inline-start: calc(-1 * var(--space-0_25));
  `,
  '-0.5': css`
    margin-top: calc(-1 * var(--space-0_5));
    margin-bottom: calc(-1 * var(--space-0_5));
    margin-inline-end: calc(-1 * var(--space-0_5));
    margin-inline-start: calc(-1 * var(--space-0_5));
  `,
  '-0.75': css`
    margin-top: calc(-1 * var(--space-0_75));
    margin-bottom: calc(-1 * var(--space-0_75));
    margin-inline-end: calc(-1 * var(--space-0_75));
    margin-inline-start: calc(-1 * var(--space-0_75));
  `,
  '-1': css`
    margin-top: calc(-1 * var(--space-1));
    margin-bottom: calc(-1 * var(--space-1));
    margin-inline-end: calc(-1 * var(--space-1));
    margin-inline-start: calc(-1 * var(--space-1));
  `,
  '-1.5': css`
    margin-top: calc(-1 * var(--space-1_5));
    margin-bottom: calc(-1 * var(--space-1_5));
    margin-inline-end: calc(-1 * var(--space-1_5));
    margin-inline-start: calc(-1 * var(--space-1_5));
  `,
  '-2': css`
    margin-top: calc(-1 * var(--space-2));
    margin-bottom: calc(-1 * var(--space-2));
    margin-inline-end: calc(-1 * var(--space-2));
    margin-inline-start: calc(-1 * var(--space-2));
  `,
  '-3': css`
    margin-top: calc(-1 * var(--space-3));
    margin-bottom: calc(-1 * var(--space-3));
    margin-inline-end: calc(-1 * var(--space-3));
    margin-inline-start: calc(-1 * var(--space-3));
  `,
  '-4': css`
    margin-top: calc(-1 * var(--space-4));
    margin-bottom: calc(-1 * var(--space-4));
    margin-inline-end: calc(-1 * var(--space-4));
    margin-inline-start: calc(-1 * var(--space-4));
  `,
  '-5': css`
    margin-top: calc(-1 * var(--space-5));
    margin-bottom: calc(-1 * var(--space-5));
    margin-inline-end: calc(-1 * var(--space-5));
    margin-inline-start: calc(-1 * var(--space-5));
  `,
  '-6': css`
    margin-top: calc(-1 * var(--space-6));
    margin-bottom: calc(-1 * var(--space-6));
    margin-inline-end: calc(-1 * var(--space-6));
    margin-inline-start: calc(-1 * var(--space-6));
  `,
  '-7': css`
    margin-top: calc(-1 * var(--space-7));
    margin-bottom: calc(-1 * var(--space-7));
    margin-inline-end: calc(-1 * var(--space-7));
    margin-inline-start: calc(-1 * var(--space-7));
  `,
  '-8': css`
    margin-top: calc(-1 * var(--space-8));
    margin-bottom: calc(-1 * var(--space-8));
    margin-inline-end: calc(-1 * var(--space-8));
    margin-inline-start: calc(-1 * var(--space-8));
  `,
  '-9': css`
    margin-top: calc(-1 * var(--space-9));
    margin-bottom: calc(-1 * var(--space-9));
    margin-inline-end: calc(-1 * var(--space-9));
    margin-inline-start: calc(-1 * var(--space-9));
  `,
  '-10': css`
    margin-top: calc(-1 * var(--space-10));
    margin-bottom: calc(-1 * var(--space-10));
    margin-inline-end: calc(-1 * var(--space-10));
    margin-inline-start: calc(-1 * var(--space-10));
  `,
} as const;

export const marginX: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    margin-inline-end: calc(-1 * var(--space-0));
    margin-inline-start: calc(-1 * var(--space-0));
  `,
  '-0.25': css`
    margin-inline-end: calc(-1 * var(--space-0_25));
    margin-inline-start: calc(-1 * var(--space-0_25));
  `,
  '-0.5': css`
    margin-inline-end: calc(-1 * var(--space-0_5));
    margin-inline-start: calc(-1 * var(--space-0_5));
  `,
  '-0.75': css`
    margin-inline-end: calc(-1 * var(--space-0_75));
    margin-inline-start: calc(-1 * var(--space-0_75));
  `,
  '-1': css`
    margin-inline-end: calc(-1 * var(--space-1));
    margin-inline-start: calc(-1 * var(--space-1));
  `,
  '-1.5': css`
    margin-inline-end: calc(-1 * var(--space-1_5));
    margin-inline-start: calc(-1 * var(--space-1_5));
  `,
  '-2': css`
    margin-inline-end: calc(-1 * var(--space-2));
    margin-inline-start: calc(-1 * var(--space-2));
  `,
  '-3': css`
    margin-inline-end: calc(-1 * var(--space-3));
    margin-inline-start: calc(-1 * var(--space-3));
  `,
  '-4': css`
    margin-inline-end: calc(-1 * var(--space-4));
    margin-inline-start: calc(-1 * var(--space-4));
  `,
  '-5': css`
    margin-inline-end: calc(-1 * var(--space-5));
    margin-inline-start: calc(-1 * var(--space-5));
  `,
  '-6': css`
    margin-inline-end: calc(-1 * var(--space-6));
    margin-inline-start: calc(-1 * var(--space-6));
  `,
  '-7': css`
    margin-inline-end: calc(-1 * var(--space-7));
    margin-inline-start: calc(-1 * var(--space-7));
  `,
  '-8': css`
    margin-inline-end: calc(-1 * var(--space-8));
    margin-inline-start: calc(-1 * var(--space-8));
  `,
  '-9': css`
    margin-inline-end: calc(-1 * var(--space-9));
    margin-inline-start: calc(-1 * var(--space-9));
  `,
  '-10': css`
    margin-inline-end: calc(-1 * var(--space-10));
    margin-inline-start: calc(-1 * var(--space-10));
  `,
} as const;

export const marginY: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    margin-top: calc(-1 * var(--space-0));
    margin-bottom: calc(-1 * var(--space-0));
  `,
  '-0.25': css`
    margin-top: calc(-1 * var(--space-0_25));
    margin-bottom: calc(-1 * var(--space-0_25));
  `,
  '-0.5': css`
    margin-top: calc(-1 * var(--space-0_5));
    margin-bottom: calc(-1 * var(--space-0_5));
  `,
  '-0.75': css`
    margin-top: calc(-1 * var(--space-0_75));
    margin-bottom: calc(-1 * var(--space-0_75));
  `,
  '-1': css`
    margin-top: calc(-1 * var(--space-1));
    margin-bottom: calc(-1 * var(--space-1));
  `,
  '-1.5': css`
    margin-top: calc(-1 * var(--space-1_5));
    margin-bottom: calc(-1 * var(--space-1_5));
  `,
  '-2': css`
    margin-top: calc(-1 * var(--space-2));
    margin-bottom: calc(-1 * var(--space-2));
  `,
  '-3': css`
    margin-top: calc(-1 * var(--space-3));
    margin-bottom: calc(-1 * var(--space-3));
  `,
  '-4': css`
    margin-top: calc(-1 * var(--space-4));
    margin-bottom: calc(-1 * var(--space-4));
  `,
  '-5': css`
    margin-top: calc(-1 * var(--space-5));
    margin-bottom: calc(-1 * var(--space-5));
  `,
  '-6': css`
    margin-top: calc(-1 * var(--space-6));
    margin-bottom: calc(-1 * var(--space-6));
  `,
  '-7': css`
    margin-top: calc(-1 * var(--space-7));
    margin-bottom: calc(-1 * var(--space-7));
  `,
  '-8': css`
    margin-top: calc(-1 * var(--space-8));
    margin-bottom: calc(-1 * var(--space-8));
  `,
  '-9': css`
    margin-top: calc(-1 * var(--space-9));
    margin-bottom: calc(-1 * var(--space-9));
  `,
  '-10': css`
    margin-top: calc(-1 * var(--space-10));
    margin-bottom: calc(-1 * var(--space-10));
  `,
} as const;

export const marginTop: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    margin-top: calc(-1 * var(--space-0));
  `,
  '-0.25': css`
    margin-top: calc(-1 * var(--space-0_25));
  `,
  '-0.5': css`
    margin-top: calc(-1 * var(--space-0_5));
  `,
  '-0.75': css`
    margin-top: calc(-1 * var(--space-0_75));
  `,
  '-1': css`
    margin-top: calc(-1 * var(--space-1));
  `,
  '-1.5': css`
    margin-top: calc(-1 * var(--space-1_5));
  `,
  '-2': css`
    margin-top: calc(-1 * var(--space-2));
  `,
  '-3': css`
    margin-top: calc(-1 * var(--space-3));
  `,
  '-4': css`
    margin-top: calc(-1 * var(--space-4));
  `,
  '-5': css`
    margin-top: calc(-1 * var(--space-5));
  `,
  '-6': css`
    margin-top: calc(-1 * var(--space-6));
  `,
  '-7': css`
    margin-top: calc(-1 * var(--space-7));
  `,
  '-8': css`
    margin-top: calc(-1 * var(--space-8));
  `,
  '-9': css`
    margin-top: calc(-1 * var(--space-9));
  `,
  '-10': css`
    margin-top: calc(-1 * var(--space-10));
  `,
} as const;

export const marginBottom: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    margin-bottom: calc(-1 * var(--space-0));
  `,
  '-0.25': css`
    margin-bottom: calc(-1 * var(--space-0_25));
  `,
  '-0.5': css`
    margin-bottom: calc(-1 * var(--space-0_5));
  `,
  '-0.75': css`
    margin-bottom: calc(-1 * var(--space-0_75));
  `,
  '-1': css`
    margin-bottom: calc(-1 * var(--space-1));
  `,
  '-1.5': css`
    margin-bottom: calc(-1 * var(--space-1_5));
  `,
  '-2': css`
    margin-bottom: calc(-1 * var(--space-2));
  `,
  '-3': css`
    margin-bottom: calc(-1 * var(--space-3));
  `,
  '-4': css`
    margin-bottom: calc(-1 * var(--space-4));
  `,
  '-5': css`
    margin-bottom: calc(-1 * var(--space-5));
  `,
  '-6': css`
    margin-bottom: calc(-1 * var(--space-6));
  `,
  '-7': css`
    margin-bottom: calc(-1 * var(--space-7));
  `,
  '-8': css`
    margin-bottom: calc(-1 * var(--space-8));
  `,
  '-9': css`
    margin-bottom: calc(-1 * var(--space-9));
  `,
  '-10': css`
    margin-bottom: calc(-1 * var(--space-10));
  `,
} as const;

export const marginEnd: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    margin-inline-end: calc(-1 * var(--space-0));
  `,
  '-0.25': css`
    margin-inline-end: calc(-1 * var(--space-0_25));
  `,
  '-0.5': css`
    margin-inline-end: calc(-1 * var(--space-0_5));
  `,
  '-0.75': css`
    margin-inline-end: calc(-1 * var(--space-0_75));
  `,
  '-1': css`
    margin-inline-end: calc(-1 * var(--space-1));
  `,
  '-1.5': css`
    margin-inline-end: calc(-1 * var(--space-1_5));
  `,
  '-2': css`
    margin-inline-end: calc(-1 * var(--space-2));
  `,
  '-3': css`
    margin-inline-end: calc(-1 * var(--space-3));
  `,
  '-4': css`
    margin-inline-end: calc(-1 * var(--space-4));
  `,
  '-5': css`
    margin-inline-end: calc(-1 * var(--space-5));
  `,
  '-6': css`
    margin-inline-end: calc(-1 * var(--space-6));
  `,
  '-7': css`
    margin-inline-end: calc(-1 * var(--space-7));
  `,
  '-8': css`
    margin-inline-end: calc(-1 * var(--space-8));
  `,
  '-9': css`
    margin-inline-end: calc(-1 * var(--space-9));
  `,
  '-10': css`
    margin-inline-end: calc(-1 * var(--space-10));
  `,
} as const;

export const marginStart: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    margin-inline-start: calc(-1 * var(--space-0));
  `,
  '-0.25': css`
    margin-inline-start: calc(-1 * var(--space-0_25));
  `,
  '-0.5': css`
    margin-inline-start: calc(-1 * var(--space-0_5));
  `,
  '-0.75': css`
    margin-inline-start: calc(-1 * var(--space-0_75));
  `,
  '-1': css`
    margin-inline-start: calc(-1 * var(--space-1));
  `,
  '-1.5': css`
    margin-inline-start: calc(-1 * var(--space-1_5));
  `,
  '-2': css`
    margin-inline-start: calc(-1 * var(--space-2));
  `,
  '-3': css`
    margin-inline-start: calc(-1 * var(--space-3));
  `,
  '-4': css`
    margin-inline-start: calc(-1 * var(--space-4));
  `,
  '-5': css`
    margin-inline-start: calc(-1 * var(--space-5));
  `,
  '-6': css`
    margin-inline-start: calc(-1 * var(--space-6));
  `,
  '-7': css`
    margin-inline-start: calc(-1 * var(--space-7));
  `,
  '-8': css`
    margin-inline-start: calc(-1 * var(--space-8));
  `,
  '-9': css`
    margin-inline-start: calc(-1 * var(--space-9));
  `,
  '-10': css`
    margin-inline-start: calc(-1 * var(--space-10));
  `,
} as const;

export const textAlign = {
  start: css`
    text-align: start;
  `,
  end: css`
    text-align: end;
  `,
  center: css`
    text-align: center;
  `,
  justify: css`
    text-align: justify;
  `,
} as const;

export const visibility = {
  hidden: css`
    visibility: hidden;
  `,
  visible: css`
    visibility: visible;
  `,
} as const;
