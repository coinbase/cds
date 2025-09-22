import React, { forwardRef, memo } from 'react';
import type { SharedProps } from '@cbhq/cds-common/types';

import type { Polymorphic } from '../../core/polymorphism';
import { type BoxBaseProps, HStack } from '../../layout';
import { Avatar } from '../../media';
import { Text } from '../../typography/Text';

export const contentCardHeaderDefaultElement = 'div';
export type ContentCardHeaderDefaultElement = typeof contentCardHeaderDefaultElement;

export type ContentCardHeaderBaseProps = Polymorphic.ExtendableProps<
  BoxBaseProps,
  SharedProps & {
    /** A media object like an image, avatar, illustration, or cryptocurrency asset. */
    avatar?: React.ReactNode;
    /** Name of the publisher */
    title: React.ReactNode;
    /** Includes data like content category type and time */
    meta?: React.ReactNode;
    /** Typically an Icon Button or Tag */
    end?: React.ReactNode;
  }
>;

export type ContentCardHeaderProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  ContentCardHeaderBaseProps
>;

type ContentCardHeaderComponent = (<
  AsComponent extends React.ElementType = ContentCardHeaderDefaultElement,
>(
  props: ContentCardHeaderProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const ContentCardHeader: ContentCardHeaderComponent = memo(
  forwardRef<React.ReactElement<ContentCardHeaderBaseProps>, ContentCardHeaderBaseProps>(
    <AsComponent extends React.ElementType>(
      { as, avatar, title, meta, end, testID, ...props }: ContentCardHeaderProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? contentCardHeaderDefaultElement) satisfies React.ElementType;
      return (
        <HStack
          ref={ref}
          alignItems="center"
          as={Component}
          justifyContent="space-between"
          marginEnd={-1}
          testID={testID}
          {...props}
        >
          <HStack alignItems="center" gap={1}>
            {typeof avatar === 'string' ? (
              <Avatar
                alt={typeof title === 'string' ? title : undefined}
                name={typeof title === 'string' ? title : undefined}
                shape="circle"
                size="l"
                src={avatar}
              />
            ) : (
              avatar
            )}
            {typeof title === 'string' ? (
              <Text as="h3" display="block" font="label1" numberOfLines={1}>
                {title}
              </Text>
            ) : (
              title
            )}
            {typeof meta === 'string' ? (
              <Text color="fgMuted" font="label2" numberOfLines={1}>
                {meta}
              </Text>
            ) : (
              meta
            )}
          </HStack>
          {end}
        </HStack>
      );
    },
  ),
);
