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

// single sheet is too large for Percy, need to split up in chunks to stay under resource limit
export const HeroSquareSheet1 = getIllustrationSheet({
  type: 'heroSquare',
  startIndex: 0,
  endIndex: 120,
});
export const HeroSquareSheet2 = getIllustrationSheet({
  type: 'heroSquare',
  startIndex: 120,
  endIndex: 240,
});
export const HeroSquareSheet3 = getIllustrationSheet({
  type: 'heroSquare',
  startIndex: 240,
  endIndex: 360,
});
export const HeroSquareSheet4 = getIllustrationSheet({
  type: 'heroSquare',
  startIndex: 360,
  endIndex: 480,
});
