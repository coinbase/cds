import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getVisregRoutes, isOverlayRoute } from './config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, '../flows/capture-all.yaml');

// --no-dismiss-dialog: skip the iOS simulator "Open in app?" workaround.
// On real devices (BrowserStack) Maestro's openLink goes straight to the app
// via XCUITest — no system dialog appears. Passing expoapp:///dismiss to the
// app on a real device causes a crash (no /dismiss route), which disconnects
// the XCUITest session. Omit it entirely for device runs.
const dismissDialog = !process.argv.includes('--no-dismiss-dialog');

const sorted = getVisregRoutes().sort();

const routeSteps = sorted
  .map((route, index) => {
    const file = isOverlayRoute(route)
      ? './capture-overlay-route-steps.yaml'
      : './capture-route-steps.yaml';

    // On simulators, the first openLink triggers an "Open in app?" dialog.
    // Dismiss it once so subsequent deep links go straight through.
    const dismissStep =
      dismissDialog && index === 0
        ? `
- runFlow:
    file: ./dismiss-deep-link-dialog.yaml
    label: "Dismiss deep link dialog"`
        : '';

    return `${dismissStep}
- runFlow:
    file: ${file}
    label: "Route: ${route}"
    env:
      ROUTE_NAME: ${route}`;
  })
  .join('\n');

const yaml = `# AUTO-GENERATED — do not edit
# Run: node src/generate-flows.mjs
appId: \${APP_ID}
---
- launchApp:
    appId: \${APP_ID}
- assertVisible:
    text: CDS
- waitForAnimationToEnd
${routeSteps}
`;

writeFileSync(outputPath, yaml, 'utf8');
console.log(`Generated flows/capture-all.yaml with ${sorted.length} routes`);
