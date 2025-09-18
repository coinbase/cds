const path = require('node:path');
const fs = require('node:fs');

const valuesToTable = (headers, values) => {
  const escapeString = (str) => str.replace(/\|/g, '\\|').replace(/\n/g, ' ');

  const headerRow = `| ${headers.join(' | ')} |\n`;
  const separatorRow = `| ${headers.map(() => '---').join(' | ')} |\n`;
  const rows = values.map((row) => {
    return `| ${row.map((v) => escapeString(v)).join(' | ')} |\n`;
  });

  return `${headerRow}${separatorRow}${rows.join('')}`;
};

const writeSection = (sectionName, content) => {
  return `## ${sectionName}\n\n${content}\n\n`;
};

const getMetadata = (dirPath, platform) => {
  const metadataFilepath = path.join(dirPath, `${platform}Metadata.json`);
  const metadata = fs.existsSync(metadataFilepath)
    ? JSON.parse(fs.readFileSync(metadataFilepath, 'utf-8'))
    : null;

  if (!metadata) {
    return null;
  }

  return metadata;
};

const getExamples = (dirPath, platform) => {
  const examplesFilepath = `${dirPath}/_${platform}Examples.mdx`;

  if (!fs.existsSync(examplesFilepath)) {
    return null;
  }

  let examplesContent = fs.readFileSync(examplesFilepath, 'utf-8');

  if (examplesContent.match(/^## /gm)) {
    // Examples are by default starting on heading level 2
    examplesContent = examplesContent.replace(/(#+ )/g, '#$1');
  }

  // Remove MDXArticle
  examplesContent = examplesContent
    .replace(/import { MDXArticle } .*\n+/g, '')
    .replace(/<\/?MDXArticle.*?>\n+/g, '');

  return examplesContent;
};

const getPropsContent = (dirPath, platform, docgenPath) => {
  const propsFilepath = `${dirPath}/_${platform}PropsTable.mdx`;
  const propsContent = fs.readFileSync(propsFilepath, 'utf-8');
  const [matchResult] = propsContent.match(new RegExp(`${platform}PropsData from ':docgen/(.*)'`));
  const [, dirtyPath] = matchResult.split(':docgen/');
  const cleanPath = dirtyPath.slice(0, -1);
  const propsDataFilepath = `${docgenPath}/${cleanPath}.js`;
  return require(propsDataFilepath);
};

module.exports = {
  valuesToTable,
  writeSection,
  getMetadata,
  getExamples,
  getPropsContent,
};
