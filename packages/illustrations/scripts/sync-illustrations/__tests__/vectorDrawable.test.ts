import fs from 'node:fs';
import path from 'node:path';

import {
  androidNotExportableList,
  isNativelyExportable,
  notExportableList,
  toNativeSvg,
} from '../artifacts/nativeSvg';
import { toVectorDrawable } from '../artifacts/vectorDrawable';
import { ColorPalette } from '../colorPalette';
import type { Illustration } from '../illustration';
import { manifestIllustrations, readManifest } from '../manifest';

/**
 * The SVG to vector drawable conversion, construct by construct, and over every published
 * illustration.
 */

const fixture = (name: string) =>
  fs.readFileSync(path.join(__dirname, '__fixtures__', name), 'utf-8').trimEnd();

const illustration = (type: string, name: string): Illustration => ({
  nodeId: `1:${name}`,
  type,
  name,
  description: '',
  hash: `${name}-hash=`,
  version: 1,
  width: 8,
  height: 8,
  createdAt: '2024-01-01T00:00:00.000Z',
  lastUpdated: '2024-01-01T00:00:00.000Z',
});

const sample = illustration('pictogram', 'sample');

const svg = (body: string, attributes = ' fill="none" viewBox="0 0 8 8"') =>
  `<svg xmlns="http://www.w3.org/2000/svg"${attributes}>${body}</svg>`;

const root = (viewBox = '8 8', extraNamespaces = '') =>
  `<vector
    xmlns:android="http://schemas.android.com/apk/res/android"
${extraNamespaces}    xmlns:tools="http://schemas.android.com/tools"
    android:width="${viewBox.split(' ')[0]}dp"
    android:height="${viewBox.split(' ')[1]}dp"
    android:viewportWidth="${viewBox.split(' ')[0]}"
    android:viewportHeight="${viewBox.split(' ')[1]}"
    tools:ignore="VectorRaster,VectorPath">`;

const convert = (body: string, subject = sample, attributes?: string) =>
  toVectorDrawable(svg(body, attributes), subject);

const throwsExportError = (attempt: () => unknown, message = 'cannot be exported') => {
  try {
    attempt();
    return false;
  } catch (error) {
    return error instanceof Error && error.message.includes(message);
  }
};

describe('toVectorDrawable', () => {
  it("refuses a path longer than Android's resource string limit", () => {
    const segments = Array.from({ length: 4000 }, (_, i) => `L${i} ${i}`).join('');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" width="8" height="8"><path fill="#0052FF" d="M0 0${segments}z"/></svg>`;
    expect(() => toVectorDrawable(svg, { type: 'heroSquare', name: 'big' })).toThrow(
      /a path of \d+ characters exceeds Android's 32767-character resource string limit/,
    );
  });

  it('maps a filled even-odd path one to one', () => {
    expect(
      convert('<path fill="#0052FF" fill-rule="evenodd" d="M0 0h8v8H0z" clip-rule="evenodd"/>').xml,
    ).toBe(`${root()}
    <path
        android:pathData="M0 0h8v8H0z"
        android:fillColor="#0052FF"
        android:fillType="evenOdd" />
</vector>`);
  });

  it('maps strokes, omitting attributes at their defaults', () => {
    expect(
      convert(
        '<path stroke="#0A0B0E" stroke-width="2" d="M1 1h6"/>' +
          '<path stroke="#0A0B0E" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-opacity=".5" stroke-width="1.75" d="M1 7h6"/>',
      ).xml,
    ).toBe(`${root()}
    <path
        android:pathData="M1 1h6"
        android:strokeColor="#0A0B0E"
        android:strokeWidth="2" />
    <path
        android:pathData="M1 7h6"
        android:strokeColor="#0A0B0E"
        android:strokeWidth="1.75"
        android:strokeAlpha="0.5"
        android:strokeLineCap="round"
        android:strokeLineJoin="round"
        android:strokeMiterLimit="10" />
</vector>`);
  });

  it('inherits presentation attributes from groups and the root', () => {
    expect(
      convert(
        '<g fill="#0052FF" fill-rule="evenodd" stroke="#FFFFFF" stroke-width="2"><path d="M0 0h8v8H0z"/><path fill="none" d="M1 1h6"/></g>',
      ).xml,
    ).toBe(`${root()}
    <path
        android:pathData="M0 0h8v8H0z"
        android:fillColor="#0052FF"
        android:fillType="evenOdd"
        android:strokeColor="#FFFFFF"
        android:strokeWidth="2" />
    <path
        android:pathData="M1 1h6"
        android:strokeColor="#FFFFFF"
        android:strokeWidth="2" />
</vector>`);
  });

  it('skips shapes that paint nothing', () => {
    expect(convert('<path d="M0 0h8v8H0z"/><circle cx="4" cy="4" r="0" fill="#0052FF"/>').xml).toBe(
      root().replace(/>$/, ' />'),
    );
  });

  it('turns shapes into path data as the SVG spec defines them', () => {
    expect(
      convert(
        '<circle cx="4" cy="4" r="2" fill="#0052FF"/>' +
          '<ellipse cx="4" cy="4" rx="3" ry="1" fill="#0052FF"/>' +
          '<rect width="4" height="2" x="1" y="1" fill="#0052FF" rx="1"/>' +
          '<rect width="4" height="2" x="1" y="5" fill="#0052FF"/>' +
          '<line x1="0" y1="0" x2="8" y2="8" stroke="#0A0B0E"/>' +
          '<polygon points="0,0 8,0 4,8" fill="#0052FF"/>' +
          '<polyline points="0 8 4 0 8 8" stroke="#0A0B0E"/>',
      ).xml,
    ).toBe(`${root()}
    <path
        android:pathData="M6 4A2 2 0 0 1 4 6A2 2 0 0 1 2 4A2 2 0 0 1 4 2A2 2 0 0 1 6 4Z"
        android:fillColor="#0052FF" />
    <path
        android:pathData="M7 4A3 1 0 0 1 4 5A3 1 0 0 1 1 4A3 1 0 0 1 4 3A3 1 0 0 1 7 4Z"
        android:fillColor="#0052FF" />
    <path
        android:pathData="M2 1H4A1 1 0 0 1 5 2V2A1 1 0 0 1 4 3H2A1 1 0 0 1 1 2V2A1 1 0 0 1 2 1Z"
        android:fillColor="#0052FF" />
    <path
        android:pathData="M1 5H5V7H1Z"
        android:fillColor="#0052FF" />
    <path
        android:pathData="M0 0L8 8"
        android:strokeColor="#0A0B0E"
        android:strokeWidth="1" />
    <path
        android:pathData="M0 0L8 0L4 8Z"
        android:fillColor="#0052FF" />
    <path
        android:pathData="M0 8L4 0L8 8"
        android:strokeColor="#0A0B0E"
        android:strokeWidth="1" />
</vector>`);
  });

  it('expresses transforms as group attributes, rotations and reflections included', () => {
    expect(
      convert(
        '<circle cx="6" cy="2" r="1" stroke="#0A0B0E" stroke-width="2" transform="rotate(90 6 2)"/>' +
          '<circle cx="1" cy="1" r="1" fill="#0052FF" transform="matrix(0 -1 -1 0 8 8)"/>' +
          '<g transform="translate(1 2) scale(2)"><path fill="#0052FF" d="M0 0h1v1H0z"/></g>',
      ).xml,
    ).toBe(`${root()}
    <group
        android:rotation="90"
        android:translateX="8"
        android:translateY="-4">
        <path
            android:pathData="M7 2A1 1 0 0 1 6 3A1 1 0 0 1 5 2A1 1 0 0 1 6 1A1 1 0 0 1 7 2Z"
            android:strokeColor="#0A0B0E"
            android:strokeWidth="2" />
    </group>
    <group
        android:rotation="-90"
        android:scaleY="-1"
        android:translateX="8"
        android:translateY="8">
        <path
            android:pathData="M2 1A1 1 0 0 1 1 2A1 1 0 0 1 0 1A1 1 0 0 1 1 0A1 1 0 0 1 2 1Z"
            android:fillColor="#0052FF" />
    </group>
    <group
        android:scaleX="2"
        android:scaleY="2"
        android:translateX="1"
        android:translateY="2">
        <path
            android:pathData="M0 0h1v1H0z"
            android:fillColor="#0052FF" />
    </group>
</vector>`);
  });

  it('refuses a skewing transform, which a group cannot express', () => {
    expect(() => convert('<path fill="#0052FF" d="M0 0h8v8H0z" transform="skewX(10)"/>')).toThrow(
      'transform skewX() cannot be expressed as a <group>',
    );
    expect(() =>
      convert('<path fill="#0052FF" d="M0 0h8v8H0z" transform="matrix(1 0 1 1 0 0)"/>'),
    ).toThrow('skews, which a <group> cannot express');
  });

  it('clips a group with the clip path shape, honoring its clip rule', () => {
    expect(
      convert(
        '<defs><clipPath id="a"><path fill="#FFFFFF" d="M0 0h8v8H0z"/></clipPath>' +
          '<clipPath id="b"><rect width="4" height="4" fill="#FFFFFF" rx="1"/></clipPath>' +
          '<clipPath id="c"><path d="M0 0h8v8H0zM2 2h4v4H2z" clip-rule="evenodd"/></clipPath></defs>' +
          '<g clip-path="url(#a)"><path fill="#0052FF" d="M0 0h8v8H0z"/><g clip-path="url(#b)"><path fill="#FFFFFF" d="M1 1h2v2H1z"/></g></g>' +
          '<path fill="#0052FF" d="M0 0h8v8H0z" clip-path="url(#c)" transform="rotate(180 4 4)"/>',
      ).xml,
    ).toBe(`${root()}
    <group>
        <clip-path android:pathData="M0 0h8v8H0z" />
        <path
            android:pathData="M0 0h8v8H0z"
            android:fillColor="#0052FF" />
        <group>
            <clip-path android:pathData="M1 0H3A1 1 0 0 1 4 1V3A1 1 0 0 1 3 4H1A1 1 0 0 1 0 3V1A1 1 0 0 1 1 0Z" />
            <path
                android:pathData="M1 1h2v2H1z"
                android:fillColor="#FFFFFF" />
        </group>
    </group>
    <group
        android:rotation="180"
        android:translateX="8"
        android:translateY="8">
        <clip-path
            android:pathData="M0 0h8v8H0zM2 2h4v4H2z"
            android:fillType="evenOdd" />
        <path
            android:pathData="M0 0h8v8H0z"
            android:fillColor="#0052FF" />
    </group>
</vector>`);
  });

  it('inlines linear gradients with stop opacity in the color alpha and fill opacity as fillAlpha', () => {
    expect(
      convert(
        '<defs><linearGradient id="g" x1="0" x2="8" y1="4" y2="4" gradientUnits="userSpaceOnUse">' +
          '<stop stop-color="#FFFFFF" stop-opacity=".5"/><stop offset="50%" stop-color="#00003D"/><stop offset="1" stop-color="#49D6F6" stop-opacity="0"/>' +
          '</linearGradient></defs>' +
          '<path fill="url(#g)" fill-opacity=".49" d="M0 0h8v8H0z"/>' +
          '<path stroke="url(#g)" stroke-width="2" d="M0 4h8"/>',
      ).xml,
    ).toBe(`${root('8 8', '    xmlns:aapt="http://schemas.android.com/aapt"\n')}
    <path
        android:pathData="M0 0h8v8H0z"
        android:fillAlpha="0.49">
        <aapt:attr name="android:fillColor">
            <gradient
                android:type="linear"
                android:startX="0"
                android:startY="4"
                android:endX="8"
                android:endY="4">
                <item
                    android:offset="0"
                    android:color="#80FFFFFF" />
                <item
                    android:offset="0.5"
                    android:color="#FF00003D" />
                <item
                    android:offset="1"
                    android:color="#0049D6F6" />
            </gradient>
        </aapt:attr>
    </path>
    <path
        android:pathData="M0 4h8"
        android:strokeWidth="2">
        <aapt:attr name="android:strokeColor">
            <gradient
                android:type="linear"
                android:startX="0"
                android:startY="4"
                android:endX="8"
                android:endY="4">
                <item
                    android:offset="0"
                    android:color="#80FFFFFF" />
                <item
                    android:offset="0.5"
                    android:color="#FF00003D" />
                <item
                    android:offset="1"
                    android:color="#0049D6F6" />
            </gradient>
        </aapt:attr>
    </path>
</vector>`);
  });

  it('folds element opacity into fill and stroke alpha', () => {
    expect(
      convert(
        '<path fill="#0052FF" fill-opacity=".5" d="M0 0h8v8H0z" opacity=".5"/>' +
          '<g opacity=".92"><path stroke="#0A0B0E" d="M0 4h8"/></g>',
      ).xml,
    ).toBe(`${root()}
    <path
        android:pathData="M0 0h8v8H0z"
        android:fillColor="#0052FF"
        android:fillAlpha="0.25" />
    <path
        android:pathData="M0 4h8"
        android:strokeColor="#0A0B0E"
        android:strokeWidth="1"
        android:strokeAlpha="0.92" />
</vector>`);
  });

  it('translates a viewBox that does not start at the origin', () => {
    expect(
      convert('<path fill="#0052FF" d="M2 2h8v8H2z"/>', sample, ' fill="none" viewBox="2 2 8 8"')
        .xml,
    ).toBe(
      `${root()}
    <group
        android:translateX="-2"
        android:translateY="-2">
        <path
            android:pathData="M2 2h8v8H2z"
            android:fillColor="#0052FF" />
    </group>
</vector>`,
    );
  });

  describe('approximations', () => {
    it('drops the dashes of heroSquare/primeDeFi and reports it', () => {
      const drawable = toVectorDrawable(
        fixture('expected-heroSquare-primeDeFi-4-light.svg'),
        illustration('heroSquare', 'primeDeFi'),
      );
      expect(drawable.xml).not.toContain('dash');
      expect([...drawable.approximated]).toEqual(['stroke-dasharray']);
    });

    it('folds the group opacity of heroSquare/cbmega into its three shapes and reports it', () => {
      const drawable = toVectorDrawable(
        fixture('expected-heroSquare-cbmega-0-light.svg'),
        illustration('heroSquare', 'cbmega'),
      );
      expect(drawable.xml.match(/android:fillAlpha="0.92"/g)).toHaveLength(3);
      expect([...drawable.approximated]).toEqual(['group-opacity']);
    });

    it('refuses the same constructs on an illustration that is not on the list', () => {
      expect(() => convert('<path stroke="#0A0B0E" stroke-dasharray="4 4" d="M0 4h8"/>')).toThrow(
        'a dashed stroke (stroke-dasharray="4 4") cannot be drawn exactly on android',
      );
      expect(() =>
        convert(
          '<g opacity=".5"><path fill="#0052FF" d="M0 0h4v4H0z"/><path fill="#0052FF" d="M4 4h4v4H4z"/></g>',
        ),
      ).toThrow('a group of 2 shapes with opacity .5 cannot be drawn exactly on android');
      expect(() =>
        convert('<path fill="#0052FF" stroke="#0A0B0E" d="M0 0h8v8H0z" opacity=".5"/>'),
      ).toThrow('a filled and stroked shape with opacity .5 cannot be drawn exactly on android');
    });
  });

  it('converts every published illustration, light and dark, except the not-exportable list', () => {
    const packageRoot = path.join(__dirname, '../../..');
    const manifest = readManifest(path.join(packageRoot, 'manifest.json'));
    const palette = new ColorPalette(
      Object.entries(manifest.colors).map(([name, colors]) => ({ name, ...colors })),
    );
    const illustrations = manifestIllustrations(manifest);
    expect(illustrations.length).toBeGreaterThan(1500);

    const approximated = new Map<string, string[]>();
    const notExportable: { key: string; fails: boolean }[] = [];
    const androidOnly = new Set<string>();
    for (const item of illustrations) {
      const light = fs.readFileSync(
        path.join(
          packageRoot,
          'src/__generated__',
          item.type,
          'svg/light',
          `${item.name}-${item.version}.svg`,
        ),
        'utf-8',
      );
      if (!isNativelyExportable(item, 'ios')) {
        // Every listed illustration must still be unexportable, or the entry is stale.
        const attempt = () => toNativeSvg(item, light, palette);
        notExportable.push({ key: `${item.type}/${item.name}`, fails: throwsExportError(attempt) });
        continue;
      }
      const native = toNativeSvg(item, light, palette);
      const features = new Set(native.approximated);
      for (const theme of ['light', 'dark'] as const) {
        if (!isNativelyExportable(item, 'android')) {
          // iOS ships it; Android must still refuse it, or the entry is stale.
          const attempt = () => toVectorDrawable(native[theme], item);
          androidOnly.add(`${item.type}/${item.name}`);
          if (!throwsExportError(attempt, 'resource string limit'))
            androidOnly.add(`converts: ${item.type}/${item.name}`);
          continue;
        }
        const drawable = toVectorDrawable(native[theme], item);
        expect(drawable.xml).toMatch(/^<vector\n[^]*\n<\/vector>$/);
        drawable.approximated.forEach((feature) => features.add(feature));
      }
      if (features.size) approximated.set(`${item.type}/${item.name}`, [...features].sort());
    }
    expect(Object.fromEntries(approximated)).toEqual({
      'heroSquare/cbmega': ['group-opacity'],
      'heroSquare/primeDeFi': ['stroke-dasharray'],
      'heroSquare/usdj': ['mix-blend-mode'],
    });
    expect(notExportable.map(({ key }) => key).sort()).toEqual(
      Object.keys(notExportableList).sort(),
    );
    expect(notExportable.filter(({ fails }) => !fails)).toEqual([]);
    expect([...androidOnly].sort()).toEqual(Object.keys(androidNotExportableList).sort());
  });
});
