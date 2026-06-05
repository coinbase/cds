import React, { createContext, memo, useCallback, useContext, useMemo, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { noop } from '@coinbase/cds-utils';

type SparklineInteractiveProviderProps = {
  children: React.ReactNode;
  compact?: boolean;
};

type SparklineInteractiveContextInterface = {
  isFallbackVisible: boolean;
  compact: boolean;
  width: number;
  height: number;
  showFallback: () => void;
  hideFallback: () => void;
  setWidth: Dispatch<SetStateAction<number>>;
  setHeight: Dispatch<SetStateAction<number>>;
};

const SparklineInteractiveContext = createContext<SparklineInteractiveContextInterface>({
  isFallbackVisible: true,
  compact: false,
  width: 0,
  height: 0,
  showFallback: noop,
  hideFallback: noop,
  setWidth: noop,
  setHeight: noop,
});

export const SparklineInteractiveProvider = memo(
  ({ children, compact = false }: SparklineInteractiveProviderProps) => {
    const [isFallbackVisible, setIsFallbackVisible] = useState(true);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const showFallback = useCallback(() => {
      setIsFallbackVisible(true);
    }, [setIsFallbackVisible]);

    const hideFallback = useCallback(() => {
      setIsFallbackVisible(false);
    }, [setIsFallbackVisible]);

    const value = useMemo(
      () => ({
        compact,
        width,
        height,
        showFallback,
        hideFallback,
        isFallbackVisible,
        setHeight,
        setWidth,
      }),
      [compact, height, hideFallback, isFallbackVisible, showFallback, width],
    );

    return (
      <SparklineInteractiveContext.Provider value={value}>
        {children}
      </SparklineInteractiveContext.Provider>
    );
  },
);

export function useSparklineInteractiveContext() {
  return useContext(SparklineInteractiveContext);
}
