#!/usr/bin/env node

/**
 * Parse the two preview checkboxes out of a PR body.
 *
 * Reads the PR body from argv[2] (or stdin if omitted) and prints
 * "<docs> <storybook>" as space-separated true/false values, e.g. "true false".
 *
 * Shared by the preview-deploy `check` job and the `deploy` step so the
 * checkbox-parsing logic lives in exactly one place.
 *
 * Usage:
 *   node parse-preview-flags.mjs "$PR_BODY"
 *   printf '%s' "$PR_BODY" | node parse-preview-flags.mjs
 */

// A checkbox is "checked" when a single line contains both the "[x]" marker
// and the label (case-insensitive), matching GitHub's "- [x] <label>" rendering.
function isChecked(body, label) {
  const lowerLabel = label.toLowerCase();
  return body
    .split('\n')
    .some((line) => line.includes('[x]') && line.toLowerCase().includes(lowerLabel));
}

function emit(body) {
  const docs = isChecked(body, 'Deploy documentation preview');
  const storybook = isChecked(body, 'Deploy Storybook preview');
  // Trailing newline is required: callers use `read`, which returns non-zero at
  // EOF without a newline and would fail the step under `bash -e`.
  process.stdout.write(`${docs} ${storybook}\n`);
}

const argBody = process.argv[2];
if (argBody !== undefined) {
  emit(argBody);
} else {
  let body = '';
  process.stdin.setEncoding('utf-8');
  process.stdin.on('data', (chunk) => (body += chunk));
  process.stdin.on('end', () => emit(body));
}
