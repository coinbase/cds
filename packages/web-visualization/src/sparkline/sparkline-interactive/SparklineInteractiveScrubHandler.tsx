import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import type { ChartGetMarker } from '@coinbase/cds-common';
import { fadeDuration, maskOpacity } from '@coinbase/cds-common/tokens/sparkline';
import { debounce } from '@coinbase/cds-common/utils/debounce';
import { noop } from '@coinbase/cds-utils';
import { cx } from '@coinbase/cds-web';
import { cubicBezier } from '@coinbase/cds-web/animation/convertMotionConfig';
import { useDimensions } from '@coinbase/cds-web/hooks/useDimensions';
import { css } from '@linaria/core';

import { fadeIn, fadeOut } from './fade';
import type { SparklineInteractiveBaseProps } from './SparklineInteractive';
import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';
import { useSparklineInteractiveScrubContext } from './SparklineInteractiveScrubProvider';

export const scrubHandlerStaticClassName = 'cds-sparkline--scrubhandler';

const insetFocusRingCss = css`
  position: relative;
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--color-bgPrimary);
    outline-offset: 0;
  }
`;

const scrubHandlerContainerCss = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

const scrubHandlerCss = css`
  &.${scrubHandlerStaticClassName} {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
`;

const fadeInMaskCss = css`
  && {
    animation: cdsSparklineInteractiveScrubFadeInMask ${fadeDuration}ms ${cubicBezier('global')};
    opacity: ${maskOpacity};
  }

  @keyframes cdsSparklineInteractiveScrubFadeInMask {
    0% {
      opacity: 0;
    }
    100% {
      opacity: ${maskOpacity};
    }
  }
`;

const fadeOutMaskCss = css`
  && {
    animation: cdsSparklineInteractiveScrubFadeOutMask ${fadeDuration}ms ${cubicBezier('global')};
    opacity: 0;
  }

  @keyframes cdsSparklineInteractiveScrubFadeOutMask {
    0% {
      opacity: ${maskOpacity};
    }
    100% {
      opacity: 0;
    }
  }
`;

// Number of steps for keyboard users to navigate through the sparkline
const STEPS = 100;
const STEPS_ARRAY = Array.from(Array(STEPS).keys());
const padding = 8;

function fadeOutMask(domNode?: HTMLElement | null) {
  domNode?.classList.remove(fadeInMaskCss);
  domNode?.classList.add(fadeOutMaskCss);
}

export function fadeInMask(domNode?: HTMLElement | null) {
  domNode?.classList.add(fadeInMaskCss);
  domNode?.classList.remove(fadeOutMaskCss);
}

type SparklineInteractiveScrubHandlerWebProps<Period extends string> = Pick<
  SparklineInteractiveBaseProps<Period>,
  'onScrub' | 'formatHoverDate' | 'formatHoverPrice'
> & {
  getMarker: ChartGetMarker;
  selectedPeriod: Period;
  onScrubEnd?: () => void;
  onScrubStart?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

const SparklineInteractiveScrubHandlerWithGeneric = <Period extends string>({
  onScrubEnd = noop,
  onScrubStart = noop,
  children,
  disabled,
  onScrub,
  getMarker,
  selectedPeriod,
  formatHoverDate,
  formatHoverPrice,
}: SparklineInteractiveScrubHandlerWebProps<Period>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { lineDOMNode, maskDOMNode, hoverDateDOMNode, hoverPriceDOMNode } =
    useSparklineInteractiveScrubContext();
  const { width: chartWidth } = useSparklineInteractiveContext();
  const scrubHandlerCssWithFocus = cx(
    scrubHandlerStaticClassName,
    scrubHandlerCss,
    insetFocusRingCss,
  );
  const [xPos, setXPos] = useState<number>(0);
  const { width, observe } = useDimensions();
  const steps = useMemo(() => {
    const sparklineSteps = STEPS_ARRAY.map((step) => {
      return Math.floor((Number(width) / STEPS) * step) || 1;
    });

    // Make sure each step is within the sparkline container
    sparklineSteps[0] = 1;
    sparklineSteps[STEPS] = Math.floor(width) - 1;

    return sparklineSteps;
  }, [width]);

  const debouncedUpdatePositionHandler = useMemo(
    () =>
      debounce((position: number) => {
        setXPos(position);
      }, 20),
    [setXPos],
  );

  const safelyUpdatePosition = useCallback(debouncedUpdatePositionHandler, [
    debouncedUpdatePositionHandler,
  ]);

  // This method is used by mouseMove and keyboard events
  const updateScrubber = useCallback(
    (position: number) => {
      const dataPoint = getMarker(position);

      if (dataPoint) {
        onScrub?.({
          point: dataPoint,
          period: selectedPeriod,
        });

        if (lineDOMNode) {
          lineDOMNode.style.transform = `translateX(${position}px)`;
        }
        if (maskDOMNode) {
          maskDOMNode.style.transform = `translateX(${position}px)`;
        }
        if (hoverDateDOMNode && formatHoverDate) {
          fadeIn(hoverDateDOMNode);
          hoverDateDOMNode.innerText = formatHoverDate(dataPoint.date, selectedPeriod);

          const textWidth = hoverDateDOMNode.offsetWidth;
          const halfTextWidth = textWidth / 2;
          let textPos = position - halfTextWidth;
          textPos = Math.max(padding, textPos);
          textPos = Math.min(textPos, chartWidth - textWidth - padding);

          hoverDateDOMNode.style.transform = `translateX(${textPos}px)`;
        }

        if (hoverPriceDOMNode && formatHoverPrice) {
          fadeIn(hoverPriceDOMNode);
          hoverPriceDOMNode.innerText = formatHoverPrice(dataPoint.value);

          const textWidth = hoverPriceDOMNode.offsetWidth;
          const halfTextWidth = textWidth / 2;
          let textPos = position - halfTextWidth;
          textPos = Math.max(padding, textPos);
          textPos = Math.min(textPos, chartWidth - textWidth - padding);

          hoverPriceDOMNode.style.transform = `translateX(${textPos}px)`;
        }
      }

      /**
       *  Keep track of the position for a seamless
       *  transition from MouseMove to Keyboard interaction
       */
      safelyUpdatePosition(position);
    },
    [
      getMarker,
      safelyUpdatePosition,
      onScrub,
      selectedPeriod,
      lineDOMNode,
      maskDOMNode,
      hoverDateDOMNode,
      formatHoverDate,
      formatHoverPrice,
      hoverPriceDOMNode,
      chartWidth,
    ],
  );

  // Show the scrub UI
  const handleMouseEnter = useCallback(() => {
    onScrubStart?.();

    fadeIn(lineDOMNode);
    fadeInMask(maskDOMNode);
  }, [lineDOMNode, maskDOMNode, onScrubStart]);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const xPosition = Math.max(
        0,
        event.clientX - (containerRef.current?.getBoundingClientRect().left ?? 0),
      );

      // Update UI
      updateScrubber(xPosition);
    },
    [updateScrubber],
  );

  const getPosition = useCallback(
    (direction: 'next' | 'previous', multiSkip?: boolean) => {
      // Use the xPos to find the nearest step
      const closestStep = steps.reduce((prev, curr) => {
        return Math.abs(curr - xPos) < Math.abs(prev - xPos) ? curr : prev;
      });
      // The index of the closest step
      const currentIndex = steps.findIndex((pos) => pos === closestStep);
      // Holding the shift key allows users to jump 10 steps
      const stepIncrement = multiSkip ? 10 : 1;

      // The location to move to
      const nextLocation = currentIndex + (direction === 'next' ? stepIncrement : -stepIncrement);

      // return the location if we're within bounds of the chart
      return nextLocation > 0 && nextLocation < STEPS ? nextLocation : null;
    },
    [steps, xPos],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLSpanElement>) => {
      const multiSkip = !!e.shiftKey;

      // Go to the correct step
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextStep = getPosition('next', multiSkip) ?? STEPS;
        updateScrubber(steps[nextStep] - 1);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const previousStep = getPosition('previous', multiSkip) ?? 0;
        updateScrubber(steps[previousStep]);
      }

      // Jump to beginning or end
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        updateScrubber(steps[STEPS] - 1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        updateScrubber(0);
      }
    },
    [getPosition, updateScrubber, steps],
  );

  const handleMouseLeave = useCallback(() => {
    onScrubEnd?.();

    fadeOut(lineDOMNode);
    fadeOutMask(maskDOMNode);
    fadeOut(hoverDateDOMNode);
    fadeOut(hoverPriceDOMNode);
  }, [hoverDateDOMNode, lineDOMNode, maskDOMNode, hoverPriceDOMNode, onScrubEnd]);

  return (
    <div ref={containerRef} className={scrubHandlerContainerCss}>
      {children}
      {!disabled && (
        <div
          ref={observe}
          aria-label="Price chart (use arrow keys to adjust view)"
          className={scrubHandlerCssWithFocus}
          onBlur={handleMouseLeave}
          onFocus={handleMouseEnter}
          onKeyDown={handleKeyDown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          role="button"
          tabIndex={0}
        />
      )}
    </div>
  );
};

export const SparklineInteractiveScrubHandler = memo(
  SparklineInteractiveScrubHandlerWithGeneric,
) as typeof SparklineInteractiveScrubHandlerWithGeneric;
