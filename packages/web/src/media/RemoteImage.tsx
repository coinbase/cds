import React, { memo, useMemo } from 'react';
import {
  remoteImageDarkFallbackSrc,
  remoteImageLightFallbackSrc,
} from '@coinbase/cds-common/media/remoteImageFallbackSrc';
import { shapeBorderRadius } from '@coinbase/cds-common/tokens/borderRadius';
import type { AvatarSize } from '@coinbase/cds-common/types/AvatarSize';
import type { AspectRatio, Shape } from '@coinbase/cds-common/types/Shape';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { Box, type BoxProps } from '../layout/Box';

const COMPONENT_STATIC_CLASSNAME = 'cds-RemoteImage';

const baseCss = css`
  display: block;
`;

const resizeCss = {
  cover: css`
    object-fit: cover;
  `,
  contain: css`
    object-fit: contain;
  `,
};

const hexagonOverflowCss = css`
  overflow: visible;
`;

const fallbackCss = css`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  .light & {
    background-image: url(${remoteImageLightFallbackSrc});
  }

  .dark & {
    background-image: url(${remoteImageDarkFallbackSrc});
  }
`;

const borderRadiusCss = {
  circle: css`
    border-radius: ${shapeBorderRadius.circle}px;
  `,
  squircle: css`
    border-radius: ${shapeBorderRadius.squircle}px;
  `,
  square: css`
    border-radius: ${shapeBorderRadius.square}px;
  `,
  rectangle: css`
    border-radius: ${shapeBorderRadius.rectangle}px;
  `,
  hexagon: css`
    border-radius: ${shapeBorderRadius.hexagon}px;
  `,
};

export type RemoteImageBaseProps = Omit<BoxProps<'img'>, 'aspectRatio'> & {
  /** Absolute url to the image that should be shown in the RemoteImage. If no source is provided then a generic fallback image is used. */
  source?: string;
  resizeMode?: keyof typeof resizeCss;
  /**
   * Shape of RemoteImage
   * @default square
   * */
  shape?: Shape;
  /**
   * Size for a given RemoteImage. If width or height is not defined,
   * it will set size = m as default
   *
   * @default m
   * */
  size?: AvatarSize;
  aspectRatio?: AspectRatio;
};

export type RemoteImageProps = RemoteImageBaseProps;

export const RemoteImage = memo((_props: RemoteImageProps) => {
  const mergedProps = useComponentConfig('RemoteImage', _props);
  const {
    width,
    height,
    aspectRatio,
    shape = 'square',
    source,
    alt = '',
    className,
    resizeMode = 'cover',
    size = 'm',
    borderColor,
    borderWidth = borderColor ? 200 : undefined,
    style,
    ...props
  } = mergedProps;
  const styles = useMemo(
    () =>
      ({
        aspectRatio: aspectRatio ? aspectRatio.join(' / ') : undefined,
        ...style,
      }) as const,
    [aspectRatio, style],
  );
  // If height and width are not provided, we default to avatarSize
  const computedHeight = useMemo(
    () => (width || height ? height : `var(--avatarSize-${size})`),
    [width, height, size],
  );
  const computedWidth = useMemo(
    () => (width || height ? width : `var(--avatarSize-${size})`),
    [width, height, size],
  );

  return (
    <Box
      alt={alt}
      as="img"
      borderColor={borderColor}
      borderWidth={borderWidth}
      className={cx(
        COMPONENT_STATIC_CLASSNAME,
        baseCss,
        shape === 'hexagon' && hexagonOverflowCss,
        resizeCss[resizeMode],
        borderRadiusCss[shape],
        !source && fallbackCss,
        className,
      )}
      data-shape={shape}
      height={computedHeight}
      src={source}
      style={styles}
      width={computedWidth}
      {...props}
    />
  );
});
