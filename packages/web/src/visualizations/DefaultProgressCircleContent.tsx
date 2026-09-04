import { memo } from 'react';

import type { ProgressCircleContentProps } from './ProgressCircle';
import { ProgressTextLabel } from './ProgressTextLabel';

export const DefaultProgressCircleContent = memo(
  ({
    progress = 0,
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
