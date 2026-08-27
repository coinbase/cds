package com.coinbase.cds.androidapp.theme

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.coinbase.cds.theme.CdsDefaultTheme
import com.coinbase.cds.theme.CdsTheme
import com.coinbase.cds.theme.cdsTheme

// Acme's brand purple stands in for CDS's blue60/blue70 as fgPrimary/bgPrimary. The dark variant is
// a lighter tint, mirroring how CDS itself lightens blue60 -> blue70 in dark mode to hold contrast
// against a dark background.
private val BrandLight = Color(0xFF7B3FE4)
private val BrandDark = Color(0xFFAE8AFB)

private val DefaultSpace = CdsDefaultTheme.space
private val DefaultRadius = CdsDefaultTheme.borderRadius

/**
 * A stand-in for "Acme Corp", a fictional customer building on CDS. Built with [cdsTheme], which
 * overrides a handful of tokens on [CdsDefaultTheme]. This lives in the app module, not :cds: CDS
 * ships the default theme plus the override mechanism, and Acme's brand values are the app's
 * business, not the design system's.
 *
 * One [CdsTheme], not a light/dark pair: a theme carries both color schemes, so the space and
 * radius overrides below are stated once instead of duplicated across two instances, and choosing a
 * scheme is `CdsThemeProvider`'s job rather than a choice baked into the theme.
 *
 * Acme's brand reads as roomier and softer than the crisp CDS default: every space and border
 * radius rung is shifted up to the *next* step in CDS's own scale (what CDS calls `x1`, Acme uses
 * as its `x0_75`) rather than picking arbitrary one-off numbers. That keeps Acme's scale internally
 * coherent -- still a real ramp, just offset -- the same property CDS's own scale has.
 *
 * Each override reads from [DefaultSpace]/[DefaultRadius] rather than from the surrounding builder,
 * so the rungs don't depend on the order they're assigned in.
 */
val AcmeTheme: CdsTheme = cdsTheme {
    id = "acme"

    lightColors {
        fgPrimary = BrandLight
        bgPrimary = BrandLight
        bgLinePrimary = BrandLight
    }
    darkColors {
        fgPrimary = BrandDark
        bgPrimary = BrandDark
        bgLinePrimary = BrandDark
    }

    space {
        // x0 is left at 0dp: "no space" doesn't get roomier.
        x0_25 = DefaultSpace.x0_5
        x0_5 = DefaultSpace.x0_75
        x0_75 = DefaultSpace.x1
        x1 = DefaultSpace.x1_5
        x1_5 = DefaultSpace.x2
        x2 = DefaultSpace.x3
        x3 = DefaultSpace.x4
        x4 = DefaultSpace.x5
        x5 = DefaultSpace.x6
        x6 = DefaultSpace.x7
        x7 = DefaultSpace.x8
        x8 = DefaultSpace.x9
        x9 = DefaultSpace.x10
        x10 = 88.dp // one step beyond CDS's own scale, continuing the same rhythm
    }

    borderRadius {
        // radius0 and radius1000 are untouched: zero is zero, and a pill can't get rounder.
        radius100 = DefaultRadius.radius200
        radius200 = DefaultRadius.radius300
        radius300 = DefaultRadius.radius400
        radius400 = DefaultRadius.radius500
        radius500 = DefaultRadius.radius600
        radius600 = DefaultRadius.radius700
        radius700 = DefaultRadius.radius800
        radius800 = DefaultRadius.radius900
        radius900 = 64.dp // one step beyond CDS's own scale
    }
}
