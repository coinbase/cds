import type { IconName } from '@coinbase/cds-icons';

export type { IconName };

declare global {
  /**
   * Open registry for custom icon-set names. Declared globally rather than as a
   * module export so an icon package can register its names without depending on
   * (or knowing the published name of) any CDS package — the same augmentation
   * works against `@coinbase/cds-*` and mirrored `@cbhq/cds-*` installs.
   *
   * Each icon package adds ONE property whose *value* is its entire name union,
   * so registering hundreds of names needs no per-name entries:
   *
   *   declare global {
   *     namespace Cds {
   *       interface IconNameRegistry { retail: RetailIconName; }
   *     }
   *   }
   *
   * Multiple packages each add their own key; the unions combine automatically.
   */
  namespace Cds {
    // Must be an interface so consumers can extend it via declaration merging.
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface IconNameRegistry {}
  }
}

/**
 * Icon names accepted by components that render an icon by name: the built-in
 * `IconName` plus every name union registered through `Cds.IconNameRegistry`.
 * Kept separate from `IconName` so the built-in set stays closed (exhaustive
 * maps/records keep working) while component props widen. Empty registry →
 * indexing by `never` yields `never`, so this collapses to `IconName`.
 */
export type RegisteredIconName = IconName | Cds.IconNameRegistry[keyof Cds.IconNameRegistry];
