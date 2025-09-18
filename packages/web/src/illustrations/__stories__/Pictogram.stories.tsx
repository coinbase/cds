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

// single sheet is too large for Percy, need to split up in chunks to stay under resource limit
export const PictogramSheet1 = getIllustrationSheet({
  type: 'pictogram',
  startIndex: 0,
  endIndex: 120,
});
export const PictogramSheet2 = getIllustrationSheet({
  type: 'pictogram',
  startIndex: 120,
  endIndex: 240,
});
export const PictogramSheet3 = getIllustrationSheet({
  type: 'pictogram',
  startIndex: 240,
  endIndex: 360,
});
export const PictogramSheet4 = getIllustrationSheet({
  type: 'pictogram',
  startIndex: 360,
  endIndex: 480,
});
