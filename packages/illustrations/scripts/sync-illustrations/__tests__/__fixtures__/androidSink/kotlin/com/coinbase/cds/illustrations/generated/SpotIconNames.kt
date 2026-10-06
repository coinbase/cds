// Generated outside this repository by the CDS illustration sync. Do not edit.
// https://github.com/coinbase/cds/blob/master/packages/illustrations/scripts/sync-illustrations/README.md

package com.coinbase.cds.illustrations.generated

import com.coinbase.cds.R
import com.coinbase.cds.illustrations.SpotIconName

public val SpotIconName.Companion._2fa: SpotIconName
    get() = SpotIconName(
        light = R.drawable.cds_spot_icon_2fa_light,
        dark = R.drawable.cds_spot_icon_2fa_dark,
    )

/**
 * Every spotIcon illustration by its Figma name, alphabetically. Referencing this keeps every
 * spotIcon illustration in the app; prefer the individual properties.
 */
public val SpotIconName.Companion.all: Map<String, SpotIconName>
    get() = allSpotIconNames

private val allSpotIconNames: Map<String, SpotIconName> by lazy {
    mapOf(
        "2fa" to SpotIconName._2fa,
    )
}
