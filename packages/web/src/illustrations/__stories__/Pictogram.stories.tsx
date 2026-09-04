/**
 * DO NOT MODIFY
 * Generated from yarn nx run illustrations:generate-stories
 */

import { Pictogram } from '../Pictogram';

import { getIllustrationSheet } from './getIllustrationSheet';
import { IllustrationExample } from './IllustrationExample';

export default {
  title: 'Illustrations',
  component: Pictogram,
};

export const pictogram = () => (
  <IllustrationExample>
    <Pictogram name="2fa" scaleMultiplier={2} />
  </IllustrationExample>
);

// single sheet is too large for Percy, need to split up in chunks of 240 to stay under resource limit
export const pictogramSheet1 = getIllustrationSheet({
  type: 'pictogram',
  startIndex: 0,
  endIndex: 240,
});
export const pictogramSheet2 = getIllustrationSheet({
  type: 'pictogram',
  startIndex: 240,
  endIndex: 480,
});
export const pictogramSheet3 = getIllustrationSheet({
  type: 'pictogram',
  startIndex: 480,
  endIndex: 720,
});
