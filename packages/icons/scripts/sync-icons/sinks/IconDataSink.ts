import path from 'node:path';

import { getDescriptionMap } from '../getDescriptionMap';
import { profile } from '../profile';

import { codegenHeader, writeFile } from './files';
import { Sink, type SinkChanges } from './Sink';

/** Writes the icon name type, the list of names, and the description map from the manifest. */
export class IconDataSink extends Sink {
  async apply({ config, manifest }: SinkChanges) {
    console.log('Generating output types data...');
    const iconNamesStrings = manifest.iconSets.map((iconSet) => `'${iconSet.name}'`).sort();
    const iconNamesUnionContent = ['', ...iconNamesStrings].join('\n | ');
    writeFile(
      path.join(config.outputDataPath, 'IconName.ts'),
      `${codegenHeader}
export type IconName = ${iconNamesUnionContent};\n`,
    );

    console.log('Generating output names data...');
    const iconNamesByCreatedAt = manifest.iconSets.map((iconSet) => iconSet.name);
    const iconNamesContent = JSON.stringify(iconNamesByCreatedAt, null, 2).replaceAll('"', "'");
    writeFile(
      path.join(config.outputDataPath, 'names.ts'),
      `${codegenHeader}
import type { IconName } from './IconName';\n
export const names: IconName[] = ${iconNamesContent};\n`,
    );

    if (profile.publishesDescriptions) {
      console.log('Generating output descriptions data...');
      const descriptionMap = getDescriptionMap(manifest.iconSets);
      const descriptionMapContent = JSON.stringify(descriptionMap, null, 2).replaceAll('"', "'");
      writeFile(
        path.join(config.outputDataPath, 'descriptionMap.ts'),
        `${codegenHeader}
  import type { IconName } from './IconName';\n
  /** Mapping of descriptions to associated icons. */
  export const descriptionMap: Record<string, IconName[]> = ${descriptionMapContent};\n`,
      );
    }
  }
}
