import { memo } from 'react';

import { RemoteImage, type RemoteImageProps } from '../media/RemoteImage';

export type CardThumbnailProps = RemoteImageProps;

export const CardThumbnail = memo(function CardThumbnail({
  size = 'l',
  shape = 'circle',
  ...props
}: CardThumbnailProps) {
  return <RemoteImage shape={shape} size={size} {...props} />;
});
