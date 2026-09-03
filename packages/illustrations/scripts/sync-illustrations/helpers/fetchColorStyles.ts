import { getLocalVariables, getPublishedVariables } from '@cds/figma-api';
import type {
  GetLocalVariablesResponse,
  GetPublishedVariablesResponse,
  LocalVariable,
  LocalVariableCollection,
  RGBA,
} from '@figma/rest-api-spec';

import type { ColorMode } from './getColorModeAndName';
import { figmaColorToHex, type Paint } from './getPaintFromNode';

/**
 * Represents a color style item as stored in the manifest.
 * This structure matches the format expected by ColorStyles class.
 */
export type ColorStyleItem = {
  key: string;
  name: string;
  type: ColorMode;
  prefix: string;
  paint: Paint;
  cssVarSetter: `--${string}`;
  cssVarGetter: `var(--${string})`;
};

/**
 * The manifest structure for color styles, matching what's expected by ColorStyles.
 */
export type ColorStyleManifest = {
  executor: string;
  items: Record<string, ColorStyleItem>;
};

type FetchColorStylesParams = {
  /** The Figma file ID containing the color variables */
  fileId: string;
  /** Prefix for CSS variable names (e.g., "illustration" -> "--illustration-primary") */
  prefix: string;
};

type FetchColorStylesResult = {
  light: ColorStyleManifest;
  dark: ColorStyleManifest;
};

/**
 * Determines if a mode name represents light or dark theme.
 * Matches common patterns like "Light", "Light Mode", "light-mode", etc.
 */
function getModeType(modeName: string): ColorMode | null {
  const lowerName = modeName.toLowerCase();
  if (lowerName.includes('light')) {
    return 'light';
  }
  if (lowerName.includes('dark')) {
    return 'dark';
  }
  return null;
}

/**
 * Checks if a variable value is a Figma color object
 */
function isFigmaColor(value: unknown): value is RGBA {
  return (
    typeof value === 'object' &&
    value !== null &&
    'r' in value &&
    'g' in value &&
    'b' in value &&
    'a' in value &&
    !('type' in value) // Exclude VariableAlias which has a 'type' property
  );
}

/**
 * Variable alias reference type
 */
type VariableAlias = {
  type: 'VARIABLE_ALIAS';
  id: string;
};

/**
 * Checks if a variable value is a variable alias (reference to another variable)
 */
function isVariableAlias(value: unknown): value is VariableAlias {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as VariableAlias).type === 'VARIABLE_ALIAS' &&
    'id' in value
  );
}

/**
 * Fetches published color variables from a Figma file and returns them formatted as color style manifests.
 *
 * This function:
 * 1. Calls getPublishedVariables() to get the list of published variables
 * 2. Calls getLocalVariables() to get the actual values (published endpoint doesn't include values)
 * 3. Matches published variables with their local values
 * 4. Determines light/dark mode based on the mode names in variable collections
 * 5. Formats everything into light/dark manifests matching the expected structure
 *
 * @param params.fileId - The Figma file ID containing color variables
 * @param params.prefix - CSS variable prefix (e.g., "illustration")
 * @returns Promise resolving to { light, dark } manifest objects
 */
export async function fetchColorStyles({
  fileId,
  prefix,
}: FetchColorStylesParams): Promise<FetchColorStylesResult> {
  console.log(`Fetching published variables from Figma file: ${fileId}...`);

  // Step 1: Get published variables (to know which ones are published)
  let publishedResponse: GetPublishedVariablesResponse;
  try {
    publishedResponse = await getPublishedVariables(fileId);
  } catch (error) {
    throw new Error(`Error fetching published variables from Figma file: ${fileId}. ${error}`);
  }
  const publishedVariables = publishedResponse.meta.variables;
  const publishedVariableIds = new Set(Object.keys(publishedVariables));

  console.log(`Found ${publishedVariableIds.size} published variables`);

  if (publishedVariableIds.size === 0) {
    console.warn('No published variables found in the Figma file');
    return {
      light: createEmptyManifest('light', prefix),
      dark: createEmptyManifest('dark', prefix),
    };
  }

  // Step 2: Get local variables (to get actual values - published endpoint doesn't include them)
  let localResponse: GetLocalVariablesResponse;
  try {
    localResponse = await getLocalVariables(fileId);
  } catch (error) {
    throw new Error(`Error fetching local variables from Figma file: ${fileId}. ${error}`);
  }
  const localVariables = localResponse.meta.variables;
  const variableCollections = localResponse.meta.variableCollections;

  console.log(
    `Fetched ${Object.keys(localVariables).length} local variables and ${
      Object.keys(variableCollections).length
    } collections`,
  );

  // Step 3: Build a map of collection ID -> mode ID -> color mode (light/dark)
  const collectionModeMap = buildCollectionModeMap(variableCollections);

  // Step 4: Filter to only variables with "illustration" in their name and build the manifests
  const illustrationVariableIds = [...publishedVariableIds].filter((id) => {
    const localVar = localVariables[id];
    return localVar && localVar.name.toLowerCase().includes('illustration');
  });

  const lightItems: Record<string, ColorStyleItem> = {};
  const darkItems: Record<string, ColorStyleItem> = {};

  for (const variableId of illustrationVariableIds) {
    const publishedVar = publishedVariables[variableId];
    const localVar = localVariables[variableId];

    if (!localVar) {
      console.warn(
        `Could not find local data for published variable: ${publishedVar.name} (${variableId})`,
      );
      continue;
    }

    // Process each mode value for this variable
    processVariableModes({
      variable: localVar,
      publishedKey: publishedVar.key,
      collectionModeMap,
      prefix,
      lightItems,
      darkItems,
      allVariables: localVariables,
    });
  }

  return {
    light: {
      executor: `sync-${prefix}-light-variables`,
      items: lightItems,
    },
    dark: {
      executor: `sync-${prefix}-dark-variables`,
      items: darkItems,
    },
  };
}

/**
 * Builds a map from collection ID to mode ID to color mode (light/dark)
 */
function buildCollectionModeMap(
  collections: Record<string, LocalVariableCollection>,
): Map<string, Map<string, ColorMode>> {
  const collectionModeMap = new Map<string, Map<string, ColorMode>>();

  for (const [collectionId, collection] of Object.entries(collections)) {
    const modeMap = new Map<string, ColorMode>();

    for (const mode of collection.modes) {
      const colorMode = getModeType(mode.name);
      if (colorMode) {
        modeMap.set(mode.modeId, colorMode);
      }
    }

    if (modeMap.size > 0) {
      collectionModeMap.set(collectionId, modeMap);
    }
  }

  return collectionModeMap;
}

type ProcessVariableModesParams = {
  variable: LocalVariable;
  publishedKey: string;
  collectionModeMap: Map<string, Map<string, ColorMode>>;
  prefix: string;
  lightItems: Record<string, ColorStyleItem>;
  darkItems: Record<string, ColorStyleItem>;
  allVariables: Record<string, LocalVariable>;
};

/**
 * Resolves a variable value, following variable aliases until we get an actual value.
 * This handles cases where a variable references another variable.
 *
 * @param value - The value to resolve (could be a direct value or a variable alias)
 * @param modeId - The mode ID to use when looking up values in referenced variables
 * @param allVariables - Map of all variables for resolving aliases
 * @param maxDepth - Maximum recursion depth to prevent infinite loops (default: 10)
 * @returns The resolved value, or undefined if it couldn't be resolved
 */
function resolveVariableValue(
  value: unknown,
  modeId: string,
  allVariables: Record<string, LocalVariable>,
  maxDepth: number = 10,
): unknown {
  // Prevent infinite recursion
  if (maxDepth <= 0) {
    console.warn('Max recursion depth reached when resolving variable alias');
    return undefined;
  }

  // If it's not an alias, return the value directly
  if (!isVariableAlias(value)) {
    return value;
  }

  // It's an alias - look up the referenced variable
  const referencedVar = allVariables[value.id];
  if (!referencedVar) {
    console.warn(`Could not find referenced variable: ${value.id}`);
    return undefined;
  }

  // Get the value for the same mode from the referenced variable
  const referencedValue = referencedVar.valuesByMode[modeId];
  if (referencedValue === undefined) {
    // Try to find any mode value if the exact mode doesn't exist
    const modeValues = Object.values(referencedVar.valuesByMode);
    if (modeValues.length > 0) {
      return resolveVariableValue(modeValues[0], modeId, allVariables, maxDepth - 1);
    }
    console.warn(`No value found for mode ${modeId} in referenced variable: ${referencedVar.name}`);
    return undefined;
  }

  // Recursively resolve in case the referenced variable also uses an alias
  return resolveVariableValue(referencedValue, modeId, allVariables, maxDepth - 1);
}

/**
 * Cleans up a variable name for use in CSS variables.
 * - Removes the "illustration/" prefix (or any prefix before the first "/")
 * - Replaces whitespaces with dashes
 * - Converts to lowercase for CSS convention
 *
 * Example: "illustration/accent 2" -> "accent-2"
 */
function cleanVariableName(name: string): string {
  // Remove the prefix (everything before and including the first "/")
  const withoutPrefix = name.includes('/') ? name.split('/').slice(1).join('/') : name;

  // Replace whitespaces with dashes
  const withDashes = withoutPrefix.replace(/\s+/g, '-');

  return withDashes;
}

/**
 * Processes all mode values for a variable and adds them to the appropriate manifest
 */
function processVariableModes({
  variable,
  publishedKey,
  collectionModeMap,
  prefix,
  lightItems,
  darkItems,
  allVariables,
}: ProcessVariableModesParams): void {
  const modeMap = collectionModeMap.get(variable.variableCollectionId);

  if (!modeMap) {
    // Collection doesn't have light/dark modes, skip
    return;
  }

  // Clean up the variable name for CSS compatibility
  const cleanName = cleanVariableName(variable.name);

  for (const [modeId, value] of Object.entries(variable.valuesByMode)) {
    const colorMode = modeMap.get(modeId);
    if (!colorMode) {
      // Mode is not light or dark, skip
      continue;
    }

    // Resolve the value, following any variable aliases
    const resolvedValue = resolveVariableValue(value, modeId, allVariables);

    // Convert resolved value to paint format
    const paint = valueToPaint(resolvedValue, variable.resolvedType);
    if (!paint) {
      continue;
    }

    // Create a unique ID for this variable+mode combination
    const itemId = `${variable.id}:${modeId}`;

    const colorStyleItem: ColorStyleItem = {
      key: publishedKey,
      name: cleanName,
      type: colorMode,
      prefix,
      paint,
      cssVarSetter: `--${prefix}-${cleanName}`,
      cssVarGetter: `var(--${prefix}-${cleanName})`,
    };

    if (colorMode === 'light') {
      lightItems[itemId] = colorStyleItem;
    } else {
      darkItems[itemId] = colorStyleItem;
    }
  }
}

/**
 * Converts a variable value to Paint format
 */
function valueToPaint(
  value: unknown,
  resolvedType: LocalVariable['resolvedType'],
): Paint | undefined {
  // Handle COLOR type - convert RGBA to hex
  if (resolvedType === 'COLOR' && isFigmaColor(value)) {
    return {
      type: 'solid',
      value: figmaColorToHex(value),
    };
  }

  // For other types (FLOAT, STRING, BOOLEAN), we could extend this
  // but for now we only support colors for the illustration use case
  return undefined;
}

function createEmptyManifest(colorMode: ColorMode, prefix: string): ColorStyleManifest {
  return {
    executor: `sync-${prefix}-${colorMode}-variables`,
    items: {},
  };
}
