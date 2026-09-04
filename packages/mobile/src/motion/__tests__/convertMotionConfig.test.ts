import { durations } from '@coinbase/cds-common/motion/tokens';

import { convertMotionConfig, convertMotionConfigs, mobileCurves } from '../convertMotionConfig';

describe('convertMotionConfig.test', () => {
  it('returns correct config', () => {
    expect(
      convertMotionConfig({
        toValue: 1,
        fromValue: 0,
        easing: 'enterExpressive',
        duration: 'fast1',
        property: 'height',
      }),
    ).toStrictEqual({
      toValue: 1,
      fromValue: 0,
      duration: durations.fast1,
      easing: mobileCurves.enterExpressive,
      property: 'height',
      delay: undefined,
    });
  });

  it('returns one-off duration', () => {
    expect(
      convertMotionConfig({
        toValue: 1,
        easing: 'enterExpressive',
        oneOffDuration: 1500,
        property: 'height',
      }),
    ).toStrictEqual({
      duration: 1500,
      easing: mobileCurves.enterExpressive,
      toValue: 1,
      property: 'height',
      delay: undefined,
    });
  });

  it('returns array of configs', () => {
    expect(
      convertMotionConfigs([
        {
          toValue: 200,
          fromValue: 20,
          easing: 'enterExpressive',
          duration: 'fast1',
          property: 'height',
        },
        {
          toValue: 1,
          fromValue: 0,
          easing: 'global',
          duration: 'moderate2',
          property: 'opacity',
        },
      ]),
    ).toStrictEqual([
      {
        toValue: 200,
        fromValue: 20,
        easing: mobileCurves.enterExpressive,
        duration: 100,
        property: 'height',
        delay: undefined,
      },
      {
        toValue: 1,
        fromValue: 0,
        easing: mobileCurves.global,
        duration: 250,
        property: 'opacity',
        delay: undefined,
      },
    ]);
  });
});
