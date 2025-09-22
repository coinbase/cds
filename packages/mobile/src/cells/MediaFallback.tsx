import React, { memo } from 'react';
import type { SharedProps } from '@cbhq/cds-common';
import { imageSize, mediaSize } from '@cbhq/cds-common/tokens/cell';

import { Fallback } from '../layout/Fallback';

import type { CellMediaType } from './CellMedia';

export type MediaFallbackProps = {
  type: CellMediaType;
} & SharedProps;

export const MediaFallback = memo(function MediaFallback({ type, testID }: MediaFallbackProps) {
  if (type === 'image') {
    return <Fallback height={imageSize} shape="squircle" width={imageSize} />;
  }

  return <Fallback height={mediaSize} shape="circle" testID={testID} width={mediaSize} />;
});
