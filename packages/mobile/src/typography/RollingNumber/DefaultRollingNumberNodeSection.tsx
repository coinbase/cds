import { forwardRef, memo, useMemo } from 'react';
import type { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { HStack } from '../../layout/HStack';
import { Text } from '../Text';

import type {
  RollingNumberNodeSectionComponent,
  RollingNumberNodeSectionProps,
} from './RollingNumber';

const AnimatedText = Animated.createAnimatedComponent(Text);

export const DefaultRollingNumberNodeSection: RollingNumberNodeSectionComponent = memo(
  forwardRef<View, RollingNumberNodeSectionProps>(
    (
      {
        children,
        textProps,
        style,
        styles,
        justifyContent = 'flex-start',
        ...props
      }: RollingNumberNodeSectionProps,
      ref,
    ) => {
      const containerStyle = useMemo(() => [style, styles?.root], [style, styles?.root]);
      const textNode = useMemo(
        () => (
          <AnimatedText style={styles?.text} {...textProps}>
            {children}
          </AnimatedText>
        ),
        [children, textProps, styles?.text],
      );
      return (
        <HStack
          ref={ref as any}
          alignItems="center"
          justifyContent={justifyContent}
          style={containerStyle}
          {...props}
        >
          {typeof children === 'string' || typeof children === 'number' ? textNode : children}
        </HStack>
      );
    },
  ),
);
