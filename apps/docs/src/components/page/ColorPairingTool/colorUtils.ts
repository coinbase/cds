// ── Spectrum Pairing — Color Utilities ────────────────────────────────────────
// Color math for the spectrum pairing tool: WCAG contrast, k-means extraction,
// and hue-aware token matching. The hue-aware algorithm is purpose-built for
// CDS spectrum tokens and is not replaceable by a standard color library.

// ── Types ────────────────────────────────────────────────────────────────────

export type RGB = { r: number; g: number; b: number };
export type TokenMatch = { token: string; hex: string };
export type ExtractedColor = {
  r: number;
  g: number;
  b: number;
  imgX: number;
  imgY: number;
  size?: number;
};
export type WCAGLevels = { aaNormal: boolean; aaLarge: boolean; aaa: boolean };
export type EnforcedPair = {
  primary: TokenMatch;
  secondary: TokenMatch;
  wasAdjusted: boolean;
  adjustedNote: string;
};
export type HighContrastPair = { fg: TokenMatch; bg: TokenMatch };
export type Spectrum = Record<string, string>;

// ── Color Conversion ─────────────────────────────────────────────────────────

export function parseRGB(str: string): RGB {
  const [r, g, b] = str.split(',').map(Number);
  return { r, g, b };
}

export function toHex({ r, g, b }: RGB): string {
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
}

export function hexToRGB(hex: string): RGB {
  hex = hex.replace('#', '');
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
}

// ── Constants ────────────────────────────────────────────────────────────────

export const MIN_CONTRAST_RATIO = 2;

const WHITE = '#FFFFFF';
const BLACK = '#0A0B0D';

// ── WCAG ─────────────────────────────────────────────────────────────────────

export function luminance(r: number, g: number, b: number): number {
  return [r, g, b]
    .map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    })
    .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
}

export function contrastRatio(hex1: string, hex2: string): number {
  const c1 = hexToRGB(hex1);
  const c2 = hexToRGB(hex2);
  const l1 = luminance(c1.r, c1.g, c1.b);
  const l2 = luminance(c2.r, c2.g, c2.b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

export function wcagLevels(r: number): WCAGLevels {
  return { aaNormal: r >= 4.5, aaLarge: r >= 3, aaa: r >= 7 };
}

export function aaTextColor(swatchHex: string): string {
  return contrastRatio(swatchHex, WHITE) >= contrastRatio(swatchHex, BLACK) ? WHITE : BLACK;
}

// ── Color Distance ───────────────────────────────────────────────────────────

export function colorDist(a: number[], b: number[]): number {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h: h * 360, s, l };
}

function hueDistance(a: number, b: number): number {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
}

// ── Token Matching ───────────────────────────────────────────────────────────

export function findClosestPrimitive(
  r: number,
  g: number,
  b: number,
  spectrum: Spectrum,
): TokenMatch {
  let best: string | null = null;
  let bestD = Infinity;
  for (const [t, s] of Object.entries(spectrum)) {
    const { r: pr, g: pg, b: pb } = parseRGB(s);
    const d = colorDist([r, g, b], [pr, pg, pb]);
    if (d < bestD) {
      bestD = d;
      best = t;
    }
  }
  const { r: mr, g: mg, b: mb } = parseRGB(spectrum[best!]);
  return { token: best!, hex: toHex({ r: mr, g: mg, b: mb }) };
}

export function findClosestPrimitiveHueAware(
  r: number,
  g: number,
  b: number,
  spectrum: Spectrum,
): TokenMatch {
  const { h: inputH, s: inputS } = rgbToHsl(r, g, b);

  // Achromatic input — plain RGB distance is fine, grays are a valid result
  if (inputS < 0.1) return findClosestPrimitive(r, g, b, spectrum);

  // For chromatic inputs, build a family → average hue map,
  // excluding gray entirely (CDS grays are blue-tinted and share hue ~220°
  // with the blue family, so hue distance alone can't distinguish them).
  const familyHues = new Map<string, number[]>();
  for (const [t, sv] of Object.entries(spectrum)) {
    const family = t.replace(/\d+$/, '');
    if (family === 'gray') continue;
    // Exclude extreme steps (0 and 100) from hue matching — their hues drift toward
    // adjacent families (e.g. teal100 lands at ~209°, overlapping the blue family range).
    const step = parseInt(t.match(/\d+$/)?.[0] ?? '50');
    if (step <= 0 || step >= 100) continue;
    const { r: pr, g: pg, b: pb } = parseRGB(sv);
    const { h: ph } = rgbToHsl(pr, pg, pb);
    if (!familyHues.has(family)) familyHues.set(family, []);
    familyHues.get(family)!.push(ph);
  }

  // Compute each family's minimum hue distance to the input.
  const familyMinDist = new Map<string, number>();
  for (const [family, hues] of familyHues.entries()) {
    familyMinDist.set(family, Math.min(...hues.map((h) => hueDistance(inputH, h))));
  }

  // Build a candidate set: the closest family plus any within HUE_MARGIN degrees of it.
  // This lets RGB distance break ties at family hue boundaries (e.g. teal dark tokens
  // drift to ~206° while blue tokens sit at ~220°, so a 210° input like #80B0E0 would
  // incorrectly land on teal if hue alone decided — RGB correctly picks blue).
  const HUE_MARGIN = 10;
  const minDist = Math.min(...familyMinDist.values());
  const candidateFamilies = new Set<string>();
  for (const [family, dist] of familyMinDist.entries()) {
    if (dist <= minDist + HUE_MARGIN) candidateFamilies.add(family);
  }

  // Among all tokens in candidate families, pick the closest by RGB distance.
  let best: string | null = null;
  let bestD = Infinity;
  for (const [t, sv] of Object.entries(spectrum)) {
    const family = t.replace(/\d+$/, '');
    if (!candidateFamilies.has(family)) continue;
    const { r: pr, g: pg, b: pb } = parseRGB(sv);
    const d = colorDist([r, g, b], [pr, pg, pb]);
    if (d < bestD) {
      bestD = d;
      best = t;
    }
  }

  if (!best) return findClosestPrimitive(r, g, b, spectrum);
  const { r: mr, g: mg, b: mb } = parseRGB(spectrum[best]);
  return { token: best, hex: toHex({ r: mr, g: mg, b: mb }) };
}

export function tokenHex(t: string, sp: Spectrum): string {
  const v = sp[t];
  if (!v) return '#888888';
  const { r, g, b } = parseRGB(v);
  return toHex({ r, g, b });
}

export function tokenFamily(token: string): string {
  return token.replace(/\d+$/, '');
}

// ── AA Enforcement ───────────────────────────────────────────────────────────

export function findPassingPrimitive(
  anchorHex: string,
  spectrum: Spectrum,
  minRatio: number,
  preferFamily?: string,
): TokenMatch | null {
  const { r: ar, g: ag, b: ab } = hexToRGB(anchorHex);
  const passes = preferFamily
    ? [
        Object.entries(spectrum).filter(([t]) => t.startsWith(preferFamily)),
        Object.entries(spectrum),
      ]
    : [Object.entries(spectrum)];
  for (const entries of passes) {
    let found: TokenMatch | null = null;
    let foundScore = Infinity;
    for (const [t, s] of entries) {
      const { r, g, b } = parseRGB(s);
      const hex = toHex({ r, g, b });
      const ratio = contrastRatio(anchorHex, hex);
      if (ratio >= minRatio) {
        const dist = colorDist([r, g, b], [ar, ag, ab]);
        if (dist < foundScore) {
          foundScore = dist;
          found = { token: t, hex };
        }
      }
    }
    if (found) return found;
  }
  return null;
}

export function enforceAA(
  primary: TokenMatch,
  secondary: TokenMatch,
  spectrum: Spectrum,
): EnforcedPair {
  const ratio = contrastRatio(primary.hex, secondary.hex);
  if (ratio >= 4.5) return { primary, secondary, wasAdjusted: false, adjustedNote: '' };

  const secFamily = tokenFamily(secondary.token);
  const newSec = findPassingPrimitive(primary.hex, spectrum, 4.5, secFamily);
  if (newSec) {
    return {
      primary,
      secondary: newSec,
      wasAdjusted: true,
      adjustedNote: `Background adjusted from ${secondary.token} → ${newSec.token} to meet AA (4.5:1 minimum).`,
    };
  }
  const priFamily = tokenFamily(primary.token);
  const newPri = findPassingPrimitive(secondary.hex, spectrum, 4.5, priFamily);
  if (newPri) {
    return {
      primary: newPri,
      secondary,
      wasAdjusted: true,
      adjustedNote: `Foreground adjusted from ${primary.token} → ${newPri.token} to meet AA (4.5:1 minimum).`,
    };
  }
  return { primary, secondary, wasAdjusted: false, adjustedNote: '' };
}

export function findHighContrastPair(primary: TokenMatch, spectrum: Spectrum): HighContrastPair {
  const hcBg = findPassingPrimitive(primary.hex, spectrum, 7);
  if (hcBg) return { fg: primary, bg: hcBg };
  const aaBg = findPassingPrimitive(primary.hex, spectrum, 4.5);
  return { fg: primary, bg: aaBg || primary };
}

// Given an input RGB and its best light-mode token match, finds the closest
// token in the dark spectrum within the same color family that also passes
// the minimum contrast threshold against the dark background.
export function findBestDarkToken(
  inputRgb: RGB,
  lightMatch: TokenMatch,
  darkSpectrum: Spectrum,
): TokenMatch {
  const family = tokenFamily(lightMatch.token);
  const darkBgAlt = tokenHex('gray5', darkSpectrum);

  let best: TokenMatch | null = null;
  let bestDist = Infinity;
  for (const [t, s] of Object.entries(darkSpectrum)) {
    if (!t.startsWith(family)) continue;
    const { r, g, b } = parseRGB(s);
    const hex = toHex({ r, g, b });
    if (contrastRatio(hex, darkBgAlt) < MIN_CONTRAST_RATIO) continue;
    const dist = colorDist([r, g, b], [inputRgb.r, inputRgb.g, inputRgb.b]);
    if (dist < bestDist) {
      bestDist = dist;
      best = { token: t, hex };
    }
  }

  return best ?? { token: lightMatch.token, hex: tokenHex(lightMatch.token, darkSpectrum) };
}

// ── Color Extraction (k-means) ───────────────────────────────────────────────

export function extractSubjectColors(canvas: HTMLCanvasElement): ExtractedColor[] {
  const ctx = canvas.getContext('2d')!;
  const { width: w, height: h } = canvas;
  const data = ctx.getImageData(0, 0, w, h).data;
  const cx = w / 2;
  const cy = h / 2;
  const sigX = w * 0.32;
  const sigY = h * 0.32;

  function sampleCornerBrightness(): number[] {
    const corners: [number, number][] = [
      [0, 0],
      [w - 1, 0],
      [0, h - 1],
      [w - 1, h - 1],
    ];
    return corners.map(([x, y]) => {
      const i = (y * w + x) * 4;
      return (data[i] + data[i + 1] + data[i + 2]) / 3;
    });
  }
  const cornerBrightness = sampleCornerBrightness();
  const avgCorner = cornerBrightness.reduce((a, b) => a + b, 0) / 4;
  const skipBrightBg = avgCorner > 200;
  const skipDarkBg = avgCorner < 55;

  const rawPixels: number[][] = [];
  const step = Math.max(1, Math.floor((w * h) / 3000));
  for (let i = 0; i < data.length; i += 4 * step) {
    if (data[i + 3] < 128) continue;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const brightness = (r + g + b) / 3;
    if (skipBrightBg && brightness > 220) continue;
    if (skipDarkBg && brightness < 35) continue;

    const idx = i / 4;
    const px = idx % w;
    const py = Math.floor(idx / w);
    const dx = (px - cx) / sigX;
    const dy = (py - cy) / sigY;
    const weight = Math.exp(-(dx * dx + dy * dy) / 2);
    const repeats = Math.max(1, Math.round(weight * 10));
    for (let k = 0; k < repeats; k++) rawPixels.push([r, g, b, px, py]);
  }

  if (rawPixels.length < 4)
    return [
      { r: 200, g: 100, b: 50, imgX: 0.4, imgY: 0.4 },
      { r: 240, g: 240, b: 235, imgX: 0.6, imgY: 0.6 },
    ];

  const K = 4;
  const spread = [0.15, 0.4, 0.6, 0.85];
  const centroids = spread.map((t) => [...rawPixels[Math.floor(t * (rawPixels.length - 1))]]);

  for (let iter = 0; iter < 20; iter++) {
    const cls: number[][][] = Array.from({ length: K }, () => []);
    for (const p of rawPixels) {
      let best = 0;
      let bestD = Infinity;
      for (let j = 0; j < K; j++) {
        const d = colorDist(p, centroids[j]);
        if (d < bestD) {
          bestD = d;
          best = j;
        }
      }
      cls[best].push(p);
    }
    let changed = false;
    for (let j = 0; j < K; j++) {
      if (!cls[j].length) continue;
      const s = cls[j].reduce(
        (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3], a[4] + b[4]],
        [0, 0, 0, 0, 0],
      );
      const nc = s.map((v) => v / cls[j].length);
      if (colorDist(nc, centroids[j]) > 0.5) changed = true;
      centroids[j] = nc;
    }
    if (!changed) break;
  }

  const finalCls: number[][][] = Array.from({ length: K }, () => []);
  for (const p of rawPixels) {
    let best = 0;
    let bestD = Infinity;
    for (let j = 0; j < K; j++) {
      const d = colorDist(p, centroids[j]);
      if (d < bestD) {
        bestD = d;
        best = j;
      }
    }
    finalCls[best].push(p);
  }

  const summaries = centroids
    .map((c, i) => {
      if (!finalCls[i].length) return null;
      let bestPixel = finalCls[i][0];
      let bestPixelDist = Infinity;
      for (const p of finalCls[i]) {
        const d = colorDist([p[0], p[1], p[2]], [c[0], c[1], c[2]]);
        if (d < bestPixelDist) {
          bestPixelDist = d;
          bestPixel = p;
        }
      }
      return {
        r: Math.round(c[0]),
        g: Math.round(c[1]),
        b: Math.round(c[2]),
        imgX: bestPixel[3] / w,
        imgY: bestPixel[4] / h,
        size: finalCls[i].length,
      };
    })
    .filter(Boolean) as ExtractedColor[];

  let bestPair: [ExtractedColor, ExtractedColor] = [summaries[0], summaries[1] || summaries[0]];
  let bestDist = 0;
  for (let i = 0; i < summaries.length; i++) {
    for (let j = i + 1; j < summaries.length; j++) {
      const d = colorDist(
        [summaries[i].r, summaries[i].g, summaries[i].b],
        [summaries[j].r, summaries[j].g, summaries[j].b],
      );
      if (d > bestDist) {
        bestDist = d;
        bestPair = [summaries[i], summaries[j]];
      }
    }
  }

  bestPair.sort((a, b) => (b.size ?? 0) - (a.size ?? 0));
  return bestPair;
}

// ── Manual Color Parsing ─────────────────────────────────────────────────────

export function parseColorInput(str: string): RGB | null {
  str = str.trim();
  if (!str) return null;
  const rm = str.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rm) return { r: +rm[1], g: +rm[2], b: +rm[3] };
  const pr = str.match(/^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/);
  if (pr) {
    const r = +pr[1];
    const g = +pr[2];
    const b = +pr[3];
    if (r <= 255 && g <= 255 && b <= 255) return { r, g, b };
  }
  const hex = str.replace(/^#/, '');
  if (/^[0-9a-f]{6}$/i.test(hex))
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  if (/^[0-9a-f]{3}$/i.test(hex))
    return {
      r: parseInt(hex[0] + hex[0], 16),
      g: parseInt(hex[1] + hex[1], 16),
      b: parseInt(hex[2] + hex[2], 16),
    };
  return null;
}

export function parseMultiColor(str: string): RGB[] {
  str = str.trim();
  const single = parseColorInput(str);
  if (single) return [single];
  const parts = str
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const colors: RGB[] = [];
  let i = 0;
  while (i < parts.length) {
    if (
      i + 2 < parts.length &&
      /^\d+$/.test(parts[i]) &&
      /^\d+$/.test(parts[i + 1]) &&
      /^\d+$/.test(parts[i + 2])
    ) {
      const c = parseColorInput(parts[i] + ',' + parts[i + 1] + ',' + parts[i + 2]);
      if (c) {
        colors.push(c);
        i += 3;
        continue;
      }
    }
    const c = parseColorInput(parts[i]);
    if (c) colors.push(c);
    i++;
  }
  return colors;
}

// ── HSB ↔ RGB (for the color picker) ────────────────────────────────────────

export function hsbToRgb(h: number, s: number, b: number): RGB {
  const f = (n: number, k = (n + h / 60) % 6) => b - b * s * Math.max(0, Math.min(k, 4 - k, 1));
  return { r: Math.round(f(5) * 255), g: Math.round(f(3) * 255), b: Math.round(f(1) * 255) };
}

export function rgbToHsb(r: number, g: number, b: number): { h: number; s: number; b: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = (h * 60 + 360) % 360;
  }
  return { h, s: max ? d / max : 0, b: max };
}

// ── Image Processing Pipeline ────────────────────────────────────────────────

export type ProcessedResult = {
  filename: string;
  imgSrc: string;
  imgDataURL: string;
  imgWidth: number;
  imgHeight: number;
  colors: ExtractedColor[];
  primary: TokenMatch;
  secondary: TokenMatch;
};

export function processImageFile(file: File, lightSpectrum: Spectrum): Promise<ProcessedResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const max = 600;
          let w = img.width;
          let h = img.height;
          if (w > max || h > max) {
            const s = max / Math.max(w, h);
            w = Math.round(w * s);
            h = Math.round(h * s);
          }
          canvas.width = w;
          canvas.height = h;
          canvas.getContext('2d')!.drawImage(img, 0, 0, w, h);
          const colors = extractSubjectColors(canvas);
          if (colors.length < 2) throw new Error('Not enough colors');
          const sp = lightSpectrum;
          const bgMatch = findClosestPrimitive(colors[0].r, colors[0].g, colors[0].b, sp);
          const fgToken = 'gray0';
          const fgMatch: TokenMatch = { token: fgToken, hex: tokenHex(fgToken, sp) };
          const MAX_H = 280;
          const scale = h > MAX_H ? MAX_H / h : 1;
          const dispCanvas = document.createElement('canvas');
          dispCanvas.width = Math.round(w * scale);
          dispCanvas.height = Math.round(h * scale);
          dispCanvas.getContext('2d')!.drawImage(canvas, 0, 0, dispCanvas.width, dispCanvas.height);
          resolve({
            filename: file.name,
            imgSrc: e.target!.result as string,
            imgDataURL: dispCanvas.toDataURL('image/jpeg', 0.92),
            imgWidth: dispCanvas.width,
            imgHeight: dispCanvas.height,
            colors,
            primary: fgMatch,
            secondary: bgMatch,
          });
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = () => reject(new Error('Could not load image'));
      img.src = e.target!.result as string;
    };
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

// ── Browse Pairs ─────────────────────────────────────────────────────────────

export type AAAPair = {
  t1: string;
  t2: string;
  h1: string;
  h2: string;
  ratio: number;
};

export function buildAAAPairs(spectrum: Spectrum): AAAPair[] {
  const tokens = Object.keys(spectrum);
  const pairs: AAAPair[] = [];
  for (let i = 0; i < tokens.length; i++) {
    for (let j = i + 1; j < tokens.length; j++) {
      const t1 = tokens[i];
      const t2 = tokens[j];
      const h1 = tokenHex(t1, spectrum);
      const h2 = tokenHex(t2, spectrum);
      const r = contrastRatio(h1, h2);
      if (r >= 7) pairs.push({ t1, t2, h1, h2, ratio: r });
    }
  }
  return pairs.sort((a, b) => b.ratio - a.ratio);
}
