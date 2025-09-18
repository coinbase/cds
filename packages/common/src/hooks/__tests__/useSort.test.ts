import { renderHook } from '@testing-library/react-hooks';

import { useSort } from '../useSort';

const EXPECTED = {
  ascending: ['apes', 'punks', 'trolls', 'zombies'],
  descending: ['zombies', 'trolls', 'punks', 'apes'],
  nested: [
    { name: 'zombies', floor: 4 },
    { name: 'trolls', floor: 8 },
    { name: 'punks', floor: 74 },
    { name: 'apes', floor: 89 },
  ],
  nestedDeep: [
    {
      name: 'zombies',
      price: {
        floor: 4,
      },
    },
    {
      name: 'trolls',
      price: {
        floor: 8,
      },
    },
    {
      name: 'punks',
      price: {
        floor: 74,
      },
    },
    {
      name: 'apes',
      price: {
        floor: 89,
      },
    },
  ],
};
const MOCKS = {
  default: ['punks', 'zombies', 'trolls', 'apes'],
  nested: [
    { name: 'zombies', floor: 4 },
    { name: 'punks', floor: 74 },
    { name: 'trolls', floor: 8 },
    { name: 'apes', floor: 89 },
  ],
  nestedDeep: [
    {
      name: 'zombies',
      price: {
        floor: 4,
      },
    },
    {
      name: 'punks',
      price: {
        floor: 74,
      },
    },
    {
      name: 'trolls',
      price: {
        floor: 8,
      },
    },
    {
      name: 'apes',
      price: {
        floor: 89,
      },
    },
  ],
};

describe('useSort', () => {
  it('Returns a list in ascending order by default', () => {
    const { result } = renderHook(() => useSort({ data: MOCKS.default }));
    expect(result.current).toEqual(EXPECTED.ascending);
  });

  it('Returns a list in ascending order', () => {
    const { result } = renderHook(() =>
      useSort({ data: MOCKS.default, sortDirection: 'ascending' }),
    );
    expect(result.current).toEqual(EXPECTED.ascending);
  });

  it('Returns a list in descending order', () => {
    const { result } = renderHook(() =>
      useSort({ data: MOCKS.default, sortDirection: 'descending' }),
    );
    expect(result.current).toEqual(EXPECTED.descending);
  });

  it('Handles a nested object', () => {
    const { result } = renderHook(() => useSort({ data: MOCKS.nested, sortBy: 'floor' }));
    expect(result.current).toEqual(EXPECTED.nested);
  });

  it('Handles a deeply nested object', () => {
    const { result } = renderHook(() => useSort({ data: MOCKS.nestedDeep, sortBy: 'price.floor' }));
    expect(result.current).toEqual(EXPECTED.nestedDeep);
  });

  it('Does not mutate original data', () => {
    const { result } = renderHook(() => useSort({ data: EXPECTED.ascending }));
    expect(result.current).not.toBe(EXPECTED.ascending);
  });
});
