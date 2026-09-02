import {
  type ColorStyleItem,
  type ColorStyleManifest,
  fetchColorStyles,
} from '../helpers/fetchColorStyles';
import { getManifestFromDisk } from '../helpers/getManifestFromDisk';
import type { SyncTask } from '../utils';
import { getAbsolutePath } from '../utils';

import type { ColorStyle, ColorStyleManifestType } from './ColorStyle';
import type { ManifestShape } from './Manifest';

type ColorStyleFromDisk = {
  items: Map<string, ColorStyle>;
  nameMap: Map<string, ColorStyle>;
};

type ColorStylesTaskOptions = {
  /** The manifest.json file which contains light color styles */
  lightModeManifestFile?: string;
  /** The manifest.json file which contains dark color styles */
  darkModeManifestFile?: string;
};

type ColorStylesOptions = {
  /** The manifest.json file with light mode color styles */
  light: ColorStyleManifestType;
  /** The manifest.json file with dark mode color styles */
  dark: ColorStyleManifestType;
};

function normalizeColorStyleFromDisk(manifest: ManifestShape<ColorStyle>) {
  return {
    items: new Map(manifest.items),
    nameMap: new Map(manifest.items.map(([, item]) => [item.name, item])),
  };
}

export class ColorStyles {
  public readonly dark: ColorStyleFromDisk;

  public readonly light: ColorStyleFromDisk;

  /** Raw light mode manifest data for serialization */
  public readonly lightManifest: ColorStyleManifestType;

  /** Raw dark mode manifest data for serialization */
  public readonly darkManifest: ColorStyleManifestType;

  private readonly lightToDarkTuple: [string, string][] = [];

  constructor({ light, dark }: ColorStylesOptions) {
    this.lightManifest = light;
    this.darkManifest = dark;
    this.light = normalizeColorStyleFromDisk(light);
    this.dark = normalizeColorStyleFromDisk(dark);
    this.light.items.forEach((colorStyle) => {
      const darkMatch = this.dark.nameMap.get(colorStyle.name);
      if (darkMatch) {
        if (colorStyle.paint.type === 'solid' && darkMatch.paint.type === 'solid') {
          this.lightToDarkTuple.push([colorStyle.paint.value, darkMatch.paint.value]);
        }
      }
    });
  }

  // this setup assumes that each light color style is assigned a unique hex value;
  // if there are duplicates, only the first light/dark pair in the array that matches will replace colors
  public replaceLightWithDarkFills(content: string) {
    let transformedContent = content;
    this.lightToDarkTuple.forEach(([target, replacement]) => {
      transformedContent = transformedContent.replaceAll(target, replacement);
    });
    return transformedContent;
  }

  public replaceWithCssVariables(content: string) {
    let transformedContent = content;
    this.light.items.forEach((item) => {
      if (item.paint.type === 'solid') {
        transformedContent = transformedContent.replaceAll(item.paint.value, item.cssVarGetter);
      }
    });
    return transformedContent;
  }

  public static async loadFromDisk(task: SyncTask<ColorStylesTaskOptions>) {
    const { darkModeManifestFile, lightModeManifestFile } = task.options;

    if (darkModeManifestFile && lightModeManifestFile) {
      const darkAbsolutePath = getAbsolutePath(task, darkModeManifestFile);
      const lightAbsolutePath = getAbsolutePath(task, lightModeManifestFile);
      const [dark, light] = await Promise.all([
        getManifestFromDisk<ColorStyleManifestType>(darkAbsolutePath),
        getManifestFromDisk<ColorStyleManifestType>(lightAbsolutePath),
      ]);

      return new ColorStyles({
        dark,
        light,
      });
    }
    return undefined;
  }

  /**
   * Loads color styles dynamically from a Figma file.
   *
   * This fetches fresh color style data from the Figma API each time,
   * ensuring the latest colors are always used.
   *
   * @param fileId - The Figma file ID containing the color styles
   * @param prefix - CSS variable prefix (e.g., "illustration")
   * @returns ColorStyles instance with light/dark color mappings
   */
  public static async loadFromFigma(fileId: string, prefix: string = 'illustration') {
    const { light, dark } = await fetchColorStyles({ fileId, prefix });

    // Convert the new ColorStyleManifest format to the format expected by ColorStyles
    const lightManifest = convertToLegacyManifest(light);
    const darkManifest = convertToLegacyManifest(dark);

    return new ColorStyles({
      light: lightManifest,
      dark: darkManifest,
    });
  }
}

/**
 * Converts the new ColorStyleManifest format to the legacy ManifestShape format
 * expected by the ColorStyles constructor.
 */
function convertToLegacyManifest(manifest: ColorStyleManifest): ColorStyleManifestType {
  const items: [string, ColorStyleItem][] = Object.entries(manifest.items);
  return {
    executor: manifest.executor,
    lastUpdated: new Date().toISOString(),
    metadata: {},
    items: items as unknown as ColorStyleManifestType['items'],
  };
}
