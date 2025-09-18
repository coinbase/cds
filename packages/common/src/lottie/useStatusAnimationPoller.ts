import { useCallback, useEffect, useRef } from 'react';

import type { LottiePlayer } from '../types/LottiePlayer';
import type { LottieSource } from '../types/LottieSource';
import type { LottieStatusAnimationType } from '../types/LottieStatusAnimationProps';

// TODO: Figure out where we can codegen these types from lottie-files
type TradeStatusLottie = LottieSource<
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

type UseStatusAnimationPollerParams = {
  status?: LottieStatusAnimationType;
  playMarkers?: LottiePlayer<TradeStatusLottie>['playMarkers'];
  onFinish?: () => void;
};

export const useStatusAnimationPoller = ({
  status = 'loading',
  playMarkers,
  onFinish,
}: UseStatusAnimationPollerParams) => {
  const isRunning = useRef(false);
  const isComplete = useRef(false);

  useEffect(() => {
    // Play loading animation on mount if we aren't already running
    if (!isRunning.current && !!playMarkers) {
      playMarkers('loadingStart', 'loadingEnd');
      isRunning.current = true;
    }
  }, [playMarkers]);

  const previousStatusRef = useRef<typeof status>();

  // onAnimationFinish will get triggered after our first useEffect
  // play completes and then after each play within onAnimationFinish completes.
  return useCallback(() => {
    const previousStatus = previousStatusRef.current;
    if (status === 'loading') {
      playMarkers?.('loadingStart', 'loadingEnd');
    } else if (status === 'pending') {
      if (previousStatus === 'pending') {
        playMarkers?.('pendingAltLoopStart', 'pendingAltLoopEnd');
      } else {
        playMarkers?.('pendingAltStart', 'pendingAltEnd');
      }
    } else if (!isComplete.current) {
      switch (status) {
        case 'success': {
          if (previousStatus === 'pending') {
            playMarkers?.('successAltStart', 'successAltEnd');
          } else {
            playMarkers?.('successStart', 'successEnd');
          }
          break;
        }
        case 'cardSuccess': {
          playMarkers?.('successCardStart', 'successCardEnd');
          break;
        }
        case 'failure': {
          if (previousStatus === 'pending') {
            playMarkers?.('failureAltStart', 'failureAltEnd');
          } else {
            playMarkers?.('failureStart', 'failureEnd');
          }
          break;
        }
        default:
          break;
      }
      isComplete.current = true;
      onFinish?.();
    }
    previousStatusRef.current = status;
  }, [onFinish, playMarkers, status]);
};
