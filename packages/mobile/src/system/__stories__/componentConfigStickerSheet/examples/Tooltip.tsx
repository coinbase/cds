import React, { memo } from 'react';
import { View } from 'react-native';

import { Button } from '../../../../buttons/Button';
import { Tooltip } from '../../../../overlays/tooltip/Tooltip';

export const TooltipExample = memo(() => {
  return (
    <Tooltip
      accessibilityHint="Additional information about this action"
      accessibilityLabel="Show tooltip"
      content="Additional information about this action"
    >
      {/* Button is visual-only; Tooltip owns the press target via its wrapper TouchableOpacity. */}
      <View accessibilityElementsHidden pointerEvents="none">
        <Button variant="secondary">Show Tooltip</Button>
      </View>
    </Tooltip>
  );
});
