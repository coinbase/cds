const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');
const { generateDoc } = require('./generateDoc.cjs');

/**
 * Find the file path for a doc and generate its content
 * @param {string} platform - 'web' or 'mobile'
 * @param {string} docType - 'components', 'hooks', or 'getting-started'
 * @param {string} docName - The name of the doc (e.g., 'Button', 'useTheme', 'installation')
 * @param {string} siteDir - The Docusaurus site directory
 * @returns {string|null} - The generated doc content, or null if not found
 */
function findAndGenerateDoc(platform, docType, docName, siteDir) {
  try {
    const docsRoot = path.join(siteDir, 'docs', docType);

    // Find the file path
    let docPath = null;

    // Try direct file first (e.g., introduction.mdx, playground.mdx)
    const directFile = path.join(docsRoot, `${docName}.mdx`);
    if (fs.existsSync(directFile)) {
      docPath = directFile;
    }

    // Try as directory with index.mdx (e.g., Button/index.mdx, installation/index.mdx)
    if (!docPath) {
      const indexFile = path.join(docsRoot, docName, 'index.mdx');
      if (fs.existsSync(indexFile)) {
        docPath = path.dirname(indexFile); // Use directory path
      }
    }

    // For nested paths like AccordionItem (could be in layout/AccordionItem/)
    if (!docPath) {
      const pattern = `${docsRoot}/**/${docName}/index.mdx`;
      const matches = globSync(pattern);
      if (matches.length > 0) {
        docPath = path.dirname(matches[0]); // Use directory path
      }
    }

    // Try standalone file in subdirectories
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

    // Generate content using unified generator
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
  findAndGenerateDoc,
};
