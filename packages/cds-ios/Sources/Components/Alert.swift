import SwiftUI

/// RN `Alert` (`packages/mobile/src/overlays/Alert.tsx`) is a **custom modal** (pictogram, CDS
/// buttons, action layout). Visual spec is that RN chrome — not SwiftUI `.alert`.
///
/// SwiftUI `.alert` is OS dialog chrome. Action roles are `ButtonRole.destructive` / `.cancel`.
/// CDS does not restyle those buttons. Keep `.alert` for true system dialogs; do **not** treat it
/// as the CDS Alert component. The CDS port is a CDS view (not yet shipped).
///
/// ```swift
/// // OS dialog — not CDS Alert
/// .alert("Delete wallet?", isPresented: $showAlert) {
///     Button("Delete", role: .destructive) { delete() }
///     Button("Cancel", role: .cancel) {}
/// } message: {
///     Text("This cannot be undone.")
/// }
/// ```

#if DEBUG
#Preview("System .alert — not CDS Alert") {
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
                SwiftUI.Text("OS .alert. CDS Alert is the RN modal — a separate CDS view.")
            }
    }
}
#endif
