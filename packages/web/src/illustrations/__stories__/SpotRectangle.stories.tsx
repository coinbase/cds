/**
 * DO NOT MODIFY
 * Generated from yarn nx run illustrations:generate-stories
 */

import { SpotRectangle } from '../SpotRectangle';

import { getIllustrationSheet } from './getIllustrationSheet';
import { IllustrationExample } from './IllustrationExample';

export default {
  title: 'Illustrations',
  component: SpotRectangle,
};

export const spotRectangle = () => (
  <IllustrationExample>
    <SpotRectangle name="accessToAdvancedCharts" scaleMultiplier={1} />
  </IllustrationExample>
);

// single sheet is too large for Percy, need to split up in chunks to stay under resource limit
export const SpotRectangleSheet1 = getIllustrationSheet({
  type: 'spotRectangle',
  startIndex: 0,
  endIndex: 120,
});
export const SpotRectangleSheet2 = getIllustrationSheet({
  type: 'spotRectangle',
  startIndex: 120,
  endIndex: 240,
});
export const SpotRectangleSheet3 = getIllustrationSheet({
  type: 'spotRectangle',
  startIndex: 240,
  endIndex: 360,
});
export const SpotRectangleSheet4 = getIllustrationSheet({
  type: 'spotRectangle',
  startIndex: 360,
  endIndex: 480,
});
