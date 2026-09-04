import sharp from 'sharp';

import type { SvgContent } from './createSvgContent';
import { writeVersionedFile } from './writeVersionedFile';

type CreatePngContentParams = {
  pngDir: string;
  svgContent: SvgContent;
  imageName: string;
};

function pngWriter(content: string) {
  return async function writePng(filePath: string) {
    await sharp(Buffer.from(content)).toFile(filePath);
  };
}

export async function createPngContent({ svgContent, pngDir, ...params }: CreatePngContentParams) {
  const outputs: {
    pngLight?: string;
    pngDark?: string;
  } = {};

  if (svgContent.light) {
    const pngLight = await writeVersionedFile({
      ...params,
      writeFile: pngWriter(svgContent.light),
      category: 'light',
      format: 'png',
      directory: pngDir,
    });
    outputs.pngLight = pngLight;
  }
  if (svgContent.dark) {
    const pngDark = await writeVersionedFile({
      ...params,
      writeFile: pngWriter(svgContent.dark),
      category: 'dark',
      format: 'png',
      directory: pngDir,
    });
    outputs.pngDark = pngDark;
  }
  return { outputs };
}
