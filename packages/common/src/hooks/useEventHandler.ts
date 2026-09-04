import { useCallback, useContext } from 'react';
import isEmpty from 'lodash/isEmpty';

import type {
  EventCustomData,
  EventHandlerAction,
  EventHandlerComponent,
  EventHandlerConfig,
  EventHandlerCustomConfig,
} from '../system/EventHandlerProvider';
import { EventHandlerContext } from '../system/EventHandlerProvider';

const noOp = () => {};

type ParamsType = {
  analyticsId?: string;
  componentName?: string;
  data?: EventCustomData;
};

export const useEventHandler = (
  component: EventHandlerComponent,
  action: EventHandlerAction,
  eventConfig?: EventHandlerCustomConfig,
  analyticsId?: string,
): (() => void) => {
  const config = useContext<EventHandlerConfig>(EventHandlerContext);

  return useCallback(() => {
    if (!config.handlers || (!eventConfig?.actions.length && !analyticsId)) {
      return noOp();
    }

    const handler = config?.handlers[component];

    if (!handler) {
      return noOp();
    }

    const { actionMapping } = config;

    /**
     * Handler can provide an actionMapping object that maps
     * CDS events (onClick, onHover) to its event names.
     * If actionMapping is provided we convert CDS action into the handler one
     * if the mapping between the two values exists
     */
    const convertedAction = actionMapping?.[action] ?? action;

    const callback = handler[convertedAction] ?? noOp;

    const params: ParamsType = {};

    /**
     * AnalyticsId is a generic way of autologging events without any meta
     * information besides the ID, giving a way to log events without having
     * engineers to manually include any contextual information. AnalyticsId
     * would be used to identify the component that fires the event.
     * Providing an analyticsId would take precendence over eventConfig
     */
    if (analyticsId) {
      params.analyticsId = analyticsId;
    }

    /**
     * the component event config provides a list of actions to track.
     * If the current action is not listed we return a noOp
     */
    if (eventConfig?.actions.includes(convertedAction)) {
      params.componentName = eventConfig.componentName;
      params.data = eventConfig.data;
    }

    if (isEmpty(params)) {
      return noOp();
    }

    return callback(params);
  }, [action, component, config, eventConfig, analyticsId]);
};
