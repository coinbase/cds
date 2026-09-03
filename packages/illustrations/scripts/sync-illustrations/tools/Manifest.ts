import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import uniqBy from 'lodash/uniqBy';
import fs from 'node:fs';
import path from 'node:path';

import { fetchIllustrationLibrary, type SyncedLibrary } from '../helpers/fetchIllustrationLibrary';
import { getManifestFromDisk } from '../helpers/getManifestFromDisk';
import { logSummary } from '../helpers/logSummary';
import { outputPathNormalizer } from '../helpers/outputPathNormalizer';
import { getAbsolutePath, sortByAlphabet, type SyncTask, writePrettyFile } from '../utils';

import type { ColorStyleManifestType } from './ColorStyle';
import { ColorStyles } from './ColorStyles';

// Base type for items within the manifest. It defines the structure that all items should adhere to.
export type ItemShape = {
  id: string;
  /** Base64 representation of provided hash source */
  hash?: string;
  hasVisualChange?: boolean;
  name: string;
  type: string;
  version: number;
  outputs?: Record<string, string>;
  addToOutputs: (newOutputs: Record<string, string>) => void;
  setVersion: (num: number) => void;
};

// Generic type that represents the overall manifest.
export type ManifestShape<
  Item extends ItemShape = ItemShape,
  Metadata = Record<string, unknown>,
> = {
  executor?: string;
  lastUpdated: string;
  metadata: Metadata;
  /**
   * items is an array of tuples, where each tuple consists of a string and an Item. (ie. "2:3516")
   * - Why is it this format? In Figma, every node (which can be a frame, component, vector, etc.) has a unique identifier called a node ID.
   * - The numbers represent the hierarchy and ordering of nodes within the Figma file.
   * - The first number usually indicates the page or parent node, and the second number indicates the specific node within that context.
   * string is ID of item, Item is actual item data, adhering to ItemShape or a subtype of it.
   */
  items: [string, Item][];
};

export type ManifestTaskOptions = {
  /** The directory to output generated content */
  generatedDirectory: string;
  /** The file ID to use when making requests to Figma API  */
  figmaApiFileId: string;
  /** The manifest.json file to get information about previous syncs and to update after new syncs. */
  manifestFile: string;
  /** Figma file ID containing color styles to fetch dynamically */
  colorStylesFigmaFileId?: string;
  /** Prefix for CSS variable names (e.g., "illustration" -> "--illustration-primary") */
  colorStylesPrefix?: string;
  /** Sync all items regardless of when they were last updated */
  syncAll: boolean;
  /** Exit with an error when breaking changes are detected */
  exitOnBreakingChanges: boolean;
};

export type GetManifestItem<T extends ManifestShape> = T['items'][number][1];

type InitManifestParams<
  T extends ManifestShape,
  TaskOptions extends ManifestTaskOptions = ManifestTaskOptions,
> = {
  createItem: (manifest: Manifest<T>, taskOptions: TaskOptions) => Promise<void>;
  versioned?: boolean;
};

type ManifestOptions<PreviousManifest extends ManifestShape, TaskOptions = unknown> = {
  previousManifest: PreviousManifest;
  syncedLibrary: SyncedLibrary;
  filePath: string;
  versioned?: boolean;
  task: SyncTask<TaskOptions>;
};

export type IllustrationSyncResults = {
  newIllustrationSets: ItemShape[];
  deletedIllustrationSets: ItemShape[];
  renamedIllustrationSets: (ItemShape & { oldName: string })[];
  updatedIllustrationSets: ItemShape[];
};

export class Manifest<
  T extends ManifestShape = ManifestShape,
  TaskOptions extends ManifestTaskOptions = ManifestTaskOptions,
> {
  private readonly filePath: string;

  private _metadata: T['metadata'];

  public readonly task: SyncTask<TaskOptions>;

  public readonly lastUpdated: string;

  public readonly previousItems: Map<string, GetManifestItem<T>>;

  public readonly items = new Map<string, GetManifestItem<T>>();

  public additions = new Set<ItemShape>();

  public deletions = new Set<ItemShape>();

  public renames = new Map<ItemShape, ItemShape>();

  public updates = new Set<ItemShape>();

  public readonly syncedLibrary: SyncedLibrary;

  public readonly versioned: boolean;

  private outputs: Record<string, string> = {};

  private colors: { light: ColorStyleManifestType; dark: ColorStyleManifestType } | undefined;

  constructor({
    previousManifest,
    filePath,
    task,
    versioned,
    syncedLibrary,
  }: ManifestOptions<T, TaskOptions>) {
    this.filePath = filePath;
    this.lastUpdated = previousManifest.lastUpdated;
    this._metadata = previousManifest.metadata;
    this.previousItems = new Map(previousManifest.items);
    this.task = task;
    this.versioned = Boolean(versioned);
    this.syncedLibrary = syncedLibrary;
  }

  get generatedDirectory() {
    return getAbsolutePath(this.task, this.task.options.generatedDirectory);
  }

  public get previousItemsArray() {
    return [...this.previousItems.values()];
  }

  private renameOutput(renameFn: (output: string) => string) {
    return async (output: string) => {
      const oldPath = path.normalize(`${this.generatedDirectory}/${output}`);
      const newPath = renameFn(oldPath);

      if (fs.existsSync(oldPath)) {
        return fs.promises.rename(oldPath, newPath);
      }

      return undefined;
    };
  }

  private async renameOutputs(item: GetManifestItem<T>, renameFn: (output: string) => string) {
    const { outputs } = item;

    if (outputs) {
      // rename item output files
      await Promise.all(Object.values(outputs).map(this.renameOutput(renameFn)));

      // empty out existing item outputs
      item.addToOutputs({});

      const renamedOutputs = Object.keys(outputs).reduce(
        (acc, outputKey) => ({ ...acc, [outputKey]: renameFn(outputs[outputKey]) }),
        {},
      );

      // add renamed item outputs for manifest
      item.addToOutputs(renamedOutputs);
    }
  }

  public getPreviousItem(item: Pick<ItemShape, 'id' | 'type' | 'name'>) {
    return (
      this.previousItems.get(item.id) ??
      // The ids might be different, but the intent is that they are treated as the same asset.
      this.previousItemsArray.find(
        (prev) => `${prev.type}-${prev.name}` === `${item.type}-${item.name}`,
      )
    );
  }

  private async processItemUpdates(item: GetManifestItem<T>) {
    const prevNode = this.getPreviousItem(item);

    // Changed items
    if (prevNode) {
      // Handle renames
      const prevName = prevNode.name;
      const newName = item.name;
      const prevType = prevNode.type;
      const newType = item.type;
      const wasRenamed = prevName !== newName || prevType !== newType; // Rename if either name or type is different

      if (wasRenamed) {
        if (prevType !== newType) {
          // Type has changed, treat it as deletion of old item and addition of new item
          console.log(
            `Type mismatch: replacing: ${prevType}-${prevName} with ${newType}-${newName}`,
          );

          // Mark the old item for deletion
          this.deletions.add(prevNode);
          this.previousItems.delete(prevNode.id);

          // Add the new item to additions and the current items map
          this.additions.add(item);
          this.items.set(item.id, item);

          return; // Exit without performing renaming
        }
        if (prevName.toLowerCase() === newName.toLowerCase()) {
          throw new Error(
            `Renaming is not case sensitive: ${prevName} -> ${newName}. Update the Figma file with a new distinct name for ${prevNode.type}/${prevName}.`,
          );
        }

        let renameFn: (output: string) => string;

        this.renames.set(prevNode, item);

        if (this.versioned) {
          // Reset versioning
          item.setVersion(0);

          renameFn = (output: string) =>
            output.replace(
              `${prevType}-${prevName}-${prevNode.version}`,
              `${newType}-${newName}-0`,
            );
        } else {
          // More robust renaming logic where we ensure that the type is correct and replace appropriately
          renameFn = (output: string) => {
            let parts = output.split('/');
            const fileName = parts.pop();

            if (fileName) {
              const updatedFileName = fileName.replace(
                `${prevType}-${prevName}`,
                `${newType}-${newName}`,
              );

              // Iterate over parts to find and replace the type (e.g., "nav" or "ui")
              parts = parts.map((part) => {
                // Check if the part contains the previous type and replace it with the new type
                if (part.includes(prevType)) {
                  return part.replace(prevType, newType); // Replace type in the path
                }
                return part; // Keep the part unchanged if it doesn't match the previous type
              });

              console.log(...parts, updatedFileName);
              return [...parts, updatedFileName].join('/');
            }
            return output; // If no fileName, return the original output
          };
        }

        await this.renameOutputs(item, renameFn);
      } else {
        const shouldUpdate = item.hasVisualChange ?? true;

        if (shouldUpdate) {
          this.updates.add(item);

          if (this.versioned) {
            const oldVersion = item.version;
            const newVersion = oldVersion + 1;
            item.setVersion(newVersion);

            const renameFn = (output: string) =>
              output.replace(`${item.name}-${oldVersion}`, `${item.name}-${newVersion}`);
            // If it already existed we need to rename outputs before writing new content
            await this.renameOutputs(item, renameFn);
          }
        }
      }

      this.previousItems.delete(prevNode.id); // remove old from manifest so we don't have duplicates
    } else {
      this.additions.add(item);
    }
  }

  private async handleDeletions(remoteIds: string[]) {
    const promises: Promise<void>[] = [];

    this.previousItems.forEach((item) => {
      if (!remoteIds.includes(item.id)) {
        // Delete outputs
        if (item.outputs) {
          Object.values(item.outputs).forEach((output) => {
            const absoluteOutputPath = path.normalize(`${this.generatedDirectory}/${output}`);
            if (fs.existsSync(absoluteOutputPath)) {
              promises.push(fs.promises.rm(absoluteOutputPath));
            }
          });
        }

        this.previousItems.delete(item.id);
        this.deletions.add(item);
      }
    });

    await Promise.all(promises);
  }

  public async syncItem(item: GetManifestItem<T>) {
    await this.processItemUpdates(item);
    this.items.set(item.id, item);
  }

  private get itemEntries() {
    return uniqBy(
      // if duplicate object is found in array, the first object match will resolve
      [...this.items.entries(), ...this.previousItems.entries()],
      ([, item]) => `${item.type}-${item.name}`,
    );
  }

  public get groupedItems() {
    const itemsAsArray = this.itemEntries.map(([, item]) => item);
    const groupedByType = groupBy(itemsAsArray, 'type');
    return Object.entries(groupedByType);
  }

  /** The changes this sync made, in the shape the version plan generator expects. */
  public get syncResults(): IllustrationSyncResults {
    return {
      newIllustrationSets: [...this.additions],
      deletedIllustrationSets: [...this.deletions],
      renamedIllustrationSets: [...this.renames].map(([previous, next]) => ({
        ...next,
        oldName: previous.name,
      })),
      updatedIllustrationSets: [...this.updates],
    };
  }

  public get metadata() {
    return this._metadata;
  }

  public setMetadata(metadata: Partial<T['metadata']>) {
    this._metadata = { ...this._metadata, ...metadata };
  }

  public addToOutputs(newOutputs: Record<string, string>) {
    this.outputs = { ...this.outputs, ...newOutputs };
  }

  public setColors(colorStyles: ColorStyles) {
    this.colors = {
      light: colorStyles.lightManifest,
      dark: colorStyles.darkManifest,
    };
  }

  public toJSON() {
    const normalizeOutputPath = outputPathNormalizer(this.task);

    return {
      executor: this.task.context.targetName,
      lastUpdated: new Date().toISOString(),
      ...(this.metadata ? { metadata: this.metadata } : {}),
      ...(Object.values(this.outputs).length
        ? { outputs: mapValues(this.outputs, normalizeOutputPath) }
        : {}),
      ...(this.colors
        ? {
            colors: {
              light: this.colors.light.items.map(([_, item]) => item),
              dark: this.colors.dark.items.map(([_, item]) => item),
            },
          }
        : {}),
      items: Object.fromEntries(this.itemEntries.sort(sortByAlphabet)),
    };
  }

  public async generateFile(
    task: SyncTask<ManifestTaskOptions>,
    options: { ignoreBreakingChanges?: boolean } = {},
  ) {
    await writePrettyFile(this.filePath, JSON.stringify(this.toJSON()));
    logSummary(this, task, options);
  }

  static async init<
    T extends ManifestShape,
    TaskOptions extends ManifestTaskOptions = ManifestTaskOptions,
  >(task: SyncTask<TaskOptions>, params: InitManifestParams<T, TaskOptions>) {
    const { createItem, versioned } = params;

    const manifestPath = getAbsolutePath(task, task.options.manifestFile);
    const previousManifest = await getManifestFromDisk<T>(manifestPath);
    const syncedLibrary = await fetchIllustrationLibrary({
      fileId: task.options.figmaApiFileId,
      lastUpdated: task.options.syncAll ? undefined : previousManifest.lastUpdated,
    });

    const manifest = new Manifest<T, TaskOptions>({
      task,
      filePath: manifestPath,
      previousManifest,
      syncedLibrary,
      versioned,
    });

    await createItem(manifest, task.options);
    await manifest.handleDeletions(syncedLibrary.remoteIds);

    if (
      !manifest.renames.size &&
      !manifest.updates.size &&
      !manifest.additions.size &&
      !manifest.deletions.size
    ) {
      console.log(
        `There are no changes since the last update on ${new Date(
          previousManifest.lastUpdated,
        ).toLocaleDateString()}`,
      );

      process.exit();
    }

    let colorStyles: ColorStyles | undefined;
    try {
      if (!task.options.colorStylesFigmaFileId) {
        throw new Error('Color styles Figma file ID is required');
      }
      colorStyles = await ColorStyles.loadFromFigma(
        task.options.colorStylesFigmaFileId,
        task.options.colorStylesPrefix ?? 'illustration',
      );
    } catch (error) {
      console.error(
        `Error loading color styles from Figma file: ${task.options.colorStylesFigmaFileId}. ${error}`,
      );
    }

    return { colorStyles, manifest };
  }
}
