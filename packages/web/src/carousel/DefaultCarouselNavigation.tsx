import React, { memo } from 'react';
import type { IconButtonVariant } from '@coinbase/cds-common/types/IconButtonBaseProps';
import type { IconName } from '@coinbase/cds-common/types/IconName';
import { css } from '@linaria/core';

import { IconButton } from '../buttons/IconButton';
import { cx } from '../cx';
import { HStack } from '../layout/HStack';

import type { CarouselNavigationComponentProps } from './Carousel';

const navigationCss = css`
  padding: var(--space-0_5) 0;

  &[data-hiddenunlessfocused='true'] {
    opacity: 0;
    pointer-events: none;

    &:focus-within {
      opacity: 1;
      pointer-events: auto;
    }
  }
`;

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
   * Whether the navigation buttons should be hidden unless focused.
   */
  hideUnlessFocused?: boolean;
  /**
   * Custom class names for the component.
   */
  classNames?: {
    /**
     * Custom class name for the root element.
     */
    root?: string;
    /**
     * Custom class name for the previous button.
     */
    previousButton?: string;
    /**
     * Custom class name for the next button.
     */
    nextButton?: string;
    /**
     * Custom class name for the autoplay button.
     */
    autoplayButton?: string;
  };
  /**
   * Custom styles for the component.
   */
  styles?: {
    /**
     * Custom styles for the root element.
     */
    root?: React.CSSProperties;
    /**
     * Custom styles for the previous button.
     */
    previousButton?: React.CSSProperties;
    /**
     * Custom styles for the next button.
     */
    nextButton?: React.CSSProperties;
    /**
     * Custom styles for the autoplay button.
     */
    autoplayButton?: React.CSSProperties;
  };
};

export const DefaultCarouselNavigation = memo(function DefaultCarouselNavigation({
  onGoPrevious,
  onGoNext,
  disableGoPrevious,
  disableGoNext,
  nextPageAccessibilityLabel = 'Next page',
  previousPageAccessibilityLabel = 'Previous page',
  autoplay,
  isAutoplayStopped,
  onToggleAutoplay,
  startAutoplayAccessibilityLabel = 'Play Carousel',
  stopAutoplayAccessibilityLabel = 'Pause Carousel',
  previousIcon = 'caretLeft',
  nextIcon = 'caretRight',
  startIcon = 'play',
  stopIcon = 'pause',
  variant = 'secondary',
  compact,
  className,
  classNames,
  style,
  styles,
  testIDMap,
  hideUnlessFocused,
}: DefaultCarouselNavigationProps) {
  return (
    <HStack
      className={cx(navigationCss, className, classNames?.root)}
      data-hiddenunlessfocused={hideUnlessFocused}
      gap={1}
      style={{ ...style, ...styles?.root }}
    >
      {autoplay && (
        <IconButton
          accessibilityLabel={
            isAutoplayStopped ? startAutoplayAccessibilityLabel : stopAutoplayAccessibilityLabel
          }
          className={classNames?.autoplayButton}
          compact={compact}
          name={isAutoplayStopped ? startIcon : stopIcon}
          onClick={onToggleAutoplay}
          style={styles?.autoplayButton}
          testID={testIDMap?.autoplayButton ?? 'carousel-autoplay-button'}
          variant={variant}
        />
      )}
      <IconButton
        accessibilityLabel={previousPageAccessibilityLabel}
        className={classNames?.previousButton}
        compact={compact}
        disabled={disableGoPrevious}
        name={previousIcon}
        onClick={onGoPrevious}
        style={styles?.previousButton}
        testID={testIDMap?.previousButton ?? 'carousel-previous-button'}
        variant={variant}
      />
      <IconButton
        accessibilityLabel={nextPageAccessibilityLabel}
        className={classNames?.nextButton}
        compact={compact}
        disabled={disableGoNext}
        name={nextIcon}
        onClick={onGoNext}
        style={styles?.nextButton}
        testID={testIDMap?.nextButton ?? 'carousel-next-button'}
        variant={variant}
      />
    </HStack>
  );
});
