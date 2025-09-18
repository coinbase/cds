import type { NodePath, PluginObj } from '@babel/core';
import * as t from '@babel/types';
import chalk from 'chalk';
import fs from 'node:fs';
import path from 'node:path';
import type { Mapping, Position } from 'source-map';
import { SourceMapGenerator } from 'source-map';
import stylis from 'stylis';

export type CssResult = {
  cssText: string;
  sourceMap?: string;
};

export type ExtractConfigOptions = {
  sourceDir: string;
  outputDir: string;
};

export type CssExtractOptions = ExtractConfigOptions & {
  sourceFile: string;
  sourceMap: string;
  outputFile: string;
  code: string;
};

export type LinariaMetadata = {
  rules: Record<string, { cssText: string; start: Position }>;
};

// Copied from linaria's transform function
function extractCss(metadata: LinariaMetadata, options: CssExtractOptions): CssResult {
  const { rules } = metadata;
  const { sourceFile, outputFile, sourceMap, code } = options;
  const mappings: Mapping[] = [];
  const classes: string[] = [];

  Object.keys(rules).forEach((selector, index) => {
    mappings.push({
      generated: {
        line: index + 1,
        column: 0,
      },
      original: rules[selector].start,
      name: selector,
      source: '',
    });

    // Run each rule through stylis to support nesting
    classes.push(stylis(selector, rules[selector].cssText) as string);
  });

  const getSourceMap = () => {
    const generator = new SourceMapGenerator({
      file: outputFile,
    });

    mappings.forEach((mapping) => {
      generator.addMapping({ ...mapping, source: sourceFile });
    });

    generator.setSourceContent(sourceFile, code);

    return generator.toString();
  };

  const result: CssResult = {
    cssText: classes.join('\n'),
  };

  if (sourceMap) {
    result.sourceMap = getSourceMap();
  }

  return result;
}

function writeCssFiles(cssMap: Map<string, CssResult>) {
  try {
    cssMap.forEach(({ cssText, sourceMap }, outputFile) => {
      if (fs.existsSync(path.dirname(outputFile))) {
        fs.writeFileSync(
          outputFile,
          sourceMap ? `${cssText}\n/*# sourceMappingURL=${outputFile}.map */` : cssText,
        );

        if (sourceMap) fs.writeFileSync(`${outputFile}.map`, sourceMap);
      }
    });
  } catch (error) {
    console.error(chalk.redBright('error'), error);
  }
}

/**
 * This plugin is used to extract Linaria styles into static .css files via the Linaria
 * metadata in babel. This is useful if you want to use Babel to output the CSS files,
 * rather than using a bundler like Vite or Webpack. If you are using a bundler you
 * should not use this plugin, and instead use the official Linaria plugin for your
 * bundler.
 */
export function linariaCssExtractPlugin(): PluginObj {
  const cssMap = new Map<string, CssResult>();

  return {
    visitor: {
      Program: {
        exit(nodePath, state) {
          const { opts, file, filename: sourceFile } = state;
          const { sourceDir, outputDir } = opts as ExtractConfigOptions;
          const metadata = (file.metadata as { linaria: LinariaMetadata }).linaria;

          if (!metadata || !sourceFile || cssMap.has(sourceFile)) {
            return;
          }

          // Determine Bazel output path from sandbox path
          const outputFile = sourceFile.replace(sourceDir, outputDir).replace(/\.[jt]sx?$/, '.css');

          if (!cssMap.has(sourceFile)) {
            const processed = extractCss(metadata, {
              ...opts,
              sourceFile,
              outputFile,
              code: file.code,
            } as CssExtractOptions);

            cssMap.set(outputFile, processed);
          }

          // Include import to .css file
          const cssImport = t.importDeclaration(
            [],
            t.stringLiteral(`./${path.basename(outputFile)}`),
          );

          nodePath.node.body.forEach((node, index) => {
            if (
              node.type === 'ImportDeclaration' &&
              (node.source.value === 'linaria' || node.source.value === '@linaria/core')
            ) {
              node.specifiers = node.specifiers.filter((spec) => spec.local.name !== 'css');
              // Only `css` was imported from Linaria, so we can delete the Linaria import
              if (node.specifiers.length === 0)
                (nodePath.get(`body.${index}`) as NodePath).remove();
            }
          });

          // Add the CSS import to the end of the file
          nodePath.node.body.push(cssImport);
        },
      },
    },
    post() {
      writeCssFiles(cssMap);
    },
  };
}
