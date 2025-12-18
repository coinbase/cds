import React from 'react';
import { assets } from '@coinbase/cds-common/internal/data/assets';

import { Switch } from '../../controls/Switch';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { Icon } from '../../icons/Icon';
import { Pictogram } from '../../illustrations/Pictogram';
import { Box } from '../../layout/Box';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Avatar } from '../../media/Avatar';
import { RemoteImage } from '../../media/RemoteImage';
import { Text } from '../../typography/Text';
import type { CellSpacing } from '../Cell';
import { ContentCell } from '../ContentCell';
import { ContentCellFallback } from '../ContentCellFallback';

const innerSpacingConfig: CellSpacing = { paddingX: 1, marginX: 0 };

const onPressConsole = () => console.log('pressed');

const Content = () => (
  <>
    <ContentCell meta="Meta" spacingVariant="condensed" title="Title" />
    <ContentCell spacingVariant="condensed" subtitle="Subtitle" title="Title" />
    <ContentCell description="Description" meta="Meta" spacingVariant="condensed" title="Title" />
    <ContentCell
      description="Description"
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Title"
    />
    <ContentCell meta="Meta" spacingVariant="condensed" subtitle="Subtitle" />
    <ContentCell description="Description" spacingVariant="condensed" subtitle="Subtitle" />
    <ContentCell description="Description" spacingVariant="condensed" />
  </>
);

const PressableContent = () => (
  <>
    <ContentCell onPress={onPressConsole} spacingVariant="condensed" title="Title" />
    <ContentCell
      onPress={onPressConsole}
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Title"
    />
    <ContentCell
      description="Description"
      innerSpacing={innerSpacingConfig}
      meta="Meta"
      onPress={onPressConsole}
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Title"
    />
    <ContentCell
      description="Description"
      onPress={onPressConsole}
      spacingVariant="condensed"
      subtitle="Subtitle"
    />
    <ContentCell
      selected
      description="Description"
      innerSpacing={innerSpacingConfig}
      meta="Meta"
      onPress={onPressConsole}
      spacingVariant="condensed"
      title="Title"
    />
    <ContentCell
      disabled
      description="Description"
      onPress={onPressConsole}
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Title"
    />
    <ContentCell
      disabled
      selected
      onPress={onPressConsole}
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Title"
    />
  </>
);

const LongContent = () => (
  <>
    <ContentCell
      description="Description also has a very long length that will wrap to 2 lines maximum. This is different from subtitle that only supports 1 line."
      spacingVariant="condensed"
      title="Title with a very long length that wraps to 2 lines in condensed spacing"
    />
    <ContentCell
      accessory="more"
      description="Description also has a very long length that will wrap to 2 lines maximum. This is different from subtitle that only supports 1 line."
      media={<Avatar size="m" src={assets.eth.imageUrl} />}
      spacingVariant="condensed"
      subtitle="Subtitle is short lol"
      title="Title with a very long length that wraps to 2 lines in condensed spacing"
    />
    <ContentCell
      media={<Avatar size="m" src={assets.eth.imageUrl} />}
      meta="Long meta title"
      spacingVariant="condensed"
      title="Title with a very long length that wraps to 2 lines in condensed spacing"
    />
  </>
);

const WithAccessory = () => (
  <>
    <ContentCell accessory="arrow" meta="Meta" spacingVariant="condensed" title="Title" />
    <ContentCell accessory="more" spacingVariant="condensed" subtitle="Subtitle" title="Title" />
    <ContentCell
      accessory="selected"
      description="Description"
      spacingVariant="condensed"
      title="Title"
    />
    <ContentCell
      accessory="arrow"
      description="Description"
      meta="Meta"
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Title"
    />
    <ContentCell
      accessory="more"
      description="Description"
      meta="Meta"
      spacingVariant="condensed"
      subtitle="Subtitle"
    />
    <ContentCell
      accessory="selected"
      description="Description"
      spacingVariant="condensed"
      title="Title"
    />
    <ContentCell accessory="arrow" description="Description" spacingVariant="condensed" />
  </>
);

const WithMedia = () => (
  <>
    <ContentCell
      media={<Icon active name="email" size="s" />}
      spacingVariant="condensed"
      title="Icon"
    />
    <ContentCell
      media={<Icon active name="email" size="s" />}
      onPress={onPressConsole}
      spacingVariant="condensed"
      title="Icon (pressable)"
    />
    <ContentCell
      description="Description"
      media={<Icon name="phone" size="s" />}
      spacingVariant="condensed"
      title="Icon"
    />
    <ContentCell
      description="Description"
      media={<Icon color="fgPrimary" name="phone" size="s" />}
      spacingVariant="condensed"
      title="Icon (With Primary Color)"
    />
    <ContentCell
      description="Description"
      media={<Avatar size="m" src={assets.eth.imageUrl} />}
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Avatar"
    />
    <ContentCell
      description="Description"
      media={
        <RemoteImage
          darkModeEnhancementsApplied
          accessibilityLabel="ETH asset"
          shape="circle"
          size="m"
          source={assets.eth.imageUrl}
        />
      }
      meta="Meta"
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Asset"
    />
    <ContentCell
      media={
        <RemoteImage
          accessibilityLabel="ETH image"
          shape="squircle"
          size="m"
          source={assets.eth.imageUrl}
        />
      }
      meta="Meta"
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Image"
    />
    <ContentCell
      description="Description"
      media={
        <Box alignItems="center" height={48} justifyContent="center" width={48}>
          <Pictogram dimension="48x48" name="shield" />
        </Box>
      }
      spacingVariant="condensed"
      title="Pictogram"
    />
  </>
);

const SpacingVariants = () => (
  <VStack gap={2}>
    <ContentCell
      description="Description"
      meta="Meta"
      onPress={onPressConsole}
      spacingVariant="condensed"
      subtitle="Subtitle"
      title="Condensed spacing"
    />
    <ContentCell
      description="Description"
      meta="Meta"
      onPress={onPressConsole}
      spacingVariant="compact"
      subtitle="Subtitle"
      title="Compact spacing"
    />
    <ContentCell
      description="Description"
      meta="Meta"
      onPress={onPressConsole}
      spacingVariant="normal"
      subtitle="Subtitle"
      title="Normal spacing"
    />
  </VStack>
);

const CondensedContent = () => {
  const theme = useTheme();

  return (
    <VStack gap={3}>
      <ContentCell
        accessory="more"
        description="Concise summary of an item in condensed spacing."
        meta="Updated 2m ago"
        onPress={onPressConsole}
        spacingVariant="condensed"
        subtitle="Subtitle"
        title="Default layout"
      />
      <ContentCell
        description="Opens an external experience"
        meta="External link"
        onPress={onPressConsole}
        spacingVariant="condensed"
        subtitle="Tap to learn more"
        title="Pressable condensed"
      />
      <ContentCell
        description="Avatar media paired with condensed spacing."
        media={<Avatar size="m" src={assets.eth.imageUrl} />}
        meta="ETH"
        spacingVariant="condensed"
        subtitle="Asset overview"
        title="Condensed with media"
      />
      <ContentCell
        descriptionNode={
          <VStack gap={0.5}>
            <Text font="label1">Composable description node</Text>
            <Text color="fgMuted" font="label2">
              Use this slot to render arbitrary React content.
            </Text>
          </VStack>
        }
        metaNode={
          <VStack alignItems="flex-end">
            <Text color="fgPositive" font="label2">
              +4.25%
            </Text>
            <Text color="fgMuted" font="label2">
              Week over week
            </Text>
          </VStack>
        }
        spacingVariant="condensed"
        subtitleNode={
          <Text font="label1">
            Subtitle with{' '}
            <Text underline font="label1">
              inline emphasis
            </Text>
          </Text>
        }
        titleNode={
          <HStack alignItems="center" gap={1}>
            <Text font="headline">Custom nodes</Text>
            <Box
              alignItems="center"
              background="bgSecondary"
              borderRadius={1000}
              paddingX={1}
              paddingY={0.5}
            >
              <Text font="label2">New</Text>
            </Box>
          </HStack>
        }
      />
      <ContentCell
        accessory="arrow"
        description="Applies custom styles to highlight the container."
        media={<Icon name="chartLine" size="s" />}
        spacingVariant="condensed"
        styles={{
          contentContainer: {
            borderColor: theme.color.bgLineHeavy,
            borderWidth: 1,
            paddingVertical: theme.space[2],
          },
          media: {
            alignSelf: 'flex-start',
          },
        }}
        subtitle="Uses styles prop overrides"
        title="Styled condensed cell"
      />
      <ContentCell
        accessory="arrow"
        description="Shows how to combine meta and accessory in condensed layout."
        meta="Meta"
        spacingVariant="condensed"
        subtitle="Subtitle"
        title="Accessory example"
      />
      <ContentCell
        selected
        description="Selected state with condensed spacing and avatar media."
        media={<Avatar size="m" src={assets.eth.imageUrl} />}
        meta="Selected"
        spacingVariant="condensed"
        subtitle="Subtitle"
        title="Selected condensed"
      />
    </VStack>
  );
};

const Fallback = () => {
  const [showFallback, setShowFallback] = React.useState(false);

  return (
    <VStack gap={2}>
      <Switch
        checked={showFallback}
        onChange={(_value: string | undefined, nextChecked?: boolean) =>
          setShowFallback(Boolean(nextChecked))
        }
      >
        Show fallback state
      </Switch>
      {showFallback ? (
        <ContentCellFallback
          description
          disableRandomRectWidth
          meta
          subtitle
          title
          accessory="more"
          media="asset"
          spacingVariant="condensed"
        />
      ) : (
        <ContentCell
          accessory="more"
          description="Review portfolio performance"
          media={<Avatar size="m" src={assets.eth.imageUrl} />}
          meta="Updated just now"
          spacingVariant="condensed"
          subtitle="ETH"
          title="Ethereum"
        />
      )}
    </VStack>
  );
};

const ContentCellScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Content only">
        <Content />
      </Example>
      <Example title="Pressable content">
        <PressableContent />
      </Example>
      <Example title="Long content">
        <LongContent />
      </Example>
      <Example title="With accessory">
        <WithAccessory />
      </Example>
      <Example title="With media">
        <WithMedia />
      </Example>
      <Example title="Spacing variants">
        <SpacingVariants />
      </Example>
      <Example title="Condensed spacing">
        <CondensedContent />
      </Example>
      <Example title="Fallback">
        <Fallback />
      </Example>
    </ExampleScreen>
  );
};

export default ContentCellScreen;
