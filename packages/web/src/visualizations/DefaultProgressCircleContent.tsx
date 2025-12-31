import React, { memo } from 'react';

import type { ProgressCircleContentProps } from './ProgressCircle';
import { ProgressTextLabel } from './ProgressTextLabel';

export const DefaultProgressCircleContent = memo(
  ({
    progress,
    disableAnimateOnMount,
    disabled,
    color = 'fgMuted',
  }: ProgressCircleContentProps) => {
    return (
      <ProgressTextLabel
        color={color}
        disableAnimateOnMount={disableAnimateOnMount}
        disabled={disabled}
        value={Math.round(progress * 100)}
      />
    );
  },
);
