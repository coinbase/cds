import React, { memo } from 'react';
import type { IconName } from '@coinbase/cds-common';
import { Icon } from '@coinbase/cds-web/icons';
import { HStack } from '@coinbase/cds-web/layout/HStack';
import { Pressable, type PressableProps } from '@coinbase/cds-web/system';
import { Text } from '@coinbase/cds-web/typography/Text';
import DocusaurusLink from '@docusaurus/Link';

type LinkChipProps = Omit<PressableProps<typeof DocusaurusLink>, 'as' | 'children'> & {
  children: React.ReactNode;
  startIcon?: IconName;
  endIcon?: IconName;
};

/**
 * A Chip-styled link that uses Pressable for hover/active states with DocusaurusLink for routing.
 */
export const LinkChip = memo(
  ({
    children,
    startIcon = 'externalLink',
    endIcon,
    background = 'bgSecondary',
    borderRadius = 700,
    target = '_blank',
    ...props
  }: LinkChipProps) => (
    <Pressable
      as={DocusaurusLink}
      background={background}
      borderRadius={borderRadius}
      target={target}
      {...props}
    >
      <HStack alignItems="center" gap={1} paddingX={1.5} paddingY={0.5}>
        {startIcon && <Icon color="fg" name={startIcon} size="s" />}
        <Text font="label1">{children}</Text>
        {endIcon && <Icon color="fg" name={endIcon} size="s" />}
      </HStack>
    </Pressable>
  ),
);
