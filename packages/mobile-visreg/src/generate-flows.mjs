import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getVisregRoutes, isOverlayRoute } from './config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, '../flows/capture-all.yaml');

const sorted = getVisregRoutes().sort();

const routeSteps = sorted
  .map((route, index) => {
    const file = isOverlayRoute(route)
      ? './capture-overlay-route-steps.yaml'
      : './capture-route-steps.yaml';

    // Dismiss the iOS "Open in CDS?" dialog on the first deep link only.
    // The simulator remembers the approval for the rest of the session.
    const dismissDialog =
      index === 0
        ? `
- runFlow:
    file: ./dismiss-deep-link-dialog.yaml
    label: "Dismiss deep link dialog"`
        : '';

    return `${dismissDialog}
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
