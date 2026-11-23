import { syncIconCodeConnect } from '../../sync-icon-code-connect/index';

import { Sink, type SinkChanges } from './Sink';

/** Regenerates the Code Connect batch files from the published component sets. */
export class CodeConnectSink extends Sink {
  readonly stage = 'finish';

  readonly runsWithoutChanges = true;

  private readonly sync: (repoRoot: string) => Promise<void>;

  constructor(sync: (repoRoot: string) => Promise<void> = syncIconCodeConnect) {
    super();
    this.sync = sync;
  }

  async apply({ config }: SinkChanges) {
    await this.sync(config.repoRoot);
  }
}
