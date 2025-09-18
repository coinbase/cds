import { renderHook } from '@testing-library/react-hooks';

import { usePrefixedId } from '../usePrefixedId';

// mock useId from react to return a static value
jest.mock('react', () => {
  let id = -1;

  return {
    ...jest.requireActual<Record<string, unknown>>('react'),
    useId: () => {
      // Increment internal id
      id += 1;

      // Format it like the react useId hook cause ¯\_(ツ)_/¯
      return `:r${id}:`;
    },
  };
});

describe('usePrefixedId', () => {
  it('should return a prefixed id', () => {
    const prefix = 'foo';
    const { result } = renderHook(() => usePrefixedId(prefix));
    expect(result.current).toBe('foo-:r0:');
  });

  it('should return an id without a prefix when undefined', () => {
    const prefix = undefined;
    const { result } = renderHook(() => usePrefixedId(prefix));
    expect(result.current).toBe(':r1:');
  });

  it('should return an id without a prefix when null', () => {
    const prefix = null;
    const { result } = renderHook(() => usePrefixedId(prefix));
    expect(result.current).toBe(':r2:');
  });

  it('should return an array of prefixed ids', () => {
    const prefixes = ['foo', 'bar'];
    const { result } = renderHook(() => usePrefixedId(prefixes));

    expect(result.current).toEqual(['foo-:r3:', 'bar-:r3:']);
  });
});
