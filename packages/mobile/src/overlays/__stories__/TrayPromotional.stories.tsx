import React, { memo, useCallback, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { IconName } from '@coinbase/cds-common/types';

import { Button } from '../../buttons/Button';
import { ListCell } from '../../cells/ListCell';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useDimensions } from '../../hooks/useDimensions';
import { Icon } from '../../icons';
import { SpotRectangle } from '../../illustrations';
import { Box, HStack, VStack } from '../../layout';
import { StickyFooter } from '../../sticky-footer/StickyFooter';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import { TextBody } from '../../typography/TextBody';
import { TextTitle1 } from '../../typography/TextTitle1';
import type { DrawerRefBaseProps } from '../drawer/Drawer';
import { Tray, TrayStickyFooter } from '../tray/Tray';

export const Default = () => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const setIsTrayVisibleToFalse = useCallback(() => setIsTrayVisible(false), []);
  const setIsTrayVisibleToTrue = useCallback(() => setIsTrayVisible(true), []);
  const trayRef = useRef<DrawerRefBaseProps>(null);

  const handleTrayVisibilityChange = useCallback((e: 'visible' | 'hidden') => {
    console.log('Tray visibility changed:', e);
  }, []);

  return (
    <>
      <Button onPress={setIsTrayVisibleToTrue}>Open</Button>
      {isTrayVisible && (
        <Tray
          ref={trayRef}
          handleBarAccessibilityLabel="Dismiss"
          onCloseComplete={setIsTrayVisibleToFalse}
          onVisibilityChange={handleTrayVisibilityChange}
        >
          {({ handleClose }) => (
            <TrayStickyFooter>
              <VStack paddingBottom={1} paddingTop={1} paddingX={3}>
                <Box alignItems="center" paddingBottom={3}>
                  <SpotRectangle name="exploreDecentralizedApps" />
                </Box>
                <Text align="center" font="title1" paddingBottom={2}>
                  Earn crypto by lending, staking, and more
                </Text>
                <Text align="center" color="fgMuted" font="body">
                  Many decentralized apps (“dapps”) let you earn yield on your crypto. Check out
                  trusted dapps like Aave and Compound without leaving Coinbaes.
                </Text>
              </VStack>
              <StickyFooter paddingX={3}>
                <Button block onPress={handleClose}>
                  Explore Dapps
                </Button>
              </StickyFooter>
            </TrayStickyFooter>
          )}
        </Tray>
      )}
    </>
  );
};

export const PromotionalTrayScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Promotional Tray">
        <Default />
      </Example>
      <Example title="Credit Card Add Assets Tray">
        <CreditCardAddAssetsTrayExample />
      </Example>
      <Example title="Product Upsell Tray">
        <ProductUpsellTrayExample />
      </Example>
    </ExampleScreen>
  );
};

type TrayContentType = 'addFundsInfo' | 'addAssets';

type QuickAction = {
  name: string;
  title: string;
  description: string;
};

const quickActions: QuickAction[] = [
  {
    name: 'buy',
    title: 'Buy',
    description: 'Buy crypto with cash',
  },
  {
    name: 'transfer',
    title: 'Deposit',
    description: 'Transfer funds from your bank',
  },
  {
    name: 'receive',
    title: 'Receive crypto',
    description: 'From another crypto wallet',
  },
];

const CreditCardAddAssetsTrayExample = () => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const [trayContentType, setTrayContentType] = useState<TrayContentType>('addFundsInfo');
  const setIsTrayVisibleOff = useCallback(() => {
    setTrayContentType('addFundsInfo');
    setIsTrayVisible(false);
  }, []);
  const setIsTrayVisibleOn = useCallback(() => setIsTrayVisible(true), []);

  const handleCTAPress = useCallback(() => {
    setTrayContentType('addAssets');
  }, []);

  return (
    <>
      <Button onPress={setIsTrayVisibleOn}>Open</Button>
      {isTrayVisible && (
        <Tray
          handleBarAccessibilityLabel="Information about rewards details"
          onCloseComplete={setIsTrayVisibleOff}
          title={
            trayContentType === 'addFundsInfo' ? (
              <VStack gap={0.5} paddingTop={3} paddingX={3}>
                <Text font="title3">Lifetime rewards details</Text>
              </VStack>
            ) : null
          }
        >
          {trayContentType === 'addFundsInfo' ? (
            <VStack paddingX={3}>
              <Text font="body">
                Here&apos;s a breakdown of your lifetime rewards earned through your Coinbase Card
                purchases and transactions.
              </Text>
              <VStack paddingTop={3}>
                <Button block onPress={handleCTAPress}>
                  Got it
                </Button>
              </VStack>
            </VStack>
          ) : (
            <VStack>
              {quickActions.map((action) => (
                <ListCell
                  key={action.name}
                  accessory="arrow"
                  description={action.description}
                  onPress={() => alert(`${action.title} pressed`)}
                  spacingVariant="condensed"
                  title={action.title}
                />
              ))}
            </VStack>
          )}
        </Tray>
      )}
    </>
  );
};

const TOP_TRAY_OFFSET = 20;
const SAFE_AREA_OVERFLOW_MULTIPLIER = 2;
const BACKGROUND_COLOR = '#011C92';

type UpsellBenefit = {
  key: string;
  icon: IconName;
  text: string;
};

const UPSELL_BENEFITS: UpsellBenefit[] = [
  { key: '1', icon: 'cash', text: 'Earn rewards on every purchase' },
  { key: '2', icon: 'lock', text: 'No annual fee, ever' },
  { key: '3', icon: 'star', text: 'Instant cashback in crypto' },
];

const UpsellBenefitPoint = memo(function UpsellBenefitPoint({
  icon,
  text,
}: {
  icon: IconName;
  text: string;
}) {
  return (
    <HStack gap={2}>
      <Icon color="fg" name={icon} paddingTop={0.5} size="s" />
      <Box maxWidth="90%">
        <TextBody color="fg">{text}</TextBody>
      </Box>
    </HStack>
  );
});

const ProductUpsellTrayExample = () => {
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const setIsTrayVisibleOff = useCallback(() => setIsTrayVisible(false), []);
  const setIsTrayVisibleOn = useCallback(() => setIsTrayVisible(true), []);

  return (
    <>
      <Button onPress={setIsTrayVisibleOn}>Open</Button>
      {isTrayVisible && (
        <Tray
          handleBarAccessibilityLabel="Product upsell details"
          onCloseComplete={setIsTrayVisibleOff}
          verticalDrawerPercentageOfView={0.95}
        >
          {({ handleClose }) => (
            <ProductUpsellTrayContent benefits={UPSELL_BENEFITS} dismiss={handleClose} />
          )}
        </Tray>
      )}
    </>
  );
};

const ProductUpsellTrayContent = memo(function ProductUpsellTrayContent({
  benefits,
  dismiss,
}: {
  benefits: UpsellBenefit[];
  dismiss: () => void;
}) {
  const { screenWidth } = useDimensions();
  const insets = useSafeAreaInsets();
  const bottom = Platform.OS === 'android' ? Math.max(insets.bottom, 24) : insets.bottom;

  const handlePrimaryCtaPress = useCallback(() => {
    alert('Primary CTA pressed');
    dismiss();
  }, [dismiss]);

  return (
    <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
      <VStack position="relative">
        <Box
          bottom={-bottom * SAFE_AREA_OVERFLOW_MULTIPLIER}
          dangerouslySetBackground={BACKGROUND_COLOR}
          height={bottom * SAFE_AREA_OVERFLOW_MULTIPLIER}
          left={0}
          position="absolute"
          right={0}
          width="100%"
        />
        <Box
          dangerouslySetBackground={BACKGROUND_COLOR}
          height={TOP_TRAY_OFFSET}
          left={0}
          position="absolute"
          right={0}
          top={-TOP_TRAY_OFFSET}
        />
        <VStack dangerouslySetBackground={BACKGROUND_COLOR} gap={4} paddingTop={5} paddingX={3}>
          <Box alignItems="center" justifyContent="center">
            <SpotRectangle name="creditCardExcitement" />
          </Box>

          <VStack>
            <VStack gap={1} paddingBottom={2}>
              <TextTitle1 align="center" color="fg">
                Upgrade your experience
              </TextTitle1>
              <TextBody align="center" color="fg">
                Unlock premium features and earn more rewards.
              </TextBody>
            </VStack>

            <VStack gap={3} paddingY={1}>
              {benefits.map(({ key, ...benefit }) => (
                <UpsellBenefitPoint key={key} {...benefit} />
              ))}
            </VStack>

            <VStack paddingTop={4}>
              <Button block onPress={handlePrimaryCtaPress}>
                Get started
              </Button>
              <Box paddingTop={1}>
                <Button block onPress={dismiss} variant="secondary">
                  Maybe later
                </Button>
              </Box>
              <Box opacity={0.6} paddingTop={2}>
                <TextBody align="center" color="fgMuted">
                  By continuing, you agree to the terms and conditions. Rewards are subject to
                  eligibility requirements.
                </TextBody>
              </Box>
            </VStack>
          </VStack>
        </VStack>
      </VStack>
    </ThemeProvider>
  );
});

export default PromotionalTrayScreen;
