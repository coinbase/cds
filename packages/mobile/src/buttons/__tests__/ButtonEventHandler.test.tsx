import type {
  EventHandlerConfig,
  EventHandlerCustomConfig,
} from '@coinbase/cds-common/system/EventHandlerProvider';
import { EventHandlerProvider } from '@coinbase/cds-common/system/EventHandlerProvider';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Button } from '../Button';

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

describe('ButtonEventDelegation', () => {
  let customEventConfig: EventHandlerCustomConfig = {
    actions: [],
    componentName: 'place_order',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('EventDelegationConfig `Button.onPress` should not be called because config is not provided to EventDelegationProvider', () => {
    const spy = jest.fn();

    render(
      <DefaultThemeProvider>
        <EventHandlerProvider>
          <Button onPress={spy} testID="button">
            Child
          </Button>
        </EventHandlerProvider>
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByTestId('button'));

    // callback should be called
    expect(spy).toHaveBeenCalled();
    expect(EVENT_HANDLER_CONFIG.handlers?.Button.onPress).not.toHaveBeenCalled();
  });

  it('EventDelegationConfig `Button.onPress` should not be called because eventConfig is not provided to `Button`', () => {
    const spy = jest.fn();

    render(
      <DefaultThemeProvider>
        <EventHandlerProvider config={EVENT_HANDLER_CONFIG}>
          <Button onPress={spy} testID="button">
            Child
          </Button>
        </EventHandlerProvider>
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByTestId('button'));

    // callback should be called
    expect(spy).toHaveBeenCalled();
    expect(EVENT_HANDLER_CONFIG.handlers?.Button.onPress).not.toHaveBeenCalled();
  });

  it('EventDelegationConfig `Button.onPress` should be called', () => {
    const spy = jest.fn();

    customEventConfig = {
      actions: ['onPress'],
      componentName: 'place_order',
      data: { currency: 'BTC' },
    };

    render(
      <DefaultThemeProvider>
        <EventHandlerProvider config={EVENT_HANDLER_CONFIG}>
          <Button eventConfig={customEventConfig} onPress={spy} testID="button">
            Child
          </Button>
        </EventHandlerProvider>
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByTestId('button'));

    // callback should be called
    expect(spy).toHaveBeenCalled();
    expect(EVENT_HANDLER_CONFIG.handlers?.Button.onPress).toHaveBeenCalled();
  });

  it('EventDelegationConfig `Button.onPress` should not be called because onPress is not defined in action list', () => {
    const spy = jest.fn();

    customEventConfig = {
      actions: ['click'],
      componentName: 'place_order',
      data: { currency: 'BTC' },
    };

    render(
      <DefaultThemeProvider>
        <EventHandlerProvider config={EVENT_HANDLER_CONFIG}>
          <Button eventConfig={customEventConfig} onPress={spy} testID="button">
            Child
          </Button>
        </EventHandlerProvider>
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByTestId('button'));

    // callback should be called
    expect(spy).toHaveBeenCalled();
    expect(EVENT_HANDLER_CONFIG.handlers?.Button.onPress).not.toHaveBeenCalled();
  });

  it('EventDelegationConfig `Button.click` should be called because of actionMapping entry', () => {
    const spy = jest.fn();

    customEventConfig = {
      actions: ['click'],
      componentName: 'place_order',
      data: { currency: 'BTC' },
    };

    render(
      <DefaultThemeProvider>
        <EventHandlerProvider config={CUSTOM_EVENT_HANDLER_WITH_MAPPING}>
          <Button eventConfig={customEventConfig} onPress={spy} testID="button">
            Child
          </Button>
        </EventHandlerProvider>
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByTestId('button'));

    // callback should be called
    expect(spy).toHaveBeenCalled();
    expect(CUSTOM_EVENT_HANDLER_WITH_MAPPING.handlers?.Button.click).toHaveBeenCalled();
  });
});
