import type { SyncResults } from '../diffIllustrations';
import { generateVersionPlan } from '../generateVersionPlan';
import type { Illustration } from '../illustration';

const illustration = (name: string, type = 'pictogram'): Illustration => ({
  nodeId: `node-${name}`,
  name,
  type,
  description: '',
  version: 1,
  hash: 'hash',
  width: 48,
  height: 48,
  createdAt: '2026-01-01T00:00:00.000Z',
  lastUpdated: '2026-01-01T00:00:00.000Z',
});

const syncResults = (overrides: Partial<SyncResults> = {}): SyncResults => ({
  added: [],
  deleted: [],
  renamed: [],
  updated: [],
  ...overrides,
});

const bumpTypeOf = (plan: string) => plan.match(/^---\nillustrations: (\w+)\n---/)?.[1];

const date = '2026-09-02';

describe('generateVersionPlan', () => {
  describe('bump type', () => {
    it('is minor when illustrations are only added or updated', () => {
      const plan = generateVersionPlan(
        syncResults({
          added: [illustration('usdTrade')],
          updated: [illustration('cb1BankTransfers')],
        }),
        date,
      );

      expect(bumpTypeOf(plan)).toBe('minor');
    });

    it('is major when an illustration is renamed, since consumers reference them by name', () => {
      const plan = generateVersionPlan(
        syncResults({
          renamed: [{ ...illustration('newName'), oldName: 'oldName' }],
        }),
        date,
      );

      expect(bumpTypeOf(plan)).toBe('major');
    });

    it('is major when an illustration is deleted', () => {
      const plan = generateVersionPlan(syncResults({ deleted: [illustration('legacy')] }), date);

      expect(bumpTypeOf(plan)).toBe('major');
    });

    it('is major when a breaking change accompanies additions', () => {
      const plan = generateVersionPlan(
        syncResults({
          added: [illustration('usdTrade')],
          deleted: [illustration('legacy')],
        }),
        date,
      );

      expect(bumpTypeOf(plan)).toBe('major');
    });
  });

  it('renders every populated section with its count, and omits empty ones', () => {
    const plan = generateVersionPlan(
      syncResults({
        added: [illustration('usdTrade'), illustration('eurTrade')],
        renamed: [{ ...illustration('newName'), oldName: 'oldName' }],
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
        added: [
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
      syncResults({ added: [illustration('brandNew', 'someNewType')] }),
      date,
    );

    expect(plan).toContain('###### SomeNewType (1)');
    expect(plan).toContain('- brandNew');
  });
});
