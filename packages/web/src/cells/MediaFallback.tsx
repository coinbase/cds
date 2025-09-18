import React, { memo } from 'react';
import { imageSize, mediaSize } from '@cbhq/cds-common/tokens/cell';
import { type SharedProps } from '@cbhq/cds-common/types/SharedProps';

import { Fallback } from '../layout/Fallback';

import type { CellMediaType } from './CellMedia';

export type MediaFallbackProps = {
  type: CellMediaType;
} & SharedProps;

export const MediaFallback = memo(function MediaFallback({ type, testID }: MediaFallbackProps) {
  if (type === 'image') {
    return <Fallback height={imageSize} shape="squircle" testID={testID} width={imageSize} />;
  }

  return <Fallback height={mediaSize} shape="circle" testID={testID} width={mediaSize} />;
});
