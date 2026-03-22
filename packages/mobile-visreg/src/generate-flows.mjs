import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getVisregRoutes } from './config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, '../flows/capture-all.yaml');

const platform = process.argv[2] ?? 'ios';
const sorted = getVisregRoutes({ platform }).sort().slice(0, 2);

const DIALOG_TEXT = 'Open in \\"CDS\\"';

const routeSteps = sorted
  .map(
    (route) => `
# Route: ${route}
- openLink: \${SCHEME}:///Debug${route}
# The iOS "Open in CDS?" dialog appears asynchronously after openLink returns.
# Run the conditional twice: the first pass gives the dialog time to render,
# the second pass catches it if the first evaluated too early.
- runFlow:
    when:
      visible: '${DIALOG_TEXT}'
    commands:
      - tapOn: Open
      - assertNotVisible: '${DIALOG_TEXT}'
- runFlow:
    when:
      visible: '${DIALOG_TEXT}'
    commands:
      - tapOn: Open
      - assertNotVisible: '${DIALOG_TEXT}'
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
