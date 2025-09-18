import React, { createContext, useMemo } from 'react';

type RecursiveMapType<T> = T | Record<string, T>;

export type EventDataEntryTypes = string | number | boolean | null | undefined;
export type EventDataEntry = EventDataEntryTypes | EventDataEntryTypes[];

export type EventHandlerAction = string;
export type EventCustomData = Record<string, RecursiveMapType<EventDataEntry>>;

export type EventHandlerComponent = 'Button';

export type EventCallbackProps = {
  componentName?: string;
  analyticsId?: string;
  data?: EventCustomData;
};

export type EventHandlerCallback = (eventData: EventCallbackProps) => void;
export type EventHandlerEntry = Record<string, EventHandlerCallback>;

export type EventHandlerConfig = {
  actionMapping?: Record<string, string>;
  handlers?: Record<EventHandlerComponent, EventHandlerEntry>;
};

// Event Custom Config
// {
//   actions: [],
//   component_name: 'trade',
//   custom_data: {
//     side: 'buy'
//   }
// }
export type EventHandlerCustomConfig = {
  actions: EventHandlerAction[];
  componentName: string;
  data?: EventCustomData;
};

export const DEFAULT_EVENT_HANDLER_CONTEXT: EventHandlerConfig = {};

export const EventHandlerContext = createContext<EventHandlerConfig>(DEFAULT_EVENT_HANDLER_CONTEXT);

export type EventHandlerProviderProps = {
  config?: EventHandlerConfig;
};

export const EventHandlerProvider: React.FC<React.PropsWithChildren<EventHandlerProviderProps>> = ({
  config,
  children,
}) => {
  const configuration = useMemo(() => config ?? DEFAULT_EVENT_HANDLER_CONTEXT, [config]);
  return (
    <EventHandlerContext.Provider value={configuration}>{children}</EventHandlerContext.Provider>
  );
};
