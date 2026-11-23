import { Ledger } from '../syncLedger';
import type { RejectedAsset } from '../syncReport';

const rejected = (overrides: Partial<RejectedAsset> = {}): RejectedAsset => ({
  name: 'broken',
  nodeId: '1:5',
  url: 'https://www.figma.com/design/F?node-id=1-5',
  message: 'It is missing a variant.',
  category: 'invalid-variant',
  ...overrides,
});

describe('Ledger', () => {
  it('derives the changes of the report, in the order they were recorded', () => {
    const ledger = new Ledger();
    ledger.added({ name: 'send' });
    ledger.updated({ name: 'add' });
    ledger.renamed({ name: 'minus', oldName: 'remove' });
    ledger.updated({ name: 'minus' });
    ledger.deleted({ name: 'cash' });

    expect(ledger.changes()).toEqual({
      added: [{ name: 'send' }],
      updated: [{ name: 'add' }, { name: 'minus' }],
      renamed: [{ name: 'minus', oldName: 'remove' }],
      deleted: [{ name: 'cash' }],
    });
  });

  it('keeps the group of an asset, such as an illustration type', () => {
    const ledger = new Ledger();
    ledger.added({ name: 'buy', group: 'heroSquare' });
    ledger.renamed({ name: 'sell', oldName: 'trade', group: 'pictogram' });

    expect(ledger.changes()).toMatchObject({
      added: [{ name: 'buy', group: 'heroSquare' }],
      renamed: [{ name: 'sell', oldName: 'trade', group: 'pictogram' }],
    });
  });

  it('lists skipped assets as rejected, and an asset of a type the sync lacks as untracked', () => {
    const ledger = new Ledger();
    ledger.skipped(rejected());
    ledger.skipped(rejected({ name: 'new', category: 'new-type' }));

    expect(ledger.entries.map(({ status, name }) => `${status} ${name}`)).toEqual([
      'U broken',
      '? new',
    ]);
    expect(ledger.rejected().map(({ name }) => name)).toEqual(['broken', 'new']);
  });

  it('groups ignored items by reason, in the order the reasons first appear', () => {
    const ledger = new Ledger();
    ledger.ignored('outside sets', [{ name: 'helper', url: 'https://example.test/helper' }]);
    ledger.ignored('replaces a published icon', [{ name: 'add' }]);
    ledger.ignored('outside sets', [{ name: 'other' }]);

    expect(ledger.ignoredGroups()).toEqual([
      {
        reason: 'outside sets',
        items: [{ name: 'helper', url: 'https://example.test/helper' }, { name: 'other' }],
      },
      { reason: 'replaces a published icon', items: [{ name: 'add' }] },
    ]);
  });

  it('knows whether something changed, and whether an item was only recorded again', () => {
    const ledger = new Ledger();
    expect(ledger.hasChanges()).toBe(false);

    ledger.skipped(rejected());
    ledger.ignored('outside sets', [{ name: 'helper' }]);
    expect(ledger.hasChanges()).toBe(false);

    ledger.refreshed({ name: 'add' });
    expect(ledger.hasRefreshed()).toBe(true);
    expect(ledger.hasChanges()).toBe(false);

    ledger.deleted({ name: 'cash' });
    expect(ledger.hasChanges()).toBe(true);
  });

  it('explains an item by its new or its old name, and only for changes', () => {
    const ledger = new Ledger();
    ledger.renamed({ name: 'minus', oldName: 'remove' });
    ledger.skipped(rejected({ name: 'broken' }));

    expect(ledger.explains('minus')).toBe(true);
    expect(ledger.explains('remove')).toBe(true);
    expect(ledger.explains('broken')).toBe(false);
    expect(ledger.explains('other')).toBe(false);
  });

  it('tells apart assets of the same name in different groups', () => {
    const ledger = new Ledger();
    ledger.added({ name: 'buy', group: 'heroSquare' });

    expect(ledger.explains('buy', 'heroSquare')).toBe(true);
    expect(ledger.explains('buy', 'pictogram')).toBe(false);
  });
});
