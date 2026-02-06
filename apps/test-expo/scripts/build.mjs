#!/usr/bin/env node
import { parseArgs } from 'node:util';

import { createBuilder } from './utils/createBuilder.mjs';
import { getBuildInfo } from './utils/getBuildInfo.mjs';

const { values } = parseArgs({
  options: {
    platform: { type: 'string' },
    profile: { type: 'string', default: 'debug' },
    target: { type: 'string', default: 'simulator' },
  },
});

const { platform, profile, target } = values;

if (!platform) {
  console.error(
    'Usage: node build.mjs --platform <ios|android> [--profile <debug|release>] [--target <simulator|device>]',
  );
  process.exit(1);
}

if (target !== 'simulator' && target !== 'device') {
  console.error('Error: --target must be "simulator" or "device"');
  process.exit(1);
}

const buildInfo = getBuildInfo({ platform, profile, target });
const builder = createBuilder(buildInfo);

await builder.build();

console.log(`\nBuild artifacts are in: ${buildInfo.outputPath}/`);
process.exit(0);
