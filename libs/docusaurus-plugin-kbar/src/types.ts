import type { IconName, PictogramName, SpotSquareName } from '@coinbase/cds-common/types';
import type { PluginOptions as DocusaurusPluginOptions } from '@docusaurus/plugin-content-docs';
import type { SidebarItem as DocusaurusSidebarItem } from '@docusaurus/plugin-content-docs/lib/sidebars/types.js';
import type { Plugin as DocusaurusPlugin } from '@docusaurus/types';
import type { Action } from 'kbar';
import type { SetOptional } from 'type-fest';

export type Plugin = DocusaurusPlugin;
export type DocsPluginOptions = DocusaurusPluginOptions;

export type KBarAction = Action;
export type KBarCustomAction = KBarAction & {
  slug?: string;
  url?: string;
  pictogram?: PictogramName;
  spotSquare?: SpotSquareName;
  image?: string;
};

export type SidebarItemCustomProps = {
  icon?: IconName;
  kbar?: SetOptional<KBarCustomAction, 'id' | 'name'> & {
    description?: string;
  };
};

export type SidebarItem = DocusaurusSidebarItem & {
  customProps?: SidebarItemCustomProps;
};

export type PluginData = {
  actions: KBarCustomAction[];
};

export type PluginOptions = {
  id?: string;
  docs: DocsPluginOptions;
  actions?: KBarCustomAction[];
};

export {};
