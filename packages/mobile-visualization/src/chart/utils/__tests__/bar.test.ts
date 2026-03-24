import {
  applyBarMinSize,
  applyBorderRadiusLogic,
  applyStackGap,
  applyStackMinSize,
  getBarInitialOrigins,
  getBarInitialRect,
  getBarSizeAdjustment,
  getInitialValueRange,
  getNormalizedStagger,
} from '../bar';

jest.mock('@shopify/react-native-skia', () => ({
  Skia: { Path: { Make: jest.fn(), MakeFromSVGString: jest.fn() } },
  notifyChange: jest.fn(),
}));

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Vertical layout: baseline at bottom (y=300), bars grow upward */
const VERTICAL_BASELINE = 300;
/** Horizontal layout: baseline at left (x=0), bars grow rightward */
const HORIZONTAL_BASELINE = 0;

function bar(
  seriesId: string,
  valuePos: number,
  length: number,
  dataValue: [number, number],
  extra: { shouldApplyGap?: boolean } = {},
) {
  return { seriesId, valuePos, length, dataValue, shouldApplyGap: true, ...extra };
}

function roundedBar(
  seriesId: string,
  valuePos: number,
  length: number,
  dataValue: [number, number],
  extra: { shouldApplyGap?: boolean; roundTop?: boolean; roundBottom?: boolean } = {},
) {
  return {
    seriesId,
    valuePos,
    length,
    dataValue,
    shouldApplyGap: true,
    roundTop: true,
    roundBottom: true,
    ...extra,
  };
}

// ─── getBarSizeAdjustment ─────────────────────────────────────────────────────

describe('getBarSizeAdjustment', () => {
  it('returns 0 when barCount is 0', () => {
    expect(getBarSizeAdjustment(0, 10)).toBe(0);
  });

  it('returns 0 when barCount is 1', () => {
    expect(getBarSizeAdjustment(1, 10)).toBe(0);
  });

  it('calculates correct adjustment for 2 bars', () => {
    expect(getBarSizeAdjustment(2, 10)).toBe(5);
  });

  it('calculates correct adjustment for 3 bars', () => {
    expect(getBarSizeAdjustment(3, 12)).toBe(8);
  });

  it('calculates correct adjustment for 4 bars', () => {
    expect(getBarSizeAdjustment(4, 15)).toBe(11.25);
  });

  it('handles zero gap size', () => {
    expect(getBarSizeAdjustment(3, 0)).toBe(0);
  });

  it('handles negative gap size', () => {
    expect(getBarSizeAdjustment(3, -6)).toBe(-4);
  });

  it('handles fractional bar count', () => {
    expect(getBarSizeAdjustment(2.5, 10)).toBe(6);
  });

  it('handles large numbers', () => {
    expect(getBarSizeAdjustment(100, 1000)).toBe(990);
  });
});

// ─── applyStackGap ────────────────────────────────────────────────────────────

describe('applyStackGap', () => {
  describe('no-op cases', () => {
    it('returns bars unchanged when stackGap is 0', () => {
      const bars = [bar('a', 200, 100, [0, 10])];
      expect(applyStackGap(bars, 0, true, VERTICAL_BASELINE)).toBe(bars);
    });

    it('returns bars unchanged when only 1 bar', () => {
      const bars = [bar('a', 200, 100, [0, 10])];
      expect(applyStackGap(bars, 4, true, VERTICAL_BASELINE)).toBe(bars);
    });

    it('does not apply gap to bars with shouldApplyGap=false', () => {
      const bars = [
        bar('a', 200, 50, [0, 5], { shouldApplyGap: false }),
        bar('b', 150, 50, [5, 10], { shouldApplyGap: false }),
      ];
      const result = applyStackGap(bars, 4, true, VERTICAL_BASELINE);
      expect(result[0].length).toBe(50);
      expect(result[1].length).toBe(50);
    });
  });

  describe('vertical layout — positive bars (grow upward)', () => {
    it('shrinks both bars proportionally and inserts gap', () => {
      const bars = [bar('a', 250, 50, [0, 5]), bar('b', 200, 50, [5, 10])];
      const result = applyStackGap(bars, 4, true, VERTICAL_BASELINE);
      const totalLength = result.reduce((s, b) => s + b.length, 0);
      expect(totalLength + 4).toBeCloseTo(100);
      const aBar = result.find((b) => b.seriesId === 'a')!;
      const bBar = result.find((b) => b.seriesId === 'b')!;
      expect(aBar.valuePos - (bBar.valuePos + bBar.length)).toBeCloseTo(4);
    });

    it('bottom bar starts at baseline', () => {
      const bars = [bar('a', 250, 50, [0, 5]), bar('b', 200, 50, [5, 10])];
      const result = applyStackGap(bars, 4, true, VERTICAL_BASELINE);
      const aBar = result.find((b) => b.seriesId === 'a')!;
      expect(aBar.valuePos + aBar.length).toBeCloseTo(VERTICAL_BASELINE);
    });
  });

  describe('vertical layout — negative bars (grow downward)', () => {
    it('shrinks bars and inserts gap', () => {
      const bars = [bar('a', 300, 50, [-5, 0]), bar('b', 350, 50, [-10, -5])];
      const result = applyStackGap(bars, 4, true, VERTICAL_BASELINE);
      const totalLength = result.reduce((s, b) => s + b.length, 0);
      expect(totalLength + 4).toBeCloseTo(100);
    });

    it('top bar starts at baseline', () => {
      const bars = [bar('a', 300, 50, [-5, 0]), bar('b', 350, 50, [-10, -5])];
      const result = applyStackGap(bars, 4, true, VERTICAL_BASELINE);
      const aBar = result.find((b) => b.seriesId === 'a')!;
      expect(aBar.valuePos).toBeCloseTo(VERTICAL_BASELINE);
    });
  });

  describe('horizontal layout — positive bars (grow rightward)', () => {
    it('shrinks bars and inserts gap', () => {
      const bars = [bar('a', 0, 50, [0, 5]), bar('b', 50, 50, [5, 10])];
      const result = applyStackGap(bars, 4, false, HORIZONTAL_BASELINE);
      const totalLength = result.reduce((s, b) => s + b.length, 0);
      expect(totalLength + 4).toBeCloseTo(100);
    });

    it('first bar starts at baseline', () => {
      const bars = [bar('a', 0, 50, [0, 5]), bar('b', 50, 50, [5, 10])];
      const result = applyStackGap(bars, 4, false, HORIZONTAL_BASELINE);
      const aBar = result.find((b) => b.seriesId === 'a')!;
      expect(aBar.valuePos).toBeCloseTo(HORIZONTAL_BASELINE);
    });
  });

  describe('three bars in a vertical stack', () => {
    it('distributes two gaps proportionally', () => {
      const bars = [
        bar('a', 240, 60, [0, 6]),
        bar('b', 180, 60, [6, 12]),
        bar('c', 120, 60, [12, 18]),
      ];
      const result = applyStackGap(bars, 4, true, VERTICAL_BASELINE);
      const totalLength = result.reduce((s, b) => s + b.length, 0);
      expect(totalLength + 8).toBeCloseTo(180);
      const sorted = [...result].sort((a, b) => b.valuePos - a.valuePos);
      const gap1 = sorted[0].valuePos - (sorted[1].valuePos + sorted[1].length);
      const gap2 = sorted[1].valuePos - (sorted[2].valuePos + sorted[2].length);
      expect(gap1).toBeCloseTo(4);
      expect(gap2).toBeCloseTo(4);
    });
  });

  describe('mixed positive + negative bars (gains/losses pattern)', () => {
    const gainsBar = (vp: number, len: number, val: number) => bar('gains', vp, len, [0, val]);
    const lossesBar = (vp: number, len: number, val: number) => bar('losses', vp, len, [val, 0]);

    it('one positive + one negative: no gap applied to either (different sides)', () => {
      const bars = [gainsBar(250, 50, 5), lossesBar(300, 40, -4)];
      const result = applyStackGap(bars, 4, true, VERTICAL_BASELINE);
      expect(result.find((b) => b.seriesId === 'gains')!.valuePos).toBe(250);
      expect(result.find((b) => b.seriesId === 'gains')!.length).toBe(50);
      expect(result.find((b) => b.seriesId === 'losses')!.valuePos).toBe(300);
      expect(result.find((b) => b.seriesId === 'losses')!.length).toBe(40);
    });

    it('positive bar stays ABOVE baseline — not repositioned into negative territory', () => {
      const bars = [gainsBar(250, 50, 5), lossesBar(300, 40, -4)];
      const result = applyStackGap(bars, 4, true, VERTICAL_BASELINE);
      const gains = result.find((b) => b.seriesId === 'gains')!;
      expect(gains.valuePos + gains.length).toBeCloseTo(VERTICAL_BASELINE);
      expect(gains.valuePos).toBeLessThan(VERTICAL_BASELINE);
    });

    it('gap applied between two positive bars but not to the negative bar', () => {
      const bars = [
        bar('gain1', 250, 30, [0, 3]),
        bar('gain2', 220, 20, [3, 5]),
        bar('losses', 300, 40, [-4, 0]),
      ];
      const result = applyStackGap(bars, 4, true, VERTICAL_BASELINE);
      const losses = result.find((b) => b.seriesId === 'losses')!;
      expect(losses.valuePos).toBe(300);
      expect(losses.length).toBe(40);
      const g1 = result.find((b) => b.seriesId === 'gain1')!;
      const g2 = result.find((b) => b.seriesId === 'gain2')!;
      const bottomBar = g1.valuePos > g2.valuePos ? g1 : g2;
      const topBar = g1.valuePos > g2.valuePos ? g2 : g1;
      expect(bottomBar.valuePos - (topBar.valuePos + topBar.length)).toBeCloseTo(4);
    });

    it('gap applied between two negative bars but not to the positive bar', () => {
      const bars = [
        bar('gains', 250, 50, [0, 5]),
        bar('loss1', 300, 30, [-3, 0]),
        bar('loss2', 330, 20, [-5, -3]),
      ];
      const result = applyStackGap(bars, 4, true, VERTICAL_BASELINE);
      const gains = result.find((b) => b.seriesId === 'gains')!;
      expect(gains.valuePos).toBe(250);
      expect(gains.length).toBe(50);
      const l1 = result.find((b) => b.seriesId === 'loss1')!;
      const l2 = result.find((b) => b.seriesId === 'loss2')!;
      const upperLoss = l1.valuePos < l2.valuePos ? l1 : l2;
      const lowerLoss = l1.valuePos < l2.valuePos ? l2 : l1;
      expect(lowerLoss.valuePos - (upperLoss.valuePos + upperLoss.length)).toBeCloseTo(4);
    });
  });
});

// ─── applyBarMinSize ──────────────────────────────────────────────────────────

describe('applyBarMinSize', () => {
  describe('no-op cases', () => {
    it('returns bars unchanged when barMinSize is 0', () => {
      const bars = [bar('a', 250, 50, [0, 5])];
      expect(applyBarMinSize(bars, 0, true, VERTICAL_BASELINE)).toBe(bars);
    });

    it('returns bars unchanged when empty', () => {
      expect(applyBarMinSize([], 6, true, VERTICAL_BASELINE)).toEqual([]);
    });

    it('does not change bars that already meet minimum size', () => {
      const bars = [bar('a', 250, 50, [0, 5])];
      const result = applyBarMinSize(bars, 6, true, VERTICAL_BASELINE);
      expect(result[0].length).toBe(50);
    });
  });

  describe('single bar expansion — vertical', () => {
    it('expands a positive bar to barMinSize', () => {
      const bars = [bar('a', 298, 2, [0, 1])];
      const result = applyBarMinSize(bars, 6, true, VERTICAL_BASELINE);
      expect(result[0].length).toBe(6);
    });

    it('expanded positive bar stays anchored to baseline', () => {
      const bars = [bar('a', 298, 2, [0, 1])];
      const result = applyBarMinSize(bars, 6, true, VERTICAL_BASELINE);
      expect(result[0].valuePos + result[0].length).toBeCloseTo(VERTICAL_BASELINE);
    });

    it('expands a negative bar to barMinSize', () => {
      const bars = [bar('a', 300, 2, [-1, 0])];
      const result = applyBarMinSize(bars, 6, true, VERTICAL_BASELINE);
      expect(result[0].length).toBe(6);
    });

    it('expanded negative bar stays anchored to baseline', () => {
      const bars = [bar('a', 300, 2, [-1, 0])];
      const result = applyBarMinSize(bars, 6, true, VERTICAL_BASELINE);
      expect(result[0].valuePos).toBeCloseTo(VERTICAL_BASELINE);
    });
  });

  describe('single bar expansion — horizontal', () => {
    it('expands a positive (right-side) bar to barMinSize', () => {
      const bars = [bar('a', 0, 2, [0, 1])];
      const result = applyBarMinSize(bars, 6, false, HORIZONTAL_BASELINE);
      expect(result[0].length).toBe(6);
    });

    it('expanded horizontal positive bar starts at baseline', () => {
      const bars = [bar('a', 0, 2, [0, 1])];
      const result = applyBarMinSize(bars, 6, false, HORIZONTAL_BASELINE);
      expect(result[0].valuePos).toBeCloseTo(HORIZONTAL_BASELINE);
    });
  });

  describe('stacked bars — overflow prevention (scaling)', () => {
    it('expands small bar and scales large bar so total stays constant', () => {
      const bars = [bar('buy', 0, 299, [0, 299]), bar('sell', 299, 1, [299, 300])];
      const result = applyBarMinSize(bars, 6, false, HORIZONTAL_BASELINE);
      const totalLength = result.reduce((s, b) => s + b.length, 0);
      expect(totalLength).toBeCloseTo(300);
    });

    it('expanded bar gets exactly barMinSize', () => {
      const bars = [bar('buy', 0, 299, [0, 299]), bar('sell', 299, 1, [299, 300])];
      const result = applyBarMinSize(bars, 6, false, HORIZONTAL_BASELINE);
      expect(result.find((b) => b.seriesId === 'sell')!.length).toBe(6);
    });

    it('large bar takes remaining space: total - barMinSize', () => {
      const bars = [bar('buy', 0, 299, [0, 299]), bar('sell', 299, 1, [299, 300])];
      const result = applyBarMinSize(bars, 6, false, HORIZONTAL_BASELINE);
      expect(result.find((b) => b.seriesId === 'buy')!.length).toBeCloseTo(294);
    });

    it('bars are restacked contiguously from baseline', () => {
      const bars = [bar('buy', 0, 299, [0, 299]), bar('sell', 299, 1, [299, 300])];
      const result = applyBarMinSize(bars, 6, false, HORIZONTAL_BASELINE);
      const sorted = [...result].sort((a, b) => a.valuePos - b.valuePos);
      expect(sorted[0].valuePos).toBeCloseTo(0);
      expect(sorted[1].valuePos).toBeCloseTo(sorted[0].valuePos + sorted[0].length);
    });
  });

  describe('extreme case: buy=7600, sell=24 horizontal', () => {
    const totalPx = 300;
    const buyFraction = 7600 / 7624;
    const sellFraction = 24 / 7624;
    const buyPx = totalPx * buyFraction;
    const sellPx = totalPx * sellFraction;

    it('sell bar gets exactly barMinSize', () => {
      const bars = [bar('buy', 0, buyPx, [0, 7600]), bar('sell', buyPx, sellPx, [7600, 7624])];
      const result = applyBarMinSize(bars, 6, false, HORIZONTAL_BASELINE);
      expect(result.find((b) => b.seriesId === 'sell')!.length).toBe(6);
    });

    it('total bar length equals original total (no overflow)', () => {
      const bars = [bar('buy', 0, buyPx, [0, 7600]), bar('sell', buyPx, sellPx, [7600, 7624])];
      const result = applyBarMinSize(bars, 6, false, HORIZONTAL_BASELINE);
      const total = result.reduce((s, b) => s + b.length, 0);
      expect(total).toBeCloseTo(totalPx);
    });
  });
});

// ─── range bars (shouldApplyGap=false) ───────────────────────────────────────

describe('range bars (shouldApplyGap=false) — expand in-place', () => {
  const FAR_BASELINE = 1027;

  it('single tiny range bar expands to barMinSize, centered on original midpoint', () => {
    const bars = [bar('price', 220, 2, [29000, 29050], { shouldApplyGap: false })];
    const result = applyBarMinSize(bars, 4, true, FAR_BASELINE);
    expect(result[0].length).toBe(4);
    expect(result[0].valuePos).toBe(219);
  });

  it('range bar larger than barMinSize is left in-place', () => {
    const bars = [bar('price', 100, 20, [28000, 37000], { shouldApplyGap: false })];
    const result = applyBarMinSize(bars, 4, true, FAR_BASELINE);
    expect(result[0].valuePos).toBe(100);
    expect(result[0].length).toBe(20);
  });

  it('expanded bar stays within chart area — not sent to far baseline', () => {
    const bars = [bar('price', 200, 1, [29000, 29010], { shouldApplyGap: false })];
    const result = applyBarMinSize(bars, 4, true, FAR_BASELINE);
    expect(result[0].valuePos).toBeGreaterThan(0);
    expect(result[0].valuePos).toBeLessThan(250);
  });

  it('horizontal range bar expands in-place centered on original midpoint', () => {
    const bars = [bar('price', 50, 2, [29000, 29050], { shouldApplyGap: false })];
    const result = applyBarMinSize(bars, 4, false, FAR_BASELINE);
    expect(result[0].length).toBe(4);
    expect(result[0].valuePos).toBe(49);
  });

  it('multiple range bars each expand around their own midpoints independently', () => {
    const bars = [
      bar('candle1', 100, 1, [29000, 29010], { shouldApplyGap: false }),
      bar('candle2', 150, 1, [30000, 30010], { shouldApplyGap: false }),
    ];
    const result = applyBarMinSize(bars, 4, true, FAR_BASELINE);
    expect(result.find((b) => b.seriesId === 'candle1')!.valuePos).toBeCloseTo(98.5);
    expect(result.find((b) => b.seriesId === 'candle2')!.valuePos).toBeCloseTo(148.5);
  });
});

// ─── applyStackMinSize ────────────────────────────────────────────────────────

const DEFAULT_BOUNDS = { x: 50, y: 0, width: 10, height: 0 };

describe('applyStackMinSize', () => {
  describe('no-op cases', () => {
    it('returns unchanged when stackSize >= stackMinSize', () => {
      const bars = [bar('a', 270, 30, [0, 3])];
      const bounds = { x: 50, y: 270, width: 10, height: 30 };
      const result = applyStackMinSize(bars, 20, 30, bounds, true, 50, 10, VERTICAL_BASELINE);
      expect(result.bars).toBe(bars);
      expect(result.stackBounds).toBe(bounds);
    });

    it('returns unchanged when stackMinSize is 0', () => {
      const bars = [bar('a', 298, 2, [0, 1])];
      const result = applyStackMinSize(bars, 0, 2, DEFAULT_BOUNDS, true, 50, 10, VERTICAL_BASELINE);
      expect(result.bars).toBe(bars);
    });

    it('returns unchanged when bars array is empty — stackBounds stays finite', () => {
      // An empty stack (all-null category) must not produce Infinity/-Infinity in the bounds.
      // stackBounds coming in already has height=0, y=baseline from BarStack.tsx.
      const bounds = { x: 50, y: VERTICAL_BASELINE, width: 10, height: 0 };
      const result = applyStackMinSize([], 3, 0, bounds, true, 50, 10, VERTICAL_BASELINE);
      expect(result.bars).toEqual([]);
      expect(result.stackBounds).toBe(bounds);
      expect(isFinite(result.stackBounds.y)).toBe(true);
      expect(isFinite(result.stackBounds.height)).toBe(true);
    });
  });

  describe('single bar — vertical positive', () => {
    it('expands bar length to stackMinSize', () => {
      const bars = [bar('a', 295, 5, [0, 1])];
      const bounds = { x: 50, y: 295, width: 10, height: 5 };
      const { bars: result } = applyStackMinSize(
        bars,
        20,
        5,
        bounds,
        true,
        50,
        10,
        VERTICAL_BASELINE,
      );
      expect(result[0].length).toBe(20);
    });

    it('bar bottom stays at baseline', () => {
      const bars = [bar('a', 295, 5, [0, 1])];
      const bounds = { x: 50, y: 295, width: 10, height: 5 };
      const { bars: result } = applyStackMinSize(
        bars,
        20,
        5,
        bounds,
        true,
        50,
        10,
        VERTICAL_BASELINE,
      );
      expect(result[0].valuePos + result[0].length).toBeCloseTo(VERTICAL_BASELINE);
    });

    it('updates stackBounds height', () => {
      const bars = [bar('a', 295, 5, [0, 1])];
      const bounds = { x: 50, y: 295, width: 10, height: 5 };
      const { stackBounds } = applyStackMinSize(
        bars,
        20,
        5,
        bounds,
        true,
        50,
        10,
        VERTICAL_BASELINE,
      );
      expect(stackBounds.height).toBe(20);
    });
  });

  describe('single bar — horizontal positive', () => {
    it('expands bar length to stackMinSize', () => {
      const bars = [bar('a', 0, 3, [0, 3])];
      const bounds = { x: 0, y: 50, width: 3, height: 10 };
      const { bars: result } = applyStackMinSize(
        bars,
        12,
        3,
        bounds,
        false,
        50,
        10,
        HORIZONTAL_BASELINE,
      );
      expect(result[0].length).toBe(12);
    });

    it('bar starts at baseline', () => {
      const bars = [bar('a', 0, 3, [0, 3])];
      const bounds = { x: 0, y: 50, width: 3, height: 10 };
      const { bars: result } = applyStackMinSize(
        bars,
        12,
        3,
        bounds,
        false,
        50,
        10,
        HORIZONTAL_BASELINE,
      );
      expect(result[0].valuePos).toBeCloseTo(HORIZONTAL_BASELINE);
    });

    it('updates stackBounds width', () => {
      const bars = [bar('a', 0, 3, [0, 3])];
      const bounds = { x: 0, y: 50, width: 3, height: 10 };
      const { stackBounds } = applyStackMinSize(
        bars,
        12,
        3,
        bounds,
        false,
        50,
        10,
        HORIZONTAL_BASELINE,
      );
      expect(stackBounds.width).toBe(12);
    });
  });

  describe('multiple bars — vertical scaling', () => {
    it('scales all bars proportionally', () => {
      const bars = [bar('a', 250, 50, [0, 5]), bar('b', 200, 50, [5, 10])];
      const bounds = { x: 50, y: 200, width: 10, height: 100 };
      const { bars: result } = applyStackMinSize(
        bars,
        150,
        100,
        bounds,
        true,
        50,
        10,
        VERTICAL_BASELINE,
      );
      const totalLength = result.reduce((s, b) => s + b.length, 0);
      expect(totalLength).toBeCloseTo(150);
    });

    it('updates stackBounds height', () => {
      const bars = [bar('a', 250, 50, [0, 5]), bar('b', 200, 50, [5, 10])];
      const bounds = { x: 50, y: 200, width: 10, height: 100 };
      const { stackBounds } = applyStackMinSize(
        bars,
        150,
        100,
        bounds,
        true,
        50,
        10,
        VERTICAL_BASELINE,
      );
      expect(stackBounds.height).toBe(150);
    });

    it('bars remain stacked contiguously from baseline', () => {
      const bars = [bar('a', 250, 50, [0, 5]), bar('b', 200, 50, [5, 10])];
      const bounds = { x: 50, y: 200, width: 10, height: 100 };
      const { bars: result } = applyStackMinSize(
        bars,
        150,
        100,
        bounds,
        true,
        50,
        10,
        VERTICAL_BASELINE,
      );
      const sorted = [...result].sort((a, b) => b.valuePos - a.valuePos);
      expect(sorted[0].valuePos + sorted[0].length).toBeCloseTo(VERTICAL_BASELINE);
      expect(sorted[0].valuePos).toBeCloseTo(sorted[1].valuePos + sorted[1].length);
    });
  });

  describe('multiple bars — horizontal scaling', () => {
    it('scales all bars proportionally', () => {
      const bars = [bar('a', 0, 50, [0, 5]), bar('b', 50, 50, [5, 10])];
      const bounds = { x: 0, y: 50, width: 100, height: 10 };
      const { bars: result } = applyStackMinSize(
        bars,
        150,
        100,
        bounds,
        false,
        50,
        10,
        HORIZONTAL_BASELINE,
      );
      const totalLength = result.reduce((s, b) => s + b.length, 0);
      expect(totalLength).toBeCloseTo(150);
    });

    it('updates stackBounds width', () => {
      const bars = [bar('a', 0, 50, [0, 5]), bar('b', 50, 50, [5, 10])];
      const bounds = { x: 0, y: 50, width: 100, height: 10 };
      const { stackBounds } = applyStackMinSize(
        bars,
        150,
        100,
        bounds,
        false,
        50,
        10,
        HORIZONTAL_BASELINE,
      );
      expect(stackBounds.width).toBe(150);
    });
  });

  describe('multiple bars with a gap preserved during scaling', () => {
    it('preserves the gap while scaling both bars', () => {
      const gapSize = 4;
      const bars = [bar('a', 250, 46, [0, 5]), bar('b', 200, 46, [5, 10])];
      const stackSize = 96;
      const bounds = { x: 50, y: 200, width: 10, height: stackSize };
      const { bars: result } = applyStackMinSize(
        bars,
        150,
        stackSize,
        bounds,
        true,
        50,
        10,
        VERTICAL_BASELINE,
      );
      const sorted = [...result].sort((a, b) => b.valuePos - a.valuePos);
      const gap = sorted[0].valuePos - (sorted[1].valuePos + sorted[1].length);
      expect(gap).toBeCloseTo(gapSize);
    });
  });
});

// ─── getBarInitialOrigins ─────────────────────────────────────────────────────

describe('getBarInitialOrigins', () => {
  describe('no-op cases', () => {
    it('returns all baseline when barMinSize is 0', () => {
      const bars = [bar('a', 0, 100, [0, 10]), bar('b', 100, 50, [10, 15])];
      const result = getBarInitialOrigins(bars, 0, 4, HORIZONTAL_BASELINE, false);
      expect(result).toEqual([HORIZONTAL_BASELINE, HORIZONTAL_BASELINE]);
    });

    it('returns all baseline when bars array is empty', () => {
      const result = getBarInitialOrigins([], 6, 4, HORIZONTAL_BASELINE, false);
      expect(result).toEqual([]);
    });

    it('single positive horizontal bar starts at baseline', () => {
      const bars = [bar('a', 0, 100, [0, 10])];
      const result = getBarInitialOrigins(bars, 6, 4, HORIZONTAL_BASELINE, false);
      expect(result[0]).toBe(HORIZONTAL_BASELINE);
    });

    it('single positive vertical bar starts at baseline - minSize (one step up)', () => {
      const bars = [bar('a', 200, 100, [0, 10])];
      const result = getBarInitialOrigins(bars, 6, 4, VERTICAL_BASELINE, true);
      expect(result[0]).toBe(VERTICAL_BASELINE - 6);
    });
  });

  describe('horizontal layout — positive bars (grow rightward)', () => {
    const buyBar = bar('buy', 0, 290, [0, 7600]);
    const sellBar = bar('sell', 290, 10, [7600, 7624]);

    it('buy (closest to baseline) starts at baseline', () => {
      const result = getBarInitialOrigins([buyBar, sellBar], 6, 4, HORIZONTAL_BASELINE, false);
      expect(result[0]).toBe(HORIZONTAL_BASELINE);
    });

    it('sell (further from baseline) starts at baseline + minSize + gap', () => {
      const result = getBarInitialOrigins([buyBar, sellBar], 6, 4, HORIZONTAL_BASELINE, false);
      expect(result[1]).toBe(0 + 6 + 4);
    });

    it('three positive bars are staggered by (minSize + gap) each', () => {
      const bars = [
        bar('a', 0, 100, [0, 5]),
        bar('b', 100, 100, [5, 10]),
        bar('c', 200, 100, [10, 15]),
      ];
      const result = getBarInitialOrigins(bars, 6, 4, HORIZONTAL_BASELINE, false);
      expect(result[0]).toBe(0);
      expect(result[1]).toBe(10);
      expect(result[2]).toBe(20);
    });

    it('zero gap — bars start adjacent to each other', () => {
      const bars = [bar('a', 0, 100, [0, 5]), bar('b', 100, 100, [5, 10])];
      const result = getBarInitialOrigins(bars, 6, 0, HORIZONTAL_BASELINE, false);
      expect(result[0]).toBe(0);
      expect(result[1]).toBe(6);
    });
  });

  describe('horizontal layout — negative bars (grow leftward)', () => {
    const BASELINE = 150;
    const nearBar = bar('near', 142, 8, [-8, 0]);
    const farBar = bar('far', 130, 12, [-20, -8]);

    it('nearest bar starts at baseline - minSize', () => {
      const result = getBarInitialOrigins([nearBar, farBar], 6, 4, BASELINE, false);
      expect(result[0]).toBe(BASELINE - 6);
    });

    it('further bar starts at baseline - 2*minSize - gap', () => {
      const result = getBarInitialOrigins([nearBar, farBar], 6, 4, BASELINE, false);
      expect(result[1]).toBe(BASELINE - 2 * 6 - 4);
    });
  });

  describe('vertical layout — positive bars (grow upward)', () => {
    const aBar = bar('a', 250, 50, [0, 5]);
    const bBar = bar('b', 200, 50, [5, 10]);

    it('bar closest to baseline (largest valuePos) starts at baseline - minSize', () => {
      const result = getBarInitialOrigins([aBar, bBar], 6, 4, VERTICAL_BASELINE, true);
      expect(result[0]).toBe(VERTICAL_BASELINE - 6);
    });

    it('bar further from baseline starts at baseline - 2*minSize - gap', () => {
      const result = getBarInitialOrigins([aBar, bBar], 6, 4, VERTICAL_BASELINE, true);
      expect(result[1]).toBe(VERTICAL_BASELINE - 2 * 6 - 4);
    });

    it('initialY + minSize for bar-0 equals baseline', () => {
      const result = getBarInitialOrigins([aBar, bBar], 6, 4, VERTICAL_BASELINE, true);
      expect(result[0] + 6).toBe(VERTICAL_BASELINE);
    });
  });

  describe('vertical layout — negative bars (grow downward)', () => {
    const nearBar = bar('near', 300, 50, [-5, 0]);
    const farBar = bar('far', 350, 50, [-10, -5]);

    it('bar closest to baseline (smallest valuePos) starts at baseline', () => {
      const result = getBarInitialOrigins([nearBar, farBar], 6, 4, VERTICAL_BASELINE, true);
      expect(result[0]).toBe(VERTICAL_BASELINE);
    });

    it('bar further down starts at baseline + (minSize + gap)', () => {
      const result = getBarInitialOrigins([nearBar, farBar], 6, 4, VERTICAL_BASELINE, true);
      expect(result[1]).toBe(VERTICAL_BASELINE + 6 + 4);
    });
  });

  describe('mixed positive and negative bars', () => {
    it('positive and negative bars get independent origins', () => {
      const posBar = bar('pos', 0, 100, [0, 5]);
      const negBar = bar('neg', 100, 50, [-5, 0]);
      const result = getBarInitialOrigins([posBar, negBar], 6, 4, 100, false);
      expect(result[0]).toBe(100); // pos: baseline
      expect(result[1]).toBe(100 - 6); // neg: baseline - minSize
    });
  });
});

// ─── getInitialValueRange ─────────────────────────────────────────────────────

describe('getInitialValueRange', () => {
  it('returns undefined when barMinSize is 0', () => {
    expect(getInitialValueRange([0, 10], 0)).toBeUndefined();
  });

  it('returns undefined when origins array is empty', () => {
    expect(getInitialValueRange([], 6)).toBeUndefined();
  });

  describe('horizontal positive: buy+sell with minSize=6, gap=4', () => {
    it('rangeStart is min origin (0)', () => {
      const [start] = getInitialValueRange([0, 10], 6)!;
      expect(start).toBe(0);
    });

    it('rangeEnd is max origin + minSize (16)', () => {
      const [, end] = getInitialValueRange([0, 10], 6)!;
      expect(end).toBe(16);
    });
  });

  describe('single bar', () => {
    it('single positive horizontal bar → [baseline, baseline + minSize]', () => {
      const origins = getBarInitialOrigins(
        [bar('a', 0, 100, [0, 10])],
        6,
        4,
        HORIZONTAL_BASELINE,
        false,
      );
      expect(getInitialValueRange(origins, 6)).toEqual([
        HORIZONTAL_BASELINE,
        HORIZONTAL_BASELINE + 6,
      ]);
    });

    it('single positive vertical bar → [baseline - minSize, baseline]', () => {
      const origins = getBarInitialOrigins(
        [bar('a', 200, 100, [0, 10])],
        6,
        4,
        VERTICAL_BASELINE,
        true,
      );
      expect(getInitialValueRange(origins, 6)).toEqual([VERTICAL_BASELINE - 6, VERTICAL_BASELINE]);
    });
  });

  describe('two positive horizontal bars (minSize=6, gap=4)', () => {
    it('range covers [0, 16] — both initial bar positions', () => {
      const origins = getBarInitialOrigins(
        [bar('buy', 0, 290, [0, 7600]), bar('sell', 290, 10, [7600, 7624])],
        6,
        4,
        HORIZONTAL_BASELINE,
        false,
      );
      expect(getInitialValueRange(origins, 6)).toEqual([0, 16]);
    });
  });

  describe('two positive vertical bars (minSize=6, gap=4)', () => {
    it('range covers from furthest bar top to baseline', () => {
      const origins = getBarInitialOrigins(
        [bar('a', 250, 50, [0, 5]), bar('b', 200, 50, [5, 10])],
        6,
        4,
        VERTICAL_BASELINE,
        true,
      );
      expect(getInitialValueRange(origins, 6)).toEqual([284, VERTICAL_BASELINE]);
    });
  });

  describe('two negative horizontal bars (minSize=6, gap=4, baseline=150)', () => {
    // near gets idx=0: origin = 150 - 1*6 - 0*4 = 144
    // far  gets idx=1: origin = 150 - 2*6 - 1*4 = 134
    // range = [134, 144+6] = [134, 150]
    it('range covers from furthest bar to baseline', () => {
      const origins = getBarInitialOrigins(
        [bar('near', 142, 8, [-8, 0]), bar('far', 130, 12, [-20, -8])],
        6,
        4,
        150,
        false,
      );
      expect(getInitialValueRange(origins, 6)).toEqual([134, 150]);
    });
  });
});

// ─── applyBorderRadiusLogic ───────────────────────────────────────────────────

describe('applyBorderRadiusLogic', () => {
  describe('edge cases', () => {
    it('returns empty array unchanged', () => {
      expect(applyBorderRadiusLogic([], true, 0)).toEqual([]);
    });

    it('single bar keeps both corners rounded', () => {
      const result = applyBorderRadiusLogic([roundedBar('a', 270, 30, [0, 10])], true, 0);
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({ roundTop: true, roundBottom: true });
    });

    it('single bar with roundTop/roundBottom false keeps them false', () => {
      const result = applyBorderRadiusLogic(
        [roundedBar('a', 270, 30, [0, 10], { roundTop: false, roundBottom: false })],
        true,
        0,
      );
      expect(result[0]).toMatchObject({ roundTop: false, roundBottom: false });
    });
  });

  describe('vertical layout — two adjacent bars, no gap', () => {
    // Sorted DESC by valuePos: A(270) then B(240). They're touching: 240+30=270.
    // A = bottom bar (outer bottom face rounded, inner top face squared)
    // B = top bar (outer top face rounded, inner bottom face squared)
    const bars = [roundedBar('a', 270, 30, [0, 10]), roundedBar('b', 240, 30, [10, 20])];

    it('bottom bar: roundBottom=true, roundTop=false', () => {
      const result = applyBorderRadiusLogic(bars, true, 0);
      const a = result.find((r) => r.seriesId === 'a')!;
      expect(a).toMatchObject({ roundTop: false, roundBottom: true });
    });

    it('top bar: roundTop=true, roundBottom=false', () => {
      const result = applyBorderRadiusLogic(bars, true, 0);
      const b = result.find((r) => r.seriesId === 'b')!;
      expect(b).toMatchObject({ roundTop: true, roundBottom: false });
    });

    it('result is order-independent (input reversed)', () => {
      const reversed = [...bars].reverse();
      const result = applyBorderRadiusLogic(reversed, true, 0);
      expect(result.find((r) => r.seriesId === 'a')).toMatchObject({
        roundTop: false,
        roundBottom: true,
      });
      expect(result.find((r) => r.seriesId === 'b')).toMatchObject({
        roundTop: true,
        roundBottom: false,
      });
    });
  });

  describe('vertical layout — two bars with stackGap', () => {
    // Gaps cause every face to stay rounded.
    it('all corners stay rounded', () => {
      const result = applyBorderRadiusLogic(
        [roundedBar('a', 274, 26, [0, 10]), roundedBar('b', 240, 30, [10, 20])],
        true,
        4,
      );
      for (const r of result) {
        expect(r).toMatchObject({ roundTop: true, roundBottom: true });
      }
    });
  });

  describe('vertical layout — three adjacent bars, no gap', () => {
    // Sorted DESC: A(260), B(220), C(180). Adjacent: 220+40=260, 180+40=220.
    // A = bottom (outer bottom rounded, inner top squared)
    // B = middle (both inner faces squared)
    // C = top (outer top rounded, inner bottom squared)
    const bars = [
      roundedBar('a', 260, 40, [0, 10]),
      roundedBar('b', 220, 40, [10, 20]),
      roundedBar('c', 180, 40, [20, 30]),
    ];

    it('bottom bar rounds only the outer bottom face', () => {
      const result = applyBorderRadiusLogic(bars, true, 0);
      expect(result.find((r) => r.seriesId === 'a')).toMatchObject({
        roundTop: false,
        roundBottom: true,
      });
    });

    it('middle bar has no rounded corners', () => {
      const result = applyBorderRadiusLogic(bars, true, 0);
      expect(result.find((r) => r.seriesId === 'b')).toMatchObject({
        roundTop: false,
        roundBottom: false,
      });
    });

    it('top bar rounds only the outer top face', () => {
      const result = applyBorderRadiusLogic(bars, true, 0);
      expect(result.find((r) => r.seriesId === 'c')).toMatchObject({
        roundTop: true,
        roundBottom: false,
      });
    });
  });

  describe('horizontal layout — two adjacent bars, no gap', () => {
    // Sorted ASC by valuePos: A(0) then B(60). They're touching: 0+60=60.
    // A = leftmost (outer left = roundBottom rounded, inner right = roundTop squared)
    // B = rightmost (outer right = roundTop rounded, inner left = roundBottom squared)
    const bars = [roundedBar('a', 0, 60, [0, 10]), roundedBar('b', 60, 40, [10, 20])];

    it('left bar: roundBottom=true (outer left), roundTop=false (inner right)', () => {
      const result = applyBorderRadiusLogic(bars, false, 0);
      expect(result.find((r) => r.seriesId === 'a')).toMatchObject({
        roundTop: false,
        roundBottom: true,
      });
    });

    it('right bar: roundTop=true (outer right), roundBottom=false (inner left)', () => {
      const result = applyBorderRadiusLogic(bars, false, 0);
      expect(result.find((r) => r.seriesId === 'b')).toMatchObject({
        roundTop: true,
        roundBottom: false,
      });
    });
  });

  describe('horizontal layout — two bars with stackGap', () => {
    it('all corners stay rounded', () => {
      const result = applyBorderRadiusLogic(
        [roundedBar('a', 0, 56, [0, 10]), roundedBar('b', 60, 40, [10, 20])],
        false,
        4,
      );
      for (const r of result) {
        expect(r).toMatchObject({ roundTop: true, roundBottom: true });
      }
    });
  });

  describe('shouldApplyGap=false bars', () => {
    it('touching vertical bars square inner faces', () => {
      // A: top at 260, B: bottom at 260 → touching
      const bars = [
        roundedBar('a', 260, 40, [0, 10], { shouldApplyGap: false }),
        roundedBar('b', 220, 40, [10, 20], { shouldApplyGap: false }),
      ];
      const result = applyBorderRadiusLogic(bars, true, 0);
      // A = bottom bar: outer bottom rounded, inner top squared
      expect(result.find((r) => r.seriesId === 'a')).toMatchObject({
        roundTop: false,
        roundBottom: true,
      });
      // B = top bar: outer top rounded, inner bottom squared
      expect(result.find((r) => r.seriesId === 'b')).toMatchObject({
        roundTop: true,
        roundBottom: false,
      });
    });

    it('non-touching vertical bars (gap between them) keep inner corners rounded', () => {
      // A top at 260, B bottom at 255 → 5px gap detected via barAfter/barBefore checks
      const bars = [
        roundedBar('a', 260, 40, [0, 10], { shouldApplyGap: false }),
        roundedBar('b', 215, 40, [10, 20], { shouldApplyGap: false }),
      ];
      const result = applyBorderRadiusLogic(bars, true, 0);
      for (const r of result) {
        expect(r).toMatchObject({ roundTop: true, roundBottom: true });
      }
    });
  });

  describe('preserves non-rounding props', () => {
    it('other bar properties pass through unchanged', () => {
      const input = [{ ...roundedBar('a', 270, 30, [0, 10]), fill: 'red', thickness: 20 }];
      const result = applyBorderRadiusLogic(input, true, 0);
      expect(result[0]).toMatchObject({ fill: 'red', thickness: 20, seriesId: 'a' });
    });
  });
});

// ─── getNormalizedStagger ─────────────────────────────────────────────────────

const DRAWING_AREA = { x: 10, y: 20, width: 200, height: 100 };

describe('getNormalizedStagger', () => {
  describe('vertical layout (barsGrowVertically=true)', () => {
    it('returns 0 for a bar at the left edge', () => {
      expect(getNormalizedStagger(true, 10, 50, DRAWING_AREA)).toBe(0);
    });

    it('returns 1 for a bar at the right edge', () => {
      expect(getNormalizedStagger(true, 210, 50, DRAWING_AREA)).toBe(1);
    });

    it('returns 0.5 for a bar at the center', () => {
      expect(getNormalizedStagger(true, 110, 50, DRAWING_AREA)).toBe(0.5);
    });

    it('returns 0 when drawing area has no width', () => {
      expect(getNormalizedStagger(true, 50, 50, { ...DRAWING_AREA, width: 0 })).toBe(0);
    });
  });

  describe('horizontal layout (barsGrowVertically=false)', () => {
    it('returns 0 for a bar at the top edge', () => {
      expect(getNormalizedStagger(false, 50, 20, DRAWING_AREA)).toBe(0);
    });

    it('returns 1 for a bar at the bottom edge', () => {
      expect(getNormalizedStagger(false, 50, 120, DRAWING_AREA)).toBe(1);
    });

    it('returns 0.5 for a bar at the vertical center', () => {
      expect(getNormalizedStagger(false, 50, 70, DRAWING_AREA)).toBe(0.5);
    });

    it('returns 0 when drawing area has no height', () => {
      expect(getNormalizedStagger(false, 50, 50, { ...DRAWING_AREA, height: 0 })).toBe(0);
    });
  });
});

// ─── getBarInitialRect ────────────────────────────────────────────────────────

describe('getBarInitialRect', () => {
  describe('vertical layout (bars grow upward)', () => {
    it('uses bottom edge (y+height) as baseline when no origin provided', () => {
      // Bar at y=200, height=100: natural baseline is y+height=300
      const rect = getBarInitialRect(50, 200, 80, 100, undefined, 6, true);
      expect(rect).toEqual({ x: 50, y: 300, width: 80, height: 6 });
    });

    it('uses explicit origin as baseline', () => {
      const rect = getBarInitialRect(50, 200, 80, 100, 320, 6, true);
      expect(rect).toEqual({ x: 50, y: 320, width: 80, height: 6 });
    });

    it('preserves x and width, minSize becomes height', () => {
      const rect = getBarInitialRect(30, 150, 60, 80, undefined, 4, true);
      expect(rect).toMatchObject({ x: 30, width: 60, height: 4 });
    });
  });

  describe('horizontal layout (bars grow rightward)', () => {
    it('uses left edge (x) as baseline when no origin provided', () => {
      // Bar at x=0, width=100: natural baseline is x=0
      const rect = getBarInitialRect(0, 30, 100, 20, undefined, 6, false);
      expect(rect).toEqual({ x: 0, y: 30, width: 6, height: 20 });
    });

    it('uses explicit origin as baseline', () => {
      const rect = getBarInitialRect(50, 30, 100, 20, 10, 6, false);
      expect(rect).toEqual({ x: 10, y: 30, width: 6, height: 20 });
    });

    it('preserves y and height, minSize becomes width', () => {
      const rect = getBarInitialRect(0, 40, 80, 25, undefined, 8, false);
      expect(rect).toMatchObject({ y: 40, height: 25, width: 8 });
    });
  });
});
