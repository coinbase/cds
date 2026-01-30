import React, { memo, useMemo } from 'react';
import type { SharedAccessibilityProps, ThemeVars } from '@coinbase/cds-common';
import { handleBarHeight } from '@coinbase/cds-common/tokens/drawer';

import { useTheme } from '../../hooks/useTheme';
import { Box } from '../../layout';
import { Pressable } from '../../system/Pressable';

export type HandleBarProps = {
  /** Background color of the handle bar */
  background?: ThemeVars.Color;
  /** Class name for the root container */
  className?: string;
  /** Class name for the handle element */
  handleClassName?: string;
  /** Inline styles for the root container */
  style?: React.CSSProperties;
  /** Inline styles for the handle element */
  handleStyle?: React.CSSProperties;
  /** Test ID for the component */
  testID?: string;
  /**
   * Callback fired when the handlebar is activated via keyboard (Enter/Space) or click.
   * When provided, the handle element becomes a focusable button.
   */
  onActivate?: () => void;
  /**
   * Accessible label for the handlebar.
   * Only used when onActivate is provided.
   */
  accessibilityLabel?: SharedAccessibilityProps['accessibilityLabel'];
  /**
   * Accessible hint/description for the handlebar.
   * Only used when onActivate is provided.
   */
  accessibilityHint?: SharedAccessibilityProps['accessibilityHint'];
};

export const HandleBar = memo(function HandleBar({
  background = 'bgSecondary',
  className,
  handleClassName,
  style,
  handleStyle,
  testID = 'handleBar',
  onActivate,
  accessibilityLabel,
  accessibilityHint,
}: HandleBarProps) {
  const theme = useTheme();

  const handleBarBackgroundColor = theme.color[background];

  const containerStyle: React.CSSProperties = useMemo(
    () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: theme.space[2],
      paddingBottom: theme.space[2],
      ...style,
    }),
    [theme.space, style],
  );

  const handleStyle_: React.CSSProperties = useMemo(
    () => ({
      width: 64,
      height: handleBarHeight,
      backgroundColor: handleBarBackgroundColor,
      borderRadius: 4,
      ...handleStyle,
    }),
    [handleBarBackgroundColor, handleStyle],
  );

  // When onActivate is provided, render as a Pressable button for proper focus trap support
  if (onActivate) {
    return (
      <Box className={className} data-testid={testID} style={containerStyle}>
        <Pressable
          noScaleOnPress
          accessibilityHint={accessibilityHint}
          accessibilityLabel={accessibilityLabel}
          background="transparent"
          borderColor="transparent"
          className={handleClassName}
          onClick={onActivate}
          style={handleStyle_}
        />
      </Box>
    );
  }

  // Non-interactive version (original behavior)
  return (
    <Box className={className} data-testid={testID} style={containerStyle}>
      <Box className={handleClassName} style={handleStyle_} />
    </Box>
  );
});

HandleBar.displayName = 'HandleBar';
