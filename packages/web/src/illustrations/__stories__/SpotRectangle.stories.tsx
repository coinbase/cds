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

// single sheet is too large for Percy, need to split up in chunks of 240 to stay under resource limit
export const spotRectangleSheet1 = getIllustrationSheet({
  type: 'spotRectangle',
  startIndex: 0,
  endIndex: 240,
});
