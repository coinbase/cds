import type { ViewStyle } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { ElevationLevels } from '@coinbase/cds-common/types/ElevationLevels';

import type { Theme } from '../core/theme';

export type BorderStyles = ViewStyle;

export type GetBorderStyleParams = {
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** Leverage one of the borderRadius styles we offer to round the corners of the box. */
  borderRadius?: ThemeVars.BorderRadius;
  /** Adds a custom border color from the palette */
  borderColor?: ThemeVars.Color;
  /** Adds a custom border width from the palette */
  borderWidth?: ThemeVars.BorderWidth;
  /** Adds an elevation to the box */
  elevation?: ElevationLevels;
  /** Theme object */
  theme: Theme;
};

export const getBorderStyles = ({
  bordered,
  borderedTop,
  borderedBottom,
  borderedStart,
  borderedEnd,
  borderedHorizontal,
  borderedVertical,
  borderRadius,
  borderColor,
  borderWidth,
  theme,
  elevation,
}: GetBorderStyleParams) => {
  const styles: ViewStyle = {};

  if (borderRadius) {
    styles.borderRadius = theme.borderRadius[borderRadius];
  }

  if (bordered !== undefined) {
    styles.borderWidth = bordered ? 1 : 0;
  }

  if (borderedVertical !== undefined) {
    styles.borderTopWidth = borderedVertical ? 1 : 0;
    styles.borderBottomWidth = borderedVertical ? 1 : 0;
  }

  if (borderedHorizontal !== undefined) {
    styles.borderStartWidth = borderedHorizontal ? 1 : 0;
    styles.borderEndWidth = borderedHorizontal ? 1 : 0;
  }

  if (borderedTop !== undefined) {
    styles.borderTopWidth = borderedTop ? 1 : 0;
  }

  if (borderedBottom !== undefined) {
    styles.borderBottomWidth = borderedBottom ? 1 : 0;
  }

  if (borderedStart !== undefined) {
    styles.borderStartWidth = borderedStart ? 1 : 0;
  }

  if (borderedEnd !== undefined) {
    styles.borderEndWidth = borderedEnd ? 1 : 0;
  }

  if (Object.keys(styles).length > (borderRadius ? 1 : 0)) {
    styles.borderColor = theme.color.bgLine;
  }

  if (borderColor) {
    styles.borderColor = theme.color[borderColor];
  }

  if (borderWidth) {
    styles.borderStyle = 'solid';
    styles.borderWidth = theme.borderWidth[borderWidth];
  }

  // When elevating, always apply a border
  if (elevation) {
    styles.borderColor = theme.color[borderColor ?? 'bgLine'];
    styles.borderWidth = theme.borderWidth[borderWidth ?? 100];
  }
  return styles;
};
