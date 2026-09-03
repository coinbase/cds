import type { IllustrationSyncResults, ItemShape } from './tools/Manifest';
import { generateVersionPlan } from './generateVersionPlan';

const illustration = (name: string, type = 'pictogram'): ItemShape => ({
  id: `node-${name}`,
  name,
  type,
  version: 1,
  hash: 'hash',
  outputs: {},
  addToOutputs: () => undefined,
  setVersion: () => undefined,
});

const syncResults = (
  overrides: Partial<IllustrationSyncResults> = {},
): IllustrationSyncResults => ({
  newIllustrationSets: [],
  deletedIllustrationSets: [],
  renamedIllustrationSets: [],
  updatedIllustrationSets: [],
  ...overrides,
});

const bumpTypeOf = (plan: string) => plan.match(/^---\nillustrations: (\w+)\n---/)?.[1];

const date = '2026-09-02';

describe('generateVersionPlan', () => {
  describe('bump type', () => {
    it('is minor when illustrations are only added or updated', () => {
      const plan = generateVersionPlan(
        syncResults({
          newIllustrationSets: [illustration('usdTrade')],
          updatedIllustrationSets: [illustration('cb1BankTransfers')],
        }),
        date,
      );

      expect(bumpTypeOf(plan)).toBe('minor');
    });

    it('is major when an illustration is renamed, since consumers reference them by name', () => {
      const plan = generateVersionPlan(
        syncResults({
          renamedIllustrationSets: [{ ...illustration('newName'), oldName: 'oldName' }],
        }),
        date,
      );

      expect(bumpTypeOf(plan)).toBe('major');
    });

    it('is major when an illustration is deleted', () => {
      const plan = generateVersionPlan(
        syncResults({ deletedIllustrationSets: [illustration('legacy')] }),
        date,
      );

      expect(bumpTypeOf(plan)).toBe('major');
    });

    it('is major when a breaking change accompanies additions', () => {
      const plan = generateVersionPlan(
        syncResults({
          newIllustrationSets: [illustration('usdTrade')],
          deletedIllustrationSets: [illustration('legacy')],
        }),
        date,
      );

      expect(bumpTypeOf(plan)).toBe('major');
    });
  });

  it('renders every populated section with its count, and omits empty ones', () => {
    const plan = generateVersionPlan(
      syncResults({
        newIllustrationSets: [illustration('usdTrade'), illustration('eurTrade')],
        renamedIllustrationSets: [{ ...illustration('newName'), oldName: 'oldName' }],
      }),
      date,
    );

    expect(plan).toBe(`---
illustrations: major
---

Publish illustrations 2026-09-02

##### ⭐️ Added (2)

###### Pictogram (2)

- eurTrade
- usdTrade

##### ☠️ Renamed (1)

###### Pictogram (1)

- oldName → newName
`);
  });

  it('groups each section by illustration type, in changelog order', () => {
    const plan = generateVersionPlan(
      syncResults({
        newIllustrationSets: [
          illustration('spotOne', 'spotSquare'),
          illustration('heroOne', 'heroSquare'),
          illustration('pictoOne', 'pictogram'),
        ],
      }),
      date,
    );

    expect(plan).toContain(`##### ⭐️ Added (3)

###### Pictogram (1)

- pictoOne

###### HeroSquare (1)

- heroOne

###### SpotSquare (1)

- spotOne`);
  });

  it('still renders a type that is not in the known changelog order', () => {
    const plan = generateVersionPlan(
      syncResults({ newIllustrationSets: [illustration('brandNew', 'someNewType')] }),
      date,
    );

    expect(plan).toContain('###### SomeNewType (1)');
    expect(plan).toContain('- brandNew');
  });
});
