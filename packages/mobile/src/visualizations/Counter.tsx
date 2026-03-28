import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useCounter } from '@coinbase/cds-common/visualizations/useCounter';

import { Box } from '../layout';

export type CounterBaseProps = {
  startNum: number;
  endNum: number;
  durationInMillis: number;
  renderNum?: (num: number) => string | React.ReactNode;
};

export type CounterProps = CounterBaseProps;

export const Counter = ({ startNum, endNum, renderNum, durationInMillis }: CounterProps) => {
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
