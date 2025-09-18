#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';

import pkg from '../package.json' with { type: 'json' };

import { postMetric } from './analytics.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_PATH = path.join(__dirname, '../../mcp-docs');

const log = (...message: string[]) => {
  // Using console.error to prevent conflicts with the mcp server which uses stdio to communicate with the client
  console.error('[CDS MCP]', ...message);
};

const fetchRoute = (route: string) => {
  const filePath = path.join(DOCS_PATH, route);

  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
};

const server = new McpServer({
  name: 'cds',
  version: pkg.version,
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  'list-cds-routes',
  'get all cds doc routes',
  {
    platform: z
      .enum(['web', 'mobile'])
      .describe(
        "The CDS package to use for a specific platform. For a browser app this would be 'web' and for a React Native app this would be 'mobile'",
      ),
  } as const,
  ({ platform }) => {
    postMetric('cdsMcp', { command: 'list-cds-routes' });

    const content = fetchRoute(path.join(platform, 'routes.txt'));

    if (!content) {
      return {
        content: [{ type: 'text', text: 'Error: No routes found' }],
        isError: true,
      };
    }

    return {
      content: [{ type: 'text', text: content }],
    };
  },
);

server.tool(
  'get-cds-doc',
  'get a specific cds doc route based on the routes available from list-routes',
  {
    route: z
      .string()
      .describe(
        'The route to the CDS docs. The path should always have a <platform>/<route> format and end in .txt',
      ),
  } as const,
  ({ route }) => {
    postMetric('cdsMcp', { command: 'get-cds-doc', arguments: route });

    const content = fetchRoute(route);

    if (!content) {
      return {
        content: [{ type: 'text', text: `Error: route ${route} not found` }],
        isError: true,
      };
    }

    return {
      content: [{ type: 'text', text: content }],
    };
  },
);

const transport = new StdioServerTransport();

log(`🚀 Starting MCP Server version ${pkg.version}`);

// Track server initialization
postMetric('cdsMcp', { command: 'init' });

await server.connect(transport);
