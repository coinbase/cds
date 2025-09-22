import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { ViewProps } from 'react-native';
import { handleBarHeight, handleBarOffset } from '@cbhq/cds-common/tokens/drawer';

import { useTheme } from '../../hooks/useTheme';

export const HandleBar = (props: ViewProps) => {
  const theme = useTheme();
  const handleBarBackgroundColor = theme.color.bgSecondary;
  const handleBarStyles = {
    backgroundColor: handleBarBackgroundColor,
    marginBottom: theme.space[2],
  };

  return (
    <View accessible style={styles.touchableArea} testID="handleBar" {...props}>
      <View style={[styles.handleBar, handleBarStyles]} />
    </View>
  );
};

const styles = StyleSheet.create({
  touchableArea: {
    position: 'absolute',
    top: -handleBarOffset,
    left: 0,
    right: 0,
    height: handleBarOffset,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  handleBar: {
    width: 64,
    height: handleBarHeight,
    borderRadius: 4,
  },
});

HandleBar.displayName = 'HandleBar';
