import { createRef, useRef } from 'react';
import { renderHook } from '@testing-library/react';

import { useMergeRefs } from '../useMergeRefs';

describe('useMergeRefs', () => {
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
