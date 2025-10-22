import React, { type ReactNode } from 'react';
import { useContextBridge } from '@coinbase/cds-mobile/system/context-bridge';
import { Canvas } from '@shopify/react-native-skia';

export type ChartCanvasProps = {
  children: ReactNode;
  width: number;
  height: number;
};

/**
 * A Canvas component that bridges React contexts into the Skia renderer.
 */
export const ChartCanvas = ({ children, width, height }: ChartCanvasProps) => {
  const ContextBridge = useContextBridge();

  return (
    <Canvas style={{ width, height }}>
      <ContextBridge>{children}</ContextBridge>
    </Canvas>
  );
};
