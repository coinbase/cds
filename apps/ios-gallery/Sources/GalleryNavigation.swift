@testable import CDSDesignSystem
import SwiftUI

/// Shared chrome for full-screen gallery destinations: back affordance, title, optional prev/next
/// pager between component galleries, and a single scrollable content region.
struct GalleryScreenScaffold<Content: View>: View {
    @Environment(\.cdsTheme) private var cds
    let title: String
    let subtitle: String?
    let onBack: () -> Void
    let testTag: String?
    let previousDestination: GalleryDestination?
    let nextDestination: GalleryDestination?
    let onNavigateToComponent: ((GalleryDestination) -> Void)?
    @ViewBuilder let content: Content

    init(
        title: String,
        subtitle: String? = nil,
        onBack: @escaping () -> Void,
        testTag: String? = nil,
        previousDestination: GalleryDestination? = nil,
        nextDestination: GalleryDestination? = nil,
        onNavigateToComponent: ((GalleryDestination) -> Void)? = nil,
        @ViewBuilder content: () -> Content
    ) {
        self.title = title
        self.subtitle = subtitle
        self.onBack = onBack
        self.testTag = testTag
        self.previousDestination = previousDestination
        self.nextDestination = nextDestination
        self.onNavigateToComponent = onNavigateToComponent
        self.content = content()
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            header
            ScrollView {
                VStack(alignment: .leading, spacing: cds.space.x2) {
                    content
                }
                .padding(.horizontal, cds.space.x3)
                .padding(.bottom, cds.space.x2)
            }
            if onNavigateToComponent != nil,
               previousDestination != nil || nextDestination != nil {
                componentPager
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
        .background(cds.colors.bg)
        .accessibilityIdentifier(testTag ?? "")
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: cds.space.x1) {
            Button(action: onBack) {
                HStack(spacing: cds.space.x0_5) {
                    Image(systemName: "chevron.left")
                        .font(.caption.weight(.semibold))
                    Text("Back").cdsText(.label1, color: cds.colors.fgPrimary)
                }
            }
            .buttonStyle(.plain)
            .accessibilityIdentifier("gallery-nav-back")

            Text(title).cdsText(.title1)
            if let subtitle {
                Text(subtitle).cdsText(.body, color: cds.colors.fgMuted)
            }
        }
        .padding(.horizontal, cds.space.x3)
        .padding(.top, cds.space.x3)
        .padding(.bottom, cds.space.x2)
    }

    private var componentPager: some View {
        HStack(spacing: cds.space.x1) {
            GalleryPagerButton(
                label: previousDestination.map { "← \($0.title)" } ?? "← Previous",
                enabled: previousDestination != nil,
                action: { previousDestination.map { onNavigateToComponent?($0) } }
            )
            .accessibilityIdentifier("gallery-nav-previous")

            GalleryPagerButton(
                label: nextDestination.map { "\($0.title) →" } ?? "Next →",
                enabled: nextDestination != nil,
                action: { nextDestination.map { onNavigateToComponent?($0) } }
            )
            .accessibilityIdentifier("gallery-nav-next")
        }
        .padding(.horizontal, cds.space.x3)
        .padding(.vertical, cds.space.x1_5)
        .background(cds.colors.bgSecondary)
    }
}

struct GalleryDestinationRow: View {
    @Environment(\.cdsTheme) private var cds
    let title: String
    let subtitle: String
    let testTag: String
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(alignment: .center, spacing: cds.space.x1) {
                VStack(alignment: .leading, spacing: cds.space.x0_5) {
                    Text(title).cdsText(.headline)
                    Text(subtitle).cdsText(.body, color: cds.colors.fgMuted)
                }
                Spacer(minLength: 0)
                Image(systemName: "chevron.right")
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(cds.colors.fgMuted)
            }
            .padding(cds.space.x2)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(cds.colors.bgSecondary)
            .clipShape(RoundedRectangle(cornerRadius: cds.borderRadius.radius300))
        }
        .buttonStyle(.plain)
        .accessibilityIdentifier(testTag)
    }
}

private struct GalleryPagerButton: View {
    @Environment(\.cdsTheme) private var cds
    let label: String
    let enabled: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(label)
                .cdsText(.label1, color: enabled ? cds.colors.fg : cds.colors.fgMuted)
                .frame(maxWidth: .infinity)
                .padding(.vertical, cds.space.x1_5)
                .padding(.horizontal, cds.space.x1)
                .background(enabled ? cds.colors.bgTertiary : cds.colors.bgSecondary)
                .clipShape(RoundedRectangle(cornerRadius: cds.borderRadius.radius300))
        }
        .buttonStyle(.plain)
        .disabled(!enabled)
    }
}
