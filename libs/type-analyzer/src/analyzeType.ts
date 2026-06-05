import path from 'node:path';
import ts from 'typescript';

import { createProgramContext } from './program/createProgramContext';
import type {
  AnalyzeTypeRequest,
  ProgramContext,
  SourceLocation,
  TypeAnalysisResult,
  TypeOriginGroup,
  TypeOriginGroupKind,
  TypeProperty,
  TypePropertyOrigin,
} from './types';

const utilityTypeNames = new Set(['Omit', 'Partial', 'Pick', 'Readonly', 'Record', 'Required']);
const longTypeStringLength = 160;

type OriginCollector = {
  ctx: ProgramContext;
  includeNestedOrigins: boolean;
  groups: TypeOriginGroup[];
  nextGroupId: number;
  visitedDeclarations: Set<string>;
};

export function analyzeType(request: AnalyzeTypeRequest): TypeAnalysisResult {
  const ctx = createProgramContext(request);
  const targetSymbol = resolveTargetSymbol(ctx, request.symbolName);
  const targetType = getTypeForSymbol(ctx, targetSymbol);
  const collector: OriginCollector = {
    ctx,
    groups: [],
    includeNestedOrigins: request.includeNestedOrigins ?? false,
    nextGroupId: 1,
    visitedDeclarations: new Set(),
  };

  collectGroupsForSymbol(collector, targetSymbol, 0, undefined);
  if (collector.includeNestedOrigins) {
    dedupeGroupPropertiesBySubtree(collector.groups);
  }

  const properties = getFlattenedProperties(
    ctx,
    targetType,
    collector.groups,
    request.expandTypes ?? false,
  );

  return {
    filePath: ctx.filePath,
    groups: collector.groups,
    properties,
    symbolName: request.symbolName,
    tsconfigPath: ctx.tsconfigPath,
  };
}

function dedupeGroupPropertiesBySubtree(groups: TypeOriginGroup[]): void {
  const childGroupsByParentId = new Map<string | undefined, TypeOriginGroup[]>();
  for (const group of groups) {
    const childGroups = childGroupsByParentId.get(group.parentId) ?? [];
    childGroups.push(group);
    childGroupsByParentId.set(group.parentId, childGroups);
  }

  for (const rootGroup of childGroupsByParentId.get(undefined) ?? []) {
    dedupeGroupProperties(rootGroup, childGroupsByParentId, new Set());
  }
}

function dedupeGroupProperties(
  group: TypeOriginGroup,
  childGroupsByParentId: Map<string | undefined, TypeOriginGroup[]>,
  seenProperties: Set<string>,
): void {
  group.properties = group.properties.filter((property) => {
    if (seenProperties.has(property)) {
      return false;
    }

    seenProperties.add(property);
    return true;
  });

  for (const childGroup of childGroupsByParentId.get(group.id) ?? []) {
    dedupeGroupProperties(childGroup, childGroupsByParentId, seenProperties);
  }
}

function resolveTargetSymbol(ctx: ProgramContext, symbolName: string): ts.Symbol {
  const moduleSymbol = ctx.checker.getSymbolAtLocation(ctx.sourceFile);
  if (moduleSymbol) {
    const exportedSymbol = ctx.checker
      .getExportsOfModule(moduleSymbol)
      .find((symbol) => symbol.getName() === symbolName);

    if (exportedSymbol) {
      return resolveAlias(ctx, exportedSymbol);
    }
  }

  let localSymbol: ts.Symbol | undefined;
  ctx.sourceFile.forEachChild((node) => {
    if (
      (ts.isTypeAliasDeclaration(node) ||
        ts.isInterfaceDeclaration(node) ||
        ts.isClassDeclaration(node)) &&
      node.name?.text === symbolName
    ) {
      localSymbol = ctx.checker.getSymbolAtLocation(node.name);
    }
  });

  if (localSymbol) {
    return resolveAlias(ctx, localSymbol);
  }

  throw new Error(`Could not find exported type "${symbolName}" in ${ctx.filePath}`);
}

function resolveAlias(ctx: ProgramContext, symbol: ts.Symbol): ts.Symbol {
  if (symbol.flags & ts.SymbolFlags.Alias) {
    return ctx.checker.getAliasedSymbol(symbol);
  }

  return symbol;
}

function getTypeForSymbol(ctx: ProgramContext, symbol: ts.Symbol): ts.Type {
  const declarations = symbol.getDeclarations() ?? [];
  const typeAliasDeclaration = declarations.find(ts.isTypeAliasDeclaration);
  if (typeAliasDeclaration) {
    return ctx.checker.getTypeAtLocation(typeAliasDeclaration.type);
  }

  return ctx.checker.getDeclaredTypeOfSymbol(symbol);
}

function collectGroupsForSymbol(
  collector: OriginCollector,
  symbol: ts.Symbol,
  depth: number,
  parentId: string | undefined,
): void {
  const declarations = symbol.getDeclarations() ?? [];
  for (const declaration of declarations) {
    if (ts.isTypeAliasDeclaration(declaration)) {
      collectGroupsForTypeNode(collector, declaration.type, depth, parentId);
      return;
    }

    if (ts.isInterfaceDeclaration(declaration)) {
      collectGroupsForInterfaceDeclaration(collector, declaration, depth, parentId);
      return;
    }
  }
}

function collectGroupsForTypeNode(
  collector: OriginCollector,
  typeNode: ts.TypeNode,
  depth: number,
  parentId: string | undefined,
): void {
  if (ts.isIntersectionTypeNode(typeNode)) {
    for (const memberTypeNode of typeNode.types) {
      collectGroupsForTypeNode(collector, memberTypeNode, depth, parentId);
    }
    return;
  }

  if (ts.isParenthesizedTypeNode(typeNode)) {
    collectGroupsForTypeNode(collector, typeNode.type, depth, parentId);
    return;
  }

  if (ts.isTypeReferenceNode(typeNode)) {
    const group = createGroupForTypeReference(collector, typeNode, depth, parentId);
    collector.groups.push(group);
    collectNestedGroupsForTypeReference(collector, typeNode, group);
    return;
  }

  if (ts.isTypeLiteralNode(typeNode)) {
    collector.groups.push(createInlineGroup(collector, typeNode, depth, parentId));
    return;
  }

  collector.groups.push(createUnknownGroup(collector, typeNode, depth, parentId));
}

function collectGroupsForInterfaceDeclaration(
  collector: OriginCollector,
  declaration: ts.InterfaceDeclaration,
  depth: number,
  parentId: string | undefined,
): void {
  collectHeritageGroupsForInterfaceDeclaration(collector, declaration, depth, parentId);

  const ownProperties = getPropertyNamesFromMembers(declaration.members);
  if (ownProperties.length > 0) {
    collector.groups.push({
      depth,
      expression: declaration.name.text,
      id: createGroupId(collector),
      kind: 'interface',
      name: declaration.name.text,
      parentId,
      properties: ownProperties,
      sourceLocation: getLocation(declaration.name),
    });
  }
}

function collectHeritageGroupsForInterfaceDeclaration(
  collector: OriginCollector,
  declaration: ts.InterfaceDeclaration,
  depth: number,
  parentId: string | undefined,
): void {
  for (const heritageClause of declaration.heritageClauses ?? []) {
    for (const heritageType of heritageClause.types) {
      collectGroupsForTypeNode(collector, heritageType, depth, parentId);
    }
  }
}

function collectNestedGroupsForTypeReference(
  collector: OriginCollector,
  typeNode: ts.TypeReferenceNode,
  parentGroup: TypeOriginGroup,
): void {
  if (!collector.includeNestedOrigins) {
    return;
  }

  if (isUtilityTypeReference(typeNode)) {
    return;
  }

  const nestedDeclaration = getPrimaryDeclarationForTypeReference(collector.ctx, typeNode);
  if (nestedDeclaration && isNodeModulesDeclaration(nestedDeclaration)) {
    return;
  }

  if (nestedDeclaration && markDeclarationVisited(collector, nestedDeclaration)) {
    if (ts.isTypeAliasDeclaration(nestedDeclaration)) {
      if (ts.isTypeLiteralNode(nestedDeclaration.type)) {
        return;
      }

      collectGroupsForTypeNode(
        collector,
        nestedDeclaration.type,
        parentGroup.depth + 1,
        parentGroup.id,
      );
    } else if (ts.isInterfaceDeclaration(nestedDeclaration)) {
      collectHeritageGroupsForInterfaceDeclaration(
        collector,
        nestedDeclaration,
        parentGroup.depth + 1,
        parentGroup.id,
      );
    }
  }
}

function createGroupForTypeReference(
  collector: OriginCollector,
  typeNode: ts.TypeReferenceNode,
  depth: number,
  parentId: string | undefined,
): TypeOriginGroup {
  const expression = getNodeText(typeNode);
  const sourceTypeNode = getSourceTypeNodeForTypeReference(typeNode);
  const declaration = getPrimaryDeclarationForTypeReference(collector.ctx, typeNode);
  const type = collector.ctx.checker.getTypeAtLocation(typeNode);
  const properties = getPropertyNamesForTypeReference(collector, typeNode, type, declaration);
  const kind: TypeOriginGroupKind = isUtilityTypeReference(typeNode) ? 'utility' : 'type-reference';
  const utilityName = kind === 'utility' ? getEntityNameText(typeNode.typeName) : undefined;
  const sourceName = sourceTypeNode
    ? getNodeText(sourceTypeNode)
    : getEntityNameText(typeNode.typeName);

  return {
    declarationLocation: declaration ? getLocation(declaration) : undefined,
    depth,
    expression,
    id: createGroupId(collector),
    kind,
    name: kind === 'utility' ? sourceName : getEntityNameText(typeNode.typeName),
    parentId,
    properties,
    sourceLocation: getLocation(typeNode),
    sourceName,
    utilityName,
  };
}

function getPropertyNamesForTypeReference(
  collector: OriginCollector,
  typeNode: ts.TypeReferenceNode,
  type: ts.Type,
  declaration: ts.Declaration | undefined,
): string[] {
  if (
    !collector.includeNestedOrigins ||
    isUtilityTypeReference(typeNode) ||
    isNodeModulesDeclaration(declaration)
  ) {
    return getPropertyNamesForType(collector.ctx, type);
  }

  if (declaration && ts.isInterfaceDeclaration(declaration)) {
    return getPropertyNamesFromMembers(declaration.members);
  }

  if (
    declaration &&
    ts.isTypeAliasDeclaration(declaration) &&
    ts.isTypeLiteralNode(declaration.type)
  ) {
    return getPropertyNamesFromMembers(declaration.type.members);
  }

  return [];
}

function createInlineGroup(
  collector: OriginCollector,
  typeNode: ts.TypeLiteralNode,
  depth: number,
  parentId: string | undefined,
): TypeOriginGroup {
  return {
    depth,
    expression: getNodeText(typeNode),
    id: createGroupId(collector),
    kind: 'inline',
    name: 'inline',
    parentId,
    properties: getPropertyNamesFromMembers(typeNode.members),
    sourceLocation: getLocation(typeNode),
  };
}

function createUnknownGroup(
  collector: OriginCollector,
  typeNode: ts.TypeNode,
  depth: number,
  parentId: string | undefined,
): TypeOriginGroup {
  const type = collector.ctx.checker.getTypeAtLocation(typeNode);

  return {
    depth,
    expression: getNodeText(typeNode),
    id: createGroupId(collector),
    kind: 'unknown',
    name: getNodeText(typeNode),
    parentId,
    properties: getPropertyNamesForType(collector.ctx, type),
    sourceLocation: getLocation(typeNode),
  };
}

function getFlattenedProperties(
  ctx: ProgramContext,
  type: ts.Type,
  groups: TypeOriginGroup[],
  expandTypes: boolean,
): TypeProperty[] {
  return ctx.checker
    .getPropertiesOfType(type)
    .map((property) => createTypeProperty(ctx, property, groups, expandTypes))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function createTypeProperty(
  ctx: ProgramContext,
  property: ts.Symbol,
  groups: TypeOriginGroup[],
  expandTypes: boolean,
): TypeProperty {
  const declarations = property.getDeclarations() ?? [];
  const locationNode = property.valueDeclaration ?? declarations[0] ?? ctx.sourceFile;
  const propertyType = ctx.checker.getTypeOfSymbolAtLocation(property, locationNode);
  const origins = getOriginsForProperty(property.getName(), groups);
  const typeText = expandTypes
    ? getExpandedTypeText(ctx, propertyType, locationNode)
    : getReadableTypeText(ctx, propertyType, locationNode, declarations);

  return {
    declarations: declarations.map(getLocation).filter(isDefined),
    documentation: getDocumentation(ctx, property),
    name: property.getName(),
    origins,
    readonly: declarations.some(hasReadonlyModifier),
    required: (property.flags & ts.SymbolFlags.Optional) === 0,
    type: typeText,
  };
}

function getExpandedTypeText(
  ctx: ProgramContext,
  propertyType: ts.Type,
  locationNode: ts.Node,
): string {
  return ctx.checker.typeToString(
    propertyType,
    locationNode,
    ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope,
  );
}

function getReadableTypeText(
  ctx: ProgramContext,
  propertyType: ts.Type,
  locationNode: ts.Node,
  declarations: ts.Declaration[],
): string {
  const checkerTypeText = ctx.checker.typeToString(
    propertyType,
    locationNode,
    ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope,
  );

  if (checkerTypeText.length <= longTypeStringLength) {
    return checkerTypeText;
  }

  const declaredTypeText = declarations
    .flatMap(getPropertyTypeNode)
    .map((typeNode) => getNodeText(typeNode))
    .filter((typeText) => typeText.length > 0)
    .sort((a, b) => a.length - b.length)[0];

  return declaredTypeText ?? checkerTypeText;
}

function getPropertyTypeNode(declaration: ts.Declaration): ts.TypeNode[] {
  if (
    (ts.isPropertySignature(declaration) ||
      ts.isPropertyDeclaration(declaration) ||
      ts.isParameter(declaration)) &&
    declaration.type
  ) {
    return [declaration.type];
  }

  if (ts.isMethodSignature(declaration) || ts.isMethodDeclaration(declaration)) {
    return [declaration.type].filter(isDefined);
  }

  return [];
}

function getOriginsForProperty(
  propertyName: string,
  groups: TypeOriginGroup[],
): TypePropertyOrigin[] {
  return groups
    .filter((group) => group.properties.includes(propertyName))
    .map((group) => ({
      depth: group.depth,
      groupId: group.id,
      groupKind: group.kind,
      groupName: group.name,
      utilityName: group.utilityName,
    }));
}

function getDocumentation(ctx: ProgramContext, property: ts.Symbol): string | undefined {
  const documentation = ts
    .displayPartsToString(property.getDocumentationComment(ctx.checker))
    .trim();
  return documentation.length > 0 ? documentation : undefined;
}

function getPropertyNamesForType(ctx: ProgramContext, type: ts.Type): string[] {
  return ctx.checker
    .getPropertiesOfType(type)
    .map((property) => property.getName())
    .sort((a, b) => a.localeCompare(b));
}

function getPropertyNamesFromMembers(members: ts.NodeArray<ts.TypeElement>): string[] {
  return members
    .flatMap((member) => {
      if (
        (ts.isPropertySignature(member) || ts.isMethodSignature(member)) &&
        ts.isIdentifier(member.name)
      ) {
        return [member.name.text];
      }
      return [];
    })
    .sort((a, b) => a.localeCompare(b));
}

function getPrimaryDeclarationForTypeReference(
  ctx: ProgramContext,
  typeNode: ts.TypeReferenceNode,
): ts.Declaration | undefined {
  const sourceTypeNode = getSourceTypeNodeForTypeReference(typeNode);
  const symbolNode = ts.isTypeReferenceNode(sourceTypeNode)
    ? sourceTypeNode.typeName
    : typeNode.typeName;
  const symbol = ctx.checker.getSymbolAtLocation(symbolNode);
  if (!symbol) {
    return undefined;
  }

  return resolveAlias(ctx, symbol).getDeclarations()?.[0];
}

function getSourceTypeNodeForTypeReference(typeNode: ts.TypeReferenceNode): ts.TypeNode {
  if (isUtilityTypeReference(typeNode) && typeNode.typeArguments?.[0]) {
    return typeNode.typeArguments[0];
  }

  return typeNode;
}

function isUtilityTypeReference(typeNode: ts.TypeReferenceNode): boolean {
  return utilityTypeNames.has(getEntityNameText(typeNode.typeName));
}

function markDeclarationVisited(collector: OriginCollector, declaration: ts.Declaration): boolean {
  const sourceFile = declaration.getSourceFile();
  const key = `${path.normalize(sourceFile.fileName)}:${declaration.pos}:${declaration.end}`;
  if (collector.visitedDeclarations.has(key)) {
    return false;
  }

  collector.visitedDeclarations.add(key);
  return true;
}

function isNodeModulesDeclaration(declaration: ts.Declaration | undefined): boolean {
  if (!declaration) {
    return false;
  }

  return path
    .normalize(declaration.getSourceFile().fileName)
    .includes(`${path.sep}node_modules${path.sep}`);
}

function hasReadonlyModifier(declaration: ts.Declaration): boolean {
  if (!ts.canHaveModifiers(declaration)) {
    return false;
  }

  return (
    ts
      .getModifiers(declaration)
      ?.some((modifier) => modifier.kind === ts.SyntaxKind.ReadonlyKeyword) ?? false
  );
}

function getEntityNameText(entityName: ts.EntityName): string {
  if (ts.isIdentifier(entityName)) {
    return entityName.text;
  }

  return `${getEntityNameText(entityName.left)}.${entityName.right.text}`;
}

function getNodeText(node: ts.Node): string {
  return node.getText(node.getSourceFile()).replace(/\s+/g, ' ');
}

function getLocation(node: ts.Node): SourceLocation {
  const sourceFile = node.getSourceFile();
  const location = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));

  return {
    character: location.character + 1,
    filePath: sourceFile.fileName,
    line: location.line + 1,
  };
}

function createGroupId(collector: OriginCollector): string {
  const id = `group-${collector.nextGroupId}`;
  collector.nextGroupId += 1;
  return id;
}

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}
