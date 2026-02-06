import type React from 'react';

export type PlaygroundRoute = {
  key: string;
  getComponent: () => React.ComponentType<unknown>;
};
