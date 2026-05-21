import type {
  GetLibraryAnalyticsVariableUsagesQueryParams,
  GetLibraryAnalyticsVariableUsagesResponse,
} from '@figma/rest-api-spec';

import { createClient } from './createClient';

/**
 * Fetch variable usages from Figma Library Analytics API
 *
 * Provides data on how variables are used across different files and teams.
 * This data can be broken down by variable or file.
 *
 * @param libraryFileKey - File key of the library to fetch analytics data for
 * @param params - Query parameters including group_by (required) and cursor
 * @returns Promise resolving to variable usages response
 *
 * @see https://developers.figma.com/docs/rest-api/library-analytics-endpoints/#get-variables-usages
 */
export async function getVariableUsages(
  libraryFileKey: string,
  params: GetLibraryAnalyticsVariableUsagesQueryParams,
) {
  const client = createClient<
    GetLibraryAnalyticsVariableUsagesQueryParams,
    GetLibraryAnalyticsVariableUsagesResponse
  >();
  return client(`analytics/libraries/${libraryFileKey}/variable/usages`, params);
}
