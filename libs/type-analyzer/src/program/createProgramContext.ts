import path from 'node:path';
import ts from 'typescript';

import type { AnalyzeTypeRequest, ProgramContext } from '../types';

import { resolveInputPath, resolveTsconfigPath } from './paths';

export function createProgramContext({
  filePath: inputFilePath,
  tsconfigPath: inputTsconfigPath,
  cwd = process.cwd(),
}: Pick<AnalyzeTypeRequest, 'cwd' | 'filePath' | 'tsconfigPath'>): ProgramContext {
  const filePath = resolveInputPath(inputFilePath, cwd);
  const tsconfigPath = resolveTsconfigPath({
    cwd,
    filePath,
    tsconfigPath: inputTsconfigPath,
  });

  const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  if (configFile.error) {
    throw new Error(formatDiagnostic(configFile.error));
  }

  const parsedConfig = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(tsconfigPath),
  );

  if (parsedConfig.errors.length > 0) {
    throw new Error(parsedConfig.errors.map(formatDiagnostic).join('\n'));
  }

  const rootNames = Array.from(new Set([...parsedConfig.fileNames, filePath]));
  const program = ts.createProgram({
    rootNames,
    options: {
      ...parsedConfig.options,
      noEmit: true,
    },
  });

  const sourceFile = program.getSourceFile(filePath);
  if (!sourceFile) {
    throw new Error(`Could not load source file: ${filePath}`);
  }

  return {
    checker: program.getTypeChecker(),
    filePath,
    program,
    sourceFile,
    tsconfigPath,
  };
}

function formatDiagnostic(diagnostic: ts.Diagnostic): string {
  return ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
}
