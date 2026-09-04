import React, { createContext, memo, useContext, useMemo, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { noop } from '@coinbase/cds-utils';

type SparklineInteractiveScrubContextInterface = {
  setLineDOMNode: Dispatch<SetStateAction<HTMLDivElement | null>>; // update the dom directly for performance
  setMaskDOMNode: Dispatch<SetStateAction<HTMLDivElement | null>>; // update the dom directly for performance
  setHoverDateDOMNode: Dispatch<SetStateAction<HTMLSpanElement | null>>; // update the dom directly for performance
  setHoverPriceDOMNode: Dispatch<SetStateAction<HTMLSpanElement | null>>; // update the dom directly for performance
  lineDOMNode: HTMLDivElement | null;
  maskDOMNode: HTMLDivElement | null;
  hoverDateDOMNode: HTMLSpanElement | null;
  hoverPriceDOMNode: HTMLSpanElement | null;
};

const SparklineInteractiveScrubContext = createContext<SparklineInteractiveScrubContextInterface>({
  setLineDOMNode: noop,
  setMaskDOMNode: noop,
  setHoverDateDOMNode: noop,
  setHoverPriceDOMNode: noop,
  lineDOMNode: null,
  maskDOMNode: null,
  hoverDateDOMNode: null,
  hoverPriceDOMNode: null,
});

export const SparklineInteractiveScrubProvider = memo(
  ({ children }: { children: React.ReactNode }) => {
    const [lineDOMNode, setLineDOMNode] = useState<HTMLDivElement | null>(null);
    const [maskDOMNode, setMaskDOMNode] = useState<HTMLDivElement | null>(null);
    const [hoverDateDOMNode, setHoverDateDOMNode] = useState<HTMLSpanElement | null>(null);
    const [hoverPriceDOMNode, setHoverPriceDOMNode] = useState<HTMLSpanElement | null>(null);

    const value = useMemo(
      () => ({
        setLineDOMNode,
        setMaskDOMNode,
        lineDOMNode,
        maskDOMNode,
        hoverDateDOMNode,
        setHoverDateDOMNode,
        setHoverPriceDOMNode,
        hoverPriceDOMNode,
      }),
      [hoverDateDOMNode, lineDOMNode, maskDOMNode, hoverPriceDOMNode],
    );

    return (
      <SparklineInteractiveScrubContext.Provider value={value}>
        {children}
      </SparklineInteractiveScrubContext.Provider>
    );
  },
);

export function useSparklineInteractiveScrubContext() {
  return useContext(SparklineInteractiveScrubContext);
}
