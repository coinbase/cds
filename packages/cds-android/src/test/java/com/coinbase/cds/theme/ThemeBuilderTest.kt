package com.coinbase.cds.theme

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotEquals
import org.junit.Test

/** [cdsTheme] -- the whole public surface for creating a [CdsTheme]. */
class ThemeBuilderTest {

    private val brandBlue = Color(0xFF0052FF)
    private val brandOrange = Color(0xFFFF8A00)

    @Test
    fun `builder overrides only the tokens it sets`() {
        val theme = cdsTheme {
            id = "brand"
            lightColors { bgPrimary = brandBlue }
        }

        assertEquals("brand", theme.id)
        assertEquals(brandBlue, theme.lightColors.bgPrimary)

        // Everything else falls through to the base, including the sibling scheme -- the documented
        // tradeoff of a builder over a constructor, and the property brand themes rely on.
        assertEquals(CdsDefaultTheme.lightColors.bg, theme.lightColors.bg)
        assertEquals(CdsDefaultTheme.darkColors, theme.darkColors)
        assertEquals(CdsDefaultTheme.space, theme.space)
        assertEquals(CdsDefaultTheme.typography, theme.typography)
    }

    @Test
    fun `builder defaults id to the base theme's`() {
        val theme = cdsTheme { lightColors { bgPrimary = brandBlue } }

        assertEquals(CdsDefaultTheme.id, theme.id)
    }

    @Test
    fun `an explicit base carries that theme's overrides forward`() {
        val brand = cdsTheme {
            id = "brand"
            lightColors { bgPrimary = brandBlue }
            space { x2 = 24.dp }
        }

        val dense = cdsTheme(base = brand) {
            id = "brand-dense"
            space { x2 = 12.dp }
        }

        assertEquals("brand-dense", dense.id)
        assertEquals(12.dp, dense.space.x2)
        // Untouched by the derivation, but inherited from `brand` rather than CdsDefaultTheme.
        assertEquals(brandBlue, dense.lightColors.bgPrimary)
        assertEquals(24.dp, brand.space.x2)
    }

    @Test
    fun `themes compare by value`() {
        // Load-bearing rather than cosmetic: CdsThemeProvider keys `remember` on the theme, so
        // identity equality would re-resolve and invalidate the subtree on every recomposition of a
        // theme built inline at a call site.
        val build = { accent: Color ->
            cdsTheme {
                id = "brand"
                lightColors { bgPrimary = accent }
            }
        }

        assertEquals(build(brandBlue), build(brandBlue))
        assertEquals(build(brandBlue).hashCode(), build(brandBlue).hashCode())
        assertNotEquals(build(brandBlue), build(brandOrange))
    }
}
