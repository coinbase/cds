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

const API_BASE = 'https://api-cloud.browserstack.com/app-automate/maestro/v2';

// Build statuses that mean "still working" — anything else is terminal.
const RUNNING_STATUSES = new Set([
  'running',
  'queued',
  'in_queue',
  'created',
  'pending',
  'scheduled',
]);

const POLL_INTERVAL_MS = 15_000;
const POLL_TIMEOUT_MS = 20 * 60 * 1000;

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
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Request failed ${res.status} ${res.statusText} (${url})\n${body}`);
  }
  return res;
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

  const res = await bsFetch(`${API_BASE}/app`, { method: 'POST', body: form });
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

  const res = await bsFetch(`${API_BASE}/test-suite`, { method: 'POST', body: form });
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
 * Poll a build until it reaches a terminal status or the timeout elapses.
 * @returns {Promise<object>} the final build object
 */
export async function pollBuild(
  buildId,
  { intervalMs = POLL_INTERVAL_MS, timeoutMs = POLL_TIMEOUT_MS } = {},
) {
  const deadline = Date.now() + timeoutMs;
  let build = await getBuild(buildId);
  console.log(`  build ${buildId} status: ${build.status}`);

  while (RUNNING_STATUSES.has(build.status)) {
    if (Date.now() > deadline) {
      throw new Error(
        `Timed out after ${Math.round(timeoutMs / 1000)}s waiting for build ${buildId}`,
      );
    }
    await new Promise((r) => setTimeout(r, intervalMs));
    build = await getBuild(buildId);
    console.log(`  build ${buildId} status: ${build.status}`);
  }

  return build;
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
  const res = await bsFetch(url);
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
      const imgRes = await bsFetch(imageUrl);
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

/**
 * Download all screenshots produced by a build into `outDir`.
 * @param {object} build the terminal build object from pollBuild/getBuild
 * @returns {Promise<number>} number of screenshot artifacts downloaded
 */
export async function downloadScreenshots(build, outDir) {
  await mkdir(outDir, { recursive: true });
  let artifactCount = 0;

  for (const device of build.devices ?? []) {
    for (const session of device.sessions ?? []) {
      const details = await getSessionDetails(build.id, session.id);
      const urls = collectScreenshotUrls(details);
      let idx = 0;
      for (const url of urls) {
        const label = `${(device.device ?? 'device').replace(/\s+/g, '_')}-${session.id}-${idx++}`;
        await fetchScreenshotArtifact(url, outDir, label);
        artifactCount += 1;
      }
    }
  }

  return artifactCount;
}
