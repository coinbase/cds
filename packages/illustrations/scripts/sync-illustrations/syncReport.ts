import type { RejectedAsset } from '@cds/figma-api/syncReport';

import { type Illustration, illustrationKey } from './illustration';
import type { DuplicateComponent } from './selectComponents';
import type { SinkResult } from './sync';

/** One entry per illustration and reason, however many sinks rejected it. */
export const rejectedAssets = (
  sinkResults: SinkResult[],
  componentUrl: (illustration: Illustration) => string,
): RejectedAsset[] => {
  const seen = new Set<string>();
  return sinkResults
    .flatMap(({ failures }) => failures)
    .flatMap(({ illustration, message }) => {
      const key = `${illustration.nodeId}:${message}`;
      if (seen.has(key)) return [];
      seen.add(key);
      return [
        {
          name: illustrationKey(illustration),
          nodeId: illustration.nodeId,
          url: componentUrl(illustration),
          message,
          category: 'invalid-asset' as const,
        },
      ];
    });
};

/** Components dropped because another component already has their `type/name`. */
export const duplicateAssets = (duplicates: DuplicateComponent[]): RejectedAsset[] =>
  duplicates.map(({ component: { nodeId, type, name, url }, keptBy }) => ({
    name: `${type}/${name}`,
    nodeId,
    url,
    message: `The Figma file has two components named "${type}/${name}". This one is skipped; rename one of them.`,
    duplicateOf: { url: keptBy.url },
    category: 'duplicate-name' as const,
  }));
