import SwiftUI

/// Runnable demo app showcasing the CDS iOS theme — the counterpart to Android's
/// `apps/android-app`. It renders every token scale (colors, spectrum, typography, spacing,
/// radius, border width, sizes, shadows), a small components section, and a custom brand theme
/// (``CDSThemeSet/acme``) so the light/dark + theme switching can be seen end to end.
///
/// Build: `swift build`  •  Run on macOS host: `swift run CDSGalleryApp`
@main
struct CDSGalleryApp: App {
    var body: some Scene {
        WindowGroup {
            RootGalleryView()
        }
    }
}
