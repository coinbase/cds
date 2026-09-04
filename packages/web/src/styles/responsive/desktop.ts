/**
 * These styles are used to power the component StyleProps API.
 */

/* eslint-disable no-restricted-syntax */

import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { css, type LinariaClassName } from '@linaria/core';

import { media } from '../media';
import type { DynamicStyleProps } from '../styleProps';

/**
 * Classnames for dynamic style props. Dynamic style props are style props whose
 * values cannot be known at build time, such as width and height. The values for
 * these style props are set via CSS Variables in the inline styles.
 */
export const dynamic: Record<keyof DynamicStyleProps, LinariaClassName> = {
  width: css`
    @media ${media.desktop} {
      width: var(--desktop-width);
    }
  `,
  height: css`
    @media ${media.desktop} {
      height: var(--desktop-height);
    }
  `,
  minWidth: css`
    @media ${media.desktop} {
      min-width: var(--desktop-minWidth);
    }
  `,
  minHeight: css`
    @media ${media.desktop} {
      min-height: var(--desktop-minHeight);
    }
  `,
  maxWidth: css`
    @media ${media.desktop} {
      max-width: var(--desktop-maxWidth);
    }
  `,
  maxHeight: css`
    @media ${media.desktop} {
      max-height: var(--desktop-maxHeight);
    }
  `,
  aspectRatio: css`
    @media ${media.desktop} {
      aspect-ratio: var(--desktop-aspectRatio);
    }
  `,
  top: css`
    @media ${media.desktop} {
      top: var(--desktop-top);
    }
  `,
  bottom: css`
    @media ${media.desktop} {
      bottom: var(--desktop-bottom);
    }
  `,
  left: css`
    @media ${media.desktop} {
      left: var(--desktop-left);
    }
  `,
  right: css`
    @media ${media.desktop} {
      right: var(--desktop-right);
    }
  `,
  transform: css`
    @media ${media.desktop} {
      transform: var(--desktop-transform);
    }
  `,
  flexBasis: css`
    @media ${media.desktop} {
      flex-basis: var(--desktop-flexBasis);
    }
  `,
  flexShrink: css`
    @media ${media.desktop} {
      flex-shrink: var(--desktop-flexShrink);
    }
  `,
  flexGrow: css`
    @media ${media.desktop} {
      flex-grow: var(--desktop-flexGrow);
    }
  `,
  gridTemplateColumns: css`
    @media ${media.desktop} {
      grid-template-columns: var(--desktop-gridTemplateColumns);
    }
  `,
  gridTemplateRows: css`
    @media ${media.desktop} {
      grid-template-rows: var(--desktop-gridTemplateRows);
    }
  `,
  gridTemplateAreas: css`
    @media ${media.desktop} {
      grid-template-areas: var(--desktop-gridTemplateAreas);
    }
  `,
  gridTemplate: css`
    @media ${media.desktop} {
      grid-template: var(--desktop-gridTemplate);
    }
  `,
  gridAutoColumns: css`
    @media ${media.desktop} {
      grid-auto-columns: var(--desktop-gridAutoColumns);
    }
  `,
  gridAutoRows: css`
    @media ${media.desktop} {
      grid-auto-rows: var(--desktop-gridAutoRows);
    }
  `,
  gridAutoFlow: css`
    @media ${media.desktop} {
      grid-auto-flow: var(--desktop-gridAutoFlow);
    }
  `,
  grid: css`
    @media ${media.desktop} {
      grid: var(--desktop-grid);
    }
  `,
  gridRowStart: css`
    @media ${media.desktop} {
      grid-row-start: var(--desktop-gridRowStart);
    }
  `,
  gridColumnStart: css`
    @media ${media.desktop} {
      grid-column-start: var(--desktop-gridColumnStart);
    }
  `,
  gridRowEnd: css`
    @media ${media.desktop} {
      grid-row-end: var(--desktop-gridRowEnd);
    }
  `,
  gridColumnEnd: css`
    @media ${media.desktop} {
      grid-column-end: var(--desktop-gridColumnEnd);
    }
  `,
  gridRow: css`
    @media ${media.desktop} {
      grid-row: var(--desktop-gridRow);
    }
  `,
  gridColumn: css`
    @media ${media.desktop} {
      grid-column: var(--desktop-gridColumn);
    }
  `,
  gridArea: css`
    @media ${media.desktop} {
      grid-area: var(--desktop-gridArea);
    }
  `,
  opacity: css`
    @media ${media.desktop} {
      opacity: var(--desktop-opacity);
    }
  `,
  zIndex: css`
    @media ${media.desktop} {
      z-index: var(--desktop-zIndex);
    }
  `,
} as const;

export const elevation: Record<ThemeVars.Elevation, LinariaClassName> = {
  '0': css``,
  '1': css`
    @media ${media.desktop} {
      background-color: var(--color-bgElevation1);
      box-shadow: var(--shadow-elevation1);
    }
  `,
  '2': css`
    @media ${media.desktop} {
      background-color: var(--color-bgElevation2);
      box-shadow: var(--shadow-elevation2);
    }
  `,
} as const;

export const color: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  fg: css`
    @media ${media.desktop} {
      color: var(--color-fg);
    }
  `,
  fgInverse: css`
    @media ${media.desktop} {
      color: var(--color-fgInverse);
    }
  `,
  fgMuted: css`
    @media ${media.desktop} {
      color: var(--color-fgMuted);
    }
  `,
  fgPrimary: css`
    @media ${media.desktop} {
      color: var(--color-fgPrimary);
    }
  `,
  fgPositive: css`
    @media ${media.desktop} {
      color: var(--color-fgPositive);
    }
  `,
  fgNegative: css`
    @media ${media.desktop} {
      color: var(--color-fgNegative);
    }
  `,
  fgWarning: css`
    @media ${media.desktop} {
      color: var(--color-fgWarning);
    }
  `,
  // Background
  bg: css`
    @media ${media.desktop} {
      color: var(--color-bg);
    }
  `,
  bgAlternate: css`
    @media ${media.desktop} {
      color: var(--color-bgAlternate);
    }
  `,
  bgInverse: css`
    @media ${media.desktop} {
      color: var(--color-bgInverse);
    }
  `,
  bgOverlay: css`
    @media ${media.desktop} {
      color: var(--color-bgOverlay);
    }
  `,
  bgPrimary: css`
    @media ${media.desktop} {
      color: var(--color-bgPrimary);
    }
  `,
  bgPrimaryWash: css`
    @media ${media.desktop} {
      color: var(--color-bgPrimaryWash);
    }
  `,
  bgSecondary: css`
    @media ${media.desktop} {
      color: var(--color-bgSecondary);
    }
  `,
  bgTertiary: css`
    @media ${media.desktop} {
      color: var(--color-bgTertiary);
    }
  `,
  bgSecondaryWash: css`
    @media ${media.desktop} {
      color: var(--color-bgSecondaryWash);
    }
  `,
  bgNegative: css`
    @media ${media.desktop} {
      color: var(--color-bgNegative);
    }
  `,
  bgNegativeWash: css`
    @media ${media.desktop} {
      color: var(--color-bgNegativeWash);
    }
  `,
  bgPositive: css`
    @media ${media.desktop} {
      color: var(--color-bgPositive);
    }
  `,
  bgPositiveWash: css`
    @media ${media.desktop} {
      color: var(--color-bgPositiveWash);
    }
  `,
  bgWarning: css`
    @media ${media.desktop} {
      color: var(--color-bgWarning);
    }
  `,
  bgWarningWash: css`
    @media ${media.desktop} {
      color: var(--color-bgWarningWash);
    }
  `,
  currentColor: css`
    @media ${media.desktop} {
      color: var(--color-currentColor);
    }
  `,
  // Line
  bgLine: css`
    @media ${media.desktop} {
      color: var(--color-bgLine);
    }
  `,
  bgLineInverse: css`
    @media ${media.desktop} {
      color: var(--color-bgLineInverse);
    }
  `,
  bgLineHeavy: css`
    @media ${media.desktop} {
      color: var(--color-bgLineHeavy);
    }
  `,
  bgLinePrimary: css`
    @media ${media.desktop} {
      color: var(--color-bgLinePrimary);
    }
  `,
  bgLinePrimarySubtle: css`
    @media ${media.desktop} {
      color: var(--color-bgLinePrimarySubtle);
    }
  `,
  // Elevation
  bgElevation1: css`
    @media ${media.desktop} {
      color: var(--color-bgElevation1);
    }
  `,
  bgElevation2: css`
    @media ${media.desktop} {
      color: var(--color-bgElevation2);
    }
  `,
  // Accent
  accentSubtleGreen: css`
    @media ${media.desktop} {
      color: var(--color-accentSubtleGreen);
    }
  `,
  accentBoldGreen: css`
    @media ${media.desktop} {
      color: var(--color-accentBoldGreen);
    }
  `,
  accentSubtleBlue: css`
    @media ${media.desktop} {
      color: var(--color-accentSubtleBlue);
    }
  `,
  accentBoldBlue: css`
    @media ${media.desktop} {
      color: var(--color-accentBoldBlue);
    }
  `,
  accentSubtlePurple: css`
    @media ${media.desktop} {
      color: var(--color-accentSubtlePurple);
    }
  `,
  accentBoldPurple: css`
    @media ${media.desktop} {
      color: var(--color-accentBoldPurple);
    }
  `,
  accentSubtleYellow: css`
    @media ${media.desktop} {
      color: var(--color-accentSubtleYellow);
    }
  `,
  accentBoldYellow: css`
    @media ${media.desktop} {
      color: var(--color-accentBoldYellow);
    }
  `,
  accentSubtleRed: css`
    @media ${media.desktop} {
      color: var(--color-accentSubtleRed);
    }
  `,
  accentBoldRed: css`
    @media ${media.desktop} {
      color: var(--color-accentBoldRed);
    }
  `,
  accentSubtleGray: css`
    @media ${media.desktop} {
      color: var(--color-accentSubtleGray);
    }
  `,
  accentBoldGray: css`
    @media ${media.desktop} {
      color: var(--color-accentBoldGray);
    }
  `,
  transparent: css`
    @media ${media.desktop} {
      color: var(--color-transparent);
    }
  `,
} as const;

export const background: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  fg: css`
    @media ${media.desktop} {
      background-color: var(--color-fg);
    }
  `,
  fgInverse: css`
    @media ${media.desktop} {
      background-color: var(--color-fgInverse);
    }
  `,
  fgMuted: css`
    @media ${media.desktop} {
      background-color: var(--color-fgMuted);
    }
  `,
  fgPrimary: css`
    @media ${media.desktop} {
      background-color: var(--color-fgPrimary);
    }
  `,
  fgPositive: css`
    @media ${media.desktop} {
      background-color: var(--color-fgPositive);
    }
  `,
  fgNegative: css`
    @media ${media.desktop} {
      background-color: var(--color-fgNegative);
    }
  `,
  fgWarning: css`
    @media ${media.desktop} {
      background-color: var(--color-fgWarning);
    }
  `,
  // Background
  bg: css`
    @media ${media.desktop} {
      background-color: var(--color-bg);
    }
  `,
  bgAlternate: css`
    @media ${media.desktop} {
      background-color: var(--color-bgAlternate);
    }
  `,
  bgInverse: css`
    @media ${media.desktop} {
      background-color: var(--color-bgInverse);
    }
  `,
  bgOverlay: css`
    @media ${media.desktop} {
      background-color: var(--color-bgOverlay);
    }
  `,
  bgPrimary: css`
    @media ${media.desktop} {
      background-color: var(--color-bgPrimary);
    }
  `,
  bgPrimaryWash: css`
    @media ${media.desktop} {
      background-color: var(--color-bgPrimaryWash);
    }
  `,
  bgSecondary: css`
    @media ${media.desktop} {
      background-color: var(--color-bgSecondary);
    }
  `,
  bgTertiary: css`
    @media ${media.desktop} {
      background-color: var(--color-bgTertiary);
    }
  `,
  bgSecondaryWash: css`
    @media ${media.desktop} {
      background-color: var(--color-bgSecondaryWash);
    }
  `,
  bgNegative: css`
    @media ${media.desktop} {
      background-color: var(--color-bgNegative);
    }
  `,
  bgNegativeWash: css`
    @media ${media.desktop} {
      background-color: var(--color-bgNegativeWash);
    }
  `,
  bgPositive: css`
    @media ${media.desktop} {
      background-color: var(--color-bgPositive);
    }
  `,
  bgPositiveWash: css`
    @media ${media.desktop} {
      background-color: var(--color-bgPositiveWash);
    }
  `,
  bgWarning: css`
    @media ${media.desktop} {
      background-color: var(--color-bgWarning);
    }
  `,
  bgWarningWash: css`
    @media ${media.desktop} {
      background-color: var(--color-bgWarningWash);
    }
  `,
  currentColor: css`
    @media ${media.desktop} {
      background-color: var(--color-currentColor);
    }
  `,
  // Line
  bgLine: css`
    @media ${media.desktop} {
      background-color: var(--color-bgLine);
    }
  `,
  bgLineInverse: css`
    @media ${media.desktop} {
      background-color: var(--color-bgLineInverse);
    }
  `,
  bgLineHeavy: css`
    @media ${media.desktop} {
      background-color: var(--color-bgLineHeavy);
    }
  `,
  bgLinePrimary: css`
    @media ${media.desktop} {
      background-color: var(--color-bgLinePrimary);
    }
  `,
  bgLinePrimarySubtle: css`
    @media ${media.desktop} {
      background-color: var(--color-bgLinePrimarySubtle);
    }
  `,
  // Elevation
  bgElevation1: css`
    @media ${media.desktop} {
      background-color: var(--color-bgElevation1);
    }
  `,
  bgElevation2: css`
    @media ${media.desktop} {
      background-color: var(--color-bgElevation2);
    }
  `,
  // Accent
  accentSubtleGreen: css`
    @media ${media.desktop} {
      background-color: var(--color-accentSubtleGreen);
    }
  `,
  accentBoldGreen: css`
    @media ${media.desktop} {
      background-color: var(--color-accentBoldGreen);
    }
  `,
  accentSubtleBlue: css`
    @media ${media.desktop} {
      background-color: var(--color-accentSubtleBlue);
    }
  `,
  accentBoldBlue: css`
    @media ${media.desktop} {
      background-color: var(--color-accentBoldBlue);
    }
  `,
  accentSubtlePurple: css`
    @media ${media.desktop} {
      background-color: var(--color-accentSubtlePurple);
    }
  `,
  accentBoldPurple: css`
    @media ${media.desktop} {
      background-color: var(--color-accentBoldPurple);
    }
  `,
  accentSubtleYellow: css`
    @media ${media.desktop} {
      background-color: var(--color-accentSubtleYellow);
    }
  `,
  accentBoldYellow: css`
    @media ${media.desktop} {
      background-color: var(--color-accentBoldYellow);
    }
  `,
  accentSubtleRed: css`
    @media ${media.desktop} {
      background-color: var(--color-accentSubtleRed);
    }
  `,
  accentBoldRed: css`
    @media ${media.desktop} {
      background-color: var(--color-accentBoldRed);
    }
  `,
  accentSubtleGray: css`
    @media ${media.desktop} {
      background-color: var(--color-accentSubtleGray);
    }
  `,
  accentBoldGray: css`
    @media ${media.desktop} {
      background-color: var(--color-accentBoldGray);
    }
  `,
  transparent: css`
    @media ${media.desktop} {
      background-color: var(--color-transparent);
    }
  `,
} as const;

export const borderColor: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  fg: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-fg);
    }
  `,
  fgInverse: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-fgInverse);
    }
  `,
  fgMuted: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-fgMuted);
    }
  `,
  fgPrimary: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-fgPrimary);
    }
  `,
  fgPositive: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-fgPositive);
    }
  `,
  fgNegative: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-fgNegative);
    }
  `,
  fgWarning: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-fgWarning);
    }
  `,
  // Background
  bg: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-bg);
    }
  `,
  bgAlternate: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-bgAlternate);
    }
  `,
  bgInverse: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-bgInverse);
    }
  `,
  bgOverlay: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-bgOverlay);
    }
  `,
  bgPrimary: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-bgPrimary);
    }
  `,
  bgPrimaryWash: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-bgPrimaryWash);
    }
  `,
  bgSecondary: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-bgSecondary);
    }
  `,
  bgTertiary: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-bgTertiary);
    }
  `,
  bgSecondaryWash: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-bgSecondaryWash);
    }
  `,
  bgNegative: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-bgNegative);
    }
  `,
  bgNegativeWash: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-bgNegativeWash);
    }
  `,
  bgPositive: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-bgPositive);
    }
  `,
  bgPositiveWash: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-bgPositiveWash);
    }
  `,
  bgWarning: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-bgWarning);
    }
  `,
  bgWarningWash: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-bgWarningWash);
    }
  `,
  currentColor: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-currentColor);
    }
  `,
  // Line
  bgLine: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-bgLine);
    }
  `,
  bgLineInverse: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-bgLineInverse);
    }
  `,
  bgLineHeavy: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-bgLineHeavy);
    }
  `,
  bgLinePrimary: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-bgLinePrimary);
    }
  `,
  bgLinePrimarySubtle: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-bgLinePrimarySubtle);
    }
  `,
  // Elevation
  bgElevation1: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-bgElevation1);
    }
  `,
  bgElevation2: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-bgElevation2);
    }
  `,
  // Accent
  accentSubtleGreen: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-accentSubtleGreen);
    }
  `,
  accentBoldGreen: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-accentBoldGreen);
    }
  `,
  accentSubtleBlue: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-accentSubtleBlue);
    }
  `,
  accentBoldBlue: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-accentBoldBlue);
    }
  `,
  accentSubtlePurple: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-accentSubtlePurple);
    }
  `,
  accentBoldPurple: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-accentBoldPurple);
    }
  `,
  accentSubtleYellow: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-accentSubtleYellow);
    }
  `,
  accentBoldYellow: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-accentBoldYellow);
    }
  `,
  accentSubtleRed: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-accentSubtleRed);
    }
  `,
  accentBoldRed: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-accentBoldRed);
    }
  `,
  accentSubtleGray: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-accentSubtleGray);
    }
  `,
  accentBoldGray: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-accentBoldGray);
    }
  `,
  transparent: css`
    @media ${media.desktop} {
      border-style: solid;
      border-color: var(--color-transparent);
    }
  `,
} as const;

export const borderWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      border-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media ${media.desktop} {
      border-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media ${media.desktop} {
      border-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media ${media.desktop} {
      border-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media ${media.desktop} {
      border-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media ${media.desktop} {
      border-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderTopWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      border-top-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media ${media.desktop} {
      border-top-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media ${media.desktop} {
      border-top-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media ${media.desktop} {
      border-top-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media ${media.desktop} {
      border-top-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media ${media.desktop} {
      border-top-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderEndWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      border-inline-end-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media ${media.desktop} {
      border-inline-end-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media ${media.desktop} {
      border-inline-end-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media ${media.desktop} {
      border-inline-end-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media ${media.desktop} {
      border-inline-end-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media ${media.desktop} {
      border-inline-end-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderBottomWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      border-bottom-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media ${media.desktop} {
      border-bottom-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media ${media.desktop} {
      border-bottom-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media ${media.desktop} {
      border-bottom-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media ${media.desktop} {
      border-bottom-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media ${media.desktop} {
      border-bottom-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderStartWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      border-inline-start-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media ${media.desktop} {
      border-inline-start-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media ${media.desktop} {
      border-inline-start-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media ${media.desktop} {
      border-inline-start-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media ${media.desktop} {
      border-inline-start-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media ${media.desktop} {
      border-inline-start-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      border-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media ${media.desktop} {
      border-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media ${media.desktop} {
      border-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media ${media.desktop} {
      border-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media ${media.desktop} {
      border-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media ${media.desktop} {
      border-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media ${media.desktop} {
      border-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media ${media.desktop} {
      border-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media ${media.desktop} {
      border-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media ${media.desktop} {
      border-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media ${media.desktop} {
      border-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const borderTopLeftRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      border-top-left-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media ${media.desktop} {
      border-top-left-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media ${media.desktop} {
      border-top-left-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media ${media.desktop} {
      border-top-left-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media ${media.desktop} {
      border-top-left-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media ${media.desktop} {
      border-top-left-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media ${media.desktop} {
      border-top-left-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media ${media.desktop} {
      border-top-left-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media ${media.desktop} {
      border-top-left-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media ${media.desktop} {
      border-top-left-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media ${media.desktop} {
      border-top-left-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const borderTopRightRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      border-top-right-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media ${media.desktop} {
      border-top-right-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media ${media.desktop} {
      border-top-right-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media ${media.desktop} {
      border-top-right-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media ${media.desktop} {
      border-top-right-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media ${media.desktop} {
      border-top-right-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media ${media.desktop} {
      border-top-right-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media ${media.desktop} {
      border-top-right-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media ${media.desktop} {
      border-top-right-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media ${media.desktop} {
      border-top-right-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media ${media.desktop} {
      border-top-right-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const borderBottomLeftRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      border-bottom-left-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media ${media.desktop} {
      border-bottom-left-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media ${media.desktop} {
      border-bottom-left-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media ${media.desktop} {
      border-bottom-left-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media ${media.desktop} {
      border-bottom-left-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media ${media.desktop} {
      border-bottom-left-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media ${media.desktop} {
      border-bottom-left-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media ${media.desktop} {
      border-bottom-left-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media ${media.desktop} {
      border-bottom-left-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media ${media.desktop} {
      border-bottom-left-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media ${media.desktop} {
      border-bottom-left-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const borderBottomRightRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      border-bottom-right-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media ${media.desktop} {
      border-bottom-right-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media ${media.desktop} {
      border-bottom-right-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media ${media.desktop} {
      border-bottom-right-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media ${media.desktop} {
      border-bottom-right-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media ${media.desktop} {
      border-bottom-right-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media ${media.desktop} {
      border-bottom-right-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media ${media.desktop} {
      border-bottom-right-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media ${media.desktop} {
      border-bottom-right-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media ${media.desktop} {
      border-bottom-right-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media ${media.desktop} {
      border-bottom-right-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const fontFamily: Record<ThemeVars.FontFamily | 'inherit', LinariaClassName> = {
  inherit: css`
    @media ${media.desktop} {
      font-family: inherit;
    }
  `,
  display1: css`
    @media ${media.desktop} {
      font-family: var(--fontFamily-display1);
    }
  `,
  display2: css`
    @media ${media.desktop} {
      font-family: var(--fontFamily-display2);
    }
  `,
  display3: css`
    @media ${media.desktop} {
      font-family: var(--fontFamily-display3);
    }
  `,
  title1: css`
    @media ${media.desktop} {
      font-family: var(--fontFamily-title1);
    }
  `,
  title2: css`
    @media ${media.desktop} {
      font-family: var(--fontFamily-title2);
    }
  `,
  title3: css`
    @media ${media.desktop} {
      font-family: var(--fontFamily-title3);
    }
  `,
  title4: css`
    @media ${media.desktop} {
      font-family: var(--fontFamily-title4);
    }
  `,
  headline: css`
    @media ${media.desktop} {
      font-family: var(--fontFamily-headline);
    }
  `,
  body: css`
    @media ${media.desktop} {
      font-family: var(--fontFamily-body);
    }
  `,
  label1: css`
    @media ${media.desktop} {
      font-family: var(--fontFamily-label1);
    }
  `,
  label2: css`
    @media ${media.desktop} {
      font-family: var(--fontFamily-label2);
    }
  `,
  caption: css`
    @media ${media.desktop} {
      font-family: var(--fontFamily-caption);
    }
  `,
  legal: css`
    @media ${media.desktop} {
      font-family: var(--fontFamily-legal);
    }
  `,
} as const;

export const fontSize: Record<ThemeVars.FontSize | 'inherit', LinariaClassName> = {
  inherit: css`
    @media ${media.desktop} {
      font-size: inherit;
    }
  `,
  display1: css`
    @media ${media.desktop} {
      font-size: var(--fontSize-display1);
    }
  `,
  display2: css`
    @media ${media.desktop} {
      font-size: var(--fontSize-display2);
    }
  `,
  display3: css`
    @media ${media.desktop} {
      font-size: var(--fontSize-display3);
    }
  `,
  title1: css`
    @media ${media.desktop} {
      font-size: var(--fontSize-title1);
    }
  `,
  title2: css`
    @media ${media.desktop} {
      font-size: var(--fontSize-title2);
    }
  `,
  title3: css`
    @media ${media.desktop} {
      font-size: var(--fontSize-title3);
    }
  `,
  title4: css`
    @media ${media.desktop} {
      font-size: var(--fontSize-title4);
    }
  `,
  headline: css`
    @media ${media.desktop} {
      font-size: var(--fontSize-headline);
    }
  `,
  body: css`
    @media ${media.desktop} {
      font-size: var(--fontSize-body);
    }
  `,
  label1: css`
    @media ${media.desktop} {
      font-size: var(--fontSize-label1);
    }
  `,
  label2: css`
    @media ${media.desktop} {
      font-size: var(--fontSize-label2);
    }
  `,
  caption: css`
    @media ${media.desktop} {
      font-size: var(--fontSize-caption);
    }
  `,
  legal: css`
    @media ${media.desktop} {
      font-size: var(--fontSize-legal);
    }
  `,
} as const;

export const fontWeight: Record<ThemeVars.FontWeight | 'inherit', LinariaClassName> = {
  inherit: css`
    @media ${media.desktop} {
      font-weight: inherit;
    }
  `,
  display1: css`
    @media ${media.desktop} {
      font-weight: var(--fontWeight-display1);
    }
  `,
  display2: css`
    @media ${media.desktop} {
      font-weight: var(--fontWeight-display2);
    }
  `,
  display3: css`
    @media ${media.desktop} {
      font-weight: var(--fontWeight-display3);
    }
  `,
  title1: css`
    @media ${media.desktop} {
      font-weight: var(--fontWeight-title1);
    }
  `,
  title2: css`
    @media ${media.desktop} {
      font-weight: var(--fontWeight-title2);
    }
  `,
  title3: css`
    @media ${media.desktop} {
      font-weight: var(--fontWeight-title3);
    }
  `,
  title4: css`
    @media ${media.desktop} {
      font-weight: var(--fontWeight-title4);
    }
  `,
  headline: css`
    @media ${media.desktop} {
      font-weight: var(--fontWeight-headline);
    }
  `,
  body: css`
    @media ${media.desktop} {
      font-weight: var(--fontWeight-body);
    }
  `,
  label1: css`
    @media ${media.desktop} {
      font-weight: var(--fontWeight-label1);
    }
  `,
  label2: css`
    @media ${media.desktop} {
      font-weight: var(--fontWeight-label2);
    }
  `,
  caption: css`
    @media ${media.desktop} {
      font-weight: var(--fontWeight-caption);
    }
  `,
  legal: css`
    @media ${media.desktop} {
      font-weight: var(--fontWeight-legal);
    }
  `,
} as const;

export const lineHeight: Record<ThemeVars.LineHeight | 'inherit', LinariaClassName> = {
  inherit: css`
    @media ${media.desktop} {
      line-height: inherit;
    }
  `,
  display1: css`
    @media ${media.desktop} {
      line-height: var(--lineHeight-display1);
    }
  `,
  display2: css`
    @media ${media.desktop} {
      line-height: var(--lineHeight-display2);
    }
  `,
  display3: css`
    @media ${media.desktop} {
      line-height: var(--lineHeight-display3);
    }
  `,
  title1: css`
    @media ${media.desktop} {
      line-height: var(--lineHeight-title1);
    }
  `,
  title2: css`
    @media ${media.desktop} {
      line-height: var(--lineHeight-title2);
    }
  `,
  title3: css`
    @media ${media.desktop} {
      line-height: var(--lineHeight-title3);
    }
  `,
  title4: css`
    @media ${media.desktop} {
      line-height: var(--lineHeight-title4);
    }
  `,
  headline: css`
    @media ${media.desktop} {
      line-height: var(--lineHeight-headline);
    }
  `,
  body: css`
    @media ${media.desktop} {
      line-height: var(--lineHeight-body);
    }
  `,
  label1: css`
    @media ${media.desktop} {
      line-height: var(--lineHeight-label1);
    }
  `,
  label2: css`
    @media ${media.desktop} {
      line-height: var(--lineHeight-label2);
    }
  `,
  caption: css`
    @media ${media.desktop} {
      line-height: var(--lineHeight-caption);
    }
  `,
  legal: css`
    @media ${media.desktop} {
      line-height: var(--lineHeight-legal);
    }
  `,
} as const;

export const textDecoration = {
  none: css`
    @media ${media.desktop} {
      text-decoration: none;
    }
  `,
  underline: css`
    @media ${media.desktop} {
      text-decoration: underline;
    }
  `,
  overline: css`
    @media ${media.desktop} {
      text-decoration: overline;
    }
  `,
  'line-through': css`
    @media ${media.desktop} {
      text-decoration: line-through;
    }
  `,
  'underline overline': css`
    @media ${media.desktop} {
      text-decoration: underline overline;
    }
  `,
  'underline double': css`
    @media ${media.desktop} {
      text-decoration: underline double;
    }
  `,
} as const;

export const textTransform = {
  none: css`
    @media ${media.desktop} {
      text-transform: none;
    }
  `,
  uppercase: css`
    @media ${media.desktop} {
      text-transform: uppercase;
    }
  `,
  lowercase: css`
    @media ${media.desktop} {
      text-transform: lowercase;
    }
  `,
  capitalize: css`
    @media ${media.desktop} {
      text-transform: capitalize;
    }
  `,
} as const;

export const userSelect = {
  none: css`
    @media ${media.desktop} {
      user-select: none;
    }
  `,
  text: css`
    @media ${media.desktop} {
      user-select: text;
    }
  `,
  all: css`
    @media ${media.desktop} {
      user-select: all;
    }
  `,
  auto: css`
    @media ${media.desktop} {
      user-select: auto;
    }
  `,
} as const;

export const display = {
  none: css`
    @media ${media.desktop} {
      display: none;
    }
  `,
  block: css`
    @media ${media.desktop} {
      display: block;
    }
  `,
  inline: css`
    @media ${media.desktop} {
      display: inline;
    }
  `,
  'inline-block': css`
    @media ${media.desktop} {
      display: inline-block;
    }
  `,
  flex: css`
    @media ${media.desktop} {
      display: flex;
    }
  `,
  'inline-flex': css`
    @media ${media.desktop} {
      display: inline-flex;
    }
  `,
  grid: css`
    @media ${media.desktop} {
      display: grid;
    }
  `,
  'inline-grid': css`
    @media ${media.desktop} {
      display: inline-grid;
    }
  `,
  contents: css`
    @media ${media.desktop} {
      display: contents;
    }
  `,
  'flow-root': css`
    @media ${media.desktop} {
      display: flow-root;
    }
  `,
  revert: css`
    @media ${media.desktop} {
      display: revert;
    }
  `,
  'list-item': css`
    @media ${media.desktop} {
      display: list-item;
    }
  `,
} as const;

export const overflow = {
  auto: css`
    @media ${media.desktop} {
      overflow: auto;
    }
  `,
  visible: css`
    @media ${media.desktop} {
      overflow: visible;
    }
  `,
  hidden: css`
    @media ${media.desktop} {
      overflow: hidden;
    }
  `,
  clip: css`
    @media ${media.desktop} {
      overflow: clip;
    }
  `,
  scroll: css`
    @media ${media.desktop} {
      overflow: scroll;
    }
  `,
} as const;

export const gap = {
  '0': css`
    @media ${media.desktop} {
      gap: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.desktop} {
      gap: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.desktop} {
      gap: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.desktop} {
      gap: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.desktop} {
      gap: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.desktop} {
      gap: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.desktop} {
      gap: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.desktop} {
      gap: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.desktop} {
      gap: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.desktop} {
      gap: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.desktop} {
      gap: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.desktop} {
      gap: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.desktop} {
      gap: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.desktop} {
      gap: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.desktop} {
      gap: var(--space-10);
    }
  `,
} as const;

export const columnGap = {
  '0': css`
    @media ${media.desktop} {
      column-gap: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.desktop} {
      column-gap: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.desktop} {
      column-gap: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.desktop} {
      column-gap: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.desktop} {
      column-gap: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.desktop} {
      column-gap: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.desktop} {
      column-gap: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.desktop} {
      column-gap: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.desktop} {
      column-gap: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.desktop} {
      column-gap: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.desktop} {
      column-gap: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.desktop} {
      column-gap: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.desktop} {
      column-gap: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.desktop} {
      column-gap: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.desktop} {
      column-gap: var(--space-10);
    }
  `,
} as const;

export const rowGap = {
  '0': css`
    @media ${media.desktop} {
      row-gap: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.desktop} {
      row-gap: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.desktop} {
      row-gap: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.desktop} {
      row-gap: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.desktop} {
      row-gap: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.desktop} {
      row-gap: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.desktop} {
      row-gap: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.desktop} {
      row-gap: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.desktop} {
      row-gap: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.desktop} {
      row-gap: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.desktop} {
      row-gap: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.desktop} {
      row-gap: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.desktop} {
      row-gap: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.desktop} {
      row-gap: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.desktop} {
      row-gap: var(--space-10);
    }
  `,
} as const;

export const justifyContent = {
  normal: css`
    @media ${media.desktop} {
      justify-content: normal;
    }
  `,
  center: css`
    @media ${media.desktop} {
      justify-content: center;
    }
  `,
  start: css`
    @media ${media.desktop} {
      justify-content: start;
    }
  `,
  end: css`
    @media ${media.desktop} {
      justify-content: end;
    }
  `,
  'flex-start': css`
    @media ${media.desktop} {
      justify-content: flex-start;
    }
  `,
  'flex-end': css`
    @media ${media.desktop} {
      justify-content: flex-end;
    }
  `,
  left: css`
    @media ${media.desktop} {
      justify-content: left;
    }
  `,
  right: css`
    @media ${media.desktop} {
      justify-content: right;
    }
  `,
  'space-between': css`
    @media ${media.desktop} {
      justify-content: space-between;
    }
  `,
  'space-around': css`
    @media ${media.desktop} {
      justify-content: space-around;
    }
  `,
  'space-evenly': css`
    @media ${media.desktop} {
      justify-content: space-evenly;
    }
  `,
  stretch: css`
    @media ${media.desktop} {
      justify-content: stretch;
    }
  `,
} as const;

export const alignContent = {
  normal: css`
    @media ${media.desktop} {
      align-content: normal;
    }
  `,
  center: css`
    @media ${media.desktop} {
      align-content: center;
    }
  `,
  start: css`
    @media ${media.desktop} {
      align-content: start;
    }
  `,
  end: css`
    @media ${media.desktop} {
      align-content: end;
    }
  `,
  'flex-start': css`
    @media ${media.desktop} {
      align-content: flex-start;
    }
  `,
  'flex-end': css`
    @media ${media.desktop} {
      align-content: flex-end;
    }
  `,
  'space-between': css`
    @media ${media.desktop} {
      align-content: space-between;
    }
  `,
  'space-around': css`
    @media ${media.desktop} {
      align-content: space-around;
    }
  `,
  'space-evenly': css`
    @media ${media.desktop} {
      align-content: space-evenly;
    }
  `,
  stretch: css`
    @media ${media.desktop} {
      align-content: stretch;
    }
  `,
  baseline: css`
    @media ${media.desktop} {
      align-content: baseline;
    }
  `,
  'first baseline': css`
    @media ${media.desktop} {
      align-content: first baseline;
    }
  `,
  'last baseline': css`
    @media ${media.desktop} {
      align-content: last baseline;
    }
  `,
} as const;

export const alignItems = {
  normal: css`
    @media ${media.desktop} {
      align-items: normal;
    }
  `,
  center: css`
    @media ${media.desktop} {
      align-items: center;
    }
  `,
  start: css`
    @media ${media.desktop} {
      align-items: start;
    }
  `,
  end: css`
    @media ${media.desktop} {
      align-items: end;
    }
  `,
  'flex-start': css`
    @media ${media.desktop} {
      align-items: flex-start;
    }
  `,
  'flex-end': css`
    @media ${media.desktop} {
      align-items: flex-end;
    }
  `,
  'self-start': css`
    @media ${media.desktop} {
      align-items: self-start;
    }
  `,
  'self-end': css`
    @media ${media.desktop} {
      align-items: self-end;
    }
  `,
  stretch: css`
    @media ${media.desktop} {
      align-items: stretch;
    }
  `,
  baseline: css`
    @media ${media.desktop} {
      align-items: baseline;
    }
  `,
  'first baseline': css`
    @media ${media.desktop} {
      align-items: first baseline;
    }
  `,
  'last baseline': css`
    @media ${media.desktop} {
      align-items: last baseline;
    }
  `,
} as const;

export const alignSelf = {
  auto: css`
    @media ${media.desktop} {
      align-self: auto;
    }
  `,
  normal: css`
    @media ${media.desktop} {
      align-self: normal;
    }
  `,
  center: css`
    @media ${media.desktop} {
      align-self: center;
    }
  `,
  start: css`
    @media ${media.desktop} {
      align-self: start;
    }
  `,
  end: css`
    @media ${media.desktop} {
      align-self: end;
    }
  `,
  'flex-start': css`
    @media ${media.desktop} {
      align-self: flex-start;
    }
  `,
  'flex-end': css`
    @media ${media.desktop} {
      align-self: flex-end;
    }
  `,
  'self-start': css`
    @media ${media.desktop} {
      align-self: self-start;
    }
  `,
  'self-end': css`
    @media ${media.desktop} {
      align-self: self-end;
    }
  `,
  stretch: css`
    @media ${media.desktop} {
      align-self: stretch;
    }
  `,
  baseline: css`
    @media ${media.desktop} {
      align-self: baseline;
    }
  `,
  'first baseline': css`
    @media ${media.desktop} {
      align-self: first baseline;
    }
  `,
  'last baseline': css`
    @media ${media.desktop} {
      align-self: last baseline;
    }
  `,
} as const;

export const flexDirection = {
  row: css`
    @media ${media.desktop} {
      flex-direction: row;
    }
  `,
  'row-reverse': css`
    @media ${media.desktop} {
      flex-direction: row-reverse;
    }
  `,
  column: css`
    @media ${media.desktop} {
      flex-direction: column;
    }
  `,
  'column-reverse': css`
    @media ${media.desktop} {
      flex-direction: column-reverse;
    }
  `,
} as const;

export const flexWrap = {
  nowrap: css`
    @media ${media.desktop} {
      flex-wrap: nowrap;
    }
  `,
  wrap: css`
    @media ${media.desktop} {
      flex-wrap: wrap;
    }
  `,
  'wrap-reverse': css`
    @media ${media.desktop} {
      flex-wrap: wrap-reverse;
    }
  `,
} as const;

export const position = {
  static: css`
    @media ${media.desktop} {
      position: static;
    }
  `,
  relative: css`
    @media ${media.desktop} {
      position: relative;
    }
  `,
  absolute: css`
    @media ${media.desktop} {
      position: absolute;
    }
  `,
  fixed: css`
    @media ${media.desktop} {
      position: fixed;
    }
  `,
  sticky: css`
    @media ${media.desktop} {
      position: sticky;
    }
  `,
} as const;

export const padding: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      padding-top: var(--space-0);
      padding-bottom: var(--space-0);
      padding-inline-start: var(--space-0);
      padding-inline-end: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.desktop} {
      padding-top: var(--space-0_25);
      padding-bottom: var(--space-0_25);
      padding-inline-start: var(--space-0_25);
      padding-inline-end: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.desktop} {
      padding-top: var(--space-0_5);
      padding-bottom: var(--space-0_5);
      padding-inline-start: var(--space-0_5);
      padding-inline-end: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.desktop} {
      padding-top: var(--space-0_75);
      padding-bottom: var(--space-0_75);
      padding-inline-start: var(--space-0_75);
      padding-inline-end: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.desktop} {
      padding-top: var(--space-1);
      padding-bottom: var(--space-1);
      padding-inline-start: var(--space-1);
      padding-inline-end: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.desktop} {
      padding-top: var(--space-1_5);
      padding-bottom: var(--space-1_5);
      padding-inline-start: var(--space-1_5);
      padding-inline-end: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.desktop} {
      padding-top: var(--space-2);
      padding-bottom: var(--space-2);
      padding-inline-start: var(--space-2);
      padding-inline-end: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.desktop} {
      padding-top: var(--space-3);
      padding-bottom: var(--space-3);
      padding-inline-start: var(--space-3);
      padding-inline-end: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.desktop} {
      padding-top: var(--space-4);
      padding-bottom: var(--space-4);
      padding-inline-start: var(--space-4);
      padding-inline-end: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.desktop} {
      padding-top: var(--space-5);
      padding-bottom: var(--space-5);
      padding-inline-start: var(--space-5);
      padding-inline-end: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.desktop} {
      padding-top: var(--space-6);
      padding-bottom: var(--space-6);
      padding-inline-start: var(--space-6);
      padding-inline-end: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.desktop} {
      padding-top: var(--space-7);
      padding-bottom: var(--space-7);
      padding-inline-start: var(--space-7);
      padding-inline-end: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.desktop} {
      padding-top: var(--space-8);
      padding-bottom: var(--space-8);
      padding-inline-start: var(--space-8);
      padding-inline-end: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.desktop} {
      padding-top: var(--space-9);
      padding-bottom: var(--space-9);
      padding-inline-start: var(--space-9);
      padding-inline-end: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.desktop} {
      padding-top: var(--space-10);
      padding-bottom: var(--space-10);
      padding-inline-start: var(--space-10);
      padding-inline-end: var(--space-10);
    }
  `,
} as const;

export const paddingX: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-0);
      padding-inline-end: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-0_25);
      padding-inline-end: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-0_5);
      padding-inline-end: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-0_75);
      padding-inline-end: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-1);
      padding-inline-end: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-1_5);
      padding-inline-end: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-2);
      padding-inline-end: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-3);
      padding-inline-end: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-4);
      padding-inline-end: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-5);
      padding-inline-end: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-6);
      padding-inline-end: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-7);
      padding-inline-end: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-8);
      padding-inline-end: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-9);
      padding-inline-end: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-10);
      padding-inline-end: var(--space-10);
    }
  `,
} as const;

export const paddingY: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      padding-top: var(--space-0);
      padding-bottom: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.desktop} {
      padding-top: var(--space-0_25);
      padding-bottom: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.desktop} {
      padding-top: var(--space-0_5);
      padding-bottom: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.desktop} {
      padding-top: var(--space-0_75);
      padding-bottom: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.desktop} {
      padding-top: var(--space-1);
      padding-bottom: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.desktop} {
      padding-top: var(--space-1_5);
      padding-bottom: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.desktop} {
      padding-top: var(--space-2);
      padding-bottom: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.desktop} {
      padding-top: var(--space-3);
      padding-bottom: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.desktop} {
      padding-top: var(--space-4);
      padding-bottom: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.desktop} {
      padding-top: var(--space-5);
      padding-bottom: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.desktop} {
      padding-top: var(--space-6);
      padding-bottom: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.desktop} {
      padding-top: var(--space-7);
      padding-bottom: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.desktop} {
      padding-top: var(--space-8);
      padding-bottom: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.desktop} {
      padding-top: var(--space-9);
      padding-bottom: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.desktop} {
      padding-top: var(--space-10);
      padding-bottom: var(--space-10);
    }
  `,
} as const;

export const paddingTop: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      padding-top: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.desktop} {
      padding-top: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.desktop} {
      padding-top: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.desktop} {
      padding-top: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.desktop} {
      padding-top: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.desktop} {
      padding-top: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.desktop} {
      padding-top: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.desktop} {
      padding-top: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.desktop} {
      padding-top: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.desktop} {
      padding-top: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.desktop} {
      padding-top: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.desktop} {
      padding-top: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.desktop} {
      padding-top: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.desktop} {
      padding-top: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.desktop} {
      padding-top: var(--space-10);
    }
  `,
} as const;

export const paddingBottom: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      padding-bottom: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.desktop} {
      padding-bottom: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.desktop} {
      padding-bottom: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.desktop} {
      padding-bottom: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.desktop} {
      padding-bottom: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.desktop} {
      padding-bottom: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.desktop} {
      padding-bottom: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.desktop} {
      padding-bottom: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.desktop} {
      padding-bottom: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.desktop} {
      padding-bottom: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.desktop} {
      padding-bottom: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.desktop} {
      padding-bottom: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.desktop} {
      padding-bottom: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.desktop} {
      padding-bottom: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.desktop} {
      padding-bottom: var(--space-10);
    }
  `,
} as const;

export const paddingStart: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.desktop} {
      padding-inline-start: var(--space-10);
    }
  `,
} as const;

export const paddingEnd: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      padding-inline-end: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.desktop} {
      padding-inline-end: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.desktop} {
      padding-inline-end: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.desktop} {
      padding-inline-end: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.desktop} {
      padding-inline-end: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.desktop} {
      padding-inline-end: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.desktop} {
      padding-inline-end: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.desktop} {
      padding-inline-end: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.desktop} {
      padding-inline-end: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.desktop} {
      padding-inline-end: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.desktop} {
      padding-inline-end: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.desktop} {
      padding-inline-end: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.desktop} {
      padding-inline-end: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.desktop} {
      padding-inline-end: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.desktop} {
      padding-inline-end: var(--space-10);
    }
  `,
} as const;

export const margin: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-0));
      margin-bottom: calc(-1 * var(--space-0));
      margin-inline-end: calc(-1 * var(--space-0));
      margin-inline-start: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-0_25));
      margin-bottom: calc(-1 * var(--space-0_25));
      margin-inline-end: calc(-1 * var(--space-0_25));
      margin-inline-start: calc(-1 * var(--space-0_25));
    }
  `,
  '-0.5': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-0_5));
      margin-bottom: calc(-1 * var(--space-0_5));
      margin-inline-end: calc(-1 * var(--space-0_5));
      margin-inline-start: calc(-1 * var(--space-0_5));
    }
  `,
  '-0.75': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-0_75));
      margin-bottom: calc(-1 * var(--space-0_75));
      margin-inline-end: calc(-1 * var(--space-0_75));
      margin-inline-start: calc(-1 * var(--space-0_75));
    }
  `,
  '-1': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-1));
      margin-bottom: calc(-1 * var(--space-1));
      margin-inline-end: calc(-1 * var(--space-1));
      margin-inline-start: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-1_5));
      margin-bottom: calc(-1 * var(--space-1_5));
      margin-inline-end: calc(-1 * var(--space-1_5));
      margin-inline-start: calc(-1 * var(--space-1_5));
    }
  `,
  '-2': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-2));
      margin-bottom: calc(-1 * var(--space-2));
      margin-inline-end: calc(-1 * var(--space-2));
      margin-inline-start: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-3));
      margin-bottom: calc(-1 * var(--space-3));
      margin-inline-end: calc(-1 * var(--space-3));
      margin-inline-start: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-4));
      margin-bottom: calc(-1 * var(--space-4));
      margin-inline-end: calc(-1 * var(--space-4));
      margin-inline-start: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-5));
      margin-bottom: calc(-1 * var(--space-5));
      margin-inline-end: calc(-1 * var(--space-5));
      margin-inline-start: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-6));
      margin-bottom: calc(-1 * var(--space-6));
      margin-inline-end: calc(-1 * var(--space-6));
      margin-inline-start: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-7));
      margin-bottom: calc(-1 * var(--space-7));
      margin-inline-end: calc(-1 * var(--space-7));
      margin-inline-start: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-8));
      margin-bottom: calc(-1 * var(--space-8));
      margin-inline-end: calc(-1 * var(--space-8));
      margin-inline-start: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-9));
      margin-bottom: calc(-1 * var(--space-9));
      margin-inline-end: calc(-1 * var(--space-9));
      margin-inline-start: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-10));
      margin-bottom: calc(-1 * var(--space-10));
      margin-inline-end: calc(-1 * var(--space-10));
      margin-inline-start: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginX: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-0));
      margin-inline-start: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-0_25));
      margin-inline-start: calc(-1 * var(--space-0_25));
    }
  `,
  '-0.5': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-0_5));
      margin-inline-start: calc(-1 * var(--space-0_5));
    }
  `,
  '-0.75': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-0_75));
      margin-inline-start: calc(-1 * var(--space-0_75));
    }
  `,
  '-1': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-1));
      margin-inline-start: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-1_5));
      margin-inline-start: calc(-1 * var(--space-1_5));
    }
  `,
  '-2': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-2));
      margin-inline-start: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-3));
      margin-inline-start: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-4));
      margin-inline-start: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-5));
      margin-inline-start: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-6));
      margin-inline-start: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-7));
      margin-inline-start: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-8));
      margin-inline-start: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-9));
      margin-inline-start: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-10));
      margin-inline-start: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginY: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-0));
      margin-bottom: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-0_25));
      margin-bottom: calc(-1 * var(--space-0_25));
    }
  `,
  '-0.5': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-0_5));
      margin-bottom: calc(-1 * var(--space-0_5));
    }
  `,
  '-0.75': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-0_75));
      margin-bottom: calc(-1 * var(--space-0_75));
    }
  `,
  '-1': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-1));
      margin-bottom: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-1_5));
      margin-bottom: calc(-1 * var(--space-1_5));
    }
  `,
  '-2': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-2));
      margin-bottom: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-3));
      margin-bottom: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-4));
      margin-bottom: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-5));
      margin-bottom: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-6));
      margin-bottom: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-7));
      margin-bottom: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-8));
      margin-bottom: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-9));
      margin-bottom: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-10));
      margin-bottom: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginTop: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-0_25));
    }
  `,
  '-0.5': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-0_5));
    }
  `,
  '-0.75': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-0_75));
    }
  `,
  '-1': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-1_5));
    }
  `,
  '-2': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media ${media.desktop} {
      margin-top: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginBottom: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      margin-bottom: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media ${media.desktop} {
      margin-bottom: calc(-1 * var(--space-0_25));
    }
  `,
  '-0.5': css`
    @media ${media.desktop} {
      margin-bottom: calc(-1 * var(--space-0_5));
    }
  `,
  '-0.75': css`
    @media ${media.desktop} {
      margin-bottom: calc(-1 * var(--space-0_75));
    }
  `,
  '-1': css`
    @media ${media.desktop} {
      margin-bottom: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media ${media.desktop} {
      margin-bottom: calc(-1 * var(--space-1_5));
    }
  `,
  '-2': css`
    @media ${media.desktop} {
      margin-bottom: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media ${media.desktop} {
      margin-bottom: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media ${media.desktop} {
      margin-bottom: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media ${media.desktop} {
      margin-bottom: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media ${media.desktop} {
      margin-bottom: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media ${media.desktop} {
      margin-bottom: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media ${media.desktop} {
      margin-bottom: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media ${media.desktop} {
      margin-bottom: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media ${media.desktop} {
      margin-bottom: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginEnd: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-0_25));
    }
  `,
  '-0.5': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-0_5));
    }
  `,
  '-0.75': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-0_75));
    }
  `,
  '-1': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-1_5));
    }
  `,
  '-2': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media ${media.desktop} {
      margin-inline-end: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginStart: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media ${media.desktop} {
      margin-inline-start: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media ${media.desktop} {
      margin-inline-start: calc(-1 * var(--space-0_25));
    }
  `,
  '-0.5': css`
    @media ${media.desktop} {
      margin-inline-start: calc(-1 * var(--space-0_5));
    }
  `,
  '-0.75': css`
    @media ${media.desktop} {
      margin-inline-start: calc(-1 * var(--space-0_75));
    }
  `,
  '-1': css`
    @media ${media.desktop} {
      margin-inline-start: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media ${media.desktop} {
      margin-inline-start: calc(-1 * var(--space-1_5));
    }
  `,
  '-2': css`
    @media ${media.desktop} {
      margin-inline-start: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media ${media.desktop} {
      margin-inline-start: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media ${media.desktop} {
      margin-inline-start: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media ${media.desktop} {
      margin-inline-start: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media ${media.desktop} {
      margin-inline-start: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media ${media.desktop} {
      margin-inline-start: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media ${media.desktop} {
      margin-inline-start: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media ${media.desktop} {
      margin-inline-start: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media ${media.desktop} {
      margin-inline-start: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const textAlign = {
  start: css`
    @media ${media.desktop} {
      text-align: start;
    }
  `,
  end: css`
    @media ${media.desktop} {
      text-align: end;
    }
  `,
  center: css`
    @media ${media.desktop} {
      text-align: center;
    }
  `,
  justify: css`
    @media ${media.desktop} {
      text-align: justify;
    }
  `,
} as const;

export const visibility = {
  hidden: css`
    @media ${media.desktop} {
      visibility: hidden;
    }
  `,
  visible: css`
    @media ${media.desktop} {
      visibility: visible;
    }
  `,
} as const;
