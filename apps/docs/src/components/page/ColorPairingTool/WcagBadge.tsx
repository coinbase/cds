import React, { memo } from 'react';
import { Tag } from '@cbhq/cds-web/tag';

type WcagBadgeProps = {
  label: string;
  passes: boolean;
};

export const WcagBadge = memo(function WcagBadge({ label, passes }: WcagBadgeProps) {
  return (
    <Tag
      endIconActive
      colorScheme={passes ? 'green' : 'red'}
      emphasis="low"
      endIcon={passes ? 'circleCheckmark' : 'circleCross'}
      intent="informational"
    >
      {label}
    </Tag>
  );
});
