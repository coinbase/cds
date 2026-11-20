import type { Illustration } from '../illustration';
import type { SinkResult } from '../sync';
import { duplicateAssets, rejectedAssets } from '../syncReport';

const illustration = (name: string, nodeId: string): Illustration => ({
  nodeId,
  type: 'pictogram',
  name,
  description: '',
  hash: 'hash',
  version: 1,
  width: 8,
  height: 8,
  createdAt: '2024-01-01T00:00:00.000Z',
  lastUpdated: '2024-01-01T00:00:00.000Z',
});

const sinkResult = (sink: string, failures: SinkResult['failures']): SinkResult => ({
  sink,
  written: [],
  removed: [],
  failures,
  published: true,
});

const url = ({ nodeId }: Illustration) => `https://www.figma.com/design/file?node-id=${nodeId}`;

describe('duplicateAssets', () => {
  it('reports each dropped component with its Figma link and how to fix it', () => {
    const component = {
      nodeId: '9:9',
      type: 'spotSquare',
      name: 'futures',
      description: '',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
      url: 'https://www.figma.com/design/FILE?node-id=9-9',
    };
    const [asset] = duplicateAssets([
      {
        component,
        keptBy: {
          ...component,
          nodeId: '1:1',
          url: 'https://www.figma.com/design/FILE?node-id=1-1',
        },
      },
    ]);
    expect(asset).toEqual({
      name: 'spotSquare/futures',
      nodeId: '9:9',
      url: 'https://www.figma.com/design/FILE?node-id=9-9',
      message: expect.stringContaining('two components named "spotSquare/futures"'),
      duplicateOf: { url: 'https://www.figma.com/design/FILE?node-id=1-1' },
    });
  });
});

describe('rejectedAssets', () => {
  it('describes each rejected illustration with its Figma link and reason', () => {
    const invalidIllustration = illustration('bad', '1:3');
    const rejected = rejectedAssets(
      [
        sinkResult('package', [
          { illustration: invalidIllustration, message: 'uses a color outside the palette' },
        ]),
      ],
      url,
    );
    expect(rejected).toEqual([
      {
        name: 'pictogram/bad',
        nodeId: '1:3',
        url: 'https://www.figma.com/design/file?node-id=1:3',
        message: 'uses a color outside the palette',
      },
    ]);
  });

  it('lists an illustration once when several sinks reject it for the same reason', () => {
    const invalidIllustration = illustration('bad', '1:3');
    const failure = {
      illustration: invalidIllustration,
      message: 'uses a color outside the palette',
    };
    const rejected = rejectedAssets(
      [sinkResult('ios', [failure]), sinkResult('android', [failure])],
      url,
    );
    expect(rejected).toHaveLength(1);
  });

  it('keeps different reasons for the same illustration', () => {
    const invalidIllustration = illustration('bad', '1:3');
    const rejected = rejectedAssets(
      [
        sinkResult('ios', [{ illustration: invalidIllustration, message: 'too detailed for iOS' }]),
        sinkResult('android', [
          { illustration: invalidIllustration, message: 'path data is too large' },
        ]),
      ],
      url,
    );
    expect(rejected.map(({ message }) => message)).toEqual([
      'too detailed for iOS',
      'path data is too large',
    ]);
  });
});
