import type {
  GetLibraryAnalyticsComponentUsagesQueryParams,
  GetLibraryAnalyticsComponentUsagesResponse,
} from '@figma/rest-api-spec';

import { createClient } from './createClient';

/**
 * Fetch component usages from Figma Library Analytics API
 *
 * Provides data on how components are used across different files and teams.
 * This data can be broken down by component or file.
 *
 * @param libraryFileKey - File key of the library to fetch analytics data for
 * @param params - Query parameters including group_by (required) and cursor
 * @returns Promise resolving to component usages response
 *
 * @see https://developers.figma.com/docs/rest-api/library-analytics-endpoints/#get-component-usages
 */
export async function getComponentUsages(
  libraryFileKey: string,
  params: GetLibraryAnalyticsComponentUsagesQueryParams,
) {
  const client = createClient<
    GetLibraryAnalyticsComponentUsagesQueryParams,
    GetLibraryAnalyticsComponentUsagesResponse
  >();
  return client(`analytics/libraries/${libraryFileKey}/component/usages`, params);
}
