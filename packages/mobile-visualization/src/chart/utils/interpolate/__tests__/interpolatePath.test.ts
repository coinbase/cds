import interpolatePath from '../interpolatePath';

const epsilon = 0.001;

const pathToItems = (path: string): Array<string | number> =>
  path
    .split(/([MLCSTQAHVZmlcstqahv]|-?[\d.e+-]+)/)
    .filter((item) => item !== '' && item !== ',')
    .map((item) => (isNaN(+item) ? item : +item));

const approximatelyEqual = (path1: string, path2: string): boolean => {
  const items1 = pathToItems(path1);
  const items2 = pathToItems(path2);

  if (items1.length !== items2.length) {
    return false;
  }

  for (let i = 0; i < items1.length; i++) {
    const left = items1[i];
    const right = items2[i];

    if (typeof left === 'string' || typeof right === 'string') {
      if (left !== right) {
        return false;
      }
      continue;
    }

    if (Math.abs(left - right) > epsilon) {
      return false;
    }
  }

  return true;
};

describe('interpolatePath', () => {
  it('interpolates line to line when lengths match', () => {
    const a = 'M0,0L10,10L100,100';
    const b = 'M10,10L20,20L200,200';

    const interpolator = interpolatePath(a, b);

    expect(interpolator(0)).toBe(a);
    expect(interpolator(1)).toBe(b);
    expect(interpolator(0.5)).toBe('M5,5L15,15L150,150');
  });

  it('interpolates when A has more points than B', () => {
    const a = 'M0,0L10,10L100,100';
    const b = 'M10,10L20,20';

    const interpolator = interpolatePath(a, b);

    expect(interpolator(0)).toBe(a);
    expect(interpolator(1)).toBe(b);
    expect(approximatelyEqual(interpolator(0.999999999999), 'M10,10L15,15L20,20')).toBe(true);
  });

  it('interpolates when B has more points than A', () => {
    const a = 'M0,0L10,10';
    const b = 'M10,10L20,20L200,200';

    const interpolator = interpolatePath(a, b);

    expect(interpolator(0)).toBe('M0,0L5,5L10,10');
    expect(interpolator(1)).toBe(b);
  });

  it('handles null inputs safely', () => {
    const b = 'M10,10L20,20L200,200';
    const fromNull = interpolatePath(null, b);
    const toNull = interpolatePath(b, null);
    const bothNull = interpolatePath(null, null);

    expect(fromNull(0)).toBe('M10,10L10,10L10,10');
    expect(fromNull(1)).toBe(b);

    expect(toNull(0)).toBe(b);
    expect(toNull(1)).toBe('');

    expect(bothNull(0)).toBe('');
    expect(bothNull(1)).toBe('');
  });

  it('handles Z path commands', () => {
    const a = 'M0,0Z';
    const b = 'M10,10L20,20Z';
    const interpolator = interpolatePath(a, b);

    expect(interpolator(0)).toBe('M0,0L0,0Z');
    expect(interpolator(1)).toBe(b);
    expect(interpolator(0.5)).toBe('M5,5L10,10Z');
  });

  it('parses scientific notation and negatives', () => {
    const a = 'M-1e2,-2e1L0,0';
    const b = 'M-2e2,-4e1L100,100';
    const interpolator = interpolatePath(a, b);

    expect(approximatelyEqual(interpolator(0.5), 'M-150,-30L50,50')).toBe(true);
  });
});
