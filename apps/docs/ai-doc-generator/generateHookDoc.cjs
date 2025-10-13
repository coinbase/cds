const path = require('node:path');
const { getMetadata, getExamples } = require('./utils.cjs');

/**
 * Generate a single hook doc
 * @param {string} platform - 'web' or 'mobile'
 * @param {string} hookPath - Path to the hook directory
 * @returns {string|null} - The generated doc content, or null if not available for platform
 */
const generateHookDoc = (platform, hookPath) => {
  const name = path.basename(hookPath);

  const metadata = getMetadata(hookPath, platform);
  if (!metadata) {
    return null;
  }
  const examples = getExamples(hookPath, platform);

  const content = `
# ${name}
${metadata.description}

## Import

\`\`\`tsx
${metadata.import}
\`\`\`

## Examples

${examples}
`;

  return content;
};

module.exports = {
  generateHookDoc,
};
