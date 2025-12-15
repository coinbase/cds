import React, { useCallback, useMemo, useState } from 'react';

import { HighlightContext, type HighlightContextValue, type HighlightedItemData } from './utils';

export type HighlightProviderBaseProps = {
  /**
   * Whether highlighting is enabled.
   * @default false
   */
  enableHighlighting?: boolean;
  /**
   * The highlighted item (controlled mode).
   * Pass null to explicitly clear, or leave undefined for uncontrolled mode.
   */
  highlightedItem?: HighlightedItemData | null;
  /**
   * Callback when highlighted item changes.
   */
  onHighlightChange?: (item: HighlightedItemData | null) => void;
};

export type HighlightProviderProps = HighlightProviderBaseProps & {
  children: React.ReactNode;
};

/**
 * A component which encapsulates the HighlightContext.
 * Provides unified highlight state management for both Cartesian and Polar charts.
 *
 * Supports both controlled and uncontrolled modes:
 * - Uncontrolled: Internal state management (default)
 * - Controlled: Pass `highlightedItem` prop to control externally
 */
export const HighlightProvider: React.FC<HighlightProviderProps> = ({
  children,
  enableHighlighting = false,
  highlightedItem: highlightedItemProp,
  onHighlightChange,
}) => {
  const [internalHighlightedItem, setInternalHighlightedItem] = useState<
    HighlightedItemData | undefined
  >();

  // Prop takes precedence over internal state when defined
  // This allows parent components to override/control the highlight
  // Only expose highlightedItem when highlighting is enabled
  const highlightedItem = enableHighlighting
    ? (highlightedItemProp ?? internalHighlightedItem)
    : undefined;

  const setHighlightedItem: HighlightContextValue['setHighlightedItem'] = useCallback(
    (itemOrUpdater) => {
      // Don't allow setting highlighted item when highlighting is disabled
      if (!enableHighlighting) return;

      const newItem =
        typeof itemOrUpdater === 'function' ? itemOrUpdater(highlightedItem) : itemOrUpdater;

      // Always update internal state - this ensures clearing works
      setInternalHighlightedItem(newItem);

      // Always call the callback
      onHighlightChange?.(newItem ?? null);
    },
    [enableHighlighting, highlightedItem, onHighlightChange],
  );

  const contextValue: HighlightContextValue = useMemo(
    () => ({
      enableHighlighting,
      highlightedItem,
      setHighlightedItem,
    }),
    [enableHighlighting, highlightedItem, setHighlightedItem],
  );

  return <HighlightContext.Provider value={contextValue}>{children}</HighlightContext.Provider>;
};
