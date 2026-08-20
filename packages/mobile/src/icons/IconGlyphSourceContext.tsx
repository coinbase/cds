import React, { createContext, useContext } from 'react';

import type { IconGlyphSource } from './createIcon';

const IconGlyphSourceContext = createContext<IconGlyphSource<any> | undefined>(undefined);

/** The nearest ancestor provider's glyph source, or `undefined` to fall back to the bound set. */
export function useIconGlyphSource(): IconGlyphSource<any> | undefined {
  return useContext(IconGlyphSourceContext);
}

export type IconGlyphSourceProviderProps = {
  /**
   * Consulted before the built-in glyphs. A nested provider replaces it. Its
   * font must be loaded (e.g. via `expo-font`).
   */
  source: IconGlyphSource<any>;
  children: React.ReactNode;
};

/**
 * Adds a custom glyph source to every CDS icon rendered below.
 *
 * Scope this to a subtree: a source reusing a built-in name re-skins that icon
 * everywhere below, including icons CDS renders internally (`close`, `caretUp`,
 * `checkmark`). Its names must be names the icon component already accepts.
 */
export function IconGlyphSourceProvider({ source, children }: IconGlyphSourceProviderProps) {
  return (
    <IconGlyphSourceContext.Provider value={source}>{children}</IconGlyphSourceContext.Provider>
  );
}
