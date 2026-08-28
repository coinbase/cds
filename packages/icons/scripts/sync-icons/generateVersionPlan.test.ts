import { generateVersionPlan } from './generateVersionPlan';
import type { IconSyncResults } from './index';

const iconSet = (name: string) => ({
  nodeId: `node-${name}`,
  name,
  description: '',
  assetsHash: 'assets-hash',
  nameHash: 'name-hash',
  createdAt: '2026-01-01',
  lastUpdated: '2026-01-01',
  svgs: [],
});

const syncResults = (overrides: Partial<IconSyncResults> = {}): IconSyncResults => ({
  newIconSets: [],
  deletedIconSets: [],
  renamedIconSets: [],
  updatedIconSets: [],
  ...overrides,
});

const bumpTypeOf = (plan: string) => plan.match(/^---\nicons: (\w+)\n---/)?.[1];

const date = '2026-08-28';

describe('generateVersionPlan', () => {
  describe('bump type', () => {
    it('is minor when icons are only added or updated', () => {
      const plan = generateVersionPlan(
        syncResults({ newIconSets: [iconSet('wallet')], updatedIconSets: [iconSet('send')] }),
        date,
      );

      expect(bumpTypeOf(plan)).toBe('minor');
    });

    it('is major when an icon is renamed, since consumers reference icons by name', () => {
      const plan = generateVersionPlan(
        syncResults({ renamedIconSets: [{ ...iconSet('walletNew'), oldName: 'walletOld' }] }),
        date,
      );

      expect(bumpTypeOf(plan)).toBe('major');
    });

    it('is major when an icon is deleted', () => {
      const plan = generateVersionPlan(syncResults({ deletedIconSets: [iconSet('legacy')] }), date);

      expect(bumpTypeOf(plan)).toBe('major');
    });

    it('is major when a breaking change accompanies additions', () => {
      const plan = generateVersionPlan(
        syncResults({ newIconSets: [iconSet('wallet')], deletedIconSets: [iconSet('legacy')] }),
        date,
      );

      expect(bumpTypeOf(plan)).toBe('major');
    });
  });

  it('renders every populated section with its count, and omits empty ones', () => {
    const plan = generateVersionPlan(
      syncResults({
        newIconSets: [iconSet('wallet'), iconSet('send')],
        renamedIconSets: [{ ...iconSet('walletNew'), oldName: 'walletOld' }],
      }),
      date,
    );

    expect(plan).toBe(`---
icons: major
---

Publish icons 2026-08-28

**⭐️ Added (2)**

- wallet
- send

**☠️ Renamed (1)**

- walletOld → walletNew
`);
  });
});
