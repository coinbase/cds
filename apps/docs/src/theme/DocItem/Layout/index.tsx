import { useMemo } from 'react';
import { VStack } from '@coinbase/cds-web/layout';
import type { DocFrontMatter } from '@docusaurus/plugin-content-docs';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useWindowSize } from '@docusaurus/theme-common';
import { FeedbackWidget } from '@site/src/components/FeedbackWidget';
import { PlatformSwitcher } from '@site/src/components/page/PlatformSwitcher';
import { PlatformContextProvider } from '@site/src/utils/PlatformContext';
import { usePropsTOC } from '@site/src/utils/toc/PropsTOCManager';
import { useTOC } from '@site/src/utils/toc/TOCManager';
import ContentVisibility from '@theme/ContentVisibility';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import DocItemContent from '@theme/DocItem/Content';
import DocItemFooter from '@theme/DocItem/Footer';
import type { Props } from '@theme/DocItem/Layout';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocVersionBanner from '@theme/DocVersionBanner';
import Footer from '@theme/Footer';

type DocFrontMatterExtended = DocFrontMatter & {
  platform_switcher_options?: { web: boolean; mobile: boolean };
};

export default function DocItemLayout({ children }: Props): JSX.Element {
  const { frontMatter, toc, metadata } = useDoc();
  const { items: propsTocItems = [] } = usePropsTOC();
  const { items: tocItems = [] } = useTOC();
  const updatedTocItems = useMemo(
    () => [...toc, ...tocItems, ...propsTocItems],
    [toc, tocItems, propsTocItems],
  );
  const typedFrontMatter = frontMatter as DocFrontMatterExtended;

  const windowSize = useWindowSize({ desktopBreakpoint: 1280 });
  const isDesktop = windowSize === 'desktop' || windowSize === 'ssr';
  const isMobile = windowSize === 'mobile';

  const shouldRenderToc = !frontMatter.hide_table_of_contents && updatedTocItems.length > 0;
  const shouldRenderPlatformSwitcher =
    typedFrontMatter.platform_switcher_options?.mobile ||
    typedFrontMatter.platform_switcher_options?.web ||
    false;

  const contentMaxWidth = useMemo(
    () => ({
      desktop:
        (shouldRenderPlatformSwitcher || shouldRenderToc) && isDesktop
          ? `calc(100% - var(--table-of-content-width) - 2.5rem)`
          : '100%',
      base: '100%',
    }),
    [isDesktop, shouldRenderPlatformSwitcher, shouldRenderToc],
  );
  return (
    <PlatformContextProvider>
      <VStack maxWidth={contentMaxWidth}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <VStack>
          <VStack gap={{ base: 10, phone: 4 }}>
            <VStack as="article" gap={{ base: 5, phone: 2 }}>
              <DocBreadcrumbs />
              <DocVersionBadge />
              {isMobile && shouldRenderPlatformSwitcher && <PlatformSwitcher />}
              <DocItemContent>{children}</DocItemContent>
              <FeedbackWidget />
              <DocItemFooter />
            </VStack>
            <Footer />
          </VStack>
          <DocItemPaginator />
        </VStack>
      </VStack>
      {isDesktop && (shouldRenderPlatformSwitcher || shouldRenderToc) && (
        <VStack
          flexBasis="var(--table-of-content-width)"
          flexGrow={0}
          flexShrink={0}
          gap={4}
          maxHeight="calc(100vh - var(--ifm-navbar-height) - 3rem)"
          overflow="hidden"
          position="sticky"
          top="calc(var(--ifm-navbar-height) + 1.5rem)"
        >
          {shouldRenderPlatformSwitcher && <PlatformSwitcher />}
          <VStack gap={2} overflow="auto">
            {shouldRenderToc && <DocItemTOCDesktop />}
          </VStack>
        </VStack>
      )}
    </PlatformContextProvider>
  );
}
