import { curves, durations } from '@coinbase/cds-common/motion/tokens';

import { convertMotionConfig, cubicBezier } from '../convertMotionConfig';

describe('convertMotionConfig', () => {
  it('returns the correct animation config based on CDS config', () => {
    expect(
      convertMotionConfig({ toValue: 1, easing: 'enterExpressive', duration: 'fast1' }),
    ).toEqual({
      delay: undefined,
      duration: durations.fast1,
      easing: `cubic-bezier(${curves.enterExpressive.join()})`,
      toValue: 1,
      fill: 'forwards',
    });

    expect(
      convertMotionConfig({
        toValue: 0.5,
        delay: 2000,
        easing: 'linear',
        duration: 'quick',
        fill: 'both',
      }),
    ).toEqual({
      toValue: 0.5,
      delay: 2000,
      easing: `cubic-bezier(${curves.linear.join()})`,
      duration: durations.quick,
      fill: 'both',
    });
  });

  it('returns cubic-bezier string', () => {
    expect(cubicBezier('global')).toBe(`cubic-bezier(${curves.global.join()})`);
  });
});
