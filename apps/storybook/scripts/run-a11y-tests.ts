import { A11yTestRunner } from '@shopify/storybook-a11y-test';
import path from 'node:path';

const rootOfRepo = path.join(__dirname, '../../..');
const buildDir = path.join(rootOfRepo, 'apps/storybook/dist');

async function runA11yTests() {
  const testRunner = new A11yTestRunner(buildDir);

  try {
    // Grab all Story IDs
    const storyIds = await testRunner.collectEnabledStoryIdsFromIFrame();

    // Run tests on all stories in `storyIds`
    const results = await testRunner.testStories({
      storyIds,
      concurrentCount: 15,

      // Optional: maximum time in milliseconds to wait for the browser instance to start.
      // Defaults to 30000 (30 seconds). Pass 0 to disable timeout.
      timeout: 90000,
    });

    if (results.length) {
      console.error(`‼️  Accessibility violations found`);
      console.log(results.join('\n'));
      process.exitCode = 1;
    } else {
      console.log('🧚  Accessibility tests passed');
    }
  } finally {
    await testRunner.teardown();
  }
}

void runA11yTests();
