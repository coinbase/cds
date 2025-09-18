import React from 'react';
import type { Props } from '@theme/DocSidebarItem';
import DocSidebarItemCategory from '@theme/DocSidebarItem/Category';
import DocSidebarItemHtml from '@theme/DocSidebarItem/Html';
import DocSidebarItemLink from '@theme/DocSidebarItem/Link';

export default function DocSidebarItem({ item, ...props }: Props): JSX.Element | null {
  switch (item.type) {
    case 'category':
      return <DocSidebarItemCategory item={item} {...props} />;
    case 'html':
      return <DocSidebarItemHtml item={item} {...props} />;
    case 'link':
    default:
      return <DocSidebarItemLink item={item} {...props} />;
  }
}
