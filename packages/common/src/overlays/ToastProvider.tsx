import React, { cloneElement, createContext, isValidElement, useMemo } from 'react';

import type { ThemeVars } from '../core/theme';
import type {
  DimensionValue,
  OverlayLifecycleProps,
  SharedAccessibilityProps,
  SharedProps,
} from '../types';

import { useToastQueue } from './useToastQueue';

export type ToastRefHandle = {
  hide: () => Promise<boolean>;
};

export type ToastDuration = {
  /**
   * Duration in milliseconds.
   * Duration is automatically calculated
   * @danger This will override default calculated value.
   */
  duration?: number;
};

export type ToastAction = SharedProps & {
  /**
   * Label for the action button
   */
  label: string;
  /**
   * Callback function fired when the button is pressed
   */
  onPress: () => void;
};

export type ToastBaseProps = SharedProps &
  SharedAccessibilityProps &
  Pick<OverlayLifecycleProps, 'onWillHide' | 'onDidHide'> & {
    /**
     * The message to be displayed in the toast
     */
    text: string;
    /**
     * Optional toast action i.e. a CTA button
     */
    action?: ToastAction;
    /**
     * The vertical offset from the bottom of the screen
     */
    bottomOffset?: DimensionValue;
    /**
     * Controls color surge of the Toast background
     * @default primary
     */
    variant?: ThemeVars.Color;
  };

export type ToastElement = React.ReactElement<ToastBaseProps & { ref?: React.Ref<ToastRefHandle> }>;

/**
 * The data structure managed by the ToastProvider.
 * It composes together the Toast element requested to be rendered and the duration for which it should be displayed.
 */
export type ToastNode = {
  duration: number;
  element: ToastElement;
};

export type ToastProviderProps = {
  /**
   * An optional, global override to individual Toasts' bottomOffset prop.
   * This value will be applied to all Toasts render via this Provider instance
   */
  toastBottomOffset?: ToastBaseProps['bottomOffset'];
};

export type ToastProviderStates = {
  activeToast?: ToastNode;
  addToast: (element: ToastNode['element'], duration: number) => void;
  removeToast: () => void;
  hideToast: () => void;
  clearToastQueue: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
};

export const ToastContext = createContext<ToastProviderStates>({
  activeToast: undefined,
  addToast: () => {},
  removeToast: () => {},
  hideToast: () => {},
  clearToastQueue: () => {},
  pauseTimer: () => {},
  resumeTimer: () => {},
});

export const ToastProvider: React.FC<React.PropsWithChildren<ToastProviderProps>> = ({
  children,
  toastBottomOffset,
}) => {
  const {
    activeToast,
    addToast,
    removeToast,
    hideToast,
    clearToastQueue,
    pauseTimer,
    resumeTimer,
  } = useToastQueue();

  const element = activeToast?.element;

  const memoizedContextValue = useMemo(
    () => ({
      addToast,
      removeToast,
      hideToast,
      clearToastQueue,
      pauseTimer,
      resumeTimer,
    }),
    [addToast, removeToast, hideToast, clearToastQueue, pauseTimer, resumeTimer],
  );

  return (
    <ToastContext.Provider value={memoizedContextValue}>
      {children}
      {/* render as the last element for it to work on android */}
      {isValidElement(element) && toastBottomOffset
        ? // props level offset should have higher specificity
          cloneElement(element, { bottomOffset: element.props.bottomOffset ?? toastBottomOffset })
        : element}
    </ToastContext.Provider>
  );
};
