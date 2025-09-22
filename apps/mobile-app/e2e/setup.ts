import { initialRouteName } from '@cbhq/ui-mobile-playground/components/staticRoutes';
import { finishVisregTests, navigateToHome } from '@cbhq/ui-mobile-visreg';

import { openApp } from './utils/openApp';

beforeAll(async () => {
  await openApp();
});

beforeEach(async () => {
  // return to initial screen to reset state, required to close modals
  await navigateToHome(`cds://${initialRouteName}`);
});

afterEach(async () => {
  if (testFailed) {
    await device.takeScreenshot('test_failure');
  }
});

afterAll(() => {
  finishVisregTests();
});
