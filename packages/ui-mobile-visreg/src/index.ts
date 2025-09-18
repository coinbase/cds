/// <reference types="detox" />

import { execSync } from 'node:child_process';

import type { PercyScreenshotOptions } from './percy/processScreenshots';
import processScreenshots from './percy/processScreenshots';
import { baseDir, playgroundDir } from './constants';
import {
  getDevicePlatform,
  takeElementScreenshot,
  takeRouteScreenshots as takeDetoxRouteScreenshots,
} from './detox';
import { ensureDirExists, removeAllFilesFromDir } from './utils';

async function takeScreenshot(
  dirPath: string,
  testName: string,
  options: {
    elementId?: string;
    filenamePrefix?: string | number;
  } = {},
) {
  const { elementId, filenamePrefix } = options;
  const prefix = filenamePrefix !== undefined ? `${filenamePrefix}_` : '';
  const filename = `${prefix}${testName}-${getDevicePlatform()}`;
  const filenameWithExtension = `${filename}.png`;
  const filePath = `${dirPath}/${filenameWithExtension}`;

  // if elementId provided, take an element level screenshot, otherwise take a device level screenshot
  const tempFilePath = elementId
    ? await takeElementScreenshot(elementId)
    : await device.takeScreenshot(filename);

  ensureDirExists(filePath);
  execSync(`mv ${tempFilePath} ${filePath}`);
}

async function takeRouteScreenshots(
  dirPath: string,
  routeName: string,
  options: { takeScreenLevelScreenshots?: boolean } = {},
) {
  const fullDirPath = `${dirPath}/${routeName}`;

  await takeDetoxRouteScreenshots(fullDirPath, routeName, takeScreenshot, options);
  return fullDirPath;
}

/**
 * Takes all screenshots for a given playground route. Once it has taken all screenshots
 *  for the route, this method uploads the screenshots to percy.
 *
 * @param {string} routeName Name of the route that will be included in the screenshot file name (e.g. 0_<routeName>-ios.png).
 *    The sdk will generate a set of route names leveraging the routes in the Mobile Playground.
 * @param {Object} [options] Options to configure screenshot captures.
 * @param {boolean} [options.takeScreenLevelScreenshots] If true, takes screenshots of the screen component and its children
 *    instead of the entire device. This can be useful to avoid capturing external noise like the device status or navigation
 *    bars, but cannot reliably capture modals as they operate outside the regular view hierarchy of the app.
 */
export async function uploadScreenshotsToPercyForRoute(
  routeName: string,
  options: { takeScreenLevelScreenshots?: boolean } = {},
) {
  const parentDir = `${baseDir}/${playgroundDir}`;
  const screenshotsDir = await takeRouteScreenshots(parentDir, routeName, options);

  processScreenshots(screenshotsDir, { parallelPercy: true });
}

/**
 * Takes one screenshot of a single component and its children on the current screen. This can take a full-screen
 *    screenshot if the provided componentId is associated to a component that wraps the entire app or screen and
 *    can be useful to avoid capturing external noise like the device status or navigation bars. Howevever,
 *    this method cannot reliably capture modals as they often operate outside the regular view hierarchy of the app.
 *
 * @param {string} testName Name of the test that will be included in the screenshot file name (e.g. <testName>-ios.png).
 * @param {string} componentId The React Native testID for the component to be screenshot.
 * @param {Object} [options] Options to configure screenshot captures.
 * @param {string} [options.screenshotDir] Path to artifacts subdirectory where screenshot will be saved. If not
 *    provided, the screenshot will be saved to the base artifacts directory.
 * @param {(string|number)} [options.filenamePrefix] Prefix to attach to the screenshot file name.
 */
export async function takeComponentScreenshot(
  testName: string,
  componentId: string,
  options: {
    screenshotDir?: string;
    filenamePrefix?: string | number;
  } = {},
) {
  const screenshotDir = options.screenshotDir ? `/${options.screenshotDir}` : '';
  const fullDirPath = `${baseDir}${screenshotDir}`;

  await takeScreenshot(fullDirPath, testName, {
    elementId: componentId,
    filenamePrefix: options.filenamePrefix,
  });
}

/**
 * Processes and uploads all stored screenshots in a directory for visual diffing.
 *
 * @param {Object} [options] Options to configure screenshot uploads.
 * @param {string} [options.screenshotDir] Path to artifacts subdirectory where screenshots to be uploaded are stored.
 *    If not provided, the processor will look for screenshots in the base artifacts directory.
 * @param {Object} [options.processingOptions] Options to configure underlying screenshot processor.
 */
export function processScreenshotsForVisualDiffs(options: {
  screenshotsDir?: string;
  processingOptions?: PercyScreenshotOptions;
}) {
  const screenshotsDir = options.screenshotsDir ? `/${options.screenshotsDir}` : '';
  const fullDirPath = `${baseDir}${screenshotsDir}`;

  processScreenshots(fullDirPath, options.processingOptions ?? {});
}

/**
 * Removes the artifacts directory and takes care of all other required clean up. This can be run after each test case
 *    or after all tests are run depending on the context.
 */
export function finishVisregTests() {
  removeAllFilesFromDir(baseDir);
}

export * from './detox';
export { getPlaygroundRoutes } from './getPlaygroundRoutes';
export * from './routes';
