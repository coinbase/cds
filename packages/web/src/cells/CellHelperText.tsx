import { forwardRef, memo } from 'react';
import { cellHelperTextVariants } from '@coinbase/cds-common/tokens/cell';

import { Icon } from '../icons/Icon';
import { Text, type TextProps } from '../typography/Text';

export type CellHelperTextVariant = 'information' | 'warning' | 'error';

export type CellHelperTextProps = TextProps<'span'> & {
  /** The variant determines the icon and color scheme */
  variant?: keyof typeof cellHelperTextVariants;
};

export const CellHelperText = memo(
  forwardRef<HTMLDivElement, CellHelperTextProps>(
    ({ children, variant = 'information', as = 'span', font = 'body', ...props }, ref) => {
      const { color, iconName } = cellHelperTextVariants[variant];

      return (
        <Text as={as} color={color} font={font} {...props}>
          <Icon
            active
            aria-hidden="true"
            color="currentColor"
            display="inline-block"
            name={iconName}
            size="xs"
          />{' '}
          {children}
        </Text>
      );
    },
  ),
);
