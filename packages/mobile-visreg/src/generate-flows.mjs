import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getVisregRoutes } from './config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, '../flows/capture-all.yaml');

const platform = process.argv[2] ?? 'ios';
const sorted = getVisregRoutes({ platform }).sort();

const routeSteps = sorted
  .map(
    (route) => `
# Route: ${route}
- openLink: \${SCHEME}:///Debug${route}
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
    text: Accordion
${routeSteps}
`;

writeFileSync(outputPath, yaml, 'utf8');
console.log(`Generated flows/capture-all.yaml with ${sorted.length} routes (platform: ${platform})`);
