import type { ColorPalette } from '../colorPalette';
import type { Illustration } from '../illustration';

export type SinkOptions = {
  /**
   * Restricts the sink to a subset of illustrations; it never sees the rest. Defaults to every
   * illustration. See `includeTypes`.
   */
  include?: (illustration: Illustration) => boolean;
};

/** `include` helper that limits a sink to the given illustration types. */
export const includeTypes =
  (...types: string[]) =>
  (illustration: Illustration) =>
    types.includes(illustration.type);

/** The work the engine resolved for one sink in one run. */
export type SinkChanges = {
  /** Previous entries whose files are stale: superseded versions, old names, deleted illustrations. */
  remove: Illustration[];
  /** Illustrations to (re)write: changed ones, plus any the sink reported it does not `have`. */
  write: { illustration: Illustration; svg: string }[];
  /** The complete current set the sink accepts, for anything derived from the whole set. */
  illustrations: Illustration[];
  /** The palette, for sinks that derive themed variants. */
  palette: ColorPalette;
};

/**
 * A destination for synced illustrations: a package, a repository, a directory somewhere. A sink
 * owns everything about how illustrations appear there: which files, in which layout, with which
 * theming. It receives the optimized light SVG (the one design provides) and the palette, and
 * builds whatever it needs from them with the helpers in `artifacts/`.
 *
 * The engine does the planning: it decides what is stale, what changed and what the sink is
 * missing, then hands the sink its resolved changes in one `apply` call. `apply` must be
 * idempotent; the engine calls it on every run that found anything to do, and the sink may be
 * asked to rewrite files it already has (set-derived files after a description-only change).
 */
export abstract class Sink {
  private readonly include?: SinkOptions['include'];

  constructor({ include }: SinkOptions = {}) {
    this.include = include;
  }

  get name() {
    return this.constructor.name;
  }

  accepts(illustration: Illustration) {
    return this.include?.(illustration) ?? true;
  }

  /**
   * Whether every file this sink writes for the illustration is present. Missing illustrations are
   * downloaded and included in the next `apply`, which is what fills a new or wiped destination.
   */
  abstract has(illustration: Illustration): Promise<boolean>;

  abstract apply(changes: SinkChanges): Promise<void>;
}
