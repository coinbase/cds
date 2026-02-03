import React, { memo, useMemo } from 'react';
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

const DOT_WIDTH = 24;
const DOT_HEIGHT = 4;

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
      height={DOT_HEIGHT}
      onPress={onPress}
      style={style}
      testID={`carousel-page-${index}`}
      width={DOT_WIDTH}
    />
  );
});

const PaginationDot = memo(function PaginationDot({
  index,
  isActive,
  onPress,
  accessibilityLabel,
  style,
}: PaginationIndicatorProps) {
  const theme = useTheme();
  const autoplayContext = useCarouselAutoplayContext();

  const showProgress = isActive && autoplayContext.isEnabled;

  const springProps = useSpring({
    width: isActive ? DOT_WIDTH : DOT_HEIGHT,
    backgroundColor: isActive && !showProgress ? theme.color.bgPrimary : theme.color.bgLine,
    config: { tension: 300, friction: 25 },
  });

  const progressWidth = autoplayContext.progress.to((value: number) => value * DOT_WIDTH);

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
          height: DOT_HEIGHT,
          backgroundColor: springProps.backgroundColor,
          borderRadius: theme.borderRadius[100],
          overflow: 'hidden',
        }}
      >
        {showProgress && (
          <animated.View
            style={{
              width: progressWidth,
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
          height={DOT_HEIGHT}
          style={[{ opacity: 0 }, styles?.dot]}
          width={isDot ? DOT_HEIGHT : DOT_WIDTH}
        />
      )}
    </HStack>
  );
});
