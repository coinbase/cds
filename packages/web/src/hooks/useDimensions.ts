import { useCallback, useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

export const observerErr =
  "💡 react-cool-dimensions: the browser doesn't support Resize Observer, please use polyfill: https://github.com/wellyshen/react-cool-dimensions#resizeobserver-polyfill";
export const borderBoxWarn =
  "💡 react-cool-dimensions: the browser doesn't support border-box size, fallback to content-box size. Please see: https://github.com/wellyshen/react-cool-dimensions#border-box-size-measurement";

type State = {
  currentBreakpoint: string;
  width: number;
  height: number;
  x: number;
  y: number;
  entry?: ResizeObserverEntry;
};
export type Event<T> = {
  entry: ResizeObserverEntry;
  observe: (element: T | null) => void;
  unobserve: () => void;
} & State;
type OnResize<T> = {
  (event: Event<T>): void;
};
type ShouldUpdate = {
  (state: State): boolean;
};
type Breakpoints = Record<string, number>;

export type Options<T> = {
  ref?: RefObject<T> | null;
  useBorderBoxSize?: boolean;
  breakpoints?: Breakpoints;
  updateOnBreakpointChange?: boolean;
  shouldUpdate?: ShouldUpdate;
  onResize?: OnResize<T>;

  polyfill?: any;
};
type Return<T> = {
  ref: RefObject<T>;
  entry?: ResizeObserverEntry;
} & Omit<Event<T>, 'entry'>;

const getCurrentBreakpoint = (bps: Breakpoints, width: number): string => {
  let curBp = '';
  let max = -1;

  Object.keys(bps).forEach((key: string) => {
    const val = bps[key];

    if (width >= val && val > max) {
      curBp = key;
      max = val;
    }
  });

  return curBp;
};

/**
 *
 * Ported from react-cool-dimensions
 * @link https://github.com/wellyshen/react-cool-dimensions
 * Copyright (c) 2020 Welly Shen

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
 */
export const useDimensions = <T extends HTMLElement>({
  ref: refOpt,
  useBorderBoxSize,
  breakpoints,
  updateOnBreakpointChange,
  shouldUpdate,
  onResize,

  polyfill,
}: Options<T> = {}): Return<T> => {
  const [state, setState] = useState<State>({
    currentBreakpoint: '',
    width: 0,
    x: 0,
    y: 0,
    height: 0,
  });
  const prevSizeRef = useRef<{
    width?: number;
    height?: number;
    x?: number;
    y?: number;
  }>({});
  const prevBreakpointRef = useRef<string>();
  const observerRef = useRef<ResizeObserver | null>(null);
  const onResizeRef = useRef<OnResize<T> | null>(null);
  const shouldUpdateRef = useRef<ShouldUpdate | null>(null);
  const warnedRef = useRef<boolean>(false);
  const refVar = useRef<T>(null);
  let ref = useRef<T | null>(refVar?.current);
  ref = refOpt ?? ref;

  useEffect(() => {
    if (onResize) onResizeRef.current = onResize;
  }, [onResize]);

  useEffect(() => {
    if (shouldUpdate) shouldUpdateRef.current = shouldUpdate;
  }, [shouldUpdate]);

  const observe = useCallback(
    (element: T | null) => {
      if (element) ref.current = element;
      if (observerRef.current && ref.current) {
        observerRef.current.observe(ref.current as HTMLElement);
      }
    },
    [ref],
  );

  const unobserve = useCallback(() => {
    if (observerRef.current) observerRef.current.disconnect();
  }, []);

  useEffect(() => {
    if (!ref.current) return () => null;
    const window = typeof globalThis.window !== 'undefined' && globalThis.window;
    if (
      !window ||
      ((!('ResizeObserver' in window) || !('ResizeObserverEntry' in window)) && !polyfill)
    ) {
      console.error(observerErr);
      return () => null;
    }

    const Observer = (polyfill || window.ResizeObserver) as typeof window.ResizeObserver;

    observerRef.current = new Observer(([entry]) => {
      const { contentBoxSize, borderBoxSize, contentRect } = entry;
      let boxSize = contentBoxSize;

      if (useBorderBoxSize) {
        if (borderBoxSize) {
          boxSize = borderBoxSize;
        } else if (!warnedRef.current) {
          console.warn(borderBoxWarn);
          warnedRef.current = true;
        }
      }

      // @juggle/resize-observer polyfill has different data structure
      const entrySize = (Array.isArray(boxSize) ? boxSize[0] : boxSize) as {
        inlineSize: number;
        blockSize: number;
      };

      const width = entrySize ? entrySize.inlineSize : contentRect.width;
      const height = entrySize ? entrySize.blockSize : contentRect.height;

      if (width === prevSizeRef.current.width && height === prevSizeRef.current.height) return;

      const x = ref.current?.getBoundingClientRect()?.x ?? 0;
      const y = ref.current?.getBoundingClientRect()?.y ?? 0;

      prevSizeRef.current = { width, height, x, y };

      const config = {
        currentBreakpoint: '',
        width,
        height,
        x,
        y,
        entry,
        observe,
        unobserve,
      };

      if (breakpoints) {
        config.currentBreakpoint = getCurrentBreakpoint(breakpoints, width);

        if (config.currentBreakpoint !== prevBreakpointRef.current) {
          if (onResizeRef.current) onResizeRef.current(config);
          prevBreakpointRef.current = config.currentBreakpoint;
        }
      } else if (onResizeRef.current) {
        onResizeRef.current(config);
      }

      const next = {
        currentBreakpoint: config.currentBreakpoint,
        width,
        height,
        x,
        y,
        entry,
      };

      if (shouldUpdateRef.current && !shouldUpdateRef.current(next)) return;

      if (!shouldUpdateRef.current && breakpoints && updateOnBreakpointChange) {
        setState((prev) => (prev.currentBreakpoint !== next.currentBreakpoint ? next : prev));
        return;
      }
      setState(next);
    });

    observe(null);

    return () => unobserve();
  }, [breakpoints, useBorderBoxSize, observe, unobserve, updateOnBreakpointChange, polyfill]);

  return { ref, ...state, observe, unobserve };
};
