const fs = require('node:fs');
const path = require('node:path');

/**
 * Helper to process MDX content for LLM consumption
 */
const processMDXContent = (content) => {
  // Remove MDXArticle wrappers
  let processed = content
    .replace(/import { MDXArticle } .*\n+/g, '')
    .replace(/<\/?MDXArticle.*?>\n+/g, '');

  // Remove MDXSection wrappers
  processed = processed
    .replace(/import { MDXSection } .*\n+/g, '')
    .replace(/<\/?MDXSection.*?>\n+/g, '');

  // Adjust heading levels if needed (examples start at h2, bump to h3)
  if (processed.match(/^## /gm)) {
    processed = processed.replace(/(#+ )/g, '#$1');
  }

  return processed.trim();
};

/**
 * Try to find and read a file with platform-specific fallback
 * @param {string} dirPath - Directory to search in
 * @param {string} platform - 'web' or 'mobile'
 * @param {string} baseName - Base file name (e.g., 'Examples', 'Api', 'Content', 'PropsTable')
 * @returns {string|null} - File content or null if not found
 */
const readPlatformFile = (dirPath, platform, baseName) => {
  // Try platform-specific file first (e.g., _webExamples.mdx)
  const platformFile = path.join(dirPath, `_${platform}${baseName}.mdx`);
  if (fs.existsSync(platformFile)) {
    return fs.readFileSync(platformFile, 'utf-8');
  }

  // Fall back to shared file (e.g., _examples.mdx)
  const sharedFile = path.join(dirPath, `_${baseName.toLowerCase()}.mdx`);
  if (fs.existsSync(sharedFile)) {
    return fs.readFileSync(sharedFile, 'utf-8');
  }

  return null;
};

/**
 * Get metadata for a doc
 * @param {string} dirPath - Directory containing metadata
 * @param {string} platform - 'web' or 'mobile'
 * @returns {Object|null} - Metadata object with description, import, etc.
 */
const getMetadata = (dirPath, platform) => {
  // Try platform-specific metadata first (webMetadata.json, mobileMetadata.json)
  const platformMetadataFile = path.join(dirPath, `${platform}Metadata.json`);
  if (fs.existsSync(platformMetadataFile)) {
    return JSON.parse(fs.readFileSync(platformMetadataFile, 'utf-8'));
  }

  // Fall back to shared metadata.json
  const sharedMetadataFile = path.join(dirPath, 'metadata.json');
  if (fs.existsSync(sharedMetadataFile)) {
    return JSON.parse(fs.readFileSync(sharedMetadataFile, 'utf-8'));
  }

  return null;
};

/**
 * Get props table content for components
 * @param {string} dirPath - Component directory
 * @param {string} platform - 'web' or 'mobile'
 * @param {string} docgenPath - Path to docgen output
 * @returns {string|null} - Props table markdown or null
 */
const getPropsTable = (dirPath, platform, docgenPath) => {
  const propsFile = path.join(dirPath, `_${platform}PropsTable.mdx`);
  if (!fs.existsSync(propsFile)) {
    return null;
  }

  try {
    const propsContent = fs.readFileSync(propsFile, 'utf-8');
    const matchResult = propsContent.match(new RegExp(`${platform}PropsData from ':docgen/(.*)'`));

    if (!matchResult) {
      return null;
    }

    const [, dirtyPath] = matchResult[0].split(':docgen/');
    const cleanPath = dirtyPath.slice(0, -1);
    const propsDataFile = path.join(docgenPath, `${cleanPath}.js`);

    if (!fs.existsSync(propsDataFile)) {
      return null;
    }

    const propsData = require(propsDataFile);
    return generatePropsTableMarkdown(propsData, docgenPath);
  } catch (error) {
    console.error(`Error reading props table: ${error.message}`);
    return null;
  }
};

/**
 * Generate props table markdown from docgen data
 */
const generatePropsTableMarkdown = (propsData, docgenPath) => {
  const props = resolvePropTypes(docgenPath, propsData?.props || []);

  const headers = ['Prop', 'Type', 'Required', 'Default', 'Description'];
  const rows = props.map((prop) => {
    const { name = '', type, required = true, defaultValue, description = '' } = prop;
    const typeStr = type || 'unknown';
    const defaultStr = defaultValue || '-';
    const descriptionStr = description || '-';
    const requiredStr = required ? 'Yes' : 'No';
    return [`\`${name}\``, `\`${typeStr}\``, requiredStr, `\`${defaultStr}\``, descriptionStr];
  });

  const escapeString = (str) =>
    str.replace(/\\/g, '\\\\').replace(/\|/g, '\\|').replace(/\n/g, ' ');
  const headerRow = `| ${headers.join(' | ')} |\n`;
  const separatorRow = `| ${headers.map(() => '---').join(' | ')} |\n`;
  const dataRows = rows
    .map((row) => `| ${row.map((v) => escapeString(v)).join(' | ')} |\n`)
    .join('');

  return `${headerRow}${separatorRow}${dataRows}`;
};

/**
 * Resolve prop types from docgen common types
 */
const resolvePropTypes = (docgenPath, props = []) => {
  try {
    const commonTypesFile = path.join(docgenPath, '_types/sharedTypeAliases.js');
    const commonTypes = require(commonTypesFile).sharedTypeAliases;

    return props.map((prop) => {
      const { type } = prop;
      if (commonTypes[type]) {
        return { ...prop, type: commonTypes[type] };
      }
      return prop;
    });
  } catch (error) {
    return props;
  }
};

/**
 * Unified doc generator that works for all doc types
 * @param {string} platform - 'web' or 'mobile'
 * @param {string} docPath - Path to the doc file or directory
 * @param {Object} options - Additional options
 * @param {string} options.docgenPath - Path to docgen output (for components)
 * @returns {string|null} - The generated doc content, or null if not found
 */
const generateDoc = (platform, docPath, options = {}) => {
  const { docgenPath } = options;

  // Handle standalone files (e.g., introduction.mdx, playground.mdx)
  if (!fs.statSync(docPath).isDirectory()) {
    return fs.readFileSync(docPath, 'utf-8');
  }

  // For directories, check what type of doc this is by what files exist
  const name = path.basename(docPath);
  const metadata = getMetadata(docPath, platform);

  // If no metadata for this platform, return null
  if (!metadata) {
    return null;
  }

  // Build the document sections
  let content = `# ${name}\n\n`;

  if (metadata.description) {
    content += `${metadata.description}\n\n`;
  }

  // Add import section if available
  if (metadata.import) {
    content += `## Import\n\n\`\`\`tsx\n${metadata.import}\n\`\`\`\n\n`;
  }

  // Try to find and add main content (for getting-started docs)
  const mainContent = readPlatformFile(docPath, platform, 'Content');
  if (mainContent) {
    content += processMDXContent(mainContent) + '\n\n';
    return content;
  }

  // Try to find and add API documentation (for hooks)
  const apiContent = readPlatformFile(docPath, platform, 'Api');
  if (apiContent) {
    content += `## API\n\n${processMDXContent(apiContent)}\n\n`;
  }

  // Try to find and add examples
  const examplesContent = readPlatformFile(docPath, platform, 'Examples');
  if (examplesContent) {
    content += `## Examples\n\n${processMDXContent(examplesContent)}\n\n`;
  }

  // Try to find and add props table (for components)
  if (docgenPath) {
    const propsTable = getPropsTable(docPath, platform, docgenPath);
    if (propsTable) {
      content += `## Props\n\n${propsTable}\n\n`;
    }
  }

  return content;
};

module.exports = {
  generateDoc,
};
