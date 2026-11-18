// Generated outside this repository by the CDS illustration sync. Do not edit.
// https://github.com/coinbase/cds/blob/master/packages/illustrations/scripts/sync-illustrations/README.md

package com.coinbase.cds.illustrations.generated

import com.coinbase.cds.R
import com.coinbase.cds.illustrations.PictogramName

public val PictogramName.Companion._2fa: PictogramName
    get() = PictogramName(
        light = R.drawable.cds_pictogram_2fa_light,
        dark = R.drawable.cds_pictogram_2fa_dark,
    )

public val PictogramName.Companion.delegate: PictogramName
    get() = PictogramName(
        light = R.drawable.cds_pictogram_delegate_light,
        dark = R.drawable.cds_pictogram_delegate_dark,
    )

public val PictogramName.Companion.`object`: PictogramName
    get() = PictogramName(
        light = R.drawable.cds_pictogram_object_light,
        dark = R.drawable.cds_pictogram_object_dark,
    )

/**
 * Every pictogram illustration by its Figma name, alphabetically. Referencing this keeps every
 * pictogram illustration in the app; prefer the individual properties.
 */
public val PictogramName.Companion.all: Map<String, PictogramName>
    get() = allPictogramNames

private val allPictogramNames: Map<String, PictogramName> by lazy {
    mapOf(
        "2fa" to PictogramName._2fa,
        "delegate" to PictogramName.delegate,
        "object" to PictogramName.`object`,
    )
}
