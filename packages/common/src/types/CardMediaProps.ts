import type { PictogramName, SpotSquareName } from '@cbhq/cds-illustrations';

import type { CardRemoteImageDimensionValue } from './CardRemoteImageProps';
import type { AspectRatio } from './Shape';

export type CardMediaPlacement = 'start' | 'above' | 'end';

export type CardMediaImageSizeObject =
  | {
      width: CardRemoteImageDimensionValue;
      height: CardRemoteImageDimensionValue;
    }
  | {
      width: CardRemoteImageDimensionValue;
      aspectRatio: AspectRatio;
    };

export type CardMediaProps = {
  /** Informs how to auto-magically size the media. */
  placement: CardMediaPlacement;
  testID?: string;
  alt?: string;
} & (
  | {
      type: 'image';
      src: string;
    }
  | {
      type: 'spotSquare';
      name: SpotSquareName;
    }
  | {
      type: 'pictogram';
      name: PictogramName;
    }
);
