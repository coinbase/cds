import React, { createContext, useState } from 'react';

import { breakpoints } from '../styles/media';
import { addMediaQueryListener, removeMediaQueryListener } from '../utils/mediaQueryListener';

export type MediaSettings = {
  width?: number;
  height?: number;
  fontSize?: number;
  colorScheme?: 'light' | 'dark';
  contrast?: 'more' | 'less';
};

export const cdsDefaultValues = {
  width: breakpoints.desktop,
  colorScheme: 'light' as const,
};

export type MediaQueryContextValue = {
  subscribe: (query: string, callback: () => void) => () => void;
  getSnapshot: (query: string) => boolean;
  getServerSnapshot: (query: string) => boolean;
};

export const MediaQueryContext = createContext<MediaQueryContextValue | null>(null);

export type MediaQueryProviderProps = {
  children?: React.ReactNode;
  defaultValues?: MediaSettings;
};

/**
 * A context provider that manages media query subscriptions with server-side rendering support.
 *
 * This component creates a centralized store for media query subscriptions, preventing
 * unnecessary re-renders and ensuring consistent behavior between server and client rendering.
 *
 * @example
 * ```tsx
 * <MediaQueryProvider defaultValues={{ width: 1200, colorScheme: 'light' }}>
 *   <App />
 * </MediaQueryProvider>
 * ```
 */
export const MediaQueryProvider = ({
  children,
  defaultValues = cdsDefaultValues,
}: MediaQueryProviderProps) => {
  useState(() => store.init({ defaultValues }));
  return <MediaQueryContext.Provider value={store}>{children}</MediaQueryContext.Provider>;
};

const getMediaPixelValue = (value: string, fontSize = 16): number => {
  const numericValue = parseInt(value.slice(0, -2), 10);
  const isPx = value.endsWith('px');
  const isEm = value.endsWith('em');
  if (isNaN(numericValue) || (!isPx && !isEm))
    throw Error(`getPixelValue failed to parse value: "${value}`);
  if (isEm) return numericValue * fontSize;
  return numericValue;
};

const mediaQueryDefaultSolutions: Record<
  string,
  (value: string, defaultValues: MediaSettings) => boolean
> = {
  width: (width, defaultValues) => {
    if (typeof defaultValues.width === 'undefined') return false;
    return Boolean(defaultValues.width === getMediaPixelValue(width, defaultValues.fontSize));
  },
  'min-width': (minWidth, defaultValues) => {
    if (typeof defaultValues.width === 'undefined') return false;
    return Boolean(defaultValues.width >= getMediaPixelValue(minWidth, defaultValues.fontSize));
  },
  'max-width': (maxWidth, defaultValues) => {
    if (typeof defaultValues.width === 'undefined') return false;
    return Boolean(defaultValues.width <= getMediaPixelValue(maxWidth, defaultValues.fontSize));
  },
  height: (height, defaultValues) => {
    if (typeof defaultValues.height === 'undefined') return false;
    return Boolean(defaultValues.height === getMediaPixelValue(height, defaultValues.fontSize));
  },
  'min-height': (minHeight, defaultValues) => {
    if (typeof defaultValues.height === 'undefined') return false;
    return Boolean(defaultValues.height >= getMediaPixelValue(minHeight, defaultValues.fontSize));
  },
  'max-height': (maxHeight, defaultValues) => {
    if (typeof defaultValues.height === 'undefined') return false;
    return Boolean(defaultValues.height <= getMediaPixelValue(maxHeight, defaultValues.fontSize));
  },
  'prefers-color-scheme': (colorScheme, defaultValues) => {
    // If defaultValues.colorScheme is undefined, mimic browser default behavior for prefers-color-scheme, e.g.
    // window.matchMedia("(prefers-color-scheme: light)") is true when the user does not specify a preference
    if (typeof defaultValues.colorScheme === 'undefined') return colorScheme === 'light';
    return Boolean(defaultValues.colorScheme && defaultValues.colorScheme === colorScheme);
  },
  'prefers-contrast': (contrast, defaultValues) => {
    // If defaultValues.contrast is undefined, mimic browser default behavior for prefers-contrast, e.g.
    // window.matchMedia("(prefers-contrast: no-preference)") is true when the user does not specify a preference
    if (typeof defaultValues.contrast === 'undefined') return contrast === 'no-preference';
    return defaultValues.contrast === contrast;
  },
};

const solveMediaQueryDefaults = (query: string, defaultValues: MediaSettings) => {
  const queryParts = query.split(' and ');
  for (const queryPart of queryParts) {
    // Trim the part and handle optional inner parentheses correctly
    const trimmedPart = queryPart.trim();
    const conditionValueString =
      trimmedPart[0] === '(' && trimmedPart[trimmedPart.length - 1] === ')'
        ? trimmedPart.slice(1, -1).trim()
        : trimmedPart; // Assume valid if no outer parens on the part

    if (!conditionValueString) return false; // e.g., `(()) and (cond:val)` -> `()` -> empty

    // Split the actual condition/value string
    const splittedConditionValueString = conditionValueString.split(':');
    const condition = splittedConditionValueString[0]?.trim();
    const value = splittedConditionValueString[1]?.trim();
    if (!condition || !value) return false; // e.g., `(cond:)` or `(cond)`

    // Call handler with trimmed values
    const result = mediaQueryDefaultSolutions[condition]?.(value, defaultValues);
    if (!result) return false; // If any part is false, the whole query is false
  }

  return true; // If all parts evaluated to true
};

export const createMediaQueryStore = () => {
  const mediaQueryLists: Record<string, MediaQueryList> = {};
  const subscribers: Record<string, (() => void)[]> = {};
  let defaultValues: MediaSettings = {};
  let initialized = false;

  /** Sets the default values to be used for server renders. */
  const init = (options: { defaultValues?: MediaSettings }) => {
    if (initialized) return;
    initialized = true;
    if (options.defaultValues) defaultValues = options.defaultValues;
  };

  /** For client renders, returns the result of solving the media query with window.matchMedia. */
  const getSnapshot = (query: string): boolean => {
    return mediaQueryLists[query]?.matches ?? solveMediaQueryDefaults(query, defaultValues);
  };

  /** For server renders, returns the result of solving the media query with the defaultValues. */
  const getServerSnapshot = (query: string): boolean => {
    return solveMediaQueryDefaults(query, defaultValues);
  };

  /**
   * Subscribes to a media query with a callback function that will be called when the media query
   * match results change. Returns a function that can be called to unsubscribe.
   */
  const subscribe = (query: string, callback: () => void): (() => void) => {
    subscribers[query] ??= [];
    subscribers[query].push(callback);

    const handleChange = (query: string) => {
      subscribers[query]?.forEach((callback) => callback());
    };

    const listener = () => handleChange(query);

    if (!mediaQueryLists[query]) {
      mediaQueryLists[query] = window.matchMedia(query);
      addMediaQueryListener(mediaQueryLists[query], listener);
    }

    const unsubscribe = () => {
      subscribers[query] = subscribers[query].filter((cb) => cb !== callback);
      if (subscribers[query]?.length === 0) {
        delete subscribers[query];
        removeMediaQueryListener(mediaQueryLists[query], listener);
        delete mediaQueryLists[query];
      }
    };

    return unsubscribe;
  };

  return {
    init,
    subscribe,
    getSnapshot,
    getServerSnapshot,
  };
};

const store = createMediaQueryStore();
