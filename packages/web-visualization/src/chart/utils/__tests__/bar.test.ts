import {
  getBars,
  getBarSizeAdjustment,
  getBaselinePx,
  getNormalizedStagger,
  getStackGroups,
  getStackOrigin,
} from '../bar';

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

describe('getStackGroups', () => {
  it('groups series by stackId and axis IDs', () => {
    const groups = getStackGroups([
      { id: 'a', stackId: 'price', xAxisId: 'x1', yAxisId: 'y1' },
      { id: 'b', stackId: 'price', xAxisId: 'x1', yAxisId: 'y1' },
      { id: 'c', stackId: 'price', xAxisId: 'x1', yAxisId: 'y2' },
    ]);

    expect(groups).toHaveLength(2);
    expect(groups[0].stackId).toBe('price:x1:y1');
    expect(groups[0].series.map((s) => s.id)).toEqual(['a', 'b']);
    expect(groups[1].stackId).toBe('price:x1:y2');
    expect(groups[1].series.map((s) => s.id)).toEqual(['c']);
  });

  it('falls back to individual stackId when missing', () => {
    const groups = getStackGroups([{ id: 'a' }, { id: 'b' }]);

    expect(groups).toHaveLength(2);
    expect(groups[0].stackId).toContain('individual-a');
    expect(groups[1].stackId).toContain('individual-b');
  });

  it('uses provided default axis id for missing axis values', () => {
    const groups = getStackGroups(
      [
        { id: 'a', stackId: 's1' },
        { id: 'b', stackId: 's1' },
      ],
      'custom-default',
    );

    expect(groups).toHaveLength(1);
    expect(groups[0].stackId).toBe('s1:custom-default:custom-default');
  });
});

describe('getBaselinePx', () => {
  const rect = { x: 10, y: 20, width: 100, height: 200 };

  function createValueScale(domain: [number, number], map: (value: number) => number | undefined) {
    return Object.assign((value: number) => map(value), { domain: () => domain }) as any;
  }

  it('uses domain min for fully positive vertical domains', () => {
    const valueScale = createValueScale([5, 15], (value) => 220 - value * 10);
    expect(getBaselinePx(valueScale, rect, 'vertical')).toBe(170);
  });

  it('uses domain max for fully negative horizontal domains', () => {
    const valueScale = createValueScale([-20, -5], (value) => 60 + value);
    expect(getBaselinePx(valueScale, rect, 'horizontal')).toBe(55);
  });

  it('uses zero for domains that cross zero', () => {
    const valueScale = createValueScale([-10, 10], (value) => 120 + value * 5);
    expect(getBaselinePx(valueScale, rect, 'horizontal')).toBe(110);
  });

  it('clamps vertical baseline to chart bounds when scale output is outside rect', () => {
    const valueScale = createValueScale([-5, 5], () => -1000);
    expect(getBaselinePx(valueScale, rect, 'vertical')).toBe(rect.y);
  });

  it('uses orientation-aware fallback when scale returns undefined', () => {
    const valueScale = createValueScale([-5, 5], () => undefined);
    expect(getBaselinePx(valueScale, rect, 'vertical')).toBe(rect.y + rect.height);
    expect(getBaselinePx(valueScale, rect, 'horizontal')).toBe(rect.x);
  });

  it('uses explicit baseline value when provided', () => {
    const valueScale = createValueScale([-10, 50], (value) => 300 - value * 2);
    expect(getBaselinePx(valueScale, rect, 'vertical', 30)).toBe(220);
  });
});

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
      const origins = [0];
      const range = getStackOrigin(origins, 6)!;
      expect(range).toEqual([0, 6]);
    });

    it('single positive vertical bar → [baseline - minSize, baseline]', () => {
      const baseline = 300;
      const origins = [baseline - 6];
      const range = getStackOrigin(origins, 6)!;
      expect(range).toEqual([baseline - 6, baseline]);
    });
  });

  describe('two positive horizontal bars (minSize=6, gap=4)', () => {
    it('range covers [0, 16] — both initial bar positions', () => {
      const origins = [0, 10];
      expect(getStackOrigin(origins, 6)).toEqual([0, 16]);
    });
  });

  describe('two positive vertical bars (minSize=6, gap=4)', () => {
    // origins = [294, 284] → range = [284, 300]
    it('range covers from furthest bar top to baseline', () => {
      const baseline = 300;
      const origins = [294, 284];
      expect(getStackOrigin(origins, 6)).toEqual([284, baseline]);
    });
  });

  describe('two negative horizontal bars (minSize=6, gap=4, baseline=150)', () => {
    // near gets idx=0: origin = 150 - 1*6 - 0*4 = 144
    // far  gets idx=1: origin = 150 - 2*6 - 1*4 = 134
    // range = [134, 144+6] = [134, 150]
    it('range covers from furthest bar to baseline', () => {
      const origins = [144, 134];
      expect(getStackOrigin(origins, 6)).toEqual([134, 150]);
    });
  });

  it('supports per-bar min sizes', () => {
    expect(getStackOrigin([0, 10], [4, 8])).toEqual([0, 18]);
  });
});

describe('getBars horizontal barMinSize from baseline (regression)', () => {
  /**
   * Applying the vertical "above baseline" restack to horizontal stacks once shifted
   * the whole stack left by ~its full width (e.g. x ≈ -1008 with a [0, 1008] value range).
   */
  function linearValueScale(domain: [number, number], range: [number, number]) {
    const [d0, d1] = domain;
    const [r0, r1] = range;
    return Object.assign((v: number) => r0 + ((v - d0) / (d1 - d0)) * (r1 - r0), {
      domain: () => domain,
    }) as any;
  }

  const WIDE_CHART_WIDTH = 1008;

  it('anchors a buy/sell-style percentage stack at x=0 on a wide linear range (barMinSize + stackGap)', () => {
    const valueScale = linearValueScale([0, 100], [0, WIDE_CHART_WIDTH]);
    const bars = getBars({
      series: [
        { id: 'buy', data: [76], stackId: 'bs' },
        { id: 'sell', data: [24], stackId: 'bs' },
      ] as any,
      seriesData: {
        buy: [[0, 76]],
        sell: [[76, 100]],
      },
      categoryIndex: 0,
      categoryValue: 0,
      indexPos: 0,
      thickness: 6,
      valueScale,
      seriesGradients: [],
      roundBaseline: false,
      layout: 'horizontal',
      baseline: 0,
      baselinePx: 0,
      stackGap: 4,
      barMinSize: 6,
      defaultFill: '#000',
      borderRadius: 0,
      defaultFillOpacity: 1,
      defaultStroke: undefined,
      defaultStrokeWidth: undefined,
      defaultBarComponent: undefined,
    });

    expect(bars).toHaveLength(2);
    const buyBar = bars.find((b) => b.seriesId === 'buy')!;
    const sellBar = bars.find((b) => b.seriesId === 'sell')!;

    expect(buyBar.x).toBeCloseTo(0, 4);
    expect(buyBar.x).toBeGreaterThanOrEqual(-0.01);
    expect(sellBar.x).toBeGreaterThan(buyBar.x);

    const minX = Math.min(...bars.map((b) => b.x));
    const maxX = Math.max(...bars.map((b) => b.x + b.width));
    expect(minX).toBeCloseTo(0, 4);
    expect(maxX).toBeCloseTo(WIDE_CHART_WIDTH, 4);
  });

  it('does not push a horizontal stack to negative x when only the trailing segment needs barMinSize', () => {
    const valueScale = linearValueScale([0, 100], [0, WIDE_CHART_WIDTH]);
    const bars = getBars({
      series: [
        { id: 'big', data: [99.9], stackId: 's' },
        { id: 'tiny', data: [0.1], stackId: 's' },
      ] as any,
      seriesData: {
        big: [[0, 99.9]],
        tiny: [[99.9, 100]],
      },
      categoryIndex: 0,
      categoryValue: 0,
      indexPos: 0,
      thickness: 6,
      valueScale,
      seriesGradients: [],
      roundBaseline: false,
      layout: 'horizontal',
      baseline: 0,
      baselinePx: 0,
      stackGap: 2,
      barMinSize: 24,
      defaultFill: '#000',
      borderRadius: 0,
      defaultFillOpacity: 1,
      defaultStroke: undefined,
      defaultStrokeWidth: undefined,
      defaultBarComponent: undefined,
    });

    expect(Math.min(...bars.map((b) => b.x))).toBeGreaterThanOrEqual(-0.01);
    const bigBar = bars.find((b) => b.seriesId === 'big')!;
    expect(bigBar.x).toBeCloseTo(0, 4);
  });
});

describe('getBars stackMinSize entrance behavior', () => {
  const valueScale = Object.assign((value: number) => value, {
    domain: () => [0, 10] as [number, number],
  });

  const series = [
    { id: 'buy', data: [2], stackId: 'orders' },
    { id: 'sell', data: [4], stackId: 'orders' },
  ];

  const seriesData: Record<string, [number, number][]> = {
    buy: [[0, 2]],
    sell: [[2, 6]],
  };

  const getBarsResult = (barMinSize?: number, stackMinSize?: number) =>
    getBars({
      series: series as any,
      seriesData,
      categoryIndex: 0,
      categoryValue: 0,
      indexPos: 0,
      thickness: 8,
      valueScale: valueScale as any,
      seriesGradients: [],
      roundBaseline: false,
      layout: 'horizontal',
      baseline: 0,
      baselinePx: 0,
      stackGap: 0,
      barMinSize,
      stackMinSize,
      defaultFill: '#000',
      borderRadius: 0,
      defaultFillOpacity: 1,
      defaultStroke: undefined,
      defaultStrokeWidth: undefined,
      defaultBarComponent: undefined,
    });

  it('distributes stackMinSize proportionally to segment entrance min sizes', () => {
    const bars = getBarsResult(undefined, 12);
    expect(bars.map((bar) => bar.minSize)).toEqual([4, 8]);
  });

  it('uses max of barMinSize and stackMinSize-derived min size', () => {
    const bars = getBarsResult(6, 12);
    expect(bars.map((bar) => bar.minSize)).toEqual([6, 6]);
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
