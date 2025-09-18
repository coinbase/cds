import type { LottieSource } from '../types';

import {
  getLottieDuration,
  getLottieFrameRate,
  getLottieFrameToMs,
  getLottieMarkers,
} from './lottieUtils';

describe('lottieUtils', () => {
  it('getLottieFrameToMs - frame / frameRate and multiply by 1000 to convert to milliseconds', () => {
    // Second frame of a 30 FPS animation
    expect(getLottieFrameToMs(2, 30)).toEqual((2 / 30) * 1000);
  });

  it('getLottieMarkers', () => {
    // If this fails you should update the types in lottie-files/tradeStatus index file
    expect(
      getLottieMarkers({
        markers: [
          {
            // Animation frame of marker
            tm: 10,
            // Marker name
            cm: 'marker1',
          },
        ],
      } as LottieSource),
    ).toEqual({
      marker1: 10,
    });

    expect(
      getLottieMarkers(
        {
          fr: 20,
          markers: [
            {
              // Animation frame of marker
              tm: 10,
              // Marker name
              cm: 'marker1',
            },
          ],
        } as LottieSource,
        { ms: true },
      ),
    ).toEqual({
      marker1: 500,
    });
  });

  it('getLottieFrameRate', () => {
    expect(getLottieFrameRate({ fr: 30 } as LottieSource)).toBe(30);
  });

  it('getLottieDuration', () => {
    expect(getLottieDuration({ fr: 60, op: 30 } as LottieSource)).toBe(500);
  });
});
