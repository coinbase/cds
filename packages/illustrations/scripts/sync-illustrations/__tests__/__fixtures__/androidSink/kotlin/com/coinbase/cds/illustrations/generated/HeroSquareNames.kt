// Generated outside this repository by the CDS illustration sync. Do not edit.
// https://github.com/coinbase/cds/blob/master/packages/illustrations/scripts/sync-illustrations/README.md

package com.coinbase.cds.illustrations.generated

import com.coinbase.cds.R
import com.coinbase.cds.illustrations.HeroSquareName

public val HeroSquareName.Companion.arrowsUpDown: HeroSquareName
    get() = HeroSquareName(
        light = R.drawable.cds_hero_square_arrows_up_down_light,
        dark = R.drawable.cds_hero_square_arrows_up_down_dark,
    )

public val HeroSquareName.Companion.private: HeroSquareName
    get() = HeroSquareName(
        light = R.drawable.cds_hero_square_private_light,
        dark = R.drawable.cds_hero_square_private_dark,
    )

/**
 * Every heroSquare illustration by its Figma name, alphabetically. Referencing this keeps every
 * heroSquare illustration in the app; prefer the individual properties.
 */
public val HeroSquareName.Companion.all: Map<String, HeroSquareName>
    get() = allHeroSquareNames

private val allHeroSquareNames: Map<String, HeroSquareName> by lazy {
    mapOf(
        "arrowsUpDown" to HeroSquareName.arrowsUpDown,
        "private" to HeroSquareName.private,
    )
}
