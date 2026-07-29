import { forwardRef } from 'react';
import type { IconName } from '@coinbase/cds-common/types/IconName';

import { IconButton } from '../buttons/IconButton';

import type { PaginationNavigationButtonProps } from './Pagination';

// Map direction to icon name
export const iconMap = {
  first: 'arrowLeft',
  last: 'arrowRight',
  next: 'caretRight',
  previous: 'caretLeft',
} as const satisfies Record<PaginationNavigationButtonProps['direction'], IconName>;

export const DefaultPaginationNavigationButton = forwardRef(
  (
    { direction, onClick, disabled, accessibilityLabel, testID }: PaginationNavigationButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <IconButton
        ref={ref}
        transparent
        accessibilityLabel={accessibilityLabel}
        disabled={disabled}
        name={iconMap[direction]}
        onClick={onClick}
        size="s"
        testID={testID}
        variant="secondary"
      />
    );
  },
);
