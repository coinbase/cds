#!/usr/bin/env node
/**
 * Patches a fresh JS bundle into a pre-built native artifact (iOS .app / Android APK).
 * This avoids a full native rebuild in CI — only the JS layer is updated.
 *
 * Usage:
 *   node scripts/patch-bundle.mjs --platform ios [--profile release] [--target simulator|device]
 *   node scripts/patch-bundle.mjs --platform android [--profile release]
 *
 * Prerequisites: a build artifact must already exist at prebuilds/{platform}-{profile}[-device]/.
 * Build one with: yarn nx run expo-app:build --configuration={platform}-{profile}[-device]
 *
 * The `device` target patches the JS bundle inside the committed device .ipa
 * (used for BrowserStack App Automate). No code signing is performed —
 * BrowserStack re-signs uploaded iOS apps with its own provisioning profile.
 */
import { parseArgs } from 'node:util';

import { createBuilder } from './utils/createBuilder.mjs';
import { getBuildInfo } from './utils/getBuildInfo.mjs';

const { values } = parseArgs({
  options: {
    platform: { type: 'string' },
    profile: { type: 'string', default: 'release' },
    target: { type: 'string', default: 'simulator' },
  },
});

const { platform, profile, target } = values;

if (!platform || !['ios', 'android'].includes(platform)) {
  console.error(
    'Usage: node patch-bundle.mjs --platform <ios|android> [--profile <release|debug>] [--target <simulator|device>]',
  );
  process.exit(1);
}

const buildInfo = getBuildInfo({ platform, profile, target });
const builder = createBuilder(buildInfo);

await builder.patchBundle();
