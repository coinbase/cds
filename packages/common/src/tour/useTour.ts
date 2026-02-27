import { useCallback, useMemo, useState } from 'react';
import type React from 'react';

// TODO: move all props irrelevant to useTour core logic to web and mobile packages. eg TourStepArrowComponent, TourStepComponent, TourScrollOptions, etc.

/**
 * Placement for the tour step arrow. Matches the placement values used by positioning libraries
 * (e.g. @floating-ui) so web/mobile can pass through their placement directly.
 */
export type TourStepArrowPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';

/**
 * Arrow coordinates and offsets for the tour step arrow. Matches the shape provided by arrow
 * middleware (e.g. @floating-ui) so web/mobile can pass through their arrow data directly.
 */
export type TourStepArrowData = {
  x?: number;
  y?: number;
  centerOffset?: number;
  alignmentOffset?: number;
};

export type TourStepArrowComponentProps = {
  /** Arrow coordinates and offsets for positioning the arrow element. */
  arrow?: TourStepArrowData;
  /** Placement of the arrow relative to the floating element. */
  placement: TourStepArrowPlacement;
  style?: Record<string, string | number>;
};

/**
 * The TourStepArrowComponent must forwardRef onto the underlying element for the positioning
 * library to correctly position the element.
 */
export type TourStepArrowComponent = React.ForwardRefExoticComponent<
  TourStepArrowComponentProps & { ref?: React.Ref<any> }
>;

export type TourStepComponent = React.FC<Omit<TourStepValue, 'Component'>>;

/**
 * Web only.
 */
export type TourScrollOptions = {
  behavior?: ScrollBehavior;
  marginX?: number;
  marginY?: number;
};

export type TourStepValue<TourStepId extends string = string> = {
  /**
   * The tour step id.
   */
  id: TourStepId;
  /**
   * The Component to render for this tour step.
   */
  Component: TourStepComponent;
  /**
   * The TourStepArrowComponent to render for this tour step.
   */
  ArrowComponent?: TourStepArrowComponent;
  /**
   * Disabling the tour step causes it to be skipped when calling `goNextTourStep()` or `goPreviousTourStep()`.
   */
  disabled?: boolean;
  /**
   * Hides the overlay when the tour is active.
   */
  hideOverlay?: boolean;
  /**
   * Callback function fired as this step becomes active. This step's `onActive` will fire simultaneously with the previously active step's `onInactive`.
   */
  onActive?: () => void | Promise<void>;
  /**
   * Callback function fired right before this step becomes active. This step's `onBeforeActive` will fire simultaneously with the previously active step's `onBeforeInactive`.
   */
  onBeforeActive?: () => void | Promise<void>;
  /**
   * Callback function fired as this step becomes inactive. This step's `onInactive` will fire simultaneously with the new active step's `onActive`.
   */
  onInactive?: () => void | Promise<void>;
  /**
   * Callback function fired right before this step becomes inactive. This step's `onBeforeInactive` will fire simultaneously with the new active step's `onBeforeActive`.
   */
  onBeforeInactive?: () => void | Promise<void>;
  /**
   * Padding to add around the edges of the TourMask's content mask.
   */
  tourMaskPadding?: string | number;
  /**
   * Corner radius for the TourMask's content mask. Uses SVG rect element's `rx` and `ry` attributes https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rx.
   */
  tourMaskBorderRadius?: string | number;
  /**
   * Add styles to the TourStepArrowComponent for this tour step.
   */
  arrowStyle?: Record<string, string | number>;
  /**
   * Web only. Disables automatically scrolling to this TourStep when it becomes active.
   */
  disableAutoScroll?: boolean;
  /**
   * Web only. Controls the scrolling behavior and margins when calling element.scrollTo() to scroll to an active TourStep target.
   */
  scrollOptions?: TourScrollOptions;
};

export type TourOptions<TourStepId extends string = string> = {
  /* The array of tour steps data.  */
  steps: TourStepValue<TourStepId>[];
  /* The value of the currently active tour step. */
  activeTourStep: TourStepValue<TourStepId> | null;
  /* Set the value of the currently active tour step. */
  onChange: (tourStep: TourStepValue<TourStepId> | null) => void;
};

/**
 * API returned by useTour and provided via TourContext.
 * @template TourStepId - Step id string literal type.
 * @template TTarget - Type of the active step's target element (e.g. HTMLElement for web, View for react-native). Defaults to unknown.
 */
export type TourApi<TourStepId extends string = string, TTarget = unknown> = Omit<
  TourOptions<TourStepId>,
  'onChange'
> & {
  /** The target element of the currently active tour step. */
  activeTourStepTarget: TTarget | null;
  /** Set the target element of the currently active tour step. */
  setActiveTourStepTarget: (target: TTarget | null) => void;
  /* Jumps to a specified step of the tour. */
  setActiveTourStep: (tourStepId: TourStepId | null) => void;
  /* Starts the tour; can optionally start at a specified step ID. */
  startTour: (tourStepId?: TourStepId) => void;
  /* Stops the tour. */
  stopTour: () => void;
  /* Moves to the next step in the tour. */
  goNextTourStep: () => void;
  /* Moves to the previous step in the tour. */
  goPreviousTourStep: () => void;
};

/** A controlled hook for managing tour state, such as the currently active tour step. */
export const useTour = <TourStepId extends string = string, TTarget = unknown>({
  steps,
  activeTourStep,
  onChange,
}: TourOptions<TourStepId>): TourApi<TourStepId, TTarget> => {
  const [activeTourStepTarget, setActiveTourStepTarget] = useState<TTarget | null>(null);
  const startTour = useCallback(
    async (tourStepId?: TourStepId | null) => {
      if (typeof tourStepId === 'undefined') return onChange(steps[0]);
      let newActiveTourStep = null;
      if (typeof tourStepId === 'string') {
        newActiveTourStep = steps.find((step) => step.id === tourStepId);
        newActiveTourStep ||= steps[0];
      }
      if (newActiveTourStep !== activeTourStep) {
        await Promise.all([
          activeTourStep?.onBeforeInactive?.(),
          newActiveTourStep?.onBeforeActive?.(),
        ]);
        onChange(newActiveTourStep);
        await Promise.all([activeTourStep?.onInactive?.(), newActiveTourStep?.onActive?.()]);
      }
    },
    [activeTourStep, steps, onChange],
  );

  const setActiveTourStep = useCallback(
    async (tourStepId: TourStepId | null) => startTour(tourStepId),
    [startTour],
  );

  const stopTour = useCallback(async () => {
    if (activeTourStep === null) return;
    await activeTourStep.onBeforeInactive?.();
    onChange(null);
    await activeTourStep.onInactive?.();
  }, [activeTourStep, onChange]);

  const goNextTourStep = useCallback(async () => {
    // If no active step, or active step is the last step, or there are 0 - 1 steps, do nothing
    if (!activeTourStep || activeTourStep.id === steps.at(-1)?.id || steps.length < 2) return;
    const activeStepIndex = steps.findIndex((step) => step.id === activeTourStep.id);
    // Find next step that isn't disabled
    for (let i = activeStepIndex + 1; i < steps.length; i++) {
      const step = steps[i];
      if (!step.disabled) {
        await Promise.all([activeTourStep.onBeforeInactive?.(), step.onBeforeActive?.()]);
        onChange(step);
        await Promise.all([activeTourStep.onInactive?.(), step.onActive?.()]);
        return;
      }
    }
  }, [activeTourStep, steps, onChange]);

  const goPreviousTourStep = useCallback(async () => {
    // If no active step, or active step is the first step, or there are 0 - 1 steps, do nothing
    if (!activeTourStep || activeTourStep.id === steps[0]?.id || steps.length < 2) return;
    const activeStepIndex = steps.findIndex((step) => step.id === activeTourStep.id);
    // Find previous step that isn't disabled
    for (let i = activeStepIndex - 1; i >= 0; i--) {
      const step = steps[i];
      if (!step.disabled) {
        await Promise.all([activeTourStep.onBeforeInactive?.(), step.onBeforeActive?.()]);
        onChange(step);
        await Promise.all([activeTourStep.onInactive?.(), step.onActive?.()]);
        return;
      }
    }
  }, [activeTourStep, steps, onChange]);

  const api = useMemo(
    () =>
      ({
        steps,
        activeTourStep,
        setActiveTourStep,
        activeTourStepTarget,
        setActiveTourStepTarget,
        startTour,
        stopTour,
        goNextTourStep,
        goPreviousTourStep,
      }) as TourApi<TourStepId, TTarget>,
    [
      steps,
      activeTourStep,
      setActiveTourStep,
      activeTourStepTarget,
      setActiveTourStepTarget,
      startTour,
      stopTour,
      goNextTourStep,
      goPreviousTourStep,
    ],
  );

  return api;
};
