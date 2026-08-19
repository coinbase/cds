import React, { createContext, useContext } from 'react';

import type { IconGlyphSource } from './createIcon';

const IconGlyphSourceContext = createContext<IconGlyphSource<any> | undefined>(undefined);

/** Glyph source added by the nearest ancestor provider, if there is one. */
export function useIconGlyphSource(): IconGlyphSource<any> | undefined {
  return useContext(IconGlyphSourceContext);
}

export type IconGlyphSourceProviderProps = {
  /**
   * Glyph source to add. It's consulted before the built-in CDS glyphs, so it
   * can also override an individual built-in icon. Only the nearest provider
   * applies: nesting one inside another replaces the outer source rather than
   * adding to it.
   *
   * The source's font must be loaded (e.g. via `expo-font`) for its glyphs to
   * render.
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
  return (
    <IconGlyphSourceContext.Provider value={source}>{children}</IconGlyphSourceContext.Provider>
  );
}
