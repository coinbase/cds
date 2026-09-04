import type { ConfigAPI, TransformOptions } from '@babel/core';
import linariaBabelPreset, { type PluginOptions } from '@linaria/babel-preset';

import { type ExtractConfigOptions, linariaCssExtractPlugin } from './linariaCssExtractPlugin';

type PresetOptions = ExtractConfigOptions & {
  // The @linaria/babel-preset module's types are corrected in ./types.d.ts
  linariaOptions?: PluginOptions;
};

/**
 * This babel preset combines the default linaria/babel preset with a custom babel plugin.
 * The plugin is used to extract Linaria styles into static .css files via the Linaria
 * metadata in babel. This is useful if you want to use Babel to output the CSS files,
 * rather than using a bundler like Vite or Webpack. If you are using a bundler you
 * should not use this plugin, and instead use the official Linaria plugin for your
 * bundler.
 */
export default function linariaPreset(
  babel: ConfigAPI,
  { sourceDir, outputDir, linariaOptions = {} }: PresetOptions,
): TransformOptions {
  const preset = linariaBabelPreset(babel, linariaOptions);

  const customLinariaExtractPlugin = [linariaCssExtractPlugin, { sourceDir, outputDir }];

  if (preset.plugins) preset.plugins.push(customLinariaExtractPlugin);
  else preset.plugins = [customLinariaExtractPlugin];

  return preset;
}
