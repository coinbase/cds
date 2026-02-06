import React, { memo, useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { IconButtonVariant, IconName } from '@coinbase/cds-common';

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
    /**
     * Test ID for the autoplay button.
     */
    autoplayButton?: string;
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
   * Icon to use for the start autoplay button.
   */
  startIcon?: IconName;
  /**
   * Icon to use for the stop autoplay button.
   */
  stopIcon?: IconName;
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
    /**
     * Custom styles for the autoplay button.
     */
    autoplayButton?: StyleProp<ViewStyle>;
  };
};

export const DefaultCarouselNavigation = memo(function DefaultCarouselNavigation({
  onGoPrevious,
  onGoNext,
  disableGoPrevious,
  disableGoNext,
  previousPageAccessibilityLabel = 'Previous page',
  nextPageAccessibilityLabel = 'Next page',
  autoplay,
  isAutoplayStopped,
  onToggleAutoplay,
  startAutoplayAccessibilityLabel = 'Play Carousel',
  stopAutoplayAccessibilityLabel = 'Pause Carousel',
  variant = 'secondary',
  compact,
  previousIcon = 'caretLeft',
  nextIcon = 'caretRight',
  startIcon = 'play',
  stopIcon = 'pause',
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
      {autoplay && (
        <IconButton
          accessibilityLabel={
            isAutoplayStopped ? startAutoplayAccessibilityLabel : stopAutoplayAccessibilityLabel
          }
          compact={compact}
          name={isAutoplayStopped ? startIcon : stopIcon}
          onPress={onToggleAutoplay}
          style={styles?.autoplayButton}
          testID={testIDMap?.autoplayButton ?? 'carousel-autoplay-button'}
          variant={variant}
        />
      )}
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
