export const getHeaderCommentForFileType = (ext: string) => {
  switch (ext) {
    case '.json':
    case '.mdx':
    case '.md':
    case '.css': {
      return '';
    }
    default:
      return `
/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */
`;
  }
};
