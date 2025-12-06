import { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import type { Key } from 'react';
import type { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { HStack } from '../../layout';
import { Text } from '../../typography/Text';

import { DefaultRollingNumberDigit } from './DefaultRollingNumberDigit';
import { DefaultRollingNumberMask } from './DefaultRollingNumberMask';
import { DefaultRollingNumberSymbol } from './DefaultRollingNumberSymbol';
import type {
  RollingNumberValueSectionComponent,
  RollingNumberValueSectionProps,
} from './RollingNumber';
import { digits } from './RollingNumber';

const AnimatedText = Animated.createAnimatedComponent(Text);

const isDigit = (char: string) => digits.includes(parseInt(char));

export const DefaultRollingNumberValueSection: RollingNumberValueSectionComponent = memo(
  forwardRef<View, RollingNumberValueSectionProps>(
    (
      {
        intlNumberParts,
        textProps,
        digitHeight,
        formattedValue,
        RollingNumberDigitComponent = DefaultRollingNumberDigit,
        RollingNumberSymbolComponent = DefaultRollingNumberSymbol,
        RollingNumberMaskComponent = DefaultRollingNumberMask,
        style,
        styles,
        justifyContent = 'flex-start',
        transitionConfig,
        ...props
      }: RollingNumberValueSectionProps,
      ref,
    ) => {
      const [numberSectionHasRendered, setValueSectionHasRendered] = useState(false);

      const containerStyle = useMemo(() => [style, styles?.root], [style, styles?.root]);

      // fallback digit is used when the measurement is not complete
      const fallbackDigit = useCallback(
        (digit: number, key: Key) => (
          <AnimatedText key={key} style={styles?.text} {...textProps}>
            {digit}
          </AnimatedText>
        ),
        [textProps, styles?.text],
      );

      const intlPartsDigits = useMemo(
        () =>
          intlNumberParts.map((part) => {
            if (
              (part.type !== 'integer' && part.type !== 'fraction') ||
              typeof part.value !== 'number'
            ) {
              return (
                <RollingNumberSymbolComponent
                  key={part.type === 'literal' ? `${part.key}:${part.value}` : part.key}
                  justifyContent={justifyContent}
                  styles={{ text: styles?.text }}
                  textProps={textProps}
                  value={String(part.value)}
                />
              );
            }

            if (!digitHeight) return fallbackDigit(part.value, part.key);
            return (
              <RollingNumberDigitComponent
                key={part.key}
                RollingNumberMaskComponent={RollingNumberMaskComponent}
                digitHeight={digitHeight}
                initialValue={numberSectionHasRendered ? 0 : undefined}
                onLayout={() => setValueSectionHasRendered(true)}
                styles={{ text: styles?.text }}
                textProps={textProps}
                transitionConfig={transitionConfig}
                value={part.value}
              />
            );
          }),
        [
          numberSectionHasRendered,
          setValueSectionHasRendered,
          intlNumberParts,
          digitHeight,
          RollingNumberDigitComponent,
          RollingNumberSymbolComponent,
          styles?.text,
          textProps,
          fallbackDigit,
          justifyContent,
          transitionConfig,
          RollingNumberMaskComponent,
        ],
      );

      const formattedValueDigits = useMemo(
        () =>
          formattedValue?.split('').map((char, index) => {
            if (!isDigit(char)) {
              return (
                <RollingNumberSymbolComponent
                  key={index}
                  justifyContent={justifyContent}
                  styles={{ text: styles?.text }}
                  textProps={textProps}
                  value={char}
                />
              );
            }

            if (!digitHeight) return fallbackDigit(parseInt(char), index);
            return (
              <RollingNumberDigitComponent
                key={index}
                RollingNumberMaskComponent={RollingNumberMaskComponent}
                digitHeight={digitHeight}
                initialValue={numberSectionHasRendered ? 0 : undefined}
                onLayout={() => setValueSectionHasRendered(true)}
                styles={{ text: styles?.text }}
                textProps={textProps}
                transitionConfig={transitionConfig}
                value={parseInt(char)}
              />
            );
          }),
        [
          numberSectionHasRendered,
          setValueSectionHasRendered,
          formattedValue,
          RollingNumberDigitComponent,
          RollingNumberSymbolComponent,
          styles?.text,
          digitHeight,
          textProps,
          fallbackDigit,
          justifyContent,
          transitionConfig,
          RollingNumberMaskComponent,
        ],
      );

      return (
        <HStack
          ref={ref}
          alignItems="center"
          justifyContent={justifyContent}
          style={containerStyle}
          {...props}
        >
          {formattedValue ? formattedValueDigits : intlPartsDigits}
        </HStack>
      );
    },
  ),
);
