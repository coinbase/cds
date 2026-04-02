import React, { forwardRef, memo } from 'react';
import {
  OverlayContentContext,
  type OverlayContentContextValue,
} from '@coinbase/cds-common/overlays/OverlayContentContext';

import { useComponentConfig } from '../../hooks/useComponentConfig';

import type { OverlayBaseProps, OverlayProps } from './OverlayContent';
import { OverlayContent } from './OverlayContent';

const overlayContentContextValue: OverlayContentContextValue = {
  isOverlay: true,
};

export type { OverlayBaseProps, OverlayProps };

export const Overlay = memo(
  forwardRef<HTMLDivElement, OverlayProps>((_props, forwardedRef) => {
    const mergedProps = useComponentConfig('Overlay', _props);
    return (
      <OverlayContentContext.Provider value={overlayContentContextValue}>
        <OverlayContent ref={forwardedRef} {...mergedProps} />
      </OverlayContentContext.Provider>
    );
  }),
);

Overlay.displayName = 'Overlay';
