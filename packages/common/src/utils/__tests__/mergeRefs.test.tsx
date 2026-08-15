import React, { createRef, useRef } from 'react';
import { renderHook } from '@testing-library/react';

import { mergeReactElementRef, mergeRefs, useMergeRefs } from '../mergeRefs';

describe('mergeRefs module', () => {
  describe('mergeRefs', () => {
    it('sets object refs', () => {
      const ref1: React.MutableRefObject<string | null> = { current: null };
      const ref2: React.MutableRefObject<string | null> = { current: null };

      const merged = mergeRefs(ref1, ref2);
      merged('hello');

      expect(ref1.current).toBe('hello');
      expect(ref2.current).toBe('hello');
    });

    it('calls callback refs', () => {
      const calls: Array<string | null> = [];
      const cb: React.RefCallback<string> = (value) => {
        calls.push(value);
      };

      const merged = mergeRefs(cb);
      merged('a');
      merged(null);

      expect(calls).toEqual(['a', null]);
    });

    it('supports mixing callback refs and object refs', () => {
      const obj: React.MutableRefObject<number | null> = { current: null };
      const calls: Array<number | null> = [];
      const cb: React.RefCallback<number> = (value) => {
        calls.push(value);
      };

      const merged = mergeRefs(obj, cb);
      merged(123);

      expect(obj.current).toBe(123);
      expect(calls).toEqual([123]);
    });

    it('ignores null and undefined refs', () => {
      const obj: React.MutableRefObject<boolean | null> = { current: null };
      const merged = mergeRefs(obj, null, undefined);

      merged(true);
      expect(obj.current).toBe(true);
    });
  });

  describe('useMergeRefs', () => {
    it('delegates to mergeRefs', () => {
      const ref1: React.MutableRefObject<string | null> = { current: null };
      const ref2: React.MutableRefObject<string | null> = { current: null };

      const { result } = renderHook(() => useMergeRefs(ref1, ref2));
      result.current('hello');

      expect(ref1.current).toBe('hello');
      expect(ref2.current).toBe('hello');
    });

    it('writes the value to all object refs', () => {
      const refA = createRef<HTMLDivElement>();
      const refB = createRef<HTMLDivElement>();
      const node = document.createElement('div');

      const { result } = renderHook(() => useMergeRefs(refA, refB));
      result.current(node);

      expect(refA.current).toBe(node);
      expect(refB.current).toBe(node);
    });

    it('invokes function refs with the value', () => {
      const fnRefA = jest.fn();
      const fnRefB = jest.fn();
      const node = document.createElement('div');

      const { result } = renderHook(() => useMergeRefs(fnRefA, fnRefB));
      result.current(node);

      expect(fnRefA).toHaveBeenCalledWith(node);
      expect(fnRefB).toHaveBeenCalledWith(node);
    });

    it('safely ignores null and undefined refs', () => {
      const ref = createRef<HTMLDivElement>();
      const node = document.createElement('div');

      const { result } = renderHook(() => useMergeRefs<HTMLDivElement>(ref, null, undefined));
      expect(() => result.current(node)).not.toThrow();
      expect(ref.current).toBe(node);
    });

    it('returns a stable callback when underlying refs do not change', () => {
      const refA = createRef<HTMLDivElement>();
      const refB = createRef<HTMLDivElement>();

      const { result, rerender } = renderHook(() => useMergeRefs(refA, refB));
      const firstCallback = result.current;

      rerender();
      expect(result.current).toBe(firstCallback);

      rerender();
      expect(result.current).toBe(firstCallback);
    });

    it('returns a new callback when an underlying ref changes identity', () => {
      const stableRef = createRef<HTMLDivElement>();

      const { result, rerender } = renderHook(
        ({ otherRef }: { otherRef: React.Ref<HTMLDivElement> | null }) =>
          useMergeRefs(stableRef, otherRef),
        { initialProps: { otherRef: createRef<HTMLDivElement>() } },
      );
      const firstCallback = result.current;

      rerender({ otherRef: createRef<HTMLDivElement>() });
      expect(result.current).not.toBe(firstCallback);
    });

    it('returns a stable callback when called via a parent useRef pattern', () => {
      // Simulates the common pattern in CDS components: a parent passes a
      // forwarded `ref` and the component creates an internal ref via `useRef`.
      // The merged callback must be stable so that React 19 does not trigger a
      // detach/attach loop on every render.
      const externalRef = createRef<HTMLDivElement>();
      const { result, rerender } = renderHook(() => {
        const internalRef = useRef<HTMLDivElement>(null);
        return useMergeRefs(externalRef, internalRef);
      });
      const firstCallback = result.current;

      rerender();
      expect(result.current).toBe(firstCallback);
    });
  });

  describe('mergeReactElementRef', () => {
    it('merges the element ref (React 19 style: props.ref) with provided refs', () => {
      const elementRefCalls: Array<HTMLDivElement | null> = [];
      const elementRef: React.RefCallback<HTMLDivElement> = (value) => {
        elementRefCalls.push(value);
      };

      const element = <div ref={elementRef} />;
      const objRef: React.MutableRefObject<HTMLDivElement | null> = { current: null };

      const merged = mergeReactElementRef<HTMLDivElement>(element, objRef);
      const node = document.createElement('div');

      merged(node);
      merged(null);

      expect(objRef.current).toBe(null);
      expect(elementRefCalls).toEqual([node, null]);
    });

    it('merges the element ref (React 18 style: element.ref) with provided refs', () => {
      const elementRefCalls: Array<HTMLSpanElement | null> = [];
      const elementRef: React.RefCallback<HTMLSpanElement> = (value) => {
        elementRefCalls.push(value);
      };

      const element = React.createElement('span');
      // React elements are frozen, so to simulate React 18's `element.ref` location
      // we create a shallow clone with a `ref` field.
      const elementWithLegacyRef = { ...(element as any), ref: elementRef } as React.ReactElement;

      const objRef: React.MutableRefObject<HTMLSpanElement | null> = { current: null };
      const merged = mergeReactElementRef<HTMLSpanElement>(elementWithLegacyRef, objRef);
      const node = document.createElement('span');

      merged(node);

      expect(objRef.current).toBe(node);
      expect(elementRefCalls).toEqual([node]);
    });

    it('works when the element has no ref', () => {
      const element = <div />;
      const objRef: React.MutableRefObject<HTMLDivElement | null> = { current: null };
      const merged = mergeReactElementRef<HTMLDivElement>(element, objRef);
      const node = document.createElement('div');

      merged(node);

      expect(objRef.current).toBe(node);
    });
  });
});
