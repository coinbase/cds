import { memo } from 'react';
import { imageSize, mediaSize } from '@coinbase/cds-common/tokens/cell';

import { Fallback, type FallbackProps } from '../layout/Fallback';

import type { CellMediaType } from './CellMedia';

export type MediaFallbackProps = {
  type: CellMediaType;
} & Omit<FallbackProps, 'width' | 'height' | 'shape'>;

export const MediaFallback = memo(function MediaFallback({
  type,
  ...fallbackProps
}: MediaFallbackProps) {
  if (type === 'image') {
    return <Fallback {...fallbackProps} height={imageSize} shape="squircle" width={imageSize} />;
  }

  return <Fallback {...fallbackProps} height={mediaSize} shape="circle" width={mediaSize} />;
});
