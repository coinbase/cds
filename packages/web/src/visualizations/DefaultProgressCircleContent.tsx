import React, { memo } from 'react';

import type { ProgressCircleContentProps } from './ProgressCircle';
import { ProgressTextLabel } from './ProgressTextLabel';

export const DefaultProgressCircleContent = memo(
  ({ progress, disabled, color = 'fgMuted' }: ProgressCircleContentProps) => {
    return (
      <ProgressTextLabel color={color} disabled={disabled} value={Math.round(progress * 100)} />
    );
  },
);
