import React from 'react';
import { opacityHovered, opacityPressed } from '@coinbase/cds-common/tokens/interactable';
import type { SharedProps, ValidateProps } from '@coinbase/cds-common/types';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { type BoxDefaultElement, type BoxProps } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

export const floatingAssetCardLargeWidth = 359;
export const floatingAssetCardSmallDimension = 156;

export type FloatingAssetCardBaseProps = SharedProps & {
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

export type FloatingAssetCardProps = FloatingAssetCardBaseProps &
  Omit<BoxProps<BoxDefaultElement>, 'title'>;

const pressCss = css`
  /* Prevents layout shift - https://web.dev/cls/#animations-and-transitions */
  transform: scale(1);
  appearance: none;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  background-color: var(--color-transparent);
  padding: 0;

  /* Removes weird bonus padding in Firefox */
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
    margin: 0;
  }
  &:active {
    transform: scale(0.98);
    opacity: ${opacityPressed};
  }
  &:hover {
    opacity: ${opacityHovered};
  }
`;

const focusRingCss = css`
  position: relative;
  /* Disable default focus ring before adding custom focus ring styles */
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--color-bgPrimary);
    outline-offset: 2px;
    border-radius: var(--borderRadius-500);
  }
`;

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
export const FloatingAssetCard = ({
  className,
  title,
  description,
  subtitle,
  media,
  size = 's',
  width = size === 'l' ? floatingAssetCardLargeWidth : floatingAssetCardSmallDimension,
  testID = 'floating-asset-card',
  onClick,
  ...props
}: FloatingAssetCardProps) => {
  return (
    <VStack
      as={onClick ? 'button' : 'div'}
      className={cx(onClick && pressCss, focusRingCss, className)}
      gap={1}
      maxWidth={width}
      onClick={onClick}
      testID={testID}
      {...(props satisfies ValidateProps<
        typeof props,
        Omit<FloatingAssetCardProps, keyof BoxProps<BoxDefaultElement>>
      >)}
    >
      <HStack
        borderColor="bgLine"
        borderRadius={500}
        borderWidth={100}
        height={floatingAssetCardSmallDimension}
        maxWidth={width}
        minWidth={floatingAssetCardSmallDimension}
        overflow="hidden"
      >
        {media}
      </HStack>
      <VStack gap={0.5}>
        {typeof subtitle === 'string' ? (
          <Text as="p" color="fgMuted" display="block" font="legal" numberOfLines={1}>
            {subtitle}
          </Text>
        ) : (
          subtitle
        )}
        {typeof title === 'string' ? (
          <Text as="p" display="block" font="headline" numberOfLines={3}>
            {title}
          </Text>
        ) : (
          title
        )}
        {typeof description === 'string' ? (
          <Text as="p" color="fgMuted" display="block" font="label2" numberOfLines={2}>
            {description}
          </Text>
        ) : (
          description
        )}
      </VStack>
    </VStack>
  );
};
