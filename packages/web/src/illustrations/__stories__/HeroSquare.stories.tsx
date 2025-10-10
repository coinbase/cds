/**
 * DO NOT MODIFY
 * Generated from yarn nx run illustrations:generate-stories
 */

import { HeroSquare } from '../HeroSquare';

import { getIllustrationSheet } from './getIllustrationSheet';
import { IllustrationExample } from './IllustrationExample';

export default {
  title: 'Illustrations',
  component: HeroSquare,
};

export const heroSquare = () => (
  <IllustrationExample>
    <HeroSquare name="accessToAdvancedCharts" scaleMultiplier={1} />
  </IllustrationExample>
);

// single sheet is too large for Percy, need to split up in chunks of 240 to stay under resource limit
export const heroSquareSheet1 = getIllustrationSheet({
  type: 'heroSquare',
  startIndex: 0,
  endIndex: 240,
});
export const heroSquareSheet2 = getIllustrationSheet({
  type: 'heroSquare',
  startIndex: 240,
  endIndex: 480,
});
