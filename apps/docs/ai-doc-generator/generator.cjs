/**
 * 1. Fetch all the relevant mdx filepaths
 * 2. Understand the mobile/web breakdown
 * 3. Generate concatenated result markdown files
 */

const { generateGettingStartedDocs } = require('./generateGettingStartedDocs.cjs');
const { generateHooksDocs } = require('./generateHooksDocs.cjs');
const { generateComponentDocs } = require('./generateComponentsDocs.cjs');
const { generateRoutesDoc } = require('./generateRoutesDoc.cjs');

const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_OUTPUT_PATH = path.resolve(__dirname, '../dist/llms');

const docgenPath = path.resolve(
  __dirname,
  '../.docusaurus/@cbhq/docusaurus-plugin-docgen/default/',
);

const generateDocs = (outputPath) => {
  const platforms = ['web', 'mobile'];
  for (const platform of platforms) {
    const platformOutputPath = path.join(outputPath, platform);
    fs.mkdirSync(platformOutputPath, { recursive: true });

    const sections = [
      generateGettingStartedDocs(
        `${__dirname}/../docs/getting-started/*`,
        platform,
        platformOutputPath,
      ),
      generateComponentDocs(
        `${__dirname}/../docs/components/*`,
        platform,
        docgenPath,
        platformOutputPath,
      ),
      generateHooksDocs(`${__dirname}/../docs/hooks/*`, platform, platformOutputPath),
    ];

    generateRoutesDoc(sections, platformOutputPath);
  }
};

// Accept an output path as an argument
const outputPath = path.resolve(process.cwd(), process.argv[2] || DEFAULT_OUTPUT_PATH);
generateDocs(outputPath);
console.log('LLM docs generated');
