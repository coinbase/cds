import { execSync } from 'node:child_process';

import { Sink, type SinkChanges } from './Sink';

const runCommand = (command: string, cwd: string) => execSync(command, { cwd, stdio: 'inherit' });

/** Regenerates the SVG map that the expo app imports, from the icon SVGs of the package. */
export class ExpoSvgMapSink extends Sink {
  readonly stage = 'finish';

  private readonly run: (command: string, cwd: string) => unknown;

  constructor(run: (command: string, cwd: string) => unknown = runCommand) {
    super();
    this.run = run;
  }

  async apply({ config }: SinkChanges) {
    console.log('Generating expo-app icon SVG map...');
    this.run('yarn nx run codegen:icon-svg-map', config.repoRoot);
  }
}
