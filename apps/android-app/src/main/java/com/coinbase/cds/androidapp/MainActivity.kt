package com.coinbase.cds.androidapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.tooling.preview.Preview
import com.coinbase.cds.components.button.Button
import com.coinbase.cds.components.button.ButtonSize
import com.coinbase.cds.components.button.ButtonVariant
import com.coinbase.cds.components.slidebutton.SlideButton
import com.coinbase.cds.components.text.Text
import com.coinbase.cds.theme.CdsFontToken
import com.coinbase.cds.androidapp.gallery.CdsThemeGallery
import com.coinbase.cds.theme.CdsColorScheme
import com.coinbase.cds.theme.CdsDefaultTheme
import com.coinbase.cds.theme.CdsTheme
import com.coinbase.cds.theme.CdsThemeProvider
import com.coinbase.cds.androidapp.theme.AcmeTheme
import kotlinx.coroutines.delay

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            var darkTheme by remember { mutableStateOf(false) }
            var customBrand by remember { mutableStateOf(false) }
            var showGallery by remember { mutableStateOf(false) }

            // Theme and color scheme are independent axes, so they multiply instead of combining:
            // two themes times two schemes is two one-line choices here, not a four-branch `when`.
            val theme: CdsTheme = if (customBrand) AcmeTheme else CdsDefaultTheme
            val colorScheme = if (darkTheme) CdsColorScheme.Dark else CdsColorScheme.Light

            BackHandler(enabled = showGallery) { showGallery = false }

            CdsThemeProvider(theme = theme, colorScheme = colorScheme) {
                if (showGallery) {
                    CdsThemeGallery(
                        theme = theme,
                        colorScheme = colorScheme,
                        modifier = Modifier.fillMaxSize(),
                        onBack = { showGallery = false },
                    )
                } else {
                    CdsSampleScreen(
                        darkTheme = darkTheme,
                        onToggleDarkTheme = { darkTheme = !darkTheme },
                        customBrand = customBrand,
                        onToggleBrand = { customBrand = !customBrand },
                        onShowGallery = { showGallery = true },
                    )
                }
            }
        }
    }
}

/**
 * A bespoke screen built on CDS primitives (color, space, radius, typography) plus the ported
 * [Text], [Button], and [SlideButton] components -- the rest of the layout still composes raw
 * Compose foundation building blocks the way a CDS consumer would before more component ports land.
 */
@Composable
fun CdsSampleScreen(
    darkTheme: Boolean,
    onToggleDarkTheme: () -> Unit,
    customBrand: Boolean,
    onToggleBrand: () -> Unit,
    onShowGallery: () -> Unit,
    modifier: Modifier = Modifier,
) {
    var slideConfirmed by remember { mutableStateOf(false) }
    LaunchedEffect(slideConfirmed) {
        if (slideConfirmed) {
            delay(1500)
            slideConfirmed = false
        }
    }

    Box(
        modifier = modifier
            .fillMaxSize()
            .background(CdsTheme.colors.bg)
            .systemBarsPadding()
            .padding(CdsTheme.space.x3),
    ) {
        // Scrollable rather than a fixed-height assumption: a theme like Acme (bigger space/type
        // scale) makes this content taller than the default theme's, and the screen should adapt
        // rather than silently clip whatever doesn't fit the current theme's sizing.
        Column(
            modifier = Modifier.verticalScroll(rememberScrollState()),
            verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x2),
        ) {
            Text(
                text = "Coinbase Design System",
                font = CdsFontToken.Title1,
            )
            Text(
                text = "Jetpack Compose port of the default theme.",
                font = CdsFontToken.Body,
                color = CdsTheme.colors.fgMuted,
            )

            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(CdsTheme.borderRadius.radius400))
                    .background(CdsTheme.colors.bgSecondary)
                    .padding(CdsTheme.space.x2),
            ) {
                Column(verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1_5)) {
                    Text(
                        text = "Primary action surface",
                        font = CdsFontToken.Headline,
                    )
                    Text(
                        text = "This card's colors, spacing, corner radius, and type all come " +
                            "from CdsTheme.",
                        font = CdsFontToken.Body,
                        color = CdsTheme.colors.fgMuted,
                    )
                    Button(
                        text = if (darkTheme) "Switch to light theme" else "Switch to dark theme",
                        onClick = onToggleDarkTheme,
                        variant = ButtonVariant.Primary,
                        size = ButtonSize.M,
                    )
                    Button(
                        text = if (customBrand) "Switch to default CDS theme" else "Switch to Acme brand theme",
                        onClick = onToggleBrand,
                        variant = ButtonVariant.Tertiary,
                        size = ButtonSize.M,
                    )
                    Button(
                        text = "View theme gallery",
                        onClick = onShowGallery,
                        variant = ButtonVariant.Primary,
                        size = ButtonSize.M,
                        transparent = true,
                    )
                }
            }

            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(CdsTheme.borderRadius.radius400))
                    .background(CdsTheme.colors.bgSecondary)
                    .padding(CdsTheme.space.x2),
            ) {
                Column(verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1_5)) {
                    Text(
                        text = "CDS Components",
                        font = CdsFontToken.Headline,
                    )
                    Column(verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x0_5)) {
                        Text(text = "Display3 heading", font = CdsFontToken.Display3)
                        Text(text = "Title3 heading", font = CdsFontToken.Title3)
                        Text(
                            text = "Label1, in the theme's positive color",
                            font = CdsFontToken.Label1,
                            color = CdsTheme.colors.fgPositive,
                        )
                        Text(text = "Caption is auto-uppercased", font = CdsFontToken.Caption)
                        Text(text = "Legal, muted and fine-print sized", font = CdsFontToken.Legal, color = CdsTheme.colors.fgMuted)
                    }
                    FlowRow(
                        horizontalArrangement = Arrangement.spacedBy(CdsTheme.space.x1),
                        verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1),
                    ) {
                        Button(text = "Primary", onClick = {}, variant = ButtonVariant.Primary, size = ButtonSize.S)
                        Button(text = "Secondary", onClick = {}, variant = ButtonVariant.Secondary, size = ButtonSize.S)
                        Button(text = "Tertiary", onClick = {}, variant = ButtonVariant.Tertiary, size = ButtonSize.S)
                        Button(text = "Positive", onClick = {}, variant = ButtonVariant.Positive, size = ButtonSize.S)
                        Button(text = "Negative", onClick = {}, variant = ButtonVariant.Negative, size = ButtonSize.S)
                    }
                    SlideButton(
                        checked = slideConfirmed,
                        onCheckedChange = { slideConfirmed = it },
                        uncheckedLabel = "Slide to confirm",
                        checkedLabel = "Confirming...",
                    )
                }
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun CdsSampleScreenLightPreview() {
    CdsThemeProvider(theme = CdsDefaultTheme, colorScheme = CdsColorScheme.Light) {
        CdsSampleScreen(
            darkTheme = false,
            onToggleDarkTheme = {},
            customBrand = false,
            onToggleBrand = {},
            onShowGallery = {},
        )
    }
}

@Preview(showBackground = true)
@Composable
fun CdsSampleScreenDarkPreview() {
    CdsThemeProvider(theme = CdsDefaultTheme, colorScheme = CdsColorScheme.Dark) {
        CdsSampleScreen(
            darkTheme = true,
            onToggleDarkTheme = {},
            customBrand = false,
            onToggleBrand = {},
            onShowGallery = {},
        )
    }
}

@Preview(showBackground = true)
@Composable
fun CdsSampleScreenAcmeBrandPreview() {
    CdsThemeProvider(theme = AcmeTheme, colorScheme = CdsColorScheme.Light) {
        CdsSampleScreen(
            darkTheme = false,
            onToggleDarkTheme = {},
            customBrand = true,
            onToggleBrand = {},
            onShowGallery = {},
        )
    }
}

@Preview(showBackground = true, heightDp = 1200)
@Composable
fun CdsThemeGalleryPreview() {
    CdsThemeGallery(theme = CdsDefaultTheme, colorScheme = CdsColorScheme.Light)
}

@Preview(showBackground = true, heightDp = 620)
@Composable
fun ButtonShowcasePreview() {
    CdsThemeProvider(theme = CdsDefaultTheme, colorScheme = CdsColorScheme.Light) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(CdsTheme.colors.bg)
                .padding(CdsTheme.space.x2),
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(CdsTheme.space.x1_5)) {
                Button(text = "Primary", onClick = {}, variant = ButtonVariant.Primary)
                Button(text = "Secondary", onClick = {}, variant = ButtonVariant.Secondary)
                Button(text = "Tertiary", onClick = {}, variant = ButtonVariant.Tertiary)
                Button(text = "Positive", onClick = {}, variant = ButtonVariant.Positive)
                Button(text = "Negative", onClick = {}, variant = ButtonVariant.Negative)
                Button(text = "Transparent", onClick = {}, transparent = true)
                Button(text = "Disabled", onClick = {}, enabled = false)
                Button(text = "Loading", onClick = {}, loading = true)
                Button(text = "Full width", onClick = {}, fullWidth = true)
                Row(horizontalArrangement = Arrangement.spacedBy(CdsTheme.space.x1)) {
                    Button(text = "Small", onClick = {}, size = ButtonSize.S)
                    Button(text = "XSmall", onClick = {}, size = ButtonSize.Xs)
                }
            }
        }
    }
}
