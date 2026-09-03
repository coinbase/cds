import mapValues from 'lodash/mapValues';

import { createHashFromObject } from '../helpers/createHashFromObject';
import type { NodeWithMetadata, SyncedLibrary } from '../helpers/fetchIllustrationLibrary';
import { getSize } from '../helpers/getSize';
import { outputPathNormalizer } from '../helpers/outputPathNormalizer';
import { parseName } from '../helpers/parseName';
import type { SyncTask } from '../utils';

import type { Manifest, ManifestShape } from './Manifest';

type MetadataShape = Record<string, string | number>;

export type ComponentParams<Metadata extends MetadataShape = MetadataShape> = {
  id: string;
  description: string;
  hashSource: string;
  /** Base64 representation of provided hash source */
  hash: string;
  hasVisualChange: boolean;
  height: number;
  name: string;
  type: string;
  width: number;
  createdAt: string;
  lastUpdated: string;
  node: NodeWithMetadata;
  metadata?: Metadata;
  version?: number;
  outputs?: Record<string, string>;
  task: SyncTask;
};

export class Component<Metadata extends MetadataShape = MetadataShape> {
  public readonly nodeType = 'componentSet';

  public readonly description: string;

  public readonly id: string;

  public readonly hashSource: string;

  public readonly hash: string;

  public readonly hasVisualChange: boolean;

  public readonly height: number;

  public readonly name: string;

  public readonly node: NodeWithMetadata | undefined;

  public readonly type: string;

  public readonly width: number;

  public readonly createdAt: string;

  public readonly lastUpdated: string;

  public outputs: Record<string, string> = {};

  public version = 0;

  private _metadata: Metadata | undefined = undefined;

  private task: SyncTask;

  constructor({
    description,
    id,
    hashSource,
    hash,
    hasVisualChange,
    height,
    width,
    name,
    node,
    type,
    createdAt,
    lastUpdated,
    version,
    outputs,
    metadata,
    task,
  }: ComponentParams<Metadata>) {
    this.id = id;
    this.description = description;
    this.name = name;
    this.type = type;
    this.height = height;
    this.width = width;
    this.createdAt = createdAt;
    this.lastUpdated = lastUpdated;
    this.task = task;

    this.node = node;
    this.hashSource = hashSource;
    this.hash = hash;
    this.hasVisualChange = hasVisualChange;

    if (metadata) {
      this._metadata = metadata;
    }
    if (version !== undefined) {
      this.version = version;
    }
    if (outputs) {
      this.outputs = outputs;
    }
  }

  public setVersion(num: number) {
    this.version = num;
  }

  public addToOutputs(newOutputs: Record<string, string>) {
    this.outputs = { ...this.outputs, ...newOutputs };
  }

  public get metadata() {
    return this._metadata;
  }

  public setMetadata(metadata: Metadata) {
    this._metadata = { ...this._metadata, ...metadata };
  }

  public toJSON() {
    const normalizeOutputPath = outputPathNormalizer(this.task);
    return {
      type: this.type,
      name: this.name,
      hash: this.hash,
      width: this.width,
      height: this.height,
      description: this.description,
      createdAt: this.createdAt,
      lastUpdated: this.lastUpdated,
      ...(Object.values(this.outputs).length
        ? { outputs: mapValues(this.outputs, normalizeOutputPath) }
        : {}),
      ...(this.version !== undefined ? { version: this.version } : {}),
      ...(this.metadata ? { metadata: this.metadata } : {}),
    };
  }

  static async create(
    manifest: Manifest<ManifestShape<Component>>,
    getHashSourceMap: (id: string, syncedLibrary: SyncedLibrary) => Promise<Record<string, string>>,
  ) {
    await Promise.all(
      Object.values(manifest.syncedLibrary.nodes).map(async (node) => {
        if (node?.document?.type === 'COMPONENT') {
          const { id } = node.document;
          const { type, name } = parseName(node);
          const { width, height } = getSize(node.document);
          const { description, updated_at: lastUpdated, created_at: createdAt } = node.metadata;
          const oldVersion = manifest.getPreviousItem({ id, type, name });
          const hashSourceMap = await getHashSourceMap(id, manifest.syncedLibrary);
          const hash = createHashFromObject(hashSourceMap);

          const params = {
            ...oldVersion,
            node,
            id,
            type,
            name,
            width,
            hashSource: hashSourceMap[id],
            hash,
            hasVisualChange: oldVersion?.hash !== hash,
            height,
            description,
            /**
             * If design re-creates the node in Figma, but the intent is that the asset is the same as before,
             * then we should keep the old createdAt value so that we maintain sorting in Percy.
             */
            createdAt: oldVersion?.createdAt ?? createdAt,
            lastUpdated,
            task: manifest.task,
          };

          const newComponent = new Component(params);
          await manifest.syncItem(newComponent);
        }
      }),
    );
  }
}
