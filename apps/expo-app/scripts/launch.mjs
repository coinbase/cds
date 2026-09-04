#!/usr/bin/env node
import { parseArgs } from 'node:util';

import { createBuilder } from './utils/createBuilder.mjs';
import { getBuildInfo } from './utils/getBuildInfo.mjs';

const { values } = parseArgs({
  options: {
    platform: { type: 'string' },
    profile: { type: 'string', default: 'debug' },
  },
});

const { platform, profile } = values;

if (!platform) {
  console.error('Usage: node launch.mjs --platform <ios|android> [--profile <debug|release>]');
  process.exit(1);
}

const buildInfo = getBuildInfo({ platform, profile, target: 'simulator' });
const builder = createBuilder(buildInfo);

// Check that build artifact exists
if (!(await builder.hasBuildArtifact())) {
  const config = `${platform}-${profile}`;
  console.error(`Error: Build artifact not found.`);
  console.error(`Run: yarn nx run expo-app:build --configuration=${config}`);
  process.exit(1);
}

// Install and launch
await builder.install();
await builder.launch();

console.log('\nApp launched! Run "yarn nx run expo-app:start" to connect Metro.');
