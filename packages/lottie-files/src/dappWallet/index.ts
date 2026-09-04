/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */
import type { LottieSource } from '../LottieSource';

import dappWalletJson from './dappWallet.json';

export type DappWalletLottie = LottieSource<
  | 'loadingStart'
  | 'loadingEnd'
  | 'loopStart'
  | 'loopEnd'
  | 'walletStart'
  | 'walletEnd'
  | 'walletLoopStart'
  | 'walletLoopEnd'
>;

export const dappWallet = dappWalletJson as DappWalletLottie;
