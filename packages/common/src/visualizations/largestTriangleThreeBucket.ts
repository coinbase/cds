/**
 * Downsampling timeseries data using the "Largest-Triangle-Three-Buckets algorithm" (LTTB) as described in Sveinn Steinarsson's 2013 Master's thesis Downsampling Time Series for Visual Representation.
 *
 * The algorithm is based on the technique of forming triangles between adjacent data points and using the area of the triangles to determine the perceptual importance of the individual points.
 * This helps to retain the visual characteristics of the original path whilst greatly reducing the number of points representing it.
 *
 * The threshold parameter for the algorithm is set at half the current width of the svg in pixels - so at most there is one point in the input domain represented for every two pixels in the output range.
 *
 * Using this method helps to avoid any alising issues that occur when a high number of points are drawn in a low number of pixels.
 * @param data
 * @param threshold
 * @returns number[]
 * @example https://bl.ocks.org/FraserChapman/649f1aba28f6bc941d5c
 */
export const largestTriangleThreeBucket = (data: number[], threshold: number) => {
  const m = Math.floor;
  const y = Math.abs;
  const f = data.length;

  if (threshold >= f || threshold === 0) {
    return data;
  }

  const n = [];
  let t = 0;
  const p = (f - 2) / (threshold - 2);
  let c = 0;
  let v = 0;
  let u = 0;
  let w = 0;

  n[t++] = data[c];

  for (let e = 0; e < threshold - 2; e++) {
    let g = 0;
    let h = 0;
    let a = m((e + 1) * p) + 1;
    let d = m((e + 2) * p) + 1;
    d = d < f ? d : f;
    let k = d - a;

    for (; a < d; a++) {
      g += +a;
      h += +data[a];
    }

    g /= k;
    h /= k;
    a = m((e + 0) * p) + 1;
    d = m((e + 1) * p) + 1;
    k = +c;
    const x = +data[c];
    c = -1;
    for (; a < d; a++) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      typeof data[a] !== 'undefined' &&
        ((u = 0.5 * y((k - g) * (data[a] - x) - (k - a) * (h - x))),
        u > c && ((c = u), (v = data[a]), (w = a)));
    }

    n[t++] = v;
    c = w;
  }

  n[t++] = data[f - 1];

  return n;
};
