import React, { useCallback, useState } from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { avatarSizes } from '@coinbase/cds-common/internal/data/avatars';
import { css } from '@linaria/core';

import { Button } from '../../buttons';
import { Icon } from '../../icons';
import { Box, HStack, VStack } from '../../layout';
import { RemoteImage } from '../../media';
import { defaultTheme } from '../../themes/defaultTheme';
import { TextTitle1 } from '../../typography';
import { Text } from '../../typography/Text';
import { DefaultProgressCircleContent } from '../DefaultProgressCircleContent';
import { ProgressCircle } from '../ProgressCircle';
import { ProgressContainerWithButtons } from '../ProgressContainerWithButtons';

export default {
  component: ProgressCircle,
  title: 'Components/ProgressCircle',
};

export const Default = () => {
  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <HStack gap={2}>
          <ProgressCircle progress={calculateProgress(0)} size={100} />
          <ProgressCircle
            accessibilityLabel="Custom accessibility label for progress circle"
            progress={calculateProgress(0.2)}
            size={100}
          />
        </HStack>
      )}
    </ProgressContainerWithButtons>
  );
};

export const Heavy = () => {
  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <HStack gap={2}>
          <ProgressCircle progress={calculateProgress(0)} size={100} weight="heavy" />
          <ProgressCircle progress={calculateProgress(0.2)} size={100} weight="heavy" />
        </HStack>
      )}
    </ProgressContainerWithButtons>
  );
};

export const NoText = () => {
  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <HStack gap={2}>
          <ProgressCircle hideContent progress={calculateProgress(0)} size={100} />
          <ProgressCircle hideContent progress={calculateProgress(0.2)} size={100} />
        </HStack>
      )}
    </ProgressContainerWithButtons>
  );
};

export const Disabled = () => {
  return (
    <HStack gap={2}>
      <ProgressCircle disabled progress={0} size={100} />
      <ProgressCircle disabled progress={0.2} size={100} />
      <ProgressCircle disabled progress={0.6} size={100} />
      <ProgressCircle disabled progress={1} size={100} />
    </HStack>
  );
};

export const Colors = () => {
  return (
    <HStack gap={2}>
      <ProgressCircle color="bgPositive" progress={0.5} size={100} />
      <ProgressCircle color="bgNegative" progress={0.5} size={100} />
      <ProgressCircle color="bgPrimary" progress={0.5} size={100} />
      <ProgressCircle color="fg" progress={0.5} size={100} />
      <ProgressCircle disabled color="fg" progress={0.5} size={100} />
    </HStack>
  );
};

export const AnimationCallbacks = () => {
  const [animationStatus, setAnimationStatus] = React.useState<string>('Ready');

  const handleAnimationStart = useCallback(() => {
    setAnimationStatus('Animating...');
  }, []);

  const handleAnimationEnd = useCallback(() => {
    setAnimationStatus('Animation Ended');
  }, []);

  return (
    <VStack gap={4}>
      <Text as="p" display="block" font="label1">
        Animation Status: {animationStatus}
      </Text>
      <ProgressContainerWithButtons>
        {({ calculateProgress }) => (
          <HStack gap={2}>
            <ProgressCircle
              onAnimationEnd={handleAnimationEnd}
              onAnimationStart={handleAnimationStart}
              progress={calculateProgress(0.2)}
              size={100}
            />
          </HStack>
        )}
      </ProgressContainerWithButtons>
    </VStack>
  );
};
AnimationCallbacks.parameters = { percy: { enableJavaScript: true } };

export const FillParent = () => {
  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <HStack flexWrap="wrap" gap={2}>
          <div style={{ height: '300px', width: '300px' }}>
            <ProgressCircle progress={calculateProgress(0)} />
          </div>
          <div style={{ height: '200px', width: '200px' }}>
            <ProgressCircle progress={calculateProgress(0.3)} />
          </div>
          <div style={{ height: '100px', width: '100px' }}>
            <ProgressCircle progress={calculateProgress(0.66)} />
          </div>
          <div style={{ height: '75px', width: '75px' }}>
            <ProgressCircle progress={calculateProgress(1)} />
          </div>
          <div style={{ height: '10vw', width: '10vw' }}>
            <ProgressCircle progress={calculateProgress(1)} />
          </div>
        </HStack>
      )}
    </ProgressContainerWithButtons>
  );
};
FillParent.parameters = { percy: { enableJavaScript: true } };

export const CustomTextColor = () => {
  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <HStack gap={2}>
          <ProgressCircle
            color="fgPrimary"
            contentNode={
              <DefaultProgressCircleContent color="fgPrimary" progress={calculateProgress(0.2)} />
            }
            progress={calculateProgress(0.2)}
            size={100}
          />
          <ProgressCircle
            color="fgPositive"
            contentNode={
              <DefaultProgressCircleContent color="fgPositive" progress={calculateProgress(0.2)} />
            }
            progress={calculateProgress(0.2)}
            size={100}
          />
        </HStack>
      )}
    </ProgressContainerWithButtons>
  );
};
CustomTextColor.parameters = { percy: { enableJavaScript: true } };

const progressCss = css`
  stroke: var(--strokeColor);
`;

export const WithAsset = () => {
  return (
    <VStack gap={2}>
      <HStack gap={2}>
        <ProgressCircle
          contentNode={
            <Box height="100%" padding={0.25} width="100%">
              <RemoteImage
                alt={assets.eth.name}
                shape="circle"
                source={assets.eth.imageUrl}
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
          }
          progress={1}
          size={defaultTheme.avatarSize.xxxl}
          styles={{
            progress: {
              stroke: assets.eth.color,
            },
          }}
          weight="thin"
        />
        <ProgressCircle
          contentNode={
            <Box height="100%" padding={0.25} width="100%">
              <RemoteImage
                alt={assets.ltc.name}
                shape="circle"
                source={assets.ltc.imageUrl}
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
          }
          progress={0.75}
          size={defaultTheme.avatarSize.xxxl}
          styles={{
            progress: {
              stroke: assets.ltc.color,
            },
          }}
          weight="thin"
        />
        <ProgressCircle
          contentNode={
            <Box height="100%" padding={0.25} width="100%">
              <RemoteImage
                alt={assets.dai.name}
                shape="circle"
                source={assets.dai.imageUrl}
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
          }
          progress={0.5}
          size={defaultTheme.avatarSize.xxxl}
          styles={{
            progress: {
              stroke: assets.dai.color,
            },
          }}
          weight="thin"
        />
        <ProgressCircle
          contentNode={
            <Box height="100%" padding={0.25} width="100%">
              <RemoteImage
                alt={assets.sushi.name}
                shape="circle"
                source={assets.sushi.imageUrl}
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
          }
          progress={0.25}
          size={defaultTheme.avatarSize.xxxl}
          styles={{
            progress: {
              stroke: assets.sushi.color,
            },
          }}
          weight="thin"
        />
        <ProgressCircle
          contentNode={
            <Box padding={0.25}>
              <RemoteImage
                alt={assets.xrp.name}
                shape="circle"
                source={assets.xrp.imageUrl}
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
          }
          progress={0}
          size={defaultTheme.avatarSize.xxxl}
          styles={{
            progress: {
              stroke: assets.xrp.color,
            },
          }}
          weight="thin"
        />
      </HStack>
      <HStack gap={2}>
        {avatarSizes
          .filter((size) => size !== 's')
          .map((avatarSize) => (
            <ProgressCircle
              key={`${avatarSize}-progress-circle`}
              classNames={{
                progress: progressCss,
              }}
              contentNode={
                <Box height="100%" padding={0.25} width="100%">
                  <RemoteImage
                    alt={assets.btc.name}
                    shape="circle"
                    source={assets.btc.imageUrl}
                    style={{ width: '100%', height: '100%' }}
                  />
                </Box>
              }
              progress={0.24}
              size={defaultTheme.avatarSize[avatarSize]}
              style={
                {
                  '--strokeColor': assets.btc.color,
                } as React.CSSProperties
              }
              weight="thin"
            />
          ))}
      </HStack>
    </VStack>
  );
};

export const CustomStyles = () => {
  const [disabled, setDisabled] = useState(false);
  return (
    <VStack gap={2}>
      <HStack gap={2}>
        <ProgressCircle
          contentNode={<TextTitle1 color={disabled ? 'fgMuted' : 'fgPrimary'}>40%</TextTitle1>}
          disabled={disabled}
          progress={0.4}
          size={100}
          styles={{
            circle: {
              stroke: 'transparent',
            },
          }}
          weight="semiheavy"
        />
        <ProgressCircle
          color="fgPositive"
          contentNode={
            <Icon
              color={disabled ? 'fgMuted' : 'fgPositive'}
              name={disabled ? 'circleCross' : 'circleCheckmark'}
              size="l"
            />
          }
          disabled={disabled}
          progress={0.6}
          size={100}
          styles={{
            progress: {
              strokeLinecap: 'square',
            },
          }}
        />
      </HStack>
      <Button onClick={() => setDisabled(!disabled)}>Toggle Disabled</Button>
    </VStack>
  );
};

export const Thin = () => {
  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <HStack gap={2}>
          <ProgressCircle progress={calculateProgress(0)} size={100} weight="thin" />
          <ProgressCircle progress={calculateProgress(0.2)} size={100} weight="thin" />
        </HStack>
      )}
    </ProgressContainerWithButtons>
  );
};
