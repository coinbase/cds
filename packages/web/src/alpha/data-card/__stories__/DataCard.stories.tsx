import React, { useRef } from 'react';
import { ethBackground } from '@coinbase/cds-common/internal/data/assets';
import {
  ProgressBar,
  ProgressBarWithFixedLabels,
  ProgressCircle,
} from '@coinbase/cds-web/visualizations';

import { Box } from '../../../layout/Box';
import { VStack } from '../../../layout/VStack';
import { RemoteImage } from '../../../media';
import { Text } from '../../../typography';
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

// Basic Examples
export const BasicExamples = (): JSX.Element => {
  return (
    <VStack gap={2} width={480}>
      <DataCard
        layout="vertical"
        subtitle="Progress indicator"
        thumbnail={exampleThumbnail}
        title="Progress Bar Card"
        titleAccessory={
          <Text color="fgPositive" font="label1">
            ↗ 25.25%
          </Text>
        }
      >
        <Box paddingTop={5}>
          <ProgressBarWithFixedLabels endLabel={45} labelPlacement="below" startLabel={0}>
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
          <Text color="fgPositive" font="label1">
            ↗ 25.25%
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
      <DataCard
        layout="horizontal"
        subtitle="Circular progress"
        thumbnail={exampleThumbnail}
        title="Progress Circle Card with very very very very very long title"
        titleAccessory={
          <Text color="fgPositive" font="label1">
            ↗ 25.25%
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
  );
};

// Features
export const Features = (): JSX.Element => {
  return (
    <VStack gap={2} width={480}>
      <DataCard
        layout="vertical"
        subtitle="High progress with tag"
        thumbnail={exampleThumbnail}
        title="High Progress"
        titleAccessory={
          <Text color="fgPositive" font="label1">
            ↗ 25.25%
          </Text>
        }
      >
        <Box paddingTop={5}>
          <ProgressBarWithFixedLabels endLabel={90} labelPlacement="below" startLabel={0}>
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
        subtitle="High completion"
        thumbnail={exampleThumbnail}
        title="High Completion"
        titleAccessory={
          <Text color="fgPositive" font="label1">
            ↗ 25.25%
          </Text>
        }
      >
        <Box alignItems="center" height="100%">
          <ProgressCircle
            accessibilityLabel="95% complete"
            color="fgPositive"
            progress={0.95}
            size={100}
            weight="heavy"
          />
        </Box>
      </DataCard>
      <DataCard
        layout="horizontal"
        subtitle="Different size"
        thumbnail={exampleThumbnail}
        title="Smaller Circle"
      >
        <Box alignItems="center" height="100%">
          <ProgressCircle
            accessibilityLabel="75% complete"
            progress={0.75}
            size={80}
            weight="heavy"
          />
        </Box>
      </DataCard>
    </VStack>
  );
};

// Interactive
export const Interactive = (): JSX.Element => {
  const ref1 = useRef<HTMLButtonElement>(null);
  const ref2 = useRef<HTMLAnchorElement>(null);
  return (
    <VStack gap={2} width={480}>
      <DataCard
        ref={ref1}
        renderAsPressable
        layout="vertical"
        onClick={() => alert('Progress bar card clicked!')}
        subtitle="Clickable progress card"
        thumbnail={exampleThumbnail}
        title="Progress Bar with Button"
        titleAccessory={
          <Text color="fgPositive" font="label1">
            ↗ 8.5%
          </Text>
        }
      >
        <Box paddingTop={5}>
          <ProgressBarWithFixedLabels endLabel={75} labelPlacement="below" startLabel={0}>
            <ProgressBar accessibilityLabel="75% complete" progress={0.75} weight="semiheavy" />
          </ProgressBarWithFixedLabels>
        </Box>
      </DataCard>
      <DataCard
        ref={ref2}
        renderAsPressable
        as="a"
        href="https://www.coinbase.com"
        layout="horizontal"
        subtitle="Clickable progress circle card with link"
        target="_blank"
        thumbnail={exampleThumbnail}
        title="Progress Circle with Link"
        titleAccessory={
          <Text color="fgMuted" font="label1">
            ↗ 8.5%
          </Text>
        }
      >
        <Box alignItems="center" height="100%">
          <ProgressCircle
            accessibilityLabel="85% complete"
            progress={0.85}
            size={100}
            weight="heavy"
          />
        </Box>
      </DataCard>
    </VStack>
  );
};

// Style Overrides
export const StyleOverrides = (): JSX.Element => {
  return (
    <VStack gap={2} width={480}>
      <DataCard
        layout="vertical"
        styles={{
          root: { borderWidth: 2, borderColor: '#0066FF' },
        }}
        subtitle="Custom border"
        thumbnail={exampleThumbnail}
        title="Custom Root Styles"
      >
        <Box paddingTop={5}>
          <ProgressBarWithFixedLabels endLabel={50} labelPlacement="below" startLabel={0}>
            <ProgressBar accessibilityLabel="50% complete" progress={0.5} weight="semiheavy" />
          </ProgressBarWithFixedLabels>
        </Box>
      </DataCard>
      <DataCard
        layout="horizontal"
        styles={{
          root: { backgroundColor: '#F5F5F5' },
          headerContainer: { paddingInlineStart: 'var(--space-4)' },
        }}
        subtitle="Custom background and padding"
        thumbnail={exampleThumbnail}
        title="Custom Layout Styles"
      >
        <Box alignItems="center" height="100%">
          <ProgressCircle
            accessibilityLabel="70% complete"
            progress={0.7}
            size={100}
            weight="heavy"
          />
        </Box>
      </DataCard>
      <DataCard
        layout="vertical"
        styles={{
          root: { minHeight: 200 },
          layoutContainer: { gap: 'var(--space-3)' },
          titleContainer: { paddingBottom: 'var(--space-2)' },
        }}
        subtitle="Custom spacing and height"
        thumbnail={exampleThumbnail}
        title="Multiple Style Overrides"
      >
        <Box paddingTop={5}>
          <ProgressBarWithFixedLabels endLabel={80} labelPlacement="below" startLabel={0}>
            <ProgressBar accessibilityLabel="80% complete" progress={0.8} weight="semiheavy" />
          </ProgressBarWithFixedLabels>
        </Box>
      </DataCard>
    </VStack>
  );
};

// Multiple Cards
export const MultipleCards = (): JSX.Element => {
  return (
    <VStack gap={2} width={480}>
      <DataCard
        layout="vertical"
        subtitle="Progress tracking"
        thumbnail={exampleThumbnail}
        title="Card 1"
      >
        <Box paddingTop={5}>
          <ProgressBarWithFixedLabels endLabel={100} labelPlacement="beside" startLabel={0}>
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
          <Text color="fgPositive" font="label1">
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
  );
};

export default {
  title: 'Components/Alpha/DataCard',
  component: DataCard,
};
