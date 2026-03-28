import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useEventHandler } from '@coinbase/cds-common/hooks/useEventHandler';
import type { ComponentEventHandlerProps } from '@coinbase/cds-common/types/ComponentEventHandlerProps';
import { css } from '@linaria/core';

import type { Polymorphic } from '../core/polymorphism';
import { cx } from '../cx';
import { useIsoEffect } from '../hooks/useIsoEffect';

import { Interactable, type InteractableBaseProps } from './Interactable';
import {
  interactablePressedBackground,
  interactablePressedOpacity,
} from './interactableCSSProperties';
import {
  getTabIndex,
  handleButtonFocusOnSafariOrFirefoxOnMac,
  isNativeClick,
  isNativeTabbable,
  supportsDisabledAttribute,
} from './reakit-utils';

const scaledDownCss = css`
  /* Prevents layout shift - https://web.dev/cls/#animations-and-transitions */
  transform: scale(1);

  &:active,
  &[data-active='true'] {
    transform: scale(0.98);
  }
`;

const baseCss = css`
  &[data-active='true'] {
    background-color: var(${interactablePressedBackground});
    > * {
      opacity: var(${interactablePressedOpacity});
    }
  }

  &[data-loading='true'] {
    opacity: 1;
    background-color: var(${interactablePressedBackground});
    > * {
      opacity: var(${interactablePressedOpacity});
    }
  }
`;

const transparentActiveCss = css`
  &[data-active='true'] {
    background-color: var(--color-transparent);
  }
`;

export const pressableDefaultElement = 'button';

export type PressableDefaultElement = typeof pressableDefaultElement;

export type PressableBaseProps = Polymorphic.ExtendableProps<
  InteractableBaseProps,
  ComponentEventHandlerProps & {
    /** Dont scale element on press. */
    noScaleOnPress?: boolean;
    focusable?: boolean;
  }
>;

export type PressableProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  PressableBaseProps
>;

type PressableComponent = (<AsComponent extends React.ElementType = PressableDefaultElement>(
  props: PressableProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const Pressable: PressableComponent = forwardRef<
  React.ReactElement<PressableBaseProps>,
  PressableBaseProps
>(
  <AsComponent extends React.ElementType>(
    {
      as,
      className,
      disabled,
      loading,
      onClickCapture,
      onClick,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseDownCapture,
      noScaleOnPress,
      tabIndex,
      eventConfig,
      analyticsId,
      focusable,
      type,
      transparentWhilePressed,
      padding = 0,
      ...props
    }: PressableProps<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? pressableDefaultElement) satisfies React.ElementType;
    const elementRef = useRef(null);
    useImperativeHandle(ref, () => elementRef.current, []); // Merges forwarded ref with internal elementRef
    const defaultButtonType = Component === 'button' ? 'button' : undefined;
    const [nativeTabbable, setNativeTabbable] = useState(true);
    const [supportsDisabled, setSupportsDisabled] = useState(true);
    const [active, setActive] = useState(false);
    const isActiveRef = useRef(false);
    // Evaluate rendered element for computing appropriate accessibility attributes
    useIsoEffect(() => {
      const element = elementRef.current;
      if (!element) return;
      if (!isNativeTabbable(element)) setNativeTabbable(false);
      if (!supportsDisabledAttribute(element)) setSupportsDisabled(false);
    }, []);

    // Handle Enter and Spacebar keydown events
    const handleOnKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        onKeyDown?.(event);

        if (
          event.defaultPrevented ||
          disabled ||
          event.metaKey ||
          event.target !== event.currentTarget
        )
          return;

        const isEnter = event.key === 'Enter';
        const isSpace = event.key === ' ';

        if (isEnter || isSpace) {
          if (isNativeClick(event)) return;
          event.preventDefault();
          // Trigger a click on Enter keydown
          if (isEnter) event.currentTarget.click();
          // Set data-active attribute on Spacebar keydown, and prepare to trigger click on Spacebar keyup
          else if (isSpace && !isActiveRef.current) {
            isActiveRef.current = true;
            setActive(true);
          }
        }
      },
      [disabled, onKeyDown],
    );

    // Handle Spacebar keyup event
    const handleOnKeyUp = useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        onKeyUp?.(event);

        if (event.defaultPrevented || disabled || event.metaKey) return;

        // Remove data-active attribute on Spacebar keyup and trigger a click
        if (isActiveRef.current && event.key === ' ') {
          isActiveRef.current = false;
          setActive(false);
          event.currentTarget.click();
        }
      },
      [disabled, onKeyUp],
    );

    const handleOnClickCapture = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        onClickCapture?.(event);
        if (event.defaultPrevented) return;
        if (disabled) {
          event.stopPropagation();
          event.preventDefault();
        }
      },
      [disabled, onClickCapture],
    );

    const handleOnMouseDownCapture = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        onMouseDownCapture?.(event);
        if (event.defaultPrevented) return;
        if (disabled) {
          event.stopPropagation();
          event.preventDefault();
        }
      },
      [disabled, onMouseDownCapture],
    );

    // Handle Button focus on mousedown in Safari or Firefox on Mac browsers
    const handleOnMouseDown = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        onMouseDown?.(event);

        if (event.defaultPrevented) return;
        handleButtonFocusOnSafariOrFirefoxOnMac(event);
      },
      [onMouseDown],
    );

    const onEventHandler = useEventHandler('Button', 'onClick', eventConfig, analyticsId);

    const handleClick = useCallback(
      (event: React.MouseEvent) => {
        onClick?.(event);
        onEventHandler();
      },
      [onClick, onEventHandler],
    );

    const accessibilityProps = useMemo(
      () => ({
        disabled: (disabled || loading) && supportsDisabled && !focusable ? true : undefined,
        'aria-disabled':
          (disabled || loading) && (!supportsDisabled || focusable) ? true : undefined,
        tabIndex: getTabIndex({ disabled, focusable, supportsDisabled, nativeTabbable, tabIndex }),
      }),
      [disabled, loading, focusable, supportsDisabled, nativeTabbable, tabIndex],
    );

    return (
      <Interactable
        ref={elementRef}
        as={Component}
        className={cx(
          baseCss,
          !noScaleOnPress && scaledDownCss,
          transparentWhilePressed && transparentActiveCss,
          className,
        )}
        data-active={active || undefined}
        data-loading={loading || undefined}
        loading={loading}
        onClick={handleClick}
        onClickCapture={handleOnClickCapture}
        onKeyDown={handleOnKeyDown}
        onKeyUp={handleOnKeyUp}
        onMouseDown={handleOnMouseDown}
        onMouseDownCapture={handleOnMouseDownCapture}
        padding={padding}
        rel={!props.rel && props.target === '_blank' ? 'noopener noreferrer' : props.rel}
        transparentWhilePressed={transparentWhilePressed}
        type={type ?? defaultButtonType}
        {...accessibilityProps}
        {...props}
      />
    );
  },
);
