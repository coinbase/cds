/**
 * ButtonOrLink is adapted from the reakit Button, Clickable, and Tabbable source code:
 * - https://github.com/ariakit/ariakit/blob/reakit/packages/reakit/src/Button/Button.ts
 * - https://github.com/ariakit/ariakit/blob/reakit/packages/reakit/src/Clickable/Clickable.ts
 * - https://github.com/ariakit/ariakit/blob/reakit/packages/reakit/src/Tabbable/Tabbable.ts
 */
import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { useIsoEffect } from '../hooks/useIsoEffect';

import {
  getTabIndex,
  handleButtonFocusOnSafariOrFirefoxOnMac,
  isNativeClick,
  isNativeTabbable,
  supportsDisabledAttribute,
} from './reakit-utils';

type ButtonOrLinkProps = React.AllHTMLAttributes<HTMLElement> & {
  to?: string;
  focusable?: boolean;
};

const accessibilityCss = css`
  pointer-events: none;
`;

/** @deprecated This component will be removed in a future version. Use Pressable instead. */
export const ButtonOrLink = memo(
  forwardRef<HTMLElement, ButtonOrLinkProps>(
    (
      {
        children,
        to,
        href,
        rel,
        target,
        type = 'button',
        disabled,
        focusable,
        tabIndex,
        onKeyDown,
        onKeyUp,
        onKeyPressCapture,
        onClickCapture,
        onMouseDown,
        onMouseDownCapture,
        className,
        ...props
      },
      ref,
    ) => {
      const elementRef = useRef<HTMLElement | null>(null);
      useImperativeHandle(ref, () => elementRef.current as HTMLElement, []); // Merges forwarded ref with internal elementRef

      const isLink = to || href;

      const [nativeTabbable, setNativeTabbable] = useState(true);
      const [supportsDisabled, setSupportsDisabled] = useState(true);

      const [active, setActive] = useState(false);
      const isActiveRef = useRef(false);

      // Evaluate element to set state values used to compute appropriate tabIndex
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

      const handleOnKeyPressCapture = useCallback(
        (event: React.KeyboardEvent<HTMLElement>) => {
          onKeyPressCapture?.(event);
          if (event.defaultPrevented) return;
          if (disabled) {
            event.stopPropagation();
            event.preventDefault();
          }
        },
        [disabled, onKeyPressCapture],
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

      const accessibilityProps = useMemo(
        () => ({
          disabled: disabled && supportsDisabled && !focusable ? true : undefined,
          'aria-disabled': disabled && (!supportsDisabled || focusable) ? true : undefined,
          tabIndex: getTabIndex({
            disabled,
            focusable,
            supportsDisabled,
            nativeTabbable,
            tabIndex,
          }),
        }),
        [disabled, focusable, supportsDisabled, nativeTabbable, tabIndex],
      );

      if (isLink) {
        return (
          <a
            ref={elementRef as React.ForwardedRef<HTMLAnchorElement>}
            className={cx(disabled && accessibilityCss, className)}
            data-active={active || undefined}
            href={to ?? href}
            onClickCapture={handleOnClickCapture}
            onKeyDown={handleOnKeyDown}
            onKeyPressCapture={handleOnKeyPressCapture}
            onKeyUp={handleOnKeyUp}
            onMouseDown={handleOnMouseDown}
            onMouseDownCapture={handleOnMouseDownCapture}
            rel={!rel && target === '_blank' ? 'noopener noreferrer' : rel}
            target={target}
            {...accessibilityProps}
            {...props}
          >
            {children}
          </a>
        );
      }

      return (
        <button
          ref={elementRef as React.ForwardedRef<HTMLButtonElement>}
          className={cx(disabled && accessibilityCss, className)}
          data-active={active || undefined}
          onClickCapture={handleOnClickCapture}
          onKeyDown={handleOnKeyDown}
          onKeyPressCapture={handleOnKeyPressCapture}
          onKeyUp={handleOnKeyUp}
          onMouseDown={handleOnMouseDown}
          onMouseDownCapture={handleOnMouseDownCapture}
          type={type as 'button'}
          {...accessibilityProps}
          {...props}
        >
          {children}
        </button>
      );
    },
  ),
);

ButtonOrLink.displayName = 'ButtonOrLink';
