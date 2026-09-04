import React, { memo, useCallback, useEffect } from 'react';

import { useLayout } from '../hooks/useLayout';
import { Box } from '../layout/Box';

import type { CarouselItemProps } from './Carousel';
import { useCarouselContext } from './CarouselContext';

export const CarouselItem = memo(({ children, id, style, ...props }: CarouselItemProps) => {
  const { registerItem, unregisterItem, visibleCarouselItems } = useCarouselContext();
  const [, onLayoutMeasure] = useLayout();

  const isVisible = visibleCarouselItems.has(id);

  const handleLayout = useCallback(
    (event: any) => {
      onLayoutMeasure(event);
      const { x, y, width, height } = event.nativeEvent.layout;
      registerItem(id, { x, y, width, height });
    },
    [id, onLayoutMeasure, registerItem],
  );

  useEffect(() => {
    return () => {
      unregisterItem(id);
    };
  }, [id, unregisterItem]);

  return (
    <Box
      aria-hidden={!isVisible}
      aria-roledescription="carousel item"
      maxWidth="100%"
      onLayout={handleLayout}
      role="group"
      style={[
        {
          flexShrink: 0,
        },
        style,
      ]}
      testID={`carousel-item-${id}`}
      {...props}
    >
      {typeof children === 'function' ? children({ isVisible }) : children}
    </Box>
  );
});
