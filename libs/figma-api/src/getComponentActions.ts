import type {
  GetLibraryAnalyticsComponentActionsQueryParams,
  GetLibraryAnalyticsComponentActionsResponse,
} from '@figma/rest-api-spec';

import { createClient } from './createClient';

/**
 * Fetch component actions from Figma Library Analytics API
 *
 * Provides historical time series data regarding how a design system library is used.
 * The data is returned in descending order, from most recent to least recent.
 *
 * @param libraryFileKey - File key of the library to fetch analytics data for
 * @param params - Query parameters including group_by (required), cursor, start_date, end_date
 * @returns Promise resolving to component actions response
 *
 * @see https://developers.figma.com/docs/rest-api/library-analytics-endpoints/#get-component-actions
 */
export async function getComponentActions(
  libraryFileKey: string,
  params: GetLibraryAnalyticsComponentActionsQueryParams,
) {
  const client = createClient<
    GetLibraryAnalyticsComponentActionsQueryParams,
    GetLibraryAnalyticsComponentActionsResponse
  >();
  return client(`analytics/libraries/${libraryFileKey}/component/actions`, params);
}
