import { findElementById } from './utils';

export default async function takeElementScreenshot(elementId: string) {
  // passing the file name into element level takeScreenshot causes detox to lose track of the image,
  // but setting a file name isn't required for this use case
  const tempFilePath = await findElementById(elementId).takeScreenshot('');

  return tempFilePath;
}
