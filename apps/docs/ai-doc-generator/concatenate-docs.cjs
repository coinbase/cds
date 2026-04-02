/**
 * Concatenate all generated LLM docs into single comprehensive files
 *
 * Usage: node concatenate-docs.cjs [outputPath]
 */

const fs = require('node:fs');
const path = require('node:path');
const { globSync } = require('glob');

const DEFAULT_OUTPUT_PATH = path.resolve(__dirname, '../dist/llms');
const SLACKBOT_DOCS_DIR = 'slackbot-docs';

/**
 * Read and concatenate all docs for a platform
 */
const concatenatePlatformDocs = (platform, outputPath) => {
  const platformPath = path.join(outputPath, platform);

  if (!fs.existsSync(platformPath)) {
    console.log(`Warning: ${platformPath} does not exist. Run generator.cjs first.`);
    return;
  }

  // First pass: collect all sections and their items for TOC
  const tocSections = [];

  // Collect Getting Started items
  const gettingStartedPath = path.join(platformPath, 'getting-started');
  if (fs.existsSync(gettingStartedPath)) {
    const gettingStartedFiles = globSync('*.txt', { cwd: gettingStartedPath });
    const items = gettingStartedFiles.map((file) => {
      const docName = path.basename(file, '.txt');
      return docName.charAt(0).toUpperCase() + docName.slice(1);
    });

    if (items.length > 0) {
      tocSections.push({ title: 'Getting Started', items });
    }
  }

  // Collect Components
  const componentsPath = path.join(platformPath, 'components');
  if (fs.existsSync(componentsPath)) {
    const componentFiles = globSync('*.txt', { cwd: componentsPath }).sort();
    const items = componentFiles.map((file) => path.basename(file, '.txt'));

    if (items.length > 0) {
      tocSections.push({ title: 'Components', items });
    }
  }

  // Collect Hooks
  const hooksPath = path.join(platformPath, 'hooks');
  if (fs.existsSync(hooksPath)) {
    const hookFiles = globSync('*.txt', { cwd: hooksPath });
    const items = hookFiles.map((file) => path.basename(file, '.txt'));

    if (items.length > 0) {
      tocSections.push({ title: 'Hooks', items });
    }
  }

  // Build header with TOC
  let content = `# Coinbase Design System (CDS) - ${platform === 'web' ? 'Web' : 'React Native'} Documentation

This is a comprehensive guide to all CDS components and features for ${platform === 'web' ? 'web' : 'React Native'} applications.

**Generated from:** https://cds.coinbase.com
**Platform:** ${platform === 'web' ? 'Web (React)' : 'React Native'}
**Total Sections:** ${tocSections.length}

---

# Table of Contents

`;

  // Generate TOC
  for (const section of tocSections) {
    content += `## ${section.title}\n\n`;
    for (const item of section.items) {
      content += `- ${item}\n`;
    }
    content += '\n';
  }

  content += `---\n\n`;

  // Now add all the actual content
  // Add Getting Started section
  const docsDir = path.resolve(__dirname, '../docs');

  if (fs.existsSync(gettingStartedPath)) {
    content += `# Getting Started\n\n`;

    const gettingStartedFiles = globSync('*.txt', { cwd: gettingStartedPath });

    for (const file of gettingStartedFiles) {
      const filePath = path.join(gettingStartedPath, file);
      const docContent = fs.readFileSync(filePath, 'utf-8');
      const docName = path.basename(file, '.txt');

      content += `## ${docName.charAt(0).toUpperCase() + docName.slice(1)}\n\n`;
      content += docContent;
      content += '\n\n---\n\n';
    }
  }

  // Add Components section
  if (fs.existsSync(componentsPath)) {
    content += `# Components\n\n`;

    const componentFiles = globSync('*.txt', { cwd: componentsPath }).sort();
    const categoriesDirs = globSync('components/*', { cwd: docsDir });

    for (const file of componentFiles) {
      const filePath = path.join(componentsPath, file);
      const docContent = fs.readFileSync(filePath, 'utf-8');
      const componentName = path.basename(file, '.txt');

      // Find the category for this component
      let categoryName = '';
      for (const categoryDir of categoriesDirs) {
        const componentPath = path.join(docsDir, categoryDir, componentName);
        if (fs.existsSync(componentPath)) {
          categoryName = path.basename(categoryDir);
          break;
        }
      }

      content += `## ${componentName}\n\n`;
      content += docContent;
      content += '\n\n---\n\n';
    }
  }

  // Add Hooks section
  if (fs.existsSync(hooksPath)) {
    content += `# Hooks\n\n`;

    const hookFiles = globSync('*.txt', { cwd: hooksPath });

    for (const file of hookFiles) {
      const filePath = path.join(hooksPath, file);
      const docContent = fs.readFileSync(filePath, 'utf-8');
      const hookName = path.basename(file, '.txt');

      content += `## ${hookName}\n\n`;
      content += docContent;
      content += '\n\n---\n\n';
    }
  }

  // Add footer with stats
  const stats = {
    gettingStarted: fs.existsSync(gettingStartedPath)
      ? globSync('*.txt', { cwd: gettingStartedPath }).length
      : 0,
    components: fs.existsSync(componentsPath)
      ? globSync('*.txt', { cwd: componentsPath }).length
      : 0,
    hooks: fs.existsSync(hooksPath) ? globSync('*.txt', { cwd: hooksPath }).length : 0,
  };

  content += `---

# End of Documentation

**Platform:** ${platform === 'web' ? 'Web (React)' : 'React Native'}

**Contents:**
- ${stats.gettingStarted} Getting Started guides
- ${stats.components} Components
- ${stats.hooks} Hooks

**Total Sections:** ${stats.gettingStarted + stats.components + stats.hooks}

**Links:**
- Latest docs: https://cds.coinbase.com
- Interactive examples: https://cds-storybook.coinbase.com
- GitHub: https://github.com/coinbase/cds

---

*This documentation is generated automatically from the CDS docs site.*
*For the most up-to-date information, visit https://cds.coinbase.com*
`;

  // Write concatenated file to slackbot-docs subdirectory
  const slackbotDocsPath = path.join(outputPath, SLACKBOT_DOCS_DIR);
  fs.mkdirSync(slackbotDocsPath, { recursive: true });

  const outputFile = path.join(slackbotDocsPath, `${platform}-complete.md`);
  fs.writeFileSync(outputFile, content);

  console.log(`✅ Generated ${platform}-complete.md`);
  console.log(`   - Size: ${(content.length / 1024).toFixed(2)} KB`);
  console.log(`   - Getting Started: ${stats.gettingStarted}`);
  console.log(`   - Components: ${stats.components}`);
  console.log(`   - Hooks: ${stats.hooks}`);
  console.log(`   - Path: ${outputFile}`);

  return outputFile;
};

/**
 * Main function
 */
const main = () => {
  console.log('📚 Concatenating CDS documentation for Google Drive/Glean...\n');

  const outputPath = path.resolve(process.cwd(), process.argv[2] || DEFAULT_OUTPUT_PATH);

  if (!fs.existsSync(outputPath)) {
    console.error(`❌ Error: Output path does not exist: ${outputPath}`);
    console.error('Please run generator.cjs first to generate the individual docs.');
    process.exit(1);
  }

  const platforms = ['web', 'mobile'];
  const generatedFiles = [];

  for (const platform of platforms) {
    const filePath = concatenatePlatformDocs(platform, outputPath);
    if (filePath) {
      generatedFiles.push(filePath);
    }
  }

  if (generatedFiles.length === 0) {
    console.error(
      '\n❌ No files were generated. Make sure dist/llms/{web,mobile} directories exist.',
    );
    process.exit(1);
  }

  console.log('\n✅ Done! Files ready for upload:\n');
  generatedFiles.forEach((file) => {
    console.log(`   📄 ${path.basename(file)}`);
  });
};

main();
