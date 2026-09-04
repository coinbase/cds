/**
 * Input/output operations: reporting results and generating HTML reports.
 */

import fs from 'node:fs';

/**
 * Outputs audit results to the console.
 * When --html is enabled, only outputs a summary since details are in the report.
 * @param {object} results - Audit results object
 * @param {object} options - CLI options
 */
export function outputResults(results, options) {
  const docsiteIssuesCount =
    results.missingFigmaNode.length +
    results.invalidFigmaNode.length +
    (results.invalidSourceUrl?.length || 0) +
    (results.invalidSourcePath?.length || 0);
  const figmaLibraryIssuesCount =
    (results.missingDevResource?.length || 0) + (results.invalidDevResource?.length || 0);
  const totalIssues =
    docsiteIssuesCount + results.missingCodeConnect.length + figmaLibraryIssuesCount;

  console.log(`\nFigma Integration Audit`);
  console.log('='.repeat(40));

  // If HTML report is enabled, only show summary
  if (options.html) {
    console.log(`\nTotal issues found: ${totalIssues}`);
    console.log(`  - Docsite: ${docsiteIssuesCount}`);
    console.log(`  - Code Connect: ${results.missingCodeConnect.length}`);
    console.log(`  - Figma Library: ${figmaLibraryIssuesCount}`);
    return;
  }

  // Full output when not generating HTML report
  if (docsiteIssuesCount > 0) {
    console.log(`\n━━━ DOCSITE ISSUES (metadata files) ━━━`);
  }

  if (results.missingFigmaNode.length > 0) {
    console.log(`\nMISSING FIGMA NODE URL (${results.missingFigmaNode.length}):`);
    for (const item of results.missingFigmaNode) {
      console.log(`  ${item.component}`);
      console.log(`    docsite: ${item.docsPath}/index.mdx`);
    }
  }

  if (results.invalidFigmaNode.length > 0) {
    console.log(`\nINVALID FIGMA NODE URL (${results.invalidFigmaNode.length}):`);
    for (const item of results.invalidFigmaNode) {
      console.log(`  ${item.component}`);
      console.log(`    docsite: ${item.docsPath}/index.mdx`);
      console.log(`    url: ${item.url}`);
      console.log(`    error: ${item.error}`);
    }
  }

  if (results.invalidSourceUrl?.length > 0) {
    console.log(`\nINVALID SOURCE URL (${results.invalidSourceUrl.length}):`);
    for (const item of results.invalidSourceUrl) {
      console.log(`  ${item.component}`);
      console.log(`    platform: ${item.platform}`);
      console.log(`    source: ${item.sourceUrl}`);
      console.log(`    expected: ${item.expected}`);
      console.log(`    docsite: ${item.docsPath}/index.mdx`);
    }
  }

  if (results.invalidSourcePath?.length > 0) {
    console.log(`\nINVALID SOURCE PATH (${results.invalidSourcePath.length}):`);
    for (const item of results.invalidSourcePath) {
      console.log(`  ${item.component}`);
      console.log(`    platform: ${item.platform}`);
      console.log(`    source: ${item.sourcePath}`);
      console.log(`    docsite: ${item.docsPath}/index.mdx`);
    }
  }

  // Code Connect Issues Section
  if (results.missingCodeConnect.length > 0) {
    console.log(`\n━━━ CODE CONNECT ISSUES ━━━`);
    console.log(`\nMISSING CODE CONNECT FILE (${results.missingCodeConnect.length}):`);
    for (const item of results.missingCodeConnect) {
      console.log(`  ${item.component}`);
      console.log(`    expected: ${item.expectedPath}`);
    }
  }

  // Figma Library Issues Section
  if (figmaLibraryIssuesCount > 0) {
    console.log(`\n━━━ FIGMA LIBRARY ISSUES (dev resources) ━━━`);
  }

  if (results.missingDevResource?.length > 0) {
    console.log(`\nMISSING DEV RESOURCE (${results.missingDevResource.length}):`);
    for (const item of results.missingDevResource) {
      console.log(`  ${item.component}`);
      console.log(`    resource: ${item.resourceName}`);
      console.log(`    expected: ${item.expectedUrl}`);
      console.log(`    figma node: ${item.figmaNodeUrl}`);
    }
  }

  if (results.invalidDevResource?.length > 0) {
    console.log(`\nINVALID DEV RESOURCE (${results.invalidDevResource.length}):`);
    for (const item of results.invalidDevResource) {
      console.log(`  ${item.component}`);
      console.log(`    resource: ${item.resourceName}`);
      console.log(`    expected: ${item.expectedUrl}`);
      console.log(`    actual: ${item.actualUrl}`);
      console.log(`    figma node: ${item.figmaNodeUrl}`);
    }
  }

  // Summary
  console.log('\n━━━ SUMMARY ━━━');
  console.log(`\nDocsite Issues: ${docsiteIssuesCount}`);
  console.log(`  - ${results.missingFigmaNode.length} missing Figma node URL`);
  console.log(`  - ${results.invalidFigmaNode.length} invalid Figma node URL`);
  console.log(`  - ${results.invalidSourceUrl?.length || 0} invalid source URL`);
  console.log(`  - ${results.invalidSourcePath?.length || 0} invalid source path`);
  console.log(`\nCode Connect Issues: ${results.missingCodeConnect.length}`);
  console.log(`  - ${results.missingCodeConnect.length} missing Code Connect file`);
  console.log(`\nFigma Library Issues: ${figmaLibraryIssuesCount}`);
  console.log(`  - ${results.missingDevResource?.length || 0} missing dev resources`);
  console.log(`  - ${results.invalidDevResource?.length || 0} invalid dev resources`);
}

/**
 * Exits with appropriate code based on CI mode and violations.
 * @param {object} results - Audit results object
 * @param {object} options - CLI options
 */
export function exitWithCode(results, options) {
  if (
    options.ci &&
    (results.missingFigmaNode.length > 0 ||
      results.invalidFigmaNode.length > 0 ||
      (results.invalidSourceUrl?.length || 0) > 0 ||
      (results.invalidSourcePath?.length || 0) > 0 ||
      results.missingCodeConnect.length > 0 ||
      (results.missingDevResource?.length || 0) > 0 ||
      (results.invalidDevResource?.length || 0) > 0)
  ) {
    process.exit(1);
  }
}

/**
 * Generates an HTML report of the audit results.
 * @param {object} results - Audit results object
 * @param {object} options - CLI options
 * @param {string} outputPath - Path to write the HTML file
 * @param {Array} allComponents - All components that were analyzed
 */
export function generateHtmlReport(results, options, outputPath, allComponents = []) {
  const figmaLibraryIssuesCount =
    (results.missingDevResource?.length || 0) + (results.invalidDevResource?.length || 0);

  const docsiteIssuesCount =
    results.missingFigmaNode.length +
    results.invalidFigmaNode.length +
    (results.invalidSourceUrl?.length || 0) +
    (results.invalidSourcePath?.length || 0);

  const totalIssues =
    docsiteIssuesCount + results.missingCodeConnect.length + figmaLibraryIssuesCount;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Figma Integration Audit</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      padding: 2rem;
      background: #f5f5f5;
      color: #333;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h1 {
      margin-bottom: 0.5rem;
      color: #1a1a1a;
    }
    .subtitle {
      color: #666;
      margin-bottom: 2rem;
    }
    .summary {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 2rem;
    }
    .summary h2 {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }
    .summary ul {
      list-style: none;
      padding: 0;
    }
    .summary li {
      padding: 0.25rem 0;
    }
    .category {
      margin-bottom: 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
    }
    .category-header {
      background: #f8f9fa;
      padding: 1rem;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;
      font-weight: 500;
    }
    .category-header:hover {
      background: #e9ecef;
    }
    .category-header.error {
      background: #fff5f5;
      border-bottom: 2px solid #fc8181;
    }
    .category-header.error:hover {
      background: #fed7d7;
    }
    .category-header.success {
      background: #f0fff4;
      border-bottom: 2px solid #68d391;
    }
    .category-header.success:hover {
      background: #c6f6d5;
    }
    .category-header.warning {
      background: #fffaf0;
      border-bottom: 2px solid #f6ad55;
    }
    .category-header.warning:hover {
      background: #feebc8;
    }
    .category-header.info {
      background: #ebf8ff;
      border-bottom: 2px solid #63b3ed;
    }
    .category-header.info:hover {
      background: #bee3f8;
    }
    .badge {
      background: #666;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.875rem;
      font-weight: 600;
    }
    .badge.error {
      background: #e53e3e;
    }
    .badge.success {
      background: #38a169;
    }
    .badge.warning {
      background: #dd6b20;
    }
    .badge.info {
      background: #3182ce;
    }
    .category-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }
    .category-content.open {
      max-height: 10000px;
    }
    .item {
      padding: 1rem;
      border-bottom: 1px solid #f0f0f0;
    }
    .item:last-child {
      border-bottom: none;
    }
    .item-component {
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #1a1a1a;
    }
    .item-detail {
      color: #666;
      font-size: 0.875rem;
      margin-left: 1rem;
      margin-top: 0.25rem;
    }
    .item-detail strong {
      color: #333;
    }
    .arrow {
      transition: transform 0.3s ease;
      display: inline-block;
    }
    .arrow.open {
      transform: rotate(90deg);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Figma Integration Audit</h1>

    <div class="summary">
      <h2>Summary</h2>
      <ul>
        <li><strong>${allComponents.length}</strong> total components analyzed</li>
        <li><strong>${totalIssues}</strong> total issues found</li>
        <li><strong>Docsite Issues:</strong> ${docsiteIssuesCount}</li>
        <li style="margin-left: 1rem;">${results.missingFigmaNode.length} missing Figma node URL</li>
        <li style="margin-left: 1rem;">${results.invalidFigmaNode.length} invalid Figma node URL</li>
        <li style="margin-left: 1rem;">${results.invalidSourceUrl?.length || 0} invalid source URL</li>
        <li style="margin-left: 1rem;">${results.invalidSourcePath?.length || 0} invalid source path</li>
        <li><strong>Code Connect Issues:</strong> ${results.missingCodeConnect.length}</li>
        <li style="margin-left: 1rem;">${results.missingCodeConnect.length} missing Code Connect file</li>
        <li><strong>Figma Library Issues:</strong> ${figmaLibraryIssuesCount}</li>
        <li style="margin-left: 1rem;">${results.missingDevResource?.length || 0} missing dev resources</li>
        <li style="margin-left: 1rem;">${results.invalidDevResource?.length || 0} invalid dev resources</li>
      </ul>
    </div>

    <h2 style="margin-top: 2rem; color: #c53030; border-bottom: 2px solid #fc8181; padding-bottom: 0.5rem;">Docsite Issues</h2>

    ${generateCategoryHtml(
      'missing-figma-node',
      'Missing Figma Node URL',
      results.missingFigmaNode,
      'error',
      (item) => `
      <div class="item">
        <div class="item-component">${escapeHtml(item.component)}</div>
        <div class="item-detail"><strong>docsite:</strong> ${escapeHtml(item.docsPath)}/index.mdx</div>
      </div>
    `,
    )}

    ${generateCategoryHtml(
      'invalid-figma-node',
      'Invalid Figma Node URL',
      results.invalidFigmaNode,
      'error',
      (item) => `
      <div class="item">
        <div class="item-component">${escapeHtml(item.component)}</div>
        <div class="item-detail"><strong>docsite:</strong> ${escapeHtml(item.docsPath)}/index.mdx</div>
        <div class="item-detail"><strong>url:</strong> ${escapeHtml(item.url)}</div>
        <div class="item-detail"><strong>error:</strong> ${escapeHtml(item.error)}</div>
      </div>
    `,
    )}

    ${generateCategoryHtml(
      'invalid-source-url',
      'Invalid Source URL',
      results.invalidSourceUrl || [],
      'error',
      (item) => `
      <div class="item">
        <div class="item-component">${escapeHtml(item.component)}</div>
        <div class="item-detail"><strong>platform:</strong> ${escapeHtml(item.platform)}</div>
        <div class="item-detail"><strong>source:</strong> ${escapeHtml(item.sourceUrl)}</div>
        <div class="item-detail"><strong>expected:</strong> ${escapeHtml(item.expected)}</div>
        <div class="item-detail"><strong>docsite:</strong> ${escapeHtml(item.docsPath)}/index.mdx</div>
      </div>
    `,
    )}

    ${generateCategoryHtml(
      'invalid-source-path',
      'Invalid Source Path',
      results.invalidSourcePath || [],
      'error',
      (item) => `
      <div class="item">
        <div class="item-component">${escapeHtml(item.component)}</div>
        <div class="item-detail"><strong>platform:</strong> ${escapeHtml(item.platform)}</div>
        <div class="item-detail"><strong>source:</strong> ${escapeHtml(item.sourcePath)}</div>
        <div class="item-detail"><strong>docsite:</strong> ${escapeHtml(item.docsPath)}/index.mdx</div>
      </div>
    `,
    )}

    <h2 style="margin-top: 2rem; color: #c53030; border-bottom: 2px solid #fc8181; padding-bottom: 0.5rem;">Code Connect Issues</h2>

    ${generateCategoryHtml(
      'missing-code-connect',
      'Missing Code Connect File',
      results.missingCodeConnect,
      'error',
      (item) => `
      <div class="item">
        <div class="item-component">${escapeHtml(item.component)}</div>
        <div class="item-detail"><strong>expected:</strong> ${escapeHtml(item.expectedPath)}</div>
      </div>
    `,
    )}

    <h2 style="margin-top: 2rem; color: #c53030; border-bottom: 2px solid #fc8181; padding-bottom: 0.5rem;">Figma Library Issues</h2>

    ${generateCategoryHtml(
      'missing-dev-resource',
      'Missing Dev Resource',
      results.missingDevResource || [],
      'error',
      (item) => `
      <div class="item">
        <div class="item-component">${escapeHtml(item.component)}</div>
        <div class="item-detail"><strong>resource:</strong> ${escapeHtml(item.resourceName)}</div>
        <div class="item-detail"><strong>expected:</strong> ${escapeHtml(item.expectedUrl)}</div>
        <div class="item-detail"><strong>figma node:</strong> ${escapeHtml(item.figmaNodeUrl)}</div>
      </div>
    `,
    )}

    ${generateCategoryHtml(
      'invalid-dev-resource',
      'Invalid Dev Resource',
      results.invalidDevResource || [],
      'error',
      (item) => `
      <div class="item">
        <div class="item-component">${escapeHtml(item.component)}</div>
        <div class="item-detail"><strong>resource:</strong> ${escapeHtml(item.resourceName)}</div>
        <div class="item-detail"><strong>expected:</strong> ${escapeHtml(item.expectedUrl)}</div>
        <div class="item-detail"><strong>actual:</strong> ${escapeHtml(item.actualUrl)}</div>
        <div class="item-detail"><strong>figma node:</strong> ${escapeHtml(item.figmaNodeUrl)}</div>
      </div>
    `,
    )}

    <h2 style="margin-top: 2rem; color: #2c5282; border-bottom: 2px solid #63b3ed; padding-bottom: 0.5rem;">All Components Analyzed</h2>

    ${generateCategoryHtml(
      'all-components',
      `All Components (${allComponents.length})`,
      allComponents.map((c) => ({ component: c.component, docsPath: c.docsPath })),
      'info',
      (item) => `
      <div class="item">
        <div class="item-component">${escapeHtml(item.component)}</div>
        <div class="item-detail"><strong>docsite:</strong> ${escapeHtml(item.docsPath)}/index.mdx</div>
      </div>
    `,
    )}
  </div>

  <script>
    document.querySelectorAll('.category-header').forEach(header => {
      header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const arrow = header.querySelector('.arrow');
        content.classList.toggle('open');
        arrow.classList.toggle('open');
      });
    });
  </script>
</body>
</html>`;

  fs.writeFileSync(outputPath, html, 'utf-8');
  console.log(`\nHTML report generated: ${outputPath}`);
}

/**
 * Helper function to generate HTML for a category section.
 */
function generateCategoryHtml(id, title, items, type, itemRenderer) {
  if (items.length === 0) return '';

  const itemsHtml = items.map(itemRenderer).join('');

  return `
    <div class="category">
      <div class="category-header ${type}" data-category="${id}">
        <span><span class="arrow">▸</span> ${title}</span>
        <span class="badge ${type}">${items.length}</span>
      </div>
      <div class="category-content">
        ${itemsHtml}
      </div>
    </div>
  `;
}

/**
 * Helper function to escape HTML special characters.
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
