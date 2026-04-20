/**
 * Interactable CSS variable rename migration (v8 → v9, web only)
 *
 * In v9, the CSS custom properties exposed by the Pressable / interactable
 * system were shortened and switched from all-kebab-case to a camelCase
 * property suffix:
 *
 *   --interactable-border-radius         → --inter-borderRadius
 *   --interactable-background            → --inter-bg
 *   --interactable-border-color          → --inter-borderColor
 *   --interactable-pressed-background    → --inter-press-bg
 *   --interactable-pressed-border-color  → --inter-press-borderColor
 *   --interactable-pressed-opacity       → --inter-press-opacity
 *   --interactable-hovered-background    → --inter-hover-bg
 *   --interactable-hovered-border-color  → --inter-hover-borderColor
 *   --interactable-hovered-opacity       → --inter-hover-opacity
 *   --interactable-disabled-background   → --inter-disable-bg
 *   --interactable-disabled-border-color → --inter-disable-borderColor
 *
 * Handles JS/TS files only:
 *   - String literals used as style object keys or values (e.g. `var(--interactable-background)`)
 *   - Template literal quasis (static string segments)
 *
 * Not handled (require a CSS/text-based migration tool):
 *   - CSS / SCSS / Less files
 *   - HTML inline style attributes
 *
 * Idempotent: a second run is a no-op once all names have been updated.
 */
import type { API, FileInfo } from 'jscodeshift';

import { transformLogger } from '../../utils/transform-utils';

const VAR_RENAMES: ReadonlyArray<readonly [string, string]> = [
  ['--interactable-border-radius', '--inter-borderRadius'],
  ['--interactable-background', '--inter-bg'],
  ['--interactable-border-color', '--inter-borderColor'],
  ['--interactable-pressed-background', '--inter-press-bg'],
  ['--interactable-pressed-border-color', '--inter-press-borderColor'],
  ['--interactable-pressed-opacity', '--inter-press-opacity'],
  ['--interactable-hovered-background', '--inter-hover-bg'],
  ['--interactable-hovered-border-color', '--inter-hover-borderColor'],
  ['--interactable-hovered-opacity', '--inter-hover-opacity'],
  ['--interactable-disabled-background', '--inter-disable-bg'],
  ['--interactable-disabled-border-color', '--inter-disable-borderColor'],
];

/** Returns the string with all old CSS var names replaced, or null if nothing changed. */
function applyRenames(value: string): string | null {
  let result = value;
  for (const [oldVar, newVar] of VAR_RENAMES) {
    result = result.replaceAll(oldVar, newVar);
  }
  return result !== value ? result : null;
}

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  let hasChanges = false;

  root.find(j.StringLiteral).forEach((path) => {
    const next = applyRenames(path.value.value);
    if (next === null) return;
    transformLogger.success(
      `Renamed CSS var in string literal: ${path.value.value} → ${next}`,
      file.path,
      path.value.loc?.start.line,
    );
    path.value.value = next;
    hasChanges = true;
  });

  root.find(j.TemplateElement).forEach((path) => {
    const raw = applyRenames(path.value.value.raw);
    if (raw === null) return;
    const cooked =
      path.value.value.cooked !== null && path.value.value.cooked !== undefined
        ? (applyRenames(path.value.value.cooked) ?? path.value.value.cooked)
        : path.value.value.cooked;
    transformLogger.success(
      `Renamed CSS var in template literal: ${path.value.value.raw} → ${raw}`,
      file.path,
      path.value.loc?.start.line,
    );
    path.value.value = { raw, cooked };
    hasChanges = true;
  });

  if (!hasChanges) return null;
  return root.toSource();
}
