import mapValues from 'lodash/mapValues';

import type { NodeWithMetadata } from '../helpers/fetchIllustrationLibrary';
import { type ColorMode, getColorModeAndName } from '../helpers/getColorModeAndName';
import { getPaintFromNode, type Paint } from '../helpers/getPaintFromNode';
import { outputPathNormalizer } from '../helpers/outputPathNormalizer';
import type { SyncTask } from '../utils';

import type { Manifest, ManifestShape } from './Manifest';

export type ColorStyleManifestType = ManifestShape<ColorStyle>;

type ColorStyleTaskOptions = {
  /** Prefix to add to style name and generated css variables */
  prefix: string;
};

export type ColorStyleParams = {
  node: NodeWithMetadata;
  task: SyncTask;
  taskOptions: ColorStyleTaskOptions;
};

export class ColorStyle {
  public readonly cssVarSetter: `--${string}`;

  public readonly cssVarGetter: `var(--${string})`;

  public readonly id: string;

  public readonly type: ColorMode;

  public readonly description: string;

  public readonly key: string;

  public readonly name: string;

  public readonly node: NodeWithMetadata;

  public readonly paint: Paint;

  public readonly prefix: string;

  public outputs: Record<string, string> = {};

  public version = 0;

  private task: SyncTask;

  constructor({ node, taskOptions, task }: ColorStyleParams) {
    const { prefix } = taskOptions;
    const { key, description } = node.styles[node.document.id];
    const { name, colorMode } = getColorModeAndName(node.document.name);
    this.description = description;
    this.id = node.document.id;
    this.key = key;
    this.name = name;
    this.node = node;
    this.prefix = prefix;
    this.type = colorMode;
    this.task = task;
    const paint = getPaintFromNode(node.document);
    if (!paint) {
      throw new Error(`Unable to extract hex color from ${node.document.name}`);
    }
    this.paint = paint;
    this.cssVarSetter = `--${this.prefix}-${this.name}`;
    this.cssVarGetter = `var(${this.cssVarSetter})`;
  }

  public addToOutputs(newOutputs: Record<string, string>) {
    this.outputs = { ...this.outputs, ...newOutputs };
  }

  public setVersion(num: number) {
    this.version = num;
  }

  public toJSON() {
    const normalizeOutputPath = outputPathNormalizer(this.task);
    return {
      key: this.key,
      name: this.name,
      type: this.type,
      prefix: this.prefix,
      paint: this.paint,
      cssVarSetter: this.cssVarSetter,
      cssVarGetter: this.cssVarGetter,
      ...(Object.values(this.outputs).length
        ? { outputs: mapValues(this.outputs, normalizeOutputPath) }
        : {}),
    };
  }

  public static async create(
    manifest: Manifest<ColorStyleManifestType>,
    taskOptions: ColorStyleTaskOptions,
  ) {
    await Promise.all(
      Object.values(manifest.syncedLibrary.nodes).map(async (node) => {
        if (node) {
          const colorStyleParams = {
            node,
            taskOptions,
            task: manifest.task,
          };
          const newStyle = new ColorStyle(colorStyleParams);
          await manifest.syncItem(newStyle);
        }
      }),
    );
  }
}
