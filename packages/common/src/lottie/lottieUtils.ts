import type { LottieMarkersAsMap, LottieSource } from '../types';

type GetLottieMarkerOptions = {
  /** Convert frames to milliseconds (ms) */
  ms?: boolean;
};

// frame / frameRate and multiply by 1000 to convert to milliseconds
export function getLottieFrameToMs(frame: number, fr: number) {
  return (frame / fr) * 1000;
}

export function getLottieDuration(source: LottieSource) {
  return getLottieFrameToMs(source.op, source.fr);
}

export function getLottieFrameRate(source: LottieSource) {
  return source.fr;
}

export function getLottieMarkers<T extends LottieSource>(source: T, opts?: GetLottieMarkerOptions) {
  return source.markers.reduce(
    (prev, next) => ({
      ...prev,
      [`${next.cm}`]: opts?.ms ? getLottieFrameToMs(next.tm, source.fr) : next.tm,
    }),
    {} as LottieMarkersAsMap<T>,
  );
}
