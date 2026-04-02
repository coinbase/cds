/**
 * Generate a directory file with links to the live CDS docs site
 *
 * Usage: node generate-site-directory.cjs [outputPath]
 */

const fs = require('node:fs');
const path = require('node:path');
const { globSync } = require('glob');

const DEFAULT_OUTPUT_PATH = path.resolve(__dirname, '../dist/llms');
const SLACKBOT_DOCS_DIR = 'slackbot-docs';
const BASE_URL = 'https://cds.coinbase.com';

/**
 * Get metadata for a doc to extract description
 */
const getMetadata = (dirPath, platform) => {
  // Try platform-specific metadata first
  const platformMetadataFile = path.join(dirPath, `${platform}Metadata.json`);
  if (fs.existsSync(platformMetadataFile)) {
    return JSON.parse(fs.readFileSync(platformMetadataFile, 'utf-8'));
  }

  // Fall back to shared metadata
  const sharedMetadataFile = path.join(dirPath, 'metadata.json');
  if (fs.existsSync(sharedMetadataFile)) {
    return JSON.parse(fs.readFileSync(sharedMetadataFile, 'utf-8'));
  }

  return null;
};

/**
 * Check if a component supports multiple platforms
 * A component is multi-platform if it has both web and mobile metadata files
 */
const isMultiPlatform = (dirPath) => {
  const hasWebMetadata = fs.existsSync(path.join(dirPath, 'webMetadata.json'));
  const hasMobileMetadata = fs.existsSync(path.join(dirPath, 'mobileMetadata.json'));
  return hasWebMetadata && hasMobileMetadata;
};

/**
 * Generate docs site URL from relative path
 * @param {string} docPath - Path to the doc
 * @param {string} platform - 'web' or 'mobile'
 * @param {string} docsDir - Base docs directory
 * @returns {string} - Full URL
 */
const generateDocsUrl = (docPath, platform, docsDir) => {
  const relativePath = path.relative(docsDir, docPath);
  // Remove .mdx extension if present (for standalone files)
  const urlPath = relativePath
    .replace(/\.mdx$/, '')
    .split(path.sep)
    .join('/');
  let url = `${BASE_URL}/${urlPath}/`;

  if (platform === 'mobile' && isMultiPlatform(docPath)) {
    url += '?platform=mobile';
  }

  return url;
};

/**
 * Generate directory for a platform
 */
const generatePlatformDirectory = (platform, outputPath) => {
  const docsDir = path.resolve(__dirname, '../docs');

  let content = `# CDS ${platform === 'web' ? 'Web' : 'React Native'} Components Directory

Quick reference to all CDS components and their documentation on the live site.

**Base URL:** ${BASE_URL}
**Platform:** ${platform === 'web' ? 'Web (React)' : 'React Native'}

---

`;

  // Add Getting Started section
  content += `## Getting Started\n\n`;

  const gettingStartedDocs = globSync('getting-started/*', { cwd: docsDir });
  for (const docPath of gettingStartedDocs) {
    const fullPath = path.join(docsDir, docPath);
    const name = path.basename(docPath, '.mdx');

    let description = '';

    // Try to get description from metadata
    const metadata = getMetadata(fullPath, platform);
    if (metadata?.description) {
      description = metadata.description;
    } else if (fs.statSync(fullPath).isFile()) {
      // For standalone MDX files, try to extract description from ContentHeader
      const fileContent = fs.readFileSync(fullPath, 'utf-8');
      const descMatch = fileContent.match(/description=["']([^"']+)["']/);
      if (descMatch) {
        description = descMatch[1];
      }
    }

    const url = generateDocsUrl(fullPath, platform, docsDir);

    content += `- [${name}](${url})`;
    if (description) {
      content += `: ${description}`;
    }
    content += '\n';
  }

  content += '\n---\n\n';

  // Add Components section grouped by category
  content += `## Components\n\n`;

  const categoriesDirs = globSync('components/*', { cwd: docsDir });
  const componentsByCategory = new Map();

  // Group components by category
  for (const categoryDir of categoriesDirs) {
    const categoryName = path.basename(categoryDir);
    const components = globSync(`${categoryDir}/*/`, { cwd: docsDir });

    const categoryComponents = [];

    for (const componentPath of components) {
      const fullPath = path.join(docsDir, componentPath);
      const componentName = path.basename(componentPath);
      const metadata = getMetadata(fullPath, platform);

      // Skip if no metadata for this platform
      if (!metadata) continue;

      const description = metadata?.description || '';
      const url = generateDocsUrl(fullPath, platform, docsDir);

      categoryComponents.push({
        name: componentName,
        url,
        description,
      });
    }

    if (categoryComponents.length > 0) {
      componentsByCategory.set(categoryName, categoryComponents);
    }
  }

  // Output by category
  for (const [categoryName, components] of componentsByCategory) {
    content += `### ${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}\n\n`;

    for (const component of components) {
      content += `- [${component.name}](${component.url})`;
      if (component.description) {
        content += `: ${component.description}`;
      }
      content += '\n';
    }

    content += '\n';
  }

  content += '---\n\n';

  // Add Hooks section
  const hooksExist = fs.existsSync(path.join(docsDir, 'hooks'));
  if (hooksExist) {
    content += `## Hooks\n\n`;

    const hooks = globSync('hooks/*', { cwd: docsDir });
    for (const hookPath of hooks) {
      const fullPath = path.join(docsDir, hookPath);
      const name = path.basename(hookPath);
      const metadata = getMetadata(fullPath, platform);
      const description = metadata?.description || '';

      const url = generateDocsUrl(fullPath, platform, docsDir);

      content += `- [${name}](${url})`;
      if (description) {
        content += `: ${description}`;
      }
      content += '\n';
    }

    content += '\n---\n\n';
  }

  // Add footer
  content += `## Additional Resources

- **Documentation Home:** ${BASE_URL}
- **Storybook:** https://cds-storybook.coinbase.com
- **GitHub:** https://github.com/coinbase/cds
- **LLM API Endpoints:**
  - Routes index: ${BASE_URL}/llms/${platform}/routes.txt
  - Component docs: ${BASE_URL}/llms/${platform}/components/{ComponentName}.txt

---

*Last generated: ${new Date().toISOString()}*
`;

  // Write to slackbot-docs directory
  const slackbotDocsPath = path.join(outputPath, SLACKBOT_DOCS_DIR);
  fs.mkdirSync(slackbotDocsPath, { recursive: true });

  const outputFile = path.join(slackbotDocsPath, `${platform}-directory.md`);
  fs.writeFileSync(outputFile, content);

  const componentCount = Array.from(componentsByCategory.values()).reduce(
    (sum, comps) => sum + comps.length,
    0,
  );

  console.log(`✅ Generated ${platform}-directory.md`);
  console.log(`   - Categories: ${componentsByCategory.size}`);
  console.log(`   - Components: ${componentCount}`);
  console.log(`   - Path: ${outputFile}`);

  return outputFile;
};

/**
 * Main function
 */
const main = () => {
  console.log('🔗 Generating CDS site directory with live links...\n');

  const outputPath = path.resolve(process.cwd(), process.argv[2] || DEFAULT_OUTPUT_PATH);

  const platforms = ['web', 'mobile'];
  const generatedFiles = [];

  for (const platform of platforms) {
    const filePath = generatePlatformDirectory(platform, outputPath);
    if (filePath) {
      generatedFiles.push(filePath);
    }
  }

  console.log('\n✅ Done! Directory files generated:\n');
  generatedFiles.forEach((file) => {
    console.log(`   📄 ${path.basename(file)}`);
  });
};

main();
