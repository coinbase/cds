import { renderHook } from '@testing-library/react-hooks';

import { TourContext, type TourContextValue, useTourContext } from '../TourContext';

const MOCK_API: TourContextValue = {
  activeTourStepTarget: null,
  setActiveTourStepTarget: jest.fn(),
  steps: [],
  activeTourStep: null,
  setActiveTourStep: jest.fn(),
  startTour: jest.fn(),
  stopTour: jest.fn(),
  goNextTourStep: jest.fn(),
  goPreviousTourStep: jest.fn(),
};

const HOOK_ERROR = Error('useTourContext must be called inside a Tour');

describe('useTourContext', () => {
  it('returns correct API', () => {
    function Wrapper({ children }: { children: React.ReactNode }) {
      return <TourContext.Provider value={MOCK_API}>{children}</TourContext.Provider>;
    }

    const { result } = renderHook(() => useTourContext(), {
      wrapper: Wrapper,
    });
    expect(result.current).toBe(MOCK_API);
  });

  it('throw an error if not wrapped inside the provider', () => {
    const { result } = renderHook(() => useTourContext());
    expect(result.error).toEqual(HOOK_ERROR);
  });
});
