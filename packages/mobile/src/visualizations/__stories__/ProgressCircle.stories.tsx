import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { avatarSizes } from '@coinbase/cds-common/internal/data/avatars';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { Box, HStack, VStack } from '../../layout';
import { RemoteImage } from '../../media';
import { defaultTheme } from '../../themes/defaultTheme';
import { TextTitle1 } from '../../typography';
import { Text } from '../../typography/Text';
import { theme } from '../../utils/testHelpers';
import { DefaultProgressCircleContent } from '../DefaultProgressCircleContent';
import { ProgressCircle } from '../ProgressCircle';
import { ProgressContainerWithButtons } from '../ProgressContainerWithButtons';

const CustomStyles = () => {
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
      <Button onPress={() => setDisabled(!disabled)}>Toggle Disabled</Button>
    </VStack>
  );
};

const AnimationCallbacksExample = () => {
  const [animationStatus, setAnimationStatus] = React.useState<string>('Ready');

  const handleAnimationStart = useCallback(() => {
    setAnimationStatus('Animating...');
  }, []);

  const handleAnimationEnd = useCallback(() => {
    setAnimationStatus('Animation Ended');
  }, []);

  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <VStack gap={2}>
          <Text font="label1">Animation Status: {animationStatus}</Text>
          <HStack gap={2}>
            <ProgressCircle
              onAnimationEnd={handleAnimationEnd}
              onAnimationStart={handleAnimationStart}
              progress={calculateProgress(0.2)}
              size={100}
            />
          </HStack>
        </VStack>
      )}
    </ProgressContainerWithButtons>
  );
};

const ProgressBarScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <HStack gap={1}>
              <ProgressCircle progress={calculateProgress(0)} size={100} />
              <ProgressCircle
                accessibilityLabel="Custom accessibility label for progress circle"
                progress={calculateProgress(0.2)}
                size={100}
              />
            </HStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="Heavy">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <HStack gap={2}>
              <ProgressCircle progress={calculateProgress(0)} size={100} weight="heavy" />
              <ProgressCircle progress={calculateProgress(0.2)} size={100} weight="heavy" />
            </HStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="NoText">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <HStack gap={2}>
              <ProgressCircle hideText progress={calculateProgress(0)} size={100} />
              <ProgressCircle hideText progress={calculateProgress(0.2)} size={100} />
            </HStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="Disabled">
        <HStack gap={2}>
          <ProgressCircle disabled progress={0} size={100} />
          <ProgressCircle disabled progress={0.6} size={100} />
          <ProgressCircle disabled progress={1} size={100} />
        </HStack>
      </Example>
      <Example title="Colors">
        <HStack flexWrap="wrap" gap={2}>
          <ProgressCircle color="bgPositive" progress={0.5} size={100} />
          <ProgressCircle color="bgNegative" progress={0.5} size={100} />
          <ProgressCircle color="bgPrimary" progress={0.5} size={100} />
          <ProgressCircle color="bgInverse" progress={0.5} size={100} />
          <ProgressCircle disabled color="bgInverse" progress={0.5} size={100} />
        </HStack>
      </Example>
      <Example title="FillParent">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <HStack flexWrap="wrap" gap={2}>
              <View style={{ height: 100, width: 100 }}>
                <ProgressCircle progress={calculateProgress(0)} />
              </View>
              <View style={{ height: 200, width: 200 }}>
                <ProgressCircle progress={calculateProgress(0.3)} />
              </View>
              <View style={{ height: 100, width: 100 }}>
                <ProgressCircle progress={calculateProgress(0.66)} />
              </View>
              <View style={{ height: 75, width: 75 }}>
                <ProgressCircle progress={calculateProgress(1)} />
              </View>
            </HStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="Animation Callbacks">
        <AnimationCallbacksExample />
      </Example>
      <Example title="CustomTextColor">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <HStack gap={2}>
              <ProgressCircle
                color="fgPrimary"
                contentNode={
                  <DefaultProgressCircleContent
                    color="fgPrimary"
                    progress={calculateProgress(0.2)}
                  />
                }
                progress={calculateProgress(0.2)}
                size={100}
              />
              <ProgressCircle
                color="fgPositive"
                contentNode={
                  <DefaultProgressCircleContent
                    color="fgPositive"
                    progress={calculateProgress(0.2)}
                  />
                }
                progress={calculateProgress(0.2)}
                size={100}
              />
            </HStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="WithAsset">
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
              <Box height="100%" padding={0.25} width="100%">
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
                contentNode={
                  <Box height="100%" padding={0.25} width="100%">
                    <RemoteImage
                      alt={assets.btc.name}
                      shape="circle"
                      source={assets.btc.imageUrl}
                      style={{ height: '100%', width: '100%' }}
                    />
                  </Box>
                }
                progress={0.24}
                size={theme.avatarSize[avatarSize]}
                styles={{
                  progress: {
                    stroke: assets.btc.color,
                  },
                }}
                weight="thin"
              />
            ))}
        </HStack>
      </Example>
      <Example title="CustomStyles">
        <CustomStyles />
      </Example>
      <Example title="Thin">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <HStack gap={2}>
              <ProgressCircle progress={calculateProgress(0)} size={100} weight="thin" />
              <ProgressCircle progress={calculateProgress(0.2)} size={100} weight="thin" />
            </HStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
    </ExampleScreen>
  );
};

export default ProgressBarScreen;
