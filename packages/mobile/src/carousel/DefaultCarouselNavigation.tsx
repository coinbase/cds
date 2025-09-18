import React, { memo, useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { IconButtonVariant, IconName } from '@cbhq/cds-common';

import { IconButton } from '../buttons/IconButton';
import { useTheme } from '../hooks/useTheme';
import { HStack } from '../layout/HStack';

import type { CarouselNavigationComponentProps } from './Carousel';

export type DefaultCarouselNavigationProps = CarouselNavigationComponentProps & {
  /**
   * Test ID map for the component.
   */
  testIDMap?: {
    /**
     * Test ID for the previous button.
     */
    previousButton?: string;
    /**
     * Test ID for the next button.
     */
    nextButton?: string;
  };
  /**
   * Icon to use for the previous button.
   */
  previousIcon?: IconName;
  /**
   * Icon to use for the next button.
   */
  nextIcon?: IconName;
  /**
   * Variant of the icon button.
   */
  variant?: IconButtonVariant;
  /**
   * Whether the icon button is compact.
   */
  compact?: boolean;
  /**
   * Custom styles for the component.
   */
  styles?: {
    /**
     * Custom styles for the root element.
     */
    root?: StyleProp<ViewStyle>;
    /**
     * Custom styles for the previous button.
     */
    previousButton?: StyleProp<ViewStyle>;
    /**
     * Custom styles for the next button.
     */
    nextButton?: StyleProp<ViewStyle>;
  };
};

export const DefaultCarouselNavigation = memo(function DefaultCarouselNavigation({
  onGoPrevious,
  onGoNext,
  disableGoPrevious,
  disableGoNext,
  previousPageAccessibilityLabel = 'Previous page',
  nextPageAccessibilityLabel = 'Next page',
  variant = 'secondary',
  compact,
  previousIcon = 'caretLeft',
  nextIcon = 'caretRight',
  style,
  styles,
  testIDMap,
}: DefaultCarouselNavigationProps) {
  const theme = useTheme();

  // Using paddingVertical here instead of HStack prop so it can be overridden by custom styles
  const rootStyles = useMemo(
    () => [{ paddingVertical: theme.space[0.5] }, style, styles?.root],
    [style, styles?.root, theme.space],
  );

  return (
    <HStack gap={1} style={rootStyles}>
      <IconButton
        accessibilityLabel={previousPageAccessibilityLabel}
        compact={compact}
        disabled={disableGoPrevious}
        name={previousIcon}
        onPress={onGoPrevious}
        style={styles?.previousButton}
        testID={testIDMap?.previousButton ?? 'carousel-previous-button'}
        variant={variant}
      />
      <IconButton
        accessibilityLabel={nextPageAccessibilityLabel}
        compact={compact}
        disabled={disableGoNext}
        name={nextIcon}
        onPress={onGoNext}
        style={styles?.nextButton}
        testID={testIDMap?.nextButton ?? 'carousel-next-button'}
        variant={variant}
      />
    </HStack>
  );
});
