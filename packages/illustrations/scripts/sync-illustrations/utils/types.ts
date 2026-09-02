/**
 * The subset of the nx task shape that the sync pipeline threads through its classes.
 *
 * Upstream this script ran as an nx executor and was handed a full task object. Here the script
 * owns its own config (see `config.ts`), so only the fields the pipeline actually reads are
 * modelled.
 */
export type SyncTask<Options = unknown> = {
  options: Options;
  /** Absolute path of the package this script generates into. */
  projectRoot: string;
  /** Recorded in generated file headers and the manifest. */
  targetName: string;
  projectName: string;
  context: {
    targetName: string;
  };
  workspace: {
    root: string;
  };
};
