import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { ColorPalette } from '../colorPalette';
import type { Illustration } from '../illustration';
import { manifestIllustrations, readManifest } from '../manifest';
import { renderStories, WebStoriesSink } from '../sinks/WebStoriesSink';

const illustration = (type: string, name: string): Illustration => ({
  nodeId: `1:${name}`,
  type,
  name,
  description: '',
  hash: '',
  version: 0,
  width: 32,
  height: 32,
  createdAt: '2024-01-01T00:00:00Z',
  lastUpdated: '2024-01-01T00:00:00Z',
});

describe('renderStories', () => {
  it('renders the example from the first name in names.ts order and one sheet per 240 names', () => {
    const names = Array.from(
      { length: 241 },
      (_, index) => `icon${String(index).padStart(3, '0')}`,
    );
    const stories = renderStories(
      'spotIcon',
      [...names.reverse(), 'aardvark'].map((name) => illustration('spotIcon', name)),
    );

    expect(stories).toContain(`import { SpotIcon } from '../SpotIcon';`);
    expect(stories).toContain(`<SpotIcon name="aardvark" scaleMultiplier={3} />`);
    expect(stories).toContain(`export const spotIconSheet1 = getIllustrationSheet({
  type: 'spotIcon',
  startIndex: 0,
  endIndex: 240,
});
export const spotIconSheet2 = getIllustrationSheet({
  type: 'spotIcon',
  startIndex: 240,
  endIndex: 480,
});
`);
    expect(stories).not.toContain('spotIconSheet3');
  });

  it('does not scale types that are legible at their natural size', () => {
    expect(renderStories('heroSquare', [illustration('heroSquare', 'leverage')])).toContain(
      `<HeroSquare name="leverage" scaleMultiplier={1} />`,
    );
  });

  it('reproduces the committed web stories from the committed manifest, byte for byte', () => {
    const illustrations = manifestIllustrations(
      readManifest(path.join(__dirname, '../../../manifest.json')),
    );
    const storiesDir = path.join(__dirname, '../../../../web/src/illustrations/__stories__');
    for (const type of ['heroSquare', 'pictogram', 'spotIcon', 'spotRectangle', 'spotSquare']) {
      const file = `${type.charAt(0).toUpperCase()}${type.slice(1)}.stories.tsx`;
      expect(
        renderStories(
          type,
          illustrations.filter((item) => item.type === type),
        ),
      ).toBe(fs.readFileSync(path.join(storiesDir, file), 'utf-8'));
    }
  });
});

describe('WebStoriesSink', () => {
  let dir: string;
  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'web-stories-sink-'));
  });
  afterEach(() => {
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it('has nothing per illustration to restore and writes one stories file per type from the full set', async () => {
    const sink = new WebStoriesSink({ dir });
    const illustrations = [
      illustration('spotIcon', 'wallet'),
      illustration('spotIcon', '2fa'),
      illustration('pictogram', 'coin'),
    ];
    expect(await sink.has(illustrations[0])).toBe(true);

    await sink.apply({ remove: [], write: [], illustrations, palette: new ColorPalette([]) });

    expect(fs.readdirSync(dir).sort()).toEqual(['Pictogram.stories.tsx', 'SpotIcon.stories.tsx']);
    expect(fs.readFileSync(path.join(dir, 'SpotIcon.stories.tsx'), 'utf-8')).toContain(
      `<SpotIcon name="2fa" scaleMultiplier={3} />`,
    );
  });
});
