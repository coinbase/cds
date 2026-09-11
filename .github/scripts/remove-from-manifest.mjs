#!/usr/bin/env node

/**
 * Remove a PR preview entry from manifest.json
 * Usage: node remove-from-manifest.mjs <pr-number>
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const [prNumber] = process.argv.slice(2);

if (!prNumber) {
  console.error('Usage: node remove-from-manifest.mjs <pr-number>');
  process.exit(1);
}

const manifestPath = path.join(process.cwd(), 'manifest.json');

// Read existing manifest
if (!fs.existsSync(manifestPath)) {
  console.log('⚠️  Manifest does not exist, nothing to remove');
  process.exit(0);
}

let manifest;
try {
  const content = fs.readFileSync(manifestPath, 'utf-8');
  manifest = JSON.parse(content);
} catch (error) {
  console.error('❌ Failed to parse manifest:', error.message);
  process.exit(1);
}

// Remove preview entry
const prNum = parseInt(prNumber, 10);
const initialLength = manifest.previews.length;
manifest.previews = manifest.previews.filter((p) => p.pr !== prNum);

if (manifest.previews.length === initialLength) {
  console.log(`⚠️  PR #${prNum} not found in manifest`);
} else {
  console.log(`✅ Removed preview for PR #${prNum}`);
}

// Update last updated timestamp
manifest.lastUpdated = new Date().toISOString();

// Write manifest
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');

console.log(`📝 Manifest updated successfully`);
console.log(`   Total previews: ${manifest.previews.length}`);
