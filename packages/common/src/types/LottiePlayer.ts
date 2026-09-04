import type { LottieMarkersAsMap, LottieSource } from './LottieSource';

export type LottiePlayer<Source extends LottieSource> = {
  play: (startFrame?: number, endFrame?: number) => void;
  playMarkers: (
    startFrame: keyof LottieMarkersAsMap<Source>,
    endFrame: keyof LottieMarkersAsMap<Source>,
  ) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
};
