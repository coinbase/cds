import {
  androidDeviceSwipeOffset,
  iosDeviceScrolDistance,
  screen,
  scrollView,
  scrollViewEnd,
} from '../constants';

import getDevicePlatform from './getDevicePlatform';
import { findElementById, sleep } from './utils';

async function scrollToEnd() {
  try {
    await expect(findElementById(scrollViewEnd)).not.toBeVisible();

    // detox scroll on Android and swipe on iOS are not deterministic,
    // so we need to maintain a different method for each device
    if (getDevicePlatform() === 'ios') {
      await findElementById(scrollView).scroll(iosDeviceScrolDistance, 'down');
    } else {
      await findElementById(scrollView).swipe('up', 'slow', androidDeviceSwipeOffset);
    }
  } catch {
    return true;
  }

  return false;
}

export default async function takeRouteScreenshots(
  fullDirPath: string,
  routeName: string,
  takeScreenshotCb: (
    dirPath: string,
    testName: string,
    options?: {
      elementId?: string;
      filenamePrefix?: string | number;
    },
  ) => Promise<void>,
  options: { takeScreenLevelScreenshots?: boolean } = {},
) {
  let atEnd = false;
  let count = 0;

  while (!atEnd) {
    await sleep(1000);
    await takeScreenshotCb(fullDirPath, routeName, {
      elementId: options.takeScreenLevelScreenshots ? screen : undefined,
      filenamePrefix: count,
    });
    atEnd = await scrollToEnd();
    count += 1;
  }
}
