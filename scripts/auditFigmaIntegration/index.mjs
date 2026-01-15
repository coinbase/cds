/**
 * Main orchestration logic for the Figma integration audit.
 */

import fs from 'node:fs';
import path from 'node:path';

import { parseArgs } from './cli.mjs';
import { findCodeConnectFile } from './codeConnect.mjs';
import { findOfficialComponents } from './components.mjs';
import { CODE_CONNECT_IGNORE } from './config.mjs';
import { extractPathFromSourceUrl, GITHUB_BASE_URL, REPO_ROOT } from './constants.mjs';
import { validateDevResources } from './devResources.mjs';
import { parseFigmaUrl, validateFigmaUrls } from './figma.mjs';
import { exitWithCode, generateHtmlReport, outputResults } from './io.mjs';

/**
 * This script audits Figma integration completeness for official CDS components.
 * It checks that components have a Figma node URL, a Code Connect file, and valid dev resources.
 *
 * Usage:
 *   node scripts/auditFigmaIntegration/index.mjs [options]
 *
 * Options:
 *   --ci                Exit with code 1 if violations found
 *   --html              Generate HTML report in the temp folder
 *
 * Environment:
 *   FIGMA_ACCESS_TOKEN  Required. Figma API access token for URL and dev resource validation.
 *
 */
export async function runAudit() {
  const options = parseArgs();

  // Discover all components from docsite
  const components = findOfficialComponents();

  const results = {
    missingFigmaNode: [],
    invalidFigmaNode: [],
    invalidSourceUrl: [],
    invalidSourcePath: [],
    missingCodeConnect: [],
    codeConnectExempt: [],
    missingDevResource: [],
    invalidDevResource: [],
  };

  // Collect URLs to validate
  const urlsToValidate = [];

  for (const component of components) {
    // Validate ALL source URLs and paths
    for (const sourceUrl of component.sources) {
      const platform = sourceUrl.includes('/mobile/') ? 'mobile' : 'web';

      // Check 1: Validate GitHub base URL and extract path
      const sourcePath = extractPathFromSourceUrl(sourceUrl);
      if (!sourcePath) {
        results.invalidSourceUrl.push({
          component: component.component,
          docsPath: component.docsPath,
          sourceUrl,
          platform,
          expected: GITHUB_BASE_URL,
        });
        continue; // Skip path check if URL is wrong
      }

      // Check 2: Validate file exists
      const fullPath = path.join(REPO_ROOT, sourcePath);
      if (!fs.existsSync(fullPath)) {
        results.invalidSourcePath.push({
          component: component.component,
          docsPath: component.docsPath,
          sourcePath,
          platform,
        });
      }
    }

    // Check if component is exempt from Code Connect checks
    const isCodeConnectExempt = CODE_CONNECT_IGNORE.includes(component.component);

    // Check for Figma node URL (always required, never exempt)
    if (!component.figmaNodes || component.figmaNodes.length === 0) {
      results.missingFigmaNode.push({
        component: component.component,
        docsPath: component.docsPath,
      });
    } else {
      // Collect URLs for validation
      for (const url of component.figmaNodes) {
        const parsed = parseFigmaUrl(url);
        if (parsed) {
          urlsToValidate.push({
            component: component.component,
            docsPath: component.docsPath,
            url,
            fileKey: parsed.fileKey,
            nodeId: parsed.nodeId,
          });
        } else {
          // URL couldn't be parsed - treat as invalid
          results.invalidFigmaNode.push({
            component: component.component,
            docsPath: component.docsPath,
            url,
            error: 'Invalid URL format',
          });
        }
      }
    }

    // Check for Code Connect file - iterate ALL paths for this component
    if (isCodeConnectExempt) {
      results.codeConnectExempt.push({
        component: component.component,
        paths: component.paths,
      });
    } else {
      // Check each source path for a Code Connect file
      for (const componentPath of component.paths) {
        const codeConnectResult = findCodeConnectFile(componentPath, component.component);
        if (!codeConnectResult.found) {
          results.missingCodeConnect.push({
            component: component.component,
            expectedPath: codeConnectResult.expectedPath,
          });
        }
      }
    }
  }

  // Validate Figma URLs via API
  if (urlsToValidate.length > 0) {
    console.log(`\nValidating ${urlsToValidate.length} Figma URLs from component metadata...`);
    const invalidUrls = await validateFigmaUrls(urlsToValidate, process.env.FIGMA_ACCESS_TOKEN);

    // Build set of invalid URL keys for quick lookup
    const invalidUrlKeys = new Set(invalidUrls.map((inv) => `${inv.component}:${inv.url}`));

    // Add docsPath to each invalid URL result
    for (const invalidUrl of invalidUrls) {
      const originalEntry = urlsToValidate.find(
        (entry) => entry.component === invalidUrl.component && entry.url === invalidUrl.url,
      );
      results.invalidFigmaNode.push({
        ...invalidUrl,
        docsPath:
          originalEntry?.docsPath ||
          components.find((c) => c.component === invalidUrl.component)?.docsPath,
      });
    }

    // Identify validated nodes (those not in invalidUrls)
    const validatedNodes = urlsToValidate.filter(
      (entry) => !invalidUrlKeys.has(`${entry.component}:${entry.url}`),
    );

    // Validate dev resources for validated nodes
    if (validatedNodes.length > 0) {
      console.log(`\nValidating dev resources for ${validatedNodes.length} Figma nodes...`);
      const devResourceResults = await validateDevResources(
        validatedNodes,
        components,
        process.env.FIGMA_ACCESS_TOKEN,
      );
      results.missingDevResource = devResourceResults.missingDevResource;
      results.invalidDevResource = devResourceResults.invalidDevResource;
    }
  }

  // Output results
  outputResults(results, options);

  // Generate HTML report if requested
  if (options.html) {
    const tempDir = path.join(REPO_ROOT, 'temp');

    // Create temp directory if it doesn't exist
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const filename = `figma-audit-${timestamp}.html`;
    const outputPath = path.join(tempDir, filename);

    generateHtmlReport(results, options, outputPath, components);
  }

  // Exit with appropriate code
  exitWithCode(results, options);
}

runAudit();
