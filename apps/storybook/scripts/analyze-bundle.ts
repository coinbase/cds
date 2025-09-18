import { diffLines } from 'diff';
import fs from 'node:fs';
import path from 'node:path';

/** Start configuration */

const PACKAGES_RELATIVE_PATH = './../packages';
const NODE_MODULES_RELATIVE_PATH = './../node_modules';

const MASTER_STATS_FILENAME = 'bundle-stats.json';
const COMPARISON_STATS_FILENAME = `apps/storybook/${MASTER_STATS_FILENAME}`;

/**
 * Bundle groups whose `label` value is in this array, or whose `label` value
 * ends with a path seperator followed by a value in this array, will not be
 * included in the logged results for package stats
 */
const PACKAGES_FILTERED_LABELS = ['__mocks__', '__stories__'];

const NODE_MODULES_FILTERED_LABELS = ['@storybook'];

/**
 * The order of the keys in this object conrols the order that the
 * detailed console log messages are printed for each package
 */
const packageDetailedMessagesOrder: { [key: string]: string } = {
  common: '',
  web: '',
  'web-visualization': '',
};

/**
 * The order of the keys in this object conrols the order that the
 * simple console log messages are printed for each package
 */
const packageSimpleMessagesOrder: { [key: string]: string } = {
  common: '',
  web: '',
  'web-visualization': '',
  fonts: '',
  icons: '',
  'illustrations/src/__generated__': '',
  'lottie-files': '',
  utils: '',
  d3: '',
};

/** End configuration */

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;

if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT is undefined');

const masterBundleStatsPath = path.resolve(MONOREPO_ROOT, MASTER_STATS_FILENAME);
const comparisonBundleStatsPath = path.resolve(MONOREPO_ROOT, COMPARISON_STATS_FILENAME);

if (!fs.existsSync(masterBundleStatsPath))
  throw Error(
    `No master bundle stats ${MASTER_STATS_FILENAME} found at path "${masterBundleStatsPath}"`,
  );

if (!fs.existsSync(comparisonBundleStatsPath))
  throw Error(
    `No comparison bundle stats ${MASTER_STATS_FILENAME} found at path "${comparisonBundleStatsPath}"`,
  );

// Delete all stats files on exit to prevent accidental misuse of buildkite cache plugin
const cleanup = () => {
  // if (fs.existsSync(masterBundleStatsPath)) fs.rmSync(masterBundleStatsPath, { recursive: true });
  // if (fs.existsSync(comparisonBundleStatsPath))
  //   fs.rmSync(comparisonBundleStatsPath, { recursive: true });
};

process.on('exit', (message) => {
  console.log(message);
  cleanup();
});

process.on('uncaughtException', (error) => {
  console.log(error);
  cleanup();
  throw error;
});

// Old webpack-bundle-analyzer format (for reference)
type OldBundleStats = {
  id?: string;
  label: string;
  path: string;
  groups: OldBundleStats[];
  isAsset: boolean;
  gzipSize: number;
  parsedSize: number;
  statSize: number;
};

// New rollup-plugin-visualizer format
type TreeNode = {
  name: string;
  uid?: string;
  children?: TreeNode[];
};

type NodePart = {
  /** The uncompressed size of the module in bytes */
  renderedLength: number;
  /** The gzip-compressed size of the module in bytes */
  gzipLength: number;
  /** The brotli-compressed size of the module in bytes */
  brotliLength: number;
  /** Reference to the metadata object containing module path and import information */
  metaUid: string;
};

type RollupStats = {
  version: number;
  tree: TreeNode;
  nodeParts: Record<string, NodePart>;
  nodeMetas: Record<string, any>;
  env: any;
  options: any;
};

// Unified format for processing
type BundleStats = {
  label: string;
  path: string;
  groups: BundleStats[];
  gzipSize: number;
};

// Parse the new rollup-plugin-visualizer format and convert to unified format
const parseRollupStats = (filePath: string): { stats: BundleStats[]; rawStats: RollupStats } => {
  const rawStats = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as RollupStats;

  // Build a map of module paths to their sizes
  const moduleMap = new Map<string, { size: number; metaUid: string }>();

  // Collect all modules with their full paths and sizes
  const collectModules = (
    node: TreeNode,
    nodeParts: Record<string, NodePart>,
    nodeMetas: Record<string, any>,
  ) => {
    if (node.uid && nodeParts[node.uid]) {
      const nodePart = nodeParts[node.uid];
      const size = nodePart.gzipLength;
      const metaUid = nodePart.metaUid;

      if (metaUid && nodeMetas[metaUid]) {
        const modulePath = nodeMetas[metaUid].id;
        moduleMap.set(modulePath, { size, metaUid });
      }
    }

    if (node.children) {
      for (const child of node.children) {
        collectModules(child, nodeParts, nodeMetas);
      }
    }
  };

  // Collect all modules from the tree
  collectModules(rawStats.tree, rawStats.nodeParts, rawStats.nodeMetas);

  // Build hierarchical structure from module paths
  const buildHierarchy = (
    basePath: string,
    modules: Map<string, { size: number; metaUid: string }>,
  ): BundleStats[] => {
    const hierarchy = new Map<string, BundleStats>();

    for (const [fullPath, moduleInfo] of modules) {
      if (!fullPath.includes(basePath)) continue;

      // Extract relative path from the base
      const relativePath = fullPath.substring(fullPath.indexOf(basePath) + basePath.length + 1);
      const parts = relativePath.split('/');

      // Build nested structure
      // eslint-disable-next-line prefer-const
      let currentLevel = hierarchy;
      let currentPath = '';

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        currentPath = currentPath ? `${currentPath}/${part}` : part;

        if (i === parts.length - 1) {
          // This is a file
          if (!hierarchy.has(part)) {
            hierarchy.set(part, {
              label: part,
              path: currentPath,
              groups: [],
              gzipSize: moduleInfo.size,
            });
          }
        } else {
          // This is a directory
          if (!hierarchy.has(part)) {
            hierarchy.set(part, {
              label: part,
              path: currentPath,
              groups: [],
              gzipSize: 0,
            });
          }
        }
      }
    }

    // Convert map to array and calculate directory sizes
    const calculateSizes = (stats: BundleStats): number => {
      if (stats.groups.length === 0) {
        return stats.gzipSize;
      }

      let totalSize = stats.gzipSize;
      for (const child of stats.groups) {
        totalSize += calculateSizes(child);
      }
      stats.gzipSize = totalSize;
      return totalSize;
    };

    const result = Array.from(hierarchy.values());
    result.forEach(calculateSizes);

    return result;
  };

  // Helper function to recursively build BundleStats from TreeNode
  const convertTreeToBundleStats = (
    node: TreeNode,
    nodeParts: Record<string, NodePart>,
  ): BundleStats => {
    // Calculate total size for this node including all children
    let totalSize = 0;

    if (node.uid && nodeParts[node.uid]) {
      const nodePart = nodeParts[node.uid];
      totalSize = nodePart.gzipLength;
    }

    const children = node.children || [];
    const groups: BundleStats[] = [];

    for (const child of children) {
      const childStats = convertTreeToBundleStats(child, nodeParts);
      groups.push(childStats);

      // If this node doesn't have its own size, accumulate from children
      if (!node.uid || !nodeParts[node.uid]) {
        totalSize += childStats.gzipSize;
      }
    }

    return {
      label: node.name,
      path: node.name, // Use name as path for compatibility
      groups,
      gzipSize: totalSize,
    };
  };

  // The root node typically contains the main bundle chunks
  const rootStats = convertTreeToBundleStats(rawStats.tree, rawStats.nodeParts);

  // Return the stats and raw data
  return { stats: rootStats.groups, rawStats };
};

const masterParsed = parseRollupStats(masterBundleStatsPath);
const masterBundleStats = masterParsed.stats;
const masterRawStats = masterParsed.rawStats;

const comparisonParsed = parseRollupStats(comparisonBundleStatsPath);
const comparisonBundleStats = comparisonParsed.stats;
const comparisonRawStats = comparisonParsed.rawStats;

/**
 * "Package stats" represent stats for our code in the local "packages" directory in the repo root.
 * "Node Module stats" represent stats for our dependencies in the node_modules directory.
 *
 * With the new format, we need to find these by looking for nodes that contain
 * the appropriate path segments in their names.
 */

// Helper function to find stats by path pattern
const findStatsByPath = (stats: BundleStats[], pathPattern: string): BundleStats | undefined => {
  // First check at the current level
  for (const stat of stats) {
    if (stat.label.includes(pathPattern)) {
      return stat;
    }
  }

  // Then check recursively in groups
  for (const stat of stats) {
    const found = findStatsByPath(stat.groups, pathPattern);
    if (found) return found;
  }

  return undefined;
};

// For the new format, we need to look for nodes containing "packages" and "node_modules" in their paths
const getPackageAndNodeModuleStats = (
  stats: BundleStats[],
  rawStats?: RollupStats,
): { packages?: BundleStats; nodeModules?: BundleStats } => {
  // If we have rawStats, use the detailed module information
  if (rawStats) {
    const packageModules = new Map<string, Map<string, { size: number; path: string }>>();
    const nodeModules = new Map<string, Map<string, { size: number; path: string }>>();

    // Collect all modules with their full paths
    const collectModulesFromTree = (node: TreeNode) => {
      if (node.uid && rawStats.nodeParts[node.uid]) {
        const nodePart = rawStats.nodeParts[node.uid];
        const size = nodePart.gzipLength;
        const metaUid = nodePart.metaUid;

        if (metaUid && rawStats.nodeMetas[metaUid]) {
          const modulePath = rawStats.nodeMetas[metaUid].id;

          // Check if this is a package module
          const packageMatch = modulePath.match(/\/packages\/([^/]+)\/(.+)/);
          if (packageMatch) {
            const [, packageName, relativePath] = packageMatch;

            // Filter out stories, mocks, and tests from packages
            const shouldExclude = PACKAGES_FILTERED_LABELS.some(
              (label) =>
                relativePath.includes(`/${label}/`) ||
                relativePath.includes(`${label}.`) ||
                relativePath.includes(`.${label}.`),
            );

            if (!shouldExclude) {
              if (!packageModules.has(packageName)) {
                packageModules.set(packageName, new Map());
              }
              packageModules.get(packageName)!.set(relativePath, { size, path: modulePath });
            }
          }

          // Check if this is a node_module
          const nodeModuleMatch = modulePath.match(/\/node_modules\/(@?[^/]+(?:\/[^/]+)?)\/(.*)/);
          if (nodeModuleMatch) {
            const [, moduleName, relativePath] = nodeModuleMatch;

            // Filter out specific node_modules
            const shouldExclude = NODE_MODULES_FILTERED_LABELS.some((label) =>
              moduleName.startsWith(label),
            );

            if (!shouldExclude) {
              if (!nodeModules.has(moduleName)) {
                nodeModules.set(moduleName, new Map());
              }
              nodeModules.get(moduleName)!.set(relativePath || 'index', { size, path: modulePath });
            }
          }
        }
      }

      if (node.children) {
        for (const child of node.children) {
          collectModulesFromTree(child);
        }
      }
    };

    collectModulesFromTree(rawStats.tree);

    // Build hierarchical structure for packages
    const buildPackageHierarchy = (
      packageName: string,
      modules: Map<string, { size: number; path: string }>,
    ): BundleStats => {
      // Build tree structure recursively
      const buildTree = (
        paths: Array<[string[], { size: number; path: string }]>,
        depth: number = 0,
      ): BundleStats[] => {
        const grouped = new Map<string, Array<[string[], { size: number; path: string }]>>();

        for (const [parts, info] of paths) {
          if (parts.length === 0) continue;

          const key = parts[0];
          if (!grouped.has(key)) {
            grouped.set(key, []);
          }
          grouped.get(key)!.push([parts.slice(1), info]);
        }

        const result: BundleStats[] = [];

        for (const [name, group] of grouped) {
          const isFile = group.some(([parts]) => parts.length === 0);

          if (isFile) {
            // This is a file
            const fileInfo = group.find(([parts]) => parts.length === 0)![1];
            result.push({
              label: name,
              path: name,
              groups: [],
              gzipSize: fileInfo.size,
            });
          } else {
            // This is a directory
            const children = buildTree(group, depth + 1);
            const totalSize = children.reduce((sum, child) => sum + child.gzipSize, 0);
            result.push({
              label: name,
              path: name,
              groups: children,
              gzipSize: totalSize,
            });
          }
        }

        return result;
      };

      // Convert modules to path arrays
      const pathArrays: Array<[string[], { size: number; path: string }]> = [];
      for (const [relativePath, info] of modules) {
        pathArrays.push([relativePath.split('/'), info]);
      }

      const children = buildTree(pathArrays);

      return {
        label: packageName,
        path: packageName,
        groups: children,
        gzipSize: children.reduce((sum, child) => sum + child.gzipSize, 0),
      };
    };

    // Build package stats
    const packageGroups: BundleStats[] = [];
    for (const [packageName, modules] of packageModules) {
      packageGroups.push(buildPackageHierarchy(packageName, modules));
    }

    // Build node_modules stats with hierarchical structure like packages
    const buildNodeModuleHierarchy = (
      moduleName: string,
      modules: Map<string, { size: number; path: string }>,
    ): BundleStats => {
      // Build tree structure recursively (same as packages)
      const buildTree = (
        paths: Array<[string[], { size: number; path: string }]>,
        depth: number = 0,
      ): BundleStats[] => {
        const grouped = new Map<string, Array<[string[], { size: number; path: string }]>>();

        for (const [parts, info] of paths) {
          if (parts.length === 0) continue;

          const key = parts[0];
          if (!grouped.has(key)) {
            grouped.set(key, []);
          }
          grouped.get(key)!.push([parts.slice(1), info]);
        }

        const result: BundleStats[] = [];

        for (const [name, group] of grouped) {
          const isFile = group.some(([parts]) => parts.length === 0);

          if (isFile) {
            // This is a file
            const fileInfo = group.find(([parts]) => parts.length === 0)![1];
            result.push({
              label: name,
              path: name,
              groups: [],
              gzipSize: fileInfo.size,
            });
          } else {
            // This is a directory
            const children = buildTree(group, depth + 1);
            const totalSize = children.reduce((sum, child) => sum + child.gzipSize, 0);
            result.push({
              label: name,
              path: name,
              groups: children,
              gzipSize: totalSize,
            });
          }
        }

        return result;
      };

      // Convert modules to path arrays
      const pathArrays: Array<[string[], { size: number; path: string }]> = [];
      for (const [relativePath, info] of modules) {
        pathArrays.push([relativePath.split('/'), info]);
      }

      const children = buildTree(pathArrays);

      return {
        label: moduleName,
        path: moduleName,
        groups: children,
        gzipSize: children.reduce((sum, child) => sum + child.gzipSize, 0),
      };
    };

    // Build node_modules stats with hierarchy
    const nodeModuleGroups: BundleStats[] = [];
    for (const [moduleName, modules] of nodeModules) {
      nodeModuleGroups.push(buildNodeModuleHierarchy(moduleName, modules));
    }

    const packages =
      packageGroups.length > 0
        ? {
            label: 'packages',
            path: PACKAGES_RELATIVE_PATH,
            groups: packageGroups,
            gzipSize: packageGroups.reduce((sum, g) => sum + g.gzipSize, 0),
          }
        : undefined;

    const nodeModulesResult =
      nodeModuleGroups.length > 0
        ? {
            label: 'node_modules',
            path: NODE_MODULES_RELATIVE_PATH,
            groups: nodeModuleGroups,
            gzipSize: nodeModuleGroups.reduce((sum, g) => sum + g.gzipSize, 0),
          }
        : undefined;

    return { packages, nodeModules: nodeModulesResult };
  }

  // Fallback to the original implementation
  // Create synthetic groups for packages and node_modules
  const packageGroups: BundleStats[] = [];
  const nodeModuleGroups: BundleStats[] = [];

  // Recursively collect all nodes that belong to packages or node_modules
  const collectNodes = (nodes: BundleStats[], currentPath: string = '') => {
    for (const node of nodes) {
      const fullPath = currentPath ? `${currentPath}/${node.label}` : node.label;

      // Check if this node represents a package or node_module
      if (fullPath.includes('/packages/') || node.label === 'packages') {
        // Extract package name from path
        const match = fullPath.match(/packages\/([^/]+)/);
        if (match) {
          const packageName = match[1];
          const existingPackage = packageGroups.find((p) => p.label === packageName);

          if (existingPackage) {
            existingPackage.gzipSize += node.gzipSize;
          } else {
            packageGroups.push({
              label: packageName,
              path: packageName,
              groups: [],
              gzipSize: node.gzipSize,
            });
          }
        }
      } else if (fullPath.includes('/node_modules/') || node.label === 'node_modules') {
        // Extract module name from path
        const match = fullPath.match(/node_modules\/(@?[^/]+(?:\/[^/]+)?)/);
        if (match) {
          const moduleName = match[1];
          const existingModule = nodeModuleGroups.find((m) => m.label === moduleName);

          if (existingModule) {
            existingModule.gzipSize += node.gzipSize;
          } else {
            nodeModuleGroups.push({
              label: moduleName,
              path: moduleName,
              groups: [],
              gzipSize: node.gzipSize,
            });
          }
        }
      }

      // Recurse into children
      if (node.groups.length > 0) {
        collectNodes(node.groups, fullPath);
      }
    }
  };

  collectNodes(stats);

  // Create synthetic parent nodes
  const packages =
    packageGroups.length > 0
      ? {
          label: 'packages',
          path: PACKAGES_RELATIVE_PATH,
          groups: packageGroups,
          gzipSize: packageGroups.reduce((sum, g) => sum + g.gzipSize, 0),
        }
      : undefined;

  const nodeModulesResult =
    nodeModuleGroups.length > 0
      ? {
          label: 'node_modules',
          path: NODE_MODULES_RELATIVE_PATH,
          groups: nodeModuleGroups,
          gzipSize: nodeModuleGroups.reduce((sum, g) => sum + g.gzipSize, 0),
        }
      : undefined;

  return { packages, nodeModules: nodeModulesResult };
};

const masterStats = getPackageAndNodeModuleStats(masterBundleStats, masterRawStats);
const masterPackageStats = masterStats.packages;
const masterNodeModuleStats = masterStats.nodeModules;

const comparisonStats = getPackageAndNodeModuleStats(comparisonBundleStats, comparisonRawStats);
const comparisonPackageStats = comparisonStats.packages;
const comparisonNodeModuleStats = comparisonStats.nodeModules;

if (!masterPackageStats)
  throw Error(`Could not find master bundle stats group with path "${PACKAGES_RELATIVE_PATH}"`);

if (!comparisonPackageStats)
  throw Error(`Could not find comparison bundle stats group with path "${PACKAGES_RELATIVE_PATH}"`);

if (!masterNodeModuleStats)
  throw Error(`Could not find master bundle stats group with path "${NODE_MODULES_RELATIVE_PATH}"`);

if (!comparisonNodeModuleStats)
  throw Error(
    `Could not find comparison bundle stats group with path "${NODE_MODULES_RELATIVE_PATH}"`,
  );

const readableFileSize = (size: number): string => {
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  const sizeString = (size / 1024 ** i).toFixed(2);
  const simpleSizeString = Number(sizeString) * 1;
  const unit = ['B', 'kB', 'MB', 'GB', 'TB'][i];
  return `${simpleSizeString} ${unit}`;
};

const recursivelyPrintSizeInfo = ({
  stats,
  maxDepth,
  filterLabels = [],
  depth = 0,
  messagePrefix = '',
  currentResult = '',
}: {
  stats: BundleStats;
  maxDepth: number;
  filterLabels?: string[];
  depth?: number;
  messagePrefix?: string;
  currentResult?: string;
}): string => {
  let result = currentResult;

  if (
    filterLabels.includes(stats.label) ||
    filterLabels.some((filterLabel) => stats.label.endsWith(`${path.sep}${filterLabel}`))
  )
    return result;

  const title = `${messagePrefix}${stats.label} `;
  result += `\n${title.padEnd(90, '.')} ${readableFileSize(stats.gzipSize)}`;

  if (depth >= maxDepth) return result;

  for (const groupStats of stats.groups || [])
    result = recursivelyPrintSizeInfo({
      stats: groupStats,
      maxDepth,
      depth: depth + 1,
      messagePrefix: `${messagePrefix}  `,
      currentResult: result,
    });

  return result;
};

// https://buildkite.com/docs/pipelines/managing-log-output
// We want to collapse the CI logs in Buildkite, but we can't use +++ before diffing
// or it will mess with the diff. So we use ~~~ first, then replace with +++ later.
const BUILDKITE_COLLAPSE_PLACEHOLDER = '~~~';
const BUILDKITE_COLLAPSE_PREFIX = '---';
const BUILDKITE_EXPAND_PLACEHOLDER = '!!!';
const BUILDKITE_EXPAND_PREFIX = '+++';

const getPackageTitle = (packageName: string) =>
  process.env.CI === 'true' ? `${BUILDKITE_COLLAPSE_PLACEHOLDER} 📌 ${packageName}` : '';

const getNodeModulesStatsMessage = (nodeModulesStatsGroups: BundleStats[]) => {
  const nodeModuleSimpleMessages: { [key: string]: string } = {};
  const nodeModuleDetailedMessages: { [key: string]: string } = {};

  for (const nodeModuleStats of nodeModulesStatsGroups) {
    const moduleName = nodeModuleStats.label;
    const title = `${moduleName} `;
    const fileSize = readableFileSize(nodeModuleStats.gzipSize);

    nodeModuleSimpleMessages[moduleName] = `${title.padEnd(60, '.')} ${fileSize}`;

    nodeModuleDetailedMessages[moduleName] = recursivelyPrintSizeInfo({
      stats: nodeModuleStats,
      maxDepth: 3,
      filterLabels: NODE_MODULES_FILTERED_LABELS,
    });
  }

  const totalSize = nodeModulesStatsGroups.reduce((acc, group) => acc + group.gzipSize, 0);
  const sizeString = `${'Total size '.padEnd(60, '.')} ${readableFileSize(totalSize)}`;

  let message = `${
    process.env.CI === 'true' ? `${BUILDKITE_COLLAPSE_PLACEHOLDER} ` : '\n'
  }🐳 Node module size results:\n\n${sizeString}\n`;

  for (const simpleMessage of Object.values(nodeModuleSimpleMessages))
    message += `\n${simpleMessage}`;

  message += '\n';

  for (const detailedMessage of Object.values(nodeModuleDetailedMessages))
    message += `\n${detailedMessage}`;

  return message.replaceAll(BUILDKITE_COLLAPSE_PLACEHOLDER, BUILDKITE_COLLAPSE_PREFIX);
};

const getPackageStatsMessage = (packageStatsGroups: BundleStats[]) => {
  const packageSimpleMessages = { ...packageSimpleMessagesOrder };
  const packageDetailedMessages = { ...packageDetailedMessagesOrder };

  for (const packageStats of packageStatsGroups) {
    const packageName = packageStats.label;
    const title = `${packageName} `;
    const fileSize = readableFileSize(packageStats.gzipSize);

    packageSimpleMessages[packageName] = `${title.padEnd(60, '.')} ${fileSize}`;

    if (packageName in packageDetailedMessages)
      packageDetailedMessages[packageName] = recursivelyPrintSizeInfo({
        stats: packageStats,
        maxDepth: 3,
        filterLabels: PACKAGES_FILTERED_LABELS,
      });
  }

  let message = `${
    process.env.CI === 'true' ? `${BUILDKITE_EXPAND_PLACEHOLDER} ` : '\n'
  }🐙 Bundle size results:\n`;

  for (const simpleMessage of Object.values(packageSimpleMessages)) message += `\n${simpleMessage}`;

  for (const [packageName, detailedMessage] of Object.entries(packageDetailedMessages))
    message += `\n\n${getPackageTitle(packageName)}${detailedMessage}`;

  return message
    .replaceAll(BUILDKITE_COLLAPSE_PLACEHOLDER, BUILDKITE_COLLAPSE_PREFIX)
    .replaceAll(BUILDKITE_EXPAND_PLACEHOLDER, BUILDKITE_EXPAND_PREFIX);
};

const green = (message: string) => `\x1b[32m${message}\x1b[0m`;
const red = (message: string) => `\x1b[31m${message}\x1b[0m`;

// Diff node modules bundle stats
const masterNodeModulesStatsMessage = getNodeModulesStatsMessage(masterNodeModuleStats.groups);

const comparisonNodeModulesStatsMessage = getNodeModulesStatsMessage(
  comparisonNodeModuleStats.groups,
);

const nodeModulesDiff = diffLines(masterNodeModulesStatsMessage, comparisonNodeModulesStatsMessage);

nodeModulesDiff.forEach(({ value, added, removed }, index) => {
  const nextDiff = nodeModulesDiff[index + 1];
  const nextChanged = Boolean(nextDiff?.added || nextDiff?.removed);
  const message = added || nextChanged ? value.slice(0, -1) : value;
  if (added) return console.log(green(message));
  if (removed) return console.log(red(message));
  return console.log(message);
});

console.log('\n');

// Diff our local packages bundle stats
const masterPackageStatsMessage = getPackageStatsMessage(masterPackageStats.groups);

const comparisonPackageStatsMessage = getPackageStatsMessage(comparisonPackageStats.groups);

const packagesDiff = diffLines(masterPackageStatsMessage, comparisonPackageStatsMessage);

packagesDiff.forEach(({ value, added, removed }, index) => {
  const nextDiff = packagesDiff[index + 1];
  const nextChanged = Boolean(nextDiff?.added || nextDiff?.removed);
  const message = added || nextChanged ? value.slice(0, -1) : value;
  if (added) return console.log(green(message));
  if (removed) return console.log(red(message));
  return console.log(message);
});

console.log('\n');

cleanup();
