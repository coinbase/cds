import React, { memo } from 'react';
import type { CardRemoteImageProps } from '@cbhq/cds-common/types';

import { RemoteImage } from '../media/RemoteImage';

export type { CardRemoteImageProps };

/**
 * @deprecated render a <RemoteImage resizeMode="cover" {...props} /> instead
 */
export const CardRemoteImage = memo(function CardRemoteImage({
  src,
  alt = '',
  ...props
}: CardRemoteImageProps) {
  return <RemoteImage {...props} alt={alt} resizeMode="cover" source={src} />;
});
