import type {
  EventHandlerConfig,
  EventHandlerCustomConfig,
} from '@coinbase/cds-common/system/EventHandlerProvider';
import { EventHandlerProvider } from '@coinbase/cds-common/system/EventHandlerProvider';
import { fireEvent, render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { Button } from '../Button';

const EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  handlers: {
    Button: {
      onClick: jest.fn(),
    },
  },
};

const CUSTOM_EVENT_HANDLER_WITH_MAPPING: EventHandlerConfig = {
  actionMapping: { onClick: 'click' },
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

  it('EventDelegationConfig `Button.onClick` should not be called because config is not provided to EventDelegationProvider', () => {
    const spy = jest.fn();

    render(
      <DefaultThemeProvider>
        <EventHandlerProvider>
          <Button onClick={spy}>Child</Button>
        </EventHandlerProvider>
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    // callback should be called
    expect(spy).toHaveBeenCalled();
    expect(EVENT_HANDLER_CONFIG.handlers?.Button.onClick).not.toHaveBeenCalled();
  });

  it('EventDelegationConfig `Button.onClick` should not be called because eventConfig is not provided to `Button`', () => {
    const spy = jest.fn();

    render(
      <DefaultThemeProvider>
        <EventHandlerProvider config={EVENT_HANDLER_CONFIG}>
          <Button onClick={spy}>Child</Button>
        </EventHandlerProvider>
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    // callback should be called
    expect(spy).toHaveBeenCalled();
    expect(EVENT_HANDLER_CONFIG.handlers?.Button.onClick).not.toHaveBeenCalled();
  });

  it('EventDelegationConfig `Button.onClick` should be called', () => {
    const spy = jest.fn();

    customEventConfig = {
      actions: ['onClick'],
      componentName: 'place_order',
      data: { currency: 'BTC' },
    };

    render(
      <DefaultThemeProvider>
        <EventHandlerProvider config={EVENT_HANDLER_CONFIG}>
          <Button eventConfig={customEventConfig} onClick={spy}>
            Child
          </Button>
        </EventHandlerProvider>
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    // callback should be called
    expect(spy).toHaveBeenCalled();
    expect(EVENT_HANDLER_CONFIG.handlers?.Button.onClick).toHaveBeenCalled();
  });

  it('EventDelegationConfig `Button.onClick` should not be called because onClick is not defined in action list', () => {
    const spy = jest.fn();

    customEventConfig = {
      actions: ['click'],
      componentName: 'place_order',
      data: { currency: 'BTC' },
    };

    render(
      <DefaultThemeProvider>
        <EventHandlerProvider config={EVENT_HANDLER_CONFIG}>
          <Button eventConfig={customEventConfig} onClick={spy}>
            Child
          </Button>
        </EventHandlerProvider>
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    // callback should be called
    expect(spy).toHaveBeenCalled();
    expect(EVENT_HANDLER_CONFIG.handlers?.Button.onClick).not.toHaveBeenCalled();
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
          <Button eventConfig={customEventConfig} onClick={spy}>
            Child
          </Button>
        </EventHandlerProvider>
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    // callback should be called
    expect(spy).toHaveBeenCalled();
    expect(CUSTOM_EVENT_HANDLER_WITH_MAPPING.handlers?.Button.click).toHaveBeenCalled();
  });
});
