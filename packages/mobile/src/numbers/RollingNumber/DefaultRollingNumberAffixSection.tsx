import { forwardRef, memo, useMemo } from 'react';
import type { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { HStack } from '../../layout/HStack';
import { Text } from '../../typography/Text';

import type {
  RollingNumberAffixSectionComponent,
  RollingNumberAffixSectionProps,
} from './RollingNumber';

const AnimatedText = Animated.createAnimatedComponent(Text);

export const DefaultRollingNumberAffixSection: RollingNumberAffixSectionComponent = memo(
  forwardRef<View, RollingNumberAffixSectionProps>(
    (
      {
        children,
        textProps,
        style,
        styles,
        justifyContent = 'flex-start',
        ...props
      }: RollingNumberAffixSectionProps,
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
          ref={ref}
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
