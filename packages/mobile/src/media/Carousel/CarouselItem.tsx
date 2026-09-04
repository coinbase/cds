import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { Animated } from 'react-native';
import type { LayoutChangeEvent, View } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import { Box } from '../../layout/Box';

import { CarouselItemContext } from './CarouselItemContext';
import type { CarouselDismissItemInternal, CarouselItemId, CarouselUpdateLayoutMap } from './types';

type CarouselItemProps = {
  /** Dismiss a CarouselItem. Requires an index and animated opacity from each CarouselItem. */
  dismiss: CarouselDismissItemInternal;
  /** Id of CarouselItem. Set via key prop when passing in items to parent Carousel component. */
  id: CarouselItemId;
  /** Determines how much padding should be between this CarouselItem and the next one. */
  paddingEnd: ThemeVars.Space;
  /** Save the CarouselItem x position to Carousel's layoutMap. The layoutMap is used for the snapPoints of the ScrollView. */
  updateLayoutMap: CarouselUpdateLayoutMap;
};

type AnimatedStyles = {
  opacity: Animated.Value;
  width: Animated.Value;
  height: Animated.Value;
};

export const CarouselItem: React.FC<React.PropsWithChildren<CarouselItemProps>> = memo(
  ({ children, dismiss, id, paddingEnd, updateLayoutMap }) => {
    const innerBox = useRef<View>(null);
    /** All animations go from to 1 to 0 when dismissed. Width and height are interpolated from those values. */
    const [animatedStyles, setAnimatedStyles] = useState<AnimatedStyles | undefined>();

    /** Update layoutMap in Carousel with x coordinate of this item. */
    const onWrapperLayout = useCallback(
      (event: LayoutChangeEvent) => {
        updateLayoutMap({ [id]: event.nativeEvent.layout.x });
      },
      [id, updateLayoutMap],
    );

    /** Dismiss a CarouselItem. We pass the item's index and opacity to Carousel to manage playback because Carousel has checks to guarantee we don't play multiple animations at once. */
    const handleDismiss = useCallback(
      (callbackFn?: () => void) => {
        innerBox.current?.measureInWindow((_x, _y, innerWidth, innerHeight) => {
          const stylesToAnimate = {
            opacity: new Animated.Value(1),
            height: new Animated.Value(innerHeight),
            width: new Animated.Value(innerWidth),
          } as const;
          setAnimatedStyles(stylesToAnimate);
          dismiss({
            id,
            ...stylesToAnimate,
            callbackFn,
          });
        });
      },
      [dismiss, id],
    );

    const contextValue = useMemo(() => ({ dismiss: handleDismiss, id }), [handleDismiss, id]);
    return (
      <CarouselItemContext.Provider value={contextValue}>
        <Box
          animated
          onLayout={onWrapperLayout}
          style={animatedStyles}
          testID={`CarouselItemWrapper-${id}`}
        >
          <Box
            ref={innerBox}
            flexShrink={0}
            paddingEnd={paddingEnd}
            testID={`CarouselItemInner-${id}`}
          >
            {children}
          </Box>
        </Box>
      </CarouselItemContext.Provider>
    );
  },
);

CarouselItem.displayName = 'CarouselItem';
