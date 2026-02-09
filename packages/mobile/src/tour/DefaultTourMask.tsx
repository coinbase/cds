import React, { memo, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import { Defs, Mask, Rect as NativeRect, Svg } from 'react-native-svg';
import { defaultRect, type Rect } from '@coinbase/cds-common/types/Rect';

import { useDimensions } from '../hooks/useDimensions';
import { useTheme } from '../hooks/useTheme';
import { Box } from '../layout';

import { type TourMaskComponentProps } from './Tour';

export const DefaultTourMask = memo(
  ({ activeTourStepTarget, padding, borderRadius = 12 }: TourMaskComponentProps) => {
    const [rect, setRect] = useState<Rect>(defaultRect);
    const theme = useTheme();
    const { statusBarHeight } = useDimensions();
    const overlayFillRgba = theme.color.bgOverlay;
    const defaultPadding = theme.space[2];

    // Convert string padding to number and fallback to default padding value
    const paddingValue = Number.isNaN(Number(padding)) ? defaultPadding : Number(padding);
    const maskStyle = useMemo(
      () => ({
        width: rect.width + paddingValue,
        height: rect.height + paddingValue,
        x: rect.x - 0.5 * paddingValue,
        y: rect.y - 0.5 * paddingValue,
      }),
      [rect, paddingValue],
    );

    useEffect(() => {
      activeTourStepTarget?.measureInWindow((x, y, width, height) => {
        // On Android, measureInWindow returns coordinates relative to the app's visible area.
        // The Modal's coordinate system starts from the screen top (y=0 at very top of display).
        // In edge-to-edge mode (statusBarHeight > 0), the app extends behind the status bar,
        // and measureInWindow returns y relative to below the status bar. We need to ADD
        // statusBarHeight to convert to screen coordinates for the Modal.
        // In non-edge-to-edge mode (statusBarHeight === 0), measureInWindow returns y from
        // screen top, but the Modal still starts from screen top, so no adjustment is needed.
        const adjustedY = Platform.OS === 'ios' ? y : y + statusBarHeight;

        setRect({ x, y: adjustedY, width, height });
      });
    }, [activeTourStepTarget, statusBarHeight]);

    return (
      <Box height="100%" width="100%">
        <Svg renderToHardwareTextureAndroid shouldRasterizeIOS height="100%" width="100%">
          <Defs>
            <Mask id="tourOverlayMask">
              <NativeRect fill="#fff" height="100%" width="100%" />
              <NativeRect rx={borderRadius} ry={borderRadius} {...maskStyle} />
            </Mask>
          </Defs>
          <NativeRect
            fill={overlayFillRgba}
            height="100%"
            mask="url(#tourOverlayMask)"
            width="100%"
          />
        </Svg>
      </Box>
    );
  },
);
