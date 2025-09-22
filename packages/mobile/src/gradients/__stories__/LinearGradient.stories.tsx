import React from 'react';
import { loremIpsum } from '@cbhq/cds-common/internal/data/loremIpsum';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../../typography/Text';
import { LinearGradient } from '../LinearGradient';

const stops = [0, 0.5, 1];
const LinearGradientScreen = () => {
  const theme = useTheme();
  const { bg, bgPrimary, bgPositive, bgNegative, transparent } = theme.color;
  return (
    <ExampleScreen>
      <Example inline title="As Background">
        <LinearGradient colors={[bgPrimary, bgPositive]}>
          <Text font="body">First example</Text>
        </LinearGradient>
        <LinearGradient colors={[bgPrimary, bgPositive, bgNegative]} stops={stops}>
          <Text font="body">Second example</Text>
        </LinearGradient>
        <Text font="label1">Horizontal gradient</Text>
        <LinearGradient angle={90} colors={[bgPrimary, bgPositive, bgNegative]} stops={stops}>
          <Text font="body">Horizontal angle example</Text>
        </LinearGradient>
      </Example>
      <Example inline title="As overlay with isBelowChildren set to false">
        <LinearGradient colors={[transparent, bg]} isBelowChildren={false}>
          <Text font="body">{loremIpsum}...</Text>
        </LinearGradient>
        <Text font="label1">More</Text>
      </Example>
      <Example inline title="As overlay with elevated prop">
        <LinearGradient elevated colors={[transparent, bg]}>
          <Text font="body">{loremIpsum}...</Text>
        </LinearGradient>
        <Text font="label1">More</Text>
      </Example>
    </ExampleScreen>
  );
};

export default LinearGradientScreen;
