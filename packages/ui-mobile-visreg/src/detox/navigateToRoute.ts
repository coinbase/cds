/// <reference types="detox" />

import { screen } from '../constants';

import { screenShouldExist } from './utils';

export default async function navigateToRoute(routeName: string) {
  await device.openURL({ url: routeName });
  // can't rely on screenShouldAppear (expect.toBeVisible()) because modals overlay the screen
  await screenShouldExist(screen);
}
