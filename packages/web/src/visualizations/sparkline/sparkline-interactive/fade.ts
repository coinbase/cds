import { fadeDuration } from '@coinbase/cds-common/tokens/sparkline';
import { cubicBezier } from '@coinbase/cds-web/animation/convertMotionConfig';
import { css } from '@linaria/core';

// keyframes are global so they should be namespaced
const fadeInCss = css`
  && {
    animation: cdsSparklineInteractiveFadeIn ${fadeDuration}ms ${cubicBezier('global')};
    opacity: 1;
  }

  @keyframes cdsSparklineInteractiveFadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const fadeOutCss = css`
  && {
    animation: cdsSparklineInteractiveFadeOut ${fadeDuration}ms ${cubicBezier('global')};
    opacity: 0;
  }

  @keyframes cdsSparklineInteractiveFadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export function fadeOut(domNode?: HTMLElement | null) {
  domNode?.classList.remove(fadeInCss);
  domNode?.classList.add(fadeOutCss);
}

export function fadeIn(domNode?: HTMLElement | null) {
  domNode?.classList.add(fadeInCss);
  domNode?.classList.remove(fadeOutCss);
}
