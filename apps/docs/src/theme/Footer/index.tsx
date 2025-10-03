import React from 'react';
import { Box, HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import type { FooterLinkItem } from '@docusaurus/theme-common';
import { useThemeConfig } from '@docusaurus/theme-common';
import { FooterLink } from '@site/src/components/FooterLink';
import CDSLogo from '@site/static/img/logos/cds_logo.svg';

import { useDocsTheme } from '../Layout/Provider/UnifiedThemeContext';

export default function Footer(): JSX.Element | null {
  const { footer } = useThemeConfig();
  const { colorScheme } = useDocsTheme();

  if (!footer) {
    return null;
  }
  const { links } = footer;

  return (
    <Box
      alignItems="stretch"
      as="footer"
      background="bgAlternate"
      borderRadius={500}
      flexDirection={{ base: 'column', tablet: 'row', desktop: 'row' }}
      gap={{ base: 3, tablet: 0, desktop: 0 }}
      padding={{ base: 3, phone: 2 }}
    >
      <Box
        flexShrink={0}
        height={{ base: 80, tablet: 132, desktop: 132 }}
        padding={{ base: 0, tablet: 2, desktop: 2 }}
        width={{ base: 80, tablet: 132, desktop: 132 }}
      >
        <CDSLogo height="100%" width="100%" />
      </Box>
      <VStack
        flexGrow={1}
        gap={{ base: 5, tablet: 0, desktop: 0 }}
        paddingEnd={{ base: 0, tablet: 5, desktop: 5 }}
        paddingStart={{ base: 0, tablet: 3, desktop: 3 }}
        paddingY={{ base: 0, tablet: 1, desktop: 1 }}
      >
        <Text flexGrow={1}>
          Coinbase Design is an open-source, adaptable system of guidelines, components, and tools
          that aid the best practices of user interface design for crypto products.
        </Text>
        <HStack flexWrap="wrap" gap={3}>
          {(links as FooterLinkItem[]).map(({ label, href }) => (
            <FooterLink key={label} font="headline" href={href}>
              {label}
            </FooterLink>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
}
