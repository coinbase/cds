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
 * Recursively walk a type alias's AST to find a `styles` property symbol.
 *
 * This handles cases where the top-level type resolution fails to expose `styles`,
 * such as when `styles` is defined in an inline intersection inside a complex generic
 * wrapper like `Polymorphic.Props<T, BaseProps & { styles?: {...} }>`.
 *
 * The function walks:
 * - Type reference arguments (e.g., the `B` in `SomeType<A, B>`)
 * - Intersection type members (e.g., each part of `A & B & { styles?: {...} }`)
 */
function findStylesPropertyInTypeNode(
  checker: ts.TypeChecker,
  typeNode: ts.TypeNode,
): ts.Symbol | undefined {
  // For type references with type arguments (e.g., Polymorphic.Props<A, B>),
  // check each type argument for a `styles` property.
  if (ts.isTypeReferenceNode(typeNode) && typeNode.typeArguments) {
    for (const arg of typeNode.typeArguments) {
      const argType = checker.getTypeAtLocation(arg);
      const found = checker.getPropertiesOfType(argType).find((p) => p.getName() === 'styles');
      if (found) return found;

      // Recurse into nested type references and intersections
      const nested = findStylesPropertyInTypeNode(checker, arg);
      if (nested) return nested;
    }
  }

  // For intersection types (A & B & { styles?: {...} }),
  // check each member individually.
  if (ts.isIntersectionTypeNode(typeNode)) {
    for (const member of typeNode.types) {
      const memberType = checker.getTypeAtLocation(member);
      const found = checker.getPropertiesOfType(memberType).find((p) => p.getName() === 'styles');
      if (found) return found;

      // Recurse into nested type references
      const nested = findStylesPropertyInTypeNode(checker, member);
      if (nested) return nested;
    }
  }

  return undefined;
}

/**
 * Extract style selectors from a component's `styles` prop type definition.
 *
 * Uses the TypeScript type checker to resolve the full type, which handles:
 * - Inline styles prop definitions
 * - Inherited styles from base types (e.g., SidebarBaseProps -> SidebarProps)
 * - Intersection types (A & B & { styles: {...} })
 *
 * @example
 * ```ts
 * // Works with inline definitions:
 * export type StepperProps = {
 *   styles?: {
 *     /** Inline styles for the root element *\/
 *     root?: React.CSSProperties;
 *   };
 * };
 *
 * // Also works with inherited types:
 * export type SidebarBaseProps = {
 *   styles?: { root?: React.CSSProperties; };
 * };
 * export type SidebarProps = SidebarBaseProps & { ... };
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
  let propsSymbol = exports.find((s) => s.name === propsTypeName);

  if (!propsSymbol) return undefined;

  // Handle re-exported types: follow the alias to the actual declaration
  // e.g., `export type { SelectProps } from './types'` -> resolve to actual SelectProps
  if (propsSymbol.flags & ts.SymbolFlags.Alias) {
    propsSymbol = checker.getAliasedSymbol(propsSymbol);
  }

  // Check if the symbol has type parameters (generic type)
  const declarations = propsSymbol.getDeclarations();
  const isGenericType = declarations?.some(
    (d) => ts.isTypeAliasDeclaration(d) && d.typeParameters && d.typeParameters.length > 0,
  );

  let propsType: ts.Type;

  if (isGenericType) {
    // For generic types like SelectProps<T, V> or RollingNumberProps<AsComponent>,
    // getDeclaredTypeOfSymbol returns the uninstantiated type which may not resolve
    // nested properties correctly. Instead, get the type from the RHS of the type alias.
    const typeAliasDecl = declarations?.find(ts.isTypeAliasDeclaration);
    if (typeAliasDecl) {
      propsType = checker.getTypeAtLocation(typeAliasDecl.type);
    } else {
      propsType = checker.getDeclaredTypeOfSymbol(propsSymbol);
    }
  } else {
    // For non-generic types, use getDeclaredTypeOfSymbol (handles inheritance and intersections)
    propsType = checker.getDeclaredTypeOfSymbol(propsSymbol);
  }

  const propsProperties = checker.getPropertiesOfType(propsType);

  // Find the 'styles' property in the resolved type
  let stylesSymbol = propsProperties.find((p) => p.getName() === 'styles');

  // If styles not found in the resolved type (e.g. complex generic wrappers like Polymorphic.Props),
  // walk the type alias's AST to find styles in type arguments or intersection members.
  if (!stylesSymbol && isGenericType) {
    const typeAliasDecl = declarations?.find(ts.isTypeAliasDeclaration);
    if (typeAliasDecl) {
      stylesSymbol = findStylesPropertyInTypeNode(checker, typeAliasDecl.type);
    }
  }

  if (!stylesSymbol) return undefined;

  // Get the type of the styles property
  const stylesType = checker.getTypeOfSymbolAtLocation(stylesSymbol, sourceFile);

  // Handle optional types (styles?: {...}) - get the non-undefined type
  const nonNullableStylesType = checker.getNonNullableType(stylesType);
  const stylesProperties = checker.getPropertiesOfType(nonNullableStylesType);

  if (stylesProperties.length === 0) return undefined;

  // Extract selectors from the styles type properties
  const selectors: StyleSelector[] = stylesProperties.map((prop) => {
    const propName = prop.getName();

    // Get JSDoc comment for description using the type checker
    let description = ts.displayPartsToString(prop.getDocumentationComment(checker));
    description = formatString(description);

    // Clean up the description - remove common prefixes to make descriptions more concise
    description = description
      .replace(/^Inline styles for\s+(the\s+)?/i, '')
      .replace(/^Custom styles for\s+(the\s+)?/i, '')
      .replace(/^Custom style for\s+(the\s+)?/i, '')
      .replace(/^Styles for\s+(the\s+)?/i, '')
      .replace(/^A CSS class name applied to\s+(the\s+)?/i, '');

    return {
      selector: propName,
      className: '', // No static class name for inline styles-based components
      description,
    };
  });

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
