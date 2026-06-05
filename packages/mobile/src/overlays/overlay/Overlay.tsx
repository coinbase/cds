import React, { memo } from 'react';
import type { Animated } from 'react-native';
import {
  OverlayContentContext,
  type OverlayContentContextValue,
} from '@coinbase/cds-common/overlays/OverlayContentContext';

import { useComponentConfig } from '../../hooks/useComponentConfig';
import { useTheme } from '../../hooks/useTheme';
import type { BoxBaseProps } from '../../layout';
import type { VStackProps } from '../../layout/VStack';
import { VStack } from '../../layout/VStack';

const overlayContentContextValue: OverlayContentContextValue = {
  isOverlay: true,
};

export type OverlayBaseProps = Omit<BoxBaseProps, 'opacity'> & {
  /** Opacity of overlay. Pass in the animated value from useOverlayAnimation to use CDS approved animation curves and timings. */
  opacity: Animated.Value;
};

export type OverlayProps = OverlayBaseProps & Omit<VStackProps, 'opacity'>;

export const Overlay = memo((_props: OverlayProps) => {
  const mergedProps = useComponentConfig('Overlay', _props);
  const { opacity, style, ...props } = mergedProps;
  const theme = useTheme();
  return (
    <OverlayContentContext.Provider value={overlayContentContextValue}>
      <VStack
        animated
        renderToHardwareTextureAndroid
        background="bgOverlay"
        opacity={opacity}
        pin="all"
        style={[
          theme.activeColorScheme === 'dark'
            ? { backgroundColor: `rgba(${theme?.darkSpectrum?.gray0}, 0.5)` }
            : undefined,
          style,
        ]}
        {...props}
      />
    </OverlayContentContext.Provider>
  );
});

Overlay.displayName = 'Overlay';
