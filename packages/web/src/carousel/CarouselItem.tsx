import React, { memo, useCallback } from 'react';
import { useRefMapContext } from '@coinbase/cds-common/system/RefMapContext';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { Box } from '../layout/Box';

import type { CarouselItemProps } from './Carousel';
import { useCarouselContext } from './CarouselContext';

const carouselItemCss = css`
  flex-shrink: 0;
`;

/**
 * Individual carousel item component that registers itself with the carousel via RefMapContext.
 */
export const CarouselItem = memo(
  ({ id, children, testID, style, className, isClone, ...props }: CarouselItemProps) => {
    const { registerRef } = useRefMapContext();
    const { visibleCarouselItems } = useCarouselContext();

    const isVisible = visibleCarouselItems.has(id);

    const refCallback = useCallback(
      (ref: HTMLDivElement) => {
        registerRef(id, ref);
      },
      [registerRef, id],
    );

    return (
      <Box
        ref={refCallback}
        aria-hidden={!isVisible}
        aria-roledescription="carousel item"
        className={cx(carouselItemCss, className)}
        data-carousel-item-id={id}
        // @ts-expect-error - inert is a valid HTML attribute but not yet in React types, used to prevent navigation to clones
        inert={isClone ? '' : undefined}
        maxWidth="100%"
        role="group"
        style={style}
        testID={testID ?? `carousel-item-${id}`}
        {...props}
      >
        {typeof children === 'function' ? children({ isVisible }) : children}
      </Box>
    );
  },
);
