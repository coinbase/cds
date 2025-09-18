import { act } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { useEventHandler } from '../../hooks/useEventHandler';
import type { EventHandlerConfig, EventHandlerCustomConfig } from '../EventHandlerProvider';
import { EventHandlerProvider } from '../EventHandlerProvider';

const EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  handlers: {
    Button: {
      onPress: jest.fn(),
    },
  },
};

const CUSTOM_EVENT_HANDLER_WITH_MAPPING: EventHandlerConfig = {
  actionMapping: { onPress: 'click' },
  handlers: {
    Button: {
      click: jest.fn(),
    },
  },
};

const CUSTOM_HANDLER_CONFIG: EventHandlerConfig = {
  handlers: {
    Button: {
      onPress: jest.fn(),
    },
  },
};

describe('EventDelegationProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should return noOp when called with no config and no parameters', () => {
    function Wrapper({ children }: { children: React.ReactNode }) {
      return <EventHandlerProvider>{children}</EventHandlerProvider>;
    }

    const { result } = renderHook(() => useEventHandler('Button', 'onPress'), {
      wrapper: Wrapper,
    });
    expect(result.current).toBeDefined();
  });

  it('should use noOp because customOptions are not provided', () => {
    function Wrapper({ children }: { children: React.ReactNode }) {
      return <EventHandlerProvider config={EVENT_HANDLER_CONFIG}>{children}</EventHandlerProvider>;
    }

    const { result } = renderHook(() => useEventHandler('Button', 'onPress'), {
      wrapper: Wrapper,
    });
    expect(result.current).not.toBe(EVENT_HANDLER_CONFIG.handlers?.Button.onPress);
  });

  it('Button onPress should be called because onPress is listed in custom event config actions', () => {
    const customEventConfig: EventHandlerCustomConfig = {
      actions: ['onPress'],
      componentName: 'place_order',
      data: {
        currency: 'BTC',
      },
    };

    function Wrapper({ children }: { children: React.ReactNode }) {
      return <EventHandlerProvider config={EVENT_HANDLER_CONFIG}>{children}</EventHandlerProvider>;
    }

    const { result } = renderHook(() => useEventHandler('Button', 'onPress', customEventConfig), {
      wrapper: Wrapper,
    });
    void act(() => result.current());
    expect(EVENT_HANDLER_CONFIG.handlers?.Button.onPress).toHaveBeenCalled();
  });

  it('Button onPress should be called because analyticsId is provided', () => {
    const analyticsId = 'test_id';

    function Wrapper({ children }: { children: React.ReactNode }) {
      return <EventHandlerProvider config={EVENT_HANDLER_CONFIG}>{children}</EventHandlerProvider>;
    }

    const { result } = renderHook(
      () => useEventHandler('Button', 'onPress', undefined, analyticsId),
      {
        wrapper: Wrapper,
      },
    );
    void act(() => result.current());
    expect(EVENT_HANDLER_CONFIG.handlers?.Button.onPress).toHaveBeenCalled();
  });

  it('Button onPress should not be called because onPress is not listed in custom event config actions', () => {
    const customEventConfig: EventHandlerCustomConfig = {
      actions: ['onHover'],
      componentName: 'place_order',
      data: {
        currency: 'BTC',
      },
    };

    function Wrapper({ children }: { children: React.ReactNode }) {
      return <EventHandlerProvider config={EVENT_HANDLER_CONFIG}>{children}</EventHandlerProvider>;
    }
    const { result } = renderHook(() => useEventHandler('Button', 'onPress', customEventConfig), {
      wrapper: Wrapper,
    });
    void act(() => result.current());
    expect(EVENT_HANDLER_CONFIG.handlers?.Button.onPress).not.toHaveBeenCalled();
  });

  it('Button click action should be called because of actionMapping entry', () => {
    const customEventConfig: EventHandlerCustomConfig = {
      actions: ['click'],
      componentName: 'place_order',
      data: {
        currency: 'BTC',
      },
    };

    function Wrapper({ children }: { children: React.ReactNode }) {
      return (
        <EventHandlerProvider config={CUSTOM_EVENT_HANDLER_WITH_MAPPING}>
          {children}
        </EventHandlerProvider>
      );
    }

    const { result } = renderHook(() => useEventHandler('Button', 'onPress', customEventConfig), {
      wrapper: Wrapper,
    });

    void act(() => result.current());

    expect(CUSTOM_EVENT_HANDLER_WITH_MAPPING.handlers?.Button.click).toHaveBeenCalledWith({
      componentName: customEventConfig.componentName,
      data: customEventConfig.data,
    });
  });

  it('Button onPress should not be called because it is not defined in custom event config actions list', () => {
    const customEventConfig: EventHandlerCustomConfig = {
      actions: ['hover'],
      componentName: 'place_order',
      data: {
        currency: 'BTC',
      },
    };
    function Wrapper({ children }: { children: React.ReactNode }) {
      return <EventHandlerProvider config={CUSTOM_HANDLER_CONFIG}>{children}</EventHandlerProvider>;
    }

    const { result } = renderHook(() => useEventHandler('Button', 'onPress', customEventConfig), {
      wrapper: Wrapper,
    });
    void act(() => result.current());
    expect(CUSTOM_HANDLER_CONFIG.handlers?.Button.onPress).not.toHaveBeenCalled();
  });
});
