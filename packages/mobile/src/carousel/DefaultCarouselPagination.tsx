import React, { memo, useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { animated } from '@react-spring/native';

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

type PaginationDotProps = {
  index: number;
  isActive: boolean;
  onPress: () => void;
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
};

const DOT_WIDTH = 24;
const DOT_HEIGHT = 4;

const PaginationDot = memo(function PaginationDot({
  index,
  isActive,
  onPress,
  accessibilityLabel,
  style,
}: PaginationDotProps) {
  const theme = useTheme();
  const autoplayContext = useCarouselAutoplayContext();

  // Show progress bar when autoplay is enabled on the active dot
  const showProgress = isActive && autoplayContext.isEnabled;

  // Transform progress (0-1) to width
  const progressWidth = autoplayContext.progress.to((value: number) => value * DOT_WIDTH);

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      background={isActive && !showProgress ? 'bgPrimary' : 'bgLine'}
      borderColor="transparent"
      borderRadius={100}
      borderWidth={0}
      height={DOT_HEIGHT}
      onPress={onPress}
      overflow="hidden"
      style={style}
      testID={`carousel-page-${index}`}
      width={DOT_WIDTH}
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
    </Pressable>
  );
});

export const DefaultCarouselPagination = memo(function DefaultCarouselPagination({
  totalPages,
  activePageIndex,
  onPressPage,
  style,
  styles,
  paginationAccessibilityLabel = 'Go to page',
}: DefaultCarouselPaginationProps) {
  const theme = useTheme();

  // Using paddingVertical here instead of HStack prop so it can be overridden by custom styles
  const rootStyles = useMemo(
    () => [{ paddingVertical: theme.space[0.5] }, style, styles?.root],
    [style, styles?.root, theme.space],
  );

  return (
    <HStack gap={0.5} justifyContent="center" style={rootStyles}>
      {totalPages > 0 ? (
        Array.from({ length: totalPages }, (_, index) => (
          <PaginationDot
            key={index}
            accessibilityLabel={
              typeof paginationAccessibilityLabel === 'function'
                ? paginationAccessibilityLabel(index)
                : `${paginationAccessibilityLabel} ${index + 1}`
            }
            index={index}
            isActive={index === activePageIndex}
            onPress={() => onPressPage(index)}
            style={styles?.dot}
          />
        ))
      ) : (
        <Pressable
          disabled
          background="bgLine"
          borderColor="transparent"
          borderRadius={100}
          height={DOT_HEIGHT}
          style={[{ opacity: 0 }, styles?.dot]}
          width={DOT_WIDTH}
        />
      )}
    </HStack>
  );
});
