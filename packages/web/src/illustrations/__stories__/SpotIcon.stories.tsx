/**
 * DO NOT MODIFY
 * Generated from yarn nx run illustrations:generate-stories
 */

import { SpotIcon } from '../SpotIcon';

import { getIllustrationSheet } from './getIllustrationSheet';
import { IllustrationExample } from './IllustrationExample';

export default {
  title: 'Illustrations',
  component: SpotIcon,
};

export const spotIcon = () => (
  <IllustrationExample>
    <SpotIcon name="2fa" scaleMultiplier={3} />
  </IllustrationExample>
);

// single sheet is too large for Percy, need to split up in chunks to stay under resource limit
export const SpotIconSheet1 = getIllustrationSheet({
  type: 'spotIcon',
  startIndex: 0,
  endIndex: 120,
});
export const SpotIconSheet2 = getIllustrationSheet({
  type: 'spotIcon',
  startIndex: 120,
  endIndex: 240,
});
export const SpotIconSheet3 = getIllustrationSheet({
  type: 'spotIcon',
  startIndex: 240,
  endIndex: 360,
});
export const SpotIconSheet4 = getIllustrationSheet({
  type: 'spotIcon',
  startIndex: 360,
  endIndex: 480,
});
