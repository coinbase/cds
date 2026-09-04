export type { Plugin } from '@docusaurus/types';
import type { Method, ParentType } from 'react-docgen-typescript/lib/parser';

/* -------------------------------------------------------------------------- */
/*                               Plugin options                               */
/* -------------------------------------------------------------------------- */

export type PluginOptions = {
  id?: string;
  /**
   * Directory to output codegenerated doc scaffolds.
   * Path should be relative path to root of docusaurus project. i.e. docs/api.
   * If no path is provided that plugin will not output any files outside of temporary
   * plugin directory, which you can pull in and customize how API data is presented.
   */
  docsDir?: string;
  /**
   * Determines if plugin should run. Set to false to disable docgen entirely.
   * @default true
   */
  enabled?: boolean;
  /**
   * Absolute paths to tsconfig.json's for any projects that sourceFiles belong to.
   * When the plugin is run it will loop through each tsconfig and determine
   * which sourceFiles are present in those packages.
   */
  entryPoints: string[];
  /**
   * When you use the templates from plugin, if there are two components with the same name coming from
   * two separate projects (cross platform), it will group those components together and use toggle to switch between them.
   * This formatPackageName will allow you to customize how that toggle is displayed.
   * i.e. remove `@coinbase-cds` scope from `@coinbase/cds-mobile` and `@coinbase/cds-web` so it returns just 'mobile' and 'web'.
   */
  formatPackageName?: (name: string) => string;
  /**
   * Determines if plugin should overwrite scaffolded docs on subsequent runs.
   * This is useful if you only want to jumpstart docs, but plan to re-organize layout.
   * For those usecases, you can set to true for first run, then false after. You can also include
   * an array of files that you want to force overriding on each run.
   * @default false
   */
  forceDocs?: boolean | string[];
  onProcessDoc?: OnProcessDoc;
  /**
   * An array of source files you want docgen to parse.
   */
  sourceFiles: string[];
};

/* -------------------------------------------------------------------------- */
/*                                 Pre Process                                */
/* -------------------------------------------------------------------------- */
export type PropType = {
  name: string;
  raw?: string;
  value?: PropValue[];
};

export type PropValue = {
  value: string;
  description?: string;
  fullComment?: string;
  tags?: PropItemTags;
};

export type PropItemTags = {
  danger?: string;
  deprecated?: string;
  internal?: string;
  default?: string;
};

export type PropItem = {
  name: string;
  declarations?: ParentType[];
  defaultValue: null | { value: string };
  description: string;
  parent?: ParentType;
  required: boolean;
  tags?: PropItemTags;
  type: PropType;
};

export type DocTags = {
  /**
   * Comma separated list of files, relative to source file, which we should also include when running git log for component changelog.
   */
  danger?: string;
  deprecated?: string;
  description?: string;
  example?: string;
  internal?: string;
};

export type Doc = {
  expression?: unknown;
  description: string;
  displayName: string;
  filePath: string;
  props: Record<string, PropItem>;
  methods?: Method[];
  tags?: DocTags;
};

/* -------------------------------------------------------------------------- */
/*                                Pre-Processed                               */
/* -------------------------------------------------------------------------- */

export type PreProcessedDoc = Omit<Doc, 'props'> & {
  example?: string;
  parentTypes?: Record<string, string[]>;
  props: PreProcessedPropItem[];
  tags?: Omit<DocTags, 'example' | 'description'>;
};

export type PreProcessedPropItem = Omit<PropItem, 'defaultValue' | 'parent' | 'type'> & {
  defaultValue?: string;
  parent: string;
  type: Required<PropType>;
};

/* -------------------------------------------------------------------------- */
/*                                  Processed                                 */
/* -------------------------------------------------------------------------- */

export type ProcessedDoc = Omit<PreProcessedDoc, 'props' | 'expression'> & {
  props: ProcessedPropItem[];
  parentTypes: Record<string, string[]>;
  /** Styles API data extracted from *ClassNames exports */
  styles?: StylesData;
};

export type ProcessedPropItem = Omit<PreProcessedPropItem, 'type'> & {
  type: string;
};

/* -------------------------------------------------------------------------- */
/*                                   Output                                   */
/* -------------------------------------------------------------------------- */

export type OutputDoc = Omit<ProcessedDoc, 'example'> & {
  cacheDirectory: string;
  repoUrl?: string;
  /**
   * Format mdx partials in codegenerated docs to use uppercase format of path
   * i.e. `accordion/mobile/accordionItem.mdx` -> `MobileAccordionItem`
   */
  apiPartial: { name: string; path: string };
  changelogPartial: { name: string; path: string };
  /** This displays the info about where to import the component or util from, with a "copy to clipboard" button */
  importBlock: { name: string; path: string };
  tab: { label: string; value: string };
  slug: string;
};

export type Template =
  | 'shared/objectMap'
  | 'doc/changelog'
  | 'doc/component'
  | 'doc/implementation'
  | 'doc/metadata'
  | 'doc-item/api'
  | 'doc-item/changelog'
  | 'doc-item/changelog-placeholder'
  | 'doc-item/example'
  | 'doc-item/import-block';

import type { SourceFile, Symbol } from 'typescript';

export type ComponentNameResolver = (exp: Symbol, source: SourceFile) => string | undefined | false;

export type WriteFileConfig = {
  dest: string;
  data: unknown;
  template: Template;
};

/* -------------------------------------------------------------------------- */
/*                            Consumer integration                            */
/* -------------------------------------------------------------------------- */

type OnParseDocHelpers = {
  formatString: (str: string) => string;
  /**
   * @param alias - What you want to show in PropsTable. Usually comes from prop.type.raw
   * @param value - What you want to show when clicking on an alias for more info. Usually comes from prop.type.value.
   *
   * If a prop's type is matched with an alias in sharedTypeAliases it will only show the alias name with a Link
   * that triggers a Modal to view the actual value. This helps us avoid super long values which can make
   * the docs noisy. We also avoid making docs too sparse had we only shown the alias without any way to
   * view the actual underlying value.
   */
  addToSharedTypeAliases: (alias: string, value: string) => void;
  /**
   * Automatically excluding all types which come from node_modules can be problematic especially
   * since we extend core functionality from html and react-native.
   *
   * The docgen plugin provides flexibility with what types we want to include in main props table versus
   * what types we want to pull out into, `parentTypes` via an "Extends from ...." UI.
   *
   * If you want to...
   * 1. show prop in the props table - include the prop in the doc's props array.
   * 2. hide prop in the props table - filter the prop from the doc's props array.
   * 3. show prop in parentTypes UI - call addToParentTypes with the prop in processDoc
   * 4. hide prop in the props table + show prop in parentTypes UI - do both #2 and #3 above
   */
  addToParentTypes: (prop: PreProcessedPropItem) => void;
};

export type OnProcessDoc = (
  doc: PreProcessedDoc,
  helpers: OnParseDocHelpers,
) => PreProcessedDoc | ProcessedDoc;

export type SharedTypeAliases = Record<string, string>;
export type SharedParentTypes = Record<string, Record<string, ProcessedPropItem>>;
export type Projects = DocgenProjectMetadata[];

/* -------------------------------------------------------------------------- */
/*                              Styles API Types                              */
/* -------------------------------------------------------------------------- */

/**
 * Represents a style selector extracted from a component's *ClassNames export.
 */
export type StyleSelector = {
  /** The selector key (e.g., "root", "start", "content") */
  selector: string;
  /** The static CSS class name (e.g., "cds-NavigationBar", "cds-NavigationBar-start") */
  className: string;
  /** Description from JSDoc comment */
  description: string;
};

/**
 * Styles API data extracted from a component.
 */
export type StylesData = {
  /** Array of style selectors for the component */
  selectors: StyleSelector[];
};

export type DocgenProjectMetadata = {
  label: string;
  name: string;
  version: string;
  cacheDirectory: string;
};

export type PluginData = {
  projects: Projects;
  enabled: boolean;
};

export type PluginContent = {
  filesToWrite: WriteFileConfig[];
  projects: Projects;
  parsedDocs: OutputDoc[];
};

export {};
