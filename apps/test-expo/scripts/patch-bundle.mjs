#!/usr/bin/env node
/**
 * Patches a fresh JS bundle into a pre-built native artifact (iOS .app / Android APK).
 * This avoids a full native rebuild in CI — only the JS layer is updated.
 *
 * Usage:
 *   node scripts/patch-bundle.mjs --platform ios [--profile release]
 *   node scripts/patch-bundle.mjs --platform android [--profile release]
 *
 * Prerequisites: a build artifact must already exist at builds/{platform}-{profile}/.
 * Build one with: yarn nx run test-expo:build --configuration={platform}-{profile}
 */
import { parseArgs } from 'node:util';

import { createBuilder } from './utils/createBuilder.mjs';
import { getBuildInfo } from './utils/getBuildInfo.mjs';

const { values } = parseArgs({
  options: {
    platform: { type: 'string' },
    profile: { type: 'string', default: 'release' },
  },
});

const { platform, profile } = values;

if (!platform || !['ios', 'android'].includes(platform)) {
  console.error('Usage: node patch-bundle.mjs --platform <ios|android> [--profile <release|debug>]');
  process.exit(1);
}

const buildInfo = getBuildInfo({ platform, profile, target: 'simulator' });
const builder = createBuilder(buildInfo);

await builder.patchBundle();
