import { enabledRoutes, overlayRoutes } from '../config/enabled-routes.mjs';

/**
 * Returns the explicit whitelist of routes to run visreg against.
 * Routes must be opted in via enabled-routes.mjs — new routes are not included automatically.
 */
export function getVisregRoutes() {
  return [...enabledRoutes];
}

export function isOverlayRoute(route) {
  return overlayRoutes.has(route);
}

/** Exact visible text of the control that dismisses this overlay route. */
export function getOverlayDismissLabel(route) {
  return overlayRoutes.get(route);
}

function envInt(name, fallback) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`${name} must be a positive integer, got: ${raw}`);
  }
  return parsed;
}

const minute = 60 * 1000;

/**
 * Timing budgets for the BrowserStack run, overridable from CI without a code
 * change so we can tune against real run data.
 *
 * Queue and execution are budgeted separately because they fail for different
 * reasons: a long queue means the BrowserStack account is saturated, while a
 * long execution means the suite itself got slower. Charging both against one
 * deadline (as a single 30m budget did) makes the two indistinguishable.
 */
export const timeouts = {
  /** How long the build may sit in a pre-run state before we give up. */
  queueMs: envInt('VISREG_QUEUE_TIMEOUT_MS', 15 * minute),
  /** How long the build may spend actually running on the device. */
  runMs: envInt('VISREG_RUN_TIMEOUT_MS', 40 * minute),
  /** Delay between build-status polls. */
  pollIntervalMs: envInt('VISREG_POLL_INTERVAL_MS', 15_000),
  /** Per-request cap for BrowserStack REST calls. */
  requestMs: envInt('VISREG_REQUEST_TIMEOUT_MS', 60_000),
  /** Per-request cap for artifact downloads, which are far larger. */
  downloadMs: envInt('VISREG_DOWNLOAD_TIMEOUT_MS', 5 * minute),
  /** Per-request cap for app/test-suite uploads (the APK is ~60MB). */
  uploadMs: envInt('VISREG_UPLOAD_TIMEOUT_MS', 10 * minute),
};

/** Max concurrent screenshot artifact downloads. */
export const downloadConcurrency = envInt('VISREG_DOWNLOAD_CONCURRENCY', 8);
