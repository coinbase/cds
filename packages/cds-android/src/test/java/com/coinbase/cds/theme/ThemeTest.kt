package com.coinbase.cds.theme

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import org.junit.Assert.assertEquals
import org.junit.Assert.assertThrows
import org.junit.Test

/**
 * [CdsThemeProvider], [CdsInvertedThemeProvider], and the ambient reads on [CdsTheme]'s companion.
 *
 * These run in a headless composition -- see [composeOnce]. Nothing here emits UI or recomposes;
 * every assertion is on a token value resolved through the composition local.
 */
class ThemeTest {

    private val brand = cdsTheme {
        id = "brand"
        lightColors { bgPrimary = Color(0xFF0052FF) }
        darkColors { bgPrimary = Color(0xFF578BFA) }
        space { x2 = 24.dp }
    }

    private val other = cdsTheme {
        id = "other"
        lightColors { bgPrimary = Color(0xFFFF8A00) }
    }

    @Test
    fun `provider resolves the color set for its scheme and passes the rest through`() {
        lateinit var lightColors: CdsColors
        lateinit var darkColors: CdsColors
        lateinit var lightSpace: CdsSpace
        lateinit var darkSpace: CdsSpace

        composeOnce {
            CdsThemeProvider(theme = brand, colorScheme = CdsColorScheme.Light) {
                lightColors = CdsTheme.colors
                lightSpace = CdsTheme.space
            }
            CdsThemeProvider(theme = brand, colorScheme = CdsColorScheme.Dark) {
                darkColors = CdsTheme.colors
                darkSpace = CdsTheme.space
            }
        }

        assertEquals(brand.lightColors, lightColors)
        assertEquals(brand.darkColors, darkColors)
        // Scheme-independent axes resolve the same either way.
        assertEquals(brand.space, lightSpace)
        assertEquals(brand.space, darkSpace)
    }

    @Test
    fun `reading a token outside any provider fails`() {
        val error = assertThrows(IllegalStateException::class.java) {
            composeOnce { CdsTheme.colors }
        }

        assertEquals("No CDS theme found. Wrap your composables in CdsThemeProvider.", error.message)
    }

    @Test
    fun `a nested provider with no arguments changes nothing`() {
        lateinit var nested: CdsTheme.Resolved

        composeOnce {
            CdsThemeProvider(theme = brand, colorScheme = CdsColorScheme.Dark) {
                // Must inherit both axes rather than reverting to CdsDefaultTheme plus the system
                // scheme, which is what a non-CompositionLocal-reading default would do.
                CdsThemeProvider {
                    nested = requireNotNull(LocalCdsTheme.current)
                }
            }
        }

        assertEquals(brand, nested.theme)
        assertEquals(CdsColorScheme.Dark, nested.colorScheme)
    }

    @Test
    fun `a nested provider overrides only the axis it is given`() {
        lateinit var themeOnly: CdsTheme.Resolved
        lateinit var schemeOnly: CdsTheme.Resolved

        composeOnce {
            CdsThemeProvider(theme = brand, colorScheme = CdsColorScheme.Dark) {
                CdsThemeProvider(theme = other) {
                    themeOnly = requireNotNull(LocalCdsTheme.current)
                }
                CdsThemeProvider(colorScheme = CdsColorScheme.Light) {
                    schemeOnly = requireNotNull(LocalCdsTheme.current)
                }
            }
        }

        assertEquals(other, themeOnly.theme)
        assertEquals(CdsColorScheme.Dark, themeOnly.colorScheme)

        assertEquals(brand, schemeOnly.theme)
        assertEquals(CdsColorScheme.Light, schemeOnly.colorScheme)
    }

    @Test
    fun `inverted provider flips the scheme and keeps the theme`() {
        lateinit var outerColors: CdsColors
        lateinit var inverted: CdsTheme.Resolved
        lateinit var invertedColors: CdsColors

        composeOnce {
            CdsThemeProvider(theme = brand, colorScheme = CdsColorScheme.Light) {
                outerColors = CdsTheme.colors
                CdsInvertedThemeProvider {
                    inverted = requireNotNull(LocalCdsTheme.current)
                    invertedColors = CdsTheme.colors
                }
            }
        }

        assertEquals(brand, inverted.theme)
        assertEquals(CdsColorScheme.Dark, inverted.colorScheme)
        assertEquals(brand.lightColors, outerColors)
        assertEquals(brand.darkColors, invertedColors)
    }

    @Test
    fun `inverting twice returns to the enclosing scheme`() {
        lateinit var doubleInverted: CdsTheme.Resolved

        composeOnce {
            CdsThemeProvider(theme = brand, colorScheme = CdsColorScheme.Light) {
                CdsInvertedThemeProvider {
                    CdsInvertedThemeProvider {
                        doubleInverted = requireNotNull(LocalCdsTheme.current)
                    }
                }
            }
        }

        assertEquals(brand, doubleInverted.theme)
        assertEquals(CdsColorScheme.Light, doubleInverted.colorScheme)
    }

    @Test
    fun `inverted provider without an ancestor fails`() {
        val error = assertThrows(IllegalStateException::class.java) {
            composeOnce {
                CdsInvertedThemeProvider {}
            }
        }

        assertEquals("CdsInvertedThemeProvider requires a CdsThemeProvider ancestor.", error.message)
    }
}
