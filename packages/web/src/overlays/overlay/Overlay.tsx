import React, { forwardRef, memo } from 'react';
import {
  OverlayContentContext,
  type OverlayContentContextValue,
} from '@cbhq/cds-common/overlays/OverlayContentContext';

import type { OverlayProps } from './OverlayContent';
import { OverlayContent } from './OverlayContent';

const overlayContentContextValue: OverlayContentContextValue = {
  isOverlay: true,
};

export const Overlay = memo(
  forwardRef<HTMLDivElement, OverlayProps>((props, forwardedRef) => {
    return (
      <OverlayContentContext.Provider value={overlayContentContextValue}>
        <OverlayContent ref={forwardedRef} {...props} />
      </OverlayContentContext.Provider>
    );
  }),
);

Overlay.displayName = 'Overlay';
