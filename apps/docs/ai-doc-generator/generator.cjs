/**
 * 1. Fetch all the relevant mdx filepaths
 * 2. Understand the mobile/web breakdown
 * 3. Generate concatenated result markdown files
 */

const { globSync } = require('glob');
const fs = require('node:fs');
const path = require('node:path');

const { generateComponentDoc } = require('./generateComponentDoc.cjs');
const { generateHookDoc } = require('./generateHookDoc.cjs');
const { generateGettingStartedDoc } = require('./generateGettingStartedDoc.cjs');
const { generateRoutesDoc } = require('./generateRoutesDoc.cjs');
const { getMetadata } = require('./utils.cjs');

// Production: generate to dist/llms (will be deployed)
// Dev: on-the-fly generation via docusaurus-plugin-llm-dev-server (no static files needed)
// This script is only run during production builds
const DEFAULT_OUTPUT_PATH = path.resolve(__dirname, '../dist/llms');

const docgenPath = path.resolve(
  __dirname,
  '../.docusaurus/@coinbase/docusaurus-plugin-docgen/default/',
);

const getComponents = (categoriesDirs) => {
  const components = categoriesDirs
    .map((category) => {
      return globSync(`${category}/*/`);
    })
    .flat();

  return components;
};

const generateDocs = (outputPath) => {
  const platforms = ['web', 'mobile'];
  for (const platform of platforms) {
    const platformOutputPath = path.join(outputPath, platform);
    fs.mkdirSync(platformOutputPath, { recursive: true });

    const sections = [];

    // Generate Getting Started docs
    const gettingStartedOutputPath = path.join(platformOutputPath, 'getting-started');
    fs.mkdirSync(gettingStartedOutputPath, { recursive: true });
    const gettingStartedRoutes = [];

    const gettingStartedDocs = globSync(`${__dirname}/../docs/getting-started/*`);
    for (const docPath of gettingStartedDocs) {
      const result = generateGettingStartedDoc(platform, docPath);
      if (!result) continue;

      const name = path.basename(docPath, '.mdx');
      const outputFilePath = path.join(gettingStartedOutputPath, `${name}.txt`);

      fs.writeFileSync(outputFilePath, result.content);
      gettingStartedRoutes.push({
        name,
        description: result.description,
        path: outputFilePath,
      });
    }
    sections.push({ name: 'Getting Started', routes: gettingStartedRoutes });

    // Generate Component docs
    const componentsOutputPath = path.join(platformOutputPath, 'components');
    fs.mkdirSync(componentsOutputPath, { recursive: true });
    const componentRoutes = [];

    const categoriesDirs = globSync(`${__dirname}/../docs/components/*`);
    const components = getComponents(categoriesDirs);

    for (const componentPath of components) {
      const content = generateComponentDoc(platform, componentPath, docgenPath);
      if (!content) continue;

      const name = path.basename(componentPath);
      const componentFile = `${name}.txt`;
      const componentDocPath = path.join(componentsOutputPath, componentFile);

      fs.writeFileSync(componentDocPath, content);

      const metadata = getMetadata(componentPath, platform);
      componentRoutes.push({
        name,
        description: metadata?.description,
        path: componentDocPath,
      });
    }
    sections.push({ name: 'Components', routes: componentRoutes });

    // Generate Hooks docs
    const hooksOutputPath = path.join(platformOutputPath, 'hooks');
    fs.mkdirSync(hooksOutputPath, { recursive: true });
    const hookRoutes = [];

    const hooks = globSync(`${__dirname}/../docs/hooks/*`);
    for (const hookPath of hooks) {
      const content = generateHookDoc(platform, hookPath);
      if (!content) continue;

      const name = path.basename(hookPath);
      const hookFile = `${name}.txt`;
      const hookDocPath = path.join(hooksOutputPath, hookFile);

      fs.writeFileSync(hookDocPath, content);

      const metadata = getMetadata(hookPath, platform);
      hookRoutes.push({
        name,
        description: metadata?.description,
        path: hookDocPath,
      });
    }
    sections.push({ name: 'Hooks', routes: hookRoutes });

    generateRoutesDoc(sections, platformOutputPath);
  }
};

// Accept an output path as an argument, or use default based on environment
if (process.argv[2]) {
  const outputPath = path.resolve(process.cwd(), process.argv[2]);
  generateDocs(outputPath);
  console.log(`LLM docs generated at ${outputPath}`);
} else {
  generateDocs(DEFAULT_OUTPUT_PATH);
  console.log(`LLM docs generated at ${DEFAULT_OUTPUT_PATH}`);
}
