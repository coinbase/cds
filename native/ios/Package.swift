// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "CDSDesignSystem",
    platforms: [
        // Production would target iOS 26 (per the mobile-skunkworks stack).
        // The POC targets iOS 17 / macOS 14 so it also builds under `swift build`
        // on the host and renders in Xcode Previews on a wider range of machines.
        .iOS(.v17),
        .macOS(.v14),
    ],
    products: [
        .library(name: "CDSDesignSystem", targets: ["CDSDesignSystem"]),
        // A runnable SwiftUI gallery of the theme (the iOS counterpart to `apps/android-app`).
        // Builds on the host with `swift build`; launch it with `swift run CDSGalleryApp`.
        .executable(name: "CDSGalleryApp", targets: ["CDSGalleryApp"]),
    ],
    targets: [
        .target(
            name: "CDSDesignSystem",
            swiftSettings: [
                .swiftLanguageMode(.v6),
            ]
        ),
        .executableTarget(
            name: "CDSGalleryApp",
            dependencies: ["CDSDesignSystem"],
            swiftSettings: [
                .swiftLanguageMode(.v6),
            ]
        ),
        .testTarget(
            name: "CDSDesignSystemTests",
            dependencies: ["CDSDesignSystem"]
        ),
    ]
)
