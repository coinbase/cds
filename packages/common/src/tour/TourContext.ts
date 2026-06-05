import { type Context, createContext, useContext } from 'react';

import type { TourApi } from './useTour';

export type TourContextValue<TourStepId extends string = string, TTarget = unknown> = TourApi<
  TourStepId,
  TTarget
>;

export const TourContext = createContext<TourContextValue | undefined>(undefined);

export const useTourContext = <
  TourStepId extends string = string,
  TTarget = unknown,
>(): TourContextValue<TourStepId, TTarget> => {
  const context = useContext(
    TourContext as unknown as Context<TourContextValue<TourStepId, TTarget> | undefined>,
  );
  if (!context) throw Error('useTourContext must be called inside a Tour');
  return context;
};
