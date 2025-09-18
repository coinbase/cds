import React, { forwardRef, memo } from 'react';
import type { IconName } from '@cbhq/cds-icons';

import type { Polymorphic } from '../core/polymorphism';
import { Icon } from '../icons';
import { HStack, type HStackDefaultElement, type HStackProps } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

export type SectionHeaderBaseProps = {
  /** Text or ReactNode to be displayed in Title */
  title: React.ReactNode;
  /* ReactNode (icon, asset, image, etc) to display before title. */
  start?: React.ReactNode;
  /* Icon or ReactNode to display after title. */
  icon?: Exclude<React.ReactNode, 'string'> | IconName;
  /** Whether the icon is active */
  iconActive?: boolean;
  /** ReactNode or IconName to present balances wherever it is necessary */
  balance?: React.ReactNode;
  /** ReactNode to display up to 2 lines of copy that frames the section's purpose and relevance */
  description?: React.ReactNode;
  /* ReactNode to display at the end */
  end?: React.ReactNode;
};

export type SectionHeaderProps = Polymorphic.ExtendableProps<
  HStackProps<HStackDefaultElement>,
  SectionHeaderBaseProps
>;

export const SectionHeader = memo(
  forwardRef(function SectionHeader(
    {
      title,
      start,
      icon,
      iconActive,
      balance,
      description,
      end,
      gap = 1,
      justifyContent = 'space-between',
      minWidth = 256,
      paddingX = 4,
      paddingY = 2,
      ...props
    }: SectionHeaderProps,
    ref: React.Ref<HTMLDivElement>,
  ) {
    return (
      <HStack
        ref={ref}
        gap={gap}
        justifyContent={justifyContent}
        minWidth={minWidth}
        paddingX={paddingX}
        paddingY={paddingY}
        {...props}
      >
        <VStack gap={0.5}>
          <HStack alignItems="center" gap={1}>
            {!!start && start}
            {typeof title === 'string' ? (
              <Text as="h3" display="block" font="title3">
                {title}
              </Text>
            ) : (
              title
            )}
            {typeof icon === 'string' ? (
              <Icon active={iconActive} color="fg" name={icon as IconName} size="xs" />
            ) : (
              icon
            )}
          </HStack>
          {typeof balance === 'string' ? (
            <Text as="h3" display="block" font="title3">
              {balance}
            </Text>
          ) : (
            balance
          )}
          {typeof description === 'string' ? (
            <Text as="p" color="fgMuted" display="block" font="body" numberOfLines={2}>
              {description}
            </Text>
          ) : (
            description
          )}
        </VStack>
        {!!end && end}
      </HStack>
    );
  }),
);
