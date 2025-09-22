import React, { useCallback, useState } from 'react';
import type { ProgressContainerWithButtonsProps } from '@cbhq/cds-common/types/ProgressContainerWithButtonsProps';

import { Button } from '../buttons/Button';
import { VStack } from '../layout/VStack';

export const ProgressContainerWithButtons = ({
  children,
  hideIncrease,
}: ProgressContainerWithButtonsProps) => {
  const [num, setNum] = useState(0);
  const [percentIncrease, setPercentIncrease] = useState(0);

  const reRender = useCallback(() => {
    setNum((prevNum) => prevNum + 1);
  }, [setNum]);

  const increase = useCallback(() => {
    setPercentIncrease((prevPercentIncrease) => (prevPercentIncrease + 0.2) % 1);
  }, [setPercentIncrease]);

  const calculateProgress = useCallback(
    (currPercent: number) => {
      const newNum = currPercent + percentIncrease;
      if (newNum === 1) {
        return newNum;
      }

      return newNum % 1;
    },
    [percentIncrease],
  );

  return (
    <VStack key={num} gap={2}>
      {children({ calculateProgress })}
      <Button compact onClick={reRender}>
        Re-render
      </Button>
      {!hideIncrease && (
        <Button compact onClick={increase}>
          Increase 20%
        </Button>
      )}
    </VStack>
  );
};
