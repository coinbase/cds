import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import {
  approximationList,
  approximationSummary,
  assertApproximationsApplied,
  generatedXmlComment,
  isCurrentAssetFile,
  parseStamp,
  renderStamp,
  toNativeSvg,
} from '../artifacts/nativeSvg';
import { ColorPalette } from '../colorPalette';
import type { Illustration } from '../illustration';

/**
 * The shared preparation of an illustration for the native renderers: what it rewrites, what it
 * approximates, and what it refuses.
 */

const fixture = (name: string) =>
  fs.readFileSync(path.join(__dirname, '__fixtures__', name), 'utf-8').trimEnd();

const palette = new ColorPalette([
  { name: 'accent-2', light: '#5DE2F8', dark: '#45D9F5' },
  { name: 'invert', light: '#0A0B0E', dark: '#FFFFFF' },
  { name: 'primary', light: '#0052FF', dark: '#578BFA' },
  { name: 'white', light: '#FFFFFF', dark: '#FFFFFF' },
]);

const illustration = (type: string, name: string, version = 1): Illustration => ({
  nodeId: `1:${name}`,
  type,
  name,
  description: '',
  hash: `${name}-hash=`,
  version,
  width: 8,
  height: 8,
  createdAt: '2024-01-01T00:00:00.000Z',
  lastUpdated: '2024-01-01T00:00:00.000Z',
});

const svg = (body: string, attributes = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 8"${attributes}>${body}</svg>`;

const prepare = (body: string, subject = illustration('pictogram', 'sample')) =>
  toNativeSvg(subject, svg(body), palette);

describe('the stamp', () => {
  const subject = illustration('spotIcon', '2fa', 3);

  it('round-trips through the generated comment', () => {
    const comment = generatedXmlComment(subject);
    expect(comment).toBe(`<!--
  Generated outside this repository by the CDS illustration sync. Do not edit.
  https://github.com/coinbase/cds/blob/master/packages/illustrations/scripts/sync-illustrations/README.md
  cds-illustration spotIcon 2fa 3 2fa-hash=
-->`);
    expect(parseStamp(`${comment}\n<svg/>`)).toEqual({
      type: 'spotIcon',
      name: '2fa',
      version: 3,
      hash: '2fa-hash=',
    });
    expect(renderStamp(subject)).toBe('cds-illustration spotIcon 2fa 3 2fa-hash=');
  });

  it('is absent from files that were not generated', () => {
    expect(parseStamp('<svg/>')).toBeUndefined();
    expect(parseStamp('<!-- cds-illustration spotIcon 2fa -->')).toBeUndefined();
  });

  it('decides whether an asset file is current', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'native-stamp-'));
    const file = path.join(dir, 'asset.svg');
    try {
      expect(await isCurrentAssetFile(file, subject)).toBe(false);
      fs.writeFileSync(file, `${generatedXmlComment(subject)}\n<svg/>`);
      expect(await isCurrentAssetFile(file, subject)).toBe(true);
      expect(await isCurrentAssetFile(file, { ...subject, version: 4 })).toBe(false);
      expect(await isCurrentAssetFile(file, { ...subject, hash: 'other' })).toBe(false);
      expect(await isCurrentAssetFile(file, { ...subject, name: '2FA' })).toBe(false);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe('toNativeSvg', () => {
  it('leaves an SVG both renderers can draw untouched and derives the dark variant', () => {
    const body =
      '<path fill="#0052FF" fill-rule="evenodd" d="M0 0h8v8H0z" clip-rule="evenodd"/>' +
      '<circle cx="4" cy="4" r="2" stroke="#0A0B0E" stroke-width="2" transform="rotate(90 4 4)"/>';
    const native = prepare(body);
    expect(native.light).toBe(svg(body));
    expect(native.dark).toBe(svg(body.replace('#0052FF', '#578BFA').replace('#0A0B0E', '#FFFFFF')));
    expect([...native.approximated]).toEqual([]);
  });

  it('rewrites the alpha mask of heroSquare/buy as a clip inside its region', () => {
    const native = toNativeSvg(
      illustration('heroSquare', 'buy'),
      fixture('expected-heroSquare-buy-1-light.svg'),
      palette,
    );
    expect(native.light).not.toContain('<mask');
    expect(native.light).not.toContain('mask=');
    expect(native.light).toContain(
      '<clipPath id="a"><path d="m47.256 202.478-5.576-90.469h159.029l-7.947 90.469z"/></clipPath>' +
        '<clipPath id="a-region"><path d="M41 112h160v91H41z"/></clipPath>' +
        '<g clip-path="url(#a-region)"><g fill="#0A0B0F" fill-rule="evenodd" clip-rule="evenodd" clip-path="url(#a)">',
    );
    expect([...native.approximated]).toEqual([]);
  });

  it('rewrites the white luminance mask of spotRectangle/stressTestedColdStorage as an even-odd clip', () => {
    const native = toNativeSvg(
      illustration('spotRectangle', 'stressTestedColdStorage'),
      fixture('expected-spotRectangle-stressTestedColdStorage-4-light.svg'),
      palette,
    );
    expect(native.light).not.toContain('<mask');
    expect(native.light).toMatch(
      /<clipPath id="a"><path d="M90 110c[^"]+" clip-rule="evenodd"\/><\/clipPath>/,
    );
    expect(native.light).toMatch(/<path fill="#0A0B0E" d="M108 90c[^"]+" clip-path="url\(#a\)"\/>/);
    expect(native.light).not.toContain('-region');
  });

  it('drops the screen blend of heroSquare/usdj, which is on the approximation list', () => {
    const native = toNativeSvg(
      illustration('heroSquare', 'usdj'),
      fixture('expected-heroSquare-usdj-0-light.svg'),
      palette,
    );
    expect(native.light).not.toContain('mix-blend-mode');
    expect(native.light).not.toContain('style=');
    expect(native.light).toContain('<linearGradient id="d"');
    expect([...native.approximated]).toEqual(['mix-blend-mode']);
    expect(() =>
      assertApproximationsApplied(illustration('heroSquare', 'usdj'), 'ios', native.approximated),
    ).not.toThrow();
  });

  it('keeps dashes and group opacity, which iOS draws and Android approximates on its own', () => {
    const dashed = toNativeSvg(
      illustration('heroSquare', 'primeDeFi'),
      fixture('expected-heroSquare-primeDeFi-4-light.svg'),
      palette,
    );
    expect(dashed.light).toContain('stroke-dasharray="4 4"');
    const grouped = toNativeSvg(
      illustration('heroSquare', 'cbmega'),
      fixture('expected-heroSquare-cbmega-0-light.svg'),
      palette,
    );
    expect(grouped.light).toContain('<g fill="#0052FF" opacity=".92">');
  });

  it('fails on a blend the approximation list does not allow for the illustration', () => {
    expect(() =>
      prepare('<path fill="#0052FF" d="M0 0h8v8H0z" style="mix-blend-mode:screen"/>'),
    ).toThrow(
      /pictogram\/sample cannot be exported to the native packages[^]*a `screen` blend cannot be drawn exactly on ios and android/,
    );
    expect(() =>
      prepare('<path fill="#0052FF" d="M0 0h8v8H0z" style="mix-blend-mode:multiply"/>'),
    ).toThrow('mix-blend-mode:multiply is not supported');
  });

  it('includes the Figma link when it has one', () => {
    expect(() =>
      toNativeSvg(illustration('pictogram', 'sample'), svg('<text>hi</text>'), palette, {
        componentUrl: 'https://www.figma.com/design/x?node-id=1-sample',
      }),
    ).toThrow(
      /<text> is not supported\n {2}Fix it in Figma: https:\/\/www\.figma\.com\/design\/x\?node-id=1-sample/,
    );
  });

  describe('masks that are not clips', () => {
    const masked = (mask: string) =>
      prepare(`${mask}<path fill="#0052FF" d="M0 0h8v8H0z" mask="url(#m)"/>`);

    it.each([
      [
        'two shapes',
        '<mask id="m"><path fill="#FFFFFF" d="M0 0h4v4H0z"/><path fill="#FFFFFF" d="M4 4h4v4H4z"/></mask>',
        'exactly one shape',
      ],
      [
        'a translucent shape',
        '<mask id="m"><path fill="#FFFFFF" fill-opacity=".5" d="M0 0h4v4H0z"/></mask>',
        'fill-opacity on a <mask> shape is not supported',
      ],
      [
        'a stroked shape',
        '<mask id="m"><path fill="#FFFFFF" stroke="#FFFFFF" d="M0 0h4v4H0z"/></mask>',
        'stroke on a <mask> shape is not supported',
      ],
      [
        'a gray luminance mask',
        '<mask id="m"><path fill="#CED2DB" d="M0 0h4v4H0z"/></mask>',
        'not fully opaque',
      ],
      [
        'an unfilled alpha mask',
        '<mask id="m" style="mask-type:alpha"><path fill="none" d="M0 0h4v4H0z"/></mask>',
        'cannot become a clip',
      ],
      [
        'a region in bounding-box units',
        '<mask id="m" x="0" y="0" width="4" height="4"><path fill="#FFFFFF" d="M0 0h4v4H0z"/></mask>',
        'maskUnits="userSpaceOnUse"',
      ],
      [
        'a transformed shape',
        '<mask id="m"><path fill="#FFFFFF" d="M0 0h4v4H0z" transform="rotate(45)"/></mask>',
        'transform on a <mask> shape is not supported',
      ],
    ])('rejects %s', (_, mask, reason) => {
      expect(() => masked(mask)).toThrow(reason);
    });

    it('rejects a mask nothing references', () => {
      expect(() => prepare('<mask id="m"><path fill="#FFFFFF" d="M0 0h4v4H0z"/></mask>')).toThrow(
        '<mask id="m"> is never used',
      );
    });
  });

  describe('what neither renderer can draw', () => {
    it.each([
      [
        'radial gradients',
        '<defs><radialGradient id="g"><stop stop-color="#FFFFFF"/><stop offset="1" stop-color="#000000"/></radialGradient></defs><path fill="url(#g)" d="M0 0h8v8H0z"/>',
        '<radialGradient> is not supported',
      ],
      [
        'filters',
        '<filter id="f"/><path fill="#0052FF" d="M0 0h8v8H0z" filter="url(#f)"/>',
        '<filter> is not supported',
      ],
      ['images', '<image href="x.png" width="8" height="8"/>', '<image> is not supported'],
      ['patterns', '<pattern id="p"/>', '<pattern> is not supported'],
      ['use', '<use href="#x"/>', '<use> is not supported'],
      ['text', '<text>hi</text>', '<text> is not supported'],
      [
        'unknown attributes',
        '<path fill="#0052FF" d="M0 0h8v8H0z" vector-effect="non-scaling-stroke"/>',
        'vector-effect on <path> is not supported',
      ],
      [
        'unknown styles',
        '<path fill="#0052FF" d="M0 0h8v8H0z" style="opacity:.5"/>',
        'style "opacity:.5" on <path> is not supported',
      ],
      [
        'dangling clip references',
        '<g clip-path="url(#nope)"><path fill="#0052FF" d="M0 0h8v8H0z"/></g>',
        'references no <clipPath>',
      ],
      [
        'dangling gradient references',
        '<path fill="url(#nope)" d="M0 0h8v8H0z"/>',
        'references no <linearGradient>',
      ],
      [
        'alpha hex colors',
        '<path fill="#0052FF80" d="M0 0h8v8H0z"/>',
        'is not a 6-digit hex color',
      ],
      [
        'unknown keywords',
        '<path fill="#0052FF" fill-rule="inherit" d="M0 0h8v8H0z"/>',
        'fill-rule="inherit" is not supported',
      ],
      [
        'bounding-box gradients',
        '<defs><linearGradient id="g"><stop stop-color="#FFFFFF"/><stop offset="1" stop-color="#000000"/></linearGradient></defs><path fill="url(#g)" d="M0 0h8v8H0z"/>',
        'gradientUnits="userSpaceOnUse"',
      ],
      [
        'gradient transforms',
        '<defs><linearGradient id="g" x1="0" x2="8" y1="0" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="rotate(45)"><stop stop-color="#FFFFFF"/><stop offset="1" stop-color="#000000"/></linearGradient></defs><path fill="url(#g)" d="M0 0h8v8H0z"/>',
        'gradientTransform on <linearGradient> is not supported',
      ],
      [
        'single-stop gradients',
        '<defs><linearGradient id="g" x1="0" x2="8" y1="0" y2="0" gradientUnits="userSpaceOnUse"><stop stop-color="#FFFFFF"/></linearGradient></defs><path fill="url(#g)" d="M0 0h8v8H0z"/>',
        'at least two <stop>s',
      ],
      [
        'decreasing stops',
        '<defs><linearGradient id="g" x1="0" x2="8" y1="0" y2="0" gradientUnits="userSpaceOnUse"><stop offset="1" stop-color="#FFFFFF"/><stop offset=".5" stop-color="#000000"/></linearGradient></defs><path fill="url(#g)" d="M0 0h8v8H0z"/>',
        'offsets must not decrease',
      ],
      [
        'multi-shape clips',
        '<defs><clipPath id="c"><path d="M0 0h4v4H0z"/><path d="M4 4h4v4H4z"/></clipPath></defs><g clip-path="url(#c)"><path fill="#0052FF" d="M0 0h8v8H0z"/></g>',
        'exactly one shape',
      ],
      [
        'transformed clip shapes',
        '<defs><clipPath id="c"><path d="M0 0h4v4H0z" transform="rotate(45)"/></clipPath></defs><g clip-path="url(#c)"><path fill="#0052FF" d="M0 0h8v8H0z"/></g>',
        'transform on a <clipPath> shape is not supported',
      ],
      [
        'duplicate ids',
        '<defs><clipPath id="c"><path d="M0 0h4v4H0z"/></clipPath><clipPath id="c"><path d="M0 0h4v4H0z"/></clipPath></defs>',
        'id "c" is used twice',
      ],
      [
        'transform syntax it cannot read',
        '<path fill="#0052FF" d="M0 0h8v8H0z" transform="rotate(45deg)"/>',
        'transform="rotate(45deg)" is not supported',
      ],
    ])('rejects %s', (_, body, reason) => {
      expect(() => prepare(body)).toThrow(reason);
    });

    it('rejects a document without a viewBox', () => {
      expect(() =>
        toNativeSvg(
          illustration('pictogram', 'sample'),
          '<svg xmlns="http://www.w3.org/2000/svg"/>',
          palette,
        ),
      ).toThrow('the <svg> has no viewBox');
    });
  });
});

describe('the approximation list', () => {
  it('names the three illustrations the census found', () => {
    expect(Object.keys(approximationList)).toEqual([
      'heroSquare/usdj',
      'heroSquare/primeDeFi',
      'heroSquare/cbmega',
    ]);
    expect(approximationSummary()).toHaveLength(3);
    expect(approximationSummary()[0]).toMatch(
      /^heroSquare\/usdj: mix-blend-mode \(ios, android\): /,
    );
  });

  it('flags an entry the art no longer needs', () => {
    expect(() =>
      assertApproximationsApplied(illustration('heroSquare', 'usdj'), 'android', new Set()),
    ).toThrow('heroSquare/usdj no longer needs the mix-blend-mode approximation on android');
    expect(() =>
      assertApproximationsApplied(illustration('heroSquare', 'primeDeFi'), 'ios', new Set()),
    ).not.toThrow();
    expect(() =>
      assertApproximationsApplied(illustration('heroSquare', 'primeDeFi'), 'android', new Set()),
    ).toThrow('stroke-dasharray approximation on android');
  });
});
