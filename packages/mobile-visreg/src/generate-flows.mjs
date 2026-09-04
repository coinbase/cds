import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getOverlayDismissLabel, getVisregRoutes, isOverlayRoute } from './config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, '../flows/capture-all.yaml');

const sorted = getVisregRoutes().sort();

const routeSteps = sorted
  .map((route) => {
    if (!isOverlayRoute(route)) {
      return `
- runFlow:
    file: ./capture-route-steps.yaml
    label: "Route: ${route}"
    env:
      ROUTE_NAME: ${route}`;
    }

    const dismissLabel = getOverlayDismissLabel(route);
    if (!dismissLabel) {
      throw new Error(
        `Overlay route "${route}" has no dismiss label. Add one to overlayRoutes in config/enabled-routes.mjs.`,
      );
    }

    return `
- runFlow:
    file: ./capture-overlay-route-steps.yaml
    label: "Route: ${route}"
    env:
      ROUTE_NAME: ${route}
      DISMISS_LABEL: ${dismissLabel}`;
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
${routeSteps}
`;

writeFileSync(outputPath, yaml, 'utf8');
console.log(`Generated flows/capture-all.yaml with ${sorted.length} routes`);
