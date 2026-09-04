import { useMemo } from 'react';
import { Box, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';
import type { PropSidebarItemLink } from '@docusaurus/plugin-content-docs';
import { useDocsSidebar } from '@docusaurus/plugin-content-docs/lib/client/docsSidebar.js';
import type { PropSidebarItemCategory } from '@docusaurus/plugin-content-docs/lib/sidebars/types.js';
import { AnimatedHeroGrid } from '@site/src/components/home/AnimatedHero/HeroGrid';
import type { ComponentCardProps } from '@site/src/components/home/ComponentCard';
import { ComponentCard } from '@site/src/components/home/ComponentCard';
import type { QuickStartLinkProps } from '@site/src/components/home/QuickStartCampaignCard';
import { QuickStartCampaignCard } from '@site/src/components/home/QuickStartCampaignCard';
import InstallationBannerLight from '@site/static/img/campaignCardBanners/installation.svg';
import InstallationBannerDark from '@site/static/img/campaignCardBanners/installation_dark.svg';
import IntroductionBannerLight from '@site/static/img/campaignCardBanners/introduction.svg';
import IntroductionBannerDark from '@site/static/img/campaignCardBanners/introduction_dark.svg';
import StylingBannerLight from '@site/static/img/campaignCardBanners/styling.svg';
import StylingBannerDark from '@site/static/img/campaignCardBanners/styling_dark.svg';
import ThemingBannerLight from '@site/static/img/campaignCardBanners/theming.svg';
import ThemingBannerDark from '@site/static/img/campaignCardBanners/theming_dark.svg';

const sectionHeaderProps = {
  as: 'h2',
  fontFamily: { base: 'title2', desktop: 'display3' },
  fontSize: { base: 'title2', desktop: 'display3' },
  fontWeight: { base: 'title2', desktop: 'display3' },
  lineHeight: { base: 'title2', desktop: 'display3' },
} as const;

const quickStartCards: QuickStartLinkProps[] = [
  {
    title: 'Introduction',
    description: 'Learn about the purpose, features, and vision behind our component library.',
    link: {
      label: 'Go to Introduction',
      to: '/getting-started/introduction',
    },
    BannerComponentLight: IntroductionBannerLight,
    BannerComponentDark: IntroductionBannerDark,
  },
  {
    title: 'Installation',
    description: 'Get started quickly with our step-by-step installation guide.',
    link: {
      label: 'Go to Installation',
      to: '/getting-started/installation',
    },
    BannerComponentLight: InstallationBannerLight,
    BannerComponentDark: InstallationBannerDark,
  },
  {
    title: 'Theming',
    description: 'Customize your designs with our powerful theming options and guidelines.',
    link: {
      label: 'Go to Theming',
      to: '/getting-started/theming',
    },
    BannerComponentLight: ThemingBannerLight,
    BannerComponentDark: ThemingBannerDark,
  },
  {
    title: 'Styling',
    description: 'Discover the core styling APIs and learn how to combine them seamlessly.',
    link: {
      label: 'Go to Styling',
      to: '/getting-started/styling',
    },
    BannerComponentLight: StylingBannerLight,
    BannerComponentDark: StylingBannerDark,
  },
];

const componentCardLinks = {
  layout: '/components/layout/Box/',
  typography: '/components/typography/Text/',
  inputs: '/components/inputs/Button/',
  media: '/components/media/Icon/',
  overlay: '/components/overlay/Modal/',
};

export default function Home() {
  const { items } = useDocsSidebar() || {};
  const componentCards: ComponentCardProps[] = useMemo(() => {
    const componentCategories = items?.find(
      (item) => item.type === 'category' && item.label === 'Components',
    ) as PropSidebarItemCategory | undefined;
    if (!componentCategories) return [];
    return componentCategories.items
      .map((item) => {
        if (item.type === 'category' && item.label !== 'Animation' && item.label !== 'Other') {
          const categoryName = item.label.toLowerCase().split(' ').join('_');
          const firstItem = item.items?.[0] as PropSidebarItemLink;

          return {
            name: item.label,
            count: item.items?.length,
            bannerLightSrc: `/img/componentCardBanners/${categoryName}_light.svg`,
            bannerLightOverlaySrc: `/img/componentCardBanners/${categoryName}_light_hover.svg`,
            bannerDarkSrc: `/img/componentCardBanners/${categoryName}_dark.svg`,
            bannerDarkOverlaySrc: `/img/componentCardBanners/${categoryName}_dark_hover.svg`,
            to:
              componentCardLinks[categoryName as keyof typeof componentCardLinks] ??
              firstItem?.href,
          };
        }
        return null;
      })
      .filter(Boolean) as ComponentCardProps[];
  }, [items]);

  return (
    <VStack gap={8}>
      <AnimatedHeroGrid />
      <VStack as="section" gap={4}>
        <Text {...sectionHeaderProps}>Quickstarts</Text>
        <Box flexDirection={{ base: 'row', phone: 'column' }} flexWrap="wrap" gap={4}>
          {quickStartCards.map((cardProps) => (
            <QuickStartCampaignCard key={cardProps.title} {...cardProps} />
          ))}
        </Box>
      </VStack>
      <VStack as="section" gap={4}>
        <Text {...sectionHeaderProps}>Components</Text>
        <Box
          columnGap={4}
          flexDirection={{ base: 'row', phone: 'column' }}
          flexWrap="wrap"
          rowGap={5}
        >
          {componentCards.map((cardProps) => (
            <ComponentCard key={cardProps.name} {...cardProps} />
          ))}
        </Box>
      </VStack>
    </VStack>
  );
}
