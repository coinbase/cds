/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */
import type { LottieSource } from '../LottieSource';

import splashJson from './splash.json';

export type SplashLottie = LottieSource<
  | 'logoStart'
  | 'circleStart'
  | 'logoEnd'
  | 'circleOpacityStart'
  | 'circleEnd'
  | 'circleOpacityEnd'
  | 'end'
>;

export const splash = splashJson as SplashLottie;
