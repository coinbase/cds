import type React from 'react';

export type ProgressContainerWithButtonsProps = {
  hideIncrease?: boolean;
  children: (props: {
    calculateProgress: (perc: number) => number;
  }) => React.ReactNode | React.ReactNode[];
};
