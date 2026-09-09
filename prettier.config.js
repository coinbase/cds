module.exports = {
  // Workspace format only passes JS, JSX, TypeScript, JSON, and Markdown to Prettier
  // (`tools:format`). Chain other formatters on that Nx target when they are added.
  arrowParens: 'always',
  bracketSameLine: false,
  jsxSingleQuote: false,
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  overrides: [
    {
      files: '*.json',
      options: {
        parser: 'json-stringify',
      },
    },
  ],
};
