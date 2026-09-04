import React, { createContext, useContext, useMemo } from 'react';

export type LocaleContextValue = {
  /** A valid JavaScript Intl locale. */
  locale: string;
};

export const LocaleContext = createContext<LocaleContextValue>({ locale: 'en-US' });

export type LocaleProviderProps = LocaleContextValue & {
  children?: React.ReactNode;
};

export const LocaleProvider = ({ locale, children }: LocaleProviderProps) => {
  const value = useMemo(() => ({ locale }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => useContext(LocaleContext);
