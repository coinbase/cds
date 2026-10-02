/** One illustration color: its CSS-variable name and its hex value in each color mode. */
/** A published illustration component as the source reports it, before its SVG is downloaded. */
export type Component = {
  nodeId: string;
  type: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  /** Deep link to the node in Figma, for error messages and review. */
  url: string;
};

/** One illustration as persisted in the manifest and handed to output connectors. */
export type Illustration = {
  /** The Figma node id of the component. */
  nodeId: string;
  /** The illustration type, camelCased from the Figma name prefix (`Spot Square/foo` -> `spotSquare`). */
  type: string;
  /** The illustration name, from the Figma name suffix (`Spot Square/foo` -> `foo`). */
  name: string;
  /** Comma separated keywords from the Figma component description, used for docsite search. */
  description: string;
  /** Hash of the optimized light SVG; a change here bumps `version`. */
  hash: string;
  /** Increments on every artwork change and resets on rename. Part of every asset file name. */
  version: number;
  width: number;
  height: number;
  /** Preserved across node re-creation so that createdAt-ordered outputs stay stable. */
  createdAt: string;
  lastUpdated: string;
};

/** `type/name` uniquely identifies an illustration independently of its Figma node id. */
export const illustrationKey = (illustration: Pick<Illustration, 'type' | 'name'>) =>
  `${illustration.type}/${illustration.name}`;

export const byCreatedAt = (a: Illustration, b: Illustration) => {
  const dateDiff = new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf();
  return dateDiff !== 0 ? dateDiff : a.name.localeCompare(b.name);
};

/** Case- and number-aware alphabetical order (`a1`, `a2`, `a10`). */
export const byName = (a: Pick<Illustration, 'name'>, b: Pick<Illustration, 'name'>) =>
  a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });

export const groupByType = (illustrations: Illustration[]) => {
  const groups = new Map<string, Illustration[]>();
  for (const illustration of illustrations) {
    const group = groups.get(illustration.type) ?? [];
    group.push(illustration);
    groups.set(illustration.type, group);
  }
  return groups;
};
