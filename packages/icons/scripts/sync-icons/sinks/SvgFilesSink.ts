import { svgFilePath } from '../manifest';

import { removeFile, writeFile } from './files';
import { Sink, type SinkChanges, type SinkFailure } from './Sink';

/** Writes the optimized SVG of every icon asset to the package, and removes the replaced ones. */
export class SvgFilesSink extends Sink {
  async plan(changes: SinkChanges) {
    const failures: SinkFailure[] = [];
    for (const { iconSet, icons } of changes.write) {
      const empty = icons.find(({ svg }) => !svg.data.trimStart().startsWith('<svg'));
      if (empty) {
        failures.push({
          nodeId: iconSet.nodeId,
          name: iconSet.name,
          message: `The SVG exported for "${empty.name}" is empty or is not an SVG. Fix the icon set in Figma.`,
        });
      }
    }
    return { sink: this.name, failures, commit: () => this.apply(changes) };
  }

  async apply({ config, write, remove }: SinkChanges) {
    for (const iconSet of remove) {
      for (const svg of iconSet.svgs) removeFile(svgFilePath(config.outputSvgPath, svg.name));
    }
    for (const { icons } of write) {
      for (const icon of icons)
        writeFile(svgFilePath(config.outputSvgPath, icon.name), icon.svg.data);
    }
  }
}
