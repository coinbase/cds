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
  StylesData,
  StyleSelector,
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
 * Extract style selectors from a component's *ClassNames export.
 *
 * Looks for exports matching the pattern `${componentName}ClassNames` (case-insensitive first char)
 * and extracts each property as a style selector with its JSDoc description.
 *
 * @example
 * ```ts
 * export const navigationBarClassNames = {
 *   /** Root element *\/
 *   root: 'cds-NavigationBar',
 *   /** Start slot *\/
 *   start: 'cds-NavigationBar-start',
 * } as const;
 * ```
 *
 * Would produce:
 * ```ts
 * [
 *   { selector: 'root', className: 'cds-NavigationBar', description: 'Root element' },
 *   { selector: 'start', className: 'cds-NavigationBar-start', description: 'Start slot' },
 * ]
 * ```
 */
function extractStyleSelectorsFromClassNamesExport(
  checker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
  componentName: string,
): StylesData | undefined {
  const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
  if (!moduleSymbol) return undefined;

  // Look for export matching pattern: componentNameClassNames (case-insensitive first char)
  // e.g., NavigationBar -> navigationBarClassNames or NavigationBarClassNames
  const lowerFirstChar = componentName.charAt(0).toLowerCase() + componentName.slice(1);
  const classNamesExportName = `${lowerFirstChar}ClassNames`;

  const exports = checker.getExportsOfModule(moduleSymbol);
  const classNamesSymbol = exports.find(
    (s) => s.name.toLowerCase() === classNamesExportName.toLowerCase(),
  );

  if (!classNamesSymbol) return undefined;

  // Get the type of the classNames object
  const classNamesType = checker.getTypeOfSymbolAtLocation(classNamesSymbol, sourceFile);
  const properties = checker.getPropertiesOfType(classNamesType);

  if (properties.length === 0) return undefined;

  const selectors: StyleSelector[] = properties.map((prop) => {
    const propName = prop.getName();

    // Get the value (class name string)
    const propType = checker.getTypeOfSymbolAtLocation(prop, sourceFile);
    let className = '';
    if (propType.flags & ts.TypeFlags.StringLiteral) {
      className = (propType as ts.LiteralType).value as string;
    }

    // Get JSDoc comment for description
    const jsDocComment = ts.displayPartsToString(prop.getDocumentationComment(checker));
    const description = formatString(jsDocComment);

    return {
      selector: propName,
      className,
      description,
    };
  });

  return { selectors };
}

/**
 * Extract style selectors from a component's `styles` prop type definition.
 *
 * This is a fallback for components that don't export a *ClassNames object but
 * define inline `styles` prop with typed properties and JSDoc comments.
 *
 * @example
 * ```ts
 * export type StepperProps = {
 *   styles?: {
 *     /** Inline styles for the root element *\/
 *     root?: React.CSSProperties;
 *     /** Inline styles for the step *\/
 *     step?: React.CSSProperties;
 *   };
 * };
 * ```
 *
 * Would produce:
 * ```ts
 * [
 *   { selector: 'root', className: '', description: 'Inline styles for the root element' },
 *   { selector: 'step', className: '', description: 'Inline styles for the step' },
 * ]
 * ```
 */
function extractStyleSelectorsFromStylesProp(
  checker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
  componentName: string,
): StylesData | undefined {
  const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
  if (!moduleSymbol) return undefined;

  // Look for the component's Props type export
  // e.g., Stepper -> StepperProps
  const propsTypeName = `${componentName}Props`;

  const exports = checker.getExportsOfModule(moduleSymbol);
  const propsSymbol = exports.find((s) => s.name === propsTypeName);

  if (!propsSymbol) return undefined;

  // For generic type aliases, we need to find the 'styles' property by walking the AST
  // getDeclaredTypeOfSymbol doesn't work well with generic type aliases
  const declarations = propsSymbol.getDeclarations();
  if (!declarations || declarations.length === 0) return undefined;

  // Find the styles property by walking the type alias declaration
  let stylesTypeLiteral: ts.TypeLiteralNode | undefined;

  for (const decl of declarations) {
    if (!ts.isTypeAliasDeclaration(decl)) continue;

    // Walk the type to find a 'styles' property with a type literal
    // This needs to handle intersection types (A & B & { styles: {...} })
    const findStylesProperty = (node: ts.Node): ts.TypeLiteralNode | undefined => {
      // Handle intersection types (A & B & C) - search each part
      if (ts.isIntersectionTypeNode(node)) {
        for (const typeNode of node.types) {
          const result = findStylesProperty(typeNode);
          if (result) return result;
        }
        return undefined;
      }

      // Handle type literals ({ styles: {...} })
      if (ts.isTypeLiteralNode(node)) {
        for (const member of node.members) {
          const result = findStylesProperty(member);
          if (result) return result;
        }
        return undefined;
      }

      // Handle property signature (styles?: {...})
      if (ts.isPropertySignature(node) && node.name) {
        const propName = ts.isIdentifier(node.name) ? node.name.text : '';
        if (propName === 'styles' && node.type) {
          const typeNode = node.type;
          // Handle optional type that creates a union with undefined (styles?: {...})
          if (ts.isUnionTypeNode(typeNode)) {
            // Find the non-undefined type in the union
            for (const t of typeNode.types) {
              if (ts.isTypeLiteralNode(t)) {
                return t;
              }
            }
          }
          if (ts.isTypeLiteralNode(typeNode)) {
            return typeNode;
          }
        }
      }

      return ts.forEachChild(node, findStylesProperty);
    };

    stylesTypeLiteral = findStylesProperty(decl.type);
    if (stylesTypeLiteral) break;
  }

  if (!stylesTypeLiteral) return undefined;

  // Extract selectors from the type literal members
  const selectors: StyleSelector[] = [];

  for (const member of stylesTypeLiteral.members) {
    if (!ts.isPropertySignature(member) || !member.name) continue;

    const propName = ts.isIdentifier(member.name) ? member.name.text : '';
    if (!propName) continue;

    // Get JSDoc comment from the AST node
    const jsDocComments = ts.getJSDocCommentsAndTags(member);
    let description = '';

    for (const jsDoc of jsDocComments) {
      if (ts.isJSDoc(jsDoc) && jsDoc.comment) {
        const commentText =
          typeof jsDoc.comment === 'string'
            ? jsDoc.comment
            : jsDoc.comment.map((part) => part.text).join('');
        description = formatString(commentText);
        break;
      }
    }

    // Clean up the description - remove common prefixes to make descriptions more concise
    description = description
      .replace(/^Inline styles for\s+(the\s+)?/i, '')
      .replace(/^Custom styles for\s+(the\s+)?/i, '')
      .replace(/^A CSS class name applied to\s+(the\s+)?/i, '');

    selectors.push({
      selector: propName,
      className: '', // No static class name for inline styles-based components
      description,
    });
  }

  if (selectors.length === 0) return undefined;

  return { selectors };
}

/**
 * Extract style selectors from a component - tries multiple extraction methods:
 * 1. First looks for a *ClassNames export (preferred, has static class names)
 * 2. Falls back to extracting from `styles` prop type definition
 */
function extractStyleSelectors(
  checker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
  componentName: string,
): StylesData | undefined {
  // First try to get from *ClassNames export (has static class names)
  const fromClassNames = extractStyleSelectorsFromClassNamesExport(
    checker,
    sourceFile,
    componentName,
  );
  if (fromClassNames && fromClassNames.selectors.length > 0) {
    return fromClassNames;
  }

  // Fall back to extracting from styles prop type
  return extractStyleSelectorsFromStylesProp(checker, sourceFile, componentName);
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
      const processedDoc = processDoc({ ...consumerProcessedDoc, parentTypes });

      // Extract style selectors from *ClassNames exports
      const sourceFile = tsCtx.program.getSourceFile(doc.filePath);
      if (sourceFile) {
        const styles = extractStyleSelectors(tsCtx.checker, sourceFile, doc.displayName);
        if (styles && styles.selectors.length > 0) {
          return { ...processedDoc, styles };
        }
      }

      return processedDoc;
    });
}
