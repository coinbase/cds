import { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import type { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { HStack } from '../../layout';
import { Text } from '../Text';

import { DefaultRollingNumberDigit } from './DefaultRollingNumberDigit';
import { DefaultRollingNumberSymbol } from './DefaultRollingNumberSymbol';
import type {
  RollingNumberNumberSectionComponent,
  RollingNumberNumberSectionProps,
} from './RollingNumber';
import { digits } from './RollingNumber';

const AnimatedText = Animated.createAnimatedComponent(Text);

const isDigit = (char: string) => digits.includes(parseInt(char));

export const DefaultRollingNumberNumberSection: RollingNumberNumberSectionComponent = memo(
  forwardRef<View, RollingNumberNumberSectionProps>(
    (
      {
        intlNumberParts,
        textProps,
        invisibleDigitMeasurements,
        measurementCompleted,
        formattedValue,
        NumberDigitComponent = DefaultRollingNumberDigit,
        NumberSymbolComponent = DefaultRollingNumberSymbol,
        style,
        styles,
        justifyContent = 'flex-start',
        transitionConfig,
        ...props
      }: RollingNumberNumberSectionProps,
      ref,
    ) => {
      const [numberSectionHasRendered, setNumberSectionHasRendered] = useState(false);

      const containerStyle = useMemo(() => [style, styles?.root], [style, styles?.root]);

      // fallback digit is used when the measurement is not complete
      const fallbackDigit = useCallback(
        (digit: number) => (
          <AnimatedText style={styles?.text} {...textProps}>
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
                <NumberSymbolComponent
                  key={part.type === 'literal' ? `${part.key}:${part.value}` : part.key}
                  justifyContent={justifyContent}
                  styles={{ text: styles?.text }}
                  textProps={textProps}
                  value={String(part.value)}
                />
              );
            }

            if (!measurementCompleted) return fallbackDigit(part.value);
            return (
              <NumberDigitComponent
                key={part.key}
                initialValue={numberSectionHasRendered ? 0 : undefined}
                invisibleDigitMeasurements={invisibleDigitMeasurements}
                onLayout={() => setNumberSectionHasRendered(true)}
                styles={{ text: styles?.text }}
                textProps={textProps}
                transitionConfig={transitionConfig}
                value={part.value}
              />
            );
          }),
        [
          numberSectionHasRendered,
          setNumberSectionHasRendered,
          intlNumberParts,
          measurementCompleted,
          NumberDigitComponent,
          NumberSymbolComponent,
          styles?.text,
          invisibleDigitMeasurements,
          textProps,
          fallbackDigit,
          justifyContent,
          transitionConfig,
        ],
      );

      const formattedValueDigits = useMemo(
        () =>
          formattedValue?.split('').map((char, index) => {
            if (!isDigit(char)) {
              return (
                <NumberSymbolComponent
                  key={index}
                  justifyContent={justifyContent}
                  styles={{ text: styles?.text }}
                  textProps={textProps}
                  value={char}
                />
              );
            }

            if (!measurementCompleted) return fallbackDigit(parseInt(char));
            return (
              <NumberDigitComponent
                key={index}
                initialValue={numberSectionHasRendered ? 0 : undefined}
                invisibleDigitMeasurements={invisibleDigitMeasurements}
                onLayout={() => setNumberSectionHasRendered(true)}
                styles={{ text: styles?.text }}
                textProps={textProps}
                transitionConfig={transitionConfig}
                value={parseInt(char)}
              />
            );
          }),
        [
          numberSectionHasRendered,
          setNumberSectionHasRendered,
          formattedValue,
          measurementCompleted,
          NumberDigitComponent,
          NumberSymbolComponent,
          styles?.text,
          invisibleDigitMeasurements,
          textProps,
          fallbackDigit,
          justifyContent,
          transitionConfig,
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
