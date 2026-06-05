import { renderHook } from '@testing-library/react';

import { TabsContext, type TabsContextValue, useTabsContext } from '../TabsContext';

const MOCK_API: TabsContextValue = {
  tabs: [],
  activeTab: null,
  updateActiveTab: jest.fn(),
  goNextTab: jest.fn(),
  goPreviousTab: jest.fn(),
};

const HOOK_ERROR = Error('useTabsContext must be used within a TabsContext.Provider');

describe('useTabsContext', () => {
  it('returns correct API', () => {
    function Wrapper({ children }: { children: React.ReactNode }) {
      return <TabsContext.Provider value={MOCK_API}>{children}</TabsContext.Provider>;
    }

    const { result } = renderHook(() => useTabsContext(), {
      wrapper: Wrapper,
    });
    expect(result.current).toBe(MOCK_API);
  });

  it('throw an error if not wrapped inside the provider', () => {
    expect(() => renderHook(() => useTabsContext())).toThrow(HOOK_ERROR);
  });
});
