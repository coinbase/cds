import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';

import type { BoxProps } from './Box';
import { Box } from './Box';

export type DividerBaseProps = {
  /**
   * Color of the divider line.
   * @default bgLine
   */
  color?: ThemeVars.Color;
  /**
   * The direction to render the divider line.
   * @default horizontal
   */
  direction?: 'horizontal' | 'vertical';
};

export type DividerProps = DividerBaseProps & BoxProps;

export const Divider = memo((_props: DividerProps) => {
  const mergedProps = useComponentConfig('Divider', _props);
  const { color = 'bgLine', direction = 'horizontal', ...boxProps } = mergedProps;
  const theme = useTheme();
  const style = useMemo(
    () => [
      styles[direction],
      {
        backgroundColor: theme.color[color],
      },
    ],
    [direction, theme.color, color],
  );

  return (
    <Box alignItems="stretch" alignSelf="stretch" {...boxProps}>
      <View style={style} />
    </Box>
  );
});

const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    flexGrow: 1,
  },
  vertical: {
    width: 1,
    flexGrow: 1,
  },
});
