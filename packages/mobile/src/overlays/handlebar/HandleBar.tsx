import { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { AccessibilityActionEvent, ViewProps } from 'react-native';
import { handleBarHeight } from '@coinbase/cds-common/tokens/drawer';

import { useTheme } from '../../hooks/useTheme';

export type HandleBarProps = ViewProps & {
  /** Callback fired when the handlebar is pressed via accessibility action */
  onAccessibilityPress?: () => void;
};

export const HandleBar = ({ onAccessibilityPress, ...props }: HandleBarProps) => {
  const theme = useTheme();
  const handleBarBackgroundColor = theme.color.bgSecondary;
  const handleBarStyles = {
    backgroundColor: handleBarBackgroundColor,
  };

  const touchableAreaStyles = {
    paddingBottom: theme.space[2],
    paddingTop: theme.space[2],
  };

  const handleAccessibilityAction = useCallback(
    (event: AccessibilityActionEvent) => {
      if (event.nativeEvent.actionName === 'activate') {
        onAccessibilityPress?.();
      }
    },
    [onAccessibilityPress],
  );

  return (
    <Pressable
      accessible
      accessibilityActions={onAccessibilityPress ? [{ name: 'activate' }] : undefined}
      onAccessibilityAction={handleAccessibilityAction}
      style={[styles.touchableArea, touchableAreaStyles]}
      testID="handleBar"
      {...props}
    >
      <View style={[styles.handleBar, handleBarStyles]} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  touchableArea: {
    alignItems: 'center',
  },
  handleBar: {
    width: 64,
    height: handleBarHeight,
    borderRadius: 4,
  },
});

HandleBar.displayName = 'HandleBar';
