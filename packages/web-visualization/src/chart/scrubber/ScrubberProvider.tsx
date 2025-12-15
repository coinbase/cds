import React, { useMemo } from 'react';

import { ScrubberContext, type ScrubberContextValue, useHighlightContext } from '../utils';

export type ScrubberProviderProps = {
  children: React.ReactNode;
  /**
   * Whether scrubbing interaction is enabled.
   * @deprecated Use `enableHighlighting` on the chart component instead.
   * @default false
   */
  enableScrubbing?: boolean;
  /**
   * Callback fired when the scrubber position changes.
   * Receives the dataIndex of the scrubber or undefined when not scrubbing.
   * @deprecated Use `onHighlightChange` on the chart component instead.
   */
  onScrubberPositionChange?: (index: number | undefined) => void;
};

/**
 * Provides scrubber context for backwards compatibility.
 * @deprecated Interaction handling has moved to CartesianChart.
 * This component now only provides context values for components that read scrubberPosition.
 */
export const ScrubberProvider: React.FC<ScrubberProviderProps> = ({
  children,
  enableScrubbing = false,
}) => {
  const highlightContext = useHighlightContext();

  // Expose scrubberPosition for backwards compatibility (deprecated)
  const scrubberPosition = highlightContext?.highlightedItem?.dataIndex;

  const contextValue: ScrubberContextValue = useMemo(
    () => ({
      enableScrubbing,
      scrubberPosition,
    }),
    [enableScrubbing, scrubberPosition],
  );

  return <ScrubberContext.Provider value={contextValue}>{children}</ScrubberContext.Provider>;
};
