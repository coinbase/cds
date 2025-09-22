import React, { forwardRef, memo } from 'react';
import type { View } from 'react-native';
import type { SharedProps } from '@cbhq/cds-common/types';

import type { HStackProps } from '../../layout';
import { HStack } from '../../layout';
import { Avatar } from '../../media';
import { Text } from '../../typography/Text';

export type ContentCardHeaderBaseProps = SharedProps & {
  /** A media object like an image, avatar, illustration, or cryptocurrency asset. */
  avatar?: React.ReactNode;
  /** Name of the publisher */
  title: React.ReactNode;
  /** Includes data like content category type and time */
  meta?: React.ReactNode;
  /** Typically an Icon Button or Tag */
  end?: React.ReactNode;
};

export type ContentCardHeaderProps = ContentCardHeaderBaseProps & HStackProps;

export const ContentCardHeader = memo(
  forwardRef(function ContentCardHeader(
    { avatar, title, meta, end, testID, ...props }: ContentCardHeaderProps,
    ref: React.ForwardedRef<View>,
  ) {
    return (
      <HStack
        ref={ref}
        alignItems="center"
        justifyContent="space-between"
        marginEnd={-1}
        testID={testID}
        {...props}
      >
        <HStack alignItems="center" gap={1}>
          {typeof avatar === 'string' ? (
            <Avatar
              accessibilityLabel={title as string}
              name={title as string}
              shape="circle"
              size="l"
              src={avatar}
            />
          ) : (
            avatar
          )}
          {typeof title === 'string' ? (
            <Text font="label1" numberOfLines={1}>
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
  }),
);
