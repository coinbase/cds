import { getAffectedRoutes } from './getAffectedRoutes.mjs';

const { commonChanged, affectedRouteKeys } = await getAffectedRoutes();

// If we're not on the master branch and nothing relevant has changed, we don't need to run detox
if (!commonChanged && !affectedRouteKeys.length) process.exit(1);

process.exit(0);
