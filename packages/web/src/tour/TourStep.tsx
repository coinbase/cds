import React, { useCallback, useContext } from 'react';
import { useTourContext } from '@coinbase/cds-common/tour/TourContext';

import { TourRefContext } from './Tour';

type TourStepProps = {
  /** The id of the corresponding tour step data */
  id: string;
  children?: React.ReactNode;
};

/**
 * The TourStep component wraps the target element (children) that you want to highlight during a step
 * in the tour. The active tour step content will be positioned relative to the target element when it
 * is rendered.
 */
export const TourStep = ({ id, children }: TourStepProps) => {
  const { setActiveTourStepTarget } = useContext(TourRefContext);
  const { activeTourStep } = useTourContext();
  const refCallback = useCallback(
    (ref: HTMLDivElement) => activeTourStep?.id === id && ref && setActiveTourStepTarget(ref),
    [activeTourStep, id, setActiveTourStepTarget],
  );
  return <div ref={refCallback}>{children}</div>;
};
