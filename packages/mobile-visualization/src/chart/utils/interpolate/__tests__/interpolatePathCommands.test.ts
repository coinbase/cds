import { interpolatePathCommands } from '../interpolatePath';
import type { PathCommand } from '../split';

const approxMaxT = 0.999999999999;
const epsilon = 0.001;

const approximatelyEqualCommands = (a: PathCommand[], b: PathCommand[]): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    const aCommand = a[i];
    const bCommand = b[i];

    if (Object.keys(aCommand).length !== Object.keys(bCommand).length) {
      return false;
    }

    for (const key of Object.keys(aCommand)) {
      const typedKey = key as keyof PathCommand;
      const aValue = aCommand[typedKey];
      const bValue = bCommand[typedKey];

      if (typeof aValue === 'string' || typeof bValue === 'string') {
        if (aValue !== bValue) {
          return false;
        }
        continue;
      }

      if (Math.abs((aValue ?? 0) - (bValue ?? 0)) > epsilon) {
        return false;
      }
    }
  }

  return true;
};

describe('interpolatePathCommands', () => {
  it('interpolates line to line when command lengths match', () => {
    const a: PathCommand[] = [
      { type: 'M', x: 0, y: 0 },
      { type: 'L', x: 10, y: 10 },
      { type: 'L', x: 100, y: 100 },
    ];
    const b: PathCommand[] = [
      { type: 'M', x: 10, y: 10 },
      { type: 'L', x: 20, y: 20 },
      { type: 'L', x: 200, y: 200 },
    ];

    const interpolator = interpolatePathCommands(a, b);

    expect(interpolator(0)).toEqual(a);
    expect(interpolator(1)).toEqual(b);
    expect(interpolator(0.5)).toEqual([
      { type: 'M', x: 5, y: 5 },
      { type: 'L', x: 15, y: 15 },
      { type: 'L', x: 150, y: 150 },
    ]);
  });

  it('handles extending when A has more points than B', () => {
    const a: PathCommand[] = [
      { type: 'M', x: 0, y: 0 },
      { type: 'L', x: 10, y: 10 },
      { type: 'L', x: 100, y: 100 },
    ];
    const b: PathCommand[] = [
      { type: 'M', x: 10, y: 10 },
      { type: 'L', x: 20, y: 20 },
    ];

    const interpolator = interpolatePathCommands(a, b);

    expect(interpolator(0)).toEqual(a);
    expect(interpolator(1)).toEqual(b);
    expect(
      approximatelyEqualCommands(interpolator(approxMaxT), [
        { type: 'M', x: 10, y: 10 },
        { type: 'L', x: 15, y: 15 },
        { type: 'L', x: 20, y: 20 },
      ]),
    ).toBe(true);
  });

  it('handles extending when B has more points than A', () => {
    const a: PathCommand[] = [
      { type: 'M', x: 0, y: 0 },
      { type: 'L', x: 10, y: 10 },
    ];
    const b: PathCommand[] = [
      { type: 'M', x: 10, y: 10 },
      { type: 'L', x: 20, y: 20 },
      { type: 'L', x: 200, y: 200 },
    ];

    const interpolator = interpolatePathCommands(a, b);

    expect(interpolator(0)).toEqual([
      { type: 'M', x: 0, y: 0 },
      { type: 'L', x: 5, y: 5 },
      { type: 'L', x: 10, y: 10 },
    ]);
    expect(interpolator(1)).toEqual(b);
  });

  it('handles null inputs', () => {
    const b: PathCommand[] = [
      { type: 'M', x: 10, y: 10 },
      { type: 'L', x: 20, y: 20 },
      { type: 'L', x: 200, y: 200 },
    ];

    const fromNull = interpolatePathCommands(null, b);
    expect(fromNull(0)).toEqual([
      { type: 'M', x: 10, y: 10 },
      { type: 'L', x: 10, y: 10 },
      { type: 'L', x: 10, y: 10 },
    ]);
    expect(fromNull(1)).toEqual(b);

    const toNull = interpolatePathCommands(b, null);
    expect(toNull(0)).toEqual(b);
    expect(toNull(1)).toEqual([]);
  });

  it('handles paths ending in Z', () => {
    const a: PathCommand[] = [{ type: 'M', x: 0, y: 0 }, { type: 'Z' }];
    const b: PathCommand[] = [
      { type: 'M', x: 10, y: 10 },
      { type: 'L', x: 20, y: 20 },
      { type: 'Z' },
    ];

    const interpolator = interpolatePathCommands(a, b);

    expect(interpolator(0)).toEqual([
      { type: 'M', x: 0, y: 0 },
      { type: 'L', x: 0, y: 0 },
      { type: 'Z' },
    ]);
    expect(interpolator(1)).toEqual(b);
    expect(interpolator(0.5)).toEqual([
      { type: 'M', x: 5, y: 5 },
      { type: 'L', x: 10, y: 10 },
      { type: 'Z' },
    ]);
  });
});
