import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import type { BoxShadowValue, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { ElevationLevels } from '@coinbase/cds-common/types/ElevationLevels';
import { Button } from '@coinbase/cds-mobile/buttons/Button';
import { ListCell } from '@coinbase/cds-mobile/cells/ListCell';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Box } from '@coinbase/cds-mobile/layout/Box';
import { VStack } from '@coinbase/cds-mobile/layout/VStack';
import type { DrawerRefBaseProps } from '@coinbase/cds-mobile/overlays/drawer/Drawer';
import { Tray } from '@coinbase/cds-mobile/overlays/tray/Tray';
import { StickyFooter } from '@coinbase/cds-mobile/sticky-footer/StickyFooter';
import { Text } from '@coinbase/cds-mobile/typography/Text';

const swatchSize = 96;
const swatchStyle = { width: swatchSize, height: swatchSize };
const scrollContentContainerStyle = { flexGrow: 1 };

const elevationSwatchWidth = 160;
const elevationSwatchHeight = 72;

type ElevationExampleProps = {
  elevation: Exclude<ElevationLevels, 0>;
};

/**
 * Renders straight from `theme.shadow`, so this section tracks whatever the default theme defines.
 * Swap a token over to `boxShadow` and the change shows up here without touching this file.
 */
const ElevationExample = memo(({ elevation }: ElevationExampleProps) => {
  const theme = useTheme();

  const shadowToken = `elevation${elevation}` as ThemeVars.Shadow;
  const token = theme.shadow[shadowToken];

  return (
    <VStack gap={1}>
      <Text font="label1">{`elevation={${elevation}}`}</Text>
      <Text color="fgMuted" font="legal">
        {`theme.shadow.${shadowToken}: ${JSON.stringify(token)}`}
      </Text>
      <Box
        borderRadius={300}
        elevation={elevation}
        height={elevationSwatchHeight}
        testID={`elevation-${elevation}`}
        width={elevationSwatchWidth}
      />
    </VStack>
  );
});

const elevationLevels: readonly Exclude<ElevationLevels, 0>[] = [1, 2];

const trayRowCount = 20;
const trayScrollContentStyle = { paddingBottom: 24 };

/**
 * The Tray header and the StickyFooter are flex siblings of the scroll content rather than
 * overlapping layers, so their shadows spill into the neighbouring box. This is the case where
 * Android's elevation draw-order role would matter, if it is doing any work at all.
 */
const TrayElevationExample = memo(() => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContentOpaque, setIsContentOpaque] = useState(false);
  const trayRef = useRef<DrawerRefBaseProps>(null);

  const openTray = useCallback(() => setIsTrayVisible(true), []);
  const closeTray = useCallback(() => setIsTrayVisible(false), []);
  const toggleContentOpacity = useCallback(() => setIsContentOpaque((prev) => !prev), []);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIsScrolled(event.nativeEvent.contentOffset.y > 0);
  }, []);

  const renderFooter = useCallback(
    ({ handleClose }: { handleClose: () => void }) => (
      <StickyFooter background="bgElevation2" elevation={1}>
        <Button block onPress={handleClose}>
          Close
        </Button>
      </StickyFooter>
    ),
    [],
  );

  return (
    <VStack gap={1}>
      <Text font="label1">{`headerElevation={isScrolled ? 2 : 0}`}</Text>
      <Text color="fgMuted" font="legal">
        Scroll the list inside the tray. The header rises to elevation 2 and the sticky footer sits
        at elevation 1 — watch whether either shadow renders over the scrolling content.
      </Text>
      <Button onPress={toggleContentOpacity} variant="secondary">
        {`Scroll content: ${isContentOpaque ? 'opaque' : 'transparent'}`}
      </Button>
      <Button onPress={openTray}>Open tray</Button>
      {isTrayVisible && (
        <Tray
          ref={trayRef}
          disableSafeAreaPaddingBottom
          accessibilityLabel="Elevation demo tray"
          footer={renderFooter}
          handleBarAccessibilityLabel="Drag to resize or dismiss the tray"
          handleBarVariant="inside"
          headerElevation={isScrolled ? 2 : 0}
          onCloseComplete={closeTray}
          title="Scroll to raise the header"
          verticalDrawerPercentageOfView={0.9}
        >
          <ScrollView
            contentContainerStyle={trayScrollContentStyle}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {/* An opaque wrapper is the discriminator: a transparent sibling cannot cover the
                header's shadow, so only an opaque one reveals whether elevation reorders the draw. */}
            <Box background={isContentOpaque ? 'bgAlternate' : undefined}>
              {Array.from({ length: trayRowCount }, (_, index) => (
                <ListCell key={index} description="Description" title={`Row ${index + 1}`} />
              ))}
            </Box>
          </ScrollView>
        </Tray>
      )}
    </VStack>
  );
});

type BoxShadowExampleProps = {
  title: string;
  description: string;
  boxShadow: readonly BoxShadowValue[] | string;
};

const BoxShadowExample = memo(({ title, description, boxShadow }: BoxShadowExampleProps) => {
  const style = useMemo(() => ({ ...swatchStyle, boxShadow }), [boxShadow]);

  return (
    <VStack gap={1}>
      <Text font="label1">{title}</Text>
      <Text color="fgMuted" font="legal">
        {description}
      </Text>
      <Box
        background="bgAlternate"
        borderRadius={200}
        style={style}
        testID={`box-shadow-${title}`}
      />
    </VStack>
  );
});

const stringShorthandShadow = '10px 10px 5px rgba(0, 0, 0, 0.3)';
const insetStringShorthandShadow = 'inset 0px 6px 12px rgba(0, 0, 0, 0.45)';

const objectFormShadow: readonly BoxShadowValue[] = [
  { offsetX: 10, offsetY: 10, blurRadius: 5, spreadDistance: 0, color: 'rgba(0, 0, 0, 0.3)' },
];

const negativeOffsetShadow: readonly BoxShadowValue[] = [
  { offsetX: -14, offsetY: -14, blurRadius: 6, color: 'rgba(0, 0, 0, 0.35)' },
];

const horizontalOnlyOffsetShadow: readonly BoxShadowValue[] = [
  { offsetX: 18, offsetY: 0, blurRadius: 6, color: 'rgba(0, 0, 0, 0.35)' },
];

const noBlurShadow: readonly BoxShadowValue[] = [
  { offsetX: 0, offsetY: 8, blurRadius: 0, color: 'rgba(0, 0, 0, 0.35)' },
];

const largeBlurShadow: readonly BoxShadowValue[] = [
  { offsetX: 0, offsetY: 8, blurRadius: 32, color: 'rgba(0, 0, 0, 0.35)' },
];

const positiveSpreadShadow: readonly BoxShadowValue[] = [
  { offsetX: 0, offsetY: 8, blurRadius: 8, spreadDistance: 10, color: 'rgba(0, 0, 0, 0.3)' },
];

const negativeSpreadShadow: readonly BoxShadowValue[] = [
  { offsetX: 0, offsetY: 14, blurRadius: 8, spreadDistance: -8, color: 'rgba(0, 0, 0, 0.55)' },
];

const insetObjectShadow: readonly BoxShadowValue[] = [
  { offsetX: 0, offsetY: 6, blurRadius: 12, color: 'rgba(0, 0, 0, 0.45)', inset: true },
];

const insetAndOuterShadow: readonly BoxShadowValue[] = [
  { offsetX: 0, offsetY: 4, blurRadius: 8, color: 'rgba(0, 0, 0, 0.4)', inset: true },
  { offsetX: 0, offsetY: 10, blurRadius: 14, color: 'rgba(0, 0, 0, 0.3)' },
];

const stackedShadows: readonly BoxShadowValue[] = [
  { offsetX: -12, offsetY: -12, blurRadius: 10, color: 'rgba(255, 0, 90, 0.5)' },
  { offsetX: 0, offsetY: 0, blurRadius: 10, color: 'rgba(0, 200, 120, 0.5)' },
  { offsetX: 12, offsetY: 12, blurRadius: 10, color: 'rgba(0, 90, 255, 0.5)' },
];

const examples: readonly BoxShadowExampleProps[] = [
  {
    title: 'String shorthand',
    description: `boxShadow: '${stringShorthandShadow}'`,
    boxShadow: stringShorthandShadow,
  },
  {
    title: 'Object form',
    description: 'offsetX 10, offsetY 10, blurRadius 5, spreadDistance 0',
    boxShadow: objectFormShadow,
  },
  {
    title: 'Negative offsets',
    description: 'offsetX -14, offsetY -14, blurRadius 6',
    boxShadow: negativeOffsetShadow,
  },
  {
    title: 'Horizontal offset only',
    description: 'offsetX 18, offsetY 0, blurRadius 6',
    boxShadow: horizontalOnlyOffsetShadow,
  },
  {
    title: 'No blur',
    description: 'offsetY 8, blurRadius 0 — hard edged shadow',
    boxShadow: noBlurShadow,
  },
  {
    title: 'Large blur',
    description: 'offsetY 8, blurRadius 32',
    boxShadow: largeBlurShadow,
  },
  {
    title: 'Positive spread',
    description: 'offsetY 8, blurRadius 8, spreadDistance 10',
    boxShadow: positiveSpreadShadow,
  },
  {
    title: 'Negative spread',
    description: 'offsetY 14, blurRadius 8, spreadDistance -8',
    boxShadow: negativeSpreadShadow,
  },
  {
    title: 'Inset (object form)',
    description: 'offsetY 6, blurRadius 12, inset true',
    boxShadow: insetObjectShadow,
  },
  {
    title: 'Inset (string shorthand)',
    description: `boxShadow: '${insetStringShorthandShadow}'`,
    boxShadow: insetStringShorthandShadow,
  },
  {
    title: 'Inset plus outer',
    description: 'One inset shadow stacked with one outer shadow',
    boxShadow: insetAndOuterShadow,
  },
  {
    title: 'Multiple stacked shadows',
    description: 'Three shadows in one array — first entry paints on top',
    boxShadow: stackedShadows,
  },
];

export const BoxShadowScreen = memo(() => {
  const theme = useTheme();

  const themedShadow = useMemo<readonly BoxShadowValue[]>(
    () => [
      { offsetX: 0, offsetY: 10, blurRadius: 16, spreadDistance: -4, color: theme.color.bgPrimary },
      { offsetX: 0, offsetY: 2, blurRadius: 4, color: theme.color.bgLineHeavy },
    ],
    [theme.color.bgPrimary, theme.color.bgLineHeavy],
  );

  const elevationItems = useMemo(
    () =>
      elevationLevels.map((elevation) => (
        <ElevationExample key={elevation} elevation={elevation} />
      )),
    [],
  );

  const exampleItems = useMemo(
    () =>
      examples.map(({ title, description, boxShadow }) => (
        <BoxShadowExample
          key={title}
          boxShadow={boxShadow}
          description={description}
          title={title}
        />
      )),
    [],
  );

  return (
    <Box background="bg" flexGrow={1}>
      <ScrollView contentContainerStyle={scrollContentContainerStyle}>
        <Box height={160} width={220}>
          <Box
            background="bgPrimary"
            elevation={0}
            height={80}
            left={0}
            position="absolute"
            top={0}
            width={140}
          />
          <Box
            background="bgPositive"
            height={80}
            left={40}
            position="absolute"
            top={40}
            width={140}
          />
        </Box>
        <VStack gap={2} paddingBottom={2} paddingTop={2} paddingX={3}>
          <Text font="title3">CDS elevation tokens</Text>
          <Text color="fgMuted" font="body">
            A CDS Box at each elevation the design system defines, rendered from the active theme.
          </Text>
        </VStack>
        <VStack gap={6} paddingBottom={4} paddingTop={4} paddingX={3}>
          {elevationItems}
        </VStack>
        <VStack gap={2} paddingBottom={2} paddingTop={2} paddingX={3}>
          <Text font="title3">Elevation in a Tray</Text>
          <Text color="fgMuted" font="body">
            Header and sticky footer shadows against scrolling content — the sibling-overlap case.
          </Text>
        </VStack>
        <VStack gap={6} paddingBottom={4} paddingTop={4} paddingX={3}>
          <TrayElevationExample />
        </VStack>
        <VStack gap={2} paddingBottom={2} paddingTop={2} paddingX={3}>
          <Text font="title3">React Native boxShadow</Text>
          <Text color="fgMuted" font="body">
            Each swatch is a CDS Box with a different `boxShadow` view style. Requires the New
            Architecture.
          </Text>
        </VStack>
        <VStack gap={6} paddingBottom={10} paddingTop={4} paddingX={3}>
          {exampleItems}
          <BoxShadowExample
            boxShadow={themedShadow}
            description="Two shadows tinted with theme.color.bgPrimary and theme.color.bgLineHeavy"
            title="Theme colors"
          />
        </VStack>
      </ScrollView>
    </Box>
  );
});
