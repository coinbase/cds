import { convertDimensionToSize } from '../utils/convertDimensionToSize';

export const cardSizes = {
  small: {
    width: 136,
    height: 144,
  },
  medium: {
    width: 312,
    height: 192,
  },
  large: {
    width: undefined,
    height: undefined,
  },
} as const;

export const defaultMediaDimension = '96x96';
export const defaultPictogramMediaDimension = '64x64';
export const defaultMediaSize = convertDimensionToSize(defaultMediaDimension);
export const defaultSpacingBottom = 2;

export const upsellCardMinHeight = 158;
export const upsellCardDefaultWidth = 327;

export const containedAssetCardLargeWidth = 359;
export const containedAssetCardSmallDimension = 156;
export const containedAssetCardLargeDimension = 327;

export const floatingAssetCardLargeWidth = 359;
export const floatingAssetCardSmallDimension = 156;

export const defaultNudgeCardWidth = 327;

export const contentCardMinWidth = 280;
export const contentCardMaxWidth = 800;
