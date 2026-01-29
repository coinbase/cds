import { useRef } from 'react';
import { Alert, type View } from 'react-native';
import { ethBackground } from '@coinbase/cds-common/internal/data/assets';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';

import { Example, ExampleScreen } from '../../../examples/ExampleScreen';
import { useTheme } from '../../../hooks/useTheme';
import { HStack } from '../../../layout';
import { Box } from '../../../layout/Box';
import { VStack } from '../../../layout/VStack';
import { RemoteImage } from '../../../media';
import { Text } from '../../../typography';
import { ProgressBar, ProgressBarWithFixedLabels, ProgressCircle } from '../../../visualizations';
import { DataCard } from '../DataCard';

const exampleThumbnail = (
  <RemoteImage
    accessibilityLabel="Ethereum"
    shape="circle"
    size="l"
    source={ethBackground}
    testID="thumbnail"
  />
);

const renderProgressLabel = (num: number) => (
  <Text color="fgMuted" font="legal">
    {num}%
  </Text>
);

const DataCardScreen = () => {
  const ref1 = useRef<View>(null);
  const ref2 = useRef<View>(null);
  const { spectrum } = useTheme();

  return (
    <ExampleScreen>
      {/* Basic Examples */}
      <Example title="Basic Examples">
        <VStack gap={2}>
          <DataCard
            layout="vertical"
            subtitle="Progress indicator"
            thumbnail={exampleThumbnail}
            title="Progress Bar Card"
            titleAccessory={
              <Text dangerouslySetColor={`rgb(${spectrum.green70})`} font="label1">
                ↗ 25.25%
              </Text>
            }
          >
            <Box paddingTop={6}>
              <ProgressBarWithFixedLabels
                labelPlacement="below"
                startLabel={{ value: 45, render: renderProgressLabel }}
              >
                <ProgressBar accessibilityLabel="45% complete" progress={0.45} weight="semiheavy" />
              </ProgressBarWithFixedLabels>
            </Box>
          </DataCard>
          <DataCard
            layout="horizontal"
            subtitle="Circular progress"
            thumbnail={exampleThumbnail}
            title="Progress Circle Card"
            titleAccessory={
              <Text color="fgNegative" font="label1">
                ↘ 3.12%
              </Text>
            }
          >
            <HStack alignItems="center" height="100%">
              <ProgressCircle
                accessibilityLabel="60% complete"
                progress={0.6}
                size={100}
                weight="heavy"
              />
            </HStack>
          </DataCard>
          <DataCard
            layout="horizontal"
            subtitle="Circular progress"
            thumbnail={exampleThumbnail}
            title="Progress Circle Card with very very very very very long title"
            titleAccessory={
              <Text color="fgNegative" font="label1">
                ↘ 1.8%
              </Text>
            }
          >
            <Box alignItems="center" height="100%">
              <ProgressCircle
                accessibilityLabel="60% complete"
                progress={0.6}
                size={100}
                weight="heavy"
              />
            </Box>
          </DataCard>
        </VStack>
      </Example>

      {/* Features */}
      <Example title="Features">
        <VStack gap={2}>
          <DataCard
            layout="vertical"
            subtitle="High progress with tag"
            thumbnail={exampleThumbnail}
            title="High Progress"
            titleAccessory={
              <Text dangerouslySetColor={`rgb(${spectrum.green70})`} font="label1">
                ↗ 25.25%
              </Text>
            }
          >
            <Box paddingTop={6}>
              <ProgressBarWithFixedLabels
                labelPlacement="below"
                startLabel={{ value: 90, render: renderProgressLabel }}
              >
                <ProgressBar
                  accessibilityLabel="90% complete"
                  color="fgPositive"
                  progress={0.9}
                  weight="semiheavy"
                />
              </ProgressBarWithFixedLabels>
            </Box>
          </DataCard>
          <DataCard
            layout="horizontal"
            subtitle="Below target"
            thumbnail={exampleThumbnail}
            title="Below Target"
            titleAccessory={
              <Text color="fgNegative" font="label1">
                ↘ 5.2%
              </Text>
            }
          >
            <HStack alignItems="center" height="100%">
              <ProgressCircle
                accessibilityLabel="95% complete"
                color="fgPositive"
                progress={0.95}
                size={100}
                weight="heavy"
              />
            </HStack>
          </DataCard>
          <DataCard
            layout="horizontal"
            subtitle="Different size"
            thumbnail={exampleThumbnail}
            title="Smaller Circle"
          >
            <HStack alignItems="center" height="100%">
              <ProgressCircle
                accessibilityLabel="75% complete"
                progress={0.75}
                size={80}
                weight="heavy"
              />
            </HStack>
          </DataCard>
        </VStack>
      </Example>

      {/* Interactive */}
      <Example title="Interactive">
        <VStack gap={2}>
          <DataCard
            ref={ref1}
            renderAsPressable
            accessibilityLabel="View progress bar details"
            layout="vertical"
            onPress={() => Alert.alert('Progress bar card clicked!')}
            subtitle="Clickable progress card"
            thumbnail={exampleThumbnail}
            title="Progress Bar with Button"
            titleAccessory={
              <Text dangerouslySetColor={`rgb(${spectrum.green70})`} font="label1">
                ↗ 8.5%
              </Text>
            }
          >
            <Box paddingTop={6}>
              <ProgressBarWithFixedLabels
                labelPlacement="below"
                startLabel={{ value: 75, render: renderProgressLabel }}
              >
                <ProgressBar accessibilityLabel="75% complete" progress={0.75} weight="semiheavy" />
              </ProgressBarWithFixedLabels>
            </Box>
          </DataCard>
          <DataCard
            ref={ref2}
            renderAsPressable
            accessibilityLabel="View progress circle details"
            layout="horizontal"
            onPress={NoopFn}
            subtitle="Clickable progress circle card"
            thumbnail={exampleThumbnail}
            title="Progress Circle with Button"
            titleAccessory={
              <Text color="fgNegative" font="label1">
                ↘ 8.5%
              </Text>
            }
          >
            <HStack alignItems="center" height="100%">
              <ProgressCircle
                accessibilityLabel="85% complete"
                progress={0.85}
                size={100}
                weight="heavy"
              />
            </HStack>
          </DataCard>
        </VStack>
      </Example>

      {/* Style Overrides */}
      <Example title="Style Overrides">
        <VStack gap={2}>
          <DataCard
            layout="vertical"
            styles={{
              root: { borderWidth: 2, borderColor: '#0066FF' },
            }}
            subtitle="Custom border"
            thumbnail={exampleThumbnail}
            title="Custom Root Styles"
          >
            <Box paddingTop={6}>
              <ProgressBarWithFixedLabels
                labelPlacement="below"
                startLabel={{ value: 50, render: renderProgressLabel }}
              >
                <ProgressBar accessibilityLabel="50% complete" progress={0.5} weight="semiheavy" />
              </ProgressBarWithFixedLabels>
            </Box>
          </DataCard>
          <DataCard
            layout="horizontal"
            styles={{
              root: { backgroundColor: '#F5F5F5' },
              headerContainer: { paddingLeft: 16 },
            }}
            subtitle="Custom background and padding"
            thumbnail={exampleThumbnail}
            title="Custom Layout Styles"
          >
            <HStack alignItems="center" height="100%">
              <ProgressCircle
                accessibilityLabel="70% complete"
                progress={0.7}
                size={100}
                weight="heavy"
              />
            </HStack>
          </DataCard>
          <DataCard
            layout="vertical"
            styles={{
              root: { minHeight: 200 },
              layoutContainer: { gap: 12 },
              titleContainer: { paddingBottom: 8 },
            }}
            subtitle="Custom spacing and height"
            thumbnail={exampleThumbnail}
            title="Multiple Style Overrides"
          >
            <Box paddingTop={6}>
              <ProgressBarWithFixedLabels
                labelPlacement="below"
                startLabel={{ value: 80, render: renderProgressLabel }}
              >
                <ProgressBar accessibilityLabel="80% complete" progress={0.8} weight="semiheavy" />
              </ProgressBarWithFixedLabels>
            </Box>
          </DataCard>
        </VStack>
      </Example>

      {/* Multiple Cards */}
      <Example title="Multiple Cards">
        <VStack gap={2}>
          <DataCard
            layout="vertical"
            subtitle="Progress tracking"
            thumbnail={exampleThumbnail}
            title="Card 1"
          >
            <Box paddingTop={6}>
              <ProgressBarWithFixedLabels
                labelPlacement="below"
                startLabel={{ value: 30, render: renderProgressLabel }}
              >
                <ProgressBar accessibilityLabel="30% complete" progress={0.3} weight="semiheavy" />
              </ProgressBarWithFixedLabels>
            </Box>
          </DataCard>
          <DataCard
            layout="horizontal"
            subtitle="Completion status"
            thumbnail={exampleThumbnail}
            title="Card 2"
            titleAccessory={
              <Text dangerouslySetColor={`rgb(${spectrum.green70})`} font="label1">
                ↗ 25.25%
              </Text>
            }
          >
            <Box alignItems="center" height="100%">
              <ProgressCircle
                accessibilityLabel="95% complete"
                progress={0.95}
                size={120}
                weight="heavy"
              />
            </Box>
          </DataCard>
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default DataCardScreen;
