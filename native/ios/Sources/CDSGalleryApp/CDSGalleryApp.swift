import SwiftUI

#if os(macOS)
import AppKit

/// When the gallery runs as a SwiftPM executable (no `.app` bundle), macOS defaults to an
/// "accessory" activation policy — the window can launch hidden behind other apps with no Dock
/// icon. Promoting to `.regular` and activating brings the window to the front reliably, for both
/// `swift run CDSGalleryApp` and running the scheme from Xcode against "My Mac".
final class GalleryAppDelegate: NSObject, NSApplicationDelegate {
    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.setActivationPolicy(.regular)
        NSApp.activate(ignoringOtherApps: true)
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool { true }
}
#endif

/// Runnable demo app showcasing the CDS iOS theme — the counterpart to Android's
/// `apps/android-app`. It renders every token scale (colors, spectrum, typography, spacing,
/// radius, border width, sizes, shadows), a small components section, and a custom brand theme
/// (``CDSThemeSet/acme``) so the light/dark + theme switching can be seen end to end.
///
/// Build: `swift build`  •  Run on macOS host: `swift run CDSGalleryApp`
@main
struct CDSGalleryApp: App {
    #if os(macOS)
    @NSApplicationDelegateAdaptor(GalleryAppDelegate.self) private var appDelegate
    #endif

    var body: some Scene {
        WindowGroup {
            RootGalleryView()
        }
    }
}
