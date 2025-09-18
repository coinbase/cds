import type { MotionTransition } from '../types';

import { createMotionConfig } from './tokens';

export const colorSurgeEnterConfig = createMotionConfig('fadeIn30', 'fast1');
export const colorSurgeExitConfig = createMotionConfig('fadeOut30', 'slow4', { delay: 200 });

export const shakeTranslateX = [0, -8, 8, -6, 6, -4, 4, -2, 2, 0];
export const shakeTransitionConfig: MotionTransition = {
  easing: 'enterFunctional',
  duration: 'slow2',
};

export const pulseTransitionConfig: MotionTransition = {
  easing: 'linear',
  oneOffDuration: 2000,
};
export const pulseVariantOpacity = {
  moderate: 0.7,
  subtle: 0.9,
  heavy: 0.5,
};
