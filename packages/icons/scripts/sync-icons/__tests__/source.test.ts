import { getFileComponents, getFileComponentSets, getFileNodes } from '@cds/figma-api';

import { fetchComponentSets, fetchLooseComponents, fetchSetNodes } from '../source/fetchComponents';
import type { ComponentSet } from '../source/IconSource';

jest.mock('@cds/figma-api');

const listing = getFileComponentSets as jest.MockedFunction<typeof getFileComponentSets>;
const nodesRequest = getFileNodes as jest.MockedFunction<typeof getFileNodes>;
const componentsRequest = getFileComponents as jest.MockedFunction<typeof getFileComponents>;

const componentSet = (id: string, name = `Icon / ${id}`) =>
  ({
    node_id: id,
    name,
    description: 'plus',
    updated_at: '2026-09-01T00:00:00.000Z',
  }) as ComponentSet;

const nodesFor = (ids: string[]) =>
  ({
    nodes: Object.fromEntries(
      ids.map((id) => [id, { document: { id, type: 'COMPONENT_SET', children: [] } }]),
    ),
  }) as unknown as Awaited<ReturnType<typeof getFileNodes>>;

beforeEach(() => jest.resetAllMocks());

describe('fetchComponentSets', () => {
  it('returns the component sets of the listing', async () => {
    listing.mockResolvedValueOnce({
      meta: { component_sets: [componentSet('1:1')] },
    } as unknown as Awaited<ReturnType<typeof getFileComponentSets>>);
    expect(await fetchComponentSets('FILE')).toEqual([componentSet('1:1')]);
    expect(listing).toHaveBeenCalledWith('FILE');
  });
});

describe('fetchSetNodes', () => {
  it('fetches the variants of the given sets and joins each with its listing metadata', async () => {
    nodesRequest.mockResolvedValueOnce(nodesFor(['1:1', '2:2']));
    const sets = [componentSet('1:1'), componentSet('2:2')];
    const nodes = await fetchSetNodes('FILE', sets);

    expect(nodesRequest).toHaveBeenCalledWith('FILE', { ids: ['1:1', '2:2'], geometry: 'paths' });
    expect(Object.keys(nodes)).toEqual(['1:1', '2:2']);
    expect(nodes['1:1'].metadata).toBe(sets[0]);
    expect(nodes['2:2'].document.id).toBe('2:2');
  });

  it('asks for at most the batch size at a time', async () => {
    nodesRequest.mockImplementation(async (_file, params) => nodesFor(params?.ids as string[]));
    const sets = ['1:1', '2:2', '3:3'].map((id) => componentSet(id));
    const nodes = await fetchSetNodes('FILE', sets, 2);
    expect(nodesRequest).toHaveBeenCalledTimes(2);
    expect(Object.keys(nodes)).toEqual(['1:1', '2:2', '3:3']);
  });

  it('leaves out a set Figma returns no node for', async () => {
    nodesRequest.mockResolvedValueOnce(nodesFor(['1:1']));
    const nodes = await fetchSetNodes('FILE', [componentSet('1:1'), componentSet('2:2')]);
    expect(Object.keys(nodes)).toEqual(['1:1']);
  });

  it('makes no request when there is nothing to fetch', async () => {
    expect(await fetchSetNodes('FILE', [])).toEqual({});
    expect(nodesRequest).not.toHaveBeenCalled();
  });
});

describe('fetchLooseComponents', () => {
  it('returns only the components that are not part of a set, with a link to each', async () => {
    componentsRequest.mockResolvedValueOnce({
      meta: {
        components: [
          {
            node_id: '1:1',
            name: 'size=24, active=true',
            file_key: 'FILE',
            containing_frame: {
              pageId: '0:1',
              pageName: 'Icons',
              containingComponentSet: { nodeId: '9:9', name: 'ui/add' },
            },
          },
          {
            node_id: '2:2',
            name: 'Icon / helper',
            file_key: 'FILE',
            containing_frame: { pageId: '0:1', pageName: 'Icons' },
          },
          {
            node_id: '3:3',
            name: 'Icon / other',
            file_key: 'FILE',
            containing_frame: { pageId: '0:1', pageName: 'Icons', containingComponentSet: null },
          },
          { node_id: '4:4', name: 'Icon / bare', file_key: 'FILE' },
        ],
      },
    } as unknown as Awaited<ReturnType<typeof getFileComponents>>);

    expect(await fetchLooseComponents('FILE')).toEqual([
      {
        nodeId: '2:2',
        name: 'Icon / helper',
        url: 'https://www.figma.com/design/FILE?node-id=2-2',
      },
      {
        nodeId: '3:3',
        name: 'Icon / other',
        url: 'https://www.figma.com/design/FILE?node-id=3-3',
      },
      {
        nodeId: '4:4',
        name: 'Icon / bare',
        url: 'https://www.figma.com/design/FILE?node-id=4-4',
      },
    ]);
    expect(componentsRequest).toHaveBeenCalledWith('FILE');
  });
});
