import React, { useMemo } from 'react';
import { Box, Divider, HStack, VStack } from '@cbhq/cds-web/layout';
import { Text } from '@cbhq/cds-web/typography';

import { useDocsTheme } from '../../../theme/Layout/Provider/UnifiedThemeContext';
import { ButtonLink } from '../../ButtonLink';

export type QuickStartLinkProps = {
  title: string;
  description: string;
  link: { label: string; to: string } | { label: string; href: string };
  BannerComponentLight: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  BannerComponentDark: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const cardTitleFontConfig = { base: 'title4', desktop: 'title2' } as const;

export const QuickStartCampaignCard = ({
  title,
  description,
  link,
  BannerComponentLight,
  BannerComponentDark,
}: QuickStartLinkProps) => {
  const { colorScheme } = useDocsTheme();
  const BannerComponent = colorScheme === 'dark' ? BannerComponentDark : BannerComponentLight;
  const destination = useMemo(() => ('to' in link ? link.to : link.href), [link]);

  return (
    <VStack flexBasis="calc(50% - 16px)" gap={2}>
      <Divider />
      <HStack alignItems="flex-start" flexGrow={1} gap={2}>
        <VStack alignSelf="stretch" flexGrow={1} gap={1}>
          <VStack flexGrow={1} gap={{ base: 1, desktop: 1.5 }} paddingEnd={2}>
            <Text
              as="h3"
              fontFamily={cardTitleFontConfig}
              fontSize={cardTitleFontConfig}
              fontWeight={cardTitleFontConfig}
              lineHeight={cardTitleFontConfig}
            >
              {title}
            </Text>
            <Text>{description}</Text>
          </VStack>
          <ButtonLink
            compact
            transparent
            alignSelf="start"
            endIcon="forwardArrow"
            flush="start"
            to={destination}
            variant="primary"
          >
            {link.label}
          </ButtonLink>
        </VStack>
        <Box flexShrink={0} height={{ base: 88, desktop: 140 }} width={{ base: 88, desktop: 140 }}>
          <BannerComponent height="100%" width="100%" />
        </Box>
      </HStack>
    </VStack>
  );
};
