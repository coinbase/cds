#!/usr/bin/env node

/**
 * Update manifest.json with a new or updated PR preview entry
 * Usage: node update-manifest.mjs <pr-number> <pr-title> <branch> <author> <commit> <has-docs> <has-storybook>
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const [prNumber, prTitle, branch, author, commit, hasDocs, hasStorybook] = process.argv.slice(2);

if (!prNumber || !prTitle || !branch || !author || !commit) {
  console.error(
    'Usage: node update-manifest.mjs <pr-number> <pr-title> <branch> <author> <commit> <has-docs> <has-storybook>',
  );
  process.exit(1);
}

const manifestPath = path.join(process.cwd(), 'manifest.json');

// Read existing manifest or create new one
let manifest = {
  previews: [],
  lastUpdated: new Date().toISOString(),
};

if (fs.existsSync(manifestPath)) {
  try {
    const content = fs.readFileSync(manifestPath, 'utf-8');
    manifest = JSON.parse(content);
  } catch (error) {
    console.warn('Failed to parse existing manifest, creating new one');
  }
}

// Find existing preview or create new entry
const prNum = parseInt(prNumber, 10);
const existingIndex = manifest.previews.findIndex((p) => p.pr === prNum);

const previewEntry = {
  pr: prNum,
  title: prTitle,
  branch: branch,
  author: author,
  baseUrl: `/cds/pr-${prNum}/`,
  previews: {
    docs: hasDocs === 'true' ? `/cds/pr-${prNum}/docs/` : null,
    storybook: hasStorybook === 'true' ? `/cds/pr-${prNum}/storybook/` : null,
  },
  createdAt:
    existingIndex >= 0 ? manifest.previews[existingIndex].createdAt : new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  commit: commit,
};

if (existingIndex >= 0) {
  // Update existing preview
  manifest.previews[existingIndex] = previewEntry;
  console.log(`✅ Updated preview for PR #${prNum}`);
} else {
  // Add new preview
  manifest.previews.push(previewEntry);
  console.log(`✅ Added preview for PR #${prNum}`);
}

// Log which previews are available
const availablePreviews = [];
if (previewEntry.previews.docs) availablePreviews.push('docs');
if (previewEntry.previews.storybook) availablePreviews.push('storybook');
console.log(`   Available previews: ${availablePreviews.join(', ') || 'none'}`);

// Sort by PR number (descending)
manifest.previews.sort((a, b) => b.pr - a.pr);

// Update last updated timestamp
manifest.lastUpdated = new Date().toISOString();

// Write manifest
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');

console.log(`📝 Manifest updated successfully`);
console.log(`   Total PRs: ${manifest.previews.length}`);
