import SwiftUI

/// SwiftUI `.alert` is the OS dialog, shown in the gallery for contrast. CDS Alert will be a
/// separate view.

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
                SwiftUI.Text("This cannot be undone.")
            }
    }
}
#endif
