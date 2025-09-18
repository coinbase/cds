import React, { act } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import {
  AccordionProvider,
  type AccordionProviderProps,
  useAccordionContext,
} from '../AccordionProvider';

describe('AccordionProvider', () => {
  describe('uncontrolled', () => {
    const onChange = jest.fn();
    it('uses defaultActiveKey', () => {
      const { result } = renderHook(() => useAccordionContext(), {
        wrapper: ({ children }: { children: AccordionProviderProps['children'] }) => (
          <AccordionProvider defaultActiveKey="1" onChange={onChange}>
            {children}
          </AccordionProvider>
        ),
      });
      expect(result.current.activeKey).toBe('1');
    });
    it('updates internal state when setActiveKey is called', () => {
      const onChange = jest.fn();
      const { result } = renderHook(() => useAccordionContext(), {
        wrapper: ({ children }: { children: AccordionProviderProps['children'] }) => (
          <AccordionProvider defaultActiveKey="1" onChange={onChange}>
            {children}
          </AccordionProvider>
        ),
      });
      expect(result.current.activeKey).toBe('1');
      act(() => result.current.setActiveKey('2'));
      expect(result.current.activeKey).toBe('2');
      expect(onChange).toHaveBeenCalledWith('2');
      act(() => result.current.setActiveKey(null));
      expect(result.current.activeKey).toBeNull();
      expect(onChange).toHaveBeenCalledWith(null);
      act(() => result.current.setActiveKey('2'));
      expect(result.current.activeKey).toBe('2');
      expect(onChange).toHaveBeenCalledWith('2');
    });
  });

  describe('controlled', () => {
    const setActiveKey = jest.fn();

    it('uses provided activeKey', () => {
      const { result } = renderHook(() => useAccordionContext(), {
        wrapper: ({ children }: { children: AccordionProviderProps['children'] }) => (
          <AccordionProvider activeKey="1" setActiveKey={setActiveKey}>
            {children}
          </AccordionProvider>
        ),
      });
      expect(result.current.activeKey).toBe('1');
    });

    it('calls setActiveKey when state changes', () => {
      const { result } = renderHook(() => useAccordionContext(), {
        wrapper: ({ children }: { children: AccordionProviderProps['children'] }) => (
          <AccordionProvider activeKey="1" setActiveKey={setActiveKey}>
            {children}
          </AccordionProvider>
        ),
      });

      act(() => result.current.setActiveKey('1'));
      expect(setActiveKey).not.toHaveBeenCalled();

      act(() => result.current.setActiveKey('2'));
      expect(setActiveKey).toHaveBeenCalledWith('2');
    });
  });
});
