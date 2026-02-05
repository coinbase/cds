#!/usr/bin/env node
/**
 * Smart run script that uses pre-built artifacts if available,
 * otherwise falls back to building from source.
 */
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
  console.error('Usage: node run.mjs --platform <ios|android> [--profile <debug|release>]');
  process.exit(1);
}

const buildInfo = getBuildInfo({ platform, profile, target: 'simulator' });
const builder = createBuilder(buildInfo);

// Build if needed, launch, and start Metro
await builder.buildIfNeeded();

console.log(`Launching ${platform}...`);
await builder.ensureSimulatorRunning();
await builder.install();
await builder.launch();
await builder.startMetro();
