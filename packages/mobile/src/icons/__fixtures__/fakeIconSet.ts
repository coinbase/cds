import { createIcon, type GlyphMap } from '../createIcon';

/**
 * Stand-in for a consumer-owned icon package (the real motivating case is
 * `@cbhq/retail-icons`), so the `IconComponent` POC's assertions are
 * self-contained and this package takes on no new dependency.
 *
 * Names are deliberately chosen not to collide with any built-in CDS icon name,
 * which is what lets the negative type assertions be meaningful.
 */
export const fakeIconNames = ['fakeCompass', 'fakeSatellite'] as const;

export type FakeIconName = (typeof fakeIconNames)[number];

const firstPrivateUseCodePoint = 0xe000;
const sourcePixelSizes = [12, 16, 24] as const;
const glyphStates = ['active', 'inactive'] as const;

/** One distinct glyph per fake icon, at every size and state. */
export const fakeGlyphs = Object.fromEntries(
  fakeIconNames.map((name, index) => [
    name,
    String.fromCodePoint(firstPrivateUseCodePoint + index),
  ]),
) as Record<FakeIconName, string>;

const fakeGlyphMap = Object.fromEntries(
  fakeIconNames.flatMap((name) =>
    sourcePixelSizes.flatMap((pixelSize) =>
      glyphStates.map((state) => [`${name}-${pixelSize}-${state}`, fakeGlyphs[name]]),
    ),
  ),
) as GlyphMap<FakeIconName>;

export const FakeIcon = createIcon<FakeIconName>({
  glyphMap: fakeGlyphMap,
  fontFamily: 'FakeIcons',
});
