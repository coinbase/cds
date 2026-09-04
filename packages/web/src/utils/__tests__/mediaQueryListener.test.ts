import { addMediaQueryListener, removeMediaQueryListener } from '../mediaQueryListener';

const mockCb = jest.fn();

const getMediaQueryList = ({
  addEventListener,
  removeEventListener,
  addListener,
  removeListener,
}: {
  addEventListener?: jest.MockedFn<() => void>;
  removeEventListener?: jest.MockedFn<() => void>;
  addListener?: jest.MockedFn<() => void>;
  removeListener?: jest.MockedFn<() => void>;
}) => {
  return {
    addEventListener,
    removeEventListener,
    addListener,
    removeListener,
  };
};

describe('mediaQueryListener', () => {
  describe('addMediaQueryListener', () => {
    it('calls addEventListener with the mock function when addEventListener exists', () => {
      const mockAddEventListener = jest.fn();
      const mockAddListener = jest.fn();
      addMediaQueryListener(
        // @ts-expect-error not actually a MediaQueryList
        getMediaQueryList({ addEventListener: mockAddEventListener, addListener: mockAddListener }),
        mockCb,
      );
      expect(mockAddEventListener).toHaveBeenCalledWith('change', mockCb);
      expect(mockAddListener).not.toHaveBeenCalled();
    });

    it('calls addListener with the mock function when addEventListener does not exist', () => {
      const mockAddListener = jest.fn();
      addMediaQueryListener(
        // @ts-expect-error not actually a MediaQueryList
        getMediaQueryList({ addEventListener: undefined, addListener: mockAddListener }),
        mockCb,
      );
      expect(mockAddListener).toHaveBeenCalledWith(mockCb);
    });
  });

  describe('removeMediaQueryListener', () => {
    it('calls removeEventListener with the mock function when removeEventListener exists', () => {
      const mockRemoveEventListener = jest.fn();
      const mockRemoveListener = jest.fn();
      removeMediaQueryListener(
        // @ts-expect-error not actually a MediaQueryList
        getMediaQueryList({
          removeEventListener: mockRemoveEventListener,
          removeListener: mockRemoveListener,
        }),
        mockCb,
      );
      expect(mockRemoveEventListener).toHaveBeenCalledWith('change', mockCb);
      expect(mockRemoveListener).not.toHaveBeenCalled();
    });

    it('calls removeListener with the mock function when removeEventListener does not exist', () => {
      const mockRemoveListener = jest.fn();
      removeMediaQueryListener(
        // @ts-expect-error not actually a MediaQueryList
        getMediaQueryList({ removeEventListener: undefined, removeListener: mockRemoveListener }),
        mockCb,
      );
      expect(mockRemoveListener).toHaveBeenCalledWith(mockCb);
    });
  });
});
