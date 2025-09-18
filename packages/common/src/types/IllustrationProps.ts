import type { illustrationDimensions } from '../tokens/illustrations';

import type {
  IllustrationHeroSquareNames,
  IllustrationPictogramNames,
  IllustrationSpotIconNames,
  IllustrationSpotRectangleNames,
  IllustrationSpotSquareNames,
  IllustrationVariant,
} from './IllustrationNames';

export type HeroSquareDimension = (typeof illustrationDimensions.heroSquare)[number];
export type SpotSquareDimension = (typeof illustrationDimensions.spotSquare)[number];
export type SpotRectangleDimension = (typeof illustrationDimensions.spotRectangle)[number];
export type PictogramDimension = (typeof illustrationDimensions.pictogram)[number];
export type SpotIconDimension = (typeof illustrationDimensions.spotIcon)[number];

export type IllustrationDimension =
  | HeroSquareDimension
  | SpotSquareDimension
  | SpotRectangleDimension
  | PictogramDimension
  | SpotIconDimension;

export type HeroSquareName = IllustrationHeroSquareNames;
export type PictogramName = IllustrationPictogramNames;
export type SpotRectangleName = IllustrationSpotRectangleNames;
export type SpotSquareName = IllustrationSpotSquareNames;
export type SpotIconName = IllustrationSpotIconNames;
export type IllustrationType = IllustrationVariant;
