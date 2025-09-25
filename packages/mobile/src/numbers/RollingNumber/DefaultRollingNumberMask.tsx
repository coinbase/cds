import { forwardRef, memo, useMemo } from 'react';
import { StyleSheet, type View } from 'react-native';

import { HStack } from '../../layout/HStack';

import { type RollingNumberMaskComponent, type RollingNumberMaskProps } from './RollingNumber';

const baseStylesheet = StyleSheet.create({
  mask: {
    display: 'flex',
    overflow: 'hidden',
  },
});

export const DefaultRollingNumberMask: RollingNumberMaskComponent = memo(
  forwardRef<View, RollingNumberMaskProps>(({ children, style, ...props }, ref) => {
    const containerStyle = useMemo(() => [baseStylesheet.mask, style], [style]);
    return (
      <HStack ref={ref} style={containerStyle} {...props}>
        {children}
      </HStack>
    );
  }),
);
