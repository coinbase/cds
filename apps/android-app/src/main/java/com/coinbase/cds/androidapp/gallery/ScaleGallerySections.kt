package com.coinbase.cds.androidapp.gallery

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.coinbase.cds.theme.CdsAvatarSizeToken
import com.coinbase.cds.theme.CdsBorderRadiusToken
import com.coinbase.cds.theme.CdsBorderWidthToken
import com.coinbase.cds.theme.CdsIconSizeToken
import com.coinbase.cds.theme.CdsShadow
import com.coinbase.cds.theme.CdsSpaceToken
import com.coinbase.cds.theme.CdsTheme

@Composable
internal fun SpaceSection() {
    val space = CdsTheme.space
    Column(verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1)) {
        GallerySectionTitle("Space")
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(CdsTheme.space.x2),
            verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1_5),
        ) {
            CdsSpaceToken.entries.forEach { SpaceBar(space[it]) }
        }
    }
}

@Composable
private fun SpaceBar(barWidth: Dp) {
    // Stacked (bar above label) rather than side-by-side, so many of these can wrap several per
    // row in the FlowRow above instead of each claiming a full-width line.
    Column(verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x0_5)) {
        Box(
            modifier = Modifier
                // A true 0dp bar would be invisible and read as a rendering bug rather than the
                // "0" rung, so give every bar a visible sliver at minimum.
                .width(barWidth.coerceAtLeast(1.dp))
                .height(12.dp)
                .background(
                    CdsTheme.colors.bgPrimary,
                    RoundedCornerShape(CdsTheme.borderRadius.radius100),
                ),
        )
        // The label is the live value rather than the rung's name, so a custom theme that
        // remaps a rung still shows its true, current size here.
        GalleryText(
            text = "${barWidth.value.toInt()}dp",
            style = CdsTheme.typography.legal,
            color = CdsTheme.colors.fgMuted,
        )
    }
}

@Composable
internal fun BorderSection() {
    Column(verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1_5)) {
        GallerySectionTitle("Border radius")
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(CdsTheme.space.x1_5),
            verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1_5),
        ) {
            CdsBorderRadiusToken.entries.forEach { token ->
                val value = CdsTheme.borderRadius[token]
                // The pill rung is a deliberately oversized sentinel (100000dp) meaning "always
                // fully rounded" -- showing that literal number would be noise, not information.
                val label = if (token == CdsBorderRadiusToken.Radius1000) {
                    "Full"
                } else {
                    "${value.value.toInt()}"
                }
                RadiusSample(value, label)
            }
        }
        GallerySectionTitle("Border width")
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(CdsTheme.space.x1_5),
            verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1_5),
        ) {
            CdsBorderWidthToken.entries.forEach { BorderWidthSample(CdsTheme.borderWidth[it]) }
        }
    }
}

@Composable
private fun RadiusSample(radius: Dp, label: String) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x0_5),
    ) {
        Box(
            modifier = Modifier
                .size(40.dp)
                .clip(RoundedCornerShape(radius))
                .background(CdsTheme.colors.bgTertiary),
        )
        GalleryText(text = label, style = CdsTheme.typography.legal, color = CdsTheme.colors.fgMuted)
    }
}

@Composable
private fun BorderWidthSample(borderWidth: Dp) {
    val shape = RoundedCornerShape(CdsTheme.borderRadius.radius200)
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x0_5),
    ) {
        Box(
            modifier = Modifier
                .size(40.dp)
                .clip(shape)
                .border(borderWidth, CdsTheme.colors.fgPrimary, shape),
        )
        GalleryText(
            text = "${borderWidth.value.toInt()}",
            style = CdsTheme.typography.legal,
            color = CdsTheme.colors.fgMuted,
        )
    }
}

@Composable
internal fun SizeSection() {
    Column(verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1_5)) {
        GallerySectionTitle("Icon size")
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(CdsTheme.space.x1_5),
            verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1_5),
        ) {
            CdsIconSizeToken.entries.forEach {
                SizeCircle(it.tokenName, CdsTheme.iconSize[it])
            }
        }
        GallerySectionTitle("Avatar size")
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(CdsTheme.space.x1_5),
            verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1_5),
        ) {
            CdsAvatarSizeToken.entries.forEach {
                SizeCircle(it.tokenName, CdsTheme.avatarSize[it])
            }
        }
    }
}

@Composable
private fun SizeCircle(name: String, diameter: Dp) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x0_5),
    ) {
        Box(
            modifier = Modifier
                .size(diameter)
                .clip(CircleShape)
                .background(CdsTheme.colors.bgPrimary),
        )
        // The size name (xs/s/m/...) carries meaning beyond its number, so it's kept alongside
        // -- not instead of -- the live dp value, unlike the purely numeric scales above.
        GalleryText(
            text = "$name ${diameter.value.toInt()}dp",
            style = CdsTheme.typography.legal,
            color = CdsTheme.colors.fgMuted,
        )
    }
}

@Composable
internal fun ShadowSection() {
    val shadows = CdsTheme.shadows
    Column(verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x2)) {
        GallerySectionTitle("Shadow")
        Row(horizontalArrangement = Arrangement.spacedBy(CdsTheme.space.x3)) {
            ShadowSample("elevation1", shadows.elevation1)
            ShadowSample("elevation2", shadows.elevation2)
        }
    }
}

@Composable
private fun ShadowSample(label: String, shadow: CdsShadow) {
    val shape = RoundedCornerShape(CdsTheme.borderRadius.radius200)
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1),
    ) {
        Box(
            modifier = Modifier
                .size(64.dp)
                // Compose's shadow model (elevation + tint) isn't a direct match for CDS's
                // offset/opacity/blur spec; blurRadius stands in for elevation since both scale
                // with how "raised" the surface should read.
                .shadow(
                    elevation = shadow.blurRadius,
                    shape = shape,
                    ambientColor = shadow.color.copy(alpha = shadow.opacity),
                    spotColor = shadow.color.copy(alpha = shadow.opacity),
                )
                .background(CdsTheme.colors.bgElevation1, shape),
        )
        GalleryText(text = label, style = CdsTheme.typography.legal, color = CdsTheme.colors.fgMuted)
    }
}
