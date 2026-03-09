import React, { memo } from 'react';
import {
  defaultMediaDimension,
  defaultMediaSize,
  defaultPictogramMediaDimension,
} from '@coinbase/cds-common/tokens/card';
import type {
  CardMediaImageSizeObject,
  CardMediaPlacement,
  CardMediaProps,
} from '@coinbase/cds-common/types';

import { Pictogram } from '../illustrations/Pictogram';
import { SpotSquare } from '../illustrations/SpotSquare';
import { RemoteImage } from '../media/RemoteImage';

const imageProps: Record<CardMediaPlacement, CardMediaImageSizeObject> = {
  start: {
    width: '50%',
    height: '100%',
  },
  above: {
    width: '100%',
    aspectRatio: [2, 1],
  },
  end: defaultMediaSize,
};

export const CardMedia = memo(function CardMedia({ placement = 'end', ...props }: CardMediaProps) {
  if (props.type === 'spotSquare') {
    return <SpotSquare dimension={defaultMediaDimension} {...props} />;
  }

  if (props.type === 'pictogram') {
    return <Pictogram dimension={defaultPictogramMediaDimension} {...props} />;
  }

  if (props.type === 'image') {
    return (
      <RemoteImage
        alt={props.alt ?? ''}
        resizeMode="cover"
        src={props.src}
        testID={props.testID}
        {...imageProps[placement]}
      />
    );
  }

  return null;
});
