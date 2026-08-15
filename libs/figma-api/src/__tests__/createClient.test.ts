import { EventEmitter } from 'node:events';
import https from 'node:https';

import { createClient } from '../createClient';

// Mock https module
jest.mock('node:https');

describe('createClient', () => {
  const mockHttps = https as jest.Mocked<typeof https>;
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    jest.clearAllMocks();
    originalEnv = { ...process.env };
    process.env.FIGMA_ACCESS_TOKEN = 'test-token';
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  const mockHttpResponse = (statusCode: number, data: any) => {
    const response = new EventEmitter() as any;
    response.statusCode = statusCode;
    response.setEncoding = jest.fn();

    const request = new EventEmitter() as any;
    request.end = jest.fn();

    mockHttps.request.mockImplementation((options: any, callback: any) => {
      if (callback && typeof callback === 'function') {
        // Simulate async response
        process.nextTick(() => {
          callback(response);
          process.nextTick(() => {
            response.emit('data', JSON.stringify(data));
            response.emit('end');
          });
        });
      }
      return request;
    });

    return { request, response };
  };

  describe('successful requests', () => {
    it('should make a successful GET request', async () => {
      const responseData = { name: 'Test File', version: '1' };
      mockHttpResponse(200, responseData);

      const client = createClient<{ depth?: number }, typeof responseData>();
      const result = await client('files/test-key', { depth: 1 });

      expect(result).toEqual(responseData);
      expect(mockHttps.request).toHaveBeenCalledWith(
        expect.objectContaining({
          hostname: 'api.figma.com',
          path: '/v1/files/test-key?depth=1',
          method: 'GET',
          headers: {
            'X-Figma-Token': 'test-token',
          },
        }),
        expect.any(Function),
      );
    });

    it('should handle query parameters correctly', async () => {
      const responseData = { data: 'test' };
      mockHttpResponse(200, responseData);

      const client = createClient<{ ids: string; geometry: string }, typeof responseData>();
      await client('files/test-key/nodes', {
        ids: '1:1,1:2',
        geometry: 'paths',
      });

      expect(mockHttps.request).toHaveBeenCalledWith(
        expect.objectContaining({
          path: '/v1/files/test-key/nodes?ids=1%3A1%2C1%3A2&geometry=paths',
        }),
        expect.any(Function),
      );
    });

    it('should skip empty query parameters', async () => {
      const responseData = { data: 'test' };
      mockHttpResponse(200, responseData);

      const client = createClient<{ param1?: string; param2?: string }, typeof responseData>();
      await client('test', { param1: 'value1' });

      expect(mockHttps.request).toHaveBeenCalledWith(
        expect.objectContaining({
          path: '/v1/test?param1=value1',
        }),
        expect.any(Function),
      );
    });

    it('should skip undefined query parameters', async () => {
      const responseData = { data: 'test' };
      mockHttpResponse(200, responseData);

      const client = createClient<{ cursor?: string; group_by: string }, typeof responseData>();
      await client('analytics/libraries/test-key/component/usages', {
        group_by: 'file',
        cursor: undefined,
      });

      expect(mockHttps.request).toHaveBeenCalledWith(
        expect.objectContaining({
          path: '/v1/analytics/libraries/test-key/component/usages?group_by=file',
        }),
        expect.any(Function),
      );
    });

    it('should skip null query parameters', async () => {
      const responseData = { data: 'test' };
      mockHttpResponse(200, responseData);

      const client = createClient<{ param1?: string; param2?: string }, typeof responseData>();
      // @ts-expect-error - null is not a valid value but testing it
      await client('test', { param1: 'value1', param2: null });

      expect(mockHttps.request).toHaveBeenCalledWith(
        expect.objectContaining({
          path: '/v1/test?param1=value1',
        }),
        expect.any(Function),
      );
    });
  });

  describe('error handling', () => {
    it('should throw error when FIGMA_ACCESS_TOKEN is not set', async () => {
      delete process.env.FIGMA_ACCESS_TOKEN;

      const client = createClient<never, any>();

      await expect(client('files/test-key')).rejects.toThrow(
        'FIGMA_ACCESS_TOKEN environment variable is not set',
      );
    });

    it('should handle 400 bad request errors with message field', async () => {
      mockHttpResponse(400, { error: true, status: 400, message: 'Invalid cursor.', i18n: null });

      const client = createClient<never, any>();

      await expect(client('analytics/libraries/test-key/component/usages')).rejects.toThrow(
        'Bad request: Invalid cursor.',
      );
    });

    it('should handle 401 authentication errors', async () => {
      mockHttpResponse(401, { err: 'Invalid token' });

      const client = createClient<never, any>();

      await expect(client('files/test-key')).rejects.toThrow('Authentication error: Invalid token');
    });

    it('should handle 403 permission errors with err field', async () => {
      mockHttpResponse(403, { err: 'Access denied' });

      const client = createClient<never, any>();

      await expect(client('files/test-key')).rejects.toThrow('Permission denied: Access denied');
    });

    it('should handle 403 permission errors with message field', async () => {
      mockHttpResponse(403, { message: 'Insufficient permissions' });

      const client = createClient<never, any>();

      await expect(client('files/test-key')).rejects.toThrow(
        'Permission denied: Insufficient permissions',
      );
    });

    it('should handle 404 not found errors', async () => {
      mockHttpResponse(404, { err: 'File not found' });

      const client = createClient<never, any>();

      await expect(client('files/missing-key')).rejects.toThrow('Not found: File not found');
    });

    it('should handle non-JSON error responses', async () => {
      const response = new EventEmitter() as any;
      response.statusCode = 500;
      response.setEncoding = jest.fn();

      const request = new EventEmitter() as any;
      request.end = jest.fn();

      mockHttps.request.mockImplementation((options: any, callback: any) => {
        if (callback && typeof callback === 'function') {
          process.nextTick(() => {
            callback(response);
            process.nextTick(() => {
              response.emit('data', 'Internal Server Error');
              response.emit('end');
            });
          });
        }
        return request;
      });

      const client = createClient<never, any>();

      await expect(client('files/test-key')).rejects.toThrow('HTTP 500 error: HTTP 500 error');
    });

    it('should handle JSON parse errors in successful responses', async () => {
      const response = new EventEmitter() as any;
      response.statusCode = 200;
      response.setEncoding = jest.fn();

      const request = new EventEmitter() as any;
      request.end = jest.fn();

      mockHttps.request.mockImplementation((options: any, callback: any) => {
        if (callback && typeof callback === 'function') {
          process.nextTick(() => {
            callback(response);
            process.nextTick(() => {
              response.emit('data', 'Invalid JSON {');
              response.emit('end');
            });
          });
        }
        return request;
      });

      const client = createClient<never, any>();

      await expect(client('files/test-key')).rejects.toThrow('Failed to parse response');
    });
  });

  describe('retry logic', () => {
    it('should retry on 429 rate limit errors', async () => {
      let callCount = 0;

      mockHttps.request.mockImplementation((options: any, callback: any) => {
        const response = new EventEmitter() as any;
        response.setEncoding = jest.fn();

        const request = new EventEmitter() as any;
        request.end = jest.fn();

        if (callback && typeof callback === 'function') {
          process.nextTick(() => {
            callCount++;
            response.statusCode = callCount < 3 ? 429 : 200;
            callback(response);
            process.nextTick(() => {
              const data =
                callCount < 3 ? { err: 'Rate limited' } : { name: 'Success after retry' };
              response.emit('data', JSON.stringify(data));
              response.emit('end');
            });
          });
        }
        return request;
      });

      const client = createClient<never, any>();
      const result = await client('files/test-key');

      expect(result).toEqual({ name: 'Success after retry' });
      expect(callCount).toBe(3);
    });

    it('should fail after max retries on 429 errors', async () => {
      mockHttpResponse(429, { err: 'Rate limited' });

      const client = createClient<never, any>();

      await expect(client('files/test-key')).rejects.toThrow('Rate limited: Rate limited');
    });

    it('should retry on network errors and eventually succeed', async () => {
      let errorCount = 0;

      mockHttps.request.mockImplementation((options: any, callback: any) => {
        const request = new EventEmitter() as any;
        request.end = jest.fn();

        if (errorCount < 2) {
          // Emit error for first two attempts
          errorCount++;
          process.nextTick(() => {
            request.emit('error', new Error('Network error'));
          });
        } else {
          // Succeed on subsequent attempts
          const response = new EventEmitter() as any;
          response.statusCode = 200;
          response.setEncoding = jest.fn();

          if (callback && typeof callback === 'function') {
            process.nextTick(() => {
              callback(response);
              process.nextTick(() => {
                response.emit('data', JSON.stringify({ name: 'Success after network retry' }));
                response.emit('end');
              });
            });
          }
        }
        return request;
      });

      const client = createClient<never, any>();
      const result = await client('files/test-key');

      expect(result).toEqual({ name: 'Success after network retry' });
      expect(errorCount).toBe(2); // Should have retried twice before succeeding
    });

    it('should fail after max retries on network errors', async () => {
      const request = new EventEmitter() as any;
      request.end = jest.fn();

      mockHttps.request.mockImplementation(() => {
        process.nextTick(() => {
          request.emit('error', new Error('Connection refused'));
        });
        return request;
      });

      const client = createClient<never, any>();

      await expect(client('files/test-key')).rejects.toThrow('Network error: Connection refused');
    });
  });

  describe('rate limiting', () => {
    it('should apply rate limiting delay before requests', async () => {
      mockHttpResponse(200, { data: 'test' });

      const client = createClient<never, any>();

      const startTime = Date.now();
      await client('files/test-key');
      const endTime = Date.now();

      // Should have taken at least 100ms due to rate limiting
      // (being lenient with timing in tests)
      expect(endTime - startTime).toBeGreaterThanOrEqual(50);
      expect(mockHttps.request).toHaveBeenCalled();
    });
  });
});
