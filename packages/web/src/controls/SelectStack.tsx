import React, { forwardRef, memo } from 'react';
import type { ThemeVars } from '@cbhq/cds-common/core/theme';
import type { SharedAccessibilityProps } from '@cbhq/cds-common/types';

import { handlePreventPropagation } from '../utils/eventHandlers';

import { HelperText } from './HelperText';
import { InputLabel } from './InputLabel';
import { InputStack } from './InputStack';
import type { SelectBaseProps } from './Select';

export type SelectStackProps = {
  children: React.ReactElement;
  helperTextErrorIconAccessibilityLabel?: string;
} & Pick<
  SelectBaseProps,
  'compact' | 'label' | 'disabled' | 'helperText' | 'variant' | 'focused' | 'labelVariant'
> &
  Pick<SharedAccessibilityProps, 'accessibilityLabelId' | 'accessibilityDescriptionId'>;

const variantToHelperTextColor: Record<
  Exclude<SelectStackProps['variant'], undefined>,
  ThemeVars.Color
> = {
  foreground: 'fg',
  positive: 'fgPositive',
  negative: 'fgNegative',
  primary: 'fgPrimary',
  foregroundMuted: 'fgMuted',
  secondary: 'fgMuted',
};

export const SelectStack = memo(
  forwardRef<HTMLElement, SelectStackProps>(function SelectStack(
    {
      children,
      compact,
      label,
      disabled,
      helperText,
      variant,
      focused,
      accessibilityLabelId,
      accessibilityDescriptionId,
      helperTextErrorIconAccessibilityLabel = 'error',
      labelVariant = 'outside',
    },
    ref,
  ) {
    return (
      <InputStack
        ref={ref}
        disabled={disabled}
        focused={focused}
        helperTextNode={
          Boolean(helperText) &&
          (typeof helperText === 'string' ? (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div onClick={handlePreventPropagation}>
              <HelperText
                color={variant ? variantToHelperTextColor[variant] : 'fgMuted'}
                errorIconAccessibilityLabel={helperTextErrorIconAccessibilityLabel}
                errorIconTestID="select-error-icon"
                id={accessibilityDescriptionId}
                overflow="truncate"
              >
                {helperText}
              </HelperText>
            </div>
          ) : (
            helperText
          ))
        }
        inputNode={children}
        labelNode={
          !compact &&
          labelVariant !== 'inside' &&
          !!label && (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div onClick={handlePreventPropagation}>
              <InputLabel color="fg" id={accessibilityLabelId} overflow="truncate">
                {label}
              </InputLabel>
            </div>
          )
        }
        labelVariant={labelVariant}
        variant={variant}
        width="100%"
      />
    );
  }),
);
