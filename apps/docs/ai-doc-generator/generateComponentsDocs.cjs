const { globSync } = require('glob');
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

const parseComponentForPlatform = (platform, componentDir, docgenPath) => {
  const name = path.basename(componentDir);
  const metadata = getMetadata(componentDir, platform);

  if (!metadata) {
    return null;
  }

  const examples = getExamples(componentDir, platform);
  const propsDataContent = getPropsContent(componentDir, platform, docgenPath);

  return {
    name,
    platform,
    metadata,
    props: parsePropsToTable(resolvePropTypes(docgenPath, propsDataContent?.props)),
    examples,
  };
};

const writeComponentDoc = (component, filePath) => {
  let content = '';
  content += `# ${component.name}\n\n`;
  content += `${component.metadata.description}\n\n`;

  content += writeSection('Import', `\`\`\`jsx\n${component.metadata.import}\n\`\`\``);
  content += writeSection('Props', component.props);
  content += writeSection('Examples', component.examples);

  fs.writeFileSync(filePath, content);

  return filePath;
};

const getComponents = (categoriesDirs) => {
  const components = categoriesDirs
    .map((category) => {
      return globSync(`${category}/*/`);
    })
    .flat();

  return components;
};

/**
 * @param {string} path
 * @param {string} platform
 * @param {string} docgenPath
 * @param {string} outputPath
 * @returns {Array<{ name: string, routes: { name: string, path: string }[]}>}
 */
const generateComponentDocs = (categoriesPath, platform, docgenPath, outputPath) => {
  const componentsOutputPath = path.join(outputPath, 'components');
  fs.mkdirSync(componentsOutputPath, { recursive: true });

  const categoriesDirs = globSync(categoriesPath);
  const components = getComponents(categoriesDirs);

  const routes = [];

  for (const componentPath of components) {
    const component = parseComponentForPlatform(platform, componentPath, docgenPath);
    if (!component) {
      continue;
    }
    const componentFile = `${component.name}.txt`;
    const componentDocPath = path.join(componentsOutputPath, componentFile);

    writeComponentDoc(component, componentDocPath);
    routes.push({
      name: component.name,
      description: component.metadata.description,
      path: componentDocPath,
    });
  }

  return { name: 'Components', routes };
};

module.exports = {
  generateComponentDocs,
};
