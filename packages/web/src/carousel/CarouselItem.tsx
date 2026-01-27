import React, { memo, useCallback } from 'react';
import { useRefMapContext } from '@coinbase/cds-common/system/RefMapContext';

import { Box } from '../layout/Box';

import type { CarouselItemProps } from './Carousel';
import { useCarouselContext } from './CarouselContext';

/**
 * Individual carousel item component that registers itself with the carousel via RefMapContext.
 */
export const CarouselItem = memo(({ id, children, testID, style, ...props }: CarouselItemProps) => {
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
      maxWidth="100%"
      role="group"
      style={{
        flexShrink: 0,
        ...style,
      }}
      tabIndex={isVisible ? undefined : -1}
      testID={testID ?? `carousel-item-${id}`}
      {...props}
    >
      {typeof children === 'function' ? children({ isVisible }) : children}
    </Box>
  );
});
