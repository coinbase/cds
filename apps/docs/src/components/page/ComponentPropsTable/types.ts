import type {
  ProcessedDoc,
  ProcessedPropItem,
  SharedParentTypes,
  SharedTypeAliases,
} from '@coinbase/docusaurus-plugin-docgen/types';

type ParentTypes = ProcessedDoc['parentTypes'];

export type PropsTableProps = {
  props: ProcessedPropItem[];
  sharedTypeAliases: SharedTypeAliases;
  searchTerm?: string;
};

export type ParentTypesItem = {
  name: string;
  props: string[];
  sharedTypeAliases: SharedTypeAliases;
  sharedParentTypes: SharedParentTypes;
};

export type ParentTypesListProps = {
  parentTypes: ParentTypes;
  sharedTypeAliases: SharedTypeAliases;
  sharedParentTypes: SharedParentTypes;
};
