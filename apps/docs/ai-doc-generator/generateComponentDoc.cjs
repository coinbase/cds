const fs = require('node:fs');
const path = require('node:path');

const {
  valuesToTable,
  writeSection,
  getMetadata,
  getExamples,
  getPropsContent,
} = require('./utils.cjs');

const resolvePropTypes = (docgenPath, props = []) => {
  const docgenCommonTypesPath = path.join(docgenPath, '_types/sharedTypeAliases.js');
  const docgenCommonTypes = require(docgenCommonTypesPath).sharedTypeAliases;

  return props.map((prop) => {
    const { type } = prop;
    if (docgenCommonTypes[type]) {
      return { ...prop, type: docgenCommonTypes[type] };
    }

    return prop;
  });
};

const parsePropsToTable = (props = {}) => {
  const headers = ['Prop', 'Type', 'Required', 'Default', 'Description'];
  const values = props?.map((prop) => {
    const { name: propName = '', type, required = true, defaultValue, description = '' } = prop;
    const typeStr = type || 'unknown';
    const defaultStr = defaultValue || '-';
    const descriptionStr = description || '-';
    const requiredStr = required ? 'Yes' : 'No';
    return [`\`${propName}\``, `\`${typeStr}\``, requiredStr, `\`${defaultStr}\``, descriptionStr];
  });

  return valuesToTable(headers, values);
};

/**
 * Generate a single component doc
 * @param {string} platform - 'web' or 'mobile'
 * @param {string} componentDir - Path to the component directory
 * @param {string} docgenPath - Path to docgen output
 * @returns {string|null} - The generated doc content, or null if not available for platform
 */
const generateComponentDoc = (platform, componentDir, docgenPath) => {
  const name = path.basename(componentDir);
  const metadata = getMetadata(componentDir, platform);

  if (!metadata) {
    return null;
  }

  const examples = getExamples(componentDir, platform);
  const propsDataContent = getPropsContent(componentDir, platform, docgenPath);

  let content = '';
  content += `# ${name}\n\n`;
  content += `${metadata.description}\n\n`;

  content += writeSection('Import', `\`\`\`jsx\n${metadata.import}\n\`\`\``);
  content += writeSection(
    'Props',
    parsePropsToTable(resolvePropTypes(docgenPath, propsDataContent?.props)),
  );
  content += writeSection('Examples', examples);

  return content;
};

module.exports = {
  generateComponentDoc,
};
