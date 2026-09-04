import { useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import {
  checkboxOpacityEnterConfig,
  checkboxOpacityExitConfig,
  checkboxScaleEnterConfig,
  checkboxScaleExitConfig,
} from '@coinbase/cds-common/motion/checkbox';
import { switchTransitionConfig } from '@coinbase/cds-common/motion/switch';

import { convertMotionConfig } from '../animation/convertMotionConfig';

export type UseControlMotionParams = {
  checked?: boolean;
  disabled?: boolean;
  shouldUseSwitchTransition?: boolean;
};

/**
 * Checkbox and RadioGroup shares the same motion tokens while Switch uses different timing token.
 * Check the motion specs below:
 * @link Checkbox: https://coda.io/d/Motion-Foundations_d5KlLHcBPlL/CDS-Check-Box_suHNC#_lu30T
 * @link RadioGroup: https://coda.io/d/Motion-Foundations_d5KlLHcBPlL/CDS-Radio-Group_susTj#_lu0fa
 * @link Switch: https://coda.io/d/Motion-Foundations_d5KlLHcBPlL/CDS-Switch_su7H7#_luhBA
 */
export const useControlMotionProps = ({
  checked,
  disabled,
  shouldUseSwitchTransition = false,
}: UseControlMotionParams) => {
  const animatedBoxValue = useRef(new Animated.Value(checked && !disabled ? 1 : 0)).current;
  const animatedScaleValue = useRef(
    new Animated.Value(
      (checked ? checkboxScaleEnterConfig.toValue : checkboxScaleEnterConfig.fromValue) as number,
    ),
  ).current;
  const animatedOpacityValue = useRef(
    new Animated.Value(
      (checked
        ? checkboxOpacityEnterConfig.toValue
        : checkboxOpacityEnterConfig.fromValue) as number,
    ),
  ).current;

  const enter = useMemo(
    () =>
      Animated.parallel([
        Animated.timing(
          animatedBoxValue,
          convertMotionConfig({ ...checkboxOpacityEnterConfig, useNativeDriver: false }),
        ),
        Animated.timing(
          animatedScaleValue,
          convertMotionConfig({
            ...checkboxScaleEnterConfig,
            // use switch transition config
            ...(shouldUseSwitchTransition ? switchTransitionConfig : {}),
          }),
        ),
        Animated.timing(animatedOpacityValue, convertMotionConfig(checkboxOpacityEnterConfig)),
      ]),
    [animatedBoxValue, animatedScaleValue, animatedOpacityValue, shouldUseSwitchTransition],
  );

  const exit = useMemo(
    () =>
      Animated.parallel([
        Animated.timing(
          animatedBoxValue,
          convertMotionConfig({ ...checkboxOpacityExitConfig, useNativeDriver: false }),
        ),
        Animated.timing(
          animatedScaleValue,
          convertMotionConfig({
            ...checkboxScaleExitConfig,
            ...(shouldUseSwitchTransition ? switchTransitionConfig : {}),
          }),
        ),
        Animated.timing(animatedOpacityValue, convertMotionConfig(checkboxOpacityExitConfig)),
      ]),
    [animatedBoxValue, animatedScaleValue, animatedOpacityValue, shouldUseSwitchTransition],
  );

  return {
    animation: checked ? enter : exit,
    animatedBoxValue,
    animatedScaleValue,
    animatedOpacityValue,
  };
};
