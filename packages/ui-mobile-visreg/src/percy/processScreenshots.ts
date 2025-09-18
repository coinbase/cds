import { runCmd } from '../utils';

export type PercyScreenshotOptions = {
  skipPercyUpload?: boolean;
  parallelPercy?: boolean;
};

function uploadImages(dirPath: string, parallelPercy = false) {
  const percyUploadCmd = `percy upload -c ./.percy.yml -f "./*.{png,jpg,jpeg}" ${dirPath}`;
  const cmd = parallelPercy ? `percy exec --parallel -- ${percyUploadCmd}` : percyUploadCmd;
  runCmd(cmd);
}

export default function processScreenshots(
  dirPath: string,
  { skipPercyUpload = false, parallelPercy = false }: PercyScreenshotOptions,
) {
  if (!skipPercyUpload) {
    uploadImages(dirPath, parallelPercy);
  }
}
