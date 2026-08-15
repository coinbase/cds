import React, { forwardRef } from 'react';

import type { ButtonProps } from '../buttons/Button';
import { Button } from '../buttons/Button';

export const DefaultPaginationNavigationTextButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      onClick,
      disabled,
      accessibilityLabel,
      testID,
      children,
      variant = 'secondary',
      size = 's',
      ...restProps
    },
    ref,
  ) => {
    return (
      <Button
        ref={ref}
        aria-label={accessibilityLabel}
        data-testid={testID}
        disabled={disabled}
        onClick={onClick}
        size={size}
        variant={variant}
        {...restProps}
      >
        {children}
      </Button>
    );
  },
);

DefaultPaginationNavigationTextButton.displayName = 'DefaultPaginationNavigationTextButton';
