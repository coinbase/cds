import { arrowProperty, fitsPrintWidth, indentUnit, type Layout, objectLiteral } from './source';

/**
 * JavaScript module artifacts: an SVG string wrapped as a module, and the per-type lookup maps
 * that lazily load those modules. Content only; where the files live is the sink's decision, so
 * the maps take the import specifiers the sink resolved.
 */

/** A CommonJS module exporting the SVG, as `@coinbase/cds-mobile` requires it through Metro. */
export const renderCjsModule = (svg: string) => `module.exports = {\n  content: \`${svg}\`,\n};\n`;

/** Makes the SVG fill its container when rendered inline on web. No-op when a width is already set. */
export function fillContainer(svg: string) {
  const openingTagEnd = svg.indexOf('>');
  if (openingTagEnd === -1 || /\bwidth=/.test(svg.slice(0, openingTagEnd))) return svg;
  return svg.replace(/(<svg\b)/, '$1 width="100%" height="100%"');
}

/** An ES module exporting the SVG, as `@coinbase/cds-web` `import()`s it to render inline. */
export const renderEsmModule = (svg: string) => `export default \`${fillContainer(svg)}\`;\n`;

export type ModuleMapOptions = {
  /** The `<Type>Name` union the map is typed with. */
  nameType: string;
  /** Import specifier of the module declaring `nameType`, relative to the map. */
  nameTypeImport: string;
  /** Codegen header placed after the import. */
  header: string;
};

export type SvgJsMapEntry = {
  name: string;
  /** Import specifiers of the CJS modules, relative to the map, by theme. */
  modules: Record<'light' | 'dark' | 'themeable', string>;
};

const cjsLoaderType = '{ light: () => string; dark: () => string; themeable?: () => string }';

/** `Record<Name, {...}>`, with the type arguments on their own lines when the closing line is too long. */
function recordType(nameType: string) {
  const inline = `Record<${nameType}, ${cjsLoaderType}>`;
  return fitsPrintWidth(`} as ${inline};`)
    ? inline
    : `Record<\n  ${nameType},\n  ${cjsLoaderType}\n>`;
}

/** `svgJsMap.ts`: lazily `require`s each theme's CJS module. Entries are expected pre-sorted. */
export function renderSvgJsMap(entries: SvgJsMapEntry[], options: ModuleMapOptions) {
  const map = objectLiteral(
    entries.map(({ name, modules }) => [
      name,
      ({ indent, prefix, suffix }) =>
        objectLiteral(
          (Object.keys(modules) as (keyof typeof modules)[]).map((theme) => [
            theme,
            (layout) => arrowProperty(theme, `require('${modules[theme]}').content`, layout),
          ]),
          { indent, prefix, suffix },
        ),
    ]),
    { prefix: 'const svgJsMap = ', suffix: ` as ${recordType(options.nameType)};` },
  );
  return moduleMapFile('svgJsMap', map, options);
}

export type SvgEsmMapEntry = {
  name: string;
  /** Import specifier of the themeable ES module, relative to the map. */
  module: string;
};

/**
 * `themeable: () => import('./x.js').then((m) => m.default as string),` broken the way prettier
 * breaks it when it gets too long: first the arrow body moves to its own line, then the `.then`
 * argument does.
 */
function lazyImportProperty(specifier: string, layout: Required<Layout>) {
  const callee = `import('${specifier}').then(`;
  const callback = '(m) => m.default as string';
  const twoLines = arrowProperty('themeable', `${callee}${callback})`, layout);
  if (twoLines.split('\n').every(fitsPrintWidth)) return twoLines;

  const { indent, suffix } = layout;
  const bodyIndent = `${indent}${indentUnit}`;
  return `${indent}themeable: () =>\n${bodyIndent}${callee}\n${bodyIndent}${indentUnit}${callback},\n${bodyIndent})${suffix}`;
}

/** `svgEsmMap.ts`: lazily `import()`s each themeable ES module. Entries are expected pre-sorted. */
export function renderSvgEsmMap(entries: SvgEsmMapEntry[], options: ModuleMapOptions) {
  const map = objectLiteral(
    entries.map(({ name, module }) => [
      name,
      ({ indent, prefix, suffix }) =>
        objectLiteral([['themeable', (layout) => lazyImportProperty(module, layout)]], {
          indent,
          prefix,
          suffix,
        }),
    ]),
    {
      prefix: 'const svgEsmMap = ',
      suffix: ` as Partial<Record<${options.nameType}, { themeable: () => Promise<string> }>>;`,
    },
  );
  return moduleMapFile('svgEsmMap', map, options);
}

const moduleMapFile = (
  exportName: string,
  map: string,
  { nameType, nameTypeImport, header }: ModuleMapOptions,
) => `import type { ${nameType} } from '${nameTypeImport}';

${header}

${map}

export default ${exportName};
`;
