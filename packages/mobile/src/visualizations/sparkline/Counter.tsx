import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useCounter } from '@coinbase/cds-common/visualizations/useCounter';
import { Box } from '@coinbase/cds-mobile/layout';
import type { CounterBaseProps } from '@coinbase/cds-mobile/visualizations/Counter';

const styles = StyleSheet.create({
  hidden: {
    opacity: 0,
  },
  visible: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
  },
});

export const Counter = ({ startNum, endNum, renderNum, durationInMillis }: CounterBaseProps) => {
  const count = useCounter({ startNum, endNum, durationInMillis });
  const renderFunction = useMemo(() => {
    return (num: number) => {
      return renderNum ? renderNum(num) : num;
    };
  }, [renderNum]);

  return (
    <Box alignSelf="flex-start" justifyContent="center">
      <View style={styles.hidden}>{renderFunction(endNum)}</View>
      <View style={styles.visible}>{renderFunction(count)}</View>
    </Box>
  );
};
