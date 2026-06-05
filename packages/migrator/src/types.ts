/**
 * Types for CDS migration tools
 */

/**
 * A jscodeshift transform — the default. Runs via `npx jscodeshift` against
 * JS/TS source files.
 */
export type JscodeshiftTransform = {
  type?: 'jscodeshift';
  name: string;
  description: string;
  /** Path to the transform file relative to the transforms directory (no extension). */
  file: string;
  /**
   * File extensions to process (comma-separated).
   * @default "tsx,ts,jsx,js"
   */
  extensions?: string;
};

/**
 * A Node.js script transform. Runs via `node <script> <targetPath> [--dry]`.
 * The script is responsible for finding and processing its own file types
 * (e.g. CSS, SCSS, HTML) and must export nothing at the module level that
 * would conflict with being run as a script.
 */
export type ScriptTransform = {
  type: 'script';
  name: string;
  description: string;
  /** Path to the compiled script relative to the transforms directory (no extension). */
  file: string;
};

export type Transform = JscodeshiftTransform | ScriptTransform;

/**
 * Preset manifest structure
 */
export type PresetManifest = {
  /**
   * Preset identifier (e.g., "v8-to-v9")
   */
  preset: string;
  /**
   * Overall description of the migration
   */
  description: string;
  /**
   * List of transforms in this preset
   */
  transforms: Transform[];
};

/**
 * Selection for what to migrate
 */
export type MigrationSelection = {
  /**
   * If true, migrate everything
   */
  all?: boolean;
  /**
   * Specific transforms to migrate (by name)
   */
  transforms?: string[];
};
