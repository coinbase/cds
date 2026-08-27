package com.coinbase.cds.androidapp.gallery

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import com.coinbase.cds.theme.CdsFontToken
import com.coinbase.cds.theme.CdsTheme

@Composable
internal fun TypographySection() {
    val typography = CdsTheme.typography
    Column(verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1_5)) {
        GallerySectionTitle("Typography")
        CdsFontToken.entries.forEach { font ->
            // CDS's caption token sets textTransform: uppercase; Compose has no equivalent, so the
            // sample label is uppercased explicitly, same as the caption usage in MainActivity.
            val label = if (font == CdsFontToken.Caption) font.tokenName.uppercase() else font.tokenName
            GalleryText(text = label, style = typography[font], color = CdsTheme.colors.fg)
        }
    }
}
