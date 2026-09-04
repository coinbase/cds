import React from 'react';
import { HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import Link from '@docusaurus/Link';

import { useDocsTheme } from '../../../theme/Layout/Provider/UnifiedThemeContext';

import styles from './styles.module.css';

const componentNameFontConfig = { base: 'title4', desktop: 'title4' } as const;
const componentCountFontConfig = { base: 'headline', desktop: 'headline' } as const;

export type ComponentCardProps = {
  name: string;
  count: number;
  bannerLightSrc: string;
  bannerLightOverlaySrc: string;
  bannerDarkSrc: string;
  bannerDarkOverlaySrc: string;
  to: string;
};

export const ComponentCard = ({
  name,
  count,
  bannerDarkSrc,
  bannerLightSrc,
  bannerDarkOverlaySrc,
  bannerLightOverlaySrc,
  to,
}: ComponentCardProps) => {
  const { colorScheme } = useDocsTheme();
  const bannerSrc = colorScheme === 'dark' ? bannerDarkSrc : bannerLightSrc;
  const bannerOverlaySrc = colorScheme === 'dark' ? bannerDarkOverlaySrc : bannerLightOverlaySrc;
  return (
    <VStack
      as={Link}
      background="bgSecondary"
      borderRadius={400}
      className={styles.cardWrapper}
      flexBasis="calc(50% - 16px)"
      overflow="hidden"
      role="button"
      textDecoration="none"
      to={to}
    >
      {/* use background image here to stack images without using absolute position */}
      <div className={styles.cardBannerArt} style={{ backgroundImage: `url(${bannerSrc})` }}>
        <img alt="" className={styles.cardBannerArtOverlay} src={bannerOverlaySrc} />
      </div>
      <HStack
        alignItems="start"
        flexGrow={0}
        justifyContent="space-between"
        paddingX={2}
        paddingY={1.5}
      >
        <Text
          accessibilityLabel={`${name} components`}
          as="h3"
          className={styles.componentName}
          color="fg"
          fontFamily={componentNameFontConfig}
          fontSize={componentNameFontConfig}
          fontWeight={componentNameFontConfig}
          lineHeight={componentNameFontConfig}
        >
          {name}
        </Text>
        <Text
          accessibilityLabel={`${count} total`}
          borderRadius={100}
          color="fgMuted"
          fontFamily={componentCountFontConfig}
          fontSize={componentCountFontConfig}
          fontWeight={componentCountFontConfig}
          lineHeight={componentCountFontConfig}
          paddingX={0.5}
          paddingY={0.25}
          style={{ backgroundColor: `rgb(var(--gray${colorScheme === 'dark' ? '5' : '15'}))` }}
        >
          {count}
        </Text>
      </HStack>
    </VStack>
  );
};
