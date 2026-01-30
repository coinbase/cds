import React, { useContext } from 'react';
import type { Rect } from '@coinbase/cds-common/types';
import type { SpringValue } from '@react-spring/native';

export type CarouselContextValue = {
  registerItem: (id: string, state: Rect) => void;
  unregisterItem: (id: string) => void;
  /**
   * Set of item IDs that are currently visible in the carousel viewport.
   */
  visibleCarouselItems: Set<string>;
};

export const CarouselContext = React.createContext<CarouselContextValue | undefined>(undefined);

export const useCarouselContext = (): CarouselContextValue => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarouselContext must be used within a Carousel component');
  }
  return context;
};

export type CarouselAutoplayContextValue = {
  /**
   * Whether autoplay is enabled via props.
   */
  isEnabled: boolean;
  /**
   * Whether autoplay has been stopped by the user.
   */
  isStopped: boolean;
  /**
   * Whether autoplay is temporarily paused due to user interaction (hover/touch).
   */
  isPaused: boolean;
  /**
   * Whether autoplay is actively running (enabled AND not stopped AND not paused).
   */
  isPlaying: boolean;
  /**
   * Progress through the current interval (0-1).
   * Updates via SpringValue to enable smooth animations.
   */
  progress: SpringValue<number>;
  /**
   * Start autoplay (user action via toggle button).
   */
  start: () => void;
  /**
   * Stop autoplay (user action via toggle button).
   */
  stop: () => void;
  /**
   * Toggle autoplay on/off.
   */
  toggle: () => void;
  /**
   * Reset the autoplay timer.
   */
  reset: () => void;
  /**
   * Temporarily pause autoplay (for hover/touch interactions).
   */
  pause: () => void;
  /**
   * Resume autoplay after interaction pause.
   */
  resume: () => void;
};

export const CarouselAutoplayContext = React.createContext<
  CarouselAutoplayContextValue | undefined
>(undefined);

export const useCarouselAutoplayContext = (): CarouselAutoplayContextValue => {
  const context = useContext(CarouselAutoplayContext);
  if (!context) {
    throw new Error('useCarouselAutoplayContext must be used within a Carousel component');
  }
  return context;
};
