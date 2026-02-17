/**
 * Ensures the code has a default export so it can be imported as `App`
 * from the entry point. Handles five cases:
 * 1. Already has `export default` -> unchanged
 * 2. Has a PascalCase function declaration -> prepend `export default`
 * 3. Has a PascalCase const declaration -> append `export default Name;`
 * 4. Arrow function expression -> assign to `App` const and export
 * 5. Bare JSX -> wrap in `export default function App() { return (...); }`
 */
export function ensureDefaultExport(code: string): string {
  // Case 1: already has a default export
  if (/\bexport\s+default\b/.test(code)) {
    return code;
  }

  // Case 2: function ComponentName() — PascalCase function declaration
  const funcMatch = code.match(/^function\s+([A-Z]\w*)\s*\(/m);
  if (funcMatch) {
    return code.replace(new RegExp(`^(function\\s+${funcMatch[1]})`, 'm'), `export default $1`);
  }

  // Case 3: const ComponentName = ... — PascalCase const declaration
  const constMatch = code.match(/^const\s+([A-Z]\w*)\s*=/m);
  if (constMatch) {
    return `${code}\n\nexport default ${constMatch[1]};`;
  }

  // Case 4: arrow function — () => { ... } or (props) => { ... }
  if (/^\([^)]*\)\s*=>/.test(code.trimStart())) {
    return `const App = ${code.trimStart()}\n\nexport default App;`;
  }

  // Case 5: bare JSX — wrap in a component function
  const indented = code
    .split('\n')
    .map((line) => '    ' + line)
    .join('\n');
  return `export default function App() {\n  return (\n${indented}\n  );\n}`;
}
