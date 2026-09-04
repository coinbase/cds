import React from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { svgs } from '@coinbase/cds-common/internal/data/assets';
import { avatarSizes } from '@coinbase/cds-common/internal/data/avatars';
import { css } from '@linaria/core';

import { HStack, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { RemoteImage } from '../RemoteImage';

export default {
  component: RemoteImage,
  title: 'Components/RemoteImage',
};

const borderColors = [
  'bgPrimary',
  'bgPrimaryWash',
  'bgSecondary',
  'bgPositive',
  'bgNegative',
  'bgLine',
  'bgLineHeavy',
  'transparent',
  'bgWarning',
] as const satisfies ThemeVars.Color[];

const sharedProps = {
  resizeMode: 'cover',
  shape: 'circle',
  width: 32,
  height: 32,
} as const;

const whiteBorderCss = css`
  /* stylelint-disable-next-line color-named */
  border-color: black;
  border-width: 8px;
`;

const imageURL =
  'https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg';

const mockItems = Array.from({ length: 4 });

const AvatarSizesWithSquircle = () => (
  <HStack gap={2}>
    {avatarSizes.map((size, idx) => {
      const key = `squircle-${idx}`;
      return (
        <VStack key={key}>
          <Text font="body">{size}</Text>
          <RemoteImage key={key} shape="squircle" size={size} source={imageURL} />
        </VStack>
      );
    })}
  </HStack>
);

const AvatarSizesWithCircle = () => (
  <HStack gap={2}>
    {avatarSizes.map((size, idx) => {
      const key = `circle-${idx}`;
      return (
        <VStack key={key}>
          <Text font="body">{size}</Text>
          <RemoteImage shape="circle" size={size} source={imageURL} />
        </VStack>
      );
    })}
  </HStack>
);

const BorderColorImg = () => (
  <VStack gap={2}>
    {borderColors.map((borderColor, idx) => {
      const key = `border-imgs-${idx}`;
      return (
        <RemoteImage
          key={key}
          borderColor={borderColor}
          shape="circle"
          size="xxl"
          source={imageURL}
        />
      );
    })}
  </VStack>
);

const BorderColorSvgs = () => (
  <VStack gap={1}>
    {borderColors.map((borderColor, idx) => {
      const key = `border-svgs-${idx}`;
      return (
        <RemoteImage
          key={key}
          borderColor={borderColor}
          shape="circle"
          size="xxl"
          source={svgs[0]}
        />
      );
    })}
  </VStack>
);

const CircleFallback = () => {
  return (
    <VStack gap={1}>
      {avatarSizes.map((size, idx) => {
        const key = `circle-fallback-${idx}`;
        return (
          <VStack key={key}>
            <Text font="body">{size}</Text>
            <RemoteImage shape="circle" size={size} />
          </VStack>
        );
      })}
    </VStack>
  );
};

const SquareFallback = () => {
  return (
    <VStack gap={1}>
      {avatarSizes.map((size, idx) => {
        const key = `square-fallback-${idx}`;
        return (
          <VStack key={key}>
            <Text font="body">{size}</Text>
            <RemoteImage shape="square" size={size} />
          </VStack>
        );
      })}
    </VStack>
  );
};

const RectangleFallback = () => {
  return <RemoteImage height={10} shape="rectangle" width={30} />;
};

export const Default = () => {
  return (
    <>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          Default Shape
        </Text>
        <HStack gap={2}>
          {mockItems.map((_, idx) => {
            const key = `square-${idx}`;
            return <RemoteImage key={key} source={imageURL} {...sharedProps} shape="square" />;
          })}
        </HStack>
      </VStack>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          Circle Shape
        </Text>
        <HStack gap={2}>
          {mockItems.map((_, idx) => {
            const key = `square-${idx}`;
            return <RemoteImage key={key} source={imageURL} {...sharedProps} />;
          })}
        </HStack>
      </VStack>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          Squircle Shape
        </Text>
        <HStack gap={2}>
          {mockItems.map((_, idx) => {
            const key = `squircle-${idx}`;
            return <RemoteImage key={key} source={imageURL} {...sharedProps} shape="squircle" />;
          })}
        </HStack>
      </VStack>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          SVGs
        </Text>
        <HStack gap={2}>
          {svgs.map((imgURL, idx) => {
            const key = `svg-${idx}`;
            return <RemoteImage key={key} source={imgURL} {...sharedProps} shape="squircle" />;
          })}
        </HStack>
      </VStack>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          DangerouslySetClassName
        </Text>
        <HStack gap={2}>
          {svgs.map((imgURL, idx) => {
            const key = `svg-${idx}`;
            return (
              <RemoteImage
                key={key}
                className={whiteBorderCss}
                source={imgURL}
                {...sharedProps}
                shape="squircle"
              />
            );
          })}
        </HStack>
      </VStack>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          Avatar Sizes with Circle
        </Text>
        <AvatarSizesWithCircle />
      </VStack>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          Avatar Sizes with Squircle
        </Text>
        <AvatarSizesWithSquircle />
      </VStack>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          Border Color Imgs
        </Text>
        <BorderColorImg />
      </VStack>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          Border Color Svgs
        </Text>
        <BorderColorSvgs />
      </VStack>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          Circle Fallback
        </Text>
        <CircleFallback />
      </VStack>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          Rectangle Fallback
        </Text>
        <RectangleFallback />
      </VStack>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          Square Fallback
        </Text>
        <SquareFallback />
      </VStack>
    </>
  );
};
