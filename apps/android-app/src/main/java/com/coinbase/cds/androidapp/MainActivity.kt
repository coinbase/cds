package com.coinbase.cds.androidapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.testTagsAsResourceId
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.tooling.preview.Preview
import com.coinbase.cds.androidapp.gallery.ButtonGallerySection
import com.coinbase.cds.androidapp.gallery.ButtonGalleryScreen
import com.coinbase.cds.androidapp.gallery.CdsThemeGallery
import com.coinbase.cds.androidapp.gallery.ComponentGalleryScreen
import com.coinbase.cds.androidapp.gallery.GalleryRoute
import com.coinbase.cds.androidapp.gallery.HomeGalleryScreen
import com.coinbase.cds.androidapp.theme.AcmeTheme
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
            var route by remember { mutableStateOf<GalleryRoute>(GalleryRoute.Home) }

            val theme = if (customBrand) AcmeTheme else CdsDefaultTheme
            val colorScheme = if (darkTheme) CdsColorScheme.Dark else CdsColorScheme.Light

            BackHandler(enabled = route != GalleryRoute.Home) {
                route = GalleryRoute.Home
            }

            CdsThemeProvider(theme = theme, colorScheme = colorScheme) {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .semantics { testTagsAsResourceId = true },
                ) {
                    GalleryApp(
                        route = route,
                        onRouteChange = { route = it },
                        darkTheme = darkTheme,
                        onToggleDarkTheme = { darkTheme = !darkTheme },
                        customBrand = customBrand,
                        onToggleBrand = { customBrand = !customBrand },
                        theme = theme,
                        colorScheme = colorScheme,
                    )
                }
            }
        }
    }
}

@Composable
private fun GalleryApp(
    route: GalleryRoute,
    onRouteChange: (GalleryRoute) -> Unit,
    darkTheme: Boolean,
    onToggleDarkTheme: () -> Unit,
    customBrand: Boolean,
    onToggleBrand: () -> Unit,
    theme: com.coinbase.cds.theme.CdsTheme,
    colorScheme: CdsColorScheme,
    modifier: Modifier = Modifier,
) {
    when (route) {
        GalleryRoute.Home -> HomeGalleryScreen(
            darkTheme = darkTheme,
            onToggleDarkTheme = onToggleDarkTheme,
            customBrand = customBrand,
            onToggleBrand = onToggleBrand,
            onOpenThemeTokens = { onRouteChange(GalleryRoute.ThemeTokens) },
            onOpenComponent = { onRouteChange(GalleryRoute.Component(it)) },
            modifier = modifier,
        )

        GalleryRoute.ThemeTokens -> CdsThemeGallery(
            theme = theme,
            colorScheme = colorScheme,
            modifier = modifier
                .fillMaxSize()
                .testTag("gallery-destination-theme-tokens"),
            onBack = { onRouteChange(GalleryRoute.Home) },
        )

        is GalleryRoute.Component -> ComponentGalleryScreen(
            destination = route.destination,
            onBack = { onRouteChange(GalleryRoute.Home) },
            onNavigateToComponent = { onRouteChange(GalleryRoute.Component(it)) },
            modifier = modifier,
        )
    }
}

@Preview(showBackground = true)
@Composable
fun HomeGalleryScreenLightPreview() {
    CdsThemeProvider(theme = CdsDefaultTheme, colorScheme = CdsColorScheme.Light) {
        HomeGalleryScreen(
            darkTheme = false,
            onToggleDarkTheme = {},
            customBrand = false,
            onToggleBrand = {},
            onOpenThemeTokens = {},
            onOpenComponent = {},
        )
    }
}

@Preview(showBackground = true)
@Composable
fun HomeGalleryScreenDarkPreview() {
    CdsThemeProvider(theme = CdsDefaultTheme, colorScheme = CdsColorScheme.Dark) {
        HomeGalleryScreen(
            darkTheme = true,
            onToggleDarkTheme = {},
            customBrand = false,
            onToggleBrand = {},
            onOpenThemeTokens = {},
            onOpenComponent = {},
        )
    }
}

@Preview(showBackground = true)
@Composable
fun HomeGalleryScreenAcmeBrandPreview() {
    CdsThemeProvider(theme = AcmeTheme, colorScheme = CdsColorScheme.Light) {
        HomeGalleryScreen(
            darkTheme = false,
            onToggleDarkTheme = {},
            customBrand = true,
            onToggleBrand = {},
            onOpenThemeTokens = {},
            onOpenComponent = {},
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
fun ButtonGalleryScreenPreview() {
    CdsThemeProvider(theme = CdsDefaultTheme, colorScheme = CdsColorScheme.Light) {
        ButtonGalleryScreen(
            onBack = {},
            onNavigateToComponent = {},
        )
    }
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
