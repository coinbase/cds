import React, { useCallback, useEffect, useRef } from 'react';
import { Modal, View } from 'react-native';
import type { SharedProps } from '@cbhq/cds-common';
import { useRefMap } from '@cbhq/cds-common/hooks/useRefMap';
import {
  OverlayContentContext,
  type OverlayContentContextValue,
} from '@cbhq/cds-common/overlays/OverlayContentContext';
import { RefMapContext } from '@cbhq/cds-common/system/RefMapContext';
import { TourContext, type TourContextValue } from '@cbhq/cds-common/tour/TourContext';
import type {
  TourOptions,
  TourStepArrowComponent,
  TourStepValue,
} from '@cbhq/cds-common/tour/useTour';
import { useTour } from '@cbhq/cds-common/tour/useTour';
import type { SharedAccessibilityProps } from '@cbhq/cds-common/types/SharedAccessibilityProps';
import {
  type AutoPlacementOptions,
  type OffsetOptions,
  type ShiftOptions,
} from '@floating-ui/core';
import {
  arrow as arrowMiddleware,
  autoPlacement,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react-native';
import { animated, config as springConfig, useSpring } from '@react-spring/native';

import { useTheme } from '../hooks/useTheme';

import { DefaultTourMask } from './DefaultTourMask';
import { DefaultTourStepArrow } from './DefaultTourStepArrow';

const overlayContentContextValue: OverlayContentContextValue = {
  isTour: true,
};

export type TourMaskComponentProps = {
  /**
   * The active TourStep's target element.
   */
  activeTourStepTarget: View;
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
} & Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityLabelledBy' | 'id'> &
  SharedProps;

type TourFC = <T extends string = string>(props: TourProps<T>) => React.ReactNode;

const TourComponent = <T extends string = string>({
  steps,
  activeTourStep,
  tourStepOffset = 24,
  tourStepShift,
  onChange,
  TourMaskComponent = DefaultTourMask,
  TourStepArrowComponent = DefaultTourStepArrow,
  children,
  hideOverlay,
  tourMaskPadding,
  tourMaskBorderRadius,
  accessibilityLabel,
  accessibilityLabelledBy,
  id,
  testID,
}: TourProps<T>) => {
  const theme = useTheme();
  const refMap = useRefMap<View>();
  const tourStepArrowRef = useRef<View>(null);
  const RenderedTourStep = activeTourStep?.Component;
  const RenderedTourStepArrow = activeTourStep?.ArrowComponent ?? TourStepArrowComponent;
  const activeTourStepTarget = activeTourStep ? refMap.getRef(activeTourStep.id) : null;
  const defaultTourStepOffset = theme.space[3];
  const defaultTourStepShiftPadding = theme.space[4];

  const {
    refs,
    floatingStyles,
    placement,
    middlewareData: { arrow },
  } = useFloating({
    middleware: [
      autoPlacement(),
      offset(tourStepOffset ?? defaultTourStepOffset),
      shift(tourStepShift ?? { padding: defaultTourStepShiftPadding }),
      arrowMiddleware({ element: tourStepArrowRef }),
    ],
  });

  const [animation, animationApi] = useSpring(
    () => ({ from: { opacity: 0 }, config: springConfig.slow }),
    [],
  );

  const handleChange = useCallback(
    (tourStep: TourStepValue<T> | null) => {
      // If the opacity is already 0, animating it to 0 does not trigger `onRest`
      if (animation.opacity.get() === 0) return onChange(tourStep);
      void animationApi.start({
        to: { opacity: 0 },
        config: springConfig.stiff,
        onRest: () => onChange(tourStep),
      });
    },
    [animation.opacity, animationApi, onChange],
  );

  const revealTourStep = useCallback(() => {
    activeTourStepTarget?.measureInWindow((x, y, width, height) => {
      refs.setReference({
        measure: (callback: (x: number, y: number, width: number, height: number) => void) => {
          callback(x, y, width, height);
          void animationApi.start({ to: { opacity: 1 }, config: springConfig.slow });
        },
      });
    });
  }, [activeTourStepTarget, animationApi, refs]);

  const api = useTour<T>({ steps, activeTourStep, onChange: handleChange });

  useEffect(() => {
    if (!activeTourStep) return;
    revealTourStep();
  }, [activeTourStep, revealTourStep]);

  return (
    <OverlayContentContext.Provider value={overlayContentContextValue}>
      <RefMapContext.Provider value={refMap}>
        <TourContext.Provider value={api as TourContextValue}>
          {children}
          {!!RenderedTourStep && (
            <Modal
              transparent
              accessibilityLabel={accessibilityLabel}
              accessibilityLabelledBy={accessibilityLabelledBy}
              animationType="none"
              id={id}
              presentationStyle="overFullScreen"
              testID={testID}
            >
              {!(activeTourStep.hideOverlay ?? hideOverlay) && !!activeTourStepTarget && (
                <animated.View style={animation}>
                  <TourMaskComponent
                    activeTourStepTarget={activeTourStepTarget}
                    borderRadius={activeTourStep.tourMaskBorderRadius ?? tourMaskBorderRadius}
                    padding={activeTourStep.tourMaskPadding ?? tourMaskPadding}
                  />
                </animated.View>
              )}
              <View ref={refs.setFloating} collapsable={false} style={floatingStyles}>
                <animated.View style={animation}>
                  <RenderedTourStepArrow
                    ref={tourStepArrowRef}
                    arrow={arrow}
                    placement={placement}
                    style={activeTourStep?.arrowStyle}
                  />
                  <RenderedTourStep {...activeTourStep} />
                </animated.View>
              </View>
            </Modal>
          )}
        </TourContext.Provider>
      </RefMapContext.Provider>
    </OverlayContentContext.Provider>
  );
};

TourComponent.displayName = 'Tour';

export const Tour = TourComponent as TourFC;
