import { profile } from '../profile';
import {
  duplicateProblem,
  iconNameOf,
  iconVariantsProblem,
  isSafeIconName,
  parseIconVariant,
  svgNameOf,
} from '../rules';

const [firstSize, ...otherSizes] = profile.variants.sizes;
const expectedSize = (size: string) => (profile.variants.sizeIsNumber ? Number(size) : size);
const allVariants = profile.variants.sizes.flatMap((size) =>
  [true, false].map((active) => ({ size: expectedSize(size), active })),
);

describe('isSafeIconName / iconNameOf', () => {
  it.each(['add', 'backArrow', 'add-circle', 'add_2'])('accepts "%s"', (name) => {
    expect(isSafeIconName(name)).toBe(true);
  });

  it.each(['add circle', 'a/b', '../x', ''])('rejects "%s"', (name) => {
    expect(isSafeIconName(name)).toBe(false);
  });

  it('gives the icon name of a component set name that follows the profile', () => {
    expect(iconNameOf('ui/add')).toEqual({ name: 'add' });
  });

  it('says what is wrong with a name that has characters that are not allowed', () => {
    const parsed = iconNameOf('ui/bad name');
    expect('problem' in parsed && parsed.problem).toContain('characters that are not allowed');
  });

  it('says what is wrong with a name the profile does not accept', () => {
    expect(iconNameOf('')).toHaveProperty('problem');
  });
});

describe('parseIconVariant', () => {
  it('reads the size and the state of an icon component', () => {
    expect(parseIconVariant('add', `size=${firstSize}, active=false`)).toEqual({
      size: expectedSize(firstSize),
      active: false,
    });
  });

  it('gives the size as a number or as text, as the profile says', () => {
    const parsed = parseIconVariant('add', `size=${firstSize}, active=true`);
    expect('size' in parsed && typeof parsed.size).toBe(
      profile.variants.sizeIsNumber ? 'number' : 'string',
    );
  });

  it.each([
    ['active=true', 'is missing a "size" property'],
    ['size=big, active=true', 'has a "size" that is not a whole number of pixels'],
    ['size=24', 'is missing an "active" property'],
    ['size=24, active=maybe', 'has an "active" that is not true or false'],
  ])('says what is wrong with "%s"', (name, problem) => {
    const parsed = parseIconVariant('add', name);
    expect('problem' in parsed && parsed.problem).toContain(problem);
    expect('problem' in parsed && parsed.problem).toContain(`"${name}" in icon set "add"`);
  });
});

describe('iconVariantsProblem', () => {
  it('accepts every size of the profile, each active and inactive', () => {
    expect(iconVariantsProblem('add', allVariants)).toBeUndefined();
  });

  it('says what is missing', () => {
    const problem = iconVariantsProblem('add', allVariants.slice(1));
    expect(problem).toContain(`it is missing "size=${firstSize}, active=true"`);
    expect(problem).toContain(`exactly the sizes ${profile.variants.sizes.join(', ')}`);
  });

  it('says what is repeated and what is unexpected', () => {
    expect(iconVariantsProblem('add', [...allVariants, allVariants[0]])).toContain(
      `it has "size=${firstSize}, active=true" more than once`,
    );
    expect(iconVariantsProblem('add', [...allVariants, { size: 99, active: true }])).toContain(
      'it has the unexpected "size=99, active=true"',
    );
  });

  it('says a set with no variants has none', () => {
    expect(iconVariantsProblem('add', [])).toContain('it has no variants');
  });

  it('has a problem when a size is missing entirely', () => {
    if (otherSizes.length === 0) return;
    const withoutLast = allVariants.filter(
      ({ size }) => size !== expectedSize(otherSizes[otherSizes.length - 1]),
    );
    expect(iconVariantsProblem('add', withoutLast)).toContain('it is missing');
  });
});

describe('svgNameOf / duplicateProblem', () => {
  it('names an SVG file after the icon, its size and its state', () => {
    expect(svgNameOf('add', 24, true)).toBe('add-24-active');
    expect(svgNameOf('add-circle', '12', false)).toBe('add-circle-12-inactive');
  });

  it('names the icon in the problem of a name clash', () => {
    expect(duplicateProblem('add')).toContain('two icon sets with the icon name "add"');
  });
});
