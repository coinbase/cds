import type {
  GetLibraryAnalyticsVariableActionsQueryParams,
  GetLibraryAnalyticsVariableActionsResponse,
} from '@figma/rest-api-spec';

import { createClient } from './createClient';

/**
 * Fetch variable actions from Figma Library Analytics API
 *
 * Provides historical time series data regarding how variables within a design system were used.
 * The data is returned in descending order, from most recent to least recent.
 *
 * @param libraryFileKey - File key of the library to fetch analytics data for
 * @param params - Query parameters including group_by (required), cursor, start_date, end_date
 * @returns Promise resolving to variable actions response
 *
 * @see https://developers.figma.com/docs/rest-api/library-analytics-endpoints/#get-variables-actions
 */
export async function getVariableActions(
  libraryFileKey: string,
  params: GetLibraryAnalyticsVariableActionsQueryParams,
) {
  const client = createClient<
    GetLibraryAnalyticsVariableActionsQueryParams,
    GetLibraryAnalyticsVariableActionsResponse
  >();
  return client(`analytics/libraries/${libraryFileKey}/variable/actions`, params);
}
