import React, { memo, useMemo } from 'react';
import type { CardRemoteImageProps } from '@cbhq/cds-common/types';

import { getSource, RemoteImage } from '../media/RemoteImage';

export type { CardRemoteImageProps };

export const CardRemoteImage = memo(function CardRemoteImage({
  src,
  ...props
}: CardRemoteImageProps) {
  const source = useMemo(() => getSource(src), [src]);
  return <RemoteImage {...props} resizeMode="cover" source={source} />;
});

CardRemoteImage.displayName = 'CardRemoteImage';
