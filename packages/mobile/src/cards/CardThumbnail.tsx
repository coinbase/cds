import { memo } from 'react';

import { RemoteImage, type RemoteImageProps } from '../media/RemoteImage';

export type CardThumbnailProps = RemoteImageProps;

/**
 * RemoteImage component with default size and shape for Card thumbnails.
 */
export const CardThumbnail = memo(function CardThumbnail({
  size = 'l',
  shape = 'circle',
  ...props
}: CardThumbnailProps) {
  return <RemoteImage shape={shape} size={size} {...props} />;
});

CardThumbnail.displayName = 'CardThumbnail';
