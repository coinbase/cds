import { forwardRef, memo, useMemo } from 'react';
import { StyleSheet, type View } from 'react-native';

import { HStack } from '../../layout/HStack';

import { type NumberTickerMaskComponent, type NumberTickerMaskProps } from './NumberTicker';

const baseStylesheet = StyleSheet.create({
  mask: {
    display: 'flex',
    overflow: 'hidden',
  },
});

export const DefaultNumberTickerMask: NumberTickerMaskComponent = memo(
  forwardRef<View, NumberTickerMaskProps>(({ children, style, ...props }, ref) => {
    const containerStyle = useMemo(() => [baseStylesheet.mask, style], [style]);
    return (
      <HStack ref={ref} style={containerStyle} {...props}>
        {children}
      </HStack>
    );
  }),
);
