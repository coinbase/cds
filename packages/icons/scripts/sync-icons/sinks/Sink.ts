import type { SyncIconsConfig } from '../config';
import type { IconAsset } from '../diff';
import type { Manifest, ManifestIconSet } from '../manifest';

/** What the sync decided, for the sinks to write. */
export type SinkChanges = {
  config: SyncIconsConfig;
  /**
   * The manifest the sync is about to write. The font sink gives each new icon a code point in
   * it, so sinks that run after the font sink see the final code points.
   */
  manifest: Manifest;
  /** New and changed icon sets, with the SVGs to write for them. */
  write: { iconSet: ManifestIconSet; icons: IconAsset[] }[];
  /** The previous version of every changed and deleted icon set, whose files are replaced. */
  remove: ManifestIconSet[];
};

/** An icon set a sink cannot write; what was published for it stays. */
export type SinkFailure = {
  nodeId: string;
  name: string;
  message: string;
};

export type SinkPlan = {
  sink: string;
  failures: SinkFailure[];
  commit(): Promise<void>;
};

/**
 * A destination of the sync. `plan` checks what the sink is about to write without writing it, so
 * that an icon set that cannot be written is rejected before any file changes; `apply` writes.
 */
export abstract class Sink {
  /** `assets` sinks write before the manifest is saved, `finish` sinks after it. */
  readonly stage: 'assets' | 'finish' = 'assets';

  /** Whether the sink also runs when no icon set changed. */
  readonly runsWithoutChanges: boolean = false;

  get name() {
    return this.constructor.name;
  }

  abstract apply(changes: SinkChanges): Promise<void>;

  async plan(changes: SinkChanges): Promise<SinkPlan> {
    return { sink: this.name, failures: [], commit: () => this.apply(changes) };
  }
}
