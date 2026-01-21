export type Dependency = {
  /** The name of the dependency package */
  name: string;
  /** Optional version requirement */
  version?: string;
  /** Optional URL to the package */
  url?: string;
};

export type RelatedComponent = {
  /** The URL that the related component links to */
  url: string;
  /** The display label for the related component */
  label: string;
};

export type Metadata = {
  import: string;
  source: string;
  changelog?: string;
  storybook?: string;
  figma?: string;
  description?: string;
  relatedComponents?: RelatedComponent[];
  /** Dependencies required by this component */
  dependencies?: Dependency[];
};

export * from './MetadataDependencies';
export * from './MetadataLinks';
export * from './MetadataRelatedComponents';
