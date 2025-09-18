/// <reference types="detox" />

import { homeScreen } from '../constants';

import { screenShouldAppear } from './utils';

export default async function navigateToHome(routeName: string) {
  await device.openURL({ url: routeName });
  await screenShouldAppear(homeScreen);
}
