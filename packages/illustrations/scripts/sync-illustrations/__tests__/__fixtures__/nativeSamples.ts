import fs from 'node:fs';
import path from 'node:path';

import type { Illustration } from '../../illustration';

/**
 * The small set the native sinks' byte-for-byte fixtures in `iosSink/` and `androidSink/` are rendered from: one real
 * published illustration and names that exercise identifier rules (a leading digit, Swift and
 * Kotlin keywords, snake-casing).
 */
const sample = (
  type: string,
  name: string,
  overrides: Partial<Illustration> = {},
): Illustration => ({
  nodeId: `1:${type}-${name}`,
  type,
  name,
  description: '',
  hash: `${type}-${name}-hash=`,
  version: 0,
  width: 8,
  height: 8,
  createdAt: '2024-01-01T00:00:00.000Z',
  lastUpdated: '2024-01-01T00:00:00.000Z',
  ...overrides,
});

const square = (fill: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 8"><path fill="${fill}" d="M0 0h8v8H0z"/></svg>`;

export const nativeSamples: { illustration: Illustration; svg: string }[] = [
  {
    illustration: sample('spotIcon', '2fa', {
      nodeId: '4390:695',
      hash: '+HFlT7G2zpSP0fCciMg4XqPz/Dokzg+/VBntWB6dnwY=',
      version: 1,
      width: 32,
      height: 32,
    }),
    svg: fs
      .readFileSync(path.join(__dirname, 'expected-spotIcon-2fa-1-light.svg'), 'utf-8')
      .trimEnd(),
  },
  { illustration: sample('pictogram', '2fa'), svg: square('#0052FF') },
  { illustration: sample('pictogram', 'delegate'), svg: square('#5DE2F8') },
  { illustration: sample('pictogram', 'object'), svg: square('#123456') },
  { illustration: sample('heroSquare', 'private'), svg: square('#FFD200') },
  { illustration: sample('heroSquare', 'arrowsUpDown', { version: 2 }), svg: square('#3CC28A') },
];
