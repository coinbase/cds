import React, { createContext, useContext, useRef } from 'react';
import { createStore, type StoreApi } from 'zustand';

import type { ComponentConfig } from '../core/componentConfig';

type ComponentConfigStoreState = {
  components?: ComponentConfig;
  mergeClassNameAndStyle?: boolean;
};

export type ComponentConfigContextValue = StoreApi<ComponentConfigStoreState>;

export const ComponentConfigContext = createContext<ComponentConfigContextValue | undefined>(
  undefined,
);

/** Builds the full store state from a ComponentConfig. */
const createComponentConfigStoreState = (
  config: ComponentConfig | undefined,
  mergeClassNameAndStyle: boolean | undefined,
): ComponentConfigStoreState => {
  return {
    components: config,
    mergeClassNameAndStyle,
  };
};

export type ComponentConfigProviderProps = {
  /** Component config: static objects and/or functional resolvers per component. */
  value?: ComponentConfig;
  /**
   * Controls how component props from config are merged with local component props.
   *
   * When falsy, `className` and `style` properties are simply overridden by local props
   * When truthy, `className` is combined with cx() and `style` properties are shallow merged.
   */
  mergeClassNameAndStyle?: boolean;
  children?: React.ReactNode;
};

/**
 * Provides component-level default props via a zustand store.
 * Each component subscribes to only its own config slice, preventing cross-component re-renders.
 * Supports nesting with isolated scopes: a child provider only applies its own config map.
 */
export const ComponentConfigProvider = ({
  value,
  mergeClassNameAndStyle,
  children,
}: ComponentConfigProviderProps) => {
  const storeRef = useRef<ComponentConfigContextValue | null>(null);

  if (!storeRef.current) {
    storeRef.current = createStore<ComponentConfigStoreState>(() =>
      createComponentConfigStoreState(value, mergeClassNameAndStyle),
    );
  }

  const newState = createComponentConfigStoreState(value, mergeClassNameAndStyle);
  storeRef.current.setState(newState, true);

  return (
    <ComponentConfigContext.Provider value={storeRef.current}>
      {children}
    </ComponentConfigContext.Provider>
  );
};

/** Singleton empty store used when no ComponentConfigProvider exists in the tree. */
const emptyComponentConfigStore = createStore<ComponentConfigStoreState>(() => ({}));

/** Returns the nearest ComponentConfigProvider's zustand store, or an empty fallback. */
export const useComponentConfigStore = (): ComponentConfigContextValue => {
  const context = useContext(ComponentConfigContext);
  return context ?? emptyComponentConfigStore;
};
