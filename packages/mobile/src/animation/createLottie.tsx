import React, { createRef, type JSX } from 'react';
import { Animated } from 'react-native';
import { getLottieDuration, getLottieMarkers } from '@coinbase/cds-common/lottie/lottieUtils';
import type { LottiePlayer } from '@coinbase/cds-common/types/LottiePlayer';
import type { LottieSource } from '@coinbase/cds-common/types/LottieSource';
import type LottieView from 'lottie-react-native';

import { Lottie } from './Lottie';
import { lottieProgressConfig } from './lottieProgresConfig';
import type { LottieProps } from './types';

type ProgressListenerCallback = (frame: number) => void;
type ProgressTimingConfig = { startFrame?: number; endFrame?: number };
export type LottieProgress = {
  value: Animated.Value;
  timing: (config?: ProgressTimingConfig) => { start: (cb?: () => void) => void };
  play: (cb?: () => void) => void;
  pause: () => void;
  reset: () => void;
  addListener: (callback: ProgressListenerCallback) => void;
  removeListener: () => void;
};

export type LottiePlayerMobile<Source extends LottieSource = LottieSource> = {
  lottieRef: React.Ref<LottieView>;
  progress: LottieProgress;
  Lottie: {
    (props: Omit<LottieProps, 'source'>): JSX.Element;
    displayName: 'Lottie';
  };
} & LottiePlayer<Source>;

const noop = () => {};

export const createLottie = <Source extends LottieSource>(
  source: Source,
  progressOverride?: Animated.Value,
): LottiePlayerMobile<Source> => {
  const lottieRef = createRef<LottieView>();
  const progress = progressOverride ?? new Animated.Value(0);
  const progressAnim =
    createRef<Animated.CompositeAnimation>() as React.MutableRefObject<Animated.CompositeAnimation>;
  const duration = getLottieDuration(source);
  const markers = getLottieMarkers(source);

  progressAnim.current = Animated.timing(progress, {
    ...lottieProgressConfig,
    duration,
  });

  const play = (startFrame?: number, endFrame?: number) => {
    lottieRef.current?.play(startFrame, endFrame);
  };
  const playMarkers = (startFrame: keyof typeof markers, endFrame: keyof typeof markers) => {
    play(markers[startFrame] ?? 0, markers[endFrame] ?? 0);
  };

  const setProgressTiming = (
    { startFrame = 0, endFrame = 1 }: ProgressTimingConfig = { startFrame: 0, endFrame: 1 },
  ) => {
    const diff = endFrame - startFrame;
    const newDuration = duration * diff;
    progressAnim.current = Animated.timing(progress, {
      ...lottieProgressConfig,
      toValue: endFrame,
      duration: newDuration,
    });
    return {
      start: (callbackFn?: () => void) => {
        progressAnim.current.start(({ finished }) => {
          if (finished) {
            callbackFn?.();
          }
        });
      },
    };
  };

  const playProgress = (callbackFn?: () => void) => {
    progressAnim.current.start(({ finished }) => {
      if (finished) {
        callbackFn?.();
      }
    });
  };
  const pauseProgress = () => progressAnim.current.stop();
  const resetProgress = () => {
    progressAnim.current.stop();
    progress.setValue(0);
  };
  const addProgressListener = (callback: ProgressListenerCallback) => {
    progress.addListener(({ value }) => callback(value));
  };
  const removeProgressListener = () => {
    progress.removeAllListeners();
  };

  const LottieComponent = (props: Omit<LottieProps, 'source'>) => (
    <Lottie ref={lottieRef} progress={progress} source={source} {...props} />
  );

  LottieComponent.displayName = 'Lottie' as const;

  return {
    play,
    playMarkers,
    pause: lottieRef.current?.pause ?? noop,
    resume: lottieRef.current?.resume ?? noop,
    reset: lottieRef.current?.reset ?? noop,
    progress: {
      value: progress,
      timing: setProgressTiming,
      play: playProgress,
      pause: pauseProgress,
      reset: resetProgress,
      addListener: addProgressListener,
      removeListener: removeProgressListener,
    },
    lottieRef,
    Lottie: LottieComponent,
  };
};
