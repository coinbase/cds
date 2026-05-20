import path from 'node:path';

import { analyzeType } from '../analyzeType';

const workspaceRoot = process.cwd();
const fixtureDir = path.join(workspaceRoot, 'libs/type-analyzer/src/__testfixtures__/basic');
const fixtureFile = path.join(fixtureDir, 'types.ts');

describe('analyzeType', () => {
  it('infers the nearest tsconfig from the input file', () => {
    const result = analyzeType({
      filePath: fixtureFile,
      symbolName: 'ComposedProps',
    });

    expect(result.tsconfigPath).toBe(path.join(fixtureDir, 'tsconfig.json'));
  });

  it('groups properties by top-level type composition', () => {
    const result = analyzeType({
      filePath: fixtureFile,
      symbolName: 'ComposedProps',
    });

    expect(result.groups.map((group) => group.name)).toEqual([
      'BaseProps',
      'PickedProps',
      'BaseProps',
      'inline',
    ]);

    expect(getGroup(result, 'BaseProps')?.properties).toEqual(['base', 'removed', 'shared']);
    expect(getGroup(result, 'PickedProps')?.properties).toEqual(['extra', 'shared']);
    expect(getGroup(result, 'inline')?.properties).toEqual(['inline', 'shared']);
    expect(result.groups[2]?.utilityName).toBe('Omit');

    const sharedProperty = getProperty(result, 'shared');
    expect(sharedProperty?.origins.map((origin) => origin.groupName)).toEqual([
      'BaseProps',
      'PickedProps',
      'BaseProps',
      'inline',
    ]);
    expect(sharedProperty?.origins[2]?.utilityName).toBe('Omit');
  });

  it('can include nested origin groups', () => {
    const result = analyzeType({
      filePath: fixtureFile,
      includeNestedOrigins: true,
      symbolName: 'ComposedProps',
    });

    const pickedProps = getGroup(result, 'PickedProps');
    const pickUtility = result.groups.find(
      (group) => group.kind === 'utility' && group.expression.startsWith('Pick<ExtraProps'),
    );

    expect(pickedProps).toBeDefined();
    expect(pickedProps?.properties).toEqual([]);
    expect(pickUtility?.parentId).toBe(pickedProps?.id);
    expect(pickUtility?.utilityName).toBe('Pick');
    expect(pickUtility?.properties).toEqual(['extra', 'shared']);
    expect(result.groups.filter((group) => group.name === 'ExtraProps')).toHaveLength(1);
  });

  it('handles type alias intersection chains', () => {
    const result = analyzeType({
      filePath: fixtureFile,
      symbolName: 'ChildProps',
    });

    expect(result.properties.map((property) => property.name)).toEqual(['child', 'parent']);
    expect(result.groups.map((group) => group.name)).toEqual(['ParentProps', 'inline']);
    expect(getProperty(result, 'parent')?.origins[0]?.groupName).toBe('ParentProps');
    expect(getProperty(result, 'child')?.origins[0]?.groupName).toBe('inline');
  });

  it('analyzes SlideButtonHandleProps with expected origin buckets', () => {
    const result = analyzeType({
      filePath: path.join(workspaceRoot, 'packages/mobile/src/buttons/SlideButton.tsx'),
      symbolName: 'SlideButtonHandleProps',
    });

    expect(result.tsconfigPath).toBe(path.join(workspaceRoot, 'packages/mobile/tsconfig.json'));
    expect(result.groups[0]?.name).toBe('PressableProps');
    expect(result.groups[1]?.name).toBe('SlideButtonBaseProps');
    expect(result.groups[2]?.name).toBe('inline');

    expect(getProperty(result, 'onPress')?.origins[0]?.groupName).toBe('PressableProps');
    expect(getProperty(result, 'checked')?.origins[0]?.groupName).toBe('SlideButtonBaseProps');
    expect(getProperty(result, 'checked')?.origins[0]?.utilityName).toBe('Pick');
    expect(getProperty(result, 'progress')?.origins[0]?.groupName).toBe('inline');
    expect(getProperty(result, 'transform')?.type).toBe("ViewStyle['transform']");
    expect(getProperty(result, 'style')?.type).toBe('StyleProp<ViewStyle>');
  });

  it('can opt into expanded checker type strings', () => {
    const result = analyzeType({
      expandTypes: true,
      filePath: path.join(workspaceRoot, 'packages/mobile/src/buttons/SlideButton.tsx'),
      symbolName: 'SlideButtonHandleProps',
    });

    const transformType = getProperty(result, 'transform')?.type;
    expect(transformType).toContain('scaleX');
    expect(transformType).not.toBe("ViewStyle['transform']");
  });

  it('does not duplicate flattened parent properties in nested mode', () => {
    const result = analyzeType({
      filePath: path.join(workspaceRoot, 'packages/mobile/src/buttons/SlideButton.tsx'),
      includeNestedOrigins: true,
      symbolName: 'SlideButtonHandleProps',
    });

    expect(getGroup(result, 'PressableProps')?.properties).toEqual([]);
    expect(getGroup(result, 'PressableBaseProps')?.properties).toEqual([]);

    const onPressOrigins = getProperty(result, 'onPress')?.origins.map(
      (origin) => origin.groupName,
    );
    expect(onPressOrigins).toEqual(['NativePressableProps']);

    const styleOrigins = getProperty(result, 'style')?.origins.map((origin) => origin.groupName);
    expect(styleOrigins).toEqual(['NativePressableProps', 'inline']);
  });

  it('treats node_modules types as nested leaves', () => {
    const result = analyzeType({
      filePath: path.join(workspaceRoot, 'packages/mobile/src/buttons/SlideButton.tsx'),
      includeNestedOrigins: true,
      symbolName: 'SlideButtonHandleProps',
    });

    const nodeModulesGroups = result.groups.filter((group) =>
      group.declarationLocation?.filePath.includes('/node_modules/'),
    );
    const nodeModulesGroupIds = new Set(nodeModulesGroups.map((group) => group.id));
    const nativePressableProps = nodeModulesGroups.find(
      (group) => group.name === 'NativePressableProps' && group.kind === 'type-reference',
    );

    expect(getGroup(result, 'AccessibilityProps')?.properties).toContain('aria-busy');
    expect(nativePressableProps?.properties).toContain('onLayout');
    expect(
      result.groups.some((group) => group.parentId && nodeModulesGroupIds.has(group.parentId)),
    ).toBe(false);
  });
});

type AnalysisLike = ReturnType<typeof analyzeType>;

function getGroup(result: AnalysisLike, groupName: string) {
  return result.groups.find((group) => group.name === groupName);
}

function getProperty(result: AnalysisLike, propertyName: string) {
  return result.properties.find((property) => property.name === propertyName);
}
