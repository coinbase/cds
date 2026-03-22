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
# iOS may show an "Open in CDS?" confirmation dialog on first openLink per simulator session.
# This conditional dismisses it automatically; it is a no-op once the choice has been accepted.
- runFlow:
    when:
      visible: 'Open in "CDS"'
    commands:
      - tapOn: Open
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
