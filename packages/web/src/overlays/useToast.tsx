import React, { useCallback, useContext, useMemo } from 'react';
import { ToastContext, type ToastDuration } from '@coinbase/cds-common/overlays/ToastProvider';
import {
  charsThreshold,
  defaultDuration,
  perCharsDuration,
  withActionDuration,
} from '@coinbase/cds-common/tokens/toast';

import { Toast, type ToastBaseProps } from './Toast';

export type ShowToastOptions = Omit<ToastBaseProps, 'text'> & ToastDuration;

export const useToast = () => {
  const { addToast, removeToast, hideToast, clearToastQueue } = useContext(ToastContext);

  const showToast = useCallback(
    (text: string, options?: ShowToastOptions) => {
      const onDidHide = () => {
        options?.onDidHide?.();
        // unmount toast when using gesture or close button
        removeToast();
      };

      const calculateDuration = () => {
        let duration = defaultDuration;

        if (options?.action) duration += withActionDuration;
        // when more than 50 chars, add 0.3s per 10 chars
        if (text.length > charsThreshold)
          duration += Math.round(((text.length - charsThreshold) / 10) * perCharsDuration);

        return duration;
      };

      addToast(
        <Toast text={text} {...options} onDidHide={onDidHide} />,
        options?.duration ?? calculateDuration(),
      );
    },
    [addToast, removeToast],
  );

  return useMemo(
    () => ({ show: showToast, hide: hideToast, clearQueue: clearToastQueue }),
    [showToast, clearToastQueue, hideToast],
  );
};
