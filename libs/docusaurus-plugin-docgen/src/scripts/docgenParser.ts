import { withCustomConfig } from 'react-docgen-typescript';
import mapValues from 'lodash/mapValues';
import omit from 'lodash/omit';
import orderBy from 'lodash/orderBy';
import path from 'node:path';
import ts from 'typescript';

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

type TsProgramContext = {
  program: ts.Program;
  checker: ts.TypeChecker;
  jsxIntrinsicElementsType?: ts.Type;
};

/* -------------------------------------------------------------------------- */
/*                                  Utilities                                 */
/* -------------------------------------------------------------------------- */

export function formatString(str: string) {
  return str.replaceAll(/['"]+/g, '').replaceAll(/\n/g, ' ').replaceAll(/`/g, '');
}

/**
 * Build a TypeScript Program/Checker for the files we are parsing so we can:
 * - resolve JSX.IntrinsicElements (the source of native DOM prop types)
 * - introspect `${ComponentName}DefaultElement` exports (our polymorphic default element convention)
 *
 * This is intentionally best-effort: if we fail to resolve JSX.IntrinsicElements for any reason,
 * we simply won't augment docs with default-element inherited props (no hard failure).
 */
function createTsProgramContext(tsconfigPath: string, filesToParse: string[]): TsProgramContext {
  const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  const config = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(tsconfigPath),
  );

  const program = ts.createProgram({
    rootNames: filesToParse,
    options: {
      ...config.options,
      noEmit: true,
    },
    projectReferences: config.projectReferences,
  });

  const checker = program.getTypeChecker();

  // Try to resolve JSX.IntrinsicElements once; it is the source of native DOM prop types.
  const anySourceFile = program.getSourceFiles().find((sf) => !sf.isDeclarationFile);
  let jsxIntrinsicElementsType: ts.Type | undefined;
  if (anySourceFile) {
    const jsxNs = checker.resolveName('JSX', anySourceFile, ts.SymbolFlags.Namespace, false);
    if (jsxNs) {
      const exports = checker.getExportsOfModule(jsxNs);
      const intrinsic = exports.find((s) => s.name === 'IntrinsicElements');
      if (intrinsic) {
        jsxIntrinsicElementsType = checker.getDeclaredTypeOfSymbol(intrinsic);
      }
    }
  }

  return { program, checker, jsxIntrinsicElementsType };
}

/**
 * Determine the component's default intrinsic element by looking for an exported type named:
 * `${ComponentName}DefaultElement`.
 *
 * This relies on our naming pattern in components:
 * - `export type ButtonDefaultElement`
 *
 * If that export doesn't exist (or isn't resolvable to a string literal), we return undefined
 * and docgen continues without injecting default-element props.
 */
function getDefaultIntrinsicElementName(
  checker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
  componentName: string,
): string | undefined {
  const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
  if (!moduleSymbol) return undefined;

  const defaultElementTypeName = `${componentName}DefaultElement`;
  const exports = checker.getExportsOfModule(moduleSymbol);
  const sym = exports.find((s) => s.name === defaultElementTypeName);
  if (!sym) return undefined;

  const t = checker.getDeclaredTypeOfSymbol(sym);
  if (t.flags & ts.TypeFlags.StringLiteral) {
    return (t as ts.LiteralType).value as string;
  }
  if (t.flags & ts.TypeFlags.Union) {
    const u = t as ts.UnionType;
    const lit = u.types.find((x) => x.flags & ts.TypeFlags.StringLiteral) as
      | ts.LiteralType
      | undefined;
    return lit ? (lit.value as string) : undefined;
  }
  return undefined;
}

/**
 * Augment docgen output for **web polymorphic components** by injecting props inherited from the
 * component's default intrinsic element.
 *
 * Why:
 * - Our polymorphic types inherit from `React.ComponentPropsWithoutRef<AsComponent>` which docgen
 *   tools (react-docgen-typescript) often fail to fully expand when `AsComponent` is generic.
 * - However, for the default element we can deterministically compute the native prop surface.
 *
 * How:
 * - Resolve `${ComponentName}DefaultElement` from the component source file.
 * - Look up the prop bag for that element via `JSX.IntrinsicElements[defaultElement]`.
 * - Add any missing props into the props list with parent `PolymorphicDefault<${defaultElement}>`.
 * - Set the `as` prop's defaultValue to the default element (so the Default column isn't `undefined`).
 *
 * Important behavior:
 * - This is best-effort and non-fatal. If the component does not export `${ComponentName}DefaultElement`,
 *   we do not throw. We simply skip augmentation, meaning the props table will only show the props
 *   explicitly defined by the component (and whatever react-docgen-typescript was able to extract).
 */
function addDefaultElementProps({
  doc,
  ctx,
}: {
  doc: PreProcessedDoc;
  ctx: TsProgramContext;
}): PreProcessedDoc {
  // Only do this for web components: mobile/RN uses different inheritance.
  const isWeb = typeof doc.filePath === 'string' && doc.filePath.includes('/packages/web/');
  if (!isWeb) return doc;

  // Only apply to polymorphic components.
  const isPolymorphic =
    doc.props.some((p) => p.name === 'as') || doc.props.some((p) => p.parent === 'polymorphism');
  if (!isPolymorphic) return doc;

  const sourceFile = ctx.program.getSourceFile(doc.filePath);
  if (!sourceFile) return doc;

  const defaultElement = getDefaultIntrinsicElementName(ctx.checker, sourceFile, doc.displayName);
  if (!defaultElement) return doc;

  // If we can determine the default element, set it as the default for the `as` prop
  // so the "Default" column isn't misleadingly `undefined`.
  const propsWithAsDefault = doc.props.map((p) => {
    if (p.name !== 'as') return p;
    if (p.defaultValue !== undefined && p.defaultValue !== null && p.defaultValue !== '') return p;
    return { ...p, defaultValue: defaultElement };
  });

  const intrinsicElementsType = ctx.jsxIntrinsicElementsType;
  if (!intrinsicElementsType) return doc;

  const intrinsicProp = ctx.checker.getPropertyOfType(intrinsicElementsType, defaultElement);
  if (!intrinsicProp) return doc;

  const defaultElementPropsType = ctx.checker.getTypeOfSymbolAtLocation(intrinsicProp, sourceFile);
  const inheritedPropSymbols = ctx.checker.getPropertiesOfType(defaultElementPropsType);

  const existing = new Set(doc.props.map((p) => p.name));
  const parent = `PolymorphicDefault<${defaultElement}>`;

  const inheritedProps: PreProcessedPropItem[] = inheritedPropSymbols
    .map((sym) => {
      const name = sym.getName();
      if (existing.has(name)) return undefined;
      const typeStr = formatString(
        ctx.checker.typeToString(ctx.checker.getTypeOfSymbolAtLocation(sym, sourceFile)),
      );

      const tsDoc = formatString(ts.displayPartsToString(sym.getDocumentationComment(ctx.checker)));

      return {
        name,
        required: false,
        defaultValue: undefined,
        description: tsDoc,
        parent,
        tags: {},
        type: { name: typeStr, raw: typeStr, value: [] },
      };
    })
    .filter(Boolean) as PreProcessedPropItem[];

  if (!inheritedProps.length) return doc;

  return {
    ...doc,
    props: [...propsWithAsDefault, ...inheritedProps],
  };
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
    // NOTE: react-docgen-typescript may include TypeScript AST nodes on `prop.type` (circular refs),
    // which breaks our JSON.stringify-based writer in dev. Keep only a JSON-safe snapshot.
    ...(process.env.NODE_ENV !== 'production'
      ? { originalType: { name, raw: formatString(raw) } }
      : {}),
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
  // react-docgen-typescript@2.4.0 can attach a `rootExpression` containing TS AST nodes (circular refs),
  // which breaks our JSON.stringify-based writer.
  if ('rootExpression' in docCopy) {
    delete docCopy.rootExpression;
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
  const tsCtx = createTsProgramContext(params.tsconfigPath, filesToParse);

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

      const preProcessedDoc = addDefaultElementProps({ doc: preProcessDoc(doc), ctx: tsCtx });
      const consumerProcessedDoc = onProcessDoc(preProcessedDoc, {
        addToParentTypes,
        addToSharedTypeAliases,
        formatString,
      });
      return processDoc({ ...consumerProcessedDoc, parentTypes });
    });
}
