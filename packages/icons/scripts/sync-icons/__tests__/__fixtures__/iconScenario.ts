import { profile } from '../../profile';
import type { InMemoryIconSet, InMemoryVariant } from '../../source/InMemorySource';

/** A square icon, drawn differently per `shape` so that two icons never hash the same. */
export const squareSvg = (shape: number) =>
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">` +
  `<path d="M${shape} ${shape}H${24 - shape}V${24 - shape}H${shape}Z" fill="black"/></svg>`;

/** The variants an icon set needs: every size of the profile, each active and inactive. */
export const variantsOf = (nodeId: string, svg: string): InMemoryVariant[] =>
  profile.variants.sizes.flatMap((size) =>
    [true, false].map((active) => ({
      id: `${nodeId}:${size}:${active}`,
      name: `size=${size}, active=${active}`,
      svg,
    })),
  );

export const iconSet = (
  name: string,
  nodeId: string,
  shape: number,
  overrides: Partial<InMemoryIconSet> = {},
): InMemoryIconSet => ({
  nodeId,
  name,
  description: 'an icon',
  createdAt: `2026-01-${String(Number(nodeId.split(':')[1]) + 10).padStart(2, '0')}T00:00:00.000Z`,
  updatedAt: '2026-02-01T00:00:00.000Z',
  variants: variantsOf(nodeId, squareSvg(shape)),
  ...overrides,
});

const touched = { updatedAt: '2026-03-01T00:00:00.000Z' };

/** The library at the first sync: five icon sets. */
export const firstLibrary = (): InMemoryIconSet[] => [
  iconSet('ui/add', '1:1', 2),
  iconSet('ui/remove', '1:2', 3),
  iconSet('ui/cash', '1:3', 4),
  iconSet('ui/plus', '1:7', 9),
  iconSet('ui/stack', '1:9', 8),
];

/**
 * The library at the second sync:
 * - `add` is redrawn, and `Plus` only changes its capitalization;
 * - `remove` is renamed to `minus` (same node id), and `stack` is re-created (new node id, same name);
 * - `cash` is deleted and `send` is new, with a second `send` that is newer (the older one stays);
 * - `nav/add` has the name of the published `add` (the published one stays);
 * - `broken` is missing a variant, and `bad name` has a space in its name.
 */
export const secondLibrary = (): InMemoryIconSet[] => [
  iconSet('ui/add', '1:1', 5, touched),
  iconSet('ui/minus', '1:2', 3, { ...touched, description: 'a new description' }),
  iconSet('ui/Plus', '1:7', 9, touched),
  iconSet('ui/stack', '1:10', 8, touched),
  iconSet('ui/send', '1:4', 6, touched),
  iconSet('nav/send', '1:6', 8, { updatedAt: '2026-03-02T00:00:00.000Z' }),
  iconSet('nav/add', '1:11', 8),
  iconSet('ui/broken', '1:5', 7, { variants: variantsOf('1:5', squareSvg(7)).slice(1) }),
  iconSet('ui/bad name', '1:8', 7),
];

/** A published component that is not part of any set. */
export const looseHelper = {
  nodeId: '9:1',
  name: 'Icon / helper',
  url: 'https://www.figma.com/design/FILE?node-id=9-1',
};

/**
 * The library at the third sync: nothing changed, except that `stack` has a variant named wrongly
 * (what was published for it stays), and a component outside a set was published.
 */
export const thirdLibrary = (): InMemoryIconSet[] =>
  secondLibrary().map((set) =>
    set.nodeId === '1:10'
      ? {
          ...set,
          updatedAt: '2026-04-01T00:00:00.000Z',
          variants: set.variants.map((variant, index) =>
            index === 0 ? { ...variant, name: 'size=big, active=true' } : variant,
          ),
        }
      : set,
  );

/** The library at the fourth sync: `send` and `cash` stay deleted, `stack` is fixed and `minus` is deleted. */
export const fourthLibrary = (): InMemoryIconSet[] =>
  secondLibrary().filter(({ nodeId }) => !['1:4', '1:6', '1:2'].includes(nodeId));

/** The Figma file id of the reports. */
export const scenarioFigmaFileId = 'FIGMA_FILE';
