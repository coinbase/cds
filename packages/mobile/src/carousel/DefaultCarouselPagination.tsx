import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { animated, useSpring } from '@react-spring/native';

import { useTheme } from '../hooks/useTheme';
import { HStack } from '../layout/HStack';
import { Pressable } from '../system/Pressable';

import type { CarouselPaginationComponentProps } from './Carousel';
import { useCarouselAutoplayContext } from './CarouselContext';

export type DefaultCarouselPaginationProps = CarouselPaginationComponentProps & {
  /**
   * Custom styles for the component.
   */
  styles?: {
    /**
     * Custom styles for the root element.
     */
    root?: StyleProp<ViewStyle>;
    /**
     * Custom styles for the dot element.
     */
    dot?: StyleProp<ViewStyle>;
  };
};

const INDICATOR_ACTIVE_WIDTH = 24;
const INDICATOR_INACTIVE_WIDTH = 4;
const INDICATOR_HEIGHT = 4;

type PaginationIndicatorProps = {
  index: number;
  isActive: boolean;
  onPress: () => void;
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
};

const PaginationPill = memo(function PaginationPill({
  index,
  isActive,
  onPress,
  accessibilityLabel,
  style,
}: PaginationIndicatorProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      background={isActive ? 'bgPrimary' : 'bgLine'}
      borderColor="transparent"
      borderRadius={100}
      height={INDICATOR_HEIGHT}
      onPress={onPress}
      style={style}
      testID={`carousel-page-${index}`}
      width={INDICATOR_ACTIVE_WIDTH}
    />
  );
});

const animationConfig = {
  stiffness: 900,
  damping: 120,
  clamp: true,
};

const PaginationDot = memo(function PaginationDot({
  index,
  isActive,
  onPress,
  accessibilityLabel,
  style,
}: PaginationIndicatorProps) {
  const theme = useTheme();
  const autoplayContext = useCarouselAutoplayContext();
  const { isPlaying, isEnabled, interval, getRemainingTime } = autoplayContext;

  const showProgress = isActive && isEnabled;

  const springProps = useSpring({
    width: isActive ? INDICATOR_ACTIVE_WIDTH : INDICATOR_INACTIVE_WIDTH,
    backgroundColor: isActive && !showProgress ? theme.color.bgPrimary : theme.color.bgLine,
    config: animationConfig,
  });

  // Track progress animation state
  const [progressState, setProgressState] = useState<{
    width: number;
    duration: number;
  }>({ width: 0, duration: 0 });

  // Use a ref to track the last paused progress so we can resume from it
  const lastProgressRef = useRef(0);

  useEffect(() => {
    if (!showProgress) {
      setProgressState({ width: 0, duration: 0 });
      lastProgressRef.current = 0;
      return;
    }

    const remainingTime = getRemainingTime();
    if (!interval || interval <= 0) {
      return;
    }
    const currentProgress = 1 - remainingTime / interval;

    if (isPlaying) {
      lastProgressRef.current = currentProgress;
      setProgressState({
        width: INDICATOR_ACTIVE_WIDTH,
        duration: remainingTime,
      });
    } else {
      setProgressState({
        width: currentProgress * INDICATOR_ACTIVE_WIDTH,
        duration: 0,
      });
      lastProgressRef.current = currentProgress;
    }
  }, [isPlaying, showProgress, interval, getRemainingTime]);

  // Use spring with duration config for linear timed animation
  // immediate: true when duration is 0 to force instant snap (not animated)
  const progressSpring = useSpring({
    width: progressState.width,
    config: progressState.duration > 0 ? { duration: progressState.duration } : { duration: 0 },
    immediate: progressState.duration === 0,
  });

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      borderColor="transparent"
      borderRadius={100}
      borderWidth={0}
      onPress={onPress}
      overflow="hidden"
      style={style}
      testID={`carousel-page-${index}`}
    >
      <animated.View
        style={{
          width: springProps.width,
          height: INDICATOR_HEIGHT,
          backgroundColor: springProps.backgroundColor,
          borderRadius: theme.borderRadius[100],
          overflow: 'hidden',
        }}
      >
        {showProgress && (
          <animated.View
            style={{
              width: progressSpring.width,
              height: '100%',
              backgroundColor: theme.color.bgPrimary,
              borderRadius: theme.borderRadius[100],
            }}
          />
        )}
      </animated.View>
    </Pressable>
  );
});

const defaultPaginationAccessibilityLabel = (pageIndex: number) => `Go to page ${pageIndex + 1}`;

export const DefaultCarouselPagination = memo(function DefaultCarouselPagination({
  totalPages,
  activePageIndex,
  onPressPage,
  style,
  styles,
  paginationAccessibilityLabel = defaultPaginationAccessibilityLabel,
  variant = 'pill',
}: DefaultCarouselPaginationProps) {
  const theme = useTheme();
  const isDot = variant === 'dot';

  // Using paddingVertical here instead of HStack prop so it can be overridden by custom styles
  const rootStyles = useMemo(
    () => [{ paddingVertical: theme.space[0.5] }, style, styles?.root],
    [style, styles?.root, theme.space],
  );

  const getAccessibilityLabel = (index: number) =>
    typeof paginationAccessibilityLabel === 'function'
      ? paginationAccessibilityLabel(index)
      : paginationAccessibilityLabel;

  return (
    <HStack gap={0.5} justifyContent="center" style={rootStyles}>
      {totalPages > 0 ? (
        Array.from({ length: totalPages }, (_, index) =>
          isDot ? (
            <PaginationDot
              key={index}
              accessibilityLabel={getAccessibilityLabel(index)}
              index={index}
              isActive={index === activePageIndex}
              onPress={() => onPressPage(index)}
              style={styles?.dot}
            />
          ) : (
            <PaginationPill
              key={index}
              accessibilityLabel={getAccessibilityLabel(index)}
              index={index}
              isActive={index === activePageIndex}
              onPress={() => onPressPage(index)}
              style={styles?.dot}
            />
          ),
        )
      ) : (
        <Pressable
          disabled
          background="bgLine"
          borderColor="transparent"
          borderRadius={100}
          height={INDICATOR_HEIGHT}
          style={[{ opacity: 0 }, styles?.dot]}
          width={isDot ? INDICATOR_INACTIVE_WIDTH : INDICATOR_ACTIVE_WIDTH}
        />
      )}
    </HStack>
  );
});
