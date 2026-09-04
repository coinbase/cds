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
    @media ${media.phone} {
      width: var(--phone-width);
    }
  `,
  height: css`
    @media ${media.phone} {
      height: var(--phone-height);
    }
  `,
  minWidth: css`
    @media ${media.phone} {
      min-width: var(--phone-minWidth);
    }
  `,
  minHeight: css`
    @media ${media.phone} {
      min-height: var(--phone-minHeight);
    }
  `,
  maxWidth: css`
    @media ${media.phone} {
      max-width: var(--phone-maxWidth);
    }
  `,
  maxHeight: css`
    @media ${media.phone} {
      max-height: var(--phone-maxHeight);
    }
  `,
  aspectRatio: css`
    @media ${media.phone} {
      aspect-ratio: var(--phone-aspectRatio);
    }
  `,
  top: css`
    @media ${media.phone} {
      top: var(--phone-top);
    }
  `,
  bottom: css`
    @media ${media.phone} {
      bottom: var(--phone-bottom);
    }
  `,
  left: css`
    @media ${media.phone} {
      left: var(--phone-left);
    }
  `,
  right: css`
    @media ${media.phone} {
      right: var(--phone-right);
    }
  `,
  transform: css`
    @media ${media.phone} {
      transform: var(--phone-transform);
    }
  `,
  flexBasis: css`
    @media ${media.phone} {
      flex-basis: var(--phone-flexBasis);
    }
  `,
  flexShrink: css`
    @media ${media.phone} {
      flex-shrink: var(--phone-flexShrink);
    }
  `,
  flexGrow: css`
    @media ${media.phone} {
      flex-grow: var(--phone-flexGrow);
    }
  `,
  gridTemplateColumns: css`
    @media ${media.phone} {
      grid-template-columns: var(--phone-gridTemplateColumns);
    }
  `,
  gridTemplateRows: css`
    @media ${media.phone} {
      grid-template-rows: var(--phone-gridTemplateRows);
    }
  `,
  gridTemplateAreas: css`
    @media ${media.phone} {
      grid-template-areas: var(--phone-gridTemplateAreas);
    }
  `,
  gridTemplate: css`
    @media ${media.phone} {
      grid-template: var(--phone-gridTemplate);
    }
  `,
  gridAutoColumns: css`
    @media ${media.phone} {
      grid-auto-columns: var(--phone-gridAutoColumns);
    }
  `,
  gridAutoRows: css`
    @media ${media.phone} {
      grid-auto-rows: var(--phone-gridAutoRows);
    }
  `,
  gridAutoFlow: css`
    @media ${media.phone} {
      grid-auto-flow: var(--phone-gridAutoFlow);
    }
  `,
  grid: css`
    @media ${media.phone} {
      grid: var(--phone-grid);
    }
  `,
  gridRowStart: css`
    @media ${media.phone} {
      grid-row-start: var(--phone-gridRowStart);
    }
  `,
  gridColumnStart: css`
    @media ${media.phone} {
      grid-column-start: var(--phone-gridColumnStart);
    }
  `,
  gridRowEnd: css`
    @media ${media.phone} {
      grid-row-end: var(--phone-gridRowEnd);
    }
  `,
  gridColumnEnd: css`
    @media ${media.phone} {
      grid-column-end: var(--phone-gridColumnEnd);
    }
  `,
  gridRow: css`
    @media ${media.phone} {
      grid-row: var(--phone-gridRow);
    }
  `,
  gridColumn: css`
    @media ${media.phone} {
      grid-column: var(--phone-gridColumn);
    }
  `,
  gridArea: css`
    @media ${media.phone} {
      grid-area: var(--phone-gridArea);
    }
  `,
  opacity: css`
    @media ${media.phone} {
      opacity: var(--phone-opacity);
    }
  `,
  zIndex: css`
    @media ${media.phone} {
      z-index: var(--phone-zIndex);
    }
  `,
} as const;

export const elevation: Record<ThemeVars.Elevation, LinariaClassName> = {
  '0': css``,
  '1': css`
    @media ${media.phone} {
      background-color: var(--color-bgElevation1);
      box-shadow: var(--shadow-elevation1);
    }
  `,
  '2': css`
    @media ${media.phone} {
      background-color: var(--color-bgElevation2);
      box-shadow: var(--shadow-elevation2);
    }
  `,
} as const;

export const color: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  fg: css`
    @media ${media.phone} {
      color: var(--color-fg);
    }
  `,
  fgInverse: css`
    @media ${media.phone} {
      color: var(--color-fgInverse);
    }
  `,
  fgMuted: css`
    @media ${media.phone} {
      color: var(--color-fgMuted);
    }
  `,
  fgPrimary: css`
    @media ${media.phone} {
      color: var(--color-fgPrimary);
    }
  `,
  fgPositive: css`
    @media ${media.phone} {
      color: var(--color-fgPositive);
    }
  `,
  fgNegative: css`
    @media ${media.phone} {
      color: var(--color-fgNegative);
    }
  `,
  fgWarning: css`
    @media ${media.phone} {
      color: var(--color-fgWarning);
    }
  `,
  // Background
  bg: css`
    @media ${media.phone} {
      color: var(--color-bg);
    }
  `,
  bgAlternate: css`
    @media ${media.phone} {
      color: var(--color-bgAlternate);
    }
  `,
  bgInverse: css`
    @media ${media.phone} {
      color: var(--color-bgInverse);
    }
  `,
  bgOverlay: css`
    @media ${media.phone} {
      color: var(--color-bgOverlay);
    }
  `,
  bgPrimary: css`
    @media ${media.phone} {
      color: var(--color-bgPrimary);
    }
  `,
  bgPrimaryWash: css`
    @media ${media.phone} {
      color: var(--color-bgPrimaryWash);
    }
  `,
  bgSecondary: css`
    @media ${media.phone} {
      color: var(--color-bgSecondary);
    }
  `,
  bgTertiary: css`
    @media ${media.phone} {
      color: var(--color-bgTertiary);
    }
  `,
  bgSecondaryWash: css`
    @media ${media.phone} {
      color: var(--color-bgSecondaryWash);
    }
  `,
  bgNegative: css`
    @media ${media.phone} {
      color: var(--color-bgNegative);
    }
  `,
  bgNegativeWash: css`
    @media ${media.phone} {
      color: var(--color-bgNegativeWash);
    }
  `,
  bgPositive: css`
    @media ${media.phone} {
      color: var(--color-bgPositive);
    }
  `,
  bgPositiveWash: css`
    @media ${media.phone} {
      color: var(--color-bgPositiveWash);
    }
  `,
  bgWarning: css`
    @media ${media.phone} {
      color: var(--color-bgWarning);
    }
  `,
  bgWarningWash: css`
    @media ${media.phone} {
      color: var(--color-bgWarningWash);
    }
  `,
  currentColor: css`
    @media ${media.phone} {
      color: var(--color-currentColor);
    }
  `,
  // Line
  bgLine: css`
    @media ${media.phone} {
      color: var(--color-bgLine);
    }
  `,
  bgLineInverse: css`
    @media ${media.phone} {
      color: var(--color-bgLineInverse);
    }
  `,
  bgLineHeavy: css`
    @media ${media.phone} {
      color: var(--color-bgLineHeavy);
    }
  `,
  bgLinePrimary: css`
    @media ${media.phone} {
      color: var(--color-bgLinePrimary);
    }
  `,
  bgLinePrimarySubtle: css`
    @media ${media.phone} {
      color: var(--color-bgLinePrimarySubtle);
    }
  `,
  // Elevation
  bgElevation1: css`
    @media ${media.phone} {
      color: var(--color-bgElevation1);
    }
  `,
  bgElevation2: css`
    @media ${media.phone} {
      color: var(--color-bgElevation2);
    }
  `,
  // Accent
  accentSubtleGreen: css`
    @media ${media.phone} {
      color: var(--color-accentSubtleGreen);
    }
  `,
  accentBoldGreen: css`
    @media ${media.phone} {
      color: var(--color-accentBoldGreen);
    }
  `,
  accentSubtleBlue: css`
    @media ${media.phone} {
      color: var(--color-accentSubtleBlue);
    }
  `,
  accentBoldBlue: css`
    @media ${media.phone} {
      color: var(--color-accentBoldBlue);
    }
  `,
  accentSubtlePurple: css`
    @media ${media.phone} {
      color: var(--color-accentSubtlePurple);
    }
  `,
  accentBoldPurple: css`
    @media ${media.phone} {
      color: var(--color-accentBoldPurple);
    }
  `,
  accentSubtleYellow: css`
    @media ${media.phone} {
      color: var(--color-accentSubtleYellow);
    }
  `,
  accentBoldYellow: css`
    @media ${media.phone} {
      color: var(--color-accentBoldYellow);
    }
  `,
  accentSubtleRed: css`
    @media ${media.phone} {
      color: var(--color-accentSubtleRed);
    }
  `,
  accentBoldRed: css`
    @media ${media.phone} {
      color: var(--color-accentBoldRed);
    }
  `,
  accentSubtleGray: css`
    @media ${media.phone} {
      color: var(--color-accentSubtleGray);
    }
  `,
  accentBoldGray: css`
    @media ${media.phone} {
      color: var(--color-accentBoldGray);
    }
  `,
  transparent: css`
    @media ${media.phone} {
      color: var(--color-transparent);
    }
  `,
} as const;

export const background: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  fg: css`
    @media ${media.phone} {
      background-color: var(--color-fg);
    }
  `,
  fgInverse: css`
    @media ${media.phone} {
      background-color: var(--color-fgInverse);
    }
  `,
  fgMuted: css`
    @media ${media.phone} {
      background-color: var(--color-fgMuted);
    }
  `,
  fgPrimary: css`
    @media ${media.phone} {
      background-color: var(--color-fgPrimary);
    }
  `,
  fgPositive: css`
    @media ${media.phone} {
      background-color: var(--color-fgPositive);
    }
  `,
  fgNegative: css`
    @media ${media.phone} {
      background-color: var(--color-fgNegative);
    }
  `,
  fgWarning: css`
    @media ${media.phone} {
      background-color: var(--color-fgWarning);
    }
  `,
  // Background
  bg: css`
    @media ${media.phone} {
      background-color: var(--color-bg);
    }
  `,
  bgAlternate: css`
    @media ${media.phone} {
      background-color: var(--color-bgAlternate);
    }
  `,
  bgInverse: css`
    @media ${media.phone} {
      background-color: var(--color-bgInverse);
    }
  `,
  bgOverlay: css`
    @media ${media.phone} {
      background-color: var(--color-bgOverlay);
    }
  `,
  bgPrimary: css`
    @media ${media.phone} {
      background-color: var(--color-bgPrimary);
    }
  `,
  bgPrimaryWash: css`
    @media ${media.phone} {
      background-color: var(--color-bgPrimaryWash);
    }
  `,
  bgSecondary: css`
    @media ${media.phone} {
      background-color: var(--color-bgSecondary);
    }
  `,
  bgTertiary: css`
    @media ${media.phone} {
      background-color: var(--color-bgTertiary);
    }
  `,
  bgSecondaryWash: css`
    @media ${media.phone} {
      background-color: var(--color-bgSecondaryWash);
    }
  `,
  bgNegative: css`
    @media ${media.phone} {
      background-color: var(--color-bgNegative);
    }
  `,
  bgNegativeWash: css`
    @media ${media.phone} {
      background-color: var(--color-bgNegativeWash);
    }
  `,
  bgPositive: css`
    @media ${media.phone} {
      background-color: var(--color-bgPositive);
    }
  `,
  bgPositiveWash: css`
    @media ${media.phone} {
      background-color: var(--color-bgPositiveWash);
    }
  `,
  bgWarning: css`
    @media ${media.phone} {
      background-color: var(--color-bgWarning);
    }
  `,
  bgWarningWash: css`
    @media ${media.phone} {
      background-color: var(--color-bgWarningWash);
    }
  `,
  currentColor: css`
    @media ${media.phone} {
      background-color: var(--color-currentColor);
    }
  `,
  // Line
  bgLine: css`
    @media ${media.phone} {
      background-color: var(--color-bgLine);
    }
  `,
  bgLineInverse: css`
    @media ${media.phone} {
      background-color: var(--color-bgLineInverse);
    }
  `,
  bgLineHeavy: css`
    @media ${media.phone} {
      background-color: var(--color-bgLineHeavy);
    }
  `,
  bgLinePrimary: css`
    @media ${media.phone} {
      background-color: var(--color-bgLinePrimary);
    }
  `,
  bgLinePrimarySubtle: css`
    @media ${media.phone} {
      background-color: var(--color-bgLinePrimarySubtle);
    }
  `,
  // Elevation
  bgElevation1: css`
    @media ${media.phone} {
      background-color: var(--color-bgElevation1);
    }
  `,
  bgElevation2: css`
    @media ${media.phone} {
      background-color: var(--color-bgElevation2);
    }
  `,
  // Accent
  accentSubtleGreen: css`
    @media ${media.phone} {
      background-color: var(--color-accentSubtleGreen);
    }
  `,
  accentBoldGreen: css`
    @media ${media.phone} {
      background-color: var(--color-accentBoldGreen);
    }
  `,
  accentSubtleBlue: css`
    @media ${media.phone} {
      background-color: var(--color-accentSubtleBlue);
    }
  `,
  accentBoldBlue: css`
    @media ${media.phone} {
      background-color: var(--color-accentBoldBlue);
    }
  `,
  accentSubtlePurple: css`
    @media ${media.phone} {
      background-color: var(--color-accentSubtlePurple);
    }
  `,
  accentBoldPurple: css`
    @media ${media.phone} {
      background-color: var(--color-accentBoldPurple);
    }
  `,
  accentSubtleYellow: css`
    @media ${media.phone} {
      background-color: var(--color-accentSubtleYellow);
    }
  `,
  accentBoldYellow: css`
    @media ${media.phone} {
      background-color: var(--color-accentBoldYellow);
    }
  `,
  accentSubtleRed: css`
    @media ${media.phone} {
      background-color: var(--color-accentSubtleRed);
    }
  `,
  accentBoldRed: css`
    @media ${media.phone} {
      background-color: var(--color-accentBoldRed);
    }
  `,
  accentSubtleGray: css`
    @media ${media.phone} {
      background-color: var(--color-accentSubtleGray);
    }
  `,
  accentBoldGray: css`
    @media ${media.phone} {
      background-color: var(--color-accentBoldGray);
    }
  `,
  transparent: css`
    @media ${media.phone} {
      background-color: var(--color-transparent);
    }
  `,
} as const;

export const borderColor: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  fg: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-fg);
    }
  `,
  fgInverse: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-fgInverse);
    }
  `,
  fgMuted: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-fgMuted);
    }
  `,
  fgPrimary: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-fgPrimary);
    }
  `,
  fgPositive: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-fgPositive);
    }
  `,
  fgNegative: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-fgNegative);
    }
  `,
  fgWarning: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-fgWarning);
    }
  `,
  // Background
  bg: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-bg);
    }
  `,
  bgAlternate: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-bgAlternate);
    }
  `,
  bgInverse: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-bgInverse);
    }
  `,
  bgOverlay: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-bgOverlay);
    }
  `,
  bgPrimary: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-bgPrimary);
    }
  `,
  bgPrimaryWash: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-bgPrimaryWash);
    }
  `,
  bgSecondary: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-bgSecondary);
    }
  `,
  bgTertiary: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-bgTertiary);
    }
  `,
  bgSecondaryWash: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-bgSecondaryWash);
    }
  `,
  bgNegative: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-bgNegative);
    }
  `,
  bgNegativeWash: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-bgNegativeWash);
    }
  `,
  bgPositive: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-bgPositive);
    }
  `,
  bgPositiveWash: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-bgPositiveWash);
    }
  `,
  bgWarning: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-bgWarning);
    }
  `,
  bgWarningWash: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-bgWarningWash);
    }
  `,
  currentColor: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-currentColor);
    }
  `,
  // Line
  bgLine: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-bgLine);
    }
  `,
  bgLineInverse: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-bgLineInverse);
    }
  `,
  bgLineHeavy: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-bgLineHeavy);
    }
  `,
  bgLinePrimary: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-bgLinePrimary);
    }
  `,
  bgLinePrimarySubtle: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-bgLinePrimarySubtle);
    }
  `,
  // Elevation
  bgElevation1: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-bgElevation1);
    }
  `,
  bgElevation2: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-bgElevation2);
    }
  `,
  // Accent
  accentSubtleGreen: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-accentSubtleGreen);
    }
  `,
  accentBoldGreen: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-accentBoldGreen);
    }
  `,
  accentSubtleBlue: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-accentSubtleBlue);
    }
  `,
  accentBoldBlue: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-accentBoldBlue);
    }
  `,
  accentSubtlePurple: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-accentSubtlePurple);
    }
  `,
  accentBoldPurple: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-accentBoldPurple);
    }
  `,
  accentSubtleYellow: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-accentSubtleYellow);
    }
  `,
  accentBoldYellow: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-accentBoldYellow);
    }
  `,
  accentSubtleRed: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-accentSubtleRed);
    }
  `,
  accentBoldRed: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-accentBoldRed);
    }
  `,
  accentSubtleGray: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-accentSubtleGray);
    }
  `,
  accentBoldGray: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-accentBoldGray);
    }
  `,
  transparent: css`
    @media ${media.phone} {
      border-style: solid;
      border-color: var(--color-transparent);
    }
  `,
} as const;

export const borderWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      border-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media ${media.phone} {
      border-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media ${media.phone} {
      border-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media ${media.phone} {
      border-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media ${media.phone} {
      border-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media ${media.phone} {
      border-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderTopWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      border-top-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media ${media.phone} {
      border-top-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media ${media.phone} {
      border-top-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media ${media.phone} {
      border-top-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media ${media.phone} {
      border-top-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media ${media.phone} {
      border-top-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderEndWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      border-inline-end-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media ${media.phone} {
      border-inline-end-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media ${media.phone} {
      border-inline-end-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media ${media.phone} {
      border-inline-end-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media ${media.phone} {
      border-inline-end-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media ${media.phone} {
      border-inline-end-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderBottomWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      border-bottom-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media ${media.phone} {
      border-bottom-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media ${media.phone} {
      border-bottom-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media ${media.phone} {
      border-bottom-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media ${media.phone} {
      border-bottom-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media ${media.phone} {
      border-bottom-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderStartWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      border-inline-start-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media ${media.phone} {
      border-inline-start-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media ${media.phone} {
      border-inline-start-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media ${media.phone} {
      border-inline-start-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media ${media.phone} {
      border-inline-start-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media ${media.phone} {
      border-inline-start-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      border-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media ${media.phone} {
      border-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media ${media.phone} {
      border-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media ${media.phone} {
      border-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media ${media.phone} {
      border-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media ${media.phone} {
      border-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media ${media.phone} {
      border-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media ${media.phone} {
      border-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media ${media.phone} {
      border-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media ${media.phone} {
      border-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media ${media.phone} {
      border-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const borderTopLeftRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      border-top-left-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media ${media.phone} {
      border-top-left-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media ${media.phone} {
      border-top-left-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media ${media.phone} {
      border-top-left-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media ${media.phone} {
      border-top-left-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media ${media.phone} {
      border-top-left-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media ${media.phone} {
      border-top-left-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media ${media.phone} {
      border-top-left-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media ${media.phone} {
      border-top-left-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media ${media.phone} {
      border-top-left-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media ${media.phone} {
      border-top-left-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const borderTopRightRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      border-top-right-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media ${media.phone} {
      border-top-right-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media ${media.phone} {
      border-top-right-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media ${media.phone} {
      border-top-right-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media ${media.phone} {
      border-top-right-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media ${media.phone} {
      border-top-right-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media ${media.phone} {
      border-top-right-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media ${media.phone} {
      border-top-right-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media ${media.phone} {
      border-top-right-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media ${media.phone} {
      border-top-right-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media ${media.phone} {
      border-top-right-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const borderBottomLeftRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      border-bottom-left-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media ${media.phone} {
      border-bottom-left-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media ${media.phone} {
      border-bottom-left-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media ${media.phone} {
      border-bottom-left-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media ${media.phone} {
      border-bottom-left-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media ${media.phone} {
      border-bottom-left-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media ${media.phone} {
      border-bottom-left-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media ${media.phone} {
      border-bottom-left-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media ${media.phone} {
      border-bottom-left-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media ${media.phone} {
      border-bottom-left-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media ${media.phone} {
      border-bottom-left-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const borderBottomRightRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      border-bottom-right-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media ${media.phone} {
      border-bottom-right-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media ${media.phone} {
      border-bottom-right-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media ${media.phone} {
      border-bottom-right-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media ${media.phone} {
      border-bottom-right-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media ${media.phone} {
      border-bottom-right-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media ${media.phone} {
      border-bottom-right-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media ${media.phone} {
      border-bottom-right-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media ${media.phone} {
      border-bottom-right-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media ${media.phone} {
      border-bottom-right-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media ${media.phone} {
      border-bottom-right-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const fontFamily: Record<ThemeVars.FontFamily | 'inherit', LinariaClassName> = {
  inherit: css`
    @media ${media.phone} {
      font-family: inherit;
    }
  `,
  display1: css`
    @media ${media.phone} {
      font-family: var(--fontFamily-display1);
    }
  `,
  display2: css`
    @media ${media.phone} {
      font-family: var(--fontFamily-display2);
    }
  `,
  display3: css`
    @media ${media.phone} {
      font-family: var(--fontFamily-display3);
    }
  `,
  title1: css`
    @media ${media.phone} {
      font-family: var(--fontFamily-title1);
    }
  `,
  title2: css`
    @media ${media.phone} {
      font-family: var(--fontFamily-title2);
    }
  `,
  title3: css`
    @media ${media.phone} {
      font-family: var(--fontFamily-title3);
    }
  `,
  title4: css`
    @media ${media.phone} {
      font-family: var(--fontFamily-title4);
    }
  `,
  headline: css`
    @media ${media.phone} {
      font-family: var(--fontFamily-headline);
    }
  `,
  body: css`
    @media ${media.phone} {
      font-family: var(--fontFamily-body);
    }
  `,
  label1: css`
    @media ${media.phone} {
      font-family: var(--fontFamily-label1);
    }
  `,
  label2: css`
    @media ${media.phone} {
      font-family: var(--fontFamily-label2);
    }
  `,
  caption: css`
    @media ${media.phone} {
      font-family: var(--fontFamily-caption);
    }
  `,
  legal: css`
    @media ${media.phone} {
      font-family: var(--fontFamily-legal);
    }
  `,
} as const;

export const fontSize: Record<ThemeVars.FontSize | 'inherit', LinariaClassName> = {
  inherit: css`
    @media ${media.phone} {
      font-size: inherit;
    }
  `,
  display1: css`
    @media ${media.phone} {
      font-size: var(--fontSize-display1);
    }
  `,
  display2: css`
    @media ${media.phone} {
      font-size: var(--fontSize-display2);
    }
  `,
  display3: css`
    @media ${media.phone} {
      font-size: var(--fontSize-display3);
    }
  `,
  title1: css`
    @media ${media.phone} {
      font-size: var(--fontSize-title1);
    }
  `,
  title2: css`
    @media ${media.phone} {
      font-size: var(--fontSize-title2);
    }
  `,
  title3: css`
    @media ${media.phone} {
      font-size: var(--fontSize-title3);
    }
  `,
  title4: css`
    @media ${media.phone} {
      font-size: var(--fontSize-title4);
    }
  `,
  headline: css`
    @media ${media.phone} {
      font-size: var(--fontSize-headline);
    }
  `,
  body: css`
    @media ${media.phone} {
      font-size: var(--fontSize-body);
    }
  `,
  label1: css`
    @media ${media.phone} {
      font-size: var(--fontSize-label1);
    }
  `,
  label2: css`
    @media ${media.phone} {
      font-size: var(--fontSize-label2);
    }
  `,
  caption: css`
    @media ${media.phone} {
      font-size: var(--fontSize-caption);
    }
  `,
  legal: css`
    @media ${media.phone} {
      font-size: var(--fontSize-legal);
    }
  `,
} as const;

export const fontWeight: Record<ThemeVars.FontWeight | 'inherit', LinariaClassName> = {
  inherit: css`
    @media ${media.phone} {
      font-weight: inherit;
    }
  `,
  display1: css`
    @media ${media.phone} {
      font-weight: var(--fontWeight-display1);
    }
  `,
  display2: css`
    @media ${media.phone} {
      font-weight: var(--fontWeight-display2);
    }
  `,
  display3: css`
    @media ${media.phone} {
      font-weight: var(--fontWeight-display3);
    }
  `,
  title1: css`
    @media ${media.phone} {
      font-weight: var(--fontWeight-title1);
    }
  `,
  title2: css`
    @media ${media.phone} {
      font-weight: var(--fontWeight-title2);
    }
  `,
  title3: css`
    @media ${media.phone} {
      font-weight: var(--fontWeight-title3);
    }
  `,
  title4: css`
    @media ${media.phone} {
      font-weight: var(--fontWeight-title4);
    }
  `,
  headline: css`
    @media ${media.phone} {
      font-weight: var(--fontWeight-headline);
    }
  `,
  body: css`
    @media ${media.phone} {
      font-weight: var(--fontWeight-body);
    }
  `,
  label1: css`
    @media ${media.phone} {
      font-weight: var(--fontWeight-label1);
    }
  `,
  label2: css`
    @media ${media.phone} {
      font-weight: var(--fontWeight-label2);
    }
  `,
  caption: css`
    @media ${media.phone} {
      font-weight: var(--fontWeight-caption);
    }
  `,
  legal: css`
    @media ${media.phone} {
      font-weight: var(--fontWeight-legal);
    }
  `,
} as const;

export const lineHeight: Record<ThemeVars.LineHeight | 'inherit', LinariaClassName> = {
  inherit: css`
    @media ${media.phone} {
      line-height: inherit;
    }
  `,
  display1: css`
    @media ${media.phone} {
      line-height: var(--lineHeight-display1);
    }
  `,
  display2: css`
    @media ${media.phone} {
      line-height: var(--lineHeight-display2);
    }
  `,
  display3: css`
    @media ${media.phone} {
      line-height: var(--lineHeight-display3);
    }
  `,
  title1: css`
    @media ${media.phone} {
      line-height: var(--lineHeight-title1);
    }
  `,
  title2: css`
    @media ${media.phone} {
      line-height: var(--lineHeight-title2);
    }
  `,
  title3: css`
    @media ${media.phone} {
      line-height: var(--lineHeight-title3);
    }
  `,
  title4: css`
    @media ${media.phone} {
      line-height: var(--lineHeight-title4);
    }
  `,
  headline: css`
    @media ${media.phone} {
      line-height: var(--lineHeight-headline);
    }
  `,
  body: css`
    @media ${media.phone} {
      line-height: var(--lineHeight-body);
    }
  `,
  label1: css`
    @media ${media.phone} {
      line-height: var(--lineHeight-label1);
    }
  `,
  label2: css`
    @media ${media.phone} {
      line-height: var(--lineHeight-label2);
    }
  `,
  caption: css`
    @media ${media.phone} {
      line-height: var(--lineHeight-caption);
    }
  `,
  legal: css`
    @media ${media.phone} {
      line-height: var(--lineHeight-legal);
    }
  `,
} as const;

export const textDecoration = {
  none: css`
    @media ${media.phone} {
      text-decoration: none;
    }
  `,
  underline: css`
    @media ${media.phone} {
      text-decoration: underline;
    }
  `,
  overline: css`
    @media ${media.phone} {
      text-decoration: overline;
    }
  `,
  'line-through': css`
    @media ${media.phone} {
      text-decoration: line-through;
    }
  `,
  'underline overline': css`
    @media ${media.phone} {
      text-decoration: underline overline;
    }
  `,
  'underline double': css`
    @media ${media.phone} {
      text-decoration: underline double;
    }
  `,
} as const;

export const textTransform = {
  none: css`
    @media ${media.phone} {
      text-transform: none;
    }
  `,
  uppercase: css`
    @media ${media.phone} {
      text-transform: uppercase;
    }
  `,
  lowercase: css`
    @media ${media.phone} {
      text-transform: lowercase;
    }
  `,
  capitalize: css`
    @media ${media.phone} {
      text-transform: capitalize;
    }
  `,
} as const;

export const userSelect = {
  none: css`
    @media ${media.phone} {
      user-select: none;
    }
  `,
  text: css`
    @media ${media.phone} {
      user-select: text;
    }
  `,
  all: css`
    @media ${media.phone} {
      user-select: all;
    }
  `,
  auto: css`
    @media ${media.phone} {
      user-select: auto;
    }
  `,
} as const;

export const display = {
  none: css`
    @media ${media.phone} {
      display: none;
    }
  `,
  block: css`
    @media ${media.phone} {
      display: block;
    }
  `,
  inline: css`
    @media ${media.phone} {
      display: inline;
    }
  `,
  'inline-block': css`
    @media ${media.phone} {
      display: inline-block;
    }
  `,
  flex: css`
    @media ${media.phone} {
      display: flex;
    }
  `,
  'inline-flex': css`
    @media ${media.phone} {
      display: inline-flex;
    }
  `,
  grid: css`
    @media ${media.phone} {
      display: grid;
    }
  `,
  'inline-grid': css`
    @media ${media.phone} {
      display: inline-grid;
    }
  `,
  contents: css`
    @media ${media.phone} {
      display: contents;
    }
  `,
  'flow-root': css`
    @media ${media.phone} {
      display: flow-root;
    }
  `,
  revert: css`
    @media ${media.phone} {
      display: revert;
    }
  `,
  'list-item': css`
    @media ${media.phone} {
      display: list-item;
    }
  `,
} as const;

export const overflow = {
  auto: css`
    @media ${media.phone} {
      overflow: auto;
    }
  `,
  visible: css`
    @media ${media.phone} {
      overflow: visible;
    }
  `,
  hidden: css`
    @media ${media.phone} {
      overflow: hidden;
    }
  `,
  clip: css`
    @media ${media.phone} {
      overflow: clip;
    }
  `,
  scroll: css`
    @media ${media.phone} {
      overflow: scroll;
    }
  `,
} as const;

export const gap = {
  '0': css`
    @media ${media.phone} {
      gap: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.phone} {
      gap: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.phone} {
      gap: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.phone} {
      gap: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.phone} {
      gap: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.phone} {
      gap: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.phone} {
      gap: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.phone} {
      gap: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.phone} {
      gap: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.phone} {
      gap: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.phone} {
      gap: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.phone} {
      gap: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.phone} {
      gap: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.phone} {
      gap: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.phone} {
      gap: var(--space-10);
    }
  `,
} as const;

export const columnGap = {
  '0': css`
    @media ${media.phone} {
      column-gap: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.phone} {
      column-gap: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.phone} {
      column-gap: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.phone} {
      column-gap: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.phone} {
      column-gap: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.phone} {
      column-gap: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.phone} {
      column-gap: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.phone} {
      column-gap: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.phone} {
      column-gap: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.phone} {
      column-gap: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.phone} {
      column-gap: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.phone} {
      column-gap: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.phone} {
      column-gap: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.phone} {
      column-gap: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.phone} {
      column-gap: var(--space-10);
    }
  `,
} as const;

export const rowGap = {
  '0': css`
    @media ${media.phone} {
      row-gap: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.phone} {
      row-gap: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.phone} {
      row-gap: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.phone} {
      row-gap: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.phone} {
      row-gap: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.phone} {
      row-gap: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.phone} {
      row-gap: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.phone} {
      row-gap: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.phone} {
      row-gap: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.phone} {
      row-gap: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.phone} {
      row-gap: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.phone} {
      row-gap: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.phone} {
      row-gap: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.phone} {
      row-gap: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.phone} {
      row-gap: var(--space-10);
    }
  `,
} as const;

export const justifyContent = {
  normal: css`
    @media ${media.phone} {
      justify-content: normal;
    }
  `,
  center: css`
    @media ${media.phone} {
      justify-content: center;
    }
  `,
  start: css`
    @media ${media.phone} {
      justify-content: start;
    }
  `,
  end: css`
    @media ${media.phone} {
      justify-content: end;
    }
  `,
  'flex-start': css`
    @media ${media.phone} {
      justify-content: flex-start;
    }
  `,
  'flex-end': css`
    @media ${media.phone} {
      justify-content: flex-end;
    }
  `,
  left: css`
    @media ${media.phone} {
      justify-content: left;
    }
  `,
  right: css`
    @media ${media.phone} {
      justify-content: right;
    }
  `,
  'space-between': css`
    @media ${media.phone} {
      justify-content: space-between;
    }
  `,
  'space-around': css`
    @media ${media.phone} {
      justify-content: space-around;
    }
  `,
  'space-evenly': css`
    @media ${media.phone} {
      justify-content: space-evenly;
    }
  `,
  stretch: css`
    @media ${media.phone} {
      justify-content: stretch;
    }
  `,
} as const;

export const alignContent = {
  normal: css`
    @media ${media.phone} {
      align-content: normal;
    }
  `,
  center: css`
    @media ${media.phone} {
      align-content: center;
    }
  `,
  start: css`
    @media ${media.phone} {
      align-content: start;
    }
  `,
  end: css`
    @media ${media.phone} {
      align-content: end;
    }
  `,
  'flex-start': css`
    @media ${media.phone} {
      align-content: flex-start;
    }
  `,
  'flex-end': css`
    @media ${media.phone} {
      align-content: flex-end;
    }
  `,
  'space-between': css`
    @media ${media.phone} {
      align-content: space-between;
    }
  `,
  'space-around': css`
    @media ${media.phone} {
      align-content: space-around;
    }
  `,
  'space-evenly': css`
    @media ${media.phone} {
      align-content: space-evenly;
    }
  `,
  stretch: css`
    @media ${media.phone} {
      align-content: stretch;
    }
  `,
  baseline: css`
    @media ${media.phone} {
      align-content: baseline;
    }
  `,
  'first baseline': css`
    @media ${media.phone} {
      align-content: first baseline;
    }
  `,
  'last baseline': css`
    @media ${media.phone} {
      align-content: last baseline;
    }
  `,
} as const;

export const alignItems = {
  normal: css`
    @media ${media.phone} {
      align-items: normal;
    }
  `,
  center: css`
    @media ${media.phone} {
      align-items: center;
    }
  `,
  start: css`
    @media ${media.phone} {
      align-items: start;
    }
  `,
  end: css`
    @media ${media.phone} {
      align-items: end;
    }
  `,
  'flex-start': css`
    @media ${media.phone} {
      align-items: flex-start;
    }
  `,
  'flex-end': css`
    @media ${media.phone} {
      align-items: flex-end;
    }
  `,
  'self-start': css`
    @media ${media.phone} {
      align-items: self-start;
    }
  `,
  'self-end': css`
    @media ${media.phone} {
      align-items: self-end;
    }
  `,
  stretch: css`
    @media ${media.phone} {
      align-items: stretch;
    }
  `,
  baseline: css`
    @media ${media.phone} {
      align-items: baseline;
    }
  `,
  'first baseline': css`
    @media ${media.phone} {
      align-items: first baseline;
    }
  `,
  'last baseline': css`
    @media ${media.phone} {
      align-items: last baseline;
    }
  `,
} as const;

export const alignSelf = {
  auto: css`
    @media ${media.phone} {
      align-self: auto;
    }
  `,
  normal: css`
    @media ${media.phone} {
      align-self: normal;
    }
  `,
  center: css`
    @media ${media.phone} {
      align-self: center;
    }
  `,
  start: css`
    @media ${media.phone} {
      align-self: start;
    }
  `,
  end: css`
    @media ${media.phone} {
      align-self: end;
    }
  `,
  'flex-start': css`
    @media ${media.phone} {
      align-self: flex-start;
    }
  `,
  'flex-end': css`
    @media ${media.phone} {
      align-self: flex-end;
    }
  `,
  'self-start': css`
    @media ${media.phone} {
      align-self: self-start;
    }
  `,
  'self-end': css`
    @media ${media.phone} {
      align-self: self-end;
    }
  `,
  stretch: css`
    @media ${media.phone} {
      align-self: stretch;
    }
  `,
  baseline: css`
    @media ${media.phone} {
      align-self: baseline;
    }
  `,
  'first baseline': css`
    @media ${media.phone} {
      align-self: first baseline;
    }
  `,
  'last baseline': css`
    @media ${media.phone} {
      align-self: last baseline;
    }
  `,
} as const;

export const flexDirection = {
  row: css`
    @media ${media.phone} {
      flex-direction: row;
    }
  `,
  'row-reverse': css`
    @media ${media.phone} {
      flex-direction: row-reverse;
    }
  `,
  column: css`
    @media ${media.phone} {
      flex-direction: column;
    }
  `,
  'column-reverse': css`
    @media ${media.phone} {
      flex-direction: column-reverse;
    }
  `,
} as const;

export const flexWrap = {
  nowrap: css`
    @media ${media.phone} {
      flex-wrap: nowrap;
    }
  `,
  wrap: css`
    @media ${media.phone} {
      flex-wrap: wrap;
    }
  `,
  'wrap-reverse': css`
    @media ${media.phone} {
      flex-wrap: wrap-reverse;
    }
  `,
} as const;

export const position = {
  static: css`
    @media ${media.phone} {
      position: static;
    }
  `,
  relative: css`
    @media ${media.phone} {
      position: relative;
    }
  `,
  absolute: css`
    @media ${media.phone} {
      position: absolute;
    }
  `,
  fixed: css`
    @media ${media.phone} {
      position: fixed;
    }
  `,
  sticky: css`
    @media ${media.phone} {
      position: sticky;
    }
  `,
} as const;

export const padding: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      padding-top: var(--space-0);
      padding-bottom: var(--space-0);
      padding-inline-start: var(--space-0);
      padding-inline-end: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.phone} {
      padding-top: var(--space-0_25);
      padding-bottom: var(--space-0_25);
      padding-inline-start: var(--space-0_25);
      padding-inline-end: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.phone} {
      padding-top: var(--space-0_5);
      padding-bottom: var(--space-0_5);
      padding-inline-start: var(--space-0_5);
      padding-inline-end: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.phone} {
      padding-top: var(--space-0_75);
      padding-bottom: var(--space-0_75);
      padding-inline-start: var(--space-0_75);
      padding-inline-end: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.phone} {
      padding-top: var(--space-1);
      padding-bottom: var(--space-1);
      padding-inline-start: var(--space-1);
      padding-inline-end: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.phone} {
      padding-top: var(--space-1_5);
      padding-bottom: var(--space-1_5);
      padding-inline-start: var(--space-1_5);
      padding-inline-end: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.phone} {
      padding-top: var(--space-2);
      padding-bottom: var(--space-2);
      padding-inline-start: var(--space-2);
      padding-inline-end: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.phone} {
      padding-top: var(--space-3);
      padding-bottom: var(--space-3);
      padding-inline-start: var(--space-3);
      padding-inline-end: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.phone} {
      padding-top: var(--space-4);
      padding-bottom: var(--space-4);
      padding-inline-start: var(--space-4);
      padding-inline-end: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.phone} {
      padding-top: var(--space-5);
      padding-bottom: var(--space-5);
      padding-inline-start: var(--space-5);
      padding-inline-end: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.phone} {
      padding-top: var(--space-6);
      padding-bottom: var(--space-6);
      padding-inline-start: var(--space-6);
      padding-inline-end: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.phone} {
      padding-top: var(--space-7);
      padding-bottom: var(--space-7);
      padding-inline-start: var(--space-7);
      padding-inline-end: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.phone} {
      padding-top: var(--space-8);
      padding-bottom: var(--space-8);
      padding-inline-start: var(--space-8);
      padding-inline-end: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.phone} {
      padding-top: var(--space-9);
      padding-bottom: var(--space-9);
      padding-inline-start: var(--space-9);
      padding-inline-end: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.phone} {
      padding-top: var(--space-10);
      padding-bottom: var(--space-10);
      padding-inline-start: var(--space-10);
      padding-inline-end: var(--space-10);
    }
  `,
} as const;

export const paddingX: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-0);
      padding-inline-end: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-0_25);
      padding-inline-end: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-0_5);
      padding-inline-end: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-0_75);
      padding-inline-end: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-1);
      padding-inline-end: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-1_5);
      padding-inline-end: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-2);
      padding-inline-end: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-3);
      padding-inline-end: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-4);
      padding-inline-end: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-5);
      padding-inline-end: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-6);
      padding-inline-end: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-7);
      padding-inline-end: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-8);
      padding-inline-end: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-9);
      padding-inline-end: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-10);
      padding-inline-end: var(--space-10);
    }
  `,
} as const;

export const paddingY: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      padding-top: var(--space-0);
      padding-bottom: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.phone} {
      padding-top: var(--space-0_25);
      padding-bottom: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.phone} {
      padding-top: var(--space-0_5);
      padding-bottom: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.phone} {
      padding-top: var(--space-0_75);
      padding-bottom: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.phone} {
      padding-top: var(--space-1);
      padding-bottom: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.phone} {
      padding-top: var(--space-1_5);
      padding-bottom: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.phone} {
      padding-top: var(--space-2);
      padding-bottom: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.phone} {
      padding-top: var(--space-3);
      padding-bottom: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.phone} {
      padding-top: var(--space-4);
      padding-bottom: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.phone} {
      padding-top: var(--space-5);
      padding-bottom: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.phone} {
      padding-top: var(--space-6);
      padding-bottom: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.phone} {
      padding-top: var(--space-7);
      padding-bottom: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.phone} {
      padding-top: var(--space-8);
      padding-bottom: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.phone} {
      padding-top: var(--space-9);
      padding-bottom: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.phone} {
      padding-top: var(--space-10);
      padding-bottom: var(--space-10);
    }
  `,
} as const;

export const paddingTop: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      padding-top: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.phone} {
      padding-top: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.phone} {
      padding-top: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.phone} {
      padding-top: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.phone} {
      padding-top: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.phone} {
      padding-top: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.phone} {
      padding-top: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.phone} {
      padding-top: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.phone} {
      padding-top: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.phone} {
      padding-top: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.phone} {
      padding-top: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.phone} {
      padding-top: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.phone} {
      padding-top: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.phone} {
      padding-top: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.phone} {
      padding-top: var(--space-10);
    }
  `,
} as const;

export const paddingBottom: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      padding-bottom: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.phone} {
      padding-bottom: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.phone} {
      padding-bottom: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.phone} {
      padding-bottom: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.phone} {
      padding-bottom: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.phone} {
      padding-bottom: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.phone} {
      padding-bottom: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.phone} {
      padding-bottom: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.phone} {
      padding-bottom: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.phone} {
      padding-bottom: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.phone} {
      padding-bottom: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.phone} {
      padding-bottom: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.phone} {
      padding-bottom: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.phone} {
      padding-bottom: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.phone} {
      padding-bottom: var(--space-10);
    }
  `,
} as const;

export const paddingStart: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.phone} {
      padding-inline-start: var(--space-10);
    }
  `,
} as const;

export const paddingEnd: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      padding-inline-end: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.phone} {
      padding-inline-end: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.phone} {
      padding-inline-end: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.phone} {
      padding-inline-end: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.phone} {
      padding-inline-end: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.phone} {
      padding-inline-end: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.phone} {
      padding-inline-end: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.phone} {
      padding-inline-end: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.phone} {
      padding-inline-end: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.phone} {
      padding-inline-end: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.phone} {
      padding-inline-end: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.phone} {
      padding-inline-end: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.phone} {
      padding-inline-end: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.phone} {
      padding-inline-end: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.phone} {
      padding-inline-end: var(--space-10);
    }
  `,
} as const;

export const margin: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-0));
      margin-bottom: calc(-1 * var(--space-0));
      margin-inline-end: calc(-1 * var(--space-0));
      margin-inline-start: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-0_25));
      margin-bottom: calc(-1 * var(--space-0_25));
      margin-inline-end: calc(-1 * var(--space-0_25));
      margin-inline-start: calc(-1 * var(--space-0_25));
    }
  `,
  '-0.5': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-0_5));
      margin-bottom: calc(-1 * var(--space-0_5));
      margin-inline-end: calc(-1 * var(--space-0_5));
      margin-inline-start: calc(-1 * var(--space-0_5));
    }
  `,
  '-0.75': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-0_75));
      margin-bottom: calc(-1 * var(--space-0_75));
      margin-inline-end: calc(-1 * var(--space-0_75));
      margin-inline-start: calc(-1 * var(--space-0_75));
    }
  `,
  '-1': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-1));
      margin-bottom: calc(-1 * var(--space-1));
      margin-inline-end: calc(-1 * var(--space-1));
      margin-inline-start: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-1_5));
      margin-bottom: calc(-1 * var(--space-1_5));
      margin-inline-end: calc(-1 * var(--space-1_5));
      margin-inline-start: calc(-1 * var(--space-1_5));
    }
  `,
  '-2': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-2));
      margin-bottom: calc(-1 * var(--space-2));
      margin-inline-end: calc(-1 * var(--space-2));
      margin-inline-start: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-3));
      margin-bottom: calc(-1 * var(--space-3));
      margin-inline-end: calc(-1 * var(--space-3));
      margin-inline-start: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-4));
      margin-bottom: calc(-1 * var(--space-4));
      margin-inline-end: calc(-1 * var(--space-4));
      margin-inline-start: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-5));
      margin-bottom: calc(-1 * var(--space-5));
      margin-inline-end: calc(-1 * var(--space-5));
      margin-inline-start: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-6));
      margin-bottom: calc(-1 * var(--space-6));
      margin-inline-end: calc(-1 * var(--space-6));
      margin-inline-start: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-7));
      margin-bottom: calc(-1 * var(--space-7));
      margin-inline-end: calc(-1 * var(--space-7));
      margin-inline-start: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-8));
      margin-bottom: calc(-1 * var(--space-8));
      margin-inline-end: calc(-1 * var(--space-8));
      margin-inline-start: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-9));
      margin-bottom: calc(-1 * var(--space-9));
      margin-inline-end: calc(-1 * var(--space-9));
      margin-inline-start: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-10));
      margin-bottom: calc(-1 * var(--space-10));
      margin-inline-end: calc(-1 * var(--space-10));
      margin-inline-start: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginX: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-0));
      margin-inline-start: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-0_25));
      margin-inline-start: calc(-1 * var(--space-0_25));
    }
  `,
  '-0.5': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-0_5));
      margin-inline-start: calc(-1 * var(--space-0_5));
    }
  `,
  '-0.75': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-0_75));
      margin-inline-start: calc(-1 * var(--space-0_75));
    }
  `,
  '-1': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-1));
      margin-inline-start: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-1_5));
      margin-inline-start: calc(-1 * var(--space-1_5));
    }
  `,
  '-2': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-2));
      margin-inline-start: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-3));
      margin-inline-start: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-4));
      margin-inline-start: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-5));
      margin-inline-start: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-6));
      margin-inline-start: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-7));
      margin-inline-start: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-8));
      margin-inline-start: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-9));
      margin-inline-start: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-10));
      margin-inline-start: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginY: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-0));
      margin-bottom: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-0_25));
      margin-bottom: calc(-1 * var(--space-0_25));
    }
  `,
  '-0.5': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-0_5));
      margin-bottom: calc(-1 * var(--space-0_5));
    }
  `,
  '-0.75': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-0_75));
      margin-bottom: calc(-1 * var(--space-0_75));
    }
  `,
  '-1': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-1));
      margin-bottom: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-1_5));
      margin-bottom: calc(-1 * var(--space-1_5));
    }
  `,
  '-2': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-2));
      margin-bottom: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-3));
      margin-bottom: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-4));
      margin-bottom: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-5));
      margin-bottom: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-6));
      margin-bottom: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-7));
      margin-bottom: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-8));
      margin-bottom: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-9));
      margin-bottom: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-10));
      margin-bottom: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginTop: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-0_25));
    }
  `,
  '-0.5': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-0_5));
    }
  `,
  '-0.75': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-0_75));
    }
  `,
  '-1': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-1_5));
    }
  `,
  '-2': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media ${media.phone} {
      margin-top: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginBottom: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      margin-bottom: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media ${media.phone} {
      margin-bottom: calc(-1 * var(--space-0_25));
    }
  `,
  '-0.5': css`
    @media ${media.phone} {
      margin-bottom: calc(-1 * var(--space-0_5));
    }
  `,
  '-0.75': css`
    @media ${media.phone} {
      margin-bottom: calc(-1 * var(--space-0_75));
    }
  `,
  '-1': css`
    @media ${media.phone} {
      margin-bottom: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media ${media.phone} {
      margin-bottom: calc(-1 * var(--space-1_5));
    }
  `,
  '-2': css`
    @media ${media.phone} {
      margin-bottom: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media ${media.phone} {
      margin-bottom: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media ${media.phone} {
      margin-bottom: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media ${media.phone} {
      margin-bottom: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media ${media.phone} {
      margin-bottom: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media ${media.phone} {
      margin-bottom: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media ${media.phone} {
      margin-bottom: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media ${media.phone} {
      margin-bottom: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media ${media.phone} {
      margin-bottom: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginEnd: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-0_25));
    }
  `,
  '-0.5': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-0_5));
    }
  `,
  '-0.75': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-0_75));
    }
  `,
  '-1': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-1_5));
    }
  `,
  '-2': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media ${media.phone} {
      margin-inline-end: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginStart: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media ${media.phone} {
      margin-inline-start: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media ${media.phone} {
      margin-inline-start: calc(-1 * var(--space-0_25));
    }
  `,
  '-0.5': css`
    @media ${media.phone} {
      margin-inline-start: calc(-1 * var(--space-0_5));
    }
  `,
  '-0.75': css`
    @media ${media.phone} {
      margin-inline-start: calc(-1 * var(--space-0_75));
    }
  `,
  '-1': css`
    @media ${media.phone} {
      margin-inline-start: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media ${media.phone} {
      margin-inline-start: calc(-1 * var(--space-1_5));
    }
  `,
  '-2': css`
    @media ${media.phone} {
      margin-inline-start: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media ${media.phone} {
      margin-inline-start: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media ${media.phone} {
      margin-inline-start: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media ${media.phone} {
      margin-inline-start: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media ${media.phone} {
      margin-inline-start: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media ${media.phone} {
      margin-inline-start: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media ${media.phone} {
      margin-inline-start: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media ${media.phone} {
      margin-inline-start: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media ${media.phone} {
      margin-inline-start: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const textAlign = {
  start: css`
    @media ${media.phone} {
      text-align: start;
    }
  `,
  end: css`
    @media ${media.phone} {
      text-align: end;
    }
  `,
  center: css`
    @media ${media.phone} {
      text-align: center;
    }
  `,
  justify: css`
    @media ${media.phone} {
      text-align: justify;
    }
  `,
} as const;

export const visibility = {
  hidden: css`
    @media ${media.phone} {
      visibility: hidden;
    }
  `,
  visible: css`
    @media ${media.phone} {
      visibility: visible;
    }
  `,
} as const;
