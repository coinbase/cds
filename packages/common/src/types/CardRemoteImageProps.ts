import type { AspectRatio } from './Shape';
import type { SharedProps } from './SharedProps';

export type CardRemoteImageDimensionValue = number | `${number}%`;

export type CardRemoteImageProps = {
  /** The url to the image asset */
  src: string;
  width?: CardRemoteImageDimensionValue;
  height?: CardRemoteImageDimensionValue;
  aspectRatio?: AspectRatio;
  alt?: string;
} & SharedProps &
  (
    | {
        width: CardRemoteImageDimensionValue;
        aspectRatio: AspectRatio;
      }
    | { width: CardRemoteImageDimensionValue; height: CardRemoteImageDimensionValue }
  );
