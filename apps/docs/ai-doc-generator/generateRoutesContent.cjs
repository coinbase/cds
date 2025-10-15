const { globSync } = require('glob');
const path = require('path');
const { generateDoc } = require('./generateDoc.cjs');

/**
 * Get metadata for a doc
 */
const getMetadata = (dirPath, platform) => {
  const fs = require('fs');

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

/**
 * Generate routes content for a platform on-the-fly (used in dev mode)
 * @param {string} platform - 'web' or 'mobile'
 * @param {string} siteDir - The Docusaurus site directory
 * @returns {string} - The routes content as markdown
 */
const generateRoutesContent = (platform, siteDir) => {
  const sections = [];
  const docsDir = path.join(siteDir, 'docs');
  const docgenPath = path.join(siteDir, '.docusaurus/@coinbase/docusaurus-plugin-docgen/default/');

  const gettingStartedRoutes = [];
  const gettingStartedDocs = globSync('getting-started/*', { cwd: docsDir });

  for (const docPath of gettingStartedDocs) {
    const fullPath = path.join(docsDir, docPath);
    const content = generateDoc(platform, fullPath);
    if (!content) continue;

    const name = path.basename(docPath, '.mdx');
    const metadata = getMetadata(fullPath, platform);

    gettingStartedRoutes.push({
      name,
      description: metadata?.description,
      url: `/llms/${platform}/getting-started/${name}.txt`,
    });
  }

  if (gettingStartedRoutes.length > 0) {
    sections.push({ name: 'Getting Started', routes: gettingStartedRoutes });
  }

  const componentRoutes = [];
  const categoriesDirs = globSync('components/*', { cwd: docsDir });
  const components = categoriesDirs
    .map((category) => globSync(`${category}/*/`, { cwd: docsDir }))
    .flat();

  for (const componentPath of components) {
    const fullPath = path.join(docsDir, componentPath);
    const content = generateDoc(platform, fullPath, { docgenPath });
    if (!content) continue;

    const name = path.basename(componentPath);
    const metadata = getMetadata(fullPath, platform);

    componentRoutes.push({
      name,
      description: metadata?.description,
      url: `/llms/${platform}/components/${name}.txt`,
    });
  }

  if (componentRoutes.length > 0) {
    sections.push({ name: 'Components', routes: componentRoutes });
  }

  const hookRoutes = [];
  const hooks = globSync('hooks/*', { cwd: docsDir });

  for (const hookPath of hooks) {
    const fullPath = path.join(docsDir, hookPath);
    const content = generateDoc(platform, fullPath);
    if (!content) continue;

    const name = path.basename(hookPath);
    const metadata = getMetadata(fullPath, platform);

    hookRoutes.push({
      name,
      description: metadata?.description,
      url: `/llms/${platform}/hooks/${name}.txt`,
    });
  }

  if (hookRoutes.length > 0) {
    sections.push({ name: 'Hooks', routes: hookRoutes });
  }

  const content = `# CDS Routes

${sections
  .map(
    (section) =>
      `## ${section.name}\n\n${section.routes
        .map(
          (route) =>
            `- [${route.name}](${route.url})${route.description ? `: ${route.description}` : ''}`,
        )
        .join('\n')}`,
  )
  .join('\n\n')}
`;

  return content;
};

module.exports = {
  generateRoutesContent,
};
