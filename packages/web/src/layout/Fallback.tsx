import React, { forwardRef, memo, useMemo } from 'react';
import {
  useFallbackShape,
  type UseFallbackShapeOptions,
} from '@coinbase/cds-common/hooks/useFallbackShape';
import type { Shape } from '@coinbase/cds-common/types';
import { css } from '@linaria/core';

import type { Polymorphic } from '../core/polymorphism';

import { Box, type BoxBaseProps } from './Box';

const fallbackCss = css`
  display: inline-block;
  position: relative;
  overflow: hidden;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: shimmer;
  animation-timing-function: linear;
  background-color: rgba(var(--gray60), 0.05);
  background-repeat: no-repeat;
  background-image: linear-gradient(
    to right,
    rgb(var(--gray60), 0.05) 0%,
    rgb(var(--gray60), 0) 25%,
    rgb(var(--gray60), 0.1) 50%,
    rgb(var(--gray60), 0) 75%,
    rgb(var(--gray60), 0.05) 100%
  );

  @keyframes shimmer {
    0% {
      /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
      background-position: -600px 0;
    }

    100% {
      /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
      background-position: 600px 0;
    }
  }
`;

const visuallyHiddenCss = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const fallbackDefaultElement = 'div';

export type FallbackDefaultElement = typeof fallbackDefaultElement;

export type FallbackBaseProps = Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    width: string | number;
    height: string | number;
    /**
     * @default rectangle
     */
    shape?: Shape;
    /** Disables randomization of rectangle shape width. */
    disableRandomRectWidth?: boolean;
    /**
     * When shape is a rectangle, creates a variant with deterministic width.
     * Variants map to a predetermined set of width values, which are cycled through repeatedly when the set is exhausted.
     */
    rectWidthVariant?: number;
    /** Convert width to a percentage. */
    percentage?: boolean;
  }
>;

export type FallbackProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  FallbackBaseProps
>;

type FallbackComponent = (<AsComponent extends React.ElementType = FallbackDefaultElement>(
  props: FallbackProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const Fallback: FallbackComponent = memo(
  forwardRef<React.ReactElement<FallbackBaseProps>, FallbackBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        height,
        shape = 'rectangle',
        width: baseWidth,
        percentage,
        disableRandomRectWidth,
        rectWidthVariant,
        accessibilityLabel = 'Loading',
        ...props
      }: FallbackProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? fallbackDefaultElement) satisfies React.ElementType;

      const fallbackShapeOptions = useMemo<UseFallbackShapeOptions>(
        () => ({ disableRandomRectWidth, rectWidthVariant }),
        [disableRandomRectWidth, rectWidthVariant],
      );

      const { width, borderRadius } = useFallbackShape(shape, baseWidth, fallbackShapeOptions);

      const backgroundSizeHeight = typeof height === 'number' ? `${height}px` : height;

      const style = useMemo(
        () => ({
          width: percentage ? `100%` : width,
          backgroundSize: `600px ${backgroundSizeHeight}`,
          height,
          borderRadius,
        }),
        [percentage, width, backgroundSizeHeight, height, borderRadius],
      );

      return (
        <Box
          ref={ref}
          as={Component}
          flexGrow={0}
          flexShrink={0}
          position="relative"
          width={percentage && typeof width === 'number' ? `${Math.min(width, 100)}%` : width}
          {...props}
        >
          {accessibilityLabel && <span className={visuallyHiddenCss}>{accessibilityLabel}</span>}
          <Box aria-hidden="true" className={fallbackCss} style={style} />
        </Box>
      );
    },
  ),
);

Fallback.displayName = 'Fallback';

export { useFallbackShape, type UseFallbackShapeOptions };
