import fs from 'node:fs';

import { existsOrCreateDir } from '../../utils';

type ImageCategory = 'light' | 'dark' | 'themeable';

export type WriteImageParams = {
  directory: string;
  format: string;
  category?: ImageCategory;
  imageName: string;
  writeFile: (filePath: string) => Promise<void>;
};

export async function writeVersionedFile({
  writeFile,
  category,
  directory,
  imageName,
  format,
}: WriteImageParams) {
  const basename = category ? `${directory}/${category}/${imageName}` : `${directory}/${imageName}`;
  const imagePath = `${basename}.${format}`;
  const exists = fs.existsSync(imagePath);

  if (exists) {
    await writeFile(imagePath);
  } else {
    await existsOrCreateDir(imagePath);
    await writeFile(imagePath);
  }

  return imagePath;
}
