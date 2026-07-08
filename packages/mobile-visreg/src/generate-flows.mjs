import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getVisregRoutes, isOverlayRoute } from './config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, '../flows/capture-all.yaml');

// --device: generate flows for BrowserStack real-device runs.
//   - Uses scrollUntilVisible + tapOn + swipe-back instead of openLink.
//     Maestro's openLink on iOS real devices uses a lower-level device channel
//     that is not available on BrowserStack, failing with "Invalid device".
//   - Skips the dismiss-deep-link-dialog step (no system dialog appears on device).
// Without this flag (default): simulator/local mode — uses openLink and
// includes the dismiss-dialog workaround for the first deep link.
const deviceMode = process.argv.includes('--device');

const sorted = getVisregRoutes().sort();

const routeSteps = sorted
  .map((route, index) => {
    const file = isOverlayRoute(route)
      ? deviceMode
        ? './capture-overlay-route-steps-device.yaml'
        : './capture-overlay-route-steps.yaml'
      : deviceMode
        ? './capture-route-steps-device.yaml'
        : './capture-route-steps.yaml';

    // On simulators, the first openLink triggers an "Open in app?" dialog.
    // Dismiss it once so subsequent deep links go straight through.
    // Not needed in device mode (no dialog, and openLink is not used).
    const dismissStep =
      !deviceMode && index === 0
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
