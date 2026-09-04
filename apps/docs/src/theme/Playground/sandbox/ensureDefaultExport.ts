export function ensureDefaultExport(code: string): string {
  if (/\bexport\s+default\b/.test(code)) {
    return code;
  }

  const funcMatch = code.match(/^function\s+([A-Z]\w*)\s*\(/m);
  if (funcMatch) {
    return code.replace(new RegExp(`^(function\\s+${funcMatch[1]})`, 'm'), `export default $1`);
  }

  const constMatch = code.match(/^const\s+([A-Z]\w*)\s*=/m);
  if (constMatch) {
    return `${code}\n\nexport default ${constMatch[1]};`;
  }

  if (/^\([^)]*\)\s*=>/.test(code.trimStart())) {
    return `const App = ${code.trimStart()}\n\nexport default App;`;
  }

  const indented = code
    .split('\n')
    .map((line) => '    ' + line)
    .join('\n');
  return `export default function App() {\n  return (\n${indented}\n  );\n}`;
}
