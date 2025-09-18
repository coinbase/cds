import React, { memo } from 'react';
import type { Animated } from 'react-native';
import {
  OverlayContentContext,
  type OverlayContentContextValue,
} from '@cbhq/cds-common/overlays/OverlayContentContext';

import { useTheme } from '../../hooks/useTheme';
import type { VStackProps } from '../../layout/VStack';
import { VStack } from '../../layout/VStack';

const overlayContentContextValue: OverlayContentContextValue = {
  isOverlay: true,
};

export type OverlayProps = {
  /** Opacity of overlay. Pass in the animated value from useOverlayAnimation to use CDS approved animation curves and timings. */
  opacity: Animated.Value;
} & Omit<VStackProps, 'opacity'>;

export const Overlay = memo(function Overlay({ opacity, ...props }: OverlayProps) {
  const theme = useTheme();
  return (
    <OverlayContentContext.Provider value={overlayContentContextValue}>
      <VStack
        animated
        renderToHardwareTextureAndroid
        background="bgOverlay"
        dangerouslySetBackground={
          theme.activeColorScheme === 'dark'
            ? `rgba(${theme?.darkSpectrum?.gray0}, 0.5)`
            : undefined
        }
        opacity={opacity}
        pin="all"
        {...props}
      />
    </OverlayContentContext.Provider>
  );
});

Overlay.displayName = 'Overlay';
