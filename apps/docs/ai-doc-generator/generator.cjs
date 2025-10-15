/**
 * 1. Fetch all the relevant mdx filepaths
 * 2. Understand the mobile/web breakdown
 * 3. Generate concatenated result markdown files
 */

const { globSync } = require('glob');
const fs = require('node:fs');
const path = require('node:path');

const { generateDoc } = require('./generateDoc.cjs');
const { generateRoutesDoc } = require('./generateRoutesDoc.cjs');

const DEFAULT_OUTPUT_PATH = path.resolve(__dirname, '../dist/llms');

const docgenPath = path.resolve(
  __dirname,
  '../.docusaurus/@coinbase/docusaurus-plugin-docgen/default/',
);

/**
 * Get metadata for a doc
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
      const content = generateDoc(platform, docPath);
      if (!content) continue;

      const name = path.basename(docPath, '.mdx');
      const outputFilePath = path.join(gettingStartedOutputPath, `${name}.txt`);

      fs.writeFileSync(outputFilePath, content);

      const metadata = getMetadata(docPath, platform);
      gettingStartedRoutes.push({
        name,
        description: metadata?.description,
        path: outputFilePath,
      });
    }
    sections.push({ name: 'Getting Started', routes: gettingStartedRoutes });

    const componentsOutputPath = path.join(platformOutputPath, 'components');
    fs.mkdirSync(componentsOutputPath, { recursive: true });
    const componentRoutes = [];

    const categoriesDirs = globSync(`${__dirname}/../docs/components/*`);
    const components = getComponents(categoriesDirs);

    for (const componentPath of components) {
      const content = generateDoc(platform, componentPath, { docgenPath });
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

    const hooksOutputPath = path.join(platformOutputPath, 'hooks');
    fs.mkdirSync(hooksOutputPath, { recursive: true });
    const hookRoutes = [];

    const hooks = globSync(`${__dirname}/../docs/hooks/*`);
    for (const hookPath of hooks) {
      const content = generateDoc(platform, hookPath);
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

const outputPath = path.resolve(process.cwd(), process.argv[2] || DEFAULT_OUTPUT_PATH);
generateDocs(outputPath);
console.log('LLM docs generated');
