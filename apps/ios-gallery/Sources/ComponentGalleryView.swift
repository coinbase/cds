import SwiftUI

struct ComponentGalleryView: View {
    let destination: GalleryDestination
    let onBack: () -> Void
    let onNavigateToComponent: (GalleryDestination) -> Void

    var body: some View {
        switch destination {
        case .button:
            ButtonGalleryView(
                onBack: onBack,
                onNavigateToComponent: onNavigateToComponent
            )
        case .otherComponents:
            OtherComponentsGalleryView(
                onBack: onBack,
                onNavigateToComponent: onNavigateToComponent
            )
        }
    }
}
