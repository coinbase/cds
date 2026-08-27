// swift-tools-version: 6.0
import PackageDescription

// The vendored CDS iOS theme library. The demo gallery that consumes it lives in
// `apps/ios-gallery` (an Xcode app), mirroring how `apps/android-app` consumes `packages/cds-android`.
let package = Package(
    name: "CDSDesignSystem",
    platforms: [
        // iOS 17 / macOS 14 so the package also builds with `swift build` and renders in Xcode
        // Previews on a wide range of machines.
        .iOS(.v17),
        .macOS(.v14),
    ],
    products: [
        // `.dynamic` so `xcodebuild archive` emits a CDSDesignSystem.framework for
        // `scripts/build-xcframework.sh` to package into the distributable XCFramework.
        .library(name: "CDSDesignSystem", type: .dynamic, targets: ["CDSDesignSystem"]),
    ],
    targets: [
        .target(
            name: "CDSDesignSystem",
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
