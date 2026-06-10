import React, { useCallback, useEffect, useState } from 'react';
import { type LayoutChangeEvent, View } from 'react-native';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Button } from '@coinbase/cds-mobile/buttons';
import { Canvas, RoundedRect, SweepGradient, vec } from '@shopify/react-native-skia';

const GRADIENT_BORDER_WIDTH = 3;
const CANVAS_PAD = 3;

const GRADIENT_COLORS = ['#2563EB', '#3B82F6', '#A5B4FC', 'rgba(165,180,252,0.05)', '#2563EB'];
const GRADIENT_POSITIONS = [0, 0.2, 0.5, 0.75, 1];

export function GradientBorderButton() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const angle = useSharedValue(0);

  useEffect(() => {
    angle.value = withRepeat(
      withTiming(Math.PI * 2, { duration: 2500, easing: Easing.linear }),
      -1,
      false,
    );
  }, [angle]);

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  const canvasW = size.width + CANVAS_PAD * 2;
  const canvasH = size.height + CANVAS_PAD * 2;
  const cx = canvasW / 2;
  const cy = canvasH / 2;
  // pill radius clamped to half height (mirrors borderRadius: 900 in RN)
  const pillR = canvasH / 2 - GRADIENT_BORDER_WIDTH / 2;

  const transform = useDerivedValue(() => [{ rotate: angle.value }]);

  return (
    <View onLayout={handleLayout} style={{ alignSelf: 'flex-start' }}>
      {size.width > 0 && (
        <Canvas
          style={{
            position: 'absolute',
            top: -CANVAS_PAD,
            left: -CANVAS_PAD,
            width: canvasW,
            height: canvasH,
          }}
        >
          <RoundedRect
            height={canvasH - GRADIENT_BORDER_WIDTH}
            r={pillR}
            strokeWidth={GRADIENT_BORDER_WIDTH}
            style="stroke"
            width={canvasW - GRADIENT_BORDER_WIDTH}
            x={GRADIENT_BORDER_WIDTH / 2}
            y={GRADIENT_BORDER_WIDTH / 2}
          >
            <SweepGradient
              c={vec(cx, cy)}
              colors={GRADIENT_COLORS}
              origin={vec(cx, cy)}
              positions={GRADIENT_POSITIONS}
              transform={transform}
            />
          </RoundedRect>
        </Canvas>
      )}
      <Button noScaleOnPress borderWidth={0} startIcon="sparkle" variant="secondary">
        Ask advisor
      </Button>
    </View>
  );
}
