import React, { createContext, useContext, useMemo } from 'react';

import type { IconGlyphSource } from './createIcon';

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
 * Scope this to the subtree that wants the custom glyphs rather than the app
 * root: every icon below resolves against the source first, so a source sharing
 * a name with a built-in icon re-skins that icon throughout the subtree,
 * including the icons CDS renders internally (`close`, `caretUp`, `checkmark`).
 *
 * The source's names must be names the icon component already accepts; the
 * `name` prop's type is unchanged.
 */
export function IconGlyphSourceProvider({ source, children }: IconGlyphSourceProviderProps) {
  const inherited = useIconGlyphSources();
  const value = useMemo(() => [source, ...inherited], [source, inherited]);

  return (
    <IconGlyphSourceContext.Provider value={value}>{children}</IconGlyphSourceContext.Provider>
  );
}
