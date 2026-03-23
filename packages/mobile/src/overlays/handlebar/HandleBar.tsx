import { useCallback, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import type {
  AccessibilityActionEvent,
  GestureResponderHandlers,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { handleBarHeight } from '@coinbase/cds-common/tokens/drawer';

import { useTheme } from '../../hooks/useTheme';

export type HandleBarProps = ViewProps & {
  /** Callback fired when the handlebar is pressed via accessibility action */
  onAccessibilityPress?: () => void;
  /**
   * The HandleBar can be rendered inside or outside the drawer.
   * @default 'outside'
   */
  variant?: 'inside' | 'outside';
  /** Pan responder handlers for drag-to-dismiss functionality. */
  panHandlers?: GestureResponderHandlers;
  styles?: {
    root?: PressableProps['style'];
    handle?: StyleProp<ViewStyle>;
  };
};

// Fixed pixel values used intentionally — handle size should not scale with theme density.
const HANDLE_WIDTH_OUTSIDE = 64;
const HANDLE_WIDTH_INSIDE = 32;
const HANDLE_OPACITY_INSIDE = 0.4;

export const HandleBar = ({
  onAccessibilityPress,
  variant = 'outside',
  panHandlers,
  style,
  styles,
  ...props
}: HandleBarProps) => {
  const theme = useTheme();
  const paddingY = theme.space[2];
  const isInside = variant === 'inside';
  const handleBarBackgroundColor = theme.color[isInside ? 'bgInverse' : 'bgSecondary'];

  const handleAccessibilityAction = useCallback(
    (event: AccessibilityActionEvent) => {
      if (event.nativeEvent.actionName === 'activate') {
        onAccessibilityPress?.();
      }
    },
    [onAccessibilityPress],
  );

  const pressableStyle = useCallback(
    (state: PressableStateCallbackType) => [
      {
        alignItems: 'center' as const,
        paddingBottom: paddingY,
        paddingTop: paddingY,
      },
      style,
      typeof styles?.root === 'function' ? styles?.root(state) : styles?.root,
    ],
    [paddingY, style, styles],
  );

  const handleBarStyle = useMemo(
    () => [
      {
        width: isInside ? HANDLE_WIDTH_INSIDE : HANDLE_WIDTH_OUTSIDE,
        height: handleBarHeight,
        backgroundColor: handleBarBackgroundColor,
        borderRadius: 4,
        opacity: isInside ? HANDLE_OPACITY_INSIDE : 1,
      },
      styles?.handle,
    ],
    [isInside, handleBarBackgroundColor, styles?.handle],
  );

  if (isInside) {
    return (
      <View
        accessible
        accessibilityActions={onAccessibilityPress ? [{ name: 'activate' }] : undefined}
        accessibilityRole="button"
        onAccessibilityAction={handleAccessibilityAction}
        style={pressableStyle({ pressed: false })}
        testID="handleBar"
        {...panHandlers}
        {...props}
      >
        <View style={handleBarStyle} />
      </View>
    );
  }

  return (
    <Pressable
      accessible
      accessibilityActions={onAccessibilityPress ? [{ name: 'activate' }] : undefined}
      onAccessibilityAction={handleAccessibilityAction}
      style={pressableStyle}
      testID="handleBar"
      {...panHandlers}
      {...props}
    >
      <View style={handleBarStyle} />
    </Pressable>
  );
};

HandleBar.displayName = 'HandleBar';
