import { noop } from '@coinbase/cds-utils';
import { renderHook } from '@testing-library/react';

import type { TableRowRef } from '../../TableRow';
import { useTableRowListener } from '../useTableRowListener';

type KeyEvt = {
  target?: object;
  key?: string;
  code?: string;
};

const createMockAddEventListener = (keyEvt: KeyEvt = {}) =>
  jest.fn((event: string, handler: (keyboardEvent: KeyboardEvent) => void) => {
    handler(keyEvt as KeyboardEvent);
  });

const createMockTableRowRef = () => ({
  current: {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  },
});

describe('useTableRowListener', () => {
  it('triggers listeners', () => {
    const mockTableRowRef = createMockTableRowRef();

    const { result, unmount } = renderHook(() =>
      useTableRowListener(mockTableRowRef as unknown as TableRowRef, noop),
    );

    expect(result.current).toBeUndefined();
    expect(mockTableRowRef.current.addEventListener).toHaveBeenCalledTimes(1);

    unmount();

    expect(mockTableRowRef.current.removeEventListener).toHaveBeenCalledTimes(1);
  });

  it('triggers handler when event target matches ref and enter keydown is detected', () => {
    const mockTableRowRef = createMockTableRowRef();
    const mockHandler = jest.fn();

    mockTableRowRef.current.addEventListener = createMockAddEventListener({
      key: 'Enter',
      target: mockTableRowRef.current,
    });

    renderHook(() => useTableRowListener(mockTableRowRef as unknown as TableRowRef, mockHandler));

    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it('triggers handler when event target matches ref and space keydown is detected', () => {
    const mockTableRowRef = createMockTableRowRef();
    const mockHandler = jest.fn();

    mockTableRowRef.current.addEventListener = createMockAddEventListener({
      code: 'Space',
      target: mockTableRowRef.current,
    });

    renderHook(() => useTableRowListener(mockTableRowRef as unknown as TableRowRef, mockHandler));

    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it('does not trigger handler when enter or space keydown is not detected', () => {
    const mockTableRowRef = createMockTableRowRef();
    const mockHandler = jest.fn();

    mockTableRowRef.current.addEventListener = createMockAddEventListener({
      target: mockTableRowRef.current,
    });

    renderHook(() => useTableRowListener(mockTableRowRef as unknown as TableRowRef, mockHandler));

    expect(mockHandler).toHaveBeenCalledTimes(0);
  });

  it('does not trigger handler when event target does not match ref', () => {
    const mockTableRowRef = createMockTableRowRef();
    const mockHandler = jest.fn();

    mockTableRowRef.current.addEventListener = createMockAddEventListener({
      key: 'Enter',
    });

    renderHook(() => useTableRowListener(mockTableRowRef as unknown as TableRowRef, mockHandler));

    expect(mockHandler).toHaveBeenCalledTimes(0);
  });
});
