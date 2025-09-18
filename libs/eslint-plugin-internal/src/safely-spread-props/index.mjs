import { isTypeAnyType } from '@typescript-eslint/type-utils';
import { ESLintUtils } from '@typescript-eslint/utils';
import ts from 'typescript';

// TODO replace with URL to GitHub ./README.md
const createRule = ESLintUtils.RuleCreator((name) => null);

/**
 * Rule: safely-spread-props
 *
 * This rule prevents spreading props onto a React element if those props don't
 * belong on that element. This helps catch situations where props meant for one
 * component accidentally "leak" into another component.
 */
const rule = createRule({
  name: 'safely-spread-props',
  meta: {
    type: 'problem',
    docs: {
      description: "Prevent spreading props onto a React element that don't belong there",
      recommended: 'error',
    },
    messages: {
      invalidSpreadProps:
        "Spreading props onto {{ componentName }} may include properties that don't belong there. Please explicitly destructure all properties intended for other components.",
      invalidSpreadPropsWithDetails:
        "Spreading props onto {{ componentName }} includes properties that don't belong there: {{ invalidProps }}. These properties may belong to a different sibling element.",
      invalidSpreadPropsWithTruncatedDetails:
        "Spreading props onto {{ componentName }} includes properties that don't belong there: {{ invalidProps }}, and {{ remainingCount }} more. These properties may belong to a different sibling element.",
    },
    schema: [
      {
        type: 'object',
        properties: {
          maxInvalidPropsInMessage: {
            type: 'number',
            minimum: 0,
            description:
              'Maximum number of invalid props to list in the error message (0 for unlimited)',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ maxInvalidPropsInMessage: 0 }],
  create(context, [options]) {
    return {
      // This function runs whenever ESLint finds a JSX spread attribute {...props}
      JSXSpreadAttribute(node) {
        // Get TypeScript services - this bridges ESLint and TypeScript APIs
        const services = ESLintUtils.getParserServices(context);

        // Skip if TypeScript integration isn't available
        if (!services.program) {
          return;
        }

        // Get TypeScript's type checker - this analyzes types in our code
        const typeChecker = services.program.getTypeChecker();

        // Get the parent element (<Button {...props} />)
        const jsxElement = node.parent;
        if (!jsxElement || jsxElement.type !== 'JSXOpeningElement') {
          return;
        }

        // Extract component name ("Button" from <Button />)
        const componentName = extractComponentName(jsxElement);
        if (componentName === null) {
          return;
        }

        // Get the object being spread ("props" in {...props})
        const spreadArgument = node.argument;

        // Convert to TypeScript's AST node representation
        const spreadArgumentTsNode = services.esTreeNodeToTSNodeMap.get(spreadArgument);

        // Get the TypeScript type information for the spread object
        const spreadObjectType = typeChecker.getTypeAtLocation(spreadArgumentTsNode);

        // Skip 'any' types since we can't analyze their properties
        if (!spreadObjectType || isTypeAnyType(spreadObjectType)) {
          return;
        }

        // Find what props the component expects (<Button> expects ButtonProps)
        const componentPropsType = findComponentPropsType(
          jsxElement,
          componentName,
          services,
          typeChecker,
          context,
        );

        // Skip components with unknown or 'any' prop types
        if (!componentPropsType || isTypeAnyType(componentPropsType)) {
          return;
        }

        // Check for props that don't belong and report errors
        checkForInvalidProps(
          componentPropsType,
          spreadObjectType,
          typeChecker,
          node,
          context,
          componentName,
          options.maxInvalidPropsInMessage,
        );
      },
    };
  },
});

/**
 * Extracts the component name from a JSX element for use in error messages.
 * Handles both simple component names (Button) and member expressions (Styled.Button).
 *
 * @param jsxElement - The JSX element node
 * @returns The component name as a string
 */
function extractComponentName(jsxElement) {
  if (jsxElement.name.type === 'JSXIdentifier') {
    // Simple component name like <Button />
    return jsxElement.name.name;
  } else if (jsxElement.name.type === 'JSXMemberExpression') {
    // Member expression like <Styled.Button />
    return jsxElement.name.property.name;
  }

  return null;
}

/**
 * Main entry point for finding a component's expected props type.
 * React components can be defined in many ways (functions, classes, etc.),
 * so we need multiple strategies to find their prop types.
 *
 * @param jsxElement - The JSX element node (<Button {...props} />)
 * @param componentName - The name of the component ("Button")
 * @param services - TypeScript parser services (bridges ESLint and TS)
 * @param typeChecker - TypeScript type checker (analyzes types)
 * @param context - ESLint rule context (for reporting and source code)
 * @returns The TypeScript type for the component's props, or null if not found
 */
function findComponentPropsType(jsxElement, componentName, services, typeChecker, context) {
  // Bundle all parameters into a single object for easier passing between functions
  const resolutionContext = {
    jsxElement,
    componentName,
    services,
    typeChecker,
    context,
    sourceCode: context.sourceCode ?? context.getSourceCode?.(),
  };

  // Get the TypeScript node for the component name (like "Button" in <Button>)
  const jsxElementTsNode = services.esTreeNodeToTSNodeMap.get(jsxElement.name);

  // Get the type information for the component itself
  const componentType = typeChecker.getTypeAtLocation(jsxElementTsNode);

  // Try all available strategies to find the component's props type
  return resolvePropsType(componentType, resolutionContext);
}

/**
 * Coordinates multiple strategies for finding component prop types.
 * We try several different approaches in order of reliability.
 *
 * @param componentType - The component's TypeScript type
 * @param context - Object containing all necessary resolution info
 * @returns The component's props type or null if not found
 */
function resolvePropsType(componentType, context) {
  // Strategy 1: Look at the component's type directly (fastest)
  const directPropsType = resolvePropsTypeFromComponentType(componentType, context);
  if (directPropsType) return directPropsType;

  // Strategy 2: Check for component defined in current file
  const scopePropsType = resolvePropsTypeFromScope(context);
  if (scopePropsType) return scopePropsType;

  // Strategy 3: Look for component in imported files (slowest)
  return resolvePropsTypeFromImports(context);
}

/**
 * Examines a component's type directly to find its props type.
 * This handles different React component patterns including classes,
 * function components, and FC/FunctionComponent types.
 *
 * @param componentType - TypeScript type object for the component
 * @param context - Resolution context containing typeChecker
 * @returns The component's props type or null if not found
 */
function resolvePropsTypeFromComponentType(componentType, { typeChecker }) {
  if (!componentType) return null;

  // 1. Check for React class components (extends React.Component<Props>)
  const baseTypes = componentType.getBaseTypes?.();
  if (baseTypes?.length > 0) {
    for (const baseType of baseTypes) {
      const baseTypeName = typeChecker.typeToString(baseType);
      // Check if this extends React.Component with type arguments
      if (isReactComponentClassName(baseTypeName) && baseType.typeArguments?.[0]) {
        return baseType.typeArguments[0]; // First type argument is always props
      }
    }
  }

  // 2. For function components - check the first parameter type
  const callSignatures = componentType.getCallSignatures?.();
  if (callSignatures?.length > 0) {
    const parameters = callSignatures[0].getParameters();
    if (parameters?.length > 0 && parameters[0].valueDeclaration) {
      return typeChecker.getTypeOfSymbolAtLocation(parameters[0], parameters[0].valueDeclaration);
    }
  }

  // 3. For class components - check this.props property
  const propsSymbol = componentType.getProperty?.('props');
  if (propsSymbol) {
    return typeChecker.getTypeOfSymbol(propsSymbol);
  }

  // 4. For typed functional components (React.FC<Props>)
  if (componentType.aliasSymbol && componentType.aliasTypeArguments?.[0]) {
    return componentType.aliasTypeArguments[0];
  }

  // 5. Check for direct type arguments on any component
  if (componentType.typeArguments?.[0]) {
    return componentType.typeArguments[0];
  }

  return null;
}

/**
 * Finds component props by looking at component definitions in the current file.
 * This handles cases where the component is defined in the same file where it's used.
 *
 * @param context - Resolution context with component info and services
 * @returns The component's props type or null if not found
 */
function resolvePropsTypeFromScope({ componentName, context, services, typeChecker }) {
  const sourceCode = context.sourceCode ?? context.getSourceCode?.();
  const scope = sourceCode?.getScope ? sourceCode.getScope(sourceCode.ast) : context.getScope?.();

  if (!scope) return null;

  // Find the component in the scope chain
  const componentVariable = findVariableInNestedScopes(scope, componentName);
  if (!componentVariable?.defs?.length) return null;

  // Get the component definition
  const definition = componentVariable.defs[0];
  const nodeType = definition.node.type;

  // Handle different definition types
  if (nodeType === 'VariableDeclarator' && definition.node.init) {
    // Variable declarations (const, let, var)
    const initNode = services.esTreeNodeToTSNodeMap.get(definition.node.init);
    const initType = typeChecker.getTypeAtLocation(initNode);
    return resolvePropsTypeFromComponentType(initType, { typeChecker });
  }

  if (nodeType === 'FunctionDeclaration') {
    // Function declarations
    const functionNode = services.esTreeNodeToTSNodeMap.get(definition.node);
    const functionType = typeChecker.getTypeAtLocation(functionNode);

    // Try from function type
    const propsType = resolvePropsTypeFromComponentType(functionType, {
      typeChecker,
    });
    if (propsType) return propsType;

    // Try from first parameter
    if (definition.node.params?.[0]) {
      const firstParam = services.esTreeNodeToTSNodeMap.get(definition.node.params[0]);
      if (firstParam) {
        return typeChecker.getTypeAtLocation(firstParam);
      }
    }
  }

  if (nodeType === 'ClassDeclaration') {
    // Class declarations
    const classNode = services.esTreeNodeToTSNodeMap.get(definition.node);
    const classType = typeChecker.getTypeAtLocation(classNode);

    // Check type parameters on class
    if (classType.typeParameters?.[0]) {
      return classType.typeParameters[0];
    }

    // Check base class type arguments
    const baseTypes = classType.getBaseTypes?.();
    if (baseTypes?.length > 0) {
      for (const baseType of baseTypes) {
        if (baseType.typeArguments?.[0]) {
          return baseType.typeArguments[0];
        }
      }
    }
  }

  return null;
}

/**
 * Looks for component props by following imports to their source files.
 * This handles components that are imported from other files or libraries.
 *
 * @param context - Resolution context with component and sourceCode info
 * @returns The component's props type or null if not found
 */
function resolvePropsTypeFromImports({ componentName, services, typeChecker, sourceCode }) {
  if (!sourceCode?.ast) return null;

  // Get import declarations
  const importDeclarations = sourceCode.ast.body.filter(
    (node) => node.type === 'ImportDeclaration',
  );

  // Try each import declaration
  for (const importDecl of importDeclarations) {
    // Find matching specifier for our component
    const matchingSpecifier = importDecl.specifiers?.find(
      (spec) => spec.local?.name === componentName,
    );

    if (!matchingSpecifier) continue;

    // Handle renamed imports
    const importedName = matchingSpecifier.imported?.name || componentName;
    const sourceModule = importDecl.source.value;
    if (!sourceModule) continue;

    // Get source files from program
    const sourceFiles = services.program.getSourceFiles();

    // Check normal source files first
    const regularSourceResult = sourceFiles
      .filter(
        (file) => !file.isDeclarationFile && filePathMatchesModule(file.fileName, sourceModule),
      )
      .map((file) => findExportedComponentInFile(file, importedName, typeChecker))
      .find((result) => result !== null);

    if (regularSourceResult) return regularSourceResult;

    // Then check declaration files as fallback
    const declarationFileResult = sourceFiles
      .filter((file) => file.isDeclarationFile && file.fileName.includes(sourceModule))
      .map((file) => findExportedComponentInFile(file, importedName, typeChecker))
      .find((result) => result !== null);

    if (declarationFileResult) return declarationFileResult;
  }

  return null;
}

/**
 * Checks if a type name is a React component class type.
 *
 * @param typeName - The name of the type to check
 * @returns true if the type is a React component class type
 */
function isReactComponentClassName(typeName) {
  const reactComponentPattern =
    /(^|[^a-zA-Z0-9])(React\.Component|Component|PureComponent)($|[^a-zA-Z0-9])/;
  return reactComponentPattern.test(typeName);
}

/**
 * Recursively finds a variable in the scope chain, including nested child scopes.
 *
 * @param scope - The ESLint scope to search in
 * @param variableName - The name of the variable to find
 * @returns The variable if found, or null
 */
function findVariableInNestedScopes(scope, variableName) {
  // Check variables in the current scope
  const variable = scope.variables.find((v) => v.name === variableName);
  if (variable) return variable;

  // Recursively check child scopes
  for (const childScope of scope.childScopes) {
    const result = findVariableInNestedScopes(childScope, variableName);
    if (result) return result;
  }

  return null;
}

/**
 * Checks if a file path matches a module name to identify the source file for an import.
 *
 * @param filePath - Path to the source file
 * @param moduleName - Name of the imported module
 * @returns true if the file likely corresponds to the module
 */
function filePathMatchesModule(filePath, moduleName) {
  return (
    filePath.includes(moduleName) ||
    filePath.endsWith(`/${moduleName}.ts`) ||
    filePath.endsWith(`/${moduleName}.tsx`)
  );
}

/**
 * Finds an exported component in a source file by traversing the TypeScript AST.
 *
 * @param sourceFile - TypeScript source file
 * @param componentName - The name of the component to find
 * @param typeChecker - TypeScript type checker
 * @returns The TypeScript type for the component's props, or null if not found
 */
function findExportedComponentInFile(sourceFile, componentName, typeChecker) {
  // Define a visitor function that handles specific node types
  const visitor = {
    // Handle exported class components like: export class Button extends React.Component<ButtonProps>
    visitClassDeclaration(node) {
      if (node.name?.text !== componentName || !hasExportModifier(node)) return null;

      // Check if the class extends React.Component with type arguments
      const heritageClause = node.heritageClauses?.[0];
      if (heritageClause?.token === ts.SyntaxKind.ExtendsKeyword) {
        const extendExpression = heritageClause.types[0];
        if (extendExpression?.typeArguments?.[0]) {
          return typeChecker.getTypeAtLocation(extendExpression.typeArguments[0]);
        }
      }

      // Try to find a related Props type by naming convention
      const propsTypeName = `${componentName}Props`;
      return findTypeInSourceFile(sourceFile, propsTypeName, typeChecker);
    },

    // Handle exported function components like: export function Button(props: ButtonProps)
    visitFunctionDeclaration(node) {
      if (node.name?.text !== componentName || !hasExportModifier(node)) return null;

      // Get type from first parameter if it exists and has a type annotation
      if (node.parameters.length > 0 && node.parameters[0].type) {
        return typeChecker.getTypeAtLocation(node.parameters[0]);
      }
      return null;
    },

    // Handle exported variable declarations like: export const Button = (props: ButtonProps) => ...
    visitVariableStatement(node) {
      if (!hasExportModifier(node)) return null;

      for (const declaration of node.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name) && declaration.name.text === componentName) {
          return typeChecker.getTypeAtLocation(declaration);
        }
      }
      return null;
    },
  };

  // Helper function to find the first non-null result from AST traversal
  function findFirstResult(node) {
    // Try to handle this node with our visitor
    if (ts.isClassDeclaration(node)) {
      const result = visitor.visitClassDeclaration(node);
      if (result) return result;
    } else if (ts.isFunctionDeclaration(node)) {
      const result = visitor.visitFunctionDeclaration(node);
      if (result) return result;
    } else if (ts.isVariableStatement(node)) {
      const result = visitor.visitVariableStatement(node);
      if (result) return result;
    }

    // If we couldn't handle this node, traverse its children
    return ts.forEachChild(node, findFirstResult);
  }

  // Start traversal from the source file
  return findFirstResult(sourceFile);
}

/**
 * Checks if a node has export modifiers (export or export default).
 *
 * @param node - TypeScript node to check
 * @returns true if the node has an export modifier
 */
function hasExportModifier(node) {
  return (
    node.modifiers?.some(
      (mod) =>
        mod.kind === ts.SyntaxKind.ExportKeyword || mod.kind === ts.SyntaxKind.DefaultKeyword,
    ) ?? false
  );
}

/**
 * Searches all source files for a type with the given name.
 *
 * @param program - TypeScript program
 * @param typeName - Name of the type to find
 * @param typeChecker - TypeScript type checker
 * @returns The TypeScript type if found, or null
 */
function findTypeInAllSourceFiles(program, typeName, typeChecker) {
  for (const sourceFile of program.getSourceFiles()) {
    const foundType = findTypeInSourceFile(sourceFile, typeName, typeChecker);
    if (foundType) return foundType;
  }
  return null;
}

/**
 * Finds a type in a specific source file by name.
 *
 * @param sourceFile - TypeScript source file
 * @param typeName - Name of the type to find
 * @param typeChecker - TypeScript type checker
 * @returns The TypeScript type if found, or null
 */
function findTypeInSourceFile(sourceFile, typeName, typeChecker) {
  // Find a type declaration (either type alias or interface) with the given name
  function findTypeDeclaration(node) {
    // Match type alias declarations like: type ButtonProps = { ... }
    if (ts.isTypeAliasDeclaration(node) && node.name.text === typeName) {
      return typeChecker.getTypeAtLocation(node);
    }

    // Match interface declarations like: interface ButtonProps { ... }
    if (ts.isInterfaceDeclaration(node) && node.name.text === typeName) {
      return typeChecker.getTypeAtLocation(node);
    }

    // Continue traversing AST children
    return ts.forEachChild(node, findTypeDeclaration);
  }

  // Start traversal from the source file
  return findTypeDeclaration(sourceFile);
}

/**
 * Checks if a type has properties, which helps determine if it's a valid props type object.
 *
 * @param type - TypeScript type to check
 * @param typeChecker - TypeScript type checker
 * @returns true if the type has properties
 */
function hasPropertiesOnType(type, typeChecker) {
  if (!type) return false;
  const properties = getTypePropertyNames(type, typeChecker);
  return properties.size > 0;
}

/**
 * Gets all property names from a TypeScript type.
 *
 * @param type - TypeScript type to get properties from
 * @param typeChecker - TypeScript type checker
 * @returns A Set of property names
 */
function getTypePropertyNames(type, typeChecker) {
  // Return empty set for undefined or null types
  if (!type) return new Set();

  try {
    // Get all the properties of the type from the type checker
    const properties = typeChecker.getPropertiesOfType(type);
    // Return a Set constructed from an array of property names
    return new Set(
      properties?.filter((property) => property?.name).map((property) => property.name) || [],
    );
  } catch (e) {
    // Ignore errors - type checking can be brittle
    return new Set();
  }
}

/**
 * Detects invalid props being spread onto a component and reports ESLint errors.
 * This function compares what props are being spread with what the component accepts.
 *
 * @param componentPropsType - Type of props the component accepts
 * @param spreadObjectType - Type of the object being spread onto the component
 * @param typeChecker - TypeScript type checker for analyzing types
 * @param node - The JSX spread attribute node (like {...props})
 * @param context - ESLint context for reporting errors
 * @param componentName - Name of the component receiving the spread
 * @param maxInvalidPropsInMessage - Max number of props to show in error message
 */
function checkForInvalidProps(
  componentPropsType,
  spreadObjectType,
  typeChecker,
  node,
  context,
  componentName,
  maxInvalidPropsInMessage,
) {
  // React automatically handles these props, so they're always allowed in spreads
  const REACT_SPECIAL_PROPS = new Set(['key', 'ref', 'children']);

  // Extract property names from both types to compare them
  const validComponentProps = getTypePropertyNames(componentPropsType, typeChecker);
  const spreadObjectProps = getTypePropertyNames(spreadObjectType, typeChecker);

  // If component has no known props, we can't check for invalid ones
  if (validComponentProps.size === 0) return;

  // Find props being spread that don't belong on this component
  const invalidProps = [...spreadObjectProps].filter(
    (prop) => !REACT_SPECIAL_PROPS.has(prop) && !validComponentProps.has(prop),
  );

  // Case 1: Generic warning when we suspect invalid props but can't identify them
  if (invalidProps.length === 0 && spreadObjectProps.size > validComponentProps.size) {
    context.report({
      node: node.argument,
      messageId: 'invalidSpreadProps',
      data: { componentName },
    });
    return;
  }

  // Case 2: No problems found, exit without reporting
  if (invalidProps.length === 0) return;

  // Case 3: Too many invalid props to show them all
  if (maxInvalidPropsInMessage > 0 && invalidProps.length > maxInvalidPropsInMessage) {
    const displayedProps = invalidProps.slice(0, maxInvalidPropsInMessage);
    const remainingCount = invalidProps.length - maxInvalidPropsInMessage;

    context.report({
      node: node.argument,
      messageId: 'invalidSpreadPropsWithTruncatedDetails',
      data: {
        componentName,
        invalidProps: displayedProps.join(', '),
        remainingCount,
      },
    });
    return;
  }

  // Case 4: Show detailed list of all invalid props in the error
  context.report({
    node: node.argument,
    messageId: 'invalidSpreadPropsWithDetails',
    data: {
      componentName,
      invalidProps: invalidProps.join(', '),
    },
  });
}

export default rule;
