import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getVisregRoutes } from './config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, '../flows/capture-all.yaml');

const platform = process.argv[2] ?? 'ios';
const sorted = getVisregRoutes({ platform }).sort().slice(0, 2);

const DIALOG_TEXT = 'Open in';

// iOS shows an "Open in CDS?" permission dialog the first time openLink is called
// in a simulator session. After tapping "Open", iOS remembers the choice for the
// rest of the session — so we only need to handle the dialog on the first route.
const iosDialogCheck = `
# waitForAnimationToEnd gives the iOS "Open in CDS?" dialog time to render
# before the conditional check runs. The dialog appears asynchronously after
# openLink returns, so checking immediately would always miss it.
- waitForAnimationToEnd
- runFlow:
    when:
      visible: '${DIALOG_TEXT}'
    commands:
      - tapOn: Open
      - assertNotVisible: '${DIALOG_TEXT}'`;

const routeSteps = sorted
  .map(
    (route, index) => `
# Route: ${route}
- openLink: \${SCHEME}:///Debug${route}${index === 0 ? iosDialogCheck : ''}
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
    text: CDS
${routeSteps}
`;

writeFileSync(outputPath, yaml, 'utf8');
console.log(
  `Generated flows/capture-all.yaml with ${sorted.length} routes (platform: ${platform})`,
);
