import type { Weight } from '../types/Weight';

export const getProgressSize = (weight: Weight) => {
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
};
