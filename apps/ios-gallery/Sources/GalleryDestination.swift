import Foundation

/// Registered component galleries in display order. Visreg and manual QA navigate directly to a
/// single destination instead of scrolling a monolithic home screen.
enum GalleryDestination: String, CaseIterable, Identifiable {
    case button
    case otherComponents

    var id: String { rawValue }

    var title: String {
        switch self {
        case .button: return "Button"
        case .otherComponents: return "Other components"
        }
    }

    var subtitle: String {
        switch self {
        case .button: return "Variants, states, sizes, and layout"
        case .otherComponents: return "Text, SlideButton, ProgressCircle, and inverted theme"
        }
    }

    var testTag: String {
        switch self {
        case .button: return "gallery-component-button"
        case .otherComponents: return "gallery-component-other"
        }
    }

    func previous() -> GalleryDestination? {
        let all = Self.allCases
        guard let index = all.firstIndex(of: self), index > 0 else { return nil }
        return all[index - 1]
    }

    func next() -> GalleryDestination? {
        let all = Self.allCases
        guard let index = all.firstIndex(of: self), index < all.count - 1 else { return nil }
        return all[index + 1]
    }
}

enum GalleryRoute: Equatable {
    case home
    case themeTokens
    case component(GalleryDestination)
}
