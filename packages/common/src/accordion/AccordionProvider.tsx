import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { isDevelopment } from '@coinbase/cds-utils/env';

export type AccordionContextValue = {
  activeKey: string | null;
  setActiveKey: (activeKey: string | null) => void;
};

export const AccordionContext = createContext<AccordionContextValue>({
  activeKey: null,
  setActiveKey: () => {},
});

export const useAccordionContext = () => {
  return useContext(AccordionContext);
};

export type AccordionProviderProps = {
  activeKey?: AccordionContextValue['activeKey'];
  children?: React.ReactNode;
  /**
   * Default active accordion item key.
   * If not specified or does not exist in the accordion items,
   * all items will be closed on mount
   */
  defaultActiveKey?: string;
  /**
   * Callback function fired when any of accordion items is pressed
   */
  onChange?: AccordionContextValue['setActiveKey'];
  setActiveKey?: AccordionContextValue['setActiveKey'];
};

export const AccordionProvider = ({
  activeKey,
  children,
  defaultActiveKey,
  setActiveKey,
  onChange,
}: AccordionProviderProps) => {
  const [internalActiveKey, setInternalActiveKey] = useState<AccordionContextValue['activeKey']>(
    defaultActiveKey ?? null,
  );

  if (
    isDevelopment() &&
    ((typeof activeKey !== 'undefined' && typeof setActiveKey === 'undefined') ||
      (typeof activeKey === 'undefined' && typeof setActiveKey !== 'undefined'))
  ) {
    throw Error('A controlled Accordion must have both activeKey and setActiveKey props');
  }

  const [currentActiveKey = null, setActiveKeyFn] = setActiveKey
    ? [activeKey, setActiveKey]
    : [internalActiveKey, setInternalActiveKey];

  const handleChangeActiveKey: React.Dispatch<
    React.SetStateAction<AccordionContextValue['activeKey']>
  > = useCallback(
    (nextActiveKey) => {
      const newActiveKey =
        typeof nextActiveKey === 'function' ? nextActiveKey(currentActiveKey) : nextActiveKey;
      if (newActiveKey === currentActiveKey) return;
      onChange?.(newActiveKey);
      setActiveKeyFn(newActiveKey);
    },
    [onChange, currentActiveKey, setActiveKeyFn],
  );

  const api = useMemo(
    () => ({
      activeKey: currentActiveKey,
      setActiveKey: handleChangeActiveKey,
    }),
    [currentActiveKey, handleChangeActiveKey],
  );

  return <AccordionContext.Provider value={api}>{children}</AccordionContext.Provider>;
};
