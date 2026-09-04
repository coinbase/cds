import { useCallback, useMemo, useState } from 'react';
import { noop } from '@coinbase/cds-utils';

type StepTrackerParams = {
  length: number;
  startIndex?: number;
  onDecrement?: (newIndex: number) => void;
  onIncrement?: (newIndex: number) => void;
  onMinDecrement?: () => void;
  onMaxIncrement?: () => void;
};

export function useIndexCounter({
  length,
  startIndex = 0,
  onDecrement = noop,
  onIncrement = noop,
  onMinDecrement = noop,
  onMaxIncrement = noop,
}: StepTrackerParams) {
  const [activeIndex, setActiveIndex] = useState(startIndex);

  const isAtMin = activeIndex === 0;
  const isAtMax = activeIndex === length - 1;

  const handleDecrement = useCallback(() => {
    if (isAtMin) {
      onMinDecrement();
    } else {
      setActiveIndex((curr) => {
        const newactiveIndex = curr - 1;
        onDecrement(newactiveIndex);
        return newactiveIndex;
      });
    }
  }, [isAtMin, onDecrement, onMinDecrement]);

  const handleIncrement = useCallback(() => {
    if (isAtMax) {
      onMaxIncrement();
    } else {
      setActiveIndex((curr) => {
        const newactiveIndex = curr + 1;
        onIncrement(newactiveIndex);
        return newactiveIndex;
      });
    }
  }, [isAtMax, onMaxIncrement, onIncrement]);

  return useMemo(() => {
    return {
      activeIndex,
      setActiveIndex,
      isAtMin,
      isAtMax,
      handleDecrement,
      handleIncrement,
    };
  }, [activeIndex, handleDecrement, handleIncrement, isAtMin, isAtMax]);
}
