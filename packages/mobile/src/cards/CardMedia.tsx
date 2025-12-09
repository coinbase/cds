import { memo } from 'react';
import {
  defaultMediaDimension,
  defaultMediaSize,
  defaultPictogramMediaDimension,
} from '@coinbase/cds-common/tokens/card';
import type {
  CardMediaImageSizeObject,
  CardMediaPlacement,
  CardMediaProps as CommonCardMediaProps,
} from '@coinbase/cds-common/types';

import { Pictogram, SpotSquare } from '../illustrations';
import { getSource, RemoteImage } from '../media/RemoteImage';

export type CardMediaProps = CommonCardMediaProps;

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
  switch (props.type) {
    case 'spotSquare':
      return (
        <SpotSquare
          {...props}
          dimension={defaultMediaDimension}
          name={props.name}
          testID={props.testID}
        />
      );
    case 'pictogram':
      return (
        <Pictogram
          {...props}
          dimension={defaultPictogramMediaDimension}
          name={props.name}
          testID={props.testID}
        />
      );
    case 'image':
      return (
        <RemoteImage
          alt={props.alt ?? ''}
          resizeMode="cover"
          source={getSource(props.src)}
          src={props.src}
          testID={props.testID}
          {...imageProps[placement]}
        />
      );
    default:
      return null;
  }
});
