import { type Context, createContext, useContext } from 'react';
import type { View } from 'react-native';

import type { TourApi } from './useTour';

export type TourContextValue<TourStepId extends string = string> = TourApi<TourStepId>;

export const TourContext = createContext<TourContextValue | undefined>(undefined);

export const useTourContext = <
  TourStepId extends string = string,
>(): TourContextValue<TourStepId> => {
  const context = useContext(TourContext as unknown as Context<TourContextValue<TourStepId>>);
  if (!context) throw Error('useTourContext must be called inside a Tour');
  return context;
};
