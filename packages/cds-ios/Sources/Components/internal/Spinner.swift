import SwiftUI

/// An indeterminate spinner shared by components that need a "busy" state (``CDSButton``'s
/// `loading` and ``CDSSlideButton``'s confirming state). `internal`: a rendering helper, not
/// customer API.
struct CDSSpinner: View {
    let color: Color
    let diameter: CGFloat

    @State private var rotation = 0.0

    var body: some View {
        Circle()
            .trim(from: 0, to: 0.75)
            .stroke(color, style: StrokeStyle(lineWidth: diameter * 0.16, lineCap: .round))
            .frame(width: diameter, height: diameter)
            .rotationEffect(.degrees(rotation))
            .onAppear {
                withAnimation(.linear(duration: 0.7).repeatForever(autoreverses: false)) {
                    rotation = 360
                }
            }
    }
}
