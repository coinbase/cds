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
    (route) => `
# Route: ${route}
- runFlow:
    file: ./capture-route-steps.yaml
    env:
      ROUTE_NAME: ${route}`,
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
- waitForAnimationToEnd
${routeSteps}
`;

writeFileSync(outputPath, yaml, 'utf8');
console.log(
  `Generated flows/capture-all.yaml with ${sorted.length} routes (platform: ${platform})`,
);
