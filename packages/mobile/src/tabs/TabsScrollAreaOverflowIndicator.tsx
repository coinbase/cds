import { memo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';

import { OverflowGradient } from '../layout/OverflowGradient';

export type TabsScrollAreaOverflowIndicatorBaseProps = SharedProps & {
  /**
   * Direction of the indicator.
   */
  direction?: 'left' | 'right';
  /**
   * When false, nothing is rendered.
   */
  show: boolean;
};

export type TabsScrollAreaOverflowIndicatorProps = TabsScrollAreaOverflowIndicatorBaseProps & {
  style?: StyleProp<ViewStyle>;
};

/**
 * Default overflow affordance for {@link TabsScrollArea} on React Native: a single-layer
 * {@link OverflowGradient} (no separate button / container slots).
 */
export const TabsScrollAreaOverflowIndicator = memo(function TabsScrollAreaOverflowIndicator({
  show,
  direction = 'left',
  ...props
}: TabsScrollAreaOverflowIndicatorProps) {
  if (!show) {
    return null;
  }

  return <OverflowGradient pin={direction} {...props} />;
});

TabsScrollAreaOverflowIndicator.displayName = 'TabsScrollAreaOverflowIndicator';
