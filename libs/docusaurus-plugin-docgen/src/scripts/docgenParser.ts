import { withCustomConfig } from 'react-docgen-typescript';
import mapValues from 'lodash/mapValues';
import omit from 'lodash/omit';
import orderBy from 'lodash/orderBy';
import path from 'node:path';

import type {
  ComponentNameResolver,
  Doc,
  OnProcessDoc,
  PreProcessedDoc,
  PreProcessedPropItem,
  ProcessedDoc,
  ProcessedPropItem,
  PropItem,
} from '../types';

export const sharedParentTypesCache = new Set<ProcessedPropItem>();
export const sharedTypeAliasesCache: Map<string, unknown> = new Map();

/* -------------------------------------------------------------------------- */
/*                                  Utilities                                 */
/* -------------------------------------------------------------------------- */

export function formatString(str: string) {
  return str.replaceAll(/['"]+/g, '').replaceAll(/\n/g, ' ').replaceAll(/`/g, '');
}

function getDocParent({ declarations = [], parent }: PropItem) {
  const declaration = declarations.map((item) => {
    let parentName: string = item.name;
    if (item.name === 'TypeLiteral') {
      if (item.fileName.includes('node_modules/@types')) {
        const [, restOfPath] = item.fileName.split('node_modules/@types/');
        const [declarationName] = restOfPath.split('/');
        parentName = item.name ?? declarationName;
      } else if (item.fileName.includes('node_modules')) {
        const [, name] = item.fileName.split('node_modules/');
        parentName = name;
      } else {
        parentName = path.basename(item.fileName, path.extname(item.fileName));
      }
    }
    return parentName;
  })[0];
  return declaration ?? parent?.name ?? '';
}

function getDocExample(doc: Doc) {
  if (!doc.tags?.example) return undefined;
  return doc.tags.example.includes('tsx')
    ? doc.tags.example.replaceAll('tsx', 'tsx live')
    : '```tsx live\n' + doc.tags.example + '\n```';
}

function formatPropItemType(value: string) {
  switch (value) {
    case 'ReactElement<any, string | JSXElementConstructor<any>>':
      return 'ReactElement';
    case 'Iterable<ReactNode> | ReactElement<any, string | JSXElementConstructor<any>> | ReactPortal | false | null | number | string | true | {}':
      return 'ReactNode';
    case 'false | RegisteredStyle<ViewStyle> | Value | AnimatedInterpolation | WithAnimatedObject<ViewStyle> | WithAnimatedArray<...> | null':
      return 'Animated<ViewStyle> | ViewStyle';
    default:
      return formatString(value);
  }
}

/* -------------------------------------------------------------------------- */
/*                                 Pre-Process                                */
/* -------------------------------------------------------------------------- */

function preProcessPropItem(prop: PropItem) {
  const description = formatString(prop.description);
  const tags = omit(
    mapValues(prop.tags, (val) => (val ? formatString(val) : val)),
    ['default'],
  );
  const defaultValue = prop.tags?.default ?? prop.defaultValue?.value;
  const { name, raw = name, value = [] } = prop.type;
  const parent = getDocParent(prop);

  return {
    ...prop,
    defaultValue,
    description,
    parent,
    tags,
    type: { name, raw: formatString(raw), value },
    ...(process.env.NODE_ENV !== 'production' ? { originalType: prop.type } : {}),
  };
}

function preProcessDoc(doc: Doc): PreProcessedDoc {
  const description = formatString(doc.tags?.description ?? doc.description);
  const props = Object.values(doc.props).map(preProcessPropItem);
  const tags = omit(
    mapValues(doc.tags, (val) => (val ? formatString(val) : val)),
    ['example'],
  );
  return {
    ...doc,
    description,
    props,
    example: getDocExample(doc),
    tags,
  };
}

/* -------------------------------------------------------------------------- */
/*                                   Process                                  */
/* -------------------------------------------------------------------------- */
function processPropItem(prop: PreProcessedPropItem | ProcessedPropItem): ProcessedPropItem {
  const { declarations: _declarations, tags: _tags, ...restOfProp } = prop;
  return {
    ...restOfProp,
    type: formatPropItemType(typeof prop.type === 'string' ? prop.type : prop.type.raw),
  };
}

function processDoc({ parentTypes = {}, ...doc }: PreProcessedDoc | ProcessedDoc): ProcessedDoc {
  const docCopy = { ...doc };
  if ('expression' in docCopy) {
    delete docCopy.expression;
  }

  const processedProps = doc.props.map(processPropItem);
  const sortedProps = orderBy(processedProps, ['required', 'name'], ['desc', 'asc']);
  return {
    ...docCopy,
    parentTypes,
    props: sortedProps,
  };
}

/* -------------------------------------------------------------------------- */
/*                                   Docgen                                   */
/* -------------------------------------------------------------------------- */

const onProcessDocFallback: OnProcessDoc = (doc) => ({ ...doc, parentTypes: {} });

export type DocgenParamsParams = {
  files: string[];
  tsconfigPath: string;
  projectDir: string;
  onProcessDoc?: OnProcessDoc;
};

export function docgenParser({
  onProcessDoc = onProcessDocFallback,
  ...params
}: DocgenParamsParams): ProcessedDoc[] {
  const filesToParse = params.files.map((file) => path.join(params.projectDir, file));

  function addToSharedTypeAliases(alias: string, value: string) {
    sharedTypeAliasesCache.set(alias, formatPropItemType(value));
  }

  /** React docgen integration */
  return withCustomConfig(params.tsconfigPath, {
    savePropValueAsString: true,
    shouldExtractValuesFromUnion: true,
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
    shouldIncludePropTagMap: true,
    shouldIncludeExpression: true,
  })
    .parse(filesToParse)
    .map((doc) => {
      const parentTypes: Record<string, string[]> = {};

      function addToParentTypes(prop: PreProcessedPropItem) {
        if (!parentTypes[prop.parent]) {
          parentTypes[prop.parent] = [];
        }
        if (!parentTypes[prop.parent].includes(prop.name)) {
          parentTypes[prop.parent].push(prop.name);
          const postProcessedProp = processPropItem(prop);
          sharedParentTypesCache.add(postProcessedProp);
        }
      }

      const preProcessedDoc = preProcessDoc(doc);
      const consumerProcessedDoc = onProcessDoc(preProcessedDoc, {
        addToParentTypes,
        addToSharedTypeAliases,
        formatString,
      });
      return processDoc({ ...consumerProcessedDoc, parentTypes });
    });
}
