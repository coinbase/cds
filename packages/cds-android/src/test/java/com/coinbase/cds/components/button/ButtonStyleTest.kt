package com.coinbase.cds.components.button

import androidx.compose.ui.graphics.Color
import com.coinbase.cds.theme.CdsColors
import com.coinbase.cds.theme.CdsDefaultTheme
import org.junit.Assert.assertEquals
import org.junit.Test

class ButtonStyleTest {
    private val light = CdsDefaultTheme.lightColors
    private val dark = CdsDefaultTheme.darkColors

    @Test
    fun filledPrimaryUsesPrimaryTokens() {
        val colors = resolveButtonColors(ButtonVariant.Primary, transparent = false, light)
        assertEquals(light.bgPrimary, colors.container)
        assertEquals(light.fgInverse, colors.content)
    }

    @Test
    fun filledInverseUsesInverseTokens() {
        val colors = resolveButtonColors(ButtonVariant.Inverse, transparent = false, dark)
        assertEquals(dark.bgInverse, colors.container)
        assertEquals(dark.fgInverse, colors.content)
    }

    @Test
    fun transparentPrimaryUsesClearContainerAndPrimaryForeground() {
        val colors = resolveButtonColors(ButtonVariant.Primary, transparent = true, light)
        assertEquals(Color.Transparent, colors.container)
        assertEquals(light.fgPrimary, colors.content)
    }

    @Test
    fun transparentInverseUsesForegroundToken() {
        val colors = resolveButtonColors(ButtonVariant.Inverse, transparent = true, dark)
        assertEquals(Color.Transparent, colors.container)
        assertEquals(dark.fg, colors.content)
    }

    @Test
    fun sizeLMetricsMatchMobileTable() {
        val theme = CdsDefaultTheme
        val metrics = resolveButtonMetrics(
            ButtonSize.L,
            theme.space,
            theme.borderRadius,
            theme.iconSize,
            theme.typography,
        )
        assertEquals(theme.space.x4, metrics.paddingX)
        assertEquals(theme.space.x2, metrics.paddingY)
        assertEquals(theme.borderRadius.radius900, metrics.radius)
        assertEquals(theme.iconSize.m, metrics.iconSize)
        assertEquals(theme.typography.headline, metrics.font)
    }

    @Test
    fun sizeXsMetricsMatchMobileTable() {
        val theme = CdsDefaultTheme
        val metrics = resolveButtonMetrics(
            ButtonSize.Xs,
            theme.space,
            theme.borderRadius,
            theme.iconSize,
            theme.typography,
        )
        assertEquals(theme.space.x2, metrics.paddingX)
        assertEquals(theme.space.x0_75, metrics.paddingY)
        assertEquals(theme.borderRadius.radius700, metrics.radius)
        assertEquals(theme.iconSize.s, metrics.iconSize)
        assertEquals(theme.typography.label1, metrics.font)
    }
}
