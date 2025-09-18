import type { MotionBaseSpec } from '../types';

type TabIndicatorMotionBaseSpec = Pick<MotionBaseSpec, 'easing' | 'duration' | 'property'>;

export const animateTabIndicatorBaseSpec: TabIndicatorMotionBaseSpec = {
  property: 'x',
  easing: 'global',
  duration: 'moderate1',
};
