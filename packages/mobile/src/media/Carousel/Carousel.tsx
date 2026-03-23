import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Animated, Platform, StyleSheet } from 'react-native';
import type { ScrollView, ScrollViewProps } from 'react-native';
import type { SharedProps } from '@coinbase/cds-common';
import { animateOpacityConfig, animateSizeConfig } from '@coinbase/cds-common/animation/carousel';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import { convertMotionConfig } from '../../animation/convertMotionConfig';
import type { ScrollToParams } from '../../hooks/useScrollTo';
import { useScrollTo } from '../../hooks/useScrollTo';

import { CarouselItem } from './CarouselItem';
import type {
  CarouselDismissItemParams,
  CarouselItemId,
  CarouselLayoutMap,
  CarouselOnReady,
  CarouselRef,
} from './types';

const opacityConfig = convertMotionConfig(animateOpacityConfig);
const sizeConfig = convertMotionConfig(animateSizeConfig);

export type CarouselProps = {
  items: React.ReactElement[];
  /** Return value from useCarousel hook. Allows access to certain internal data/methods of Carousel. */
  carouselRef?: React.MutableRefObject<CarouselRef | undefined>;
  /** Gap to insert between siblings. The last item will exclude additional spacing. */
  gap?: ThemeVars.Space;
  /** Callback that fires when the Carousel is ready to be interacted with. */
  onReady?: CarouselOnReady;
} & Omit<ScrollViewProps, 'style'> &
  SharedProps;

/**
 * @deprecated Use new Carousel component instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v8
 */
export const Carousel = memo(
  forwardRef<ScrollView, CarouselProps>(
    (
      { carouselRef, items, gap = 3, testID = 'Carousel', onReady, ...otherProps },
      forwardedRef,
    ) => {
      /** A key/value object of ids to x coordinates. i.e. { 0: 0, 1: 400, 2: 800 } */
      const [layoutMap, setLayoutMap] = useState<CarouselLayoutMap>({});
      /** ScrollRef for wrapping ScrollView */
      const [scrollRef, { scrollTo, scrollToEnd }] = useScrollTo(forwardedRef);
      /** Guarantees we only fire onReady once. */
      const hasFiredOnReady = useRef(false);
      /** Prevent multiple dismissals at once. */
      const isAnimating = useRef(false);
      const [dismissedItems, setDismissedItems] = useState<Set<CarouselItemId>>(() => new Set());
      const resetDismissedItems = useCallback(() => {
        setDismissedItems(new Set());
      }, []);

      const itemsArray = useMemo(
        () => items.filter((item) => !!item.key && !dismissedItems.has(item.key)),
        [items, dismissedItems],
      );
      /** The number of of CarouselItems */
      const childrenLength = itemsArray.length;

      const getDismissHandler = useCallback((shouldAnimateHeight: boolean) => {
        return ({ height, opacity, width, id, callbackFn }: CarouselDismissItemParams) => {
          if (isAnimating.current) return;
          isAnimating.current = true;
          const opacityMotion = Animated.timing(opacity, opacityConfig);
          const widthMotion = Animated.timing(width, sizeConfig);
          const heightMotion = Animated.timing(height, sizeConfig);
          Animated.parallel([
            opacityMotion,
            shouldAnimateHeight ? heightMotion : widthMotion,
          ]).start(() => {
            isAnimating.current = false;
            setDismissedItems((prev) => new Set(prev).add(id));
            callbackFn?.();
          });
        };
      }, []);

      /** Array of x coordinates for snapping the wrapping ScrollView on gesture */
      const snapPoints = useMemo(() => Object.values(layoutMap), [layoutMap]);
      /** This is fired in onLayout of CarouselItem. */
      const updateLayoutMap = useCallback((value: CarouselLayoutMap) => {
        setLayoutMap((prev) => ({ ...prev, ...value }));
      }, []);
      /** Imperatively handling scrolling Carousel to an item. LayoutMap has the index to x coordinate mapping. */
      const scrollToId = useCallback(
        (id: CarouselItemId, params: ScrollToParams | undefined = {}) => {
          scrollTo({ x: layoutMap[id], ...params });
        },
        [layoutMap, scrollTo],
      );
      /** This object contains any internal data/methods of Carousel that we want to expose to consumers. */
      const publicData = useMemo(
        () => ({
          length: childrenLength,
          dismissedItems,
          resetDismissedItems,
          scrollToId,
          scrollToEnd,
        }),
        [childrenLength, dismissedItems, resetDismissedItems, scrollToId, scrollToEnd],
      );
      /** Guarantees that we have x coordinates for each CarouselItem before triggering onReady. */
      useEffect(() => {
        const isReady = !!scrollRef && childrenLength === snapPoints.length;
        if (hasFiredOnReady.current || !isReady) return;
        onReady?.(publicData);
        hasFiredOnReady.current = true;
      }, [publicData, childrenLength, onReady, scrollRef, snapPoints.length]);
      /**
       * Useful if you need access to carousel length or scrollToId outside of Carousel. The useCarousel hook exposes these values and requires the ref returned to be passed into Carousel's carouselRef prop.
       * @example
       * ```
       * const carouselRef = useCarousel()
       * const handlePress = () => carouselRef.current.scrollToId('item3');
       * <Button onPress={handlePress}>Press me</Button>
       * <Carousel carouselRef={carouselRef} />
       * ```
       */
      useImperativeHandle(carouselRef, () => publicData, [publicData]);
      /** Loop over our children and create CarouselItem component. */
      const content = useMemo(
        () =>
          itemsArray.map((child, index) => {
            const key = child.key ?? index;
            const shouldAnimateHeight = itemsArray.length === 1;
            const isLastItem = index === itemsArray.length - 1;
            return (
              <CarouselItem
                key={`carousel-item-${key}`}
                dismiss={getDismissHandler(shouldAnimateHeight)}
                id={key}
                paddingEnd={isLastItem ? 0 : gap}
                updateLayoutMap={updateLayoutMap}
              >
                {child}
              </CarouselItem>
            );
          }),
        [itemsArray, getDismissHandler, gap, updateLayoutMap],
      );

      return (
        <Animated.ScrollView
          {...otherProps}
          ref={scrollRef}
          horizontal
          contentContainerStyle={styles.scrollViewContainer}
          decelerationRate="fast"
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToOffsets={snapPoints}
          style={styles.carousel}
          testID={testID}
        >
          {content}
        </Animated.ScrollView>
      );
    },
  ),
);

const styles = StyleSheet.create({
  carousel: {
    overflow: 'visible',
  },
  scrollViewContainer: Platform.select({
    android: {
      /**
       * TODO: update so these values are not hardcoded.
       * Copied from RN
       * We do all this to give space for card shadows with an elevation of 1 to show on android
       * https://github.com/facebook/react-native/issues/25703
       */
      paddingVertical: 4,
      marginVertical: -4,
      paddingStart: 4,
      marginStart: -4,
      paddingEnd: 2,
    },
    default: {},
  }),
});

Carousel.displayName = 'Carousel';
