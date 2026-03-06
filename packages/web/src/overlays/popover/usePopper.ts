import { useCallback, useMemo, useState } from 'react';
import {
  autoPlacement,
  autoUpdate,
  flip,
  limitShift,
  offset,
  type Placement as FloatingPlacement,
  shift,
  useFloating,
} from '@floating-ui/react-dom';

import { useTheme } from '../../hooks/useTheme';

import type { PopoverContentPositionConfig } from './PopoverProps';

type PopperElement = HTMLDivElement | null;

/**
 * @deprecated Use Floating UI directly instead. This hook is temporarily supported for
 * compatibility and will be removed in a future major release.
 */
export const usePopper = ({
  placement: rawPlacement = 'bottom',
  skid = 0,
  gap = 0,
  offsetGap,
  strategy,
}: PopoverContentPositionConfig) => {
  const [subject, setSubjectState] = useState<PopperElement>(null);
  const [popper, setPopperState] = useState<PopperElement>(null);
  const theme = useTheme();
  const computedSkid = theme.space[skid];
  const computedGap = theme.space[gap];
  const getOffsetGap = offsetGap && gap - offsetGap;
  const isAutoPlacement = typeof rawPlacement === 'string' && rawPlacement.startsWith('auto');

  const middleware = useMemo(() => {
    const middlewareList = [
      offset({
        crossAxis: computedSkid,
        mainAxis: getOffsetGap ?? computedGap,
      }),
    ];

    if (isAutoPlacement) {
      const alignment =
        rawPlacement === 'auto-start' ? 'start' : rawPlacement === 'auto-end' ? 'end' : undefined;
      middlewareList.push(autoPlacement(alignment ? { alignment } : undefined));
    } else {
      middlewareList.push(flip());
      middlewareList.push(shift({ crossAxis: true, limiter: limitShift() }));
    }

    return middlewareList;
  }, [computedSkid, getOffsetGap, computedGap, isAutoPlacement, rawPlacement]);

  const { refs, floatingStyles, placement } = useFloating({
    placement: isAutoPlacement ? undefined : (rawPlacement as FloatingPlacement),
    strategy,
    middleware,
    whileElementsMounted: autoUpdate,
  });

  const setSubject = useCallback(
    (node: PopperElement) => {
      setSubjectState(node);
      refs.setReference(node);
    },
    [refs],
  );

  const setPopper = useCallback(
    (node: PopperElement) => {
      setPopperState(node);
      refs.setFloating(node);
    },
    [refs],
  );

  const popperStyles = useMemo(() => ({ popper: floatingStyles }), [floatingStyles]);
  const popperAttributes = useMemo(
    () => ({
      popper: {
        'data-popper-placement': placement,
      },
    }),
    [placement],
  );

  return {
    popper,
    subject,
    setSubject,
    setPopper,
    popperStyles,
    popperAttributes,
  };
};
