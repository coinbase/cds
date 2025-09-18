export type PlaygroundRoute = {
  key: string;
  getComponent: () => React.ComponentType<React.PropsWithChildren<unknown>>;
};
