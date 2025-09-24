import { forwardRef, memo, useMemo } from 'react';
import type { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { HStack } from '../../layout/HStack';
import { Text } from '../../typography/Text';

import type { RollingNumberSymbolComponent, RollingNumberSymbolProps } from './RollingNumber';

const AnimatedText = Animated.createAnimatedComponent(Text);

export const DefaultRollingNumberSymbol: RollingNumberSymbolComponent = memo(
  forwardRef<View, RollingNumberSymbolProps>(
    ({ value, textProps, style, styles, ...props }, ref) => {
      const containerStyle = useMemo(() => [style, styles?.root], [style, styles?.root]);
      const textNode = useMemo(
        () => (
          <AnimatedText style={styles?.text} {...textProps}>
            {value}
          </AnimatedText>
        ),
        [value, textProps, styles?.text],
      );
      return (
        <HStack ref={ref} alignItems="center" style={containerStyle} {...props}>
          {textNode}
        </HStack>
      );
    },
  ),
);
