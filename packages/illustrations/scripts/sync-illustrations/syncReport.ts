import type { RejectedAsset } from '@cds/figma-api/syncReport';

import { type Component, type Illustration, illustrationKey } from './illustration';
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
        },
      ];
    });
};

/** Components dropped because another component already has their `type/name`. */
export const duplicateAssets = (duplicates: Component[]): RejectedAsset[] =>
  duplicates.map(({ nodeId, type, name, url }) => ({
    name: `${type}/${name}`,
    nodeId,
    url,
    message: `Another component is already named "${type}/${name}", so this one is skipped; rename one of them in Figma.`,
  }));
