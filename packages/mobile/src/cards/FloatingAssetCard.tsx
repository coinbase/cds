import React, { memo, useMemo } from 'react';
import type { PressableProps } from 'react-native';
import {
  floatingAssetCardLargeWidth,
  floatingAssetCardSmallDimension,
} from '@coinbase/cds-common/tokens/card';
import type { SharedProps } from '@coinbase/cds-common/types';

import { HStack, VStack } from '../layout';
import { Pressable } from '../system';
import { Text } from '../typography/Text';

export type FloatingAssetCardBaseProps = SharedProps & {
  /** Callback fired when the card is pressed */
  onPress?: PressableProps['onPress'];
  /** Text or ReactNode to be displayed above Title */
  subtitle?: React.ReactNode;
  /** Text or ReactNode to be displayed in TextHeadline */
  title: React.ReactNode;
  /** Content to be displayed below the title */
  description?: React.ReactNode;
  /**
   * Remote Image or other node with media content.
   */
  media: React.ReactNode;
  /**
   * Variant for card size. Can be small or large.
   * @default 's'
   */
  size?: 's' | 'l';
};

export type FloatingAssetCardProps = FloatingAssetCardBaseProps;

/**
 * @deprecated Use `MediaCard` instead. FloatingAssetCard will be removed in a future major release.
 *
 * Migration guide:
 * ```tsx
 * // Before
 * <FloatingAssetCard
 *   title="Asset Title"
 *   subtitle="Subtitle"
 *   description="Description"
 *   media={<RemoteImage ... />}
 * />
 *
 * // After
 * <MediaCard
 *   title="Asset Title"
 *   subtitle="Subtitle"
 *   description="Description"
 *   thumbnail={<RemoteImage ... />}
 * />
 * ```
 *
 * Note: The floating variation (media outside the card container) is no longer supported.
 * MediaCard provides a contained layout with media placement options (start/end).
 */
export const FloatingAssetCard = memo(
  ({
    title,
    description,
    subtitle,
    media,
    testID = 'floating-asset-card',
    size = 's',
    onPress,
  }: FloatingAssetCardProps) => {
    const width = useMemo(
      () => (size === 'l' ? floatingAssetCardLargeWidth : floatingAssetCardSmallDimension),
      [size],
    );
    const pressableStyles = useMemo(() => {
      return {
        minWidth: floatingAssetCardSmallDimension,
        maxWidth: width,
      };
    }, [width]);

    const content = (
      <VStack gap={1} maxWidth={width} testID={testID}>
        <HStack
          bordered
          borderRadius={500}
          height={floatingAssetCardSmallDimension}
          maxWidth={width}
          minWidth={floatingAssetCardSmallDimension}
          overflow="hidden"
        >
          {media}
        </HStack>
        <VStack gap={0.5} maxWidth={width}>
          {typeof subtitle === 'string' ? (
            <Text color="fgMuted" font="legal" numberOfLines={1}>
              {subtitle}
            </Text>
          ) : (
            subtitle
          )}
          {typeof title === 'string' ? (
            <Text font="headline" numberOfLines={3}>
              {title}
            </Text>
          ) : (
            title
          )}
          {typeof description === 'string' ? (
            <Text color="fgMuted" font="label2" numberOfLines={2}>
              {description}
            </Text>
          ) : (
            description
          )}
        </VStack>
      </VStack>
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
