/**
 * BrowserStack App Automate REST API client for Maestro.
 *
 * Thin wrapper around the v2 Maestro endpoints used to run the visreg suite on
 * BrowserStack's real-device cloud. Uses Node's built-in `fetch` / `FormData`
 * (Node 18+) — no extra dependencies.
 *
 * Auth is HTTP Basic via BROWSERSTACK_USERNAME / BROWSERSTACK_ACCESS_KEY.
 *
 * Docs: https://www.browserstack.com/docs/app-automate/api-reference/maestro/overview
 */
import { execFileSync } from 'node:child_process';
import { openAsBlob } from 'node:fs';
import { access, mkdir, rm, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

import { downloadConcurrency, timeouts } from './config.mjs';

const API_BASE = 'https://api-cloud.browserstack.com/app-automate/maestro/v2';

// Statuses that mean the build exists but has not started executing on a
// device yet. Time spent here is queue time, budgeted separately from run time.
const QUEUED_STATUSES = new Set(['queued', 'in_queue', 'created', 'pending', 'scheduled']);

// Build statuses that mean "still working" — anything else is terminal.
const RUNNING_STATUSES = new Set(['running', ...QUEUED_STATUSES]);

const MAX_REQUEST_ATTEMPTS = 3;
const RETRY_BASE_DELAY_MS = 2000;

/** Transient HTTP statuses worth retrying rather than failing the whole run. */
const RETRYABLE_STATUSES = new Set([408, 425, 429, 500, 502, 503, 504]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function backoff(attempt, maxAttempts, error) {
  console.warn(`  ⚠ ${error.message.split('\n')[0]} — retry ${attempt}/${maxAttempts - 1}`);
  await sleep(RETRY_BASE_DELAY_MS * attempt);
}

function formatDuration(ms) {
  const totalSeconds = Math.round(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m${String(seconds).padStart(2, '0')}s`;
}

function authHeader() {
  const username = process.env.BROWSERSTACK_USERNAME;
  const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;
  if (!username || !accessKey) {
    throw new Error(
      'BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY environment variables must be set',
    );
  }
  return `Basic ${Buffer.from(`${username}:${accessKey}`).toString('base64')}`;
}

/**
 * fetch wrapper that attaches BrowserStack basic auth only for BrowserStack
 * hosts. Artifact URLs are sometimes pre-signed on a different host (e.g. S3),
 * where sending an Authorization header would be rejected.
 *
 * Every request carries an explicit timeout. Node's fetch has none, so without
 * one a stalled connection hangs forever — the poll loop only checks its
 * deadline between requests, so a hung request outlives any build budget and
 * runs until the CI job itself is killed.
 *
 * GETs are retried on transient failures. Polling a build issues well over a
 * hundred requests across a run, and a single blip 25 minutes in used to
 * discard the entire build. Writes are never retried: re-sending an upload or
 * a build trigger would duplicate it.
 */
async function bsFetch(url, options = {}) {
  // Use exact match or subdomain check (with leading dot) to prevent a host
  // like "evilbrowserstack.com" from satisfying a bare endsWith check.
  const host = new URL(url).host;
  const isBrowserStackHost = host === 'browserstack.com' || host.endsWith('.browserstack.com');
  const headers = { ...(options.headers ?? {}) };
  if (isBrowserStackHost) {
    headers.Authorization = authHeader();
  }

  const { timeoutMs = timeouts.requestMs, ...fetchOptions } = options;
  const method = (fetchOptions.method ?? 'GET').toUpperCase();
  const maxAttempts = method === 'GET' ? MAX_REQUEST_ATTEMPTS : 1;

  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    let res;
    try {
      res = await fetch(url, {
        ...fetchOptions,
        headers,
        signal: AbortSignal.timeout(timeoutMs),
      });
    } catch (err) {
      // AbortSignal.timeout rejects with a TimeoutError; surface it as such.
      lastError =
        err.name === 'TimeoutError'
          ? new Error(`Request timed out after ${timeoutMs}ms (${url})`)
          : err;
      if (attempt === maxAttempts) break;
      await backoff(attempt, maxAttempts, lastError);
      continue;
    }

    if (res.ok) return res;

    const body = await res.text().catch(() => '');
    const error = new Error(`Request failed ${res.status} ${res.statusText} (${url})\n${body}`);
    // Bad credentials or a missing build will fail identically on every
    // attempt, so retrying only delays the report.
    if (!RETRYABLE_STATUSES.has(res.status)) throw error;

    lastError = error;
    if (attempt === maxAttempts) break;
    await backoff(attempt, maxAttempts, lastError);
  }

  throw lastError;
}

/**
 * Upload the app under test (.ipa / .apk).
 * @returns {Promise<string>} the bs://... app url
 */
export async function uploadApp(filePath, customId) {
  console.log(`Uploading app: ${filePath}`);
  try {
    await access(filePath);
  } catch {
    throw new Error(
      `App artifact not found: ${filePath}\n` +
        `Build it first with the appropriate patch-bundle target, e.g.:\n` +
        `  yarn nx run expo-app:patch-bundle --configuration=android\n` +
        `  yarn nx run expo-app:patch-bundle --configuration=ios-device`,
    );
  }
  const form = new FormData();
  form.set('file', await openAsBlob(filePath), basename(filePath));
  if (customId) form.set('custom_id', customId);

  const res = await bsFetch(`${API_BASE}/app`, {
    method: 'POST',
    body: form,
    timeoutMs: timeouts.uploadMs,
  });
  const json = await res.json();
  console.log(`  → app_url: ${json.app_url}`);
  return json.app_url;
}

/**
 * Upload the zipped Maestro test-suite. The zip must contain a single parent
 * folder holding all flow YAMLs.
 * @returns {Promise<string>} the bs://... test suite url
 */
export async function uploadTestSuite(zipPath, customId) {
  console.log(`Uploading test suite: ${zipPath}`);
  const form = new FormData();
  form.set('file', await openAsBlob(zipPath), basename(zipPath));
  if (customId) form.set('custom_id', customId);

  const res = await bsFetch(`${API_BASE}/test-suite`, {
    method: 'POST',
    body: form,
    timeoutMs: timeouts.uploadMs,
  });
  const json = await res.json();
  console.log(`  → test_suite_url: ${json.test_suite_url}`);
  return json.test_suite_url;
}

/**
 * Trigger a Maestro build.
 * @param {'ios'|'android'} platform
 * @param {object} opts { app, testSuite, devices, project, setEnvVariables, execute, ...extra }
 * @returns {Promise<string>} the build id
 */
export async function triggerBuild(platform, opts) {
  const { app, testSuite, devices, project, setEnvVariables, execute, ...extra } = opts;
  const body = {
    app,
    testSuite,
    devices,
    ...(project ? { project } : {}),
    ...(setEnvVariables ? { setEnvVariables } : {}),
    ...(execute ? { execute } : {}),
    ...extra,
  };

  console.log(`Triggering ${platform} build on devices: ${devices.join(', ')}`);
  const res = await bsFetch(`${API_BASE}/${platform}/build`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!json.build_id) {
    throw new Error(`Build did not start: ${JSON.stringify(json)}`);
  }
  console.log(`  → build_id: ${json.build_id}`);
  return json.build_id;
}

/** List recent Maestro builds (most recent first). */
export async function listRecentBuilds(limit = 5) {
  const res = await bsFetch(`${API_BASE}/builds?limit=${limit}`);
  return res.json();
}

/** Fetch the current build object. */
export async function getBuild(buildId) {
  const res = await bsFetch(`${API_BASE}/builds/${buildId}`);
  return res.json();
}

/** Fetch details (including artifact URLs) for a single session. */
export async function getSessionDetails(buildId, sessionId) {
  const res = await bsFetch(`${API_BASE}/builds/${buildId}/sessions/${sessionId}`);
  return res.json();
}

/**
 * Poll a build until it reaches a terminal status or a timeout elapses.
 *
 * Queue time and execution time get separate budgets so a saturated
 * BrowserStack account is distinguishable from a suite that got slower — with
 * a single combined budget both present identically as "timed out at N
 * minutes". The returned timing is logged so runs are comparable over time.
 *
 * @returns {Promise<object>} the final build object, with a `timing` field
 */
export async function pollBuild(
  buildId,
  {
    intervalMs = timeouts.pollIntervalMs,
    queueTimeoutMs = timeouts.queueMs,
    runTimeoutMs = timeouts.runMs,
  } = {},
) {
  const startedAt = Date.now();
  let startedRunningAt = null;
  let lastStatus = null;

  let build = await getBuild(buildId);

  while (RUNNING_STATUSES.has(build.status)) {
    const now = Date.now();
    const isQueued = QUEUED_STATUSES.has(build.status);
    if (!isQueued && startedRunningAt === null) {
      startedRunningAt = now;
    }

    if (build.status !== lastStatus) {
      console.log(`  [${formatDuration(now - startedAt)}] build ${buildId} → ${build.status}`);
      lastStatus = build.status;
    }

    if (isQueued && now - startedAt > queueTimeoutMs) {
      throw new Error(
        `Build ${buildId} sat in "${build.status}" for ${formatDuration(now - startedAt)} ` +
          `(limit ${formatDuration(queueTimeoutMs)}). The BrowserStack account is likely out of ` +
          `free parallel sessions. Raise VISREG_QUEUE_TIMEOUT_MS or reduce concurrent runs.`,
      );
    }
    if (!isQueued && now - startedRunningAt > runTimeoutMs) {
      throw new Error(
        `Build ${buildId} ran for ${formatDuration(now - startedRunningAt)} without finishing ` +
          `(limit ${formatDuration(runTimeoutMs)}). The suite is too slow for its budget — ` +
          `check the per-flow timings on the BrowserStack dashboard.`,
      );
    }

    await sleep(intervalMs);
    build = await getBuild(buildId);
  }

  const finishedAt = Date.now();
  const queuedMs = (startedRunningAt ?? finishedAt) - startedAt;
  const ranMs = startedRunningAt === null ? 0 : finishedAt - startedRunningAt;
  console.log(
    `  [${formatDuration(finishedAt - startedAt)}] build ${buildId} → ${build.status} ` +
      `(queued ${formatDuration(queuedMs)}, ran ${formatDuration(ranMs)})`,
  );

  return { ...build, timing: { queuedMs, ranMs, totalMs: finishedAt - startedAt } };
}

/** Recursively collect every `screenshots` string URL found in a session object. */
function collectScreenshotUrls(node, urls = new Set()) {
  if (!node || typeof node !== 'object') return urls;
  for (const [key, value] of Object.entries(node)) {
    if (key === 'screenshots' && typeof value === 'string' && value.startsWith('http')) {
      urls.add(value);
    } else if (typeof value === 'object') {
      collectScreenshotUrls(value, urls);
    }
  }
  return urls;
}

const PNG_MAGIC = '89504e470d0a1a0a';
const ZIP_MAGIC = '504b0304';

/**
 * Download and unpack a single screenshots artifact URL into `outDir`.
 *
 * The BrowserStack docs do not specify the response shape, so we handle all
 * plausible forms: a zip of PNGs, a single PNG, or a JSON manifest of image
 * URLs. PNG filenames (which Maestro sets from the `takeScreenshot` name, e.g.
 * `Button_ios.png`) are preserved.
 */
async function fetchScreenshotArtifact(url, outDir, label) {
  const res = await bsFetch(url, { timeoutMs: timeouts.downloadMs });
  const contentType = res.headers.get('content-type') ?? '';
  const buf = Buffer.from(await res.arrayBuffer());

  const looksJson = contentType.includes('application/json') || buf[0] === 0x7b; // '{'
  if (looksJson) {
    const json = JSON.parse(buf.toString('utf8'));
    const items = Array.isArray(json) ? json : (json.screenshots ?? json.data ?? []);
    for (const item of items) {
      const imageUrl = typeof item === 'string' ? item : (item.url ?? item.image_url);
      if (!imageUrl) continue;
      const name = typeof item === 'object' ? (item.name ?? item.filename) : undefined;
      const imgRes = await bsFetch(imageUrl, { timeoutMs: timeouts.downloadMs });
      const imgBuf = Buffer.from(await imgRes.arrayBuffer());
      const fileName = ensurePng(name ?? basename(new URL(imageUrl).pathname));
      await writeFile(join(outDir, fileName), imgBuf);
    }
    return;
  }

  const head = buf.subarray(0, 8).toString('hex');
  if (head.startsWith(ZIP_MAGIC)) {
    const zipPath = join(outDir, `__bs-${label}.zip`);
    await writeFile(zipPath, buf);
    // execFile (no shell): unzip interprets the `*.png` member filter itself.
    // -o overwrite, -j junk paths (flatten) so PNGs land directly in outDir.
    execFileSync('unzip', ['-o', '-j', zipPath, '*.png', '-d', outDir], { stdio: 'inherit' });
    await rm(zipPath, { force: true });
    return;
  }

  if (head.startsWith(PNG_MAGIC)) {
    await writeFile(join(outDir, ensurePng(label)), buf);
    return;
  }

  console.warn(`  ⚠ Unrecognized screenshots artifact from ${url} (content-type: ${contentType})`);
}

function ensurePng(name) {
  return name.toLowerCase().endsWith('.png') ? name : `${name}.png`;
}

/** Run `worker` over `items` with at most `limit` in flight at once. */
async function mapWithConcurrency(items, limit, worker) {
  const queue = [...items];
  const runners = Array.from({ length: Math.min(limit, queue.length) }, async () => {
    let item;
    while ((item = queue.shift()) !== undefined) {
      await worker(item);
    }
  });
  await Promise.all(runners);
}

/**
 * Download all screenshots produced by a build into `outDir`.
 *
 * Artifacts are fetched concurrently: this runs after the build has already
 * finished, so it is pure added latency on the critical path, and a suite this
 * size produces dozens of independent downloads.
 *
 * @param {object} build the terminal build object from pollBuild/getBuild
 * @returns {Promise<number>} number of screenshot artifacts downloaded
 */
export async function downloadScreenshots(build, outDir) {
  await mkdir(outDir, { recursive: true });

  const sessions = (build.devices ?? []).flatMap((device) =>
    (device.sessions ?? []).map((session) => ({ device, session })),
  );

  const artifacts = [];
  await mapWithConcurrency(sessions, downloadConcurrency, async ({ device, session }) => {
    const details = await getSessionDetails(build.id, session.id);
    const deviceLabel = (device.device ?? 'device').replace(/\s+/g, '_');
    let idx = 0;
    for (const url of collectScreenshotUrls(details)) {
      artifacts.push({ url, label: `${deviceLabel}-${session.id}-${idx++}` });
    }
  });

  let artifactCount = 0;
  await mapWithConcurrency(artifacts, downloadConcurrency, async ({ url, label }) => {
    await fetchScreenshotArtifact(url, outDir, label);
    artifactCount += 1;
  });

  return artifactCount;
}
