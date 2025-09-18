#!/usr/bin/env node

import { select } from '@inquirer/prompts';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import util from 'node:util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const agentOptions = [
  {
    name: 'Claude',
    value: 'claude',
    directory: '.claude',
  },
  {
    name: 'Cursor',
    value: 'cursor',
    directory: '.cursor',
  },
];

const { values: args } = util.parseArgs({
  strict: true,
  options: {
    agent: {
      type: 'string',
      multiple: true,
      default: [],
    },
    noTelemetry: {
      type: 'boolean',
      default: false,
    },
    help: {
      type: 'boolean',
      default: false,
    },
  },
});

if (args.help) {
  console.log('Usage: cds-mcp-setup [--agent <agentName>]');
  console.log('Options:');
  console.log(
    '  --agent <agentName> - The agent to install the MCP server for, can be a comma-separated list',
    '  --no-telemetry - Disable telemetry',
  );
  console.log('  --help - Show this help message');
  process.exit(0);
}

const selectedAgents = args.agent;

if (selectedAgents.length === 0) {
  const agentValue = await select({
    message: 'Which agent would you like to install the MCP server for?',
    choices: agentOptions,
  });
  selectedAgents.push(agentValue);
}

const findRepoRoot = (startPath: string) => {
  try {
    const gitRoot = execSync('git rev-parse --show-toplevel', {
      cwd: startPath,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return gitRoot;
  } catch {
    throw new Error('Could not find repo root');
  }
};

const installRules = (agentRoot: string) => {
  try {
    const sourceFile = path.join(__dirname, 'cds.mdc');
    const outputDirectory = path.join(agentRoot, 'rules');
    const outputFile = path.join(outputDirectory, 'cds.mdc');

    if (!fs.existsSync(outputDirectory)) fs.mkdirSync(outputDirectory, { recursive: true });

    fs.cpSync(sourceFile, outputFile);
    console.log(`✅ Copied CDS rules to ${outputFile}`);
  } catch (error: unknown) {
    console.error(
      '❌ Failed to copy CDS rules:',
      error instanceof Error ? error.message : String(error),
    );
  }
};

const installMcpServer = (repoRoot: string, cursorRoot: string) => {
  const mcpServerConfigPath = path.join(cursorRoot, 'mcp.json');
  let newMcpServerConfig: { mcpServers: Record<string, { command: string; args: string[] }> } = {
    mcpServers: {},
  };

  // When executing with npx, this is the root path
  let workspaceRoot = process.env.npm_config_local_prefix;

  if (!workspaceRoot) {
    workspaceRoot = repoRoot;
    console.warn('WARNING: Using repo root as workspace root because the command was run from npx');
  }

  const relativeWorkspaceRoot = path.relative(repoRoot, workspaceRoot);
  const prefix = relativeWorkspaceRoot === '' ? '.' : `./${relativeWorkspaceRoot}`;

  // --prefix is needed because Cursor runs the server from "/" instead of the workspace root.
  const mcpServerArgs = ['--prefix', prefix, '-y', '@cbhq/cds-mcp-server'];

  if (args.noTelemetry) mcpServerArgs.unshift('DISABLE_CDS_MCP_TELEMETRY=1');

  const cdsMcpServerConfig = {
    cds: {
      command: 'npx',
      args: mcpServerArgs,
    },
  };

  try {
    const currentMcpServerConfig = JSON.parse(fs.readFileSync(mcpServerConfigPath, 'utf8'));
    newMcpServerConfig = {
      ...currentMcpServerConfig,
      mcpServers: {
        ...currentMcpServerConfig.mcpServers,
        ...cdsMcpServerConfig,
      },
    };
  } catch {
    newMcpServerConfig = { mcpServers: cdsMcpServerConfig };
  }

  fs.writeFileSync(mcpServerConfigPath, JSON.stringify(newMcpServerConfig, null, 2));
  console.log(`✅ Updated MCP server config in ${mcpServerConfigPath}`);
};

for (const agentValue of selectedAgents) {
  const agent = agentOptions.find((agent) => agent.value === agentValue);
  if (!agent) {
    console.error(`❌ Invalid agent selected: ${agentValue}`);
    process.exit(1);
  }

  console.log(`✅ Installing MCP server for ${agent.name}`);
  console.log('We collect anonymous usage data to improve the CDS MCP server.');
  console.log('You can opt out by running setup with the --no-telemetry flag.');

  const repoRoot = findRepoRoot(process.cwd());
  const agentRoot = path.join(repoRoot, agent.directory);

  installRules(agentRoot);
  installMcpServer(repoRoot, agentRoot);
}
