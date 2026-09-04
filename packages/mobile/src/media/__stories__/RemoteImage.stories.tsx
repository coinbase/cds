import React from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { assets, squareAssets, svgs } from '@coinbase/cds-common/internal/data/assets';
import { avatars, avatarSizes } from '@coinbase/cds-common/internal/data/avatars';
import { entries } from '@coinbase/cds-utils';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { getSource, RemoteImage } from '../RemoteImage';

const sharedProps = {
  resizeMode: 'cover',
  shape: 'circle',
  width: 32,
  height: 32,
} as const;

const customDimensions = {
  width: 220,
  height: 40,
} as const;

const wideLogoSource =
  'https://static-assets.coinbase.com/design-system/subBrandLogo/coinbaseOneSubBrand.svg';

const mockItems = Array.from({ length: 4 });
const images = entries(assets).map(([, { imageUrl }]) => imageUrl);

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

const imageURL = avatars[0];

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

const gapStyle = { gap: 16 };

const RemoteImageScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default Shape">
        <HStack gap={2}>
          {mockItems.map((_, idx) => {
            const key = `square-${idx}`;
            return (
              <RemoteImage key={key} source={squareAssets.human2} {...sharedProps} shape="square" />
            );
          })}
        </HStack>
      </Example>
      <Example title="Circle Shape">
        <HStack gap={2}>
          {mockItems.map((_, idx) => {
            const key = `circle-${idx}`;
            return <RemoteImage key={key} source={squareAssets.human1} {...sharedProps} />;
          })}
        </HStack>
      </Example>
      <Example title="Squircle Shape">
        <HStack gap={2}>
          {mockItems.map((_, idx) => {
            const key = `squircle-${idx}`;
            return (
              <RemoteImage
                key={key}
                source={squareAssets.human3}
                {...sharedProps}
                shape="squircle"
              />
            );
          })}
        </HStack>
      </Example>
      <Example title="Custom Dimensions">
        <VStack gap={2}>
          <RemoteImage source={wideLogoSource} {...customDimensions} resizeMode="cover" />
          <RemoteImage source={wideLogoSource} {...customDimensions} resizeMode="contain" />
          <RemoteImage
            aspectRatio={[9, 1]}
            resizeMode="contain"
            source={wideLogoSource}
            width={customDimensions.width}
          />
          <RemoteImage
            aspectRatio={[9, 1]}
            height={customDimensions.height}
            resizeMode="contain"
            source={wideLogoSource}
          />
        </VStack>
      </Example>
      <Example title="svgs">
        <HStack gap={2}>
          {svgs.map((imgURL, idx) => {
            const key = `svg-${idx}`;
            return (
              <RemoteImage key={key} source={getSource(imgURL)} {...sharedProps} shape="squircle" />
            );
          })}
        </HStack>
      </Example>
      <Example title="shouldApplyDarkModeEnhacements">
        <HStack flexWrap="wrap" style={gapStyle}>
          {images.map((item) => (
            <RemoteImage
              key={item}
              source={getSource(item)}
              {...sharedProps}
              shouldApplyDarkModeEnhacements
            />
          ))}
        </HStack>
      </Example>
      <Example title="darkModeEnhancementsApplide">
        <HStack flexWrap="wrap" style={gapStyle}>
          {images.map((item) => (
            <RemoteImage
              key={item}
              source={getSource(item)}
              {...sharedProps}
              darkModeEnhancementsApplied
            />
          ))}
        </HStack>
      </Example>
      <Example title="Custom Border Radius">
        <HStack flexWrap="wrap" style={gapStyle}>
          {mockItems.map((_, idx) => {
            const key = `square-${idx}`;
            return (
              <RemoteImage
                key={key}
                borderRadius={12}
                source={squareAssets.human6}
                {...sharedProps}
              />
            );
          })}
        </HStack>
      </Example>
      <Example title="Avatar Sizes with Circle">
        <AvatarSizesWithCircle />
      </Example>
      <Example title="Avatar Sizes with Squircle">
        <AvatarSizesWithSquircle />
      </Example>
      <Example title="Border Color Imgs">
        <BorderColorImg />
      </Example>
      <Example title="Border Color Svgs">
        <BorderColorSvgs />
      </Example>
      <Example title="Circle Fallback">
        <CircleFallback />
      </Example>
      <Example title="Rectangle Fallback">
        <RectangleFallback />
      </Example>
      <Example title="Square Fallback">
        <SquareFallback />
      </Example>
    </ExampleScreen>
  );
};

export default RemoteImageScreen;
