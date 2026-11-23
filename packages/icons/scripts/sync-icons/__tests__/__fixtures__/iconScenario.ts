import type { InMemoryIconSet, InMemoryVariant } from '../../source/InMemorySource';

export const SIZES = [12, 16, 24] as const;

/** A square icon, drawn differently per `shape` so that two icons never hash the same. */
export const squareSvg = (shape: number) =>
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">` +
  `<path d="M${shape} ${shape}H${24 - shape}V${24 - shape}H${shape}Z" fill="black"/></svg>`;

/** The six variants a published icon set needs: sizes 12, 16 and 24, each active and inactive. */
export const variantsOf = (nodeId: string, svg: string): InMemoryVariant[] =>
  SIZES.flatMap((size) =>
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
  description: `${name} description`,
  createdAt: `2026-01-0${(Number(nodeId.split(':')[1]) % 9) + 1}T00:00:00.000Z`,
  updatedAt: '2026-02-01T00:00:00.000Z',
  variants: variantsOf(nodeId, squareSvg(shape)),
  ...overrides,
});

/** The library at the first sync: three icon sets. */
export const firstLibrary = (): InMemoryIconSet[] => [
  iconSet('ui/add', '1:1', 2),
  iconSet('ui/remove', '1:2', 3),
  iconSet('nav/cash', '1:3', 4),
];

/**
 * The library at the second sync: `add` redrawn, `remove` renamed to `minus`, `cash` deleted, a
 * new `send`, and sets that need fixing in Figma (a missing variant, a name clash with `add`).
 */
export const secondLibrary = (): InMemoryIconSet[] => [
  iconSet('ui/add', '1:1', 5, { updatedAt: '2026-03-01T00:00:00.000Z' }),
  iconSet('ui/minus', '1:2', 3, { updatedAt: '2026-03-01T00:00:00.000Z' }),
  iconSet('ui/send', '1:4', 6, { updatedAt: '2026-03-01T00:00:00.000Z' }),
  iconSet('ui/broken', '1:5', 7, {
    variants: variantsOf('1:5', squareSvg(7)).slice(1),
  }),
  iconSet('nav/add', '1:6', 8),
];

/** A published component that is not part of any set. */
export const looseHelper = {
  nodeId: '9:1',
  name: 'Icon / helper',
  url: 'https://www.figma.com/design/FILE?node-id=9-1',
};

/** The library at the third sync: nothing changed, and a component outside sets was published. */
export const thirdLibrary = secondLibrary;

/** The library at the fourth sync: `send` was deleted and nothing else changed. */
export const fourthLibrary = (): InMemoryIconSet[] =>
  secondLibrary().filter(({ nodeId }) => nodeId !== '1:4');

/** The Figma file id of the golden reports, which were recorded from the sync as it ran before it was split. */
export const scenarioFigmaFileId = '1J3XC4iA2xRzlnC3y0pl1N';
