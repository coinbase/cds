import fs from 'node:fs';

import type { ColorStyles } from '../../tools/ColorStyles';
import { writePrettyFile } from '../../utils';

import { writeVersionedFile } from './writeVersionedFile';

type CreateSvgContentParams = {
  svg: string;
  svgDir: string;
  svgJsDir?: string;
  svgEsmDir?: string;
  colorStyles?: ColorStyles;
  imageName: string;
};

export type SvgContent = {
  light?: string;
  dark?: string;
  themeable?: string;
};

function svgWriter(content: string) {
  return async function writeSvg(filePath: string) {
    await fs.promises.writeFile(filePath, content, 'utf-8');
  };
}

function svgJsWriter(content: string) {
  return async function writeSvg(filePath: string) {
    await writePrettyFile(filePath, content);
  };
}

/**
 * Injects width="100%" height="100%" into the opening <svg> tag so that
 * ESM themeable illustrations fill their container when rendered inline on web.
 * No-ops if the attributes are already present.
 */
function addSvgDimensions(svgString: string): string {
  const svgTagEnd = svgString.indexOf('>');
  if (svgTagEnd === -1 || /\bwidth=/.test(svgString.slice(0, svgTagEnd))) return svgString;
  return svgString.replace(/(<svg\b)/, '$1 width="100%" height="100%"');
}

export async function createSvgContent({
  svg,
  svgDir,
  svgJsDir,
  svgEsmDir,
  colorStyles,
  imageName,
}: CreateSvgContentParams) {
  const svgContent: SvgContent = {
    light: undefined,
    dark: undefined,
    themeable: undefined,
  };

  const sharedParams = {
    directory: svgDir,
    format: 'svg',
    imageName,
  } as const;

  svgContent.light = svg;

  if (colorStyles) {
    svgContent.dark = colorStyles.replaceLightWithDarkFills(svgContent.light);
    svgContent.themeable = colorStyles.replaceWithCssVariables(svgContent.light);

    const [svgLight, svgDark, svgJsLight, svgJsDark, svgJsThemed, svgEsmThemed] = await Promise.all(
      [
        writeVersionedFile({
          ...sharedParams,
          category: 'light',
          format: 'svg',
          directory: svgDir,
          writeFile: svgWriter(svgContent.light),
        }),
        writeVersionedFile({
          ...sharedParams,
          category: 'dark',
          format: 'svg',
          directory: svgDir,
          writeFile: svgWriter(svgContent.dark),
        }),
        ...(svgJsDir
          ? [
              writeVersionedFile({
                ...sharedParams,
                category: 'light',
                format: 'js',
                directory: svgJsDir,
                writeFile: svgJsWriter(`module.exports = { content:\`${svgContent.light}\` };`),
              }),
              writeVersionedFile({
                ...sharedParams,
                category: 'dark',
                format: 'js',
                directory: svgJsDir,
                writeFile: svgJsWriter(`module.exports = { content:\`${svgContent.dark}\` };`),
              }),
              writeVersionedFile({
                ...sharedParams,
                category: 'themeable',
                format: 'js',
                directory: svgJsDir,
                writeFile: svgJsWriter(`module.exports = { content:\`${svgContent.themeable}\` };`),
              }),
            ]
          : [undefined, undefined, undefined]),
        ...(svgEsmDir
          ? [
              writeVersionedFile({
                ...sharedParams,
                category: 'themeable',
                format: 'js',
                directory: svgEsmDir,
                writeFile: svgJsWriter(
                  `export default \`${addSvgDimensions(svgContent.themeable)}\`;`,
                ),
              }),
            ]
          : [undefined]),
      ],
    );

    return {
      outputs: {
        svgLight,
        svgDark,
        ...(svgJsLight ? { svgJsLight } : {}),
        ...(svgJsDark ? { svgJsDark } : {}),
        ...(svgJsThemed ? { svgJsThemed } : {}),
        ...(svgEsmThemed ? { svgEsmThemed } : {}),
      },
      svgContent,
    };
  }

  const svgLight = await writeVersionedFile({
    ...sharedParams,
    writeFile: svgWriter(svgContent.light),
  });

  return { outputs: { svgLight }, svgContent };
}
