package com.coinbase.cds.theme

import androidx.compose.runtime.AbstractApplier
import androidx.compose.runtime.Composable
import androidx.compose.runtime.Composition
import androidx.compose.runtime.Recomposer
import kotlin.coroutines.EmptyCoroutineContext

/**
 * Composes [content] once and disposes it, propagating anything it throws.
 *
 * The token layer is pure JVM -- values are [androidx.compose.ui.graphics.Color],
 * [androidx.compose.ui.unit.Dp], [androidx.compose.ui.text.TextStyle] -- so the only reason its
 * tests need Compose at all is that `CompositionLocal` lookup is the thing under test, and that
 * exists only inside a composition. Hosting one on `androidx.compose.runtime` alone keeps
 * Robolectric and the UI-test artifacts out of this module until a component needs them.
 *
 * Initial composition runs synchronously inside [Composition.setContent], so the [Recomposer] never
 * has to be pumped and no frame clock is needed. That also bounds what this harness covers:
 * recomposition, layout, and input want the real Compose UI test infrastructure.
 */
fun composeOnce(content: @Composable () -> Unit) {
    val recomposer = Recomposer(EmptyCoroutineContext)
    val composition = Composition(DiscardingApplier, recomposer)
    try {
        composition.setContent(content)
    } finally {
        // A composition that threw can fail to dispose cleanly, and that secondary failure would
        // mask the exception the test is asserting on.
        runCatching { composition.dispose() }
        recomposer.cancel()
    }
}

/** Drops emitted nodes on the floor. Token tests read values and emit no UI. */
private object DiscardingApplier : AbstractApplier<Unit>(Unit) {
    override fun insertBottomUp(index: Int, instance: Unit) = Unit
    override fun insertTopDown(index: Int, instance: Unit) = Unit
    override fun move(from: Int, to: Int, count: Int) = Unit
    override fun remove(index: Int, count: Int) = Unit
    override fun onClear() = Unit
}
