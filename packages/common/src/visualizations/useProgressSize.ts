import { useMemo } from 'react';

import type { Weight } from '../types/Weight';

export const useProgressSize = (weight: Weight) => {
  return useMemo(() => {
    switch (weight) {
      case 'semiheavy':
        return 8;
      case 'heavy':
        return 12;
      case 'thin':
        return 2;
      default:
        return 4;
    }
  }, [weight]);
};
