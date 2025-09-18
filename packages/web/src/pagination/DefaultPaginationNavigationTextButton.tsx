import React, { forwardRef } from 'react';

import type { ButtonProps } from '../buttons/Button';
import { Button } from '../buttons/Button';

export const DefaultPaginationNavigationTextButton = forwardRef<
  HTMLButtonElement,
  ButtonProps<typeof Button>
>(
  (
    {
      onClick,
      disabled,
      accessibilityLabel,
      testID,
      children,
      variant = 'secondary',
      compact = true,
      ...restProps
    },
    ref,
  ) => {
    return (
      <Button
        ref={ref}
        aria-label={accessibilityLabel}
        compact={compact}
        data-testid={testID}
        disabled={disabled}
        onClick={onClick}
        variant={variant}
        {...restProps}
      >
        {children}
      </Button>
    );
  },
);

DefaultPaginationNavigationTextButton.displayName = 'DefaultPaginationNavigationTextButton';
