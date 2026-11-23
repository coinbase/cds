import {
  iconDuplicateProblem,
  iconSetNameProblem,
  iconVariants,
  iconVariantsProblem,
  parseIconVariant,
  parseIconVariantName,
} from '../profile';

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

describe('parseIconVariant', () => {
  const problem = (componentName: string) => {
    const parsed = parseIconVariant('add', componentName);
    return 'problem' in parsed ? parsed.problem : undefined;
  };

  it('reads the size as a number and the state as a boolean', () => {
    expect(parseIconVariant('add', 'size=24, active=false')).toEqual({ size: 24, active: false });
  });

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

describe('iconVariantsProblem', () => {
  const complete = iconVariants.sizes.flatMap((size) =>
    iconVariants.states.map((active) => ({ size, active })),
  );

  it('accepts exactly the expected variants, in any order', () => {
    expect(iconVariantsProblem('ui/cash', complete)).toBeUndefined();
    expect(iconVariantsProblem('ui/cash', [...complete].reverse())).toBeUndefined();
  });

  it('reports a set with no variants', () => {
    expect(iconVariantsProblem('ui/cash', [])).toContain('because it has no variants');
  });

  it('names every missing variant', () => {
    const problem = iconVariantsProblem(
      'ui/cash',
      complete.filter(({ size }) => size !== 16),
    );
    expect(problem).toContain('it is missing "size=16, active=true", "size=16, active=false"');
    expect(problem).toContain('Every icon set needs exactly the sizes 12, 16, 24');
  });

  it('reports a variant that appears twice', () => {
    expect(iconVariantsProblem('ui/cash', [...complete, { size: 24, active: true }])).toContain(
      'it has "size=24, active=true" more than once',
    );
  });

  it('reports a variant that should not be there', () => {
    expect(iconVariantsProblem('ui/cash', [...complete, { size: 20, active: false }])).toContain(
      'it has the unexpected "size=20, active=false"',
    );
  });

  it('reports every problem of one set together', () => {
    const problem = iconVariantsProblem('ui/cash', [
      ...complete.filter(({ size }) => size !== 12),
      { size: 20, active: true },
    ]);
    expect(problem).toContain('it is missing');
    expect(problem).toContain(' and it has the unexpected');
  });
});

describe('iconDuplicateProblem', () => {
  it('says two icon sets have the same icon name', () => {
    expect(iconDuplicateProblem('ui/cash', 'cash', 'cash')).toBe(
      'Icon set "ui/cash" is skipped because the Figma file has two icon sets with the icon name "cash" (the part after "ui/" or "nav/"). Rename one of them.',
    );
  });

  it('says when the names only differ in capitalization', () => {
    expect(iconDuplicateProblem('ui/Cash', 'Cash', 'cash')).toContain(
      'differs only in capitalization from "cash"',
    );
  });
});
