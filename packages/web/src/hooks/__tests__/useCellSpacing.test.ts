import { renderHook } from '@testing-library/react-hooks';

import { innerDefaults, outerDefaults, useCellSpacing } from '../useCellSpacing';

describe('useCellSpacing', () => {
  it('returns correct default spacing', () => {
    const { result } = renderHook(() => {
      return useCellSpacing();
    });

    expect(result.current).toEqual({
      inner: innerDefaults,
      outer: outerDefaults,
    });
  });

  it('will correctly override defaults', () => {
    const { result } = renderHook(() => {
      return useCellSpacing({
        innerSpacing: { paddingY: 3 },
        outerSpacing: { paddingX: 0 },
      });
    });

    expect(result.current).toEqual({
      inner: {
        ...innerDefaults,
        paddingY: 3,
      },
      outer: {
        ...outerDefaults,
        paddingX: 0,
      },
    });
  });
});
