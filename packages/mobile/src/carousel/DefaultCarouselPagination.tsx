import React, { memo, useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { HStack } from '../layout/HStack';
import { Pressable } from '../system/Pressable';

import type { CarouselPaginationComponentProps } from './Carousel';

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
          <Pressable
            key={index}
            accessibilityLabel={
              typeof paginationAccessibilityLabel === 'function'
                ? paginationAccessibilityLabel(index)
                : `${paginationAccessibilityLabel} ${index + 1}`
            }
            background={index === activePageIndex ? 'bgPrimary' : 'bgLine'}
            borderColor="transparent"
            borderRadius={100}
            height={4}
            onPress={() => onPressPage(index)}
            style={styles?.dot}
            testID={`carousel-page-${index}`}
            width={24}
          />
        ))
      ) : (
        <Pressable
          disabled
          background="bgLine"
          borderColor="transparent"
          borderRadius={100}
          height={4}
          style={[{ opacity: 0 }, styles?.dot]}
          width={24}
        />
      )}
    </HStack>
  );
});
