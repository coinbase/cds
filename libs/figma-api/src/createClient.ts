import https from 'node:https';
import { URL } from 'node:url';

/**
 * Base URL for Figma API
 */
const FIGMA_API_BASE_URL = 'https://api.figma.com/v1';

/**
 * Rate limiting configuration
 * Figma API has rate limits, so we implement delays between requests
 */
const RATE_LIMIT_DELAY_MS = 100; // 100ms delay between requests

/**
 * Retry configuration for transient failures
 */
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

type Primitive = string | boolean | number;

/**
 * Sleep utility for rate limiting and retries
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Check if verbose logging is enabled
 */
function isVerboseLoggingEnabled(): boolean {
  return process.env.VERBOSE_LOGS === '1';
}

/**
 * Log a message if verbose logging is enabled
 */
function verboseLog(message: string): void {
  if (isVerboseLoggingEnabled()) {
    console.log(message);
  }
}

/**
 * Get Figma access token from environment
 */
function getFigmaAccessToken(): string {
  const token = process.env.FIGMA_ACCESS_TOKEN;
  if (!token) {
    throw new Error('FIGMA_ACCESS_TOKEN environment variable is not set');
  }
  return token;
}

/**
 * Parse Figma API error response and create appropriate error type
 */
function parseFigmaError(statusCode: number, responseBody: string, url: string): Error {
  let errorData: { err?: string; message?: string; status?: number };
  try {
    errorData = JSON.parse(responseBody);
  } catch {
    errorData = {};
  }

  // Figma API uses inconsistent error response formats:
  // - Some endpoints return { err: "..." }
  // - Others return { message: "..." }
  const message = errorData.err || errorData.message || `HTTP ${statusCode} error`;

  // Always include the URL in error messages for easier debugging
  switch (statusCode) {
    case 400:
      return new Error(`Bad request: ${message} (URL: ${url})`);
    case 401:
      return new Error(`Authentication error: ${message} (URL: ${url})`);
    case 403:
      return new Error(`Permission denied: ${message} (URL: ${url})`);
    case 404:
      return new Error(`Not found: ${message} (URL: ${url})`);
    case 429:
      return new Error(`Rate limited: ${message} (URL: ${url})`);
    default:
      return new Error(`HTTP ${statusCode} error: ${message} (URL: ${url})`);
  }
}

/**
 * Make HTTP request to Figma API with retries
 */
async function makeRequest<T>(
  path: string,
  queryParams: Record<string, string> = {},
  retryCount = 0,
): Promise<T> {
  const figmaUrl = new URL(`${FIGMA_API_BASE_URL}/${path}`);

  // Add query parameters
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      figmaUrl.searchParams.set(key, value);
    }
  });

  return new Promise<T>((resolve, reject) => {
    let responseBody = '';

    const req = https.request(
      {
        hostname: figmaUrl.hostname,
        path: `${figmaUrl.pathname}?${figmaUrl.searchParams.toString()}`,
        method: 'GET',
        headers: {
          'X-Figma-Token': getFigmaAccessToken(),
        },
      },
      (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk: string) => {
          responseBody += chunk;
        });
        res.on('end', async () => {
          const statusCode = res.statusCode || 0;

          // Handle rate limiting with retry
          if (statusCode === 429 && retryCount < MAX_RETRIES) {
            verboseLog(
              `[figma-api] Rate limited (429). Retry ${
                retryCount + 1
              }/${MAX_RETRIES} after ${RETRY_DELAY_MS}ms delay. URL: ${figmaUrl.toString()}`,
            );
            await sleep(RETRY_DELAY_MS);
            try {
              const result = await makeRequest<T>(path, queryParams, retryCount + 1);
              resolve(result);
            } catch (error) {
              reject(error);
            }
            return;
          }

          // Log when retries are exhausted for rate limiting
          if (statusCode === 429) {
            verboseLog(
              `[figma-api] Rate limited (429). Max retries (${MAX_RETRIES}) exhausted. URL: ${figmaUrl.toString()}`,
            );
          }

          // Handle error status codes
          if (statusCode < 200 || statusCode >= 300) {
            reject(parseFigmaError(statusCode, responseBody, figmaUrl.toString()));
            return;
          }

          // Parse and validate response
          try {
            const data = JSON.parse(responseBody) as T;
            resolve(data);
          } catch {
            reject(new Error(`Failed to parse response from ${figmaUrl.toString()}`));
          }
        });
      },
    );

    req.on('error', (error) => {
      // Retry on network errors
      if (retryCount < MAX_RETRIES) {
        verboseLog(
          `[figma-api] Network error: ${error.message}. Retry ${
            retryCount + 1
          }/${MAX_RETRIES} after ${RETRY_DELAY_MS}ms delay. URL: ${figmaUrl.toString()}`,
        );
        sleep(RETRY_DELAY_MS)
          .then(() => makeRequest<T>(path, queryParams, retryCount + 1))
          .then(resolve)
          .catch(reject);
      } else {
        verboseLog(
          `[figma-api] Network error: ${
            error.message
          }. Max retries (${MAX_RETRIES}) exhausted. URL: ${figmaUrl.toString()}`,
        );
        reject(new Error(`Network error: ${error.message} (URL: ${figmaUrl.toString()})`));
      }
    });

    req.end();
  });
}

export function createClient<ApiParams extends Record<string, Primitive>, ClientResponse>() {
  return async function api(path: string, params?: ApiParams): Promise<ClientResponse> {
    // Apply rate limiting delay before making request
    await sleep(RATE_LIMIT_DELAY_MS);

    const queryParams: Record<string, string> = {};
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        // Filter out undefined and null values before converting to string
        if (value !== undefined && value !== null) {
          queryParams[key] = typeof value === 'string' ? value : `${value}`;
        }
      });
    }

    return makeRequest<ClientResponse>(path, queryParams);
  };
}
