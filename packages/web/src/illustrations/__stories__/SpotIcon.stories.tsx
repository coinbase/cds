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

// single sheet is too large for Percy, need to split up in chunks of 240 to stay under resource limit
export const spotIconSheet1 = getIllustrationSheet({
  type: 'spotIcon',
  startIndex: 0,
  endIndex: 240,
});
