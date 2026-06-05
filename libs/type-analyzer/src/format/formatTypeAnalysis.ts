import path from 'node:path';

import type { TypeAnalysisResult, TypeOriginGroup, TypeProperty } from '../types';

export type TypeAnalysisFormat = 'json' | 'markdown' | 'text';

export function formatTypeAnalysis(result: TypeAnalysisResult, format: TypeAnalysisFormat): string {
  if (format === 'json') {
    return `${JSON.stringify(result, null, 2)}\n`;
  }

  if (format === 'markdown') {
    return formatAsMarkdown(result);
  }

  return formatAsText(result);
}

function formatAsText(result: TypeAnalysisResult): string {
  const lines = [
    `Type: ${result.symbolName}`,
    `File: ${result.filePath}`,
    `TSConfig: ${result.tsconfigPath}`,
    `Properties: ${result.properties.length}`,
    '',
    'Groups:',
  ];

  for (const group of result.groups) {
    lines.push(formatGroupHeading(group));
    for (const propertyName of group.properties) {
      const property = result.properties.find((candidate) => candidate.name === propertyName);
      lines.push(`  ${indent(group.depth)}- ${formatProperty(propertyName, property)}`);
    }
  }

  const ungroupedProperties = result.properties.filter((property) => property.origins.length === 0);
  if (ungroupedProperties.length > 0) {
    lines.push('Ungrouped:');
    for (const property of ungroupedProperties) {
      lines.push(`  - ${formatProperty(property.name, property)}`);
    }
  }

  return `${lines.join('\n')}\n`;
}

function formatAsMarkdown(result: TypeAnalysisResult): string {
  const lines = [
    `# ${result.symbolName}`,
    '',
    `- File: \`${result.filePath}\``,
    `- TSConfig: \`${result.tsconfigPath}\``,
    `- Properties: ${result.properties.length}`,
    '',
    '## Groups',
    '',
  ];

  for (const group of result.groups) {
    const headingLevel = Math.min(6, group.depth + 3);
    lines.push(`${'#'.repeat(headingLevel)} ${group.name}`);
    lines.push('');
    lines.push(`- Kind: \`${group.kind}\``);
    if (group.utilityName) {
      lines.push(`- Utility: \`${group.utilityName}\``);
    }
    lines.push(`- Expression: \`${group.expression}\``);
    if (group.declarationLocation) {
      lines.push(`- Declared: \`${formatLocation(group.declarationLocation)}\``);
    }
    lines.push('');

    for (const propertyName of group.properties) {
      const property = result.properties.find((candidate) => candidate.name === propertyName);
      lines.push(`- \`${formatProperty(propertyName, property)}\``);
    }
    lines.push('');
  }

  return `${lines.join('\n').trimEnd()}\n`;
}

function formatGroupHeading(group: TypeOriginGroup): string {
  const details = [`kind=${group.kind}`];
  if (group.utilityName) {
    details.push(`utility=${group.utilityName}`);
  }
  if (group.sourceName && group.sourceName !== group.name) {
    details.push(`source=${group.sourceName}`);
  }
  if (group.declarationLocation) {
    details.push(`declared=${formatLocation(group.declarationLocation)}`);
  }

  return `${indent(group.depth)}${group.name} (${details.join(', ')})`;
}

function formatProperty(propertyName: string, property: TypeProperty | undefined): string {
  if (!property) {
    return propertyName;
  }

  const optionalToken = property.required ? '' : '?';
  return `${property.name}${optionalToken}: ${property.type}`;
}

function formatLocation(location: { character: number; filePath: string; line: number }): string {
  return `${path.relative(process.cwd(), location.filePath)}:${location.line}:${location.character}`;
}

function indent(depth: number): string {
  return '  '.repeat(depth);
}
