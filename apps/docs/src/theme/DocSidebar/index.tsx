import React, { type JSX } from 'react';
import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import { useWindowSizeWithBreakpointOverride } from '@site/src/utils/useWindowSizeWithBreakpointOverride';
import type { Props } from '@theme/DocSidebar';
import DocSidebarDesktop from '@theme/DocSidebar/Desktop';
import DocSidebarMobile from '@theme/DocSidebar/Mobile';

export default function DocSidebar({ sidebar, ...props }: Props): JSX.Element {
  const windowSize = useWindowSizeWithBreakpointOverride();

  const filterItems = (items: PropSidebarItem[] = []): PropSidebarItem[] => {
    return items?.filter((item) => !item.customProps?.hidden).map((item) => item);
  };

  // Filter the sidebar items
  const filteredSidebar = filterItems([...sidebar]);

  // Desktop sidebar visible on hydration: need SSR rendering
  const shouldRenderSidebarDesktop = windowSize === 'desktop' || windowSize === 'ssr';

  // Mobile sidebar not visible on hydration: can avoid SSR rendering
  const shouldRenderSidebarMobile = windowSize === 'mobile';

  return (
    <>
      {shouldRenderSidebarDesktop && <DocSidebarDesktop sidebar={filteredSidebar} {...props} />}
      {shouldRenderSidebarMobile && <DocSidebarMobile sidebar={filteredSidebar} {...props} />}
    </>
  );
}
