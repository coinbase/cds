/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */
import type { LottieSource } from '../LottieSource';

import tradeStatusJson from './tradeStatus.json';

export type TradeStatusLottie = LottieSource<
  | 'loadingStart'
  | 'loadingEnd'
  | 'successCardStart'
  | 'successCardEnd'
  | 'successStart'
  | 'successEnd'
  | 'failureStart'
  | 'failureEnd'
  | 'pendingStart'
  | 'pendingEnd'
  | 'pendingAltStart'
  | 'pendingAltLoopStart'
  | 'pendingAltLoopEnd'
  | 'pendingAltEnd'
  | 'successAltStart'
  | 'successAltEnd'
  | 'failureAltStart'
  | 'failureAltEnd'
>;

export const tradeStatus = tradeStatusJson as TradeStatusLottie;
