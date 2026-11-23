import path from 'node:path';

import { getDescriptionMap } from '../getDescriptionMap';
import { profile } from '../profile';

import { codegenHeader, toSingleQuotedLiteral, writeFile } from './files';
import { Sink, type SinkChanges } from './Sink';

/** Writes the icon name type and the list of names from the manifest, and the description map where it is published. */
export class IconDataSink extends Sink {
  async apply({ config, manifest }: SinkChanges) {
    const write = (fileName: string, content: string) =>
      writeFile(path.join(config.outputDataPath, fileName), `${codegenHeader}\n${content}`);

    console.log('Generating output types data...');
    const iconNameUnion = [
      '',
      ...manifest.iconSets.map(({ name }) => toSingleQuotedLiteral(name)).sort(),
    ].join('\n | ');
    write('IconName.ts', `export type IconName = ${iconNameUnion};\n`);

    console.log('Generating output names data...');
    const names = toSingleQuotedLiteral(manifest.iconSets.map(({ name }) => name));
    write(
      'names.ts',
      `import type { IconName } from './IconName';\n\nexport const names: IconName[] = ${names};\n`,
    );

    if (!profile.publishesDescriptions) return;
    console.log('Generating output descriptions data...');
    const descriptionMap = toSingleQuotedLiteral(getDescriptionMap(manifest.iconSets));
    write(
      'descriptionMap.ts',
      `import type { IconName } from './IconName';\n\n/** Mapping of descriptions to associated icons. */\nexport const descriptionMap: Record<string, IconName[]> = ${descriptionMap};\n`,
    );
  }
}
