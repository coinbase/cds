import type { ThemeVars } from '../core/theme';

export type ElevationLevels = ThemeVars.Elevation;

export type ElevationProps = {
  /** Determines a component's shadow styles. Parent should have overflow set to visible to ensure styles are not clipped. */
  elevation?: ElevationLevels;
};
