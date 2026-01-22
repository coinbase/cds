import React from 'react';
import { opacityHovered, opacityPressed } from '@coinbase/cds-common/tokens/interactable';
import type { SharedProps, ValidateProps } from '@coinbase/cds-common/types';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { Box, type BoxDefaultElement, type BoxProps } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

export type ContainedAssetCardBaseProps = SharedProps & {
  header: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  size?: 's' | 'l';
  children?: React.ReactNode;
};

export type ContainedAssetCardProps = ContainedAssetCardBaseProps &
  Omit<BoxProps<BoxDefaultElement>, 'title'>;

export const containedAssetCardHeight = 156;
export const containedAssetCardSmallWidth = 156;
export const containedAssetCardSmallMinWidth = 156;
export const containedAssetCardLargeWidth = 359;
export const containedAssetCardLargeMinWidth = 327;

const pressCss = css`
  /* Prevents layout shift - https://web.dev/cls/#animations-and-transitions */
  transform: scale(1);
  appearance: none;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
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
  }
`;

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
export const ContainedAssetCard = ({
  header,
  title,
  subtitle,
  description,
  size = 's',
  children,
  className,
  flexDirection = 'row',
  background = 'bgAlternate',
  borderRadius = 500,
  height = containedAssetCardHeight,
  width = size === 'l' ? containedAssetCardLargeWidth : containedAssetCardSmallWidth,
  minWidth = size === 'l' ? containedAssetCardLargeMinWidth : containedAssetCardSmallMinWidth,
  overflow = 'hidden',
  onClick,
  testID = 'contained-asset-card',
  ...props
}: ContainedAssetCardProps) => {
  return (
    <Box
      as={onClick ? 'button' : 'div'}
      background={background}
      borderRadius={borderRadius}
      className={cx(onClick && pressCss, focusRingCss, className)}
      flexDirection={flexDirection}
      height={height}
      maxWidth={width}
      minWidth={minWidth}
      onClick={onClick}
      overflow={overflow}
      testID={testID}
      {...(props satisfies ValidateProps<
        typeof props,
        Omit<ContainedAssetCardProps, keyof BoxProps<BoxDefaultElement>>
      >)}
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
          {typeof subtitle !== 'string' ? (
            subtitle
          ) : (
            <Text as="p" color="fgMuted" display="block" font="legal" numberOfLines={1}>
              {subtitle}
            </Text>
          )}
          {typeof title !== 'string' ? (
            title
          ) : (
            <Text as="p" display="block" font="headline" numberOfLines={1}>
              {title}
            </Text>
          )}
          {typeof description !== 'string' ? (
            description
          ) : (
            <Text as="p" color="fgMuted" display="block" font="label2" numberOfLines={1}>
              {description}
            </Text>
          )}
        </VStack>
      </VStack>
      {size === 'l' && <VStack width="50%">{children}</VStack>}
    </Box>
  );
};
