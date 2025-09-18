import type { MotionBaseSpec, MotionDuration, MotionEffect } from '../types';

import { generateAnimToken } from './utils';

export type EasingArray = [number, number, number, number];

export const curves = {
  global: [0.6, 0, 0.15, 1] as EasingArray,
  enterExpressive: [0.33, 0, 0, 1] as EasingArray,
  enterFunctional: [0, 0, 0.15, 1] as EasingArray,
  exitExpressive: [1, 0, 0.67, 1] as EasingArray,
  exitFunctional: [0.6, 0, 1, 1] as EasingArray,
  linear: [0, 0, 1, 1] as EasingArray,
} as const;

export const durations = {
  quick: 33,
  /** Buttons, Toggles, Text, Icons, Selection Controls */
  fast1: 100,
  fast2: 133,
  fast3: 150,
  /** Short distance movements, System Messaging, Navigation Drawer, Modals */
  moderate1: 200,
  moderate2: 250,
  moderate3: 300,
  /** Large distance movements, Page Transitions, Full screen dialogue */
  slow1: 350,
  slow2: 400,
  slow3: 500,
  slow4: 1000,
} as const;

export const animations = {
  fadeIn: generateAnimToken('opacity', [0, 1], 'enterFunctional'),
  fadeIn10: generateAnimToken('opacity', [0, 0.1], 'enterFunctional'),
  fadeIn20: generateAnimToken('opacity', [0, 0.2], 'enterFunctional'),
  fadeIn30: generateAnimToken('opacity', [0, 0.3], 'enterFunctional'),
  fadeOut: generateAnimToken('opacity', [1, 0], 'global'),
  fadeOut10: generateAnimToken('opacity', [0.1, 0], 'global'),
  fadeOut20: generateAnimToken('opacity', [0.2, 0], 'global'),
  fadeOut30: generateAnimToken('opacity', [0.3, 0], 'global'),
  slideUp: generateAnimToken('y', '-100%', 'enterFunctional'),
  slideUp8: generateAnimToken('y', -8, 'enterFunctional'),
  slideUp16: generateAnimToken('y', -16, 'enterFunctional'),
  slideUp24: generateAnimToken('y', -24, 'enterFunctional'),
  slideUp40: generateAnimToken('y', -40, 'enterFunctional'),
  slideDown: generateAnimToken('y', '100%', 'exitFunctional'),
  slideDown8: generateAnimToken('y', 8, 'global'),
  slideDown16: generateAnimToken('y', 16, 'global'),
  slideDown24: generateAnimToken('y', 24, 'global'),
  slideDown40: generateAnimToken('y', 40, 'global'),
  slideRight: generateAnimToken('x', '100%', 'global'),
  slideRight8: generateAnimToken('x', 8, 'global'),
  slideRight16: generateAnimToken('x', 16, 'global'),
  slideRight24: generateAnimToken('x', 24, 'global'),
  slideRight40: generateAnimToken('x', 40, 'global'),
  slideLeft: generateAnimToken('x', '-100%', 'global'),
  slideLeft8: generateAnimToken('x', -8, 'global'),
  slideLeft16: generateAnimToken('x', -16, 'global'),
  slideLeft24: generateAnimToken('x', -24, 'global'),
  slideLeft40: generateAnimToken('x', -40, 'global'),
  scaleUpXXS: generateAnimToken('scale', [0.98, 1], 'enterFunctional'),
  scaleUpXS: generateAnimToken('scale', [0.95, 1], 'enterFunctional'),
  scaleUpS: generateAnimToken('scale', [0.9, 1], 'enterFunctional'),
  scaleDownXXS: generateAnimToken('scale', [1, 0.98], 'global'),
  scaleDownXS: generateAnimToken('scale', [1, 0.95], 'global'),
  scaleDownS: generateAnimToken('scale', [1, 0.9], 'global'),
} as const;

export const createMotionConfig = (
  effect: MotionEffect,
  duration: MotionDuration,
  overrides?: Partial<MotionBaseSpec>,
) => {
  return {
    ...animations[effect],
    duration,
    ...overrides,
  };
};
