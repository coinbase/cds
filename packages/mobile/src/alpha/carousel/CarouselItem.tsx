import React, { createContext, memo, useCallback, useMemo, useRef, useState } from 'react';
import { Animated } from 'react-native';
import type { View } from 'react-native';
import { animateOpacityConfig, animateSizeConfig } from '@coinbase/cds-common/animation/carousel';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';

import { convertMotionConfig } from '../../animation/convertMotionConfig';
import { IconButton } from '../../buttons/IconButton';
import { Box } from '../../layout/Box';

import { CarouselControlsWrapper } from './CarouselControlsWrapper';
import type {
  CarouselHandleDismissItem,
  CarouselId,
  CarouselItemAnimatedStyles,
  CarouselOnDismissItem,
  CarouselOnItemMount,
} from './types';

const FADE_DISTANCE = 48;
const opacityConfig = convertMotionConfig(animateOpacityConfig);
const sizeConfig = convertMotionConfig(animateSizeConfig);

export type CarouselItemContextValue = {
  id: CarouselId;
  dismiss: CarouselHandleDismissItem;
};

/**
 * Used internally within CarouselItem component to provide access to id and dismiss.
 */
export const CarouselItemContext = createContext<CarouselItemContextValue | undefined>(undefined);

type CarouselItemProps = {
  /** Id of CarouselItem. Set via key prop when passing in items to parent Carousel component. */
  id: CarouselId;
  /** Index of the CarouselItem. This changes based on dismissedItems. */
  index: number;
  /** Determines how much padding should be between this CarouselItem and the next one. */
  paddingEnd: ThemeVars.Space;
  /** Show the dismiss IconButton in each CarouselItem.  */
  showDismiss?: boolean;
  /** x position of the Carousel scroll view. Used to interpolate opacity of dismiss button when showDismiss is true. */
  xOffset: Animated.Value;
  /** The total number of slides in a Carousel. Is used to understand certain conditions such as if is the last or only item. */
  totalItems: number;
  /** The width for Carousel slide. */
  width: number;
  /** The animated opacity for progress indicators. When the second to last item is dismissed we want to fade out progress indicators. */
  progressOpacity?: Animated.Value;
  /** Optional callback function which will run after a Carousel item is dismissed. */
  onDismiss?: () => void;
  /** Optional callback function which will run after the last item is dismissed and Carousel height is collapsed. */
  onDismissLastItem?: () => void;
  onMount: CarouselOnItemMount;
  dismissButtonAccessibilityLabel?: SharedAccessibilityProps['accessibilityLabel'];
  dismissButtonAccessibilityHint?: SharedAccessibilityProps['accessibilityHint'];
};

export const CarouselItem: React.FC<React.PropsWithChildren<CarouselItemProps>> = memo(
  ({
    children,
    id,
    index,
    paddingEnd,
    showDismiss,
    xOffset,
    totalItems,
    width,
    progressOpacity,
    onDismiss,
    onDismissLastItem,
    onMount,
    dismissButtonAccessibilityLabel,
    dismissButtonAccessibilityHint,
  }) => {
    const snapPoint = width * index;
    const isOnlyItem = totalItems === 1;
    const isFirstItem = index === 0;
    const isLastItem = index === totalItems - 1;
    const innerBox = useRef<View>(null);
    const isAnimating = useRef<boolean>(false);
    const hasMounted = useRef<boolean>(false);
    const [animatedStyles, setAnimatedStyles] = useState<CarouselItemAnimatedStyles>({
      opacity: new Animated.Value(1),
      width: new Animated.Value(width),
      height: undefined,
    });

    const onWrapperLayout = useCallback(() => {
      if (hasMounted.current) return;
      onMount(animatedStyles);
      hasMounted.current = true;
    }, [animatedStyles, onMount]);

    const dismissButtonStyles = useMemo(() => {
      return {
        opacity: xOffset.interpolate({
          inputRange: [snapPoint - FADE_DISTANCE, snapPoint, snapPoint + FADE_DISTANCE],
          outputRange: [isFirstItem ? 1 : 0, 1, isLastItem ? 1 : 0],
        }),
      };
    }, [isFirstItem, isLastItem, snapPoint, xOffset]);

    const handleDismiss = useCallback(
      (callbackFn?: CarouselOnDismissItem) => {
        innerBox.current?.measureInWindow((_x, _y, innerWidth, innerHeight) => {
          const stylesToAnimate = {
            opacity: new Animated.Value(1),
            height: new Animated.Value(innerHeight),
            width: new Animated.Value(innerWidth),
          } as const;
          setAnimatedStyles(stylesToAnimate);
          if (isAnimating.current) return;
          isAnimating.current = true;
          const opacityMotion = Animated.timing(stylesToAnimate.opacity, opacityConfig);
          const widthMotion = Animated.timing(stylesToAnimate.width, sizeConfig);
          const heightMotion = Animated.timing(stylesToAnimate.height, sizeConfig);
          const animations = [opacityMotion, isOnlyItem ? heightMotion : widthMotion];
          if (progressOpacity) {
            const progressExitAnimation = Animated.timing(progressOpacity, opacityConfig);
            if (totalItems === 2) {
              animations.push(progressExitAnimation);
            }
          }
          onMount(stylesToAnimate);
          Animated.parallel(animations).start(() => {
            isAnimating.current = false;
            callbackFn?.(id);
            onDismiss?.();
            onMount(stylesToAnimate);
            if (isOnlyItem) {
              onDismissLastItem?.();
            }
          });
        });
      },
      [isOnlyItem, progressOpacity, totalItems, id, onDismiss, onMount, onDismissLastItem],
    );

    const handleDismissPress = useCallback(() => {
      handleDismiss();
    }, [handleDismiss]);

    const contextValue: CarouselItemContextValue = useMemo(
      () => ({ dismiss: handleDismiss, id }),
      [handleDismiss, id],
    );

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
            animated
            flexShrink={0}
            paddingEnd={paddingEnd}
            position="relative"
            testID={`CarouselItemInner-${id}`}
            width={width}
          >
            {showDismiss ? (
              <CarouselControlsWrapper
                animated
                justifyContent="flex-end"
                paddingEnd={0.5}
                style={dismissButtonStyles}
              >
                <IconButton
                  transparent
                  accessibilityHint={dismissButtonAccessibilityHint}
                  accessibilityLabel={dismissButtonAccessibilityLabel}
                  name="close"
                  onPress={handleDismissPress}
                  testID={`CarouselItemDismiss-${id}`}
                />
              </CarouselControlsWrapper>
            ) : null}
            <Box paddingTop={2}>{children}</Box>
          </Box>
        </Box>
      </CarouselItemContext.Provider>
    );
  },
);

CarouselItem.displayName = 'CarouselItem';
