import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  LayoutChangeEvent,
  LayoutRectangle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import throttle from 'lodash/throttle';

type Options = {
  scrollThrottleWaitTime?: number;
  setActivePressableLayout?: React.Dispatch<React.SetStateAction<LayoutRectangle>>;
};
type ScrollDetails = { xPosition: number; containerWidth: number; contentWidth: number };
type PressablesLayoutsMap = Map<string, LayoutRectangle>;

const fallbackLayout: LayoutRectangle = { width: 0, x: 0, y: 0, height: 0 };

export const useHorizontallyScrollingPressables = (
  selectedPressableId: string,
  { scrollThrottleWaitTime = 200, setActivePressableLayout }: Options = {},
) => {
  const scrollRef = useRef<ScrollView>(null);
  const scrollDetails = useRef<ScrollDetails>({ xPosition: 0, containerWidth: 0, contentWidth: 0 });
  const pressablesLayoutsMap = useRef<PressablesLayoutsMap>(new Map());
  const [isScrollContentOverflowing, setIsScrollContentOverflowing] = useState(false);
  const [isScrollContentOffscreenRight, setIsScrollContentOffscreenRight] = useState(false);

  const checkIsContentOverflowing = useCallback(() => {
    const isOverflowing = scrollDetails.current.contentWidth > scrollDetails.current.containerWidth;

    setIsScrollContentOverflowing((prevState) =>
      prevState === isOverflowing ? prevState : isOverflowing,
    );
  }, []);

  const checkIsContentOffscreenRight = useCallback(() => {
    const isOffscreenRight =
      scrollDetails.current.xPosition + scrollDetails.current.containerWidth + 1 < // +1 offset to account for fractional values
      scrollDetails.current.contentWidth;

    setIsScrollContentOffscreenRight((prevState) =>
      prevState === isOffscreenRight ? prevState : isOffscreenRight,
    );
  }, []);

  const throttledhandleScroll = useRef(
    throttle((xPosition: number) => {
      scrollDetails.current.xPosition = xPosition;

      checkIsContentOffscreenRight();
    }, scrollThrottleWaitTime),
  ).current;

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      throttledhandleScroll(event.nativeEvent.contentOffset.x);
    },
    [throttledhandleScroll],
  );

  const handleScrollContainerLayout = useCallback(
    (event: LayoutChangeEvent) => {
      scrollDetails.current.containerWidth = event.nativeEvent.layout.width;

      checkIsContentOverflowing();
      checkIsContentOffscreenRight();
    },
    [checkIsContentOffscreenRight, checkIsContentOverflowing],
  );

  const handleScrollContentSizeChange = useCallback(
    (contentWidth: number) => {
      scrollDetails.current.contentWidth = contentWidth;

      checkIsContentOverflowing();
      checkIsContentOffscreenRight();
    },
    [checkIsContentOffscreenRight, checkIsContentOverflowing],
  );

  const handleActivePressableUpdate = useCallback(
    (layout: LayoutRectangle) => {
      setActivePressableLayout?.(layout);

      /** Check if active pressable is offscreen and trigger a scroll event */
      const isOffscreenLeft = layout.x < scrollDetails.current.xPosition;
      const isOffscreenRight =
        layout.x + layout.width - scrollDetails.current.xPosition >
        scrollDetails.current.containerWidth;
      const isOffscreen = isOffscreenLeft || isOffscreenRight;

      if (isOffscreen) {
        scrollRef.current?.scrollTo({ x: layout.x, animated: true });
      }
    },
    [setActivePressableLayout],
  );

  const getPressableLayoutHandler = useCallback(
    (id: string) => {
      return function handlePressableLayout({ nativeEvent: { layout } }: LayoutChangeEvent) {
        pressablesLayoutsMap.current.set(id, layout);

        if (id === selectedPressableId) {
          handleActivePressableUpdate(layout);
        }
      };
    },
    [handleActivePressableUpdate, selectedPressableId],
  );

  /** ⚡️ Side effects 🛼
   *  We need to keep an eye on the value because
   *  we'll have to calculate everything and handle
   *  scroll and layout events whenever it updates
   */
  useEffect(() => {
    const layout = pressablesLayoutsMap.current.get(selectedPressableId) ?? fallbackLayout;
    /** Set the active tab */
    handleActivePressableUpdate(layout);
  }, [handleActivePressableUpdate, selectedPressableId]);

  useEffect(() => {
    return () => {
      throttledhandleScroll.cancel();
    };
  }, [throttledhandleScroll]);

  return {
    scrollRef,
    isScrollContentOverflowing,
    isScrollContentOffscreenRight,
    handleScroll,
    handleScrollContainerLayout,
    handleScrollContentSizeChange,
    getPressableLayoutHandler,
  };
};
