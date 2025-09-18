import { cloneElement, useCallback, useEffect, useRef, useState } from 'react';

import { useTimer } from '../hooks/useTimer';

import type { ToastNode, ToastRefHandle } from './ToastProvider';

export const useToastQueue = () => {
  const [activeToast, setActiveToast] = useState<ToastNode>();
  const toastQueue = useRef<ToastNode[]>([]);
  const activeToastRef = useRef<ToastRefHandle | null>(null);
  const hasActiveToast = useRef(false);
  const timer = useTimer();

  hasActiveToast.current = !!activeToast;

  const hideToast = useCallback(async () => activeToastRef.current?.hide(), [activeToastRef]);

  const removeToast = useCallback(() => {
    timer.clear();
    setActiveToast(undefined);
  }, [timer, setActiveToast]);

  const setToast = useCallback(
    (toast?: ToastNode) => {
      if (!toast) return;

      activeToastRef.current = null;

      setActiveToast({
        ...toast,
        element: cloneElement(toast.element, { ref: activeToastRef }),
      });

      // remove toast after duration
      timer.start(() => {
        void hideToast();
      }, toast.duration);
    },
    [timer, hideToast],
  );

  const addToast = useCallback(
    (element: ToastNode['element'], duration: number) => {
      const toast = { element, duration };
      if (hasActiveToast.current) {
        toastQueue.current.push(toast);
      } else {
        setToast(toast);
      }
    },
    [setToast],
  );

  useEffect(() => {
    // dequeue toast to active
    if (activeToast === undefined && toastQueue.current.length > 0) {
      setToast(toastQueue.current.shift());
    }
  }, [activeToast, setToast]);

  const clearToastQueue = useCallback(async () => {
    removeToast();
    toastQueue.current.length = 0;
  }, [removeToast]);

  return {
    activeToast,
    addToast,
    removeToast,
    hideToast,
    clearToastQueue,
    pauseTimer: timer.pause,
    resumeTimer: timer.resume,
  };
};
