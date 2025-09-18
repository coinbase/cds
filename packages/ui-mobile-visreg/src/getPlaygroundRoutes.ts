/// <reference types="detox" />

// https://buildkite.com/docs/tutorials/parallel-builds
// BUILDKITE_PARALLEL_JOB starts at zero based index and VISREG_JOB_NUMBER expects 1 based index
const TOTAL_JOBS = Number(process.env.BUILDKITE_PARALLEL_JOB_COUNT ?? 1);
const JOB_INDEX = Number(process.env.BUILDKITE_PARALLEL_JOB ?? 0);

/**
 * Gets non-blacklisted route names from the Mobile Playground
 */
export function getPlaygroundRoutes({
  routes,
  disabledRoutes = [],
  iosDisabledRoutes = [],
  androidDisabledRoutes = [],
}: {
  routes: {
    key: string;
    getComponent: () => unknown;
  }[];
  disabledRoutes: string[];
  iosDisabledRoutes: string[];
  androidDisabledRoutes: string[];
}) {
  const routeNames = routes
    .filter(({ key }) => !disabledRoutes.includes(key)) /** Remove issue routes */
    .filter(
      ({ key }) =>
        !(device.getPlatform() === 'ios' ? iosDisabledRoutes : androidDisabledRoutes).includes(key),
    ) /** Remove device issue routes */
    .map((route) => route.key);

  const jobSize = Math.ceil(routeNames.length / TOTAL_JOBS);
  const startIndex = JOB_INDEX * jobSize;
  const endIndex = startIndex + jobSize;

  return routeNames.slice(startIndex, endIndex);
}
