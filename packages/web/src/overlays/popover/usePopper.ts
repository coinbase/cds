import { useMemo, useState } from 'react';
import { usePopper as useExternalPopper } from 'react-popper';
import type { Options as PopperOptions } from '@popperjs/core';

import { useTheme } from '../../hooks/useTheme';

import type { PopoverContentPositionConfig } from './PopoverProps';

export const usePopper = ({
  placement,
  skid = 0,
  gap = 0,
  offsetGap,
  strategy,
}: PopoverContentPositionConfig) => {
  const [subject, setSubject] = useState<HTMLDivElement | null>(null);
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);
  const theme = useTheme();
  const computedSkid = theme.space[skid];
  const computedGap = theme.space[gap];
  const getOffsetGap = offsetGap && gap - offsetGap;

  const popperOptions: Partial<PopperOptions> = useMemo(
    () => ({
      placement,
      strategy,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [computedSkid, getOffsetGap ?? computedGap],
          },
        },
      ],
    }),
    [placement, strategy, computedSkid, getOffsetGap, computedGap],
  );

  const { styles: popperStyles, attributes: popperAttributes } = useExternalPopper(
    subject,
    popper,
    popperOptions,
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
