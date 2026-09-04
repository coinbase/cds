import type { PictogramName, SpotSquareName } from '@coinbase/cds-illustrations';

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

/**
 * @deprecated Use SpotSquare when `type` is "spotSquare", Pictogram when `type` is "pictogram", or RemoteImage when `type` is "image". This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
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
