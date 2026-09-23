import SwiftUI

/// There is **no** CDS `Alert` view and no `AlertStyle`.
///
/// RN ships a custom modal (`packages/mobile/src/overlays/Alert.tsx`). On iOS that is the wrong
/// primitive: a blocking choice is a system dialog, presented with SwiftUI `.alert` (or
/// `UIAlertController`). CDS does not restyle those chrome buttons — action roles are
/// `ButtonRole.destructive` / `.cancel`, not ``CDSButtonStyle``.
///
/// ```swift
/// .alert("Delete wallet?", isPresented: $showAlert) {
///     Button("Delete", role: .destructive) { delete() }
///     Button("Cancel", role: .cancel) {}
/// } message: {
///     Text("This cannot be undone.")
/// }
/// ```
///
/// Contrast with ``CDSToggleStyle``: there the SwiftUI control stays (`Toggle`) and CDS only
/// supplies a `ToggleStyle`. Alert has nothing to style — the system owns the dialog.

#if DEBUG
#Preview("Alert — use SwiftUI .alert, not a CDS view") {
    CDSThemeProvider {
        AlertUsagePreview()
            .padding()
    }
}

private struct AlertUsagePreview: View {
    @State private var showAlert = false

    var body: some View {
        Button("Show system alert") { showAlert = true }
            .buttonStyle(.cds(.negative))
            .alert("Delete wallet?", isPresented: $showAlert) {
                Button("Delete", role: .destructive) {}
                Button("Cancel", role: .cancel) {}
            } message: {
                SwiftUI.Text("This cannot be undone. There is no CDS Alert view.")
            }
    }
}
#endif
