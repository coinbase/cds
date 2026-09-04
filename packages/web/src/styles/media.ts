export const breakpoints = {
  phone: 0,
  phoneLandscape: 560,
  tablet: 768,
  tabletLandscape: 1024,
  desktop: 1280,
  desktopLarge: 1440,
  extraWide: 1600,
} as const;

export const media = {
  phone: `(max-width: 767px)`,
  phonePortrait: `(max-width: 559px)`,
  phoneLandscape: `(min-width: 560px) and (max-width: 767px)`,
  tablet: `(min-width: 768px) and (max-width: 1279px)`,
  tabletPortrait: `(min-width: 768px) and (max-width: 1023px)`,
  tabletLandscape: `(min-width: 1024px) and (max-width: 1279px)`,
  desktop: `(min-width: 1280px)`,
  desktopSmall: `(min-width: 1280px) and (max-width: 1439px)`,
  desktopLarge: `(min-width: 1440px) and (max-width: 1599px)`,
  extraWide: `(min-width: 1600px)`,
} as const;

export type DeviceBreakpoint =
  | 'phone'
  | 'phonePortrait'
  | 'phoneLandscape'
  | 'tablet'
  | 'tabletPortrait'
  | 'tabletLandscape'
  | 'desktop'
  | 'desktopSmall'
  | 'desktopLarge'
  | 'extraWide';
