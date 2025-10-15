const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');
const { generateDoc } = require('./generateDoc.cjs');

/**
 * Resolve the file path for a doc and generate its content
 * @param {string} platform - 'web' or 'mobile'
 * @param {string} docType - 'components', 'hooks', or 'getting-started'
 * @param {string} docName - The name of the doc (e.g., 'Button', 'useTheme', 'installation')
 * @param {string} siteDir - The Docusaurus site directory
 * @returns {string|null} - The generated doc content, or null if not found
 */
function resolveDoc(platform, docType, docName, siteDir) {
  try {
    const docsRoot = path.join(siteDir, 'docs', docType);

    let docPath = null;

    // Try first the docfile.mdx, then index.mdx and then nested index.mdx
    const directFile = path.join(docsRoot, `${docName}.mdx`);
    if (fs.existsSync(directFile)) {
      docPath = directFile;
    }

    if (!docPath) {
      const indexFile = path.join(docsRoot, docName, 'index.mdx');
      if (fs.existsSync(indexFile)) {
        docPath = path.dirname(indexFile);
      }
    }

    if (!docPath) {
      const pattern = `${docsRoot}/**/${docName}/index.mdx`;
      const matches = globSync(pattern);
      if (matches.length > 0) {
        docPath = path.dirname(matches[0]);
      }
    }

    if (!docPath) {
      const pattern = `${docsRoot}/**/${docName}.mdx`;
      const matches = globSync(pattern);
      if (matches.length > 0) {
        docPath = matches[0];
      }
    }

    if (!docPath) {
      return null;
    }

    const docgenPath =
      docType === 'components'
        ? path.join(siteDir, '.docusaurus/@coinbase/docusaurus-plugin-docgen/default/')
        : null;

    return generateDoc(platform, docPath, { docgenPath });
  } catch (error) {
    console.error(`Error generating doc for ${platform}/${docType}/${docName}:`, error);
    return null;
  }
}

module.exports = {
  resolveDoc,
};
