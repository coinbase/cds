import SwiftUI

/// Runnable demo app showcasing the CDS iOS theme — the counterpart to Android's
/// `apps/android-app`. It renders every token scale (colors, spectrum, typography, spacing,
/// radius, border width, sizes, shadows), a small components section, and a custom brand theme
/// (``CDSThemeSet/acme``) so the light/dark + theme switching can be seen end to end.
///
/// Build/run via `yarn nx run ios-gallery:launch` (iOS Simulator) or open the generated
/// `CDSGallery.xcodeproj` in Xcode.
@main
struct CDSGalleryApp: App {
    var body: some Scene {
        WindowGroup {
            RootGalleryView()
        }
    }
}
