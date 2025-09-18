import React, { memo } from 'react';
import { css } from '@linaria/core';

import { Box, type BoxProps } from './Box';

export type DividerBaseProps = {
  /**
   * The direction to render the divider line.
   * @default horizontal
   */
  direction?: 'horizontal' | 'vertical';
};

export type DividerProps = DividerBaseProps & Omit<BoxProps<'hr'>, 'as' | 'role'>;

const directionCss: {
  [key in NonNullable<DividerBaseProps['direction']>]: string;
} = {
  horizontal: css`
    height: 1px;
  `,
  vertical: css`
    width: 1px;
  `,
} as const;

export const Divider = memo(
  ({ color, direction = 'horizontal', background = 'bgLine', ...boxProps }: DividerProps) => {
    return (
      <Box alignItems="stretch" alignSelf="stretch" {...boxProps}>
        <Box
          aria-orientation={direction}
          as="hr"
          background={color ?? background}
          className={directionCss[direction]}
          flexGrow={1}
          marginY={0}
          role="separator"
        />
      </Box>
    );
  },
);

Divider.displayName = 'Divider';
