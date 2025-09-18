import { useEffect, useRef, useState } from 'react';
import { isStorybook } from '@cbhq/cds-utils';

export type UseCounterParams = {
  startNum: number;
  endNum: number;
  durationInMillis: number;
};

export const useCounter = ({ startNum, endNum, durationInMillis }: UseCounterParams) => {
  const skipAnimation = isStorybook();
  const [count, setCount] = useState(skipAnimation ? endNum : startNum);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const clearTimeoutRef = () => {
      clearTimeout(timeoutRef.current as ReturnType<typeof setTimeout>);
    };
    if (skipAnimation) {
      return clearTimeoutRef;
    }
    const startTime = Date.now();
    const endTime = startTime + durationInMillis;
    clearTimeoutRef();
    let currCount = startNum;

    function runUpdateAfterTimer() {
      if (currCount === endNum) {
        return;
      }

      const currTime = Date.now();
      const timeLeft = endTime - currTime;
      const incrementTime = timeLeft / Math.abs(endNum - currCount); // durationInMillis / Math.abs(endNum - startNum);

      timeoutRef.current = setTimeout(() => {
        if (currCount === endNum) {
          return;
        }

        const percentDone = (currTime - startTime) / Math.abs(endTime - startTime);
        const increment = Math.ceil(percentDone * Math.abs(endNum - startNum));

        if (endNum > startNum) {
          currCount = Math.min(startNum + increment, endNum);
        } else {
          currCount = Math.max(startNum - increment, endNum);
        }

        setCount(currCount);

        runUpdateAfterTimer();
      }, incrementTime);
    }

    if (currCount !== endNum) {
      runUpdateAfterTimer();
    }

    return clearTimeoutRef;
  }, [startNum, endNum, durationInMillis, skipAnimation]);

  return count;
};
