const { globSync } = require('glob');
const path = require('node:path');
const fs = require('node:fs');

function getDescription(docContent) {
  const componentHeaderMatch = docContent.match(/<ComponentHeader[^>]*\/>/)?.[0];
  if (componentHeaderMatch) {
    const titleMatch = componentHeaderMatch.match(/title="([^"]*)"/);
    const descriptionMatch = componentHeaderMatch.match(/description="([^"]*)"/);
    return descriptionMatch?.[1];
  }
  return undefined;
}

function generateGettingStartedDocs(docsPath, platform, outputPath) {
  const docs = globSync(docsPath);
  const docsOutputPath = path.join(outputPath, 'getting-started');
  fs.mkdirSync(docsOutputPath, { recursive: true });

  const routes = [];

  for (const doc of docs) {
    // Skip directories, only process files
    if (fs.statSync(doc).isDirectory()) {
      continue;
    }

    const { name } = path.parse(doc);
    const outputPath = path.join(docsOutputPath, `${name}.txt`);
    const docContent = fs.readFileSync(doc, 'utf-8');

    fs.writeFileSync(outputPath, docContent);
    routes.push({
      name,
      description: getDescription(docContent),
      path: outputPath,
    });
  }

  return { name: 'Getting Started', routes };
}

module.exports = {
  generateGettingStartedDocs,
};
