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
    @media ${media.tablet} {
      width: var(--tablet-width);
    }
  `,
  height: css`
    @media ${media.tablet} {
      height: var(--tablet-height);
    }
  `,
  minWidth: css`
    @media ${media.tablet} {
      min-width: var(--tablet-minWidth);
    }
  `,
  minHeight: css`
    @media ${media.tablet} {
      min-height: var(--tablet-minHeight);
    }
  `,
  maxWidth: css`
    @media ${media.tablet} {
      max-width: var(--tablet-maxWidth);
    }
  `,
  maxHeight: css`
    @media ${media.tablet} {
      max-height: var(--tablet-maxHeight);
    }
  `,
  aspectRatio: css`
    @media ${media.tablet} {
      aspect-ratio: var(--tablet-aspectRatio);
    }
  `,
  top: css`
    @media ${media.tablet} {
      top: var(--tablet-top);
    }
  `,
  bottom: css`
    @media ${media.tablet} {
      bottom: var(--tablet-bottom);
    }
  `,
  left: css`
    @media ${media.tablet} {
      left: var(--tablet-left);
    }
  `,
  right: css`
    @media ${media.tablet} {
      right: var(--tablet-right);
    }
  `,
  transform: css`
    @media ${media.tablet} {
      transform: var(--tablet-transform);
    }
  `,
  flexBasis: css`
    @media ${media.tablet} {
      flex-basis: var(--tablet-flexBasis);
    }
  `,
  flexShrink: css`
    @media ${media.tablet} {
      flex-shrink: var(--tablet-flexShrink);
    }
  `,
  flexGrow: css`
    @media ${media.tablet} {
      flex-grow: var(--tablet-flexGrow);
    }
  `,
  gridTemplateColumns: css`
    @media ${media.tablet} {
      grid-template-columns: var(--tablet-gridTemplateColumns);
    }
  `,
  gridTemplateRows: css`
    @media ${media.tablet} {
      grid-template-rows: var(--tablet-gridTemplateRows);
    }
  `,
  gridTemplateAreas: css`
    @media ${media.tablet} {
      grid-template-areas: var(--tablet-gridTemplateAreas);
    }
  `,
  gridTemplate: css`
    @media ${media.tablet} {
      grid-template: var(--tablet-gridTemplate);
    }
  `,
  gridAutoColumns: css`
    @media ${media.tablet} {
      grid-auto-columns: var(--tablet-gridAutoColumns);
    }
  `,
  gridAutoRows: css`
    @media ${media.tablet} {
      grid-auto-rows: var(--tablet-gridAutoRows);
    }
  `,
  gridAutoFlow: css`
    @media ${media.tablet} {
      grid-auto-flow: var(--tablet-gridAutoFlow);
    }
  `,
  grid: css`
    @media ${media.tablet} {
      grid: var(--tablet-grid);
    }
  `,
  gridRowStart: css`
    @media ${media.tablet} {
      grid-row-start: var(--tablet-gridRowStart);
    }
  `,
  gridColumnStart: css`
    @media ${media.tablet} {
      grid-column-start: var(--tablet-gridColumnStart);
    }
  `,
  gridRowEnd: css`
    @media ${media.tablet} {
      grid-row-end: var(--tablet-gridRowEnd);
    }
  `,
  gridColumnEnd: css`
    @media ${media.tablet} {
      grid-column-end: var(--tablet-gridColumnEnd);
    }
  `,
  gridRow: css`
    @media ${media.tablet} {
      grid-row: var(--tablet-gridRow);
    }
  `,
  gridColumn: css`
    @media ${media.tablet} {
      grid-column: var(--tablet-gridColumn);
    }
  `,
  gridArea: css`
    @media ${media.tablet} {
      grid-area: var(--tablet-gridArea);
    }
  `,
  opacity: css`
    @media ${media.tablet} {
      opacity: var(--tablet-opacity);
    }
  `,
  zIndex: css`
    @media ${media.tablet} {
      z-index: var(--tablet-zIndex);
    }
  `,
} as const;

export const elevation: Record<ThemeVars.Elevation, LinariaClassName> = {
  '0': css``,
  '1': css`
    @media ${media.tablet} {
      background-color: var(--color-bgElevation1);
      box-shadow: var(--shadow-elevation1);
    }
  `,
  '2': css`
    @media ${media.tablet} {
      background-color: var(--color-bgElevation2);
      box-shadow: var(--shadow-elevation2);
    }
  `,
} as const;

export const color: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  fg: css`
    @media ${media.tablet} {
      color: var(--color-fg);
    }
  `,
  fgInverse: css`
    @media ${media.tablet} {
      color: var(--color-fgInverse);
    }
  `,
  fgMuted: css`
    @media ${media.tablet} {
      color: var(--color-fgMuted);
    }
  `,
  fgPrimary: css`
    @media ${media.tablet} {
      color: var(--color-fgPrimary);
    }
  `,
  fgPositive: css`
    @media ${media.tablet} {
      color: var(--color-fgPositive);
    }
  `,
  fgNegative: css`
    @media ${media.tablet} {
      color: var(--color-fgNegative);
    }
  `,
  fgWarning: css`
    @media ${media.tablet} {
      color: var(--color-fgWarning);
    }
  `,
  // Background
  bg: css`
    @media ${media.tablet} {
      color: var(--color-bg);
    }
  `,
  bgAlternate: css`
    @media ${media.tablet} {
      color: var(--color-bgAlternate);
    }
  `,
  bgInverse: css`
    @media ${media.tablet} {
      color: var(--color-bgInverse);
    }
  `,
  bgOverlay: css`
    @media ${media.tablet} {
      color: var(--color-bgOverlay);
    }
  `,
  bgPrimary: css`
    @media ${media.tablet} {
      color: var(--color-bgPrimary);
    }
  `,
  bgPrimaryWash: css`
    @media ${media.tablet} {
      color: var(--color-bgPrimaryWash);
    }
  `,
  bgSecondary: css`
    @media ${media.tablet} {
      color: var(--color-bgSecondary);
    }
  `,
  bgTertiary: css`
    @media ${media.tablet} {
      color: var(--color-bgTertiary);
    }
  `,
  bgSecondaryWash: css`
    @media ${media.tablet} {
      color: var(--color-bgSecondaryWash);
    }
  `,
  bgNegative: css`
    @media ${media.tablet} {
      color: var(--color-bgNegative);
    }
  `,
  bgNegativeWash: css`
    @media ${media.tablet} {
      color: var(--color-bgNegativeWash);
    }
  `,
  bgPositive: css`
    @media ${media.tablet} {
      color: var(--color-bgPositive);
    }
  `,
  bgPositiveWash: css`
    @media ${media.tablet} {
      color: var(--color-bgPositiveWash);
    }
  `,
  bgWarning: css`
    @media ${media.tablet} {
      color: var(--color-bgWarning);
    }
  `,
  bgWarningWash: css`
    @media ${media.tablet} {
      color: var(--color-bgWarningWash);
    }
  `,
  currentColor: css`
    @media ${media.tablet} {
      color: var(--color-currentColor);
    }
  `,
  // Line
  bgLine: css`
    @media ${media.tablet} {
      color: var(--color-bgLine);
    }
  `,
  bgLineInverse: css`
    @media ${media.tablet} {
      color: var(--color-bgLineInverse);
    }
  `,
  bgLineHeavy: css`
    @media ${media.tablet} {
      color: var(--color-bgLineHeavy);
    }
  `,
  bgLinePrimary: css`
    @media ${media.tablet} {
      color: var(--color-bgLinePrimary);
    }
  `,
  bgLinePrimarySubtle: css`
    @media ${media.tablet} {
      color: var(--color-bgLinePrimarySubtle);
    }
  `,
  // Elevation
  bgElevation1: css`
    @media ${media.tablet} {
      color: var(--color-bgElevation1);
    }
  `,
  bgElevation2: css`
    @media ${media.tablet} {
      color: var(--color-bgElevation2);
    }
  `,
  // Accent
  accentSubtleGreen: css`
    @media ${media.tablet} {
      color: var(--color-accentSubtleGreen);
    }
  `,
  accentBoldGreen: css`
    @media ${media.tablet} {
      color: var(--color-accentBoldGreen);
    }
  `,
  accentSubtleBlue: css`
    @media ${media.tablet} {
      color: var(--color-accentSubtleBlue);
    }
  `,
  accentBoldBlue: css`
    @media ${media.tablet} {
      color: var(--color-accentBoldBlue);
    }
  `,
  accentSubtlePurple: css`
    @media ${media.tablet} {
      color: var(--color-accentSubtlePurple);
    }
  `,
  accentBoldPurple: css`
    @media ${media.tablet} {
      color: var(--color-accentBoldPurple);
    }
  `,
  accentSubtleYellow: css`
    @media ${media.tablet} {
      color: var(--color-accentSubtleYellow);
    }
  `,
  accentBoldYellow: css`
    @media ${media.tablet} {
      color: var(--color-accentBoldYellow);
    }
  `,
  accentSubtleRed: css`
    @media ${media.tablet} {
      color: var(--color-accentSubtleRed);
    }
  `,
  accentBoldRed: css`
    @media ${media.tablet} {
      color: var(--color-accentBoldRed);
    }
  `,
  accentSubtleGray: css`
    @media ${media.tablet} {
      color: var(--color-accentSubtleGray);
    }
  `,
  accentBoldGray: css`
    @media ${media.tablet} {
      color: var(--color-accentBoldGray);
    }
  `,
  transparent: css`
    @media ${media.tablet} {
      color: var(--color-transparent);
    }
  `,
} as const;

export const background: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  fg: css`
    @media ${media.tablet} {
      background-color: var(--color-fg);
    }
  `,
  fgInverse: css`
    @media ${media.tablet} {
      background-color: var(--color-fgInverse);
    }
  `,
  fgMuted: css`
    @media ${media.tablet} {
      background-color: var(--color-fgMuted);
    }
  `,
  fgPrimary: css`
    @media ${media.tablet} {
      background-color: var(--color-fgPrimary);
    }
  `,
  fgPositive: css`
    @media ${media.tablet} {
      background-color: var(--color-fgPositive);
    }
  `,
  fgNegative: css`
    @media ${media.tablet} {
      background-color: var(--color-fgNegative);
    }
  `,
  fgWarning: css`
    @media ${media.tablet} {
      background-color: var(--color-fgWarning);
    }
  `,
  // Background
  bg: css`
    @media ${media.tablet} {
      background-color: var(--color-bg);
    }
  `,
  bgAlternate: css`
    @media ${media.tablet} {
      background-color: var(--color-bgAlternate);
    }
  `,
  bgInverse: css`
    @media ${media.tablet} {
      background-color: var(--color-bgInverse);
    }
  `,
  bgOverlay: css`
    @media ${media.tablet} {
      background-color: var(--color-bgOverlay);
    }
  `,
  bgPrimary: css`
    @media ${media.tablet} {
      background-color: var(--color-bgPrimary);
    }
  `,
  bgPrimaryWash: css`
    @media ${media.tablet} {
      background-color: var(--color-bgPrimaryWash);
    }
  `,
  bgSecondary: css`
    @media ${media.tablet} {
      background-color: var(--color-bgSecondary);
    }
  `,
  bgTertiary: css`
    @media ${media.tablet} {
      background-color: var(--color-bgTertiary);
    }
  `,
  bgSecondaryWash: css`
    @media ${media.tablet} {
      background-color: var(--color-bgSecondaryWash);
    }
  `,
  bgNegative: css`
    @media ${media.tablet} {
      background-color: var(--color-bgNegative);
    }
  `,
  bgNegativeWash: css`
    @media ${media.tablet} {
      background-color: var(--color-bgNegativeWash);
    }
  `,
  bgPositive: css`
    @media ${media.tablet} {
      background-color: var(--color-bgPositive);
    }
  `,
  bgPositiveWash: css`
    @media ${media.tablet} {
      background-color: var(--color-bgPositiveWash);
    }
  `,
  bgWarning: css`
    @media ${media.tablet} {
      background-color: var(--color-bgWarning);
    }
  `,
  bgWarningWash: css`
    @media ${media.tablet} {
      background-color: var(--color-bgWarningWash);
    }
  `,
  currentColor: css`
    @media ${media.tablet} {
      background-color: var(--color-currentColor);
    }
  `,
  // Line
  bgLine: css`
    @media ${media.tablet} {
      background-color: var(--color-bgLine);
    }
  `,
  bgLineInverse: css`
    @media ${media.tablet} {
      background-color: var(--color-bgLineInverse);
    }
  `,
  bgLineHeavy: css`
    @media ${media.tablet} {
      background-color: var(--color-bgLineHeavy);
    }
  `,
  bgLinePrimary: css`
    @media ${media.tablet} {
      background-color: var(--color-bgLinePrimary);
    }
  `,
  bgLinePrimarySubtle: css`
    @media ${media.tablet} {
      background-color: var(--color-bgLinePrimarySubtle);
    }
  `,
  // Elevation
  bgElevation1: css`
    @media ${media.tablet} {
      background-color: var(--color-bgElevation1);
    }
  `,
  bgElevation2: css`
    @media ${media.tablet} {
      background-color: var(--color-bgElevation2);
    }
  `,
  // Accent
  accentSubtleGreen: css`
    @media ${media.tablet} {
      background-color: var(--color-accentSubtleGreen);
    }
  `,
  accentBoldGreen: css`
    @media ${media.tablet} {
      background-color: var(--color-accentBoldGreen);
    }
  `,
  accentSubtleBlue: css`
    @media ${media.tablet} {
      background-color: var(--color-accentSubtleBlue);
    }
  `,
  accentBoldBlue: css`
    @media ${media.tablet} {
      background-color: var(--color-accentBoldBlue);
    }
  `,
  accentSubtlePurple: css`
    @media ${media.tablet} {
      background-color: var(--color-accentSubtlePurple);
    }
  `,
  accentBoldPurple: css`
    @media ${media.tablet} {
      background-color: var(--color-accentBoldPurple);
    }
  `,
  accentSubtleYellow: css`
    @media ${media.tablet} {
      background-color: var(--color-accentSubtleYellow);
    }
  `,
  accentBoldYellow: css`
    @media ${media.tablet} {
      background-color: var(--color-accentBoldYellow);
    }
  `,
  accentSubtleRed: css`
    @media ${media.tablet} {
      background-color: var(--color-accentSubtleRed);
    }
  `,
  accentBoldRed: css`
    @media ${media.tablet} {
      background-color: var(--color-accentBoldRed);
    }
  `,
  accentSubtleGray: css`
    @media ${media.tablet} {
      background-color: var(--color-accentSubtleGray);
    }
  `,
  accentBoldGray: css`
    @media ${media.tablet} {
      background-color: var(--color-accentBoldGray);
    }
  `,
  transparent: css`
    @media ${media.tablet} {
      background-color: var(--color-transparent);
    }
  `,
} as const;

export const borderColor: Record<ThemeVars.Color, LinariaClassName> = {
  // Text
  fg: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-fg);
    }
  `,
  fgInverse: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-fgInverse);
    }
  `,
  fgMuted: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-fgMuted);
    }
  `,
  fgPrimary: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-fgPrimary);
    }
  `,
  fgPositive: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-fgPositive);
    }
  `,
  fgNegative: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-fgNegative);
    }
  `,
  fgWarning: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-fgWarning);
    }
  `,
  // Background
  bg: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-bg);
    }
  `,
  bgAlternate: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-bgAlternate);
    }
  `,
  bgInverse: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-bgInverse);
    }
  `,
  bgOverlay: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-bgOverlay);
    }
  `,
  bgPrimary: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-bgPrimary);
    }
  `,
  bgPrimaryWash: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-bgPrimaryWash);
    }
  `,
  bgSecondary: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-bgSecondary);
    }
  `,
  bgTertiary: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-bgTertiary);
    }
  `,
  bgSecondaryWash: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-bgSecondaryWash);
    }
  `,
  bgNegative: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-bgNegative);
    }
  `,
  bgNegativeWash: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-bgNegativeWash);
    }
  `,
  bgPositive: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-bgPositive);
    }
  `,
  bgPositiveWash: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-bgPositiveWash);
    }
  `,
  bgWarning: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-bgWarning);
    }
  `,
  bgWarningWash: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-bgWarningWash);
    }
  `,
  currentColor: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-currentColor);
    }
  `,
  // Line
  bgLine: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-bgLine);
    }
  `,
  bgLineInverse: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-bgLineInverse);
    }
  `,
  bgLineHeavy: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-bgLineHeavy);
    }
  `,
  bgLinePrimary: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-bgLinePrimary);
    }
  `,
  bgLinePrimarySubtle: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-bgLinePrimarySubtle);
    }
  `,
  // Elevation
  bgElevation1: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-bgElevation1);
    }
  `,
  bgElevation2: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-bgElevation2);
    }
  `,
  // Accent
  accentSubtleGreen: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-accentSubtleGreen);
    }
  `,
  accentBoldGreen: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-accentBoldGreen);
    }
  `,
  accentSubtleBlue: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-accentSubtleBlue);
    }
  `,
  accentBoldBlue: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-accentBoldBlue);
    }
  `,
  accentSubtlePurple: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-accentSubtlePurple);
    }
  `,
  accentBoldPurple: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-accentBoldPurple);
    }
  `,
  accentSubtleYellow: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-accentSubtleYellow);
    }
  `,
  accentBoldYellow: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-accentBoldYellow);
    }
  `,
  accentSubtleRed: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-accentSubtleRed);
    }
  `,
  accentBoldRed: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-accentBoldRed);
    }
  `,
  accentSubtleGray: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-accentSubtleGray);
    }
  `,
  accentBoldGray: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-accentBoldGray);
    }
  `,
  transparent: css`
    @media ${media.tablet} {
      border-style: solid;
      border-color: var(--color-transparent);
    }
  `,
} as const;

export const borderWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      border-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media ${media.tablet} {
      border-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media ${media.tablet} {
      border-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media ${media.tablet} {
      border-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media ${media.tablet} {
      border-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media ${media.tablet} {
      border-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderTopWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      border-top-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media ${media.tablet} {
      border-top-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media ${media.tablet} {
      border-top-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media ${media.tablet} {
      border-top-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media ${media.tablet} {
      border-top-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media ${media.tablet} {
      border-top-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderEndWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      border-inline-end-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media ${media.tablet} {
      border-inline-end-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media ${media.tablet} {
      border-inline-end-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media ${media.tablet} {
      border-inline-end-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media ${media.tablet} {
      border-inline-end-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media ${media.tablet} {
      border-inline-end-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderBottomWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      border-bottom-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media ${media.tablet} {
      border-bottom-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media ${media.tablet} {
      border-bottom-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media ${media.tablet} {
      border-bottom-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media ${media.tablet} {
      border-bottom-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media ${media.tablet} {
      border-bottom-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderStartWidth: Record<ThemeVars.BorderWidth, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      border-inline-start-width: var(--borderWidth-0);
    }
  `,
  '100': css`
    @media ${media.tablet} {
      border-inline-start-width: var(--borderWidth-100);
    }
  `,
  '200': css`
    @media ${media.tablet} {
      border-inline-start-width: var(--borderWidth-200);
    }
  `,
  '300': css`
    @media ${media.tablet} {
      border-inline-start-width: var(--borderWidth-300);
    }
  `,
  '400': css`
    @media ${media.tablet} {
      border-inline-start-width: var(--borderWidth-400);
    }
  `,
  '500': css`
    @media ${media.tablet} {
      border-inline-start-width: var(--borderWidth-500);
    }
  `,
} as const;

export const borderRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      border-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media ${media.tablet} {
      border-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media ${media.tablet} {
      border-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media ${media.tablet} {
      border-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media ${media.tablet} {
      border-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media ${media.tablet} {
      border-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media ${media.tablet} {
      border-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media ${media.tablet} {
      border-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media ${media.tablet} {
      border-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media ${media.tablet} {
      border-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media ${media.tablet} {
      border-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const borderTopLeftRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      border-top-left-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media ${media.tablet} {
      border-top-left-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media ${media.tablet} {
      border-top-left-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media ${media.tablet} {
      border-top-left-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media ${media.tablet} {
      border-top-left-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media ${media.tablet} {
      border-top-left-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media ${media.tablet} {
      border-top-left-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media ${media.tablet} {
      border-top-left-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media ${media.tablet} {
      border-top-left-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media ${media.tablet} {
      border-top-left-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media ${media.tablet} {
      border-top-left-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const borderTopRightRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      border-top-right-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media ${media.tablet} {
      border-top-right-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media ${media.tablet} {
      border-top-right-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media ${media.tablet} {
      border-top-right-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media ${media.tablet} {
      border-top-right-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media ${media.tablet} {
      border-top-right-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media ${media.tablet} {
      border-top-right-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media ${media.tablet} {
      border-top-right-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media ${media.tablet} {
      border-top-right-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media ${media.tablet} {
      border-top-right-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media ${media.tablet} {
      border-top-right-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const borderBottomLeftRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      border-bottom-left-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media ${media.tablet} {
      border-bottom-left-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media ${media.tablet} {
      border-bottom-left-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media ${media.tablet} {
      border-bottom-left-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media ${media.tablet} {
      border-bottom-left-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media ${media.tablet} {
      border-bottom-left-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media ${media.tablet} {
      border-bottom-left-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media ${media.tablet} {
      border-bottom-left-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media ${media.tablet} {
      border-bottom-left-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media ${media.tablet} {
      border-bottom-left-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media ${media.tablet} {
      border-bottom-left-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const borderBottomRightRadius: Record<ThemeVars.BorderRadius, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      border-bottom-right-radius: var(--borderRadius-0);
    }
  `,
  '100': css`
    @media ${media.tablet} {
      border-bottom-right-radius: var(--borderRadius-100);
    }
  `,
  '200': css`
    @media ${media.tablet} {
      border-bottom-right-radius: var(--borderRadius-200);
    }
  `,
  '300': css`
    @media ${media.tablet} {
      border-bottom-right-radius: var(--borderRadius-300);
    }
  `,
  '400': css`
    @media ${media.tablet} {
      border-bottom-right-radius: var(--borderRadius-400);
    }
  `,
  '500': css`
    @media ${media.tablet} {
      border-bottom-right-radius: var(--borderRadius-500);
    }
  `,
  '600': css`
    @media ${media.tablet} {
      border-bottom-right-radius: var(--borderRadius-600);
    }
  `,
  '700': css`
    @media ${media.tablet} {
      border-bottom-right-radius: var(--borderRadius-700);
    }
  `,
  '800': css`
    @media ${media.tablet} {
      border-bottom-right-radius: var(--borderRadius-800);
    }
  `,
  '900': css`
    @media ${media.tablet} {
      border-bottom-right-radius: var(--borderRadius-900);
    }
  `,
  '1000': css`
    @media ${media.tablet} {
      border-bottom-right-radius: var(--borderRadius-1000);
    }
  `,
} as const;

export const fontFamily: Record<ThemeVars.FontFamily | 'inherit', LinariaClassName> = {
  inherit: css`
    @media ${media.tablet} {
      font-family: inherit;
    }
  `,
  display1: css`
    @media ${media.tablet} {
      font-family: var(--fontFamily-display1);
    }
  `,
  display2: css`
    @media ${media.tablet} {
      font-family: var(--fontFamily-display2);
    }
  `,
  display3: css`
    @media ${media.tablet} {
      font-family: var(--fontFamily-display3);
    }
  `,
  title1: css`
    @media ${media.tablet} {
      font-family: var(--fontFamily-title1);
    }
  `,
  title2: css`
    @media ${media.tablet} {
      font-family: var(--fontFamily-title2);
    }
  `,
  title3: css`
    @media ${media.tablet} {
      font-family: var(--fontFamily-title3);
    }
  `,
  title4: css`
    @media ${media.tablet} {
      font-family: var(--fontFamily-title4);
    }
  `,
  headline: css`
    @media ${media.tablet} {
      font-family: var(--fontFamily-headline);
    }
  `,
  body: css`
    @media ${media.tablet} {
      font-family: var(--fontFamily-body);
    }
  `,
  label1: css`
    @media ${media.tablet} {
      font-family: var(--fontFamily-label1);
    }
  `,
  label2: css`
    @media ${media.tablet} {
      font-family: var(--fontFamily-label2);
    }
  `,
  caption: css`
    @media ${media.tablet} {
      font-family: var(--fontFamily-caption);
    }
  `,
  legal: css`
    @media ${media.tablet} {
      font-family: var(--fontFamily-legal);
    }
  `,
} as const;

export const fontSize: Record<ThemeVars.FontSize | 'inherit', LinariaClassName> = {
  inherit: css`
    @media ${media.tablet} {
      font-size: inherit;
    }
  `,
  display1: css`
    @media ${media.tablet} {
      font-size: var(--fontSize-display1);
    }
  `,
  display2: css`
    @media ${media.tablet} {
      font-size: var(--fontSize-display2);
    }
  `,
  display3: css`
    @media ${media.tablet} {
      font-size: var(--fontSize-display3);
    }
  `,
  title1: css`
    @media ${media.tablet} {
      font-size: var(--fontSize-title1);
    }
  `,
  title2: css`
    @media ${media.tablet} {
      font-size: var(--fontSize-title2);
    }
  `,
  title3: css`
    @media ${media.tablet} {
      font-size: var(--fontSize-title3);
    }
  `,
  title4: css`
    @media ${media.tablet} {
      font-size: var(--fontSize-title4);
    }
  `,
  headline: css`
    @media ${media.tablet} {
      font-size: var(--fontSize-headline);
    }
  `,
  body: css`
    @media ${media.tablet} {
      font-size: var(--fontSize-body);
    }
  `,
  label1: css`
    @media ${media.tablet} {
      font-size: var(--fontSize-label1);
    }
  `,
  label2: css`
    @media ${media.tablet} {
      font-size: var(--fontSize-label2);
    }
  `,
  caption: css`
    @media ${media.tablet} {
      font-size: var(--fontSize-caption);
    }
  `,
  legal: css`
    @media ${media.tablet} {
      font-size: var(--fontSize-legal);
    }
  `,
} as const;

export const fontWeight: Record<ThemeVars.FontWeight | 'inherit', LinariaClassName> = {
  inherit: css`
    @media ${media.tablet} {
      font-weight: inherit;
    }
  `,
  display1: css`
    @media ${media.tablet} {
      font-weight: var(--fontWeight-display1);
    }
  `,
  display2: css`
    @media ${media.tablet} {
      font-weight: var(--fontWeight-display2);
    }
  `,
  display3: css`
    @media ${media.tablet} {
      font-weight: var(--fontWeight-display3);
    }
  `,
  title1: css`
    @media ${media.tablet} {
      font-weight: var(--fontWeight-title1);
    }
  `,
  title2: css`
    @media ${media.tablet} {
      font-weight: var(--fontWeight-title2);
    }
  `,
  title3: css`
    @media ${media.tablet} {
      font-weight: var(--fontWeight-title3);
    }
  `,
  title4: css`
    @media ${media.tablet} {
      font-weight: var(--fontWeight-title4);
    }
  `,
  headline: css`
    @media ${media.tablet} {
      font-weight: var(--fontWeight-headline);
    }
  `,
  body: css`
    @media ${media.tablet} {
      font-weight: var(--fontWeight-body);
    }
  `,
  label1: css`
    @media ${media.tablet} {
      font-weight: var(--fontWeight-label1);
    }
  `,
  label2: css`
    @media ${media.tablet} {
      font-weight: var(--fontWeight-label2);
    }
  `,
  caption: css`
    @media ${media.tablet} {
      font-weight: var(--fontWeight-caption);
    }
  `,
  legal: css`
    @media ${media.tablet} {
      font-weight: var(--fontWeight-legal);
    }
  `,
} as const;

export const lineHeight: Record<ThemeVars.LineHeight | 'inherit', LinariaClassName> = {
  inherit: css`
    @media ${media.tablet} {
      line-height: inherit;
    }
  `,
  display1: css`
    @media ${media.tablet} {
      line-height: var(--lineHeight-display1);
    }
  `,
  display2: css`
    @media ${media.tablet} {
      line-height: var(--lineHeight-display2);
    }
  `,
  display3: css`
    @media ${media.tablet} {
      line-height: var(--lineHeight-display3);
    }
  `,
  title1: css`
    @media ${media.tablet} {
      line-height: var(--lineHeight-title1);
    }
  `,
  title2: css`
    @media ${media.tablet} {
      line-height: var(--lineHeight-title2);
    }
  `,
  title3: css`
    @media ${media.tablet} {
      line-height: var(--lineHeight-title3);
    }
  `,
  title4: css`
    @media ${media.tablet} {
      line-height: var(--lineHeight-title4);
    }
  `,
  headline: css`
    @media ${media.tablet} {
      line-height: var(--lineHeight-headline);
    }
  `,
  body: css`
    @media ${media.tablet} {
      line-height: var(--lineHeight-body);
    }
  `,
  label1: css`
    @media ${media.tablet} {
      line-height: var(--lineHeight-label1);
    }
  `,
  label2: css`
    @media ${media.tablet} {
      line-height: var(--lineHeight-label2);
    }
  `,
  caption: css`
    @media ${media.tablet} {
      line-height: var(--lineHeight-caption);
    }
  `,
  legal: css`
    @media ${media.tablet} {
      line-height: var(--lineHeight-legal);
    }
  `,
} as const;

export const textDecoration = {
  none: css`
    @media ${media.tablet} {
      text-decoration: none;
    }
  `,
  underline: css`
    @media ${media.tablet} {
      text-decoration: underline;
    }
  `,
  overline: css`
    @media ${media.tablet} {
      text-decoration: overline;
    }
  `,
  'line-through': css`
    @media ${media.tablet} {
      text-decoration: line-through;
    }
  `,
  'underline overline': css`
    @media ${media.tablet} {
      text-decoration: underline overline;
    }
  `,
  'underline double': css`
    @media ${media.tablet} {
      text-decoration: underline double;
    }
  `,
} as const;

export const textTransform = {
  none: css`
    @media ${media.tablet} {
      text-transform: none;
    }
  `,
  uppercase: css`
    @media ${media.tablet} {
      text-transform: uppercase;
    }
  `,
  lowercase: css`
    @media ${media.tablet} {
      text-transform: lowercase;
    }
  `,
  capitalize: css`
    @media ${media.tablet} {
      text-transform: capitalize;
    }
  `,
} as const;

export const userSelect = {
  none: css`
    @media ${media.tablet} {
      user-select: none;
    }
  `,
  text: css`
    @media ${media.tablet} {
      user-select: text;
    }
  `,
  all: css`
    @media ${media.tablet} {
      user-select: all;
    }
  `,
  auto: css`
    @media ${media.tablet} {
      user-select: auto;
    }
  `,
} as const;

export const display = {
  none: css`
    @media ${media.tablet} {
      display: none;
    }
  `,
  block: css`
    @media ${media.tablet} {
      display: block;
    }
  `,
  inline: css`
    @media ${media.tablet} {
      display: inline;
    }
  `,
  'inline-block': css`
    @media ${media.tablet} {
      display: inline-block;
    }
  `,
  flex: css`
    @media ${media.tablet} {
      display: flex;
    }
  `,
  'inline-flex': css`
    @media ${media.tablet} {
      display: inline-flex;
    }
  `,
  grid: css`
    @media ${media.tablet} {
      display: grid;
    }
  `,
  'inline-grid': css`
    @media ${media.tablet} {
      display: inline-grid;
    }
  `,
  contents: css`
    @media ${media.tablet} {
      display: contents;
    }
  `,
  'flow-root': css`
    @media ${media.tablet} {
      display: flow-root;
    }
  `,
  revert: css`
    @media ${media.tablet} {
      display: revert;
    }
  `,
  'list-item': css`
    @media ${media.tablet} {
      display: list-item;
    }
  `,
} as const;

export const overflow = {
  auto: css`
    @media ${media.tablet} {
      overflow: auto;
    }
  `,
  visible: css`
    @media ${media.tablet} {
      overflow: visible;
    }
  `,
  hidden: css`
    @media ${media.tablet} {
      overflow: hidden;
    }
  `,
  clip: css`
    @media ${media.tablet} {
      overflow: clip;
    }
  `,
  scroll: css`
    @media ${media.tablet} {
      overflow: scroll;
    }
  `,
} as const;

export const gap = {
  '0': css`
    @media ${media.tablet} {
      gap: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.tablet} {
      gap: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.tablet} {
      gap: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.tablet} {
      gap: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.tablet} {
      gap: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.tablet} {
      gap: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.tablet} {
      gap: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.tablet} {
      gap: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.tablet} {
      gap: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.tablet} {
      gap: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.tablet} {
      gap: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.tablet} {
      gap: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.tablet} {
      gap: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.tablet} {
      gap: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.tablet} {
      gap: var(--space-10);
    }
  `,
} as const;

export const columnGap = {
  '0': css`
    @media ${media.tablet} {
      column-gap: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.tablet} {
      column-gap: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.tablet} {
      column-gap: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.tablet} {
      column-gap: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.tablet} {
      column-gap: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.tablet} {
      column-gap: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.tablet} {
      column-gap: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.tablet} {
      column-gap: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.tablet} {
      column-gap: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.tablet} {
      column-gap: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.tablet} {
      column-gap: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.tablet} {
      column-gap: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.tablet} {
      column-gap: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.tablet} {
      column-gap: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.tablet} {
      column-gap: var(--space-10);
    }
  `,
} as const;

export const rowGap = {
  '0': css`
    @media ${media.tablet} {
      row-gap: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.tablet} {
      row-gap: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.tablet} {
      row-gap: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.tablet} {
      row-gap: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.tablet} {
      row-gap: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.tablet} {
      row-gap: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.tablet} {
      row-gap: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.tablet} {
      row-gap: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.tablet} {
      row-gap: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.tablet} {
      row-gap: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.tablet} {
      row-gap: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.tablet} {
      row-gap: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.tablet} {
      row-gap: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.tablet} {
      row-gap: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.tablet} {
      row-gap: var(--space-10);
    }
  `,
} as const;

export const justifyContent = {
  normal: css`
    @media ${media.tablet} {
      justify-content: normal;
    }
  `,
  center: css`
    @media ${media.tablet} {
      justify-content: center;
    }
  `,
  start: css`
    @media ${media.tablet} {
      justify-content: start;
    }
  `,
  end: css`
    @media ${media.tablet} {
      justify-content: end;
    }
  `,
  'flex-start': css`
    @media ${media.tablet} {
      justify-content: flex-start;
    }
  `,
  'flex-end': css`
    @media ${media.tablet} {
      justify-content: flex-end;
    }
  `,
  left: css`
    @media ${media.tablet} {
      justify-content: left;
    }
  `,
  right: css`
    @media ${media.tablet} {
      justify-content: right;
    }
  `,
  'space-between': css`
    @media ${media.tablet} {
      justify-content: space-between;
    }
  `,
  'space-around': css`
    @media ${media.tablet} {
      justify-content: space-around;
    }
  `,
  'space-evenly': css`
    @media ${media.tablet} {
      justify-content: space-evenly;
    }
  `,
  stretch: css`
    @media ${media.tablet} {
      justify-content: stretch;
    }
  `,
} as const;

export const alignContent = {
  normal: css`
    @media ${media.tablet} {
      align-content: normal;
    }
  `,
  center: css`
    @media ${media.tablet} {
      align-content: center;
    }
  `,
  start: css`
    @media ${media.tablet} {
      align-content: start;
    }
  `,
  end: css`
    @media ${media.tablet} {
      align-content: end;
    }
  `,
  'flex-start': css`
    @media ${media.tablet} {
      align-content: flex-start;
    }
  `,
  'flex-end': css`
    @media ${media.tablet} {
      align-content: flex-end;
    }
  `,
  'space-between': css`
    @media ${media.tablet} {
      align-content: space-between;
    }
  `,
  'space-around': css`
    @media ${media.tablet} {
      align-content: space-around;
    }
  `,
  'space-evenly': css`
    @media ${media.tablet} {
      align-content: space-evenly;
    }
  `,
  stretch: css`
    @media ${media.tablet} {
      align-content: stretch;
    }
  `,
  baseline: css`
    @media ${media.tablet} {
      align-content: baseline;
    }
  `,
  'first baseline': css`
    @media ${media.tablet} {
      align-content: first baseline;
    }
  `,
  'last baseline': css`
    @media ${media.tablet} {
      align-content: last baseline;
    }
  `,
} as const;

export const alignItems = {
  normal: css`
    @media ${media.tablet} {
      align-items: normal;
    }
  `,
  center: css`
    @media ${media.tablet} {
      align-items: center;
    }
  `,
  start: css`
    @media ${media.tablet} {
      align-items: start;
    }
  `,
  end: css`
    @media ${media.tablet} {
      align-items: end;
    }
  `,
  'flex-start': css`
    @media ${media.tablet} {
      align-items: flex-start;
    }
  `,
  'flex-end': css`
    @media ${media.tablet} {
      align-items: flex-end;
    }
  `,
  'self-start': css`
    @media ${media.tablet} {
      align-items: self-start;
    }
  `,
  'self-end': css`
    @media ${media.tablet} {
      align-items: self-end;
    }
  `,
  stretch: css`
    @media ${media.tablet} {
      align-items: stretch;
    }
  `,
  baseline: css`
    @media ${media.tablet} {
      align-items: baseline;
    }
  `,
  'first baseline': css`
    @media ${media.tablet} {
      align-items: first baseline;
    }
  `,
  'last baseline': css`
    @media ${media.tablet} {
      align-items: last baseline;
    }
  `,
} as const;

export const alignSelf = {
  auto: css`
    @media ${media.tablet} {
      align-self: auto;
    }
  `,
  normal: css`
    @media ${media.tablet} {
      align-self: normal;
    }
  `,
  center: css`
    @media ${media.tablet} {
      align-self: center;
    }
  `,
  start: css`
    @media ${media.tablet} {
      align-self: start;
    }
  `,
  end: css`
    @media ${media.tablet} {
      align-self: end;
    }
  `,
  'flex-start': css`
    @media ${media.tablet} {
      align-self: flex-start;
    }
  `,
  'flex-end': css`
    @media ${media.tablet} {
      align-self: flex-end;
    }
  `,
  'self-start': css`
    @media ${media.tablet} {
      align-self: self-start;
    }
  `,
  'self-end': css`
    @media ${media.tablet} {
      align-self: self-end;
    }
  `,
  stretch: css`
    @media ${media.tablet} {
      align-self: stretch;
    }
  `,
  baseline: css`
    @media ${media.tablet} {
      align-self: baseline;
    }
  `,
  'first baseline': css`
    @media ${media.tablet} {
      align-self: first baseline;
    }
  `,
  'last baseline': css`
    @media ${media.tablet} {
      align-self: last baseline;
    }
  `,
} as const;

export const flexDirection = {
  row: css`
    @media ${media.tablet} {
      flex-direction: row;
    }
  `,
  'row-reverse': css`
    @media ${media.tablet} {
      flex-direction: row-reverse;
    }
  `,
  column: css`
    @media ${media.tablet} {
      flex-direction: column;
    }
  `,
  'column-reverse': css`
    @media ${media.tablet} {
      flex-direction: column-reverse;
    }
  `,
} as const;

export const flexWrap = {
  nowrap: css`
    @media ${media.tablet} {
      flex-wrap: nowrap;
    }
  `,
  wrap: css`
    @media ${media.tablet} {
      flex-wrap: wrap;
    }
  `,
  'wrap-reverse': css`
    @media ${media.tablet} {
      flex-wrap: wrap-reverse;
    }
  `,
} as const;

export const position = {
  static: css`
    @media ${media.tablet} {
      position: static;
    }
  `,
  relative: css`
    @media ${media.tablet} {
      position: relative;
    }
  `,
  absolute: css`
    @media ${media.tablet} {
      position: absolute;
    }
  `,
  fixed: css`
    @media ${media.tablet} {
      position: fixed;
    }
  `,
  sticky: css`
    @media ${media.tablet} {
      position: sticky;
    }
  `,
} as const;

export const padding: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      padding-top: var(--space-0);
      padding-bottom: var(--space-0);
      padding-inline-start: var(--space-0);
      padding-inline-end: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.tablet} {
      padding-top: var(--space-0_25);
      padding-bottom: var(--space-0_25);
      padding-inline-start: var(--space-0_25);
      padding-inline-end: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.tablet} {
      padding-top: var(--space-0_5);
      padding-bottom: var(--space-0_5);
      padding-inline-start: var(--space-0_5);
      padding-inline-end: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.tablet} {
      padding-top: var(--space-0_75);
      padding-bottom: var(--space-0_75);
      padding-inline-start: var(--space-0_75);
      padding-inline-end: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.tablet} {
      padding-top: var(--space-1);
      padding-bottom: var(--space-1);
      padding-inline-start: var(--space-1);
      padding-inline-end: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.tablet} {
      padding-top: var(--space-1_5);
      padding-bottom: var(--space-1_5);
      padding-inline-start: var(--space-1_5);
      padding-inline-end: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.tablet} {
      padding-top: var(--space-2);
      padding-bottom: var(--space-2);
      padding-inline-start: var(--space-2);
      padding-inline-end: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.tablet} {
      padding-top: var(--space-3);
      padding-bottom: var(--space-3);
      padding-inline-start: var(--space-3);
      padding-inline-end: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.tablet} {
      padding-top: var(--space-4);
      padding-bottom: var(--space-4);
      padding-inline-start: var(--space-4);
      padding-inline-end: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.tablet} {
      padding-top: var(--space-5);
      padding-bottom: var(--space-5);
      padding-inline-start: var(--space-5);
      padding-inline-end: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.tablet} {
      padding-top: var(--space-6);
      padding-bottom: var(--space-6);
      padding-inline-start: var(--space-6);
      padding-inline-end: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.tablet} {
      padding-top: var(--space-7);
      padding-bottom: var(--space-7);
      padding-inline-start: var(--space-7);
      padding-inline-end: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.tablet} {
      padding-top: var(--space-8);
      padding-bottom: var(--space-8);
      padding-inline-start: var(--space-8);
      padding-inline-end: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.tablet} {
      padding-top: var(--space-9);
      padding-bottom: var(--space-9);
      padding-inline-start: var(--space-9);
      padding-inline-end: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.tablet} {
      padding-top: var(--space-10);
      padding-bottom: var(--space-10);
      padding-inline-start: var(--space-10);
      padding-inline-end: var(--space-10);
    }
  `,
} as const;

export const paddingX: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-0);
      padding-inline-end: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-0_25);
      padding-inline-end: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-0_5);
      padding-inline-end: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-0_75);
      padding-inline-end: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-1);
      padding-inline-end: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-1_5);
      padding-inline-end: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-2);
      padding-inline-end: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-3);
      padding-inline-end: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-4);
      padding-inline-end: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-5);
      padding-inline-end: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-6);
      padding-inline-end: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-7);
      padding-inline-end: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-8);
      padding-inline-end: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-9);
      padding-inline-end: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-10);
      padding-inline-end: var(--space-10);
    }
  `,
} as const;

export const paddingY: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      padding-top: var(--space-0);
      padding-bottom: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.tablet} {
      padding-top: var(--space-0_25);
      padding-bottom: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.tablet} {
      padding-top: var(--space-0_5);
      padding-bottom: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.tablet} {
      padding-top: var(--space-0_75);
      padding-bottom: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.tablet} {
      padding-top: var(--space-1);
      padding-bottom: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.tablet} {
      padding-top: var(--space-1_5);
      padding-bottom: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.tablet} {
      padding-top: var(--space-2);
      padding-bottom: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.tablet} {
      padding-top: var(--space-3);
      padding-bottom: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.tablet} {
      padding-top: var(--space-4);
      padding-bottom: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.tablet} {
      padding-top: var(--space-5);
      padding-bottom: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.tablet} {
      padding-top: var(--space-6);
      padding-bottom: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.tablet} {
      padding-top: var(--space-7);
      padding-bottom: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.tablet} {
      padding-top: var(--space-8);
      padding-bottom: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.tablet} {
      padding-top: var(--space-9);
      padding-bottom: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.tablet} {
      padding-top: var(--space-10);
      padding-bottom: var(--space-10);
    }
  `,
} as const;

export const paddingTop: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      padding-top: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.tablet} {
      padding-top: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.tablet} {
      padding-top: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.tablet} {
      padding-top: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.tablet} {
      padding-top: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.tablet} {
      padding-top: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.tablet} {
      padding-top: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.tablet} {
      padding-top: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.tablet} {
      padding-top: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.tablet} {
      padding-top: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.tablet} {
      padding-top: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.tablet} {
      padding-top: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.tablet} {
      padding-top: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.tablet} {
      padding-top: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.tablet} {
      padding-top: var(--space-10);
    }
  `,
} as const;

export const paddingBottom: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      padding-bottom: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.tablet} {
      padding-bottom: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.tablet} {
      padding-bottom: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.tablet} {
      padding-bottom: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.tablet} {
      padding-bottom: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.tablet} {
      padding-bottom: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.tablet} {
      padding-bottom: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.tablet} {
      padding-bottom: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.tablet} {
      padding-bottom: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.tablet} {
      padding-bottom: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.tablet} {
      padding-bottom: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.tablet} {
      padding-bottom: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.tablet} {
      padding-bottom: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.tablet} {
      padding-bottom: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.tablet} {
      padding-bottom: var(--space-10);
    }
  `,
} as const;

export const paddingStart: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.tablet} {
      padding-inline-start: var(--space-10);
    }
  `,
} as const;

export const paddingEnd: Record<ThemeVars.Space, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      padding-inline-end: var(--space-0);
    }
  `,
  '0.25': css`
    @media ${media.tablet} {
      padding-inline-end: var(--space-0_25);
    }
  `,
  '0.5': css`
    @media ${media.tablet} {
      padding-inline-end: var(--space-0_5);
    }
  `,
  '0.75': css`
    @media ${media.tablet} {
      padding-inline-end: var(--space-0_75);
    }
  `,
  '1': css`
    @media ${media.tablet} {
      padding-inline-end: var(--space-1);
    }
  `,
  '1.5': css`
    @media ${media.tablet} {
      padding-inline-end: var(--space-1_5);
    }
  `,
  '2': css`
    @media ${media.tablet} {
      padding-inline-end: var(--space-2);
    }
  `,
  '3': css`
    @media ${media.tablet} {
      padding-inline-end: var(--space-3);
    }
  `,
  '4': css`
    @media ${media.tablet} {
      padding-inline-end: var(--space-4);
    }
  `,
  '5': css`
    @media ${media.tablet} {
      padding-inline-end: var(--space-5);
    }
  `,
  '6': css`
    @media ${media.tablet} {
      padding-inline-end: var(--space-6);
    }
  `,
  '7': css`
    @media ${media.tablet} {
      padding-inline-end: var(--space-7);
    }
  `,
  '8': css`
    @media ${media.tablet} {
      padding-inline-end: var(--space-8);
    }
  `,
  '9': css`
    @media ${media.tablet} {
      padding-inline-end: var(--space-9);
    }
  `,
  '10': css`
    @media ${media.tablet} {
      padding-inline-end: var(--space-10);
    }
  `,
} as const;

export const margin: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-0));
      margin-bottom: calc(-1 * var(--space-0));
      margin-inline-end: calc(-1 * var(--space-0));
      margin-inline-start: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-0_25));
      margin-bottom: calc(-1 * var(--space-0_25));
      margin-inline-end: calc(-1 * var(--space-0_25));
      margin-inline-start: calc(-1 * var(--space-0_25));
    }
  `,
  '-0.5': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-0_5));
      margin-bottom: calc(-1 * var(--space-0_5));
      margin-inline-end: calc(-1 * var(--space-0_5));
      margin-inline-start: calc(-1 * var(--space-0_5));
    }
  `,
  '-0.75': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-0_75));
      margin-bottom: calc(-1 * var(--space-0_75));
      margin-inline-end: calc(-1 * var(--space-0_75));
      margin-inline-start: calc(-1 * var(--space-0_75));
    }
  `,
  '-1': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-1));
      margin-bottom: calc(-1 * var(--space-1));
      margin-inline-end: calc(-1 * var(--space-1));
      margin-inline-start: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-1_5));
      margin-bottom: calc(-1 * var(--space-1_5));
      margin-inline-end: calc(-1 * var(--space-1_5));
      margin-inline-start: calc(-1 * var(--space-1_5));
    }
  `,
  '-2': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-2));
      margin-bottom: calc(-1 * var(--space-2));
      margin-inline-end: calc(-1 * var(--space-2));
      margin-inline-start: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-3));
      margin-bottom: calc(-1 * var(--space-3));
      margin-inline-end: calc(-1 * var(--space-3));
      margin-inline-start: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-4));
      margin-bottom: calc(-1 * var(--space-4));
      margin-inline-end: calc(-1 * var(--space-4));
      margin-inline-start: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-5));
      margin-bottom: calc(-1 * var(--space-5));
      margin-inline-end: calc(-1 * var(--space-5));
      margin-inline-start: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-6));
      margin-bottom: calc(-1 * var(--space-6));
      margin-inline-end: calc(-1 * var(--space-6));
      margin-inline-start: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-7));
      margin-bottom: calc(-1 * var(--space-7));
      margin-inline-end: calc(-1 * var(--space-7));
      margin-inline-start: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-8));
      margin-bottom: calc(-1 * var(--space-8));
      margin-inline-end: calc(-1 * var(--space-8));
      margin-inline-start: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-9));
      margin-bottom: calc(-1 * var(--space-9));
      margin-inline-end: calc(-1 * var(--space-9));
      margin-inline-start: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-10));
      margin-bottom: calc(-1 * var(--space-10));
      margin-inline-end: calc(-1 * var(--space-10));
      margin-inline-start: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginX: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-0));
      margin-inline-start: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-0_25));
      margin-inline-start: calc(-1 * var(--space-0_25));
    }
  `,
  '-0.5': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-0_5));
      margin-inline-start: calc(-1 * var(--space-0_5));
    }
  `,
  '-0.75': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-0_75));
      margin-inline-start: calc(-1 * var(--space-0_75));
    }
  `,
  '-1': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-1));
      margin-inline-start: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-1_5));
      margin-inline-start: calc(-1 * var(--space-1_5));
    }
  `,
  '-2': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-2));
      margin-inline-start: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-3));
      margin-inline-start: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-4));
      margin-inline-start: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-5));
      margin-inline-start: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-6));
      margin-inline-start: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-7));
      margin-inline-start: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-8));
      margin-inline-start: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-9));
      margin-inline-start: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-10));
      margin-inline-start: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginY: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-0));
      margin-bottom: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-0_25));
      margin-bottom: calc(-1 * var(--space-0_25));
    }
  `,
  '-0.5': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-0_5));
      margin-bottom: calc(-1 * var(--space-0_5));
    }
  `,
  '-0.75': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-0_75));
      margin-bottom: calc(-1 * var(--space-0_75));
    }
  `,
  '-1': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-1));
      margin-bottom: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-1_5));
      margin-bottom: calc(-1 * var(--space-1_5));
    }
  `,
  '-2': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-2));
      margin-bottom: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-3));
      margin-bottom: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-4));
      margin-bottom: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-5));
      margin-bottom: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-6));
      margin-bottom: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-7));
      margin-bottom: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-8));
      margin-bottom: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-9));
      margin-bottom: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-10));
      margin-bottom: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginTop: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-0_25));
    }
  `,
  '-0.5': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-0_5));
    }
  `,
  '-0.75': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-0_75));
    }
  `,
  '-1': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-1_5));
    }
  `,
  '-2': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media ${media.tablet} {
      margin-top: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginBottom: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      margin-bottom: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media ${media.tablet} {
      margin-bottom: calc(-1 * var(--space-0_25));
    }
  `,
  '-0.5': css`
    @media ${media.tablet} {
      margin-bottom: calc(-1 * var(--space-0_5));
    }
  `,
  '-0.75': css`
    @media ${media.tablet} {
      margin-bottom: calc(-1 * var(--space-0_75));
    }
  `,
  '-1': css`
    @media ${media.tablet} {
      margin-bottom: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media ${media.tablet} {
      margin-bottom: calc(-1 * var(--space-1_5));
    }
  `,
  '-2': css`
    @media ${media.tablet} {
      margin-bottom: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media ${media.tablet} {
      margin-bottom: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media ${media.tablet} {
      margin-bottom: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media ${media.tablet} {
      margin-bottom: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media ${media.tablet} {
      margin-bottom: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media ${media.tablet} {
      margin-bottom: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media ${media.tablet} {
      margin-bottom: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media ${media.tablet} {
      margin-bottom: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media ${media.tablet} {
      margin-bottom: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginEnd: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-0_25));
    }
  `,
  '-0.5': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-0_5));
    }
  `,
  '-0.75': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-0_75));
    }
  `,
  '-1': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-1_5));
    }
  `,
  '-2': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media ${media.tablet} {
      margin-inline-end: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const marginStart: Record<'0' | `-${Exclude<ThemeVars.Space, 0>}`, LinariaClassName> = {
  '0': css`
    @media ${media.tablet} {
      margin-inline-start: calc(-1 * var(--space-0));
    }
  `,
  '-0.25': css`
    @media ${media.tablet} {
      margin-inline-start: calc(-1 * var(--space-0_25));
    }
  `,
  '-0.5': css`
    @media ${media.tablet} {
      margin-inline-start: calc(-1 * var(--space-0_5));
    }
  `,
  '-0.75': css`
    @media ${media.tablet} {
      margin-inline-start: calc(-1 * var(--space-0_75));
    }
  `,
  '-1': css`
    @media ${media.tablet} {
      margin-inline-start: calc(-1 * var(--space-1));
    }
  `,
  '-1.5': css`
    @media ${media.tablet} {
      margin-inline-start: calc(-1 * var(--space-1_5));
    }
  `,
  '-2': css`
    @media ${media.tablet} {
      margin-inline-start: calc(-1 * var(--space-2));
    }
  `,
  '-3': css`
    @media ${media.tablet} {
      margin-inline-start: calc(-1 * var(--space-3));
    }
  `,
  '-4': css`
    @media ${media.tablet} {
      margin-inline-start: calc(-1 * var(--space-4));
    }
  `,
  '-5': css`
    @media ${media.tablet} {
      margin-inline-start: calc(-1 * var(--space-5));
    }
  `,
  '-6': css`
    @media ${media.tablet} {
      margin-inline-start: calc(-1 * var(--space-6));
    }
  `,
  '-7': css`
    @media ${media.tablet} {
      margin-inline-start: calc(-1 * var(--space-7));
    }
  `,
  '-8': css`
    @media ${media.tablet} {
      margin-inline-start: calc(-1 * var(--space-8));
    }
  `,
  '-9': css`
    @media ${media.tablet} {
      margin-inline-start: calc(-1 * var(--space-9));
    }
  `,
  '-10': css`
    @media ${media.tablet} {
      margin-inline-start: calc(-1 * var(--space-10));
    }
  `,
} as const;

export const textAlign = {
  start: css`
    @media ${media.tablet} {
      text-align: start;
    }
  `,
  end: css`
    @media ${media.tablet} {
      text-align: end;
    }
  `,
  center: css`
    @media ${media.tablet} {
      text-align: center;
    }
  `,
  justify: css`
    @media ${media.tablet} {
      text-align: justify;
    }
  `,
} as const;

export const visibility = {
  hidden: css`
    @media ${media.tablet} {
      visibility: hidden;
    }
  `,
  visible: css`
    @media ${media.tablet} {
      visibility: visible;
    }
  `,
} as const;
