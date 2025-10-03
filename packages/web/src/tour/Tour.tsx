import React, { useCallback, useEffect, useRef } from 'react';
import {
  OverlayContentContext,
  type OverlayContentContextValue,
} from '@coinbase/cds-common/overlays/OverlayContentContext';
import { TourContext, type TourContextValue } from '@coinbase/cds-common/tour/TourContext';
import type {
  TourOptions,
  TourScrollOptions,
  TourStepArrowComponent,
  TourStepValue,
} from '@coinbase/cds-common/tour/useTour';
import { useTour } from '@coinbase/cds-common/tour/useTour';
import type { Rect, SharedProps } from '@coinbase/cds-common/types';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import {
  arrow as arrowMiddleware,
  autoPlacement,
  type AutoPlacementOptions,
  autoUpdate,
  offset,
  type OffsetOptions,
  shift,
  type ShiftOptions,
  useFloating,
} from '@floating-ui/react-dom';
import { css } from '@linaria/core';
import { animated, config as springConfig, useSpring } from '@react-spring/web';

import { useScrollBlocker } from '../hooks/useScrollBlocker';
import { FocusTrap } from '../overlays/FocusTrap';
import { Portal } from '../overlays/Portal';
import { modalContainerId } from '../overlays/PortalProvider';

import { DefaultTourMask } from './DefaultTourMask';
import { DefaultTourStepArrow } from './DefaultTourStepArrow';

const overlayContentContextValue: OverlayContentContextValue = {
  isTour: true,
};

const containerCss = css`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
`;

export type TourMaskComponentProps = {
  /**
   * Rect of the active TourStep's target element.
   */
  activeTourStepTargetRect: Rect;
  /**
   * Padding to add around the edges of the TourOverlay's content mask.
   */
  padding?: string | number;
  /**
   * Corner radius for the TourOverlay's content mask. Uses SVG rect element's `rx` and `ry`
   * attributes https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rx.
   */
  borderRadius?: string | number;
};

export type TourMaskComponent = React.FC<TourMaskComponentProps>;

export type TourProps<T extends string = string> = TourOptions<T> & {
  children?: React.ReactNode;
  /**
   * The Component to render as a tour overlay and mask.
   * @default DefaultTourMask
   */
  TourMaskComponent?: TourMaskComponent;
  /**
   * The default Component to render for each TourStep arrow element.
   * @default DefaultTourStepArrow
   */
  TourStepArrowComponent?: TourStepArrowComponent;
  /**
   * Hide overlay when tour is active
   * @default false
   */
  hideOverlay?: boolean;
  /**
   * Configures `@floating-ui` offset options for Tour Step component. See https://floating-ui.com/docs/offset.
   */
  tourStepOffset?: OffsetOptions;
  /**
   * Configures `@floating-ui` autoPlacement options for Tour Step component. See https://floating-ui.com/docs/autoplacement.
   * @default 24
   */
  tourStepAutoPlacement?: AutoPlacementOptions;
  /**
   * Configures `@floating-ui` shift options for Tour Step component. See https://floating-ui.com/docs/shift.
   */
  tourStepShift?: ShiftOptions;
  /**
   * Padding to add around the edges of the TourMask's content mask.
   */
  tourMaskPadding?: string | number;
  /**
   * Corner radius for the TourMask's content mask. Uses SVG rect element's `rx` and `ry`
   * attributes https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rx.
   */
  tourMaskBorderRadius?: string | number;
  /**
   * Controls the scrolling behavior and margins when calling element.scrollTo() to scroll to an active TourStep target.
   */
  scrollOptions?: TourScrollOptions;
  /**
   * @danger This disables React portal integration. Use this with caution.
   */
  disablePortal?: boolean;
  /**
   * Disable automatically scrolling to active elements.
   */
  disableAutoScroll?: boolean;
} & Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityLabelledBy' | 'id'> &
  SharedProps;

const defaultScrollOptions: TourScrollOptions = {
  behavior: 'smooth',
  marginX: 100,
  marginY: 100,
};

/** Waits for scrolling to finish before resolving, up to maximum of 3 seconds. */
const waitForScroll = async () =>
  new Promise<void>((resolve) => {
    let isScrolling: ReturnType<typeof setTimeout>;
    let resolved = false;
    const listener = () => {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        window.removeEventListener('scroll', listener);
        resolved = true;
        resolve();
      }, 50);
    };
    window.addEventListener('scroll', listener);
    // This is a failsafe so we don't hang the whole app
    // if `waitForScroll` is called when not scrolling.
    // We assume scrolling won't last longer than 3 sec.
    setTimeout(() => {
      if (!resolved) resolve();
    }, 3000);
  });

const scrollIntoView = async (element: HTMLElement | null, scrollOptions?: TourScrollOptions) => {
  if (!element) return;
  const rect = element.getBoundingClientRect();
  const shouldScrollUp = rect.top < 0;
  const shouldScrollDown = rect.bottom > window.innerHeight;
  const shouldScrollLeft = rect.left < 0;
  const shouldScrollRight = rect.right > window.innerWidth;
  const shouldScrollX =
    (shouldScrollLeft && !shouldScrollRight) || (!shouldScrollLeft && shouldScrollRight);
  const shouldScrollY =
    (shouldScrollUp && !shouldScrollDown) || (!shouldScrollUp && shouldScrollDown);
  if (!shouldScrollX && !shouldScrollY) return;
  const marginX = scrollOptions?.marginX ?? 0;
  const marginY = scrollOptions?.marginY ?? 0;
  const targetX = rect.left + window.scrollX - marginX;
  const targetY = rect.top + window.scrollY - marginY;
  window.scrollTo({
    top: shouldScrollY ? targetY : undefined,
    left: shouldScrollX ? targetX : undefined,
    behavior: 'smooth',
  });
  await waitForScroll();
};

export type TourFC = <T extends string = string>(props: TourProps<T>) => React.ReactNode;

const defaultTourStepOffset = 24;
const defaultTourStepShiftPadding = 32;

const TourComponent = <T extends string = string>({
  steps,
  activeTourStep,
  onChange,
  children,
  TourMaskComponent = DefaultTourMask,
  TourStepArrowComponent = DefaultTourStepArrow,
  hideOverlay,
  tourStepOffset = defaultTourStepOffset,
  tourStepShift,
  tourStepAutoPlacement,
  tourMaskPadding,
  tourMaskBorderRadius,
  scrollOptions = defaultScrollOptions,
  disablePortal,
  disableAutoScroll,
  accessibilityLabel,
  accessibilityLabelledBy,
  id,
  testID,
}: TourProps<T>) => {
  const tourStepArrowRef = useRef<HTMLElement>(null);
  const RenderedTourStep = activeTourStep?.Component;
  const RenderedTourStepArrow = activeTourStep?.ArrowComponent ?? TourStepArrowComponent;

  // This state is used to store the active tour step target element.
  // const [activeTourStepTarget, setActiveTourStepTarget] = useState<HTMLElement | null>(null);

  const blockScroll = useScrollBlocker();
  const [animation, animationApi] = useSpring(
    () => ({ from: { opacity: 0 }, config: springConfig.slow }),
    [],
  );

  const {
    refs,
    floatingStyles,
    placement,
    middlewareData: { arrow },
  } = useFloating<HTMLElement>({
    middleware: [
      autoPlacement(tourStepAutoPlacement),
      offset(tourStepOffset),
      shift(tourStepShift ?? { padding: defaultTourStepShiftPadding }),
      arrowMiddleware({ element: tourStepArrowRef }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const handleChange = useCallback(
    (tourStep: TourStepValue<T> | null) => {
      void animationApi.start({
        to: { opacity: 0 },
        config: springConfig.stiff,
        onResolve: () => onChange(tourStep),
      });
    },
    [animationApi, onChange],
  );

  const api = useTour<T>({ steps, activeTourStep, onChange: handleChange });
  const { activeTourStepTarget, setActiveTourStepTarget } = api;

  // Component Lifecycle & Side Effects
  // ---------------------------------------------------------------------------
  // This component's visual side effects (scrolling and animations) are driven
  // by a single callback, `handleSetActiveTourStepTarget`.
  //
  // This function is called from the `TourStep` component's ref callback
  // whenever the active step changes. Because the ref callback is tied to the
  // lifecycle of the `TourStep`, it reliably fires whenever a new step becomes
  // active, regardless of whether the change was triggered internally (by a
  // "Next" button) or externally (by a direct prop change).
  //
  // This centralizes the logic for revealing a step: we get the target element,
  // scroll it into view, and then kick off the fade-in animation, all in one
  // sequential, event-driven flow.

  const handleActiveTourStepTargetChange = useCallback(
    (target: HTMLElement | null) => {
      refs.setReference(target);
      setActiveTourStepTarget(target);

      const revealTourStep = async () => {
        // Scroll the new target into view.
        if (!disableAutoScroll && !activeTourStep?.disableAutoScroll) {
          await scrollIntoView(target, activeTourStep?.scrollOptions ?? scrollOptions);
        }
        void animationApi.start({ to: { opacity: 1 }, config: springConfig.slow });
      };

      void revealTourStep();
    },
    [
      refs,
      setActiveTourStepTarget,
      disableAutoScroll,
      activeTourStep?.disableAutoScroll,
      activeTourStep?.scrollOptions,
      animationApi,
      scrollOptions,
    ],
  );

  // Manages scroll locking for the tour's duration. `useEffect` is used to
  // guarantee that scroll is re-enabled when the tour is closed or unmounted.
  useEffect(() => {
    if (activeTourStep?.id) {
      blockScroll(true);
    }

    return () => {
      blockScroll(false);
    };
  }, [activeTourStep, animationApi, blockScroll, disableAutoScroll, scrollOptions]);

  return (
    <OverlayContentContext.Provider value={overlayContentContextValue}>
      <TourContext.Provider
        value={
          { ...api, setActiveTourStepTarget: handleActiveTourStepTargetChange } as TourContextValue
        }
      >
        {children}
        {!!RenderedTourStep && (
          <Portal containerId={modalContainerId} disablePortal={disablePortal}>
            <div
              aria-label={accessibilityLabel}
              aria-labelledby={accessibilityLabelledBy}
              aria-modal="true"
              className={containerCss}
              data-testid={testID}
              id={id}
              role="dialog"
            >
              {!(activeTourStep.hideOverlay ?? hideOverlay) && activeTourStepTarget && (
                <animated.div style={animation}>
                  <TourMaskComponent
                    activeTourStepTargetRect={(
                      activeTourStepTarget as HTMLElement
                    ).getBoundingClientRect()}
                    borderRadius={activeTourStep.tourMaskBorderRadius ?? tourMaskBorderRadius}
                    padding={activeTourStep.tourMaskPadding ?? tourMaskPadding}
                  />
                </animated.div>
              )}
              <div ref={refs.setFloating} style={floatingStyles}>
                <FocusTrap>
                  <animated.div style={animation}>
                    <RenderedTourStepArrow
                      ref={tourStepArrowRef}
                      arrow={arrow}
                      placement={placement}
                      style={activeTourStep?.arrowStyle}
                    />
                    <RenderedTourStep {...activeTourStep} />
                  </animated.div>
                </FocusTrap>
              </div>
            </div>
          </Portal>
        )}
      </TourContext.Provider>
    </OverlayContentContext.Provider>
  );
};

TourComponent.displayName = 'Tour';

export const Tour = TourComponent as TourFC;
