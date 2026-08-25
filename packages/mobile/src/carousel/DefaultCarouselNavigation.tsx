import React, { memo, useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { IconButtonVariant } from '@coinbase/cds-common/types/IconButtonBaseProps';
import type { IconName } from '@coinbase/cds-common/types/IconName';

import type { IconButtonSize } from '../buttons/IconButton';
import { IconButton } from '../buttons/IconButton';
import { useTheme } from '../hooks/useTheme';
import { HStack } from '../layout/HStack';

import type { CarouselNavigationComponentProps } from './Carousel';

/** Size the navigation buttons render at when neither `iconButtonSize` nor `compact` is set. */
const defaultIconButtonSize: IconButtonSize = 's';

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
   * Size of the navigation icon buttons.
   * @default 's'
   */
  iconButtonSize?: IconButtonSize;
  /**
   * Whether the icon button is compact.
   * @deprecated Use `iconButtonSize="s"` instead. This will be removed in a future major release.
   * @deprecationExpectedRemoval v11
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
  iconButtonSize,
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

  // `compact` was forwarded straight to `IconButton`, which defaults its own `compact` to `true` —
  // so these buttons have always rendered dense unless a caller explicitly passed `compact={false}`,
  // which then fell back to IconButton's `l`. `iconButtonSize` wins when set.
  const resolvedIconButtonSize =
    iconButtonSize ?? ((compact ?? true) ? defaultIconButtonSize : 'l');

  return (
    <HStack gap={1} style={rootStyles}>
      {autoplay && (
        <IconButton
          accessibilityLabel={
            isAutoplayStopped ? startAutoplayAccessibilityLabel : stopAutoplayAccessibilityLabel
          }
          name={isAutoplayStopped ? startIcon : stopIcon}
          onPress={onToggleAutoplay}
          size={resolvedIconButtonSize}
          style={styles?.autoplayButton}
          testID={testIDMap?.autoplayButton ?? 'carousel-autoplay-button'}
          variant={variant}
        />
      )}
      <IconButton
        accessibilityLabel={previousPageAccessibilityLabel}
        disabled={disableGoPrevious}
        name={previousIcon}
        onPress={onGoPrevious}
        size={resolvedIconButtonSize}
        style={styles?.previousButton}
        testID={testIDMap?.previousButton ?? 'carousel-previous-button'}
        variant={variant}
      />
      <IconButton
        accessibilityLabel={nextPageAccessibilityLabel}
        disabled={disableGoNext}
        name={nextIcon}
        onPress={onGoNext}
        size={resolvedIconButtonSize}
        style={styles?.nextButton}
        testID={testIDMap?.nextButton ?? 'carousel-next-button'}
        variant={variant}
      />
    </HStack>
  );
});
