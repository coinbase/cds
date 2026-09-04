import { durations } from '@coinbase/cds-common/motion/tokens';

import { mobileCurves } from '../convertMotionConfig';
import { withMotionTiming } from '../withMotionTiming';

describe('withMotionTiming.test', () => {
  it('works', () => {
    expect(
      withMotionTiming({
        toValue: 1,
        fromValue: 0,
        duration: durations.fast1,
        easing: mobileCurves.enterExpressive,
        property: 'height',
        delay: undefined,
      }),
    ).toBeTruthy();

    expect(
      withMotionTiming({
        toValue: 1,
        fromValue: 0,
        delay: 200,
        duration: durations.fast1,
        easing: mobileCurves.enterExpressive,
        property: 'height',
      }),
    ).toBeTruthy();
  });
});
