import type {
  GetLibraryAnalyticsStyleActionsQueryParams,
  GetLibraryAnalyticsStyleActionsResponse,
} from '@figma/rest-api-spec';

import { createClient } from './createClient';

/**
 * Fetch style actions from Figma Library Analytics API
 *
 * Provides historical time series data regarding how design system styles were used.
 * The data is returned in descending order, from most recent to least recent.
 *
 * @param libraryFileKey - File key of the library to fetch analytics data for
 * @param params - Query parameters including group_by (required), cursor, start_date, end_date
 * @returns Promise resolving to style actions response
 *
 * @see https://developers.figma.com/docs/rest-api/library-analytics-endpoints/#get-styles-actions
 */
export async function getStyleActions(
  libraryFileKey: string,
  params: GetLibraryAnalyticsStyleActionsQueryParams,
) {
  const client = createClient<
    GetLibraryAnalyticsStyleActionsQueryParams,
    GetLibraryAnalyticsStyleActionsResponse
  >();
  return client(`analytics/libraries/${libraryFileKey}/style/actions`, params);
}
