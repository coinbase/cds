import type {
  GetLibraryAnalyticsStyleUsagesQueryParams,
  GetLibraryAnalyticsStyleUsagesResponse,
} from '@figma/rest-api-spec';

import { createClient } from './createClient';

/**
 * Fetch style usages from Figma Library Analytics API
 *
 * Provides data on how styles are used across different files and teams.
 * This data can be broken down by style or file.
 *
 * @param libraryFileKey - File key of the library to fetch analytics data for
 * @param params - Query parameters including group_by (required) and cursor
 * @returns Promise resolving to style usages response
 *
 * @see https://developers.figma.com/docs/rest-api/library-analytics-endpoints/#get-styles-usages
 */
export async function getStyleUsages(
  libraryFileKey: string,
  params: GetLibraryAnalyticsStyleUsagesQueryParams,
) {
  const client = createClient<
    GetLibraryAnalyticsStyleUsagesQueryParams,
    GetLibraryAnalyticsStyleUsagesResponse
  >();
  return client(`analytics/libraries/${libraryFileKey}/style/usages`, params);
}
