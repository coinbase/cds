package com.coinbase.cds.androidapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicText
import androidx.compose.foundation.verticalScroll
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
import com.coinbase.cds.androidapp.gallery.ButtonGallerySection
import com.coinbase.cds.androidapp.gallery.CdsThemeGallery
import com.coinbase.cds.androidapp.theme.AcmeTheme
import com.coinbase.cds.components.button.Button
import com.coinbase.cds.components.button.ButtonVariant
import com.coinbase.cds.theme.CdsColorScheme
import com.coinbase.cds.theme.CdsDefaultTheme
import com.coinbase.cds.theme.CdsTheme
import com.coinbase.cds.theme.CdsThemeProvider

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            var darkTheme by remember { mutableStateOf(false) }
            var customBrand by remember { mutableStateOf(false) }
            var showGallery by remember { mutableStateOf(false) }

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

@Composable
fun CdsSampleScreen(
    darkTheme: Boolean,
    onToggleDarkTheme: () -> Unit,
    customBrand: Boolean,
    onToggleBrand: () -> Unit,
    onShowGallery: () -> Unit,
    modifier: Modifier = Modifier,
) {
    Box(
        modifier = modifier
            .fillMaxSize()
            .background(CdsTheme.colors.bg)
            .systemBarsPadding()
            .padding(CdsTheme.space.x3),
    ) {
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
                    Button(
                        text = if (darkTheme) "Switch to light theme" else "Switch to dark theme",
                        onClick = onToggleDarkTheme,
                        modifier = Modifier.fillMaxWidth(),
                    )
                    Button(
                        text = if (customBrand) {
                            "Switch to default CDS theme"
                        } else {
                            "Switch to Acme brand theme"
                        },
                        onClick = onToggleBrand,
                        modifier = Modifier.fillMaxWidth(),
                        variant = ButtonVariant.Tertiary,
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

            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(CdsTheme.borderRadius.radius400))
                    .background(CdsTheme.colors.bgSecondary)
                    .padding(CdsTheme.space.x2),
            ) {
                ButtonGallerySection()
            }
        }
    }
}

@Composable
private fun SampleText(
    text: String,
    style: TextStyle,
    modifier: Modifier = Modifier,
    color: Color = CdsTheme.colors.fg,
) {
    BasicText(text = text, modifier = modifier, style = style.copy(color = color))
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

@Preview(showBackground = true, heightDp = 1200)
@Composable
fun ButtonShowcasePreview() {
    CdsThemeProvider(theme = CdsDefaultTheme, colorScheme = CdsColorScheme.Light) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(CdsTheme.colors.bg)
                .padding(CdsTheme.space.x2),
        ) {
            ButtonGallerySection()
        }
    }
}
