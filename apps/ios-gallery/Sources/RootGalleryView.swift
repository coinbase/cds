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

    var body: some View {
        CDSThemeProvider(theme: theme.set, colorScheme: scheme.colorScheme) {
            GalleryScreen(scheme: $scheme, theme: $theme)
        }
    }
}

/// The scrolling gallery itself, plus the theme/scheme controls. Lives under the provider so
/// `@Environment(\.cdsTheme)` resolves to the current selection.
struct GalleryScreen: View {
    @Binding var scheme: SchemeChoice
    @Binding var theme: ThemeChoice
    @Environment(\.cdsTheme) private var cds

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: cds.spacing.x3) {
                controls

                ColorGallery()
                IllustrationGallery()
                SpectrumGallery()
                TypographyGallery()
                SpacingGallery()
                RadiusGallery()
                BorderWidthGallery()
                SizesGallery()
                ShadowGallery()
                ComponentsGallery()
            }
            .padding(cds.spacing.x2)
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .background(cds.colors.bg)
    }

    private var controls: some View {
        VStack(alignment: .leading, spacing: cds.spacing.x1) {
            CDSDesignSystem.Text("CDS iOS — Theme Gallery", style: .title2)
            CDSDesignSystem.Text("Live view of every token scale in the active theme.", style: .label2, color: cds.colors.fgMuted)

            Picker("Theme", selection: $theme) {
                ForEach(ThemeChoice.allCases) { SwiftUI.Text($0.label).tag($0) }
            }
            .pickerStyle(.segmented)

            Picker("Color scheme", selection: $scheme) {
                ForEach(SchemeChoice.allCases) { SwiftUI.Text($0.label).tag($0) }
            }
            .pickerStyle(.segmented)
        }
        .padding(cds.spacing.x2)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(cds.colors.bgSecondary)
        .clipShape(RoundedRectangle(cornerRadius: cds.radius.r300))
    }
}
