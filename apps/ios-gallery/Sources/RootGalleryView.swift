@testable import CDSDesignSystem
import SwiftUI

/// Color-scheme choice exposed in the gallery toolbar. `system` follows the OS.
enum SchemeChoice: String, CaseIterable, Identifiable {
    case system, light, dark
    var id: String { rawValue }
    var colorScheme: ColorScheme? {
        switch self {
        case .system: return nil
        case .light: return .light
        case .dark: return .dark
        }
    }
    var label: String { rawValue.capitalized }
}

/// Theme choice exposed in the gallery toolbar: the built-in CDS theme vs. a custom brand theme.
enum ThemeChoice: String, CaseIterable, Identifiable {
    case cds, acme
    var id: String { rawValue }
    var set: CDSThemeSet {
        switch self {
        case .cds: return .default
        case .acme: return .acme
        }
    }
    var label: String {
        switch self {
        case .cds: return "CDS default"
        case .acme: return "Acme brand"
        }
    }
}

/// Installs the selected ``CDSThemeSet`` / color scheme, then renders the gallery beneath it so
/// every section reads the live, resolved theme from the environment.
struct RootGalleryView: View {
    @State private var scheme: SchemeChoice = .system
    @State private var theme: ThemeChoice = .cds
    @State private var route: GalleryRoute = .home

    var body: some View {
        CDSThemeProvider(theme: theme.set, colorScheme: scheme.colorScheme) {
            GalleryApp(
                route: route,
                onRouteChange: { route = $0 },
                scheme: $scheme,
                theme: $theme
            )
        }
    }
}

private struct GalleryApp: View {
    let route: GalleryRoute
    let onRouteChange: (GalleryRoute) -> Void
    @Binding var scheme: SchemeChoice
    @Binding var theme: ThemeChoice

    var body: some View {
        Group {
            switch route {
            case .home:
                HomeGalleryView(
                    scheme: $scheme,
                    theme: $theme,
                    onOpenThemeTokens: { onRouteChange(.themeTokens) },
                    onOpenComponent: { onRouteChange(.component($0)) }
                )
            case .themeTokens:
                ThemeTokensGalleryView(onBack: { onRouteChange(.home) })
            case .component(let destination):
                ComponentGalleryView(
                    destination: destination,
                    onBack: { onRouteChange(.home) },
                    onNavigateToComponent: { onRouteChange(.component($0)) }
                )
            }
        }
    }
}
