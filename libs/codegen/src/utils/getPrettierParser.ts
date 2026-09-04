import type * as prettier from 'prettier';

export const getPrettierParser = (ext: string): prettier.BuiltInParserName => {
  switch (ext) {
    case '.mdx':
      return 'mdx';
    case '.js':
      return 'babel';
    case '.json':
      return 'json';
    case '.css':
      return 'css';
    default:
      return 'typescript';
  }
};
