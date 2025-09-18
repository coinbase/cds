import React, { useCallback } from 'react';
import { useRefMapContext } from '@cbhq/cds-common/system/RefMapContext';

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
  const { registerRef } = useRefMapContext();
  const refCallback = useCallback(
    (ref: HTMLDivElement) => ref && registerRef(id, ref),
    [registerRef, id],
  );
  return <div ref={refCallback}>{children}</div>;
};
