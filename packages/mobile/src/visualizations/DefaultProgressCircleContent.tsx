import { memo } from 'react';

import { Box } from '../layout';

import type { ProgressCircleContentProps } from './ProgressCircle';
import { ProgressTextLabel } from './ProgressTextLabel';

export const DefaultProgressCircleContent = memo(
  ({ progress, disabled, color = 'fgMuted' }: ProgressCircleContentProps) => {
    return (
      <Box alignSelf="center" flexGrow={0} flexShrink={0}>
        <ProgressTextLabel color={color} disabled={disabled} value={Math.round(progress * 100)} />
      </Box>
    );
  },
);
