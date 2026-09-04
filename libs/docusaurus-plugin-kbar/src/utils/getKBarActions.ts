import type { LoadedVersion } from '@docusaurus/plugin-content-docs';
import { createAction } from 'kbar';
import kebabCase from 'lodash/kebabCase';
import uniqBy from 'lodash/uniqBy';
import path from 'node:path';

import type { KBarCustomAction, SidebarItem } from '../types';

export function getKBarActions(currentVersion: LoadedVersion): KBarCustomAction[] {
  function getDocInfo(id: string) {
    return currentVersion.docs.find((doc) => doc.id === id);
  }

  function getNameForDoc(id: string) {
    return getDocInfo(id)?.title;
  }

  function getSlugForDoc(id: string) {
    return getDocInfo(id)?.slug;
  }

  function flatten(
    item: SidebarItem,
    parent?: string,
    defaultProps?: Pick<KBarCustomAction, 'pictogram' | 'spotSquare' | 'subtitle' | 'icon'>,
  ): KBarCustomAction[] {
    if (item.type === 'category') {
      const name = item.label;
      const kebabCaseId = kebabCase(name);
      const id = parent ? path.join(parent, kebabCaseId) : kebabCaseId;

      const {
        customProps: { icon, kbar: { spotSquare, pictogram, priority, subtitle } = {} } = {},
      } = item;
      return item.items.flatMap((next) => {
        return [
          {
            parent,
            name,
            id,
            pictogram: pictogram ?? defaultProps?.pictogram,
            spotSquare: spotSquare ?? defaultProps?.spotSquare,
            subtitle: subtitle ?? defaultProps?.subtitle,
            icon: icon ?? defaultProps?.icon,
            priority,
          },
          ...flatten(next, id, { icon }),
        ];
      });
    }

    if (item.type === 'doc') {
      const name = getNameForDoc(item.id);
      if (!name)
        console.log(
          `docusaurus-plugin-kbar ERROR: Could not match name for sidebar doc item ${item.id}`,
        );
      const subtitle = item.customProps?.kbar?.description;
      const priority = item.customProps?.kbar?.priority;
      const icon = item.customProps?.icon;
      return [
        {
          parent,
          id: item.id,
          name: name ?? item.id,
          priority,
          subtitle: subtitle ?? defaultProps?.subtitle,
          icon: icon ?? defaultProps?.icon,
        },
      ];
    }

    if (item.type === 'ref') {
      const name = getNameForDoc(item.id);
      if (!name)
        console.log(
          `docusaurus-plugin-kbar ERROR: Could not match name for sidebar ref item ${item.id}`,
        );
      const subtitle = item.customProps?.kbar?.description;
      const priority = item.customProps?.kbar?.priority;
      return [
        createAction({
          name: name ?? item.id,
          parent,
          subtitle,
          priority,
        }) as unknown as KBarCustomAction,
      ];
    }

    if (item.type === 'link') {
      const name = getNameForDoc(item.label);
      const isExternalLink = item.href?.startsWith('https://') || item.href?.startsWith('http://');
      if (!name && !isExternalLink)
        console.log(
          `docusaurus-plugin-kbar ERROR: Could not match name for sidebar link item ${item.label}`,
        );
      const subtitle = item.customProps?.kbar?.description;
      const priority = item.customProps?.kbar?.priority;
      return [
        {
          ...(createAction({
            name: name ?? item.label,
            parent,
            subtitle,
            priority,
          }) as unknown as KBarCustomAction),
          [isExternalLink ? 'url' : 'slug']: item.href,
        },
      ];
    }

    const name = '';
    return [
      createAction({
        name,
        parent,
      }) as unknown as KBarCustomAction,
    ];
  }

  return uniqBy(
    currentVersion.sidebars.docs
      .filter((item) => item.type === 'category')
      .flatMap((item) => flatten(item)),
    'id',
  ).map((item) => {
    const slug = getSlugForDoc(item.id);
    const frontmatter = getDocInfo(item.id)?.frontMatter;
    return {
      section: 'Documentation',
      slug,
      subtitle: frontmatter?.description,
      keywords: frontmatter?.keywords?.join(' '),
      ...item,
    };
  });
}
