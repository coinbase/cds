const { writeFileSync } = require('node:fs');
const path = require('node:path');

/**
 * @param {Array<{ name: string, routes: string[] }>} sections
 * @param {string} outputPath
 * @returns {string}
 */
const generateRoutesDoc = (sections, outputPath) => {
  const content = `
# CDS Routes

${sections
  .map(
    (section) =>
      `## ${section.name}\n\n${section.routes
        .map(
          (route) =>
            `- [${route.name}](${path.relative(path.dirname(outputPath), route.path)})${
              route.description ? `: ${route.description}` : ''
            }`,
        )
        .join('\n')}`,
  )
  .join('\n\n')}
`;

  writeFileSync(path.join(outputPath, 'routes.txt'), content);
};

module.exports = {
  generateRoutesDoc,
};
