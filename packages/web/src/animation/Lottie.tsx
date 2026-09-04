import React, { forwardRef, memo, useCallback, useImperativeHandle } from 'react';
import { getLottieMarkers } from '@coinbase/cds-common/lottie/lottieUtils';
import type { LottiePlayer } from '@coinbase/cds-common/types/LottiePlayer';
import type { LottieMarkersAsMap, LottieSource } from '@coinbase/cds-common/types/LottieSource';
import { noop } from '@coinbase/cds-utils';
import { css } from '@linaria/core';

import { Box } from '../layout/Box';

import type { LottieProps } from './types';
import { useLottieHandlers } from './useLottieHandlers';
import { useLottieListeners } from './useLottieListeners';
import { useLottieLoader } from './useLottieLoader';

const defaultFilterSize = {
  width: '200%',
  height: '200%',
  x: '-50%',
  y: '-50%',
};

const lottieCss = css`
  .palette_fg {
    &_stroke {
      stroke: var(--color-fg);
    }
    &_fill {
      fill: var(--color-fg);
    }
  }

  .palette_fgMuted {
    &_stroke {
      stroke: var(--color-fgMuted);
    }
    &_fill {
      fill: var(--color-fgMuted);
    }
  }

  .palette_bg {
    &_stroke {
      stroke: var(--color-bg);
    }
    &_fill {
      fill: var(--color-bg);
    }
  }

  .palette_bgAlternate {
    &_stroke {
      stroke: var(--color-bgAlternate);
    }
    &_fill {
      fill: var(--color-bgAlternate);
    }
  }

  .palette_bgInverse {
    &_stroke {
      stroke: var(--color-bgInverse);
    }
    &_fill {
      fill: var(--color-bgInverse);
    }
  }

  .palette_bgOverlay {
    &_stroke {
      stroke: var(--color-bgOverlay);
    }
    &_fill {
      fill: var(--color-bgOverlay);
    }
  }

  .palette_bgLine {
    &_stroke {
      stroke: var(--color-bgLineHeavy);
    }
    &_fill {
      fill: var(--color-bgLineHeavy);
    }
  }

  .palette_bgLineHeavy {
    &_stroke {
      stroke: var(--color-bgLineHeavy);
    }
    &_fill {
      fill: var(--color-bgLineHeavy);
    }
  }

  .palette_bgPrimary {
    &_stroke {
      stroke: var(--color-bgPrimary);
    }
    &_fill {
      fill: var(--color-bgPrimary);
    }
  }

  .palette_bgPrimaryWash {
    &_stroke {
      stroke: var(--color-bgPrimaryWash);
    }
    &_fill {
      fill: var(--color-bgPrimaryWash);
    }
  }

  .palette_fgInverse {
    &_stroke {
      stroke: var(--color-fgInverse);
    }
    &_fill {
      fill: var(--color-fgInverse);
    }
  }

  .palette_bgNegative {
    &_stroke {
      stroke: var(--color-bgNegative);
    }
    &_fill {
      fill: var(--color-bgNegative);
    }
  }

  .palette_bgNegativeWash {
    &_stroke {
      stroke: var(--color-bgNegativeWash);
    }
    &_fill {
      fill: var(--color-bgNegativeWash);
    }
  }

  .palette_bgPositive {
    &_stroke {
      stroke: var(--color-bgPositive);
    }
    &_fill {
      fill: var(--color-bgPositive);
    }
  }

  .palette_bgSecondary {
    &_stroke {
      stroke: var(--color-bgSecondary);
    }
    &_fill {
      fill: var(--color-bgSecondary);
    }
  }

  .palette_transparent {
    &_stroke {
      stroke: var(--color-transparent);
    }
    &_fill {
      fill: var(--color-transparent);
    }
  }

  .palette_bgWarning {
    &_stroke {
      stroke: var(--color-bgWarning);
    }
    &_fill {
      fill: var(--color-bgWarning);
    }
  }

  .palette_bgWarningWash {
    &_stroke {
      stroke: var(--color-bgWarningWash);
    }
    &_fill {
      fill: var(--color-bgWarningWash);
    }
  }
`;

export const Lottie = memo(
  forwardRef(
    <Marker extends string, Source extends LottieSource<Marker>>(
      {
        source,
        loop = false,
        autoplay = false,
        onAnimationFinish,
        handlers,
        resizeMode = 'contain',
        filterSize = defaultFilterSize,
        ...boxProps
      }: LottieProps<Marker, Source>,
      // String wont work on literal unions, so use any here
      forwardedRef: React.ForwardedRef<LottiePlayer<LottieSource<any>>>,
    ) => {
      const { containerRef, animationRef } = useLottieLoader({
        source,
        autoplay,
        loop,
        resizeMode,
        filterSize,
      });

      const play = useCallback(
        (startFrame?: number, endFrame?: number) => {
          animationRef.current?.playSegments(
            [
              startFrame ?? animationRef.current?.currentFrame,
              endFrame ?? animationRef.current?.totalFrames,
            ],
            true,
          );
        },
        [animationRef],
      );

      const reset = useCallback(() => {
        animationRef.current?.goToAndStop(0, true);
      }, [animationRef]);

      useImperativeHandle(
        forwardedRef,
        () => ({
          play,
          playMarkers: (
            startFrame: keyof LottieMarkersAsMap<Source>,
            endFrame: keyof LottieMarkersAsMap<Source>,
          ) => {
            const markers = getLottieMarkers(source);
            if (markers) {
              play(markers[startFrame] ?? 0, markers[endFrame] ?? 0);
            } else {
              play();
            }
          },
          pause: animationRef.current?.pause ?? noop,
          resume: play,
          reset,
        }),
        [source, play, animationRef, reset],
      );

      const listeners = useLottieHandlers(
        onAnimationFinish
          ? { complete: onAnimationFinish, loopComplete: onAnimationFinish }
          : handlers,
      );
      useLottieListeners(animationRef, listeners);

      return <Box ref={containerRef} as="div" className={lottieCss} {...boxProps} />;
    },
  ),
);

Lottie.displayName = 'Lottie';
