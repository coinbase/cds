import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { assets, ethBackground } from '@coinbase/cds-common/internal/data/assets';
import { subheadIconSignMap } from '@coinbase/cds-common/tokens/sparkline';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';

import { DotStatusColor } from '../../dots';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { Carousel } from '../../media';
import { Text } from '../../typography/Text';
import type { ContainedAssetCardProps } from '../ContainedAssetCard';
import { ContainedAssetCard } from '../ContainedAssetCard';

const styles = StyleSheet.create({
  media: {
    width: 32,
    height: 32,
    objectFit: 'cover',
    borderRadius: 100,
  },
  children: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const exampleProps: ContainedAssetCardProps = {
  title: '$0.87',
  description: '10%',
  subtitle: 'UNI',
  header: (
    <Image
      accessibilityIgnoresInvertColors
      source={{
        uri: ethBackground,
      }}
      style={styles.media}
    />
  ),
  onPress: NoopFn,
};

const ContainedAssetCardScreen = () => {
  const theme = useTheme();
  const customUpwardTrendColor = `rgb(${theme.spectrum.green60})`;

  return (
    <ExampleScreen>
      <Example title="ContainedAssetCard">
        <ContainedAssetCard {...exampleProps} />
      </Example>
      <Example title="ContainedAssetCard large">
        <ContainedAssetCard {...exampleProps} size="l" />
      </Example>
      <Example title="ContainedAssetCard large with child">
        <ContainedAssetCard {...exampleProps} size="l">
          <Image
            accessibilityIgnoresInvertColors
            source={{
              uri: ethBackground,
            }}
            style={styles.children}
          />
        </ContainedAssetCard>
      </Example>
      <Example title="ContainedAssetCard with long text">
        <ContainedAssetCard
          {...exampleProps}
          description="This is a very long description text that will get truncated"
          size="l"
          subtitle="This is a very long subtitle text that will get truncated"
          title="This is a very long title text that will get truncated"
        >
          <Image
            accessibilityIgnoresInvertColors
            source={{
              uri: ethBackground,
            }}
            style={styles.children}
          />
        </ContainedAssetCard>
      </Example>
      <Example title="ContainedAssetCard with custom text nodes">
        <ContainedAssetCard
          {...exampleProps}
          description={
            <Text
              accessibilityLabel="Up 6.37%"
              font="label2"
              style={{ color: customUpwardTrendColor }}
            >
              {subheadIconSignMap.upwardTrend}6.37%
            </Text>
          }
          header={
            <Image
              accessibilityIgnoresInvertColors
              source={{
                uri: assets.uni.imageUrl,
              }}
              style={styles.media}
            />
          }
          subtitle="UNI"
          title="$0.87"
        />
      </Example>
      <Example title="Carousel">
        <Carousel
          gap={1.5}
          items={[
            <ContainedAssetCard key="carouselItem1" {...exampleProps} />,
            <ContainedAssetCard key="carouselItem2" {...exampleProps} size="l" />,
            <ContainedAssetCard key="carouselItem3" {...exampleProps} size="l">
              <Image
                accessibilityIgnoresInvertColors
                source={{
                  uri: ethBackground,
                }}
                style={styles.children}
              />
            </ContainedAssetCard>,
          ]}
        />
      </Example>
      <Example title="Card with DotColorStatusHeader">
        <ContainedAssetCard
          {...exampleProps}
          header={
            <DotStatusColor overlap="circular" pin="top-end" size="xs" variant="negative">
              {exampleProps.header}
            </DotStatusColor>
          }
        />
      </Example>
      <Example title="ContainedAssetCard with no max width">
        <ContainedAssetCard {...exampleProps} maxWidth="none" />
      </Example>
    </ExampleScreen>
  );
};

export default ContainedAssetCardScreen;
