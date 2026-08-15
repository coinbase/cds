import type ts from 'typescript';

export type AnalyzeTypeRequest = {
  filePath: string;
  symbolName: string;
  tsconfigPath?: string;
  includeNestedOrigins?: boolean;
  expandTypes?: boolean;
  cwd?: string;
};

export type SourceLocation = {
  filePath: string;
  line: number;
  character: number;
};

export type TypeOriginGroupKind =
  | 'inline'
  | 'interface'
  | 'intersection'
  | 'type-reference'
  | 'utility'
  | 'unknown';

export type TypePropertyOrigin = {
  groupId: string;
  groupName: string;
  groupKind: TypeOriginGroupKind;
  utilityName?: string;
  depth: number;
};

export type TypeProperty = {
  name: string;
  type: string;
  required: boolean;
  readonly: boolean;
  documentation?: string;
  declarations: SourceLocation[];
  origins: TypePropertyOrigin[];
};

export type TypeOriginGroup = {
  id: string;
  name: string;
  kind: TypeOriginGroupKind;
  expression: string;
  depth: number;
  parentId?: string;
  sourceName?: string;
  utilityName?: string;
  sourceLocation?: SourceLocation;
  declarationLocation?: SourceLocation;
  properties: string[];
};

export type TypeAnalysisResult = {
  symbolName: string;
  filePath: string;
  tsconfigPath: string;
  properties: TypeProperty[];
  groups: TypeOriginGroup[];
};

export type ProgramContext = {
  program: ts.Program;
  checker: ts.TypeChecker;
  tsconfigPath: string;
  filePath: string;
  sourceFile: ts.SourceFile;
};
