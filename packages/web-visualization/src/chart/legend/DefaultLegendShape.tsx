import React, { memo } from 'react';
import { cx } from '@coinbase/cds-web';
import { Box, type BoxProps } from '@coinbase/cds-web/layout';
import { css } from '@linaria/core';

import type { LegendShape, LegendShapeVariant } from '../utils/chart';

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

export type LegendShapeProps = BoxProps<'div'> & {
  /**
   * Color of the legend shape.
   * @default 'var(--color-fgPrimary)'
   */
  color?: string;
  /**
   * Shape to display. Can be a preset shape or a custom ReactNode.
   * @default 'circle'
   */
  shape?: LegendShape;
};

export type LegendShapeComponent = React.FC<LegendShapeProps>;

/**
 * Default shape component for chart legends.
 * Renders a colored shape (pill, circle, square, or squircle) or a custom ReactNode.
 */
export const DefaultLegendShape = memo<LegendShapeProps>(
  ({ color = 'var(--color-fgPrimary)', shape = 'circle', className, style, ...props }) => {
    // If shape is a custom ReactNode, render it directly
    if (!isVariantShape(shape)) {
      return <>{shape}</>;
    }

    const variantStyle = stylesByVariant[shape];

    return (
      <Box
        className={cx(variantStyle, className)}
        style={{ backgroundColor: color, ...style }}
        {...props}
      />
    );
  },
);
