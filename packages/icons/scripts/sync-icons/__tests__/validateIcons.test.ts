import { stringToObject } from '../stringToObject';
import { iconPropsProblem, iconSetNameProblem } from '../validateIcons';

describe('iconSetNameProblem', () => {
  it.each(['ui/add', 'nav/home', ' ui/add '])('accepts "%s"', (name) => {
    expect(iconSetNameProblem(name)).toBeUndefined();
  });

  it.each(['add', 'ui/', 'icons/add', 'ui/add/extra'])(
    'rejects "%s" and says how to fix it',
    (name) => {
      expect(iconSetNameProblem(name)).toContain('Rename the icon set in Figma');
    },
  );
});

describe('iconPropsProblem', () => {
  const problem = (componentName: string) =>
    iconPropsProblem('add', componentName, stringToObject(componentName));

  it('accepts a component named after a size and an active state', () => {
    expect(problem('size=24, active=false')).toBeUndefined();
    expect(problem('active=true, size=16')).toBeUndefined();
  });

  it('names the component and the property that is wrong', () => {
    expect(problem('active=false')).toContain('is missing a "size" property');
    expect(problem('size=large, active=false')).toContain('"size" that is not a number');
    expect(problem('size=24')).toContain('is missing an "active" property');
    expect(problem('size=24, active=maybe')).toContain('"active" that is not true or false');
    expect(problem('size=24')).toContain('"size=24" in icon set "add"');
  });

  it('explains the expected format', () => {
    expect(problem('Default')).toContain('Name icon components like "size=24, active=false"');
  });
});
