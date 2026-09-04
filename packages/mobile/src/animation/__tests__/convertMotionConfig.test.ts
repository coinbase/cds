import { durations } from '@coinbase/cds-common/motion/tokens';

import { convertMotionConfig, mobileCurves } from '../convertMotionConfig';

describe('convertMotionConfig', () => {
  it('returns the correct Animated config based on CDS config', () => {
    expect(
      convertMotionConfig({ toValue: 1, easing: 'enterExpressive', duration: 'fast1' }),
    ).toEqual({
      delay: undefined,
      duration: durations.fast1,
      easing: mobileCurves.enterExpressive,
      toValue: 1,
      useNativeDriver: true,
    });

    expect(
      convertMotionConfig({
        toValue: 0.5,
        delay: 2000,
        easing: 'linear',
        duration: 'quick',
        useNativeDriver: false,
      }),
    ).toEqual({
      toValue: 0.5,
      delay: 2000,
      easing: mobileCurves.linear,
      duration: durations.quick,
      useNativeDriver: false,
    });
  });
});
