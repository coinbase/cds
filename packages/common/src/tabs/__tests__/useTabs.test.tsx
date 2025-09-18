import { act } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { NoopFn } from '../../utils/mockUtils';
import { type TabsOptions, useTabs } from '../useTabs';

const mockTabs = [
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell' },
  { id: 'convert', label: 'Convert' },
];

const exampleProps: TabsOptions = {
  tabs: mockTabs,
  activeTab: mockTabs[0],
  onChange: NoopFn,
};

describe('useTabs', () => {
  it('returns correct API', () => {
    const { result } = renderHook(() => useTabs(exampleProps));

    expect(result.current.updateActiveTab).toBeTruthy();
    expect(result.current.goPreviousTab).toBeTruthy();
    expect(result.current.goNextTab).toBeTruthy();
    expect(result.current.tabs).toBe(mockTabs);
    expect(result.current.activeTab).toBe(mockTabs[0]);
  });

  it('sets correct activeTab when triggering updateActiveTab with valid tabId', () => {
    const onChange = jest.fn();
    const props = { ...exampleProps, onChange };
    const { result } = renderHook(() => useTabs(props));
    const { updateActiveTab } = result.current;

    act(() => {
      updateActiveTab(mockTabs[2].id);
    });

    expect(onChange).toHaveBeenCalledWith(mockTabs[2]);
  });

  it('does not set activeTab when triggering updateActiveTab with invalid tabId', () => {
    const onChange = jest.fn();
    const props = { ...exampleProps, onChange };
    const { result } = renderHook(() => useTabs(props));
    const { updateActiveTab } = result.current;

    act(() => {
      updateActiveTab('test');
    });

    expect(result.current.activeTab).toEqual(mockTabs[0]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('set activeTab to null when triggering updateActiveTab with null', () => {
    const onChange = jest.fn();
    const props = { ...exampleProps, onChange };
    const { result } = renderHook(() => useTabs(props));
    const { updateActiveTab } = result.current;

    act(() => {
      updateActiveTab(null);
    });

    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('sets correct activeTab when triggering goNextTab', () => {
    const onChange = jest.fn();
    const props = { ...exampleProps, onChange };
    const { result } = renderHook(() => useTabs(props));
    const { goNextTab } = result.current;

    act(() => {
      goNextTab();
    });

    expect(onChange).toHaveBeenCalledWith(mockTabs[1]);
  });

  it('sets correct activeTab when next tab is disabled', () => {
    const tabs = [
      { id: 'buy', label: 'Buy' },
      { id: 'sell', label: 'Sell', disabled: true },
      { id: 'convert', label: 'Convert' },
    ];
    const onChange = jest.fn();
    const props = { tabs, onChange, activeTab: tabs[0] };
    const { result } = renderHook(() => useTabs(props));
    const { goNextTab } = result.current;

    act(() => {
      goNextTab();
    });

    expect(onChange).toHaveBeenCalledWith(tabs[2]);
  });

  it('does not set activeTab when next tab does not exist', () => {
    const onChange = jest.fn();
    const props = { ...exampleProps, onChange, activeTab: mockTabs[2] };
    const { result } = renderHook(() => useTabs(props));
    const { goNextTab } = result.current;

    act(() => {
      goNextTab();
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('sets correct activeTab when trigering goPreviousTab', () => {
    const onChange = jest.fn();
    const props = { ...exampleProps, onChange, activeTab: mockTabs[2] };
    const { result } = renderHook(() => useTabs(props));
    const { goPreviousTab } = result.current;

    act(() => {
      goPreviousTab();
    });

    expect(onChange).toHaveBeenCalledWith(mockTabs[1]);
  });

  it('sets correct activeTab when previous tab is disabled', () => {
    const tabs = [
      { id: 'buy', label: 'Buy' },
      { id: 'sell', label: 'Sell', disabled: true },
      { id: 'convert', label: 'Convert' },
    ];
    const onChange = jest.fn();
    const props = { tabs, activeTab: tabs[2], onChange };
    const { result } = renderHook(() => useTabs(props));
    const { goPreviousTab } = result.current;

    act(() => {
      goPreviousTab();
    });

    expect(onChange).toHaveBeenCalledWith(mockTabs[0]);
  });

  it('does not set activeTab when previous tab does not exist', () => {
    const onChange = jest.fn();
    const props = { ...exampleProps, onChange };
    const { result } = renderHook(() => useTabs(props));
    const { goPreviousTab } = result.current;

    act(() => {
      goPreviousTab();
    });

    expect(onChange).not.toHaveBeenCalled();
  });
});
