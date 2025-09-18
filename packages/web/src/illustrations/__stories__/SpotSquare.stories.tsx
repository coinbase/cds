/**
 * DO NOT MODIFY
 * Generated from yarn nx run illustrations:generate-stories
 */

import { SpotSquare } from '../SpotSquare';

import { getIllustrationSheet } from './getIllustrationSheet';
import { IllustrationExample } from './IllustrationExample';

export default {
  title: 'Illustrations',
  component: SpotSquare,
};

export const spotSquare = () => (
  <IllustrationExample>
    <SpotSquare name="accessToAdvancedCharts" scaleMultiplier={1} />
  </IllustrationExample>
);

// single sheet is too large for Percy, need to split up in chunks to stay under resource limit
export const SpotSquareSheet1 = getIllustrationSheet({
  type: 'spotSquare',
  startIndex: 0,
  endIndex: 120,
});
export const SpotSquareSheet2 = getIllustrationSheet({
  type: 'spotSquare',
  startIndex: 120,
  endIndex: 240,
});
export const SpotSquareSheet3 = getIllustrationSheet({
  type: 'spotSquare',
  startIndex: 240,
  endIndex: 360,
});
export const SpotSquareSheet4 = getIllustrationSheet({
  type: 'spotSquare',
  startIndex: 360,
  endIndex: 480,
});
