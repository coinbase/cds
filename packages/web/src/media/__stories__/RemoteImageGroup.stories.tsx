import { assets, squareAssets } from '@coinbase/cds-common/internal/data/assets';
import { avatarSizes } from '@coinbase/cds-common/internal/data/avatars';

import { VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { RemoteImage } from '../RemoteImage';
import { RemoteImageGroup } from '../RemoteImageGroup';

export default {
  component: RemoteImageGroup,
  title: 'Components/RemoteImage/RemoteImageGroup',
};

const Circle = () => (
  <>
    <Text font="label1">Circle Custom Size: 32x32. Test that default max = 4.</Text>
    <RemoteImageGroup shape="circle" size={32}>
      <RemoteImage source={assets.eth.imageUrl} />
      <RemoteImage source={assets.btc.imageUrl} />
      <RemoteImage source={assets.dai.imageUrl} />
      <RemoteImage source={assets.hbar.imageUrl} />
      <RemoteImage source={assets.ltc.imageUrl} />
      <RemoteImage source={assets.uni.imageUrl} />
    </RemoteImageGroup>
  </>
);

const CircleCustomSize = () => (
  <>
    <Text font="label1">Circle Custom Size: 60x60</Text>
    <RemoteImageGroup shape="circle" size={60}>
      <RemoteImage source={assets.eth.imageUrl} />
      <RemoteImage source={assets.btc.imageUrl} />
      <RemoteImage source={assets.dai.imageUrl} />
    </RemoteImageGroup>
  </>
);

const CircleAvatarSize = () => (
  <>
    {avatarSizes.map((size) => (
      <VStack key={`circle-avatar-size-${size}`}>
        <Text font="label1">Circle Avatar Size: {size}</Text>
        <RemoteImageGroup shape="circle" size={size}>
          <RemoteImage source={assets.eth.imageUrl} />
          <RemoteImage source={assets.btc.imageUrl} />
          <RemoteImage source={assets.dai.imageUrl} />
        </RemoteImageGroup>
      </VStack>
    ))}
  </>
);

const CircleMax = () => {
  const maxSizes = [1, 2, 3, 4];

  return (
    <>
      {avatarSizes.map((avatarSize) => (
        <VStack key={`circle-max-${avatarSize}`}>
          {maxSizes.map((maxSize) => (
            <VStack key={`remote-image-group-circle-max-size-${maxSize}-${avatarSize}`}>
              <Text font="label1">
                Max Size to Truncate: {maxSize}, RemoteImage size: {avatarSize}
              </Text>
              <RemoteImageGroup max={maxSize} shape="circle" size={avatarSize}>
                <RemoteImage source={assets.eth.imageUrl} />
                <RemoteImage source={assets.dai.imageUrl} />
                <RemoteImage source={assets.btc.imageUrl} />
                <RemoteImage source={assets.sushi.imageUrl} />
                <RemoteImage source={assets.eth.imageUrl} />
                <RemoteImage source={assets.dai.imageUrl} />
                <RemoteImage source={assets.btc.imageUrl} />
                <RemoteImage source={assets.sushi.imageUrl} />
                <RemoteImage source={assets.eth.imageUrl} />
                <RemoteImage source={assets.dai.imageUrl} />
                <RemoteImage source={assets.btc.imageUrl} />
              </RemoteImageGroup>
            </VStack>
          ))}
        </VStack>
      ))}
    </>
  );
};

const CircleMaxDefaultCustomSize = () => (
  <>
    <Text as="p" display="block" font="body">
      RemoteImageGroup excess element defaults to m of AvatarSize when size is not specified
    </Text>
    <RemoteImageGroup max={2} shape="circle">
      <RemoteImage source={assets.eth.imageUrl} />
      <RemoteImage source={assets.sushi.imageUrl} />
      <RemoteImage source={assets.xrp.imageUrl} />
      <RemoteImage source={assets.ltc.imageUrl} />
    </RemoteImageGroup>
  </>
);

const MixAndMatchShapes = () => (
  <>
    <Text font="body">RemoteImage child shape takes precedence over RemoteImageGroup shape</Text>
    <RemoteImageGroup shape="circle" size="xxl">
      <RemoteImage shape="squircle" source={squareAssets.human1} />
      <RemoteImage source={assets.sushi.imageUrl} />
      <RemoteImage shape="squircle" source={squareAssets.human2} />
      <RemoteImage source={assets.ltc.imageUrl} />
    </RemoteImageGroup>
  </>
);

const Squircle = () => (
  <>
    <Text font="label1">Sqcircle Custom Size: 32x32</Text>
    <RemoteImageGroup shape="squircle" size={32}>
      <RemoteImage source={squareAssets.human1} />
      <RemoteImage source={squareAssets.human2} />
      <RemoteImage source={squareAssets.human1} />
    </RemoteImageGroup>
  </>
);

const SquircleCustomSize = () => (
  <>
    <Text font="label1">Sqcircle Custom Size: 80x80</Text>
    <RemoteImageGroup shape="squircle" size={80}>
      <RemoteImage source={squareAssets.human1} />
      <RemoteImage source={squareAssets.human2} />
      <RemoteImage source={squareAssets.human1} />
    </RemoteImageGroup>
  </>
);

const SquircleAvatarSize = () => (
  <>
    {avatarSizes.map((size) => (
      <VStack key={`squircle-avatar-size-${size}`}>
        <Text font="label1">Sqcircle Avatar Size: {size}</Text>
        <RemoteImageGroup shape="squircle" size={size}>
          <RemoteImage source={squareAssets.human1} />
          <RemoteImage source={squareAssets.human2} />
          <RemoteImage source={squareAssets.human1} />
        </RemoteImageGroup>
      </VStack>
    ))}
  </>
);

const SquircleMax = () => {
  const maxSizes = [1, 2, 3, 4];

  return (
    <>
      {avatarSizes.map((avatarSize) => (
        <VStack key={`squircle-max-${avatarSize}`}>
          {maxSizes.map((maxSize) => (
            <VStack key={`remote-image-group-squircle-max-size-${maxSize}-${avatarSize}`}>
              <Text font="label1">
                Max Size to Truncate: {maxSize}, RemoteImage size: {avatarSize}
              </Text>
              <RemoteImageGroup max={maxSize} shape="squircle" size={avatarSize}>
                <RemoteImage source={squareAssets.human2} />
                <RemoteImage source={squareAssets.human1} />
                <RemoteImage source={squareAssets.human2} />
                <RemoteImage source={squareAssets.human1} />
              </RemoteImageGroup>
            </VStack>
          ))}
        </VStack>
      ))}
    </>
  );
};

const SquircleMaxDefaultCustomSize = () => (
  <>
    <Text font="body">
      RemoteImageGroup excess element defaults to m of AvatarSize when size is not specified
    </Text>
    <RemoteImageGroup max={2} shape="squircle">
      <RemoteImage source={squareAssets.human1} />
      <RemoteImage source={squareAssets.human2} />
      <RemoteImage source={squareAssets.human1} />
      <RemoteImage source={squareAssets.human2} />
    </RemoteImageGroup>
  </>
);

const SquircleMaxSetCustomMaxSize = () => (
  <>
    <Text font="body">Set a custom size of 36 for RemoteImageGroup excess component</Text>
    <RemoteImageGroup max={2} shape="squircle" size={36}>
      <RemoteImage source={squareAssets.human1} />
      <RemoteImage source={squareAssets.human2} />
      <RemoteImage source={squareAssets.human1} />
      <RemoteImage source={squareAssets.human2} />
    </RemoteImageGroup>
  </>
);

const HideExcessWhenExceedThreshold = () => (
  <>
    <Text font="body">Excess component when size is smaller than a certain size looks funky</Text>
    <RemoteImageGroup max={2} shape="squircle" size={19}>
      <RemoteImage source={squareAssets.human1} />
      <RemoteImage source={squareAssets.human2} />
      <RemoteImage source={squareAssets.human1} />
      <RemoteImage source={squareAssets.human2} />
    </RemoteImageGroup>
  </>
);

export const All = () => (
  <VStack gap={7}>
    <Circle />
    <CircleCustomSize />
    <CircleAvatarSize />
    <CircleMax />
    <CircleMaxDefaultCustomSize />
    <Squircle />
    <SquircleCustomSize />
    <SquircleAvatarSize />
    <SquircleMax />
    <SquircleMaxDefaultCustomSize />
    <SquircleMaxSetCustomMaxSize />
    <HideExcessWhenExceedThreshold />
    <MixAndMatchShapes />
  </VStack>
);
