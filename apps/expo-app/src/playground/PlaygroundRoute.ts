import type React from 'react';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export type PlaygroundRoute = {
  key: string;
  getComponent: () => React.ComponentType<unknown>;
  /** Per-screen react-navigation options (e.g. `{ presentation: 'modal' }`). */
  options?: NativeStackNavigationOptions;
};
