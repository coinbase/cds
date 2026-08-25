package com.coinbase.cds.androidapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.tooling.preview.Preview
import com.coinbase.cds.androidapp.gallery.CdsThemeGallery
import com.coinbase.cds.theme.CdsColorScheme
import com.coinbase.cds.theme.CdsDefaultTheme
import com.coinbase.cds.theme.CdsTheme
import com.coinbase.cds.theme.CdsThemeProvider
import com.coinbase.cds.androidapp.theme.AcmeTheme

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
 * A bespoke screen built on CDS theme tokens (color, space, radius, typography). CDS components
 * (`Text`, `Button`, `SlideButton`) are temporarily internal for the first AAR release, so this
 * screen uses Compose Foundation primitives plus tokens — the way a consumer would until those
 * components return to the public API.
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
    // var slideConfirmed by remember { mutableStateOf(false) }
    // LaunchedEffect(slideConfirmed) {
    //     if (slideConfirmed) {
    //         delay(1500)
    //         slideConfirmed = false
    //     }
    // }

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
            SampleText(
                text = "Coinbase Design System",
                style = CdsTheme.typography.title1,
            )
            SampleText(
                text = "Jetpack Compose port of the default theme.",
                style = CdsTheme.typography.body,
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
                    SampleText(
                        text = "Primary action surface",
                        style = CdsTheme.typography.headline,
                    )
                    SampleText(
                        text = "This card's colors, spacing, corner radius, and type all come " +
                            "from CdsTheme.",
                        style = CdsTheme.typography.body,
                        color = CdsTheme.colors.fgMuted,
                    )
                    SampleControl(
                        text = if (darkTheme) "Switch to light theme" else "Switch to dark theme",
                        onClick = onToggleDarkTheme,
                    )
                    SampleControl(
                        text = if (customBrand) "Switch to default CDS theme" else "Switch to Acme brand theme",
                        onClick = onToggleBrand,
                        emphasized = false,
                    )
                    SampleText(
                        text = "View theme gallery",
                        style = CdsTheme.typography.headline,
                        color = CdsTheme.colors.fgPrimary,
                        modifier = Modifier
                            .clickable(onClick = onShowGallery)
                            .padding(vertical = CdsTheme.space.x0_5),
                    )
                }
            }

            // CDS components (Text / Button / SlideButton) are temporarily internal for the first
            // AAR release. Restore this gallery when they return to the public API.
            /*
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
            */
        }
    }
}

/** Theme-token text. CDS [com.coinbase.cds.components.text.Text] is temporarily internal. */
@Composable
private fun SampleText(
    text: String,
    style: TextStyle,
    modifier: Modifier = Modifier,
    color: Color = CdsTheme.colors.fg,
) {
    BasicText(text = text, modifier = modifier, style = style.copy(color = color))
}

/** Theme-token control. CDS [com.coinbase.cds.components.button.Button] is temporarily internal. */
@Composable
private fun SampleControl(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    emphasized: Boolean = true,
) {
    val container = if (emphasized) CdsTheme.colors.bgPrimary else CdsTheme.colors.bgTertiary
    val content = if (emphasized) CdsTheme.colors.fgInverse else CdsTheme.colors.fg
    Box(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(CdsTheme.borderRadius.radius900))
            .background(container)
            .clickable(onClick = onClick)
            .padding(horizontal = CdsTheme.space.x3, vertical = CdsTheme.space.x1_5),
    ) {
        SampleText(text = text, style = CdsTheme.typography.headline, color = content)
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

// CDS Button is temporarily internal for the first AAR release. Restore this preview when it
// returns to the public API.
/*
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
*/
