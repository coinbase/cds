import { type Context, createContext, useContext } from 'react';

import type { TourApi } from './useTour';

export type TourContextValue<T extends string = string> = TourApi<T>;

export const TourContext = createContext<TourContextValue | undefined>(undefined);

export const useTourContext = <T extends string = string>(): TourContextValue<T> => {
  const context = useContext(TourContext as unknown as Context<TourContextValue<T>>);
  if (!context) throw Error('useTourContext must be called inside a Tour');
  return context;
};
