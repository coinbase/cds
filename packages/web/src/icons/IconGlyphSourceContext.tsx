import React, { createContext, useContext, useMemo } from 'react';

import type { CreateIconConfig } from './createIcon';

/**
 * An icon font and the glyphs it provides — the same shape `createIcon` takes,
 * so an icon package exposes one object usable either way.
 */
export type IconGlyphSource<Name extends string = string> = CreateIconConfig<Name>;

const NO_SOURCES: readonly IconGlyphSource<any>[] = [];

const IconGlyphSourceContext = createContext(NO_SOURCES);

/** Glyph sources added by ancestor providers, innermost last. */
export function useIconGlyphSources(): readonly IconGlyphSource<any>[] {
  return useContext(IconGlyphSourceContext);
}

export type IconGlyphSourceProviderProps = {
  /**
   * Glyph source to add. It's consulted before the built-in CDS glyphs, so it
   * can also override an individual built-in icon. Nest providers to add more
   * than one source; the innermost wins.
   */
  source: IconGlyphSource<any>;
  children: React.ReactNode;
};

/**
 * Adds a custom glyph source to every CDS icon rendered below. Because all
 * name-prop components (`IconButton`, `Button`, `Tag`, …) render the same
 * `Icon`, and `Icon` consults this context itself, no component needs to change.
 *
 * Pair with `Cds.IconNameRegistry` registration so the added names type-check.
 */
export function IconGlyphSourceProvider({ source, children }: IconGlyphSourceProviderProps) {
  const inherited = useIconGlyphSources();
  const value = useMemo(() => [source, ...inherited], [source, inherited]);

  return (
    <IconGlyphSourceContext.Provider value={value}>{children}</IconGlyphSourceContext.Provider>
  );
}
