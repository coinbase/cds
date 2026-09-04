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

// single sheet is too large for Percy, need to split up in chunks of 240 to stay under resource limit
export const spotSquareSheet1 = getIllustrationSheet({
  type: 'spotSquare',
  startIndex: 0,
  endIndex: 240,
});
export const spotSquareSheet2 = getIllustrationSheet({
  type: 'spotSquare',
  startIndex: 240,
  endIndex: 480,
});
