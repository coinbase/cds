import {
  applyBarMinSize,
  applyBorderRadiusLogic,
  applyStackGap,
  applyStackMinSize,
  getBarOrigins,
  getBarSizeAdjustment,
  getNormalizedStagger,
  getStackOrigin,
} from '../bar';

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
    // (10 * (2 - 1)) / 2 = 5
    expect(getBarSizeAdjustment(2, 10)).toBe(5);
  });

  it('calculates correct adjustment for 3 bars', () => {
    // (12 * (3 - 1)) / 3 = 8
    expect(getBarSizeAdjustment(3, 12)).toBe(8);
  });

  it('calculates correct adjustment for 4 bars', () => {
    // (15 * (4 - 1)) / 4 = 11.25
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
    // Bars above baseline: dataValue bottom >= 0
    // baseline=300, bar A: [0,5]→valuePos=250, length=50; bar B: [5,10]→valuePos=200, length=50
    it('shrinks both bars proportionally and inserts gap', () => {
      const bars = [
        bar('a', 250, 50, [0, 5]), // bottom bar (closest to baseline)
        bar('b', 200, 50, [5, 10]), // top bar
      ];
      const result = applyStackGap(bars, 4, true, VERTICAL_BASELINE);
      const totalLength = result.reduce((s, b) => s + b.length, 0);
      // total length + gap = original total (100)
      expect(totalLength + 4).toBeCloseTo(100);
      // gap between bars should be 4
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
    // Bars below baseline: dataValue top <= 0
    // baseline=300, bar A: [-5,0]→valuePos=300, length=50; bar B: [-10,-5]→valuePos=350, length=50
    it('shrinks bars and inserts gap', () => {
      const bars = [
        bar('a', 300, 50, [-5, 0]), // top bar (closest to baseline)
        bar('b', 350, 50, [-10, -5]),
      ];
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
    // Bars right of baseline: dataValue bottom >= 0
    // baseline=0, bar A: [0,5]→valuePos=0, length=50; bar B: [5,10]→valuePos=50, length=50
    it('shrinks bars and inserts gap', () => {
      const bars = [
        bar('a', 0, 50, [0, 5]), // left bar (closest to baseline)
        bar('b', 50, 50, [5, 10]),
      ];
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
      // 2 gaps of 4px = 8px total gaps, remaining bar length = 180
      expect(totalLength + 8).toBeCloseTo(180);
      // Gaps between consecutive bars should be 4
      const sorted = [...result].sort((a, b) => b.valuePos - a.valuePos);
      const gap1 = sorted[0].valuePos - (sorted[1].valuePos + sorted[1].length);
      const gap2 = sorted[1].valuePos - (sorted[2].valuePos + sorted[2].length);
      expect(gap1).toBeCloseTo(4);
      expect(gap2).toBeCloseTo(4);
    });
  });

  describe('mixed positive + negative bars (gains/losses pattern)', () => {
    // Regression: a positive bar with dataValue=[0, N] has bottom=0 which satisfies
    // bottom <= 0, so it was incorrectly included in the "below baseline" group along
    // with negative bars. The fix is to use top <= 0 for the negative group.
    const gainsBar = (vp: number, len: number, val: number) => bar('gains', vp, len, [0, val]);
    const lossesBar = (vp: number, len: number, val: number) => bar('losses', vp, len, [val, 0]);

    it('one positive + one negative: no gap applied to either (different sides)', () => {
      // gains=[0,5] → above baseline; losses=[-4,0] → below baseline
      // Each group has 1 bar → applyGapGroup exits early → no change
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
      // The gains bar must end at the baseline (valuePos + length = baseline)
      expect(gains.valuePos + gains.length).toBeCloseTo(VERTICAL_BASELINE);
      // And must NOT extend below it
      expect(gains.valuePos).toBeLessThan(VERTICAL_BASELINE);
    });

    it('gap applied between two positive bars but not to the negative bar', () => {
      // Two gain series stacked + one losses series
      const bars = [
        bar('gain1', 250, 30, [0, 3]),
        bar('gain2', 220, 20, [3, 5]),
        bar('losses', 300, 40, [-4, 0]),
      ];
      const result = applyStackGap(bars, 4, true, VERTICAL_BASELINE);

      // Losses bar must be untouched
      const losses = result.find((b) => b.seriesId === 'losses')!;
      expect(losses.valuePos).toBe(300);
      expect(losses.length).toBe(40);

      // Gap of 4px between the two gain bars
      const g1 = result.find((b) => b.seriesId === 'gain1')!;
      const g2 = result.find((b) => b.seriesId === 'gain2')!;
      const gap = g2.valuePos - (g1.valuePos + g1.length); // g2 is further up
      // Wait: gain2 is above gain1 in vertical, so:
      // gain1 is closer to baseline (higher valuePos), gain2 is further (lower valuePos)
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

      // Gains bar must be untouched
      const gains = result.find((b) => b.seriesId === 'gains')!;
      expect(gains.valuePos).toBe(250);
      expect(gains.length).toBe(50);

      // Gap of 4px between the two loss bars
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
      // bar with length=2 should become length=6
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

  describe('stacked bars — no overflow (no scaling)', () => {
    it('expands only the small bar, leaves the large bar unchanged', () => {
      // buy=290px, sell=10px (both >= 6), no scaling needed
      const bars = [bar('buy', 0, 290, [0, 290]), bar('sell', 290, 10, [290, 300])];
      const result = applyBarMinSize(bars, 6, false, HORIZONTAL_BASELINE);
      const buy = result.find((b) => b.seriesId === 'buy')!;
      const sell = result.find((b) => b.seriesId === 'sell')!;
      expect(buy.length).toBe(290);
      expect(sell.length).toBe(10);
    });
  });

  describe('stacked bars — overflow prevention (scaling)', () => {
    it('expands small bar and scales large bar so total stays constant', () => {
      // buy=299px, sell=1px → sell needs to expand to 6, buy shrinks
      const bars = [bar('buy', 0, 299, [0, 299]), bar('sell', 299, 1, [299, 300])];
      const originalTotal = 300;
      const result = applyBarMinSize(bars, 6, false, HORIZONTAL_BASELINE);
      const totalLength = result.reduce((s, b) => s + b.length, 0);
      expect(totalLength).toBeCloseTo(originalTotal);
    });

    it('expanded bar gets exactly barMinSize', () => {
      const bars = [bar('buy', 0, 299, [0, 299]), bar('sell', 299, 1, [299, 300])];
      const result = applyBarMinSize(bars, 6, false, HORIZONTAL_BASELINE);
      const sell = result.find((b) => b.seriesId === 'sell')!;
      expect(sell.length).toBe(6);
    });

    it('large bar takes remaining space: total - barMinSize', () => {
      const bars = [bar('buy', 0, 299, [0, 299]), bar('sell', 299, 1, [299, 300])];
      const result = applyBarMinSize(bars, 6, false, HORIZONTAL_BASELINE);
      const buy = result.find((b) => b.seriesId === 'buy')!;
      expect(buy.length).toBeCloseTo(300 - 6);
    });

    it('bars are restacked contiguously from baseline (no gaps when no stackGap)', () => {
      const bars = [bar('buy', 0, 299, [0, 299]), bar('sell', 299, 1, [299, 300])];
      const result = applyBarMinSize(bars, 6, false, HORIZONTAL_BASELINE);
      const sorted = [...result].sort((a, b) => a.valuePos - b.valuePos);
      expect(sorted[0].valuePos).toBeCloseTo(0);
      expect(sorted[1].valuePos).toBeCloseTo(sorted[0].valuePos + sorted[0].length);
    });

    it('works for vertical stacked bars', () => {
      // buy=299px growing upward, sell=1px on top
      // baseline=300, buy: valuePos=1, length=299; sell: valuePos=0, length=1
      const bars = [bar('buy', 1, 299, [0, 299]), bar('sell', 0, 1, [299, 300])];
      const result = applyBarMinSize(bars, 6, true, VERTICAL_BASELINE);
      const totalLength = result.reduce((s, b) => s + b.length, 0);
      expect(totalLength).toBeCloseTo(300);
      const sell = result.find((b) => b.seriesId === 'sell')!;
      expect(sell.length).toBe(6);
    });
  });

  describe('multiple small bars', () => {
    it('expands all bars below minSize', () => {
      const bars = [bar('a', 0, 2, [0, 2]), bar('b', 2, 2, [2, 4]), bar('c', 4, 2, [4, 6])];
      const result = applyBarMinSize(bars, 6, false, HORIZONTAL_BASELINE);
      result.forEach((b) => expect(b.length).toBe(6));
    });

    it('when all bars need expansion the total may exceed original (no non-expanded bars to scale)', () => {
      const bars = [bar('a', 0, 2, [0, 2]), bar('b', 2, 2, [2, 4])];
      const result = applyBarMinSize(bars, 6, false, HORIZONTAL_BASELINE);
      expect(result[0].length).toBe(6);
      expect(result[1].length).toBe(6);
    });
  });

  describe('extreme case: buy=7600, sell=24 horizontal', () => {
    // Replicates the BuyVsSellChart scenario
    const totalPx = 300;
    const buyFraction = 7600 / 7624;
    const sellFraction = 24 / 7624;
    const buyPx = totalPx * buyFraction;
    const sellPx = totalPx * sellFraction;

    it('sell bar gets exactly barMinSize', () => {
      const bars = [bar('buy', 0, buyPx, [0, 7600]), bar('sell', buyPx, sellPx, [7600, 7624])];
      const result = applyBarMinSize(bars, 6, false, HORIZONTAL_BASELINE);
      const sell = result.find((b) => b.seriesId === 'sell')!;
      expect(sell.length).toBe(6);
    });

    it('buy bar takes totalPx - barMinSize', () => {
      const bars = [bar('buy', 0, buyPx, [0, 7600]), bar('sell', buyPx, sellPx, [7600, 7624])];
      const result = applyBarMinSize(bars, 6, false, HORIZONTAL_BASELINE);
      const buy = result.find((b) => b.seriesId === 'buy')!;
      expect(buy.length).toBeCloseTo(totalPx - 6);
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
  // Simulates a price-range bar chart where domain=[28000, 37000] puts the zero-baseline
  // far below the visible area (~1027px for a 250px chart). Bars must NOT be restacked
  // from baseline — they must stay at their original chart positions.
  const FAR_BASELINE = 1027;

  it('single tiny range bar expands to barMinSize, centered on original midpoint', () => {
    // Bar at pixel y=220, length=2 (midpoint=221). barMinSize=4 → newValuePos=219, length=4.
    const bars = [bar('price', 220, 2, [29000, 29050], { shouldApplyGap: false })];
    const result = applyBarMinSize(bars, 4, true, FAR_BASELINE);
    expect(result[0].length).toBe(4);
    expect(result[0].valuePos).toBe(219); // midpoint=221, centered: 221 - 4/2 = 219
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
    // Should be near 200, NOT near FAR_BASELINE (1027)
    expect(result[0].valuePos).toBeGreaterThan(0);
    expect(result[0].valuePos).toBeLessThan(250);
  });

  it('horizontal range bar expands in-place centered on original midpoint', () => {
    // Bar at pixel x=50, length=2 (midpoint=51). barMinSize=4 → newValuePos=49, length=4.
    const bars = [bar('price', 50, 2, [29000, 29050], { shouldApplyGap: false })];
    const result = applyBarMinSize(bars, 4, false, FAR_BASELINE);
    expect(result[0].length).toBe(4);
    expect(result[0].valuePos).toBe(49); // midpoint=51, centered: 51 - 4/2 = 49
  });

  it('multiple range bars each expand around their own midpoints independently', () => {
    // Two separate candles at different positions
    const bars = [
      bar('candle1', 100, 1, [29000, 29010], { shouldApplyGap: false }),
      bar('candle2', 150, 1, [30000, 30010], { shouldApplyGap: false }),
    ];
    const result = applyBarMinSize(bars, 4, true, FAR_BASELINE);
    // candle1: midpoint=100.5 → valuePos=98.5
    expect(result.find((b) => b.seriesId === 'candle1')!.valuePos).toBeCloseTo(98.5);
    // candle2: midpoint=150.5 → valuePos=148.5
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

  describe('single bar — vertical positive (bar above baseline, grows upward)', () => {
    // bar at valuePos=295, length=5; stackMinSize=20
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

    it('expands bar upward — bottom stays at baseline', () => {
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

    it('updates stackBounds height to stackMinSize', () => {
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

  describe('single bar — vertical negative (bar below baseline, grows downward)', () => {
    it('expands bar length to stackMinSize', () => {
      const bars = [bar('a', 300, 5, [-1, 0])];
      const bounds = { x: 50, y: 300, width: 10, height: 5 };
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

    it('expands bar downward — top stays at baseline', () => {
      const bars = [bar('a', 300, 5, [-1, 0])];
      const bounds = { x: 50, y: 300, width: 10, height: 5 };
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
      expect(result[0].valuePos).toBeCloseTo(VERTICAL_BASELINE);
    });
  });

  describe('single bar — horizontal positive (grows rightward)', () => {
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

    it('expands rightward — start stays at baseline', () => {
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

    it('updates stackBounds width to stackMinSize', () => {
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

  describe('single bar — horizontal negative (grows leftward)', () => {
    it('expands bar length to stackMinSize', () => {
      // baseline=100, negative bar: valuePos=92, length=8 (extends left from baseline)
      const bars = [bar('a', 92, 8, [-8, 0])];
      const bounds = { x: 92, y: 50, width: 8, height: 10 };
      const { bars: result } = applyStackMinSize(bars, 20, 8, bounds, false, 50, 10, 100);
      expect(result[0].length).toBe(20);
    });

    it('expands leftward — right edge stays at baseline', () => {
      const bars = [bar('a', 92, 8, [-8, 0])];
      const bounds = { x: 92, y: 50, width: 8, height: 10 };
      const { bars: result } = applyStackMinSize(bars, 20, 8, bounds, false, 50, 10, 100);
      expect(result[0].valuePos + result[0].length).toBeCloseTo(100);
    });
  });

  describe('multiple bars — vertical scaling', () => {
    // Two positive bars: a=[0,5]→valuePos=250,len=50; b=[5,10]→valuePos=200,len=50; stackSize=100
    it('scales all bars proportionally to meet stackMinSize', () => {
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

    it('updates stackBounds height to stackMinSize', () => {
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
      // bottom bar's bottom edge should be at baseline
      expect(sorted[0].valuePos + sorted[0].length).toBeCloseTo(VERTICAL_BASELINE);
      // bars should be adjacent
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

    it('updates stackBounds width to stackMinSize', () => {
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

  describe('multiple bars with a gap (stackGap already applied)', () => {
    // After stackGap: a=[0,5]→len=46, b=[5,10]→len=46, 4px gap; stackSize=96
    it('preserves the gap while scaling both bars', () => {
      const gapSize = 4;
      const bars = [
        bar('a', 250, 46, [0, 5]), // gap of 4 between b top and a bottom
        bar('b', 200, 46, [5, 10]),
      ];
      const stackSize = 96; // 46+4+46
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
      // Gap should be preserved
      const sorted = [...result].sort((a, b) => b.valuePos - a.valuePos);
      const gap = sorted[0].valuePos - (sorted[1].valuePos + sorted[1].length);
      expect(gap).toBeCloseTo(gapSize);
    });
  });
});

// ─── getBarOrigins ─────────────────────────────────────────────────────

describe('getBarOrigins', () => {
  describe('no-op cases', () => {
    it('returns all baseline when barMinSize is 0', () => {
      const bars = [bar('a', 0, 100, [0, 10]), bar('b', 100, 50, [10, 15])];
      const result = getBarOrigins(bars, 0, 4, HORIZONTAL_BASELINE, false);
      expect(result).toEqual([HORIZONTAL_BASELINE, HORIZONTAL_BASELINE]);
    });

    it('returns all baseline when bars array is empty', () => {
      const result = getBarOrigins([], 6, 4, HORIZONTAL_BASELINE, false);
      expect(result).toEqual([]);
    });

    it('single positive horizontal bar starts at baseline', () => {
      const bars = [bar('a', 0, 100, [0, 10])];
      const result = getBarOrigins(bars, 6, 4, HORIZONTAL_BASELINE, false);
      expect(result[0]).toBe(HORIZONTAL_BASELINE);
    });

    it('single positive vertical bar starts at baseline - minSize (one step up)', () => {
      const bars = [bar('a', 200, 100, [0, 10])];
      const result = getBarOrigins(bars, 6, 4, VERTICAL_BASELINE, true);
      // Vertical positive: baseline - 1*minSize - 0*gap = 300 - 6 = 294
      expect(result[0]).toBe(VERTICAL_BASELINE - 6);
    });
  });

  describe('horizontal layout — positive bars (grow rightward)', () => {
    // buy closer to baseline (smaller valuePos), sell further away
    const buyBar = bar('buy', 0, 290, [0, 7600]);
    const sellBar = bar('sell', 290, 10, [7600, 7624]);

    it('buy (closest to baseline) starts at baseline', () => {
      const result = getBarOrigins([buyBar, sellBar], 6, 4, HORIZONTAL_BASELINE, false);
      const buyOrigin = result[0]; // buy is at index 0
      expect(buyOrigin).toBe(HORIZONTAL_BASELINE);
    });

    it('sell (further from baseline) starts at baseline + minSize + gap', () => {
      const result = getBarOrigins([buyBar, sellBar], 6, 4, HORIZONTAL_BASELINE, false);
      const sellOrigin = result[1]; // sell is at index 1
      expect(sellOrigin).toBe(0 + 6 + 4); // 10
    });

    it('three positive bars are staggered by (minSize + gap) each', () => {
      const bars = [
        bar('a', 0, 100, [0, 5]),
        bar('b', 100, 100, [5, 10]),
        bar('c', 200, 100, [10, 15]),
      ];
      const result = getBarOrigins(bars, 6, 4, HORIZONTAL_BASELINE, false);
      expect(result[0]).toBe(0); // idx 0: baseline
      expect(result[1]).toBe(10); // idx 1: baseline + 1*(6+4)
      expect(result[2]).toBe(20); // idx 2: baseline + 2*(6+4)
    });

    it('result is independent of input bar order', () => {
      // Same bars but reversed in the array
      const resultForward = getBarOrigins([buyBar, sellBar], 6, 4, HORIZONTAL_BASELINE, false);
      const resultReversed = getBarOrigins([sellBar, buyBar], 6, 4, HORIZONTAL_BASELINE, false);
      // Regardless of order, the bar with smaller valuePos gets origin=0
      expect(Math.min(...resultForward)).toBe(HORIZONTAL_BASELINE);
      expect(Math.min(...resultReversed)).toBe(HORIZONTAL_BASELINE);
    });

    it('zero gap — bars start adjacent to each other', () => {
      const bars = [bar('a', 0, 100, [0, 5]), bar('b', 100, 100, [5, 10])];
      const result = getBarOrigins(bars, 6, 0, HORIZONTAL_BASELINE, false);
      expect(result[0]).toBe(0);
      expect(result[1]).toBe(6); // 0 + minSize + 0
    });
  });

  describe('horizontal layout — negative bars (grow leftward)', () => {
    // baseline at 150, negative bars extend left
    const BASELINE = 150;
    // bar closest to baseline: right edge at 150 (valuePos=142, length=8)
    const nearBar = bar('near', 142, 8, [-8, 0]);
    // bar further: right edge at 142 (valuePos=130, length=12)
    const farBar = bar('far', 130, 12, [-20, -8]);

    it('nearest bar starts at baseline - minSize', () => {
      const result = getBarOrigins([nearBar, farBar], 6, 4, BASELINE, false);
      const nearIdx = 0;
      expect(result[nearIdx]).toBe(BASELINE - 6); // 144
    });

    it('further bar starts at baseline - 2*minSize - gap', () => {
      const result = getBarOrigins([nearBar, farBar], 6, 4, BASELINE, false);
      const farIdx = 1;
      expect(result[farIdx]).toBe(BASELINE - 2 * 6 - 4); // 128
    });
  });

  describe('vertical layout — positive bars (grow upward)', () => {
    // baseline=300, bars grow upward (decreasing Y)
    // bar 'a' closer to baseline: valuePos=250, length=50 (bottom edge at 300)
    // bar 'b' further: valuePos=200, length=50 (bottom edge at 250)
    const aBar = bar('a', 250, 50, [0, 5]);
    const bBar = bar('b', 200, 50, [5, 10]);

    it('bar closest to baseline (largest valuePos) starts at baseline - minSize', () => {
      const result = getBarOrigins([aBar, bBar], 6, 4, VERTICAL_BASELINE, true);
      const aIdx = 0;
      expect(result[aIdx]).toBe(VERTICAL_BASELINE - 6); // 294
    });

    it('bar further from baseline starts at baseline - 2*minSize - gap', () => {
      const result = getBarOrigins([aBar, bBar], 6, 4, VERTICAL_BASELINE, true);
      const bIdx = 1;
      expect(result[bIdx]).toBe(VERTICAL_BASELINE - 2 * 6 - 4); // 284
    });

    it('initialY + minSize for bar-0 equals baseline (bar touches baseline)', () => {
      const result = getBarOrigins([aBar, bBar], 6, 4, VERTICAL_BASELINE, true);
      expect(result[0] + 6).toBe(VERTICAL_BASELINE);
    });
  });

  describe('vertical layout — negative bars (grow downward)', () => {
    // baseline=300, bars grow downward (increasing Y)
    const nearBar = bar('near', 300, 50, [-5, 0]); // valuePos at baseline
    const farBar = bar('far', 350, 50, [-10, -5]); // valuePos further down

    it('bar closest to baseline (smallest valuePos) starts at baseline', () => {
      const result = getBarOrigins([nearBar, farBar], 6, 4, VERTICAL_BASELINE, true);
      const nearIdx = 0;
      expect(result[nearIdx]).toBe(VERTICAL_BASELINE);
    });

    it('bar further down starts at baseline + (minSize + gap)', () => {
      const result = getBarOrigins([nearBar, farBar], 6, 4, VERTICAL_BASELINE, true);
      const farIdx = 1;
      expect(result[farIdx]).toBe(VERTICAL_BASELINE + 6 + 4); // 310
    });
  });

  describe('mixed positive and negative bars', () => {
    it('positive bar starts at baseline, negative bar starts at baseline - minSize', () => {
      const posBar = bar('pos', 0, 100, [0, 5]);
      const negBar = bar('neg', 100, 50, [-5, 0]);
      const result = getBarOrigins([posBar, negBar], 6, 4, 100, false);
      // pos: baseline + 0*(6+4) = 100
      expect(result[0]).toBe(100);
      // neg: baseline - 1*6 - 0*4 = 94
      expect(result[1]).toBe(100 - 6);
    });
  });
});

// ─── getStackOrigin ───────────────────────────────────────────────────────────

describe('getStackOrigin', () => {
  it('returns undefined when barMinSize is 0', () => {
    expect(getStackOrigin([0, 10], 0)).toBeUndefined();
  });

  it('returns undefined when origins array is empty', () => {
    expect(getStackOrigin([], 6)).toBeUndefined();
  });

  describe('horizontal positive: buy+sell with minSize=6, gap=4', () => {
    // buy origin=0, sell origin=10 → range=[0, 16]
    it('rangeStart is min origin (0)', () => {
      const [start] = getStackOrigin([0, 10], 6)!;
      expect(start).toBe(0);
    });

    it('rangeEnd is max origin + minSize (16)', () => {
      const [, end] = getStackOrigin([0, 10], 6)!;
      expect(end).toBe(16);
    });
  });

  describe('single bar', () => {
    it('single positive horizontal bar → [baseline, baseline + minSize]', () => {
      const origins = getBarOrigins([bar('a', 0, 100, [0, 10])], 6, 4, HORIZONTAL_BASELINE, false);
      const range = getStackOrigin(origins, 6)!;
      expect(range).toEqual([HORIZONTAL_BASELINE, HORIZONTAL_BASELINE + 6]);
    });

    it('single positive vertical bar → [baseline - minSize, baseline]', () => {
      const origins = getBarOrigins([bar('a', 200, 100, [0, 10])], 6, 4, VERTICAL_BASELINE, true);
      const range = getStackOrigin(origins, 6)!;
      expect(range).toEqual([VERTICAL_BASELINE - 6, VERTICAL_BASELINE]);
    });
  });

  describe('two positive horizontal bars (minSize=6, gap=4)', () => {
    it('range covers [0, 16] — both initial bar positions', () => {
      const origins = getBarOrigins(
        [bar('buy', 0, 290, [0, 7600]), bar('sell', 290, 10, [7600, 7624])],
        6,
        4,
        HORIZONTAL_BASELINE,
        false,
      );
      expect(getStackOrigin(origins, 6)).toEqual([0, 16]);
    });
  });

  describe('two positive vertical bars (minSize=6, gap=4)', () => {
    // origins = [294, 284] → range = [284, 300]
    it('range covers from furthest bar top to baseline', () => {
      const origins = getBarOrigins(
        [bar('a', 250, 50, [0, 5]), bar('b', 200, 50, [5, 10])],
        6,
        4,
        VERTICAL_BASELINE,
        true,
      );
      expect(getStackOrigin(origins, 6)).toEqual([284, VERTICAL_BASELINE]);
    });
  });

  describe('two negative horizontal bars (minSize=6, gap=4, baseline=150)', () => {
    // near gets idx=0: origin = 150 - 1*6 - 0*4 = 144
    // far  gets idx=1: origin = 150 - 2*6 - 1*4 = 134
    // range = [134, 144+6] = [134, 150]
    it('range covers from furthest bar to baseline', () => {
      const origins = getBarOrigins(
        [bar('near', 142, 8, [-8, 0]), bar('far', 130, 12, [-20, -8])],
        6,
        4,
        150,
        false,
      );
      expect(getStackOrigin(origins, 6)).toEqual([134, 150]);
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

describe('getNormalizedStagger', () => {
  const drawingArea = { x: 10, y: 20, width: 200, height: 100 };

  describe('vertical layout (stagger along x axis)', () => {
    it('returns 0 at the left edge of the drawing area', () => {
      expect(getNormalizedStagger('vertical', 10, 0, drawingArea)).toBe(0);
    });

    it('returns 1 at the right edge of the drawing area', () => {
      expect(getNormalizedStagger('vertical', 210, 0, drawingArea)).toBe(1);
    });

    it('returns 0.5 at the midpoint of the drawing area', () => {
      expect(getNormalizedStagger('vertical', 110, 0, drawingArea)).toBe(0.5);
    });

    it('returns 0 when drawing area width is 0', () => {
      expect(getNormalizedStagger('vertical', 50, 0, { ...drawingArea, width: 0 })).toBe(0);
    });
  });

  describe('horizontal layout (stagger along y axis)', () => {
    it('returns 0 at the top edge of the drawing area', () => {
      expect(getNormalizedStagger('horizontal', 0, 20, drawingArea)).toBe(0);
    });

    it('returns 1 at the bottom edge of the drawing area', () => {
      expect(getNormalizedStagger('horizontal', 0, 120, drawingArea)).toBe(1);
    });

    it('returns 0.5 at the midpoint of the drawing area', () => {
      expect(getNormalizedStagger('horizontal', 0, 70, drawingArea)).toBe(0.5);
    });

    it('returns 0 when drawing area height is 0', () => {
      expect(getNormalizedStagger('horizontal', 0, 50, { ...drawingArea, height: 0 })).toBe(0);
    });
  });
});
