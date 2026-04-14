import React, { useCallback, useMemo, useRef } from 'react';
import { Modal, type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import type { SharedProps } from '@coinbase/cds-common';
import {
  OverlayContentContext,
  type OverlayContentContextValue,
} from '@coinbase/cds-common/overlays/OverlayContentContext';
import { TourContext, type TourContextValue } from '@coinbase/cds-common/tour/TourContext';
import type { TourOptions, TourStepValue } from '@coinbase/cds-common/tour/useTour';
import { useTour } from '@coinbase/cds-common/tour/useTour';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import {
  type AutoPlacementOptions,
  type Coords,
  type OffsetOptions,
  type Placement,
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

import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';

import { DefaultTourMask } from './DefaultTourMask';
import { DefaultTourStepArrow } from './DefaultTourStepArrow';

const overlayContentContextValue: OverlayContentContextValue = {
  isTour: true,
};

// ------------ SUBCOMPONENT PROP TYPES ------------
export type TourStepArrowComponentProps = {
  arrow?: Partial<Coords> & {
    centerOffset: number;
    alignmentOffset?: number;
  };
  placement: Placement;
  style?: StyleProp<ViewStyle>;
};

// ------------ SUBCOMPONENT TYPES ------------
export type TourStepArrowComponent = React.ForwardRefExoticComponent<
  TourStepArrowComponentProps & { ref?: React.Ref<any> }
>;

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

export type TourBaseProps<TourStepId extends string = string> = SharedProps &
  TourOptions<TourStepId> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityLabelledBy' | 'id'> & {
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
    /** Custom styles for individual elements of the Tour component */
    styles?: {
      /** Root element */
      root?: StyleProp<ViewStyle>;
      /** The opaque overlay/mask that emphasizes current step */
      mask?: StyleProp<ViewStyle>;
      /** A step's arrow element */
      stepArrow?: StyleProp<ViewStyle>;
      /** A step element's positioned container */
      stepContainer?: StyleProp<ViewStyle>;
    };
  };

export type TourProps<TourStepId extends string = string> = TourBaseProps<TourStepId>;

type TourFC = <TourStepId extends string = string>(props: TourProps<TourStepId>) => React.ReactNode;

const TourComponent = <TourStepId extends string = string>(_props: TourProps<TourStepId>) => {
  const mergedProps = useComponentConfig('Tour', _props);
  const {
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
    styles,
    accessibilityLabel,
    accessibilityLabelledBy,
    id,
    testID,
  } = mergedProps;
  const theme = useTheme();
  const defaultTourStepOffset = theme.space[3];
  const defaultTourStepShiftPadding = theme.space[4];

  const tourStepArrowRef = useRef<View>(null);
  const RenderedTourStep = activeTourStep?.Component;
  // activeTourStep.ArrowComponent references old, deprecated type in cds-common
  const RenderedTourStepArrow =
    (activeTourStep?.ArrowComponent as TourStepArrowComponent) ?? TourStepArrowComponent;

  const [animation, animationApi] = useSpring(
    () => ({ from: { opacity: 0 }, config: springConfig.slow }),
    [],
  );

  // StyleSheet.flatten is needed because styles?.mask/stepContainer are StyleProp<ViewStyle>,
  // which may be arrays. Unlike RN's Animated.View, react-spring's animated.View only accepts
  // plain style objects, so we must flatten before merging with the spring animation values.
  const maskStyles = useMemo(
    () => ({ ...animation, ...StyleSheet.flatten(styles?.mask) }) as typeof animation,
    [animation, styles?.mask],
  );

  const stepContainerStyles = useMemo(
    () => ({ ...animation, ...StyleSheet.flatten(styles?.stepContainer) }) as typeof animation,
    [animation, styles?.stepContainer],
  );

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

  const handleChange = useCallback(
    (tourStep: TourStepValue<TourStepId> | null) => {
      void animationApi.start({
        to: { opacity: 0 },
        config: springConfig.stiff,
        onResolve: () => {
          onChange(tourStep);
        },
      });
    },
    [animationApi, onChange],
  );

  const api = useTour<TourStepId>({ steps, activeTourStep, onChange: handleChange });
  const { activeTourStepTarget, setActiveTourStepTarget } = api;

  // Component Lifecycle & Side Effects
  // ---------------------------------------------------------------------------
  // This component's visual side effects (animations) are driven by a single
  // callback, `handleSetActiveTourStepTarget`.
  //
  // This function is called from the `TourStep` component's ref callback
  // whenever the active step changes. Because the ref callback is tied to the
  // lifecycle of the `TourStep`, it reliably fires whenever a new step becomes
  // active.
  //
  // This centralizes the logic for revealing a step: when the callback fires,
  // we measure the target element's position on screen and then kick off the
  // fade-in animation, all in one sequential, event-driven flow.

  const handleActiveTourStepTargetChange = useCallback(
    (target: View | null) => {
      target?.measureInWindow((x, y, width, height) => {
        refs.setReference({
          measure: (callback: (x: number, y: number, width: number, height: number) => void) => {
            callback(x, y, width, height);
            void animationApi.start({ to: { opacity: 1 }, config: springConfig.slow });
          },
        });
      });

      setActiveTourStepTarget(target);
    },
    [animationApi, refs, setActiveTourStepTarget],
  );

  return (
    <OverlayContentContext.Provider value={overlayContentContextValue}>
      <TourContext.Provider
        value={
          { ...api, setActiveTourStepTarget: handleActiveTourStepTargetChange } as TourContextValue
        }
      >
        {children}
        {!!RenderedTourStep && (
          <Modal
            transparent
            accessibilityLabel={accessibilityLabel}
            accessibilityLabelledBy={accessibilityLabelledBy}
            animationType="none"
            id={id}
            presentationStyle="overFullScreen"
            style={styles?.root}
            testID={testID}
          >
            {!(activeTourStep.hideOverlay ?? hideOverlay) && !!activeTourStepTarget && (
              <animated.View style={maskStyles} testID="tour-mask">
                <TourMaskComponent
                  activeTourStepTarget={activeTourStepTarget as View}
                  borderRadius={activeTourStep.tourMaskBorderRadius ?? tourMaskBorderRadius}
                  padding={activeTourStep.tourMaskPadding ?? tourMaskPadding}
                />
              </animated.View>
            )}
            <View ref={refs.setFloating} collapsable={false} style={floatingStyles}>
              <animated.View style={stepContainerStyles} testID="tour-step-container">
                <RenderedTourStepArrow
                  ref={tourStepArrowRef}
                  arrow={arrow}
                  placement={placement}
                  style={styles?.stepArrow}
                />
                <RenderedTourStep {...activeTourStep} />
              </animated.View>
            </View>
          </Modal>
        )}
      </TourContext.Provider>
    </OverlayContentContext.Provider>
  );
};

TourComponent.displayName = 'Tour';

export const Tour = TourComponent as TourFC;
