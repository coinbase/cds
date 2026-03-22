import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getVisregRoutes } from './config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, '../flows/capture-all.yaml');

const platform = process.argv[2] ?? 'ios';
const sorted = getVisregRoutes({ platform }).sort().slice(0, 2);

const routeSteps = sorted
  .map(
    (route, index) => `
# Route: ${route}
- openLink: \${SCHEME}:///Debug${route}${
      index === 0
        ? `
# iOS shows an "Open in CDS?" dialog on the first openLink per simulator session.
# extendedWaitUntil polls until the dialog appears, then we dismiss it.
# iOS remembers the choice — subsequent routes won't show the dialog.
- extendedWaitUntil:
    visible: Cancel
    timeout: 5000
- tapOn: Open
# First waitForAnimationToEnd covers the dialog dismissal animation.
# Second covers the deep link navigation transition that starts asynchronously after dismissal.
- waitForAnimationToEnd`
        : ''
    }
# waitForAnimationToEnd covers both the navigation transition and any modal animations,
# so routes that auto-open a modal (e.g. AlertBasic) are captured in their designed state.
- waitForAnimationToEnd
- takeScreenshot: ${route}\${PLATFORM_SUFFIX}`,
  )
  .join('\n');

const yaml = `# AUTO-GENERATED — do not edit
# Run: node src/generate-flows.mjs
appId: \${APP_ID}
---
- launchApp:
    appId: \${APP_ID}
- assertVisible:
    text: 'CDS'
${routeSteps}
`;

writeFileSync(outputPath, yaml, 'utf8');
console.log(`Generated flows/capture-all.yaml with ${sorted.length} routes (platform: ${platform})`);
