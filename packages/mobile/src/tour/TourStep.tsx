import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useTourContext } from '@coinbase/cds-common/tour/TourContext';

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
  const { activeTourStep, setActiveTourStepTarget } = useTourContext();
  const refCallback = useCallback(
    (ref: View) => activeTourStep?.id === id && ref && setActiveTourStepTarget(ref),
    [activeTourStep, id, setActiveTourStepTarget],
  );
  return (
    <View ref={refCallback} collapsable={false}>
      {children}
    </View>
  );
};
