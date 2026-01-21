import React, { memo } from 'react';
import { cx } from '@coinbase/cds-web';
import { Box, type BoxProps } from '@coinbase/cds-web/layout';
import { css } from '@linaria/core';

import type { LegendShape, LegendShapeVariant } from '../utils/chart';

import type { LegendShapeProps } from './Legend';

const containerCss = css`
  width: 10px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const pillCss = css`
  width: 6px;
  height: 24px;
  border-radius: 3px;
`;

const circleCss = css`
  width: 10px;
  height: 10px;
  border-radius: 5px;
`;

const squareCss = css`
  width: 10px;
  height: 10px;
`;

const squircleCss = css`
  width: 10px;
  height: 10px;
  border-radius: 2px;
`;

const stylesByVariant: Record<LegendShapeVariant, string> = {
  pill: pillCss,
  circle: circleCss,
  square: squareCss,
  squircle: squircleCss,
};

const isVariantShape = (shape: LegendShape): shape is LegendShapeVariant =>
  typeof shape === 'string' && shape in stylesByVariant;

export type DefaultLegendShapeProps = LegendShapeProps &
  Omit<BoxProps<'div'>, 'children' | 'color'>;

export const DefaultLegendShape = memo<DefaultLegendShapeProps>(
  ({ color = 'var(--color-fgPrimary)', shape = 'circle', className, style, ...props }) => {
    if (!isVariantShape(shape)) return shape;

    const variantStyle = stylesByVariant[shape];

    return (
      <Box className={cx(containerCss, className)} style={style} {...props}>
        <span className={variantStyle} style={{ backgroundColor: color }} />
      </Box>
    );
  },
);
