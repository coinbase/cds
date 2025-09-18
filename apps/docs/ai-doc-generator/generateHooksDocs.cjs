const path = require('node:path');
const { globSync } = require('glob');
const { getMetadata, getExamples } = require('./utils.cjs');
const fs = require('node:fs');

const parseHookForPlatform = (platform, hookPath) => {
  const name = path.basename(hookPath);

  const metadata = getMetadata(hookPath, platform);
  if (!metadata) {
    return null;
  }
  const examples = getExamples(hookPath, platform);

  return {
    name,
    metadata,
    examples,
  };
};

const generateHooksDocs = (hooksPath, platform, outputPath) => {
  const hooks = globSync(hooksPath);
  const hooksOutputPath = path.join(outputPath, 'hooks');
  fs.mkdirSync(hooksOutputPath, { recursive: true });

  const routes = [];

  for (const hookPath of hooks) {
    const hook = parseHookForPlatform(platform, hookPath);
    if (!hook) {
      continue;
    }

    const hookFile = `${hook.name}.txt`;
    const hookDocPath = path.join(hooksOutputPath, hookFile);

    const content = `
# ${hook.name}
${hook.metadata.description}

## Import

\`\`\`tsx
${hook.metadata.import}
\`\`\`

## Examples

${hook.examples}
`;

    fs.writeFileSync(hookDocPath, content);
    routes.push({
      name: hook.name,
      description: hook.metadata.description,
      path: hookDocPath,
    });
  }

  return { name: 'Hooks', routes };
};

module.exports = {
  generateHooksDocs,
};
