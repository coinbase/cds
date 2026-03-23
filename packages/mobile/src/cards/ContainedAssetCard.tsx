import React, { memo, useMemo } from 'react';
import type { PressableProps, ViewStyle } from 'react-native';
import {
  containedAssetCardLargeDimension,
  containedAssetCardLargeWidth,
  containedAssetCardSmallDimension,
} from '@coinbase/cds-common/tokens/card';
import type { SharedProps } from '@coinbase/cds-common/types';

import type { HStackProps } from '../layout';
import { HStack, VStack } from '../layout';
import { Pressable } from '../system';
import { Text } from '../typography/Text';

export type ContainedAssetCardBaseProps = {
  /** Text or ReactNode to be displayed above Title */
  subtitle?: React.ReactNode;
  /** Text or ReactNode to be displayed in TextHeadline */
  title: React.ReactNode;
  /** Content to be displayed below the title */
  description?: React.ReactNode;
  /**
   * Header to display Remote Image or other content.
   */
  header: React.ReactNode;
  /**
   * Variant for card size. Can be small or large.
   * @default 's'
   */
  size?: 's' | 'l';
  /**
   * Children to be rendered in the card
   */
  children?: React.ReactNode;
} & SharedProps;

export type ContainedAssetCardProps = ContainedAssetCardBaseProps &
  Pick<PressableProps, 'onPress'> &
  Pick<HStackProps, 'minWidth' | 'maxWidth'>;

/**
 * @deprecated Use `MediaCard` instead. ContainedAssetCard will be removed in a future major release.
 *
 * Migration guide:
 * ```tsx
 * // Before
 * <ContainedAssetCard
 *   header={<Avatar ... />}
 *   title="Asset Title"
 *   subtitle="Subtitle"
 *   description="Description"
 *   size="l"
 * >
 *   <RemoteImage ... />
 * </ContainedAssetCard>
 *
 * // After
 * <MediaCard
 *   thumbnail={<Avatar ... />}
 *   title="Asset Title"
 *   subtitle="Subtitle"
 *   description="Description"
 *   media={<RemoteImage ... />}
 *   mediaPlacement="end"
 * />
 * ```
 */
export const ContainedAssetCard = memo(
  ({
    title,
    description,
    subtitle,
    header,
    testID = 'contained-asset-card',
    size = 's',
    children,
    onPress,
    maxWidth: propMaxWidth,
    minWidth: propMinWidth,
  }: ContainedAssetCardProps) => {
    const maxWidth = useMemo(
      () =>
        propMaxWidth ||
        (size === 'l' ? containedAssetCardLargeWidth : containedAssetCardSmallDimension),
      [size, propMaxWidth],
    );
    const minWidth = useMemo(
      () =>
        propMinWidth ||
        (size === 'l' ? containedAssetCardLargeDimension : containedAssetCardSmallDimension),
      [size, propMinWidth],
    );
    const pressableStyles = useMemo(() => {
      return {
        minWidth,
        maxWidth,
      } as ViewStyle;
    }, [maxWidth, minWidth]);
    const content = (
      <HStack
        background="bgAlternate"
        borderRadius={500}
        height={containedAssetCardSmallDimension}
        maxWidth={maxWidth}
        minWidth={minWidth}
        overflow="hidden"
        testID={onPress ? undefined : testID}
        width="100%"
      >
        <VStack
          alignContent="center"
          gap={1}
          height="100%"
          justifyContent="space-between"
          padding={2}
          width={size === 'l' ? '50%' : '100%'}
        >
          <HStack>{header}</HStack>
          <VStack gap={0.5}>
            {typeof subtitle === 'string' ? (
              <Text color="fgMuted" font="legal" numberOfLines={1}>
                {subtitle}
              </Text>
            ) : (
              subtitle
            )}
            {typeof title === 'string' ? (
              <Text font="headline" numberOfLines={1}>
                {title}
              </Text>
            ) : (
              title
            )}
            {typeof description === 'string' ? (
              <Text color="fgMuted" font="label2" numberOfLines={1}>
                {description}
              </Text>
            ) : (
              description
            )}
          </VStack>
        </VStack>
        {size === 'l' && <VStack width="50%">{children}</VStack>}
      </HStack>
    );
    return onPress ? (
      <Pressable
        accessibilityRole="button"
        background="transparent"
        borderRadius={500}
        onPress={onPress}
        style={pressableStyles}
        testID={testID}
      >
        {content}
      </Pressable>
    ) : (
      content
    );
  },
);
