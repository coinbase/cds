/**
 * ESLint Processor: no-typescript-in-jsx-codeblock
 *
 * Detects fenced code blocks marked as `jsx` (e.g. ```jsx live) that contain
 * TypeScript syntax. These should either use `tsx` as the language tag or have
 * the TypeScript syntax removed.
 *
 * This is implemented as an ESLint processor because MDX files cannot be parsed
 * by standard JavaScript/TypeScript parsers. The processor scans the raw MDX text
 * for code fence patterns and injects lint messages in postprocess.
 */

const RULE_ID = 'internal/no-typescript-in-jsx-codeblock';

/**
 * Regex patterns that reliably indicate TypeScript syntax in JSX code.
 * Each pattern is chosen for low false-positive risk in normal JSX code.
 */
const TYPESCRIPT_PATTERNS = [
  // Destructured parameter with type annotation: }: TypeName followed by ), comma, or generic <
  // Catches: ({ a, b }: Props), ({ ...rest }: Props<T>)
  // Requires a trailing param-context char to avoid matching JSX text like {i + 1}: Lorem
  /}\s*:\s*[A-Z]\w+\s*[,)<]/,

  // Non-destructured parameter with type annotation: (param: TypeName)
  // Catches: (props: FooProps), (ref: React.Ref<T>)
  /\(\s*(?:\.\.\.)?(?:\w+)\s*:\s*[A-Z]\w+/,

  // Type alias declaration: type Name = ...
  /(?:^|\n)\s*(?:export\s+)?type\s+[A-Z]\w+\s*(?:<[^>]*>)?\s*=/,

  // Interface declaration: interface Name { ... }
  /(?:^|\n)\s*(?:export\s+)?interface\s+[A-Z]\w+/,

  // Variable with type annotation: const name: Type = ... or const name: Type<...> =
  /\b(?:const|let|var)\s+\w+\s*:\s*[A-Z]\w+/,

  // Function parameter with primitive type annotation: (x: number), (x: string)
  /\(\s*(?:\.\.\.)?(?:\w+)\s*:\s*(?:string|number|boolean|bigint|symbol|object|void|never|any|unknown)\s*[,)]/,

  // Return type annotation before arrow function: ): Type =>
  /\)\s*:\s*(?:[A-Z]\w+|string|number|boolean|void)\s*=>/,

  // Generic type argument: identifier<Type> (e.g. useState<string>(), Map<Foo, Bar>)
  // Safe from JSX: self-closing JSX uses /> not >, and opening JSX tags (<Tag>)
  // are preceded by whitespace/delimiters, never a word character
  /\w<(?:[A-Z]\w+|string|number|boolean|void|never|any|unknown)\s*[,>]/,
];

/**
 * Checks whether a code string contains TypeScript syntax.
 * @param {string} code - The code content of a fenced code block
 * @returns {boolean}
 */
export function containsTypeScript(code) {
  return TYPESCRIPT_PATTERNS.some((pattern) => pattern.test(code));
}

/**
 * Finds all ```jsx code blocks in MDX text and returns diagnostic info
 * for any that contain TypeScript syntax.
 */
export function findViolations(text) {
  const violations = [];

  // Match ```jsx or ```jsx live (with optional modifiers after jsx)
  // The 'm' flag makes ^ match line starts
  const codeBlockRegex = /^```(jsx)[^\n]*\n([\s\S]*?)^```\s*$/gm;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    const codeContent = match[2];

    if (containsTypeScript(codeContent)) {
      const blockStartOffset = match.index;
      const textBefore = text.substring(0, blockStartOffset);
      const line = textBefore.split('\n').length;
      const langTagStart = blockStartOffset + 3; // length of "```"

      violations.push({
        line,
        column: 4, // 1-indexed, after "```"
        endLine: line,
        endColumn: 7, // end of "jsx"
        langTagOffset: langTagStart,
      });
    }
  }

  return violations;
}

// Store source text between preprocess and postprocess
const sourceTexts = new Map();

/**
 * ESLint processor for MDX files that detects TypeScript in JSX code blocks.
 */
export const processor = {
  meta: {
    name: 'no-typescript-in-jsx-codeblock',
    version: '1.0.0',
  },

  preprocess(text, filename) {
    sourceTexts.set(filename, text);
    // Return a dummy valid JS file so ESLint doesn't choke on MDX syntax
    return [{ text: '"";', filename: '0.js' }];
  },

  postprocess(messages, filename) {
    const text = sourceTexts.get(filename);
    sourceTexts.delete(filename);

    if (!text) return [];

    const violations = findViolations(text);

    return violations.map((v) => ({
      ruleId: RULE_ID,
      severity: 1,
      message:
        'Code block is marked as `jsx` but contains TypeScript syntax. Use `tsx` as the language tag instead, or remove the TypeScript annotations.',
      line: v.line,
      column: v.column,
      endLine: v.endLine,
      endColumn: v.endColumn,
      fix: {
        range: [v.langTagOffset, v.langTagOffset + 3],
        text: 'tsx',
      },
    }));
  },

  supportsAutofix: true,
};
