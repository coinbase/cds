const fs = require('node:fs');
const path = require('node:path');

function getDescription(docContent) {
  const componentHeaderMatch = docContent.match(/<ComponentHeader[^>]*\/>/)?.[0];
  if (componentHeaderMatch) {
    const descriptionMatch = componentHeaderMatch.match(/description="([^"]*)"/);
    return descriptionMatch?.[1];
  }
  return undefined;
}

/**
 * Generate a single getting-started doc
 * @param {string} platform - 'web' or 'mobile' (not used but kept for consistency)
 * @param {string} docPath - Path to the doc file or directory
 * @returns {{ content: string, description?: string }|null} - The doc content and description, or null if not found
 */
const generateGettingStartedDoc = (platform, docPath) => {
  let docFilePath;

  if (fs.statSync(docPath).isDirectory()) {
    // For directories, look for index.mdx
    const indexPath = path.join(docPath, 'index.mdx');
    if (!fs.existsSync(indexPath)) {
      return null;
    }
    docFilePath = indexPath;
  } else {
    // For standalone files
    docFilePath = docPath;
  }

  const docContent = fs.readFileSync(docFilePath, 'utf-8');

  return {
    content: docContent,
    description: getDescription(docContent),
  };
};

module.exports = {
  generateGettingStartedDoc,
};
