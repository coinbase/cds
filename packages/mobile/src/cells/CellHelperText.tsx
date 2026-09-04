import { memo } from 'react';
import { cellHelperTextVariants } from '@coinbase/cds-common/tokens/cell';

import { Icon } from '../icons/Icon';
import { HStack, type HStackProps } from '../layout/HStack';
import { Text } from '../typography/Text';

export type CellHelperTextProps = HStackProps & {
  /** The variant determines the icon and color scheme */
  variant?: keyof typeof cellHelperTextVariants;
};

export const CellHelperText = memo(
  ({ children, variant = 'information', ...props }: CellHelperTextProps) => {
    const { color, iconName } = cellHelperTextVariants[variant];

    return (
      <HStack overflow="hidden" {...props}>
        <Text color={color} font="body">
          <Icon active color={color} name={iconName} size="xs" /> {children}
        </Text>
      </HStack>
    );
  },
);
